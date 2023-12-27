import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../configure.js';
import './fetch1.css'


const Fetch1 = () => {
  const [emailUids, setEmailUids] = useState([]);
  const [selectedEmailUid, setSelectedEmailUid] = useState('');
  const [clientIdsList, setClientIdsList] = useState([]);

  useEffect(() => {
    const fetchEmailUids = async () => {
      try {
        const response = await fetch(`${ API_BASE_URL }/api/getUids`);
        const data = await response.json();

        // Use Set to remove duplicate values
        const uniqueEmailUids = Array.from(new Set(data));

        setEmailUids(uniqueEmailUids);
      } catch (error) {
        console.error('Error fetching Email UIDs:', error);
      }
    };

    fetchEmailUids();
  }, []);

  const handleEmailUidChange = (event) => {
    const selectedEmailUid = event.target.value;
    setSelectedEmailUid(selectedEmailUid);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${ API_BASE_URL }/api/getDataByEmailUid?email_uid=${selectedEmailUid}`);
      const data = await response.json();

      console.log('Data by email_uid:', data);

      // Extract client_ids from data
      const clientIds = data.map((item) => item.client_id);

      // Use Set to remove duplicate values
      const uniqueClientIds = Array.from(new Set(clientIds));

      setClientIdsList(uniqueClientIds);
    } catch (error) {
      console.error('Error fetching data by email_uid:', error);
    }
  };

  return (
    <div className='fetch1'>
      <h2>Email UID to Client ID Mapping</h2>
      <label htmlFor="emailUidSelect">Select Email UID:</label>
      <select className='form-control' id="emailUidSelect" value={selectedEmailUid} onChange={handleEmailUidChange}>
        <option key="" value="">Select an Email UID</option>
        {emailUids.map((emailUid) => (
          <option key={emailUid} value={emailUid}>
            {emailUid}
          </option>
        ))}
      </select>

      <div className='createbutton'>
      <button onClick={handleSubmit} className='create'>Submit</button>
      </div>

      <label htmlFor="clientIdsList">Client IDs List:</label>
      <ul>
        {clientIdsList.map((clientId, index) => (
          <li key={index}>{clientId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Fetch1;

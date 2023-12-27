import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../configure.js';

import './fetch2.css'


const Fetch2 = () => {
  const [clientIds, setClientIds] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchClientIds = async () => {
      try {
        const response = await fetch(`${ API_BASE_URL }/api/getClientIds`);
        const data = await response.json();

        // Use Set to remove duplicate values
        const uniqueClientIds = Array.from(new Set(data));

        setClientIds(uniqueClientIds);
      } catch (error) {
        console.error('Error fetching Client IDs:', error);
      }
    };

    fetchClientIds();
  }, []);

  const handleClientIdChange = (event) => {
    const selectedClientId = event.target.value;
    setSelectedClientId(selectedClientId);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${ API_BASE_URL }/api/getDataByClientId?client_id=${selectedClientId}`);
      const data = await response.json();

      console.log('Data by client_id:', data);

      // Extract and display only carrier_id
      const carrierIds = data.map((item) => item.carrier_id);
      setDataList(carrierIds);
    } catch (error) {
      console.error('Error fetching data by client_id:', error);
    }
  };

  return (
    <div className='fetch2'>
      <h2>Client ID Data Fetching</h2>
      <label htmlFor="clientIdSelect">Select Client ID:</label>
      <select className='form-control' id="clientIdSelect" value={selectedClientId} onChange={handleClientIdChange}>
        <option key="" value="">Select a Client ID</option>
        {clientIds.map((clientId) => (
          <option key={clientId} value={clientId}>
            {clientId}
          </option>
        ))}
      </select>

      <div className='createbutton'>
      <button onClick={handleSubmit} className='create'>Submit</button>
      </div>

      <label htmlFor="dataList">Carrier IDs:</label>
      <ul>
        {dataList.map((carrierId, index) => (
          <li key={index}>{carrierId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Fetch2;

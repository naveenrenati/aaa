// mapping.js

import React, { useState, useEffect } from 'react';
import './userclientmapping.css';
import { API_BASE_URL } from '../configure.js';

const UserMapping = () => {
  const [clients, setClients] = useState([]);
  const [emails, setEmails] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedEmailId, setSelectedEmailId] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${ API_BASE_URL }/api/getClients`);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchEmails = async () => {
      try {
        const response = await fetch(`${ API_BASE_URL }/api/getEmails`);
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchClients();
    fetchEmails();
  }, []);

  const handleClientChange = (event) => {
    const selectedClientName = event.target.value;
    const selectedClient = clients.find((client) => client.name === selectedClientName);

    if (selectedClient) {
      setSelectedClient(selectedClientName);
      setSelectedClientId(selectedClient.client_id);
    }
  };

  const handleEmailChange = (event) => {
    const selectedEmailEmail = event.target.value;
    const selectedEmail = emails.find((email) => email.email === selectedEmailEmail);

    if (selectedEmail) {
      setSelectedEmail(selectedEmailEmail);
      setSelectedEmailId(selectedEmail['uid']); // Assuming the field is named "_id"
    }
  };

  const handleSaveMapping = async () => {
    try {
      const response = await fetch(`${ API_BASE_URL }/api/saveClientMapping2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: selectedClient,
          client_id: selectedClientId,
          email : selectedEmail,
          email_uid : selectedEmailId

        }),
      });

      if (response.ok) {
        console.log('Mapping data saved successfully!');
      } else {
        console.error('Failed to save mapping data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving mapping data:', error);
    }
  };

  return (
    <div className='userclientmapping'>
      <h2>user client mapping</h2>
      <label htmlFor="clientSelect">Select Client:</label>
      <select className='form-control' id="clientSelect" value={selectedClient} onChange={handleClientChange}>
        <option value="">Select a client</option>
        {clients.map((client) => (
          <option key={client._id} value={client.name}>
            {client.name}
          </option>
        ))}
      </select>

      <label htmlFor="clientID">Client ID:</label>
      <input type="text" className='form-control' placeholder='Client ID' id="clientID" value={selectedClientId} readOnly />

      <label htmlFor="emailSelect">Select Email:</label>
      <select id="emailSelect" className='form-control' value={selectedEmail} onChange={handleEmailChange}>
        <option value="">Select a email</option>
        {emails.map((email) => (
          <option key={email.uid} value={email.email}>
            {email.email}
          </option>
        ))}
      </select>

      <label htmlFor="emailID">email ID:</label>
      <input type="text" className='form-control' placeholder='Email ' id="emailID" value={selectedEmailId} readOnly />

      <div className='createbutton'>
      <button onClick={handleSaveMapping} className='createuser'>Save Mapping</button>
      </div>

      {selectedClient && (
        <div className='uselectedcl'>
          <h2>Selected Client: {selectedClient}</h2>
          <h2>Selected Client ID: {selectedClientId}</h2>
        </div>
      )}

      {selectedEmail && (
        <div className='uselectedca'>
          <h2>Selected email: {selectedEmail}</h2>
          <h2>Selected email ID: {selectedEmailId}</h2>
        </div>
      )}
    </div>
  );
};

export default UserMapping;

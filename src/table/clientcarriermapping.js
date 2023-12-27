// mapping.js

import React, { useState, useEffect } from 'react';
import './clientcarriermapping.css';
import { API_BASE_URL } from '../configure.js';

const Mapping = () => {
  const [clients, setClients] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const [selectedCarrierId, setSelectedCarrierId] = useState('');

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

    const fetchCarriers = async () => {
      try {
        const response = await fetch(`${ API_BASE_URL }/api/getCarriers`);
        const data = await response.json();
        setCarriers(data);
      } catch (error) {
        console.error('Error fetching carriers:', error);
      }
    };

    fetchClients();
    fetchCarriers();
  }, []);

  const handleClientChange = (event) => {
    const selectedClientName = event.target.value;
    const selectedClient = clients.find((client) => client.name === selectedClientName);

    if (selectedClient) {
      setSelectedClient(selectedClientName);
      setSelectedClientId(selectedClient.client_id);
    }
  };

  const handleCarrierChange = (event) => {
    const selectedCarrierName = event.target.value;
    const selectedCarrier = carriers.find((carrier) => carrier.name === selectedCarrierName);

    if (selectedCarrier) {
      setSelectedCarrier(selectedCarrierName);
      setSelectedCarrierId(selectedCarrier['_id']); // Assuming the field is named "_id"
    }
  };

  const handleSaveMapping = async () => {
    try {
      const response = await fetch(`${ API_BASE_URL }/api/saveClientMapping1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: selectedClient,
          client_id: selectedClientId,
          carrier: selectedCarrier,
          carrier_id: selectedCarrierId,
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
    <div className='clientcarriermapping'>
      <h2>Client Mapping</h2>
      <label htmlFor="clientSelect">Select Client:</label>
      <select id="clientSelect" className='form-control'  value={selectedClient} onChange={handleClientChange}>
        <option value="">Select a client</option>
        {clients.map((client) => (
          <option key={client._id} value={client.name}>
            {client.name}
          </option>
        ))}
      </select>

      <label htmlFor="clientID">Client ID:</label>
      <input type="text"  className='form-control' placeholder='Client ID' id="clientID" value={selectedClientId} readOnly />

      <label htmlFor="carrierSelect">Select Carrier:</label>
      <select  className='form-control' id="carrierSelect" value={selectedCarrier} onChange={handleCarrierChange}>
        <option value="">Select a carrier</option>
        {carriers.map((carrier) => (
          <option key={carrier._id} value={carrier.name}>
            {carrier.name}
          </option>
        ))}
      </select>

      <label htmlFor="carrierID">Carrier ID:</label>
      <input  className='form-control' placeholder='Carrier ID' type="text" id="carrierID" value={selectedCarrierId} readOnly />

      <div className='createbutton'>
      <button onClick={handleSaveMapping} className='createuser'>Save Mapping</button>
      </div>

      {selectedClient && (
        <div className='selectedcl'>
          <h2>Selected Client: {selectedClient}</h2>
          <h2>Selected Client ID: {selectedClientId}</h2>
        </div>
      )}

      {selectedCarrier && (
        <div className='selectedca'>
          <h2>Selected Carrier: {selectedCarrier}</h2>
          <h2>Selected Carrier ID: {selectedCarrierId}</h2>
        </div>
      )}
    </div>
  );
};

export default Mapping;

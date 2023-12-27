// CarrierDetails.js
import React, { useState } from 'react';
import './carrierdetails.css'
import { API_BASE_URL } from '../configure.js';

const CarrierDetails = () => {
    const [carrierName, setCarrierName] = useState('');
    const [carrierLocation, setCarrierLocation] = useState('');

    const [clientName, setClientName] = useState('');
    const [clientLocation, setClientLocation] = useState('');
    const [clientContact, setClientContact] = useState('');
    const [clientComment, setClientComment] = useState('');
    const [clientID, setClientID] = useState('');

    const handleSaveCarrier = async () => {
        try {
            const response = await fetch(`${ API_BASE_URL }/carrierdetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: carrierName, location: carrierLocation }),
            });

            const data = await response.json();
            console.log('Server response (Carrier):', data);

            alert('Carrier details saved successfully!');

            setCarrierName('');
            setCarrierLocation('');
        } catch (error) {
            console.error('Error saving carrier details:', error);
            alert('Failed to save carrier details');
        }
    };

    const handleSaveClient = async () => {
        try {
            const response = await fetch(`${ API_BASE_URL }/clientdetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: clientName,
                    location: clientLocation,
                    contact: clientContact,
                    comment: clientComment,
                    client_id: clientID,
                }),
            });

            const data = await response.json();
            console.log('Server response (Client):', data);

            alert('Client details saved successfully!');


            setClientName('');
            setClientLocation('');
            setClientContact('');
            setClientComment('');
            setClientID('');
        } catch (error) {
            console.error('Error saving client details:', error);
            alert('Failed to save client details');
        }
    };

    return (
        <div>
            <div className='carrierdetails'>
            <h1>Carrier Details</h1>
            {/* No need to input carrierId manually */}
            <label>Carrier Name:</label>
            <input type="text" className='form-control' placeholder='Carrier Name' value={carrierName} onChange={(e) => setCarrierName(e.target.value)} />

            <label>Carrier Location:</label>
            <input type="text" className='form-control' placeholder='Carrier Location' value={carrierLocation} onChange={(e) => setCarrierLocation(e.target.value)} />

            <div className='createbutton'>
            <button type='button' className='createuser' onClick={handleSaveCarrier}>Save Carrier</button>
            </div>
           
            </div>
            <div className='clientdetails'>
            <h1>Client Details</h1>
            <label>Client Name:</label>
            <input type="text" className='form-control' placeholder='Client Name' value={clientName} onChange={(e) => setClientName(e.target.value)} />

            <label>Client Location:</label>
            <input type="text" className='form-control' placeholder='Client Location' value={clientLocation} onChange={(e) => setClientLocation(e.target.value)}/>

            <label>Client ID:</label>
            <input type="text" className='form-control' placeholder='Client ID' value={clientID} onChange={(e) => setClientID(e.target.value)} />

            <label>Client Contact:</label>
            <input type="text" className="form-control" placeholder='Client Contact' value={clientContact} onChange={(e) => setClientContact(e.target.value)} />

            <label>Client Comment:</label>
            <textarea type="text" className="form-control" placeholder='Client Comment' rows="3" value={clientComment} onChange={(e) => setClientComment(e.target.value)} />

            <div className='createbutton'>
            <button type='button' className='createuser' onClick={handleSaveClient}>Save Client</button>
            </div>
            </div>
        </div>
    );
};

export default CarrierDetails;

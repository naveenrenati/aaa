import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import './accesssettings.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Accessstings = () => {
  const [people, setPeople] = useState([]); 
  const [newPerson, setNewPerson] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  });
  const [assignedPersonId, setAssignedPersonId] = useState('');
  const [assignedPersonDetails, setAssignedPersonDetails] = useState(null);
  const [assignedPeople, setAssignedPeople] = useState([]);
  const [loggedInPerson, setLoggedInPerson] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:5000/api/people')
      .then(response => setPeople(response.data))
      .catch(error => console.error('Error fetching people:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleCreatePerson = () => {
    // Check if the username or email is already taken
    const isUsernameTaken = people.some(person => person.username === newPerson.username);
    const isEmailTaken = people.some(person => person.email === newPerson.email);
  
    if (isUsernameTaken) {
      alert('Username is already taken. Please choose another.');
      return;
    }
  
    if (isEmailTaken) {
      alert('Email is already taken. Please choose another.');
      return;
    }
  
    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(newPerson.password)) {
      alert('Password must be 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }
  
    // If all validations pass, proceed to create a new person
    axios.post('http://localhost:5000/api/people', newPerson)
      .then(response => {
        setPeople([...people, response.data]);
        setNewPerson({
          username: '',
          email: '',
          password: '',
          phoneNumber: '',
          role: '',
        });
      })
      .catch(error => console.error('Error creating person:', error));
  };
  

  const handleAssignPerson = (personId) => {
    if (!mongoose.Types.ObjectId.isValid(personId) || !mongoose.Types.ObjectId.isValid(assignedPersonId)) {
      console.error('Invalid ObjectId format. personId:', personId, 'assignedPersonId:', assignedPersonId);
      return;
    }
  
    axios.put(`http://localhost:5000/api/assign/${personId}/${assignedPersonId}`)
      .then(response => {
        const updatedPeople = people.map(person => (person._id === personId ? response.data : person));
        setPeople(updatedPeople);
        setAssignedPersonId('');
  
        // Fetch details of the assigned person
        axios.get(`http://localhost:5000/api/person/${assignedPersonId}`)
          .then(response => {
            setAssignedPersonDetails(response.data);
            // Fetch details of people assigned to the selected person
            axios.get(`http://localhost:5000/api/assigned-people/${assignedPersonId}`)
              .then(response => setAssignedPeople(response.data))
              .catch(error => console.error('Error fetching assigned people details:', error));
          })
          .catch(error => console.error('Error fetching assigned person details:', error));
      })
      .catch(error => console.error('Error assigning person:', error));
  };

  const handleDeletePerson = (personId) => {
    if (!window.confirm('Are you sure you want to delete this person?')) {
      return;
    }

    axios.delete(`http://localhost:5000/api/people/${personId}`)
      .then(() => {
        const updatedPeople = people.filter(person => person._id !== personId);
        setPeople(updatedPeople);

        // If the deleted person was assigned to someone, refresh the assigned people details
        if (assignedPersonDetails && assignedPersonDetails.assignedTo === personId) {
          axios.get(`http://localhost:5000/api/assigned-people/${assignedPersonId}`)
            .then(response => setAssignedPeople(response.data))
            .catch(error => console.error('Error fetching assigned people details:', error));
        }
      })
      .catch(error => console.error('Error deleting person:', error));
  };



  const filteredPeople = people.filter(person =>
    person.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredPeople.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPeople = filteredPeople.slice(startIndex, endIndex);

  return (
    <div>
      <div class="row">
        <h3>Create user</h3>
      <div class="col">
      <label>Username</label>
        <input type="text" class="form-control" name="username" placeholder="Username" value={newPerson.username} onChange={handleInputChange} />
      </div>
      <div class="col">
      <label>Email</label>
    <input type="email" class="form-control" name="email" placeholder="Email" value={newPerson.email} onChange={handleInputChange} />
      </div>
      <div class="col">
      <label>Password</label>
    <input type="password" class="form-control" name="password" placeholder="Password" value={newPerson.password} onChange={handleInputChange} />
      </div>
      <div class="col">
      <label>phone Number</label>
    <input type="text" class="form-control" name="phoneNumber" placeholder="Phone Number" value={newPerson.phoneNumber} onChange={handleInputChange} />
      </div>
      <div class="col">
      <label>Role</label>
    <input type="text" class="form-control" name="role" placeholder="Role" value={newPerson.role} onChange={handleInputChange} />
      </div>
      <div className='createbutton'>
    <button onClick={handleCreatePerson} className='createuser'>Create User</button>
     </div>
    </div>

      {/* Form to create a new person 
      <div className='createuser'>
        <h2>Create User</h2>
        <label>Username</label>
        <input type="text" className="form-control" name="username" placeholder="Username" value={newPerson.username} onChange={handleInputChange} />
        <input type="email" className="form-control" name="email" placeholder="Email" value={newPerson.email} onChange={handleInputChange} />
        <input type="password" className="form-control" name="password" placeholder="Password" value={newPerson.password} onChange={handleInputChange} />
        <input type="text" className="form-control" name="phoneNumber" placeholder="Phone Number" value={newPerson.phoneNumber} onChange={handleInputChange} />
        <input type="text" className="form-control" name="role" placeholder="Role" value={newPerson.role} onChange={handleInputChange} />
        <button onClick={handleCreatePerson}>Create User</button>
      </div>*/}

      {/* Table to display people */}
      <div className='newuser'>
        
        <div className='input'>
        <div className="input-wrapper">
        <i class="bi bi-search"></i>
        <input
        type="text"
        placeholder="Search by Username or Email"
        className='search'
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
        </div>
      
        </div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Assigned To</th>
              <th>ASsign</th>
              <th></th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {currentPeople.map(person => (
              <tr key={person._id}>
                <td>{person.username}</td>
                <td>{person.email}</td>
                <td>{person.phoneNumber}</td>
                <td>{person.role}</td>
                <td>{person.assignedTo ? people.find(p => p._id === person.assignedTo)?.username || 'Unknown Person' : 'Not Assigned'}</td>
                <td>
                  <select onChange={(e) => setAssignedPersonId(e.target.value)}>
                    <option value="">Select Person</option>
                    {people.map(p => (
                      <option key={p._id} value={p._id}>{p.username}</option>
                    ))}
                  </select>
                </td>  
                <td>  <button className="assign" onClick={() => handleAssignPerson(person._id)}>Save</button></td>
                 <td> <button className='delete' onClick={() => handleDeletePerson(person._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          
          
        </table>
        <div className='itemperpage'>
          <label htmlFor="itemsPerPage">Items per page : </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
        {currentPage > 1 && (
          <button className='pre' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button className='next' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
      </div>
    </div>
  );
};

export default Accessstings;

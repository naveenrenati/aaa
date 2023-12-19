// LoginPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginForm from './LoginForm';
import WelcomeMessage from './WelcomeMessage';


const LoginPage = () => {
  const [people, setPeople] = useState([]); 
  const [newPerson, setNewPerson] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
  });

  const [assignedPersonDetails, setAssignedPersonDetails] = useState(null);
  const [assignedPeople, setAssignedPeople] = useState([]);
  const [loggedInPerson, setLoggedInPerson] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/people')
      .then(response => setPeople(response.data))
      .catch(error => console.error('Error fetching people:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const person = people.find(
      (p) => p.username === newPerson.username && p.password === newPerson.password
    );
  
    if (person) {
      setLoggedInPerson((prevPerson) => person);
  
      // Fetch details of the assigned person
      axios
        .get(`http://localhost:5000/api/person/${person.assignedTo}`)
        .then((response) => {
          setAssignedPersonDetails(response.data);
  
          // Fetch details of people assigned to the logged-in person
          axios
            .get(`http://localhost:5000/api/assigned-people/${person._id}`)
            .then((response) => setAssignedPeople(response.data))
            .catch((error) => console.error('Error fetching assigned people details:', error));
        })
        .catch((error) => console.error('Error fetching assigned person details:', error))
        .finally(() => {
          setNewPerson({
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            role: '',
          });
        });
    } else {
      console.error('Invalid username or password');
      alert('Invalid username or password. Please try again.');
    }
  };
  

  return (
    <div>
      {loggedInPerson ? (
        <WelcomeMessage loggedInPerson={loggedInPerson} assignedPeople={assignedPeople} />
      ) : (
        <LoginForm
          newPerson={newPerson}
          handleInputChange={handleInputChange}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default LoginPage;

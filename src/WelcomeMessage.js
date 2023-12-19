// WelcomeMessage.js
import React from 'react';

const WelcomeMessage = ({ loggedInPerson, assignedPeople }) => {
  return (
    <div>
      <h1>Welcome, {loggedInPerson.username}!</h1>
      {/* Display details of assigned user */}
      <div>
        <h2>User details</h2>
        <div key={loggedInPerson._id}>
          <p>{loggedInPerson.username}</p>
          <p>{loggedInPerson.email}</p>
          <p>{loggedInPerson.phoneNumber}</p>
          <p>{loggedInPerson.role}</p>
          <p></p>
        </div>
        
      </div>

      {/* Display details of users assigned to the logged-in user */}
      {assignedPeople.length > 0 && (
        <div>
          <h2>People Assigned to you, {loggedInPerson.username}</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {assignedPeople.map(person => (
                <tr key={person._id}>
                  <td>{person.username}</td>
                  <td>{person.email}</td>
                  <td>{person.phoneNumber}</td>
                  <td>{person.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;

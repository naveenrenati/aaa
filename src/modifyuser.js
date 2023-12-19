// src/components/TablePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './configure.js';

const TablePage = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('none'); // Set default role filter to 'none'
  const [emailToModify, setEmailToModify] = useState('');
  const [newRole, setNewRole] = useState('');
  const [modificationError, setModificationError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/modify/users?role=${roleFilter}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleModifyRole = async (e) => {
    e.preventDefault();

    try {
      // Send modify user role data to the backend
      await axios.patch(`${API_BASE_URL}/modify/users/modifyRole`, {
        email: emailToModify,
        newRole: newRole,
      });
      // Refresh user data after role modification
      fetchUsers();
      // Clear form fields and error
      setEmailToModify('');
      setNewRole('');
      setModificationError('');
    } catch (error) {
      console.error('Modification failed:', error.response.data.message);
      setModificationError(error.response.data.message || 'Modification failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Select users to modify</h2>
      <label>
        Filter by Role:
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="none">None</option>
          <option value="analyst">Analyst</option>
          <option value="client">Client</option>
          <option value="supporter">Supporter</option>
        </select>
      </label>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Modify User Role</h2>
        {modificationError && <p style={{ color: 'red' }}>{modificationError}</p>}
        <form onSubmit={handleModifyRole}>
          <label>
            Email to Modify:
            <input
              type="email"
              name="emailToModify"
              value={emailToModify}
              onChange={(e) => setEmailToModify(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            New Role:
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="analyst">Analyst</option>
              <option value="client">Client</option>
              <option value="supporter">Supporter</option>
            </select>
          </label>
          <br />
          <button type="submit">Modify Role</button>
        </form>
      </div>
    </div>
  );
};

export default TablePage;

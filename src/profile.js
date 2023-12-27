// Profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Profile = () => {
  const { emaill } = useParams();

  // State to store profile data
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Decrypt the email
        const secretKey = 'uniqueDashboardKey';
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(emaill), secretKey);
        const email = "hello@gmail.com";

        // Fetch profile data from MongoDB Atlas
        const response = await fetch(`http://localhost:5000/api/getProfileData?email=${email}`);
        const data = await response.json();

        // Set profile data to state
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [emaill]);

  return (
    <div className="profile">
      <h2>Profile Information</h2>
      {profileData ? (
        <div>
          <p>Email: {profileData.email}</p>
          <p>UID: {profileData.uid}</p>
          <p>Role: {profileData.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import member1 from "./member1.jpeg"
import member2 from "./member2.jpg"
import member3 from "./member3.jpg"
import TeamMemberCard from "./TeamMemberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from './configure.js';
import TablePage from './modifyuser.js';
import Access from "./accesssettings.js";
import Createnewuser from "./createnewuser.js";
import CarrierDetails from "./table/carrierdetails.js"
import Mapping from "./table/clientcarriermapping.js"
import Signup from "./table/signup.js"
import UserMapping from "./table/userclientmapping.js"

import CryptoJS from 'crypto-js';

import "./dashboard.css";
import Fetch1 from "./table/fetch1.js";
import Fetch2 from "./table/fetch2.js";

function App() {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const [carrier, setCarrier] = useState("");
  const [name, setName] = useState("");
  const [rateCardParameters, setRateCardParameters] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userTableData, setUserTableData] = useState([]);
  const [source, setsource] = useState("");
  const [showFiles, setShowFiles] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showMapping, setMapping] = useState(false);
  const [showRateCard, setRateCard] = useState(false);
  const [showRateCardConfig, setRateCardConfig] = useState(false);
  const [sourceCol, setSourceCol] = useState("");
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [submitted, setSubmitted] = useState(false);
  const [submittedMatrix, setSubmittedMatrix] = useState([]);
  const [destination, setDestination] = useState([]);
  const [chargeCode, setChargeCode] = useState([]);
  const [isDate, setIsDate] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const [parameter, setParameter] = useState("");
  const [description, setDescription] = useState("");

  const [data, setData] = useState([]);

  const [parameterNames, setParameterNames] = useState([]);
  const [zoneNames, setZoneNames] = useState([]);
  const [newZoneName, setNewZoneName] = useState("");
  const [newParameterName, setNewParameterName] = useState("");
  const [Showadduser,setShowadduser]=useState("");
  const [Showsettings,setShowsettings]=useState("");
  const [Showcreatenewuser, setShowcreatenewuser] = useState("");
  const [Shownewtables, setShownewtables] = useState("");
  const [Showfetcheddata, setShowfetcheddata] = useState("");

  const [matrix, setMatrix] = useState(createEmptyMatrix(0, 0));

  // Function to create an empty matrix with specified rows and columns
  function createEmptyMatrix(parameters, zones) {
    return Array.from({ length: parameters }, () => Array(zones).fill(""));
  }

  const getItemsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userTableData.slice(startIndex, endIndex);
  };

  const getItemsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userTableData.slice(startIndex, endIndex);
  };
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);
  const [analystUsers, setAnalystUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getusers`);
        setUsers(response.data);

        // Separate users based on role
        const clients = response.data.filter(user => user.role === 'client');
        const analysts = response.data.filter(user => user.role === 'analyst');

        setClientUsers(clients);
        setAnalystUsers(analysts);
      } catch (error) {
        console.error('Error fetching users:', error.response.data.message);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      // Send signup data to the backend
      const response = await axios.post(`${API_BASE_URL}/addusers`, formData);

      // Update user list with the new user
      setUsers([...users, response.data]);

      // Clear form data and error on successful signup
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
      });
      setError('');
      alert('User created successfully!');
    } catch (error) {
      console.error('Signup failed:', error.response.data.message);
      setError(error.response.data.message || 'Signup failed. Please try again.');
    }
  };

  const handleSearch = () => {
    // Filter users based on the entered email
    const filtered = users.filter(user => user.email.toLowerCase().includes(searchEmail.toLowerCase()));
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getusers`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response.data.message);
      }
    };

    fetchUsers();
  }, []);



  const toggleUserProfile = () => {
    setShowUserProfile(true);
    setShowFiles(false);
    setMapping(false);
    setRateCardConfig(false);
    fetchUserDetails(userEmail);
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(false);
  };

  const toggleUserUploads = () => {
    setShowUserProfile(false);
    setMapping(false);
    setShowFiles(true);
    setRateCardConfig(false);
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(false);
  };

  const toggleUserMapping = () => {
    setMapping(true);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(false);
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(false);
  };

  const toggleRateCardConfig = () => {
    setMapping(false);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(true);
    setRateCardParameters(data.map((item) => item.parameter)); // Update rateCardParameters with user-entered parameters
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(false);
  };
  const toggleRateCard = () => {
    setMapping(false);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(false);
    setRateCard(true);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(false);
  };

  const toggleadduser = () => {
    setMapping(false);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(false);
    setRateCard(false);
    setShowadduser(true);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(false);
  };

  const togglesettings = () => {
    setMapping(false);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(false);
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(true);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(false);
  }

  const togglecreateuser = () => {
    setMapping(false);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(false);
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(true);
    setShownewtables(false);
    setShowfetcheddata(false);
  }
  const togglenewtables = () =>{
    setMapping(false);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(false);
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(true);
    setShowfetcheddata(false);
  }
  const togglefetcheddata = () =>{
    setMapping(false);
    setShowFiles(false);
    setShowUserProfile(false);
    setRateCardConfig(false);
    setRateCard(false);
    setShowadduser(false);
    setShowsettings(false);
    setShowcreatenewuser(false);
    setShownewtables(false);
    setShowfetcheddata(true);
  }



  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split("\n");

      if (lines.length > 0) {
        const headerRow = lines[0].trim();
        const headers = headerRow.split(",");

        setsource(headerRow);
        setCsvHeaders(headers);
      }
    };
    reader.readAsText(event.target.files[0]);
  };

  const { emaill } = useParams();
 // Decrypt the email
 const secretKey = 'uniqueDashboardKey'; // Use the same key used for encryption in LoginForm.js
 const bytes = CryptoJS.AES.decrypt(decodeURIComponent(emaill), secretKey);
 const email = bytes.toString(CryptoJS.enc.Utf8);


 useEffect(() => {
  const fetchProfileData = async () => {
    try {
      // Decrypt the email

      // Fetch profile data from MongoDB Atlas
      const response = await fetch(`${ API_BASE_URL }/api/getProfileData?email=${email}`);
      const data = await response.json();

      // Set profile data to state
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  fetchProfileData();
}, [emaill]);


  const handleDestinationChange = (index, value) => {
    const newDestination = [...destination];
    newDestination[index] = value;
    setDestination(newDestination);
  };

  const handleChargeCodeChange = (index, value) => {
    const newChargeCode = [...chargeCode];
    newChargeCode[index] = value;
    setChargeCode(newChargeCode);
  };

  const handleIsDateChange = (index, value) => {
    const newIsDate = [...isDate];
    newIsDate[index] = value;
    setIsDate(newIsDate);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("clientId", clientId);
    formData.append("carrier", carrier);
    formData.append("name", name);
    formData.append("csvFile", csvFile);
    formData.append("source", source);
    const uploadDateTime = new Date();
    formData.append("uploadDateTime", uploadDateTime.toISOString());
    formData.append("sourceCol", sourceCol);
    formData.append("destination", destination.join(","));
    formData.append("chargeCode", chargeCode.join(","));
    formData.append("isDate", isDate.join(","));

    try {
      const response = await fetch(`${API_BASE_URL}/upload/${email}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("User data and PDF file link saved successfully!");
        fetchUserDetails(email);
        fetchUserTableData(email);
      } else {
        alert("An error occurred while saving the data.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the data.");
    }
  };

  const handleZoneNameChange = (index, value) => {
    const newZoneNames = [...zoneNames];
    newZoneNames[index] = value;
    setZoneNames(newZoneNames);
  };

  const handleDelete = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${email}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUserTableData(email);
      } else {
        console.error("An error occurred while deleting the data");
      }
    } catch (error) {
      console.error("An error occurred while deleting the data:", error);
    }
  };

  const fetchUserTableData = async (email) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/usertabledata/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserTableData(data);
      } else {
        console.error("Error fetching user table data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user table data:", error);
    }
  };

  const fetchUserDetails = async (email) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/userdetails/${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        console.error("Error fetching user details:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleRefresh = () => {
    fetchUserTableData(userEmail);
  };

  const handleInputChange = (parameterIndex, zoneIndex, value) => {
    const newMatrix = matrix.map((row, i) =>
      i === parameterIndex
        ? row.map((cell, j) => (j === zoneIndex ? value : cell))
        : row
    );
    setMatrix(newMatrix);
  };

  const handleAddZone = () => {
    if (newZoneName && !zoneNames.includes(newZoneName)) {
      setZoneNames([...zoneNames, newZoneName]);
      setMatrix(createEmptyMatrix(parameterNames.length, zoneNames.length + 1));
      setNewZoneName("");
    }
  };

  const handleAddParameter = () => {
    if (newParameterName && !parameterNames.includes(newParameterName)) {
      setParameterNames([...parameterNames, newParameterName]);
      setMatrix(createEmptyMatrix(parameterNames.length + 1, zoneNames.length));
      setNewParameterName("");
    }
  };


  
  const renderMatrixInputs = () => {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th> {/* Empty space for parameter names */}
            {zoneNames.map((name, index) => (
              <th key={`header-${index}`}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleZoneNameChange(index, e.target.value)}
                  className="form-control"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parameterNames.map((parameter, i) => (
            <tr key={`parameter-${i}`}>
              <th>{parameter}</th>
              {matrix[i].map((cell, j) => (
                <td key={`cell-${i}-${j}`}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(i, j, e.target.value)}
                    className="form-control"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Function to handle matrix submission
  const handleMatrixSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/saveMatrix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parameterNames,
          zoneNames,
          dataRate: matrix,
        }),
      });

      const result = await response.json();
      console.log(result);
      setSubmitted(true);
      setSubmittedMatrix(matrix);
    } catch (error) {
      console.error("Error submitting matrix data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/data`);

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const addData = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/data`, {
        parameter,
        description,
      });
      fetchData();
      setParameter("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/data/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserDetails(email);
      fetchUserTableData(email);
      setUserEmail(email);
      fetchData();
    }
  }, [email]);


  return (
    <div>
      <input type="checkbox" id="nav-toggle" />

      {/* Sidebar */}
      <section className="sidebar">
        

        <div className="sidebar-menu">
         
            <li>
              <a href="#" className="active" onClick={toggleUserProfile}>
                <span><i class="bi bi-person-circle"></i></span>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={togglecreateuser}>
                <span><i class="bi bi-person-fill-add"></i></span>
                <span>Add User</span>
              </a>
            </li>
            <li>
              <a href="#"  onClick={togglenewtables}>
                <span><i class="bi bi-terminal-dash"></i></span>
                <span>Table</span>
              </a>
            </li>
            <li>
              <a href="#"  onClick={togglefetcheddata}>
                <span><i class="bi bi-terminal-dash"></i></span>
                <span>Fetch</span>
              </a>
            </li>
            <li>
              <a href="#"  onClick={toggleUserUploads}>
                <span><i class="bi bi-file-earmark-arrow-up-fill"></i></span>
                <span>Uploads</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={toggleUserMapping}>
                <span><i class="bi bi-diagram-2-fill"></i> </span>
                <span>Mapping</span>
              </a>
            </li>
            <li>
              <a href="#"  onClick={toggleRateCardConfig}>
                <span><i class="bi bi-house-add-fill"></i></span>
                <span>Rate Card Config</span>
              </a>
            </li>
            <li>
              <a href="#"  onClick={toggleRateCard}>
                <span><i class="bi bi-card-list"></i></span>
                <span>Rate Card</span>
              </a>
            </li>
            <li>
              <a href="#"  onClick={() => navigate("/")}>
                <span><i class="bi bi-box-arrow-right"></i></span>
                <span>Logout</span>
              </a>
            </li>

          
        </div>
      </section>
      {/* Sidebar End Here */}

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar Header */}
        <header>
          <div className="header-title">
            <h2>
              <label htmlFor="nav-toggle">
              <i class="bi bi-list"></i>
              </label>
              Scinlabs
            </h2>
          </div>

          

          <div className="user-wrapper">
          <button className="button-40" type="submit"  onClick={() => navigate("/")}><i class="bi bi-box-arrow-right"></i> Logout</button>
          </div>
        </header>
        {/* Navbar Header End Here */}

        {/* Main Content */}
        <main>
        {showFiles && (
          <div>
          <div className="cards">
            <div className="card-single">
            <h4>Upload Freight Data</h4>
            <div className="uploadfieldinside">
              <input type="text" className="form-control" placeholder="Give Client ID" value={profileData.uid} readOnly />
              <select className="form-control" placeholder="Carrier Name" >
                              <option>choose Carrier</option>
                              <option>ShipRock</option>
                              <option>Blue</option>
              </select>
              <select className="form-control" placeholder="File Type" >
                              <option>choose File Type</option>
                              <option>Choose invoice file</option>
                              <option>Choose manifest file</option>
              </select>
            </div>
            <div className="insidefile">
              <input type="file" className="form-control" />
            </div>
            <div className="createbutton">
              <button className="create" > Submit </button>
            </div>
            </div>
          </div>
          <div className="tabletwo">
                 
          <button
            className="previous"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="refresh" onClick={handleRefresh}>
            Refresh
          </button>

          <button
            className="next"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={getItemsForCurrentPage().length < itemsPerPage}
          >
            Next
          </button>
          <div className="col">
            {getItemsForCurrentPage().length > 0 ? (
              
              <table>
                <thead>
                  <tr>
                    <th scope="col">Client ID</th>
                    <th scope="col">Client Email</th>
                    <th scope="col">Carrier Name</th>
                    <th scope="col">File Type</th>
                    <th scope="col">Source</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Charge</th>
                    <th scope="col">date</th>

                    <th scope="col">Uploaded Time</th>
                    <th scope="col"> Url</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getItemsForCurrentPage().map((user, index) => (
                    <tr key={index}>
                      <td>{user.clientId}</td>
                      <td>{user.email}</td>
                      <td>{user.carrier}</td>
                      <td>{user.name}</td>
                      <td>{user.source}</td>
                      <td>{user.destination}</td>
                      <td>{user.chargeCode}</td>
                      <td>{user.isDate}</td>

                      <td>{user.uploadDateTime}</td>
                      <td>
                        <a
                          href={user.csvFileUrl}
                          style={{
                            backgroundColor: "white",
                          }}
                          target="_blank"
                          download={user.filename}
                        >
                          Link
                        </a>
                      </td>

                      <td>
                        <button
                          className="delete"
                          onClick={() => handleDelete(user.email)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </div>
        </div>
        )}
          

          {showMapping && (
              <div >
                <div className="tableone">
                  <h3>Mapping data</h3>

                  <div className="col">
                    {getItemsForPage().length > 0 ? (
                      <table className="table bg-white rounded shadow-sm table-hover">
                        {csvHeaders.length > 0 && (
                          <thead>
                            <tr>
                              <th scope="col">Source_col</th>
                              <th scope="col">Destination</th>
                              <th scope="col">is_charge_code</th>
                              <th scope="col">is_Date</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {csvHeaders.length > 0 && (
                            <>
                              {csvHeaders.map((header, index) => (
                                <tr key={index}>
                                  <td>{header}</td>
                                  <td>
                                    <select
                                      className="form-control"
                                      value={destination[index] || ""}
                                      onChange={(e) =>
                                        handleDestinationChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="0">
                                        Select a destination
                                      </option>
                                      {csvHeaders.map((csvHeader) => (
                                        <option
                                          key={csvHeader}
                                          value={csvHeader}
                                        >
                                          {csvHeader}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td>
                                    <select
                                      className="form-control"
                                      value={chargeCode[index] || ""}
                                      onChange={(e) =>
                                        handleChargeCodeChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option>Choose is charge Code</option>
                                      <option>0</option>
                                      <option>1</option>
                                    </select>
                                  </td>
                                  <td>
                                    <select
                                      className="form-control"
                                      value={isDate[index] || ""}
                                      onChange={(e) =>
                                        handleIsDateChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option>Choose Is Date</option>
                                      <option>0</option>
                                      <option>1</option>
                                    </select>
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <p>No user data available.</p>
                    )}
                  </div>
                  <div className="createbutton">
                  <button className="create" onClick={handleSubmit}>
                    Submit
                  </button>
                  </div>
                </div>
              </div>
            )}


          {showUserProfile && (
              <>
              <div>
              
               
              <div className="user" >
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
                  
                </div> 
                 <div className="profilecard">
                  <hr/>  
                </div>      
                      
                      <div className="card ">
                        <div className="card-body">
                          <h4 >App Integration</h4>

                            <div className="form-group">
                              <label for="SecretKey">Secret Key</label>
                              <input
                                type="text"
                                className="form-control"
                                id="SecretKey"
                                name="SecretKey"
                                autocomplete="off"
                              />
                            </div>

                            <div class="form-group">
                              <label for="PrivateKey">Private Key</label>
                              <input
                                type="text"
                                className="form-control"
                                id="PrivateKey"
                                name="PrivateKey"
                                autocomplete="off"
                              />
                            </div>

                            <div class="form-group">
                              <select className="form-control">
                                <option>Select</option>
                                <option>Shopify</option>
                                <option>Ship Rocket</option>
                              </select>
            
                            </div>
                            <button
                              type="submit"
                              className="appint"
                            >
                              Submit
                            </button>                       
                        </div>
                      </div>
                      </div>                   
                </>              
            )}

            {showRateCardConfig && (
              <div className="ratecardconfig">
                <div className="ratecarddconfig">
                  <div className="rate-card-one">
                    <h3>Parameters</h3>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter a Parameter"
                      value={parameter}
                      onChange={(e) => setParameter(e.target.value)}
                    />

                    
                  </div>

                  <div className="rate-card-two">
                    <h3>Description</h3>

                    <select
                      className="form-control"
                      placeholder="Choose Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                      <option>Choose Description</option>
                      <option>Total Air Temperature (air)</option>
                      <option>Total Air Temperature (surface)</option>
                      <option>Upto 500 gms</option>
                      <option>Every additional 500 gms</option>
                      <option>RTO</option>
                    </select>
                  </div>
                  <div className="createbutton">
                  <button onClick={addData} className="create">Add</button>
                  </div>
                </div>

                <div className="rate-card-three">
                  <table className="table bg-white rounded shadow-sm table-hover">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Action</th> {/* New column for delete button */}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr key={item._id}>
                          <td>{item.parameter}</td>
                          <td>{item.description}</td>
                          <td>
                            <button onClick={() => deleteData(item._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {showRateCard && (
              <>
                <div className="ratecard">
                  <div className="ratecardd rounded">
                    <div className="rate-card-four">
                      <h4>Parameters</h4>
                      <select
                        className="form-control"
                        onChange={(e) => setNewParameterName(e.target.value)}
                      >
                        <option value="">Select Parameter</option>
                        {rateCardParameters.map((param) => (
                          <option key={param} value={param}>
                            {param}
                          </option>
                        ))}
                      </select>
                      <div className="createbutton">
                      <button onClick={handleAddParameter}>
                        Add Parameter
                      </button>
                      </div>
                    </div>
                    <div className="rate-card-five">
                      <h4>Zones</h4>
                      <input
                        className="form-control"
                        type="text"
                        value={newZoneName}
                        onChange={(e) => setNewZoneName(e.target.value)}
                      />
                      <div className="createbutton">
                      <button onClick={handleAddZone}>Add Zone</button>
                      </div>
                    </div>
                    <div className="matrix">{renderMatrixInputs()}</div>
                    <button onClick={handleMatrixSubmit} className="create">
                      Submit
                    </button>
                  </div>
                  {submittedMatrix.length > 0 && (
                  <div className="submitted-table">
                    <h4>Submitted Matrix Table</h4>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          {zoneNames.map((name, index) => (
                            <th key={`submitted-header-${index}`}>{name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {parameterNames.map((parameter, i) => (
                          <tr key={`submitted-parameter-${i}`}>
                            <th>{parameter}</th>
                            {submittedMatrix[i].map((cell, j) => (
                              <td key={`submitted-cell-${i}-${j}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                </div>
              </>
            )}

            {Showadduser &&(
              <>
              <div className="manage">
                <h2>Add Users</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form   className="form-boxx rounded" onSubmit={handleSubmit1}>
                  <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange1} required />
                  </label>
                  <br />
                  <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange1} required />
                  </label>
                  <br />
                  <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange1} required />
                  </label>
                  <br />
                  <label>
                    Phone Number:
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange1} required />
                  </label>
                  <br />
                  <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange1} required />
                  </label>
                  <br />
                  <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleInputChange1} required>
                      <option value="">Select Role</option>
                      <option value="supporter">Supporter</option>
                      <option value="client">Client</option>
                      <option value="analyst">Analyst</option>
                    </select>
                  </label>
                  <br />
                  <button type="submit">add</button>
                </form>
                <TablePage/>
                
                    </div>
              </>
            )}

        {Showsettings &&(
            <Access/>
          )}
        {Showcreatenewuser &&(
            <Createnewuser/>
          )}
         <div>
         {Shownewtables && (
            <>
              <Signup />
              <CarrierDetails />
              <Mapping />
              <UserMapping />
            </>
          )}
         </div>
         <div>
         {Showfetcheddata && (
            <>
              <Fetch1/>
              <Fetch2 />

            </>
          )}
         </div>


          {/* Add More Components Here */}
        </main>
        {/* Main Content End Here */}
      </div>
      {/* Main Content End Here */}
    </div>
  );
}

export default App;

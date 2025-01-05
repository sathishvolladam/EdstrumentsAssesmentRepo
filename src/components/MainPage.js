import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTrash, faSave, faArrowLeft, faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons';
import {image } from '../assets/image.gif'
import uploadIcon from '../assets/upload.png'

const MainPage = () => {
  const sessionData = localStorage.getItem("session")
    ? JSON.parse(localStorage.getItem("session"))
    : {};
  const navigate = useNavigate();

  const { username, password } = sessionData;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [activeSection, setActiveSection] = useState("vendor");

  useEffect(() => {
    document.title = 'Welcome to Main-Page';
    const checkLoggedIn = !!(username && password && username.length && password.length);
    setIsLoggedIn(checkLoggedIn);
    if (!checkLoggedIn) {
      navigate("/");
    }
  }, [username, password, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("session");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      alert(`File "${droppedFile.name}" uploaded successfully!`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`);
    } else {
      alert("Please select or drag a file.");
    }
  };
  const handleSectionClick = (section) => {
    setActiveSection(section);
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="invoice-page">
        <div className="commonHeader">
        <div className="header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> Create New Invoice</button>
        {/* <h1>Create New Invoice</h1> */}
      </div>
      <div className="nav-bar">
        <button
          className={`nav-item ${activeSection === "vendor" ? "active" : ""}`}
          onClick={() => handleSectionClick("vendor")}
        >
          Vendor Details
        </button>
        <button
          className={`nav-item ${activeSection === "invoice" ? "active" : ""}`}
          onClick={() => handleSectionClick("invoice")}
        >
          Invoice Details
        </button>
        <button
          className={`nav-item ${activeSection === "comments" ? "active" : ""}`}
          onClick={() => handleSectionClick("comments")}
        >
          Comments
        </button>
      </div>
      </div>
      <div className="content-container">
        
        {/* Upload Section */}
        <section
          className={`upload-section ${dragOver ? "drag-over" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2>Upload Your Invoice</h2>
          <form onSubmit={handleSubmit}>
            <div className="drop-zone">
            <img 
        src={require('../assets/image.gif')} 
        alt="Upload Icon" 
        className="upload-gif" 
        onClick={() => document.getElementById('file-input').click()} 
        style={{ cursor: 'pointer' }}
      />
            {/* <FontAwesomeIcon icon={faFileUpload} size="3x" color="#007bff" /> */}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              
            </div>
            <button type="submit" className="submit-btn">
              Upload File
              {/* <FontAwesomeIcon icon={faArrowUpFromBracket} size="2x" />
               */}
               <img
            src={uploadIcon}  // Display the imported image
            alt="Upload Icon"
            className="upload-Icon"  // Customize the size
            fill="black"
          />
            </button>
            <p>{file ? file.name : "Click to Upload or Drag & Drop"}</p>
          </form>
        </section>

        {/* Form Section */}
        <div className="form-container">
            {/* Navigation Bar */}
          {/* Vendor Details */}
          <section id="vendor" className={`form-section ${activeSection === "vendor" ? "highlight" : ""}`}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
          <img 
        src={require('../assets/officeOrg.png')} 
        alt="Upload Icon" 
        className="Fill-Image-Color"
        style={{ marginRight: '10px', 
            width: '20px', // Adjust width as needed
            height: '20px', // Adjust height as needed
            backgroundColor: 'lightblue' // Fill color for the icon
            }}
      />
            <h2>Vendor Details</h2>
            </div>
            <div className="form-group">
              <label>Vendor *</label>
              <select>
                <option value="vendor1">A - 1 Exterminators</option>
              </select>
              <p>550 Main St., Lynn</p>
              <a className="vendor-details" href="/">View Vendor Details</a>
            </div>
          </section>

          {/* Invoice Details */}
          <section id="invoice" className={`form-section ${activeSection === "invoice" ? "highlight" : ""}`}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
          <img 
        src={require('../assets/details.jpg')} 
        alt="Upload Icon" 
        className="Fill-Image-Color"
        style={{ marginRight: '10px', 
            width: '20px', // Adjust width as needed
            height: '20px', // Adjust height as needed
            backgroundColor: 'lightblue' // Fill color for the icon
            }}
      />
            <h2>Invoice Details</h2>
            </div>
            <div className="form-group">
              <label>Purchase Order Number *</label>
              <select>
                <option>Select PO Number</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
              <label for="invoice-number">Invoice Number *</label>
              <i class="fas fa-file-invoice input-icon"></i>
              <input type="text" id="invoice-number" placeholder="Enter Invoice Number" />
              </div>
              <div className="form-group">
                <label>Invoice Date *</label>
                <input type="date" />
              </div>
            </div>

            <div className="form-row">
            <div class="form-group">
    <label for="total-amount">Total Amount *</label>
    <i class="fas fa-dollar-sign input-icon"></i>
    <input type="text" id="total-amount" placeholder="$ 0.00" />
</div>
              <div className="form-group">
                <label>Payment Terms *</label>
                <select>
                  <option>Select</option>
                  <option value="net30">Net 30</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Invoice Due Date *</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>GL Post Date *</label>
                <input type="date" />
              </div>
            </div>

            <div className="form-group">
              <label>Invoice Description *</label>
              <textarea placeholder="Add Description"></textarea>
            </div>
          </section>

          {/* Expense Details */}
          <section className="expense-details">
            <h2>Expense Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Line Amount *</label>
                <input type="number" placeholder="$ 0.00" />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select>
                  <option>Select Department</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Account *</label>
                <select>
                  <option>Select Account</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location *</label>
                <select>
                  <option>Select Location</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Add Description"></textarea>
            </div>
          </section>
           {/* Comments Section */}
           <section id="comments" className={`form-section ${activeSection === "comments" ? "highlight" : ""}`}>
            <h2>Comments</h2>
            <div className="form-group">
              <textarea placeholder="Add your comments here"></textarea>
            </div>
          </section>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="draft-btn"><FontAwesomeIcon icon={faSave} /> Save as Draft</button>
        <button className="submit-btn"><FontAwesomeIcon icon={faFileUpload} /> Submit & New</button>
        <button className="logout-btn" onClick={handleLogout}><FontAwesomeIcon icon={faTrash} /> 
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainPage;


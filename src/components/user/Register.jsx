import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faUser, faEnvelope, faLock, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
      } else if (name === 'confirmPassword' && formData.password && value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Here you would typically handle the registration logic
    console.log('Registration form submitted:', formData);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Create an Account</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                        />
                    </div>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faPhone} />
                          </span>
                          <input 
                            type="tel" 
                            className="form-control" 
                            id="phone" 
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input 
                            type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                          />
                        </div>
                        {passwordError && <div className="text-danger mt-1">{passwordError}</div>}
                      </div>
                      
                      <div className="col-12">
                        <div className="form-check">
                          <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="agreeTerms" 
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-check-label" htmlFor="agreeTerms">
                            I agree to the <Link to="/terms" className="text-decoration-none">Terms of Service</Link> and <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                          </label>
                        </div>
                      </div>
                      
                      <div className="col-12">
                        <div className="d-grid">
                          <button type="submit" className="btn btn-primary">
                            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  
                  <div className="text-center mt-4 mb-3">
                    <p className="text-muted">Or register with</p>
                    <div>
                      <button className="btn btn-outline-danger me-2">
                        <FontAwesomeIcon icon={faGoogle} className="me-2" />
                        Google
                      </button>
                      <button className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faFacebook} className="me-2" />
                        Facebook
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="mb-0">Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default Register;
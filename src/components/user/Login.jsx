import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';


const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      rememberMe: false
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login to Your Account</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                
                <div className="mb-3">
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
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="rememberMe" 
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div>
                    <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                  </div>
                </div>
                
                <div className="d-grid mb-4">
                  <button type="submit" className="btn btn-primary">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    Login
                  </button>
                </div>
              </form>
              
              <div className="text-center mb-3">
                <p className="text-muted">Or login with</p>
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
                <p className="mb-0">Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
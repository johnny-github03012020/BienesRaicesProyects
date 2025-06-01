import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faHeart, faEnvelope, faUser, 
  faCog, faSignOutAlt, faPlus, faEdit, faTrash,
  faEye, faCheckCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    memberSince: 'January 2022'
  };
  
  // Mock saved properties
  const savedProperties = [
    {
      id: 1,
      title: 'Modern Apartment with Ocean View',
      location: 'Miami, FL',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      location: 'Beverly Hills, CA',
      price: 2500000,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];
  
  // Mock messages
  const messages = [
    {
      id: 1,
      from: 'Sarah Johnson',
      subject: 'Property Inquiry',
      date: '2023-06-15',
      read: true
    },
    {
      id: 2,
      from: 'Michael Rodriguez',
      subject: 'Viewing Appointment',
      date: '2023-06-12',
      read: false
    },
    {
      id: 3,
      from: 'RealEstate Pro Team',
      subject: 'New Properties Available',
      date: '2023-06-10',
      read: true
    }
  ];
  
  // Mock property listings (for sellers)
  const myListings = [
    {
      id: 101,
      title: 'Downtown Loft',
      location: 'New York, NY',
      price: 850000,
      status: 'Active',
      views: 245,
      favorites: 18,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 102,
      title: 'Suburban Family Home',
      location: 'Austin, TX',
      price: 650000,
      status: 'Pending',
      views: 187,
      favorites: 12,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="rounded-circle mb-3" 
                width="100" 
                height="100"
              />
              <h5>{user.name}</h5>
              <p className="text-muted mb-0">Member since {user.memberSince}</p>
            </div>
            <div className="list-group list-group-flush">
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleTabChange('dashboard')}
              >
                <FontAwesomeIcon icon={faHome} className="me-2" /> Dashboard
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => handleTabChange('favorites')}
              >
                <FontAwesomeIcon icon={faHeart} className="me-2" /> Saved Properties
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => handleTabChange('messages')}
              >
                <FontAwesomeIcon icon={faEnvelope} className="me-2" /> Messages
                <span className="badge bg-primary rounded-pill ms-2">
                  {messages.filter(m => !m.read).length}
                </span>
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'listings' ? 'active' : ''}`}
                onClick={() => handleTabChange('listings')}
              >
                <FontAwesomeIcon icon={faHome} className="me-2" /> My Listings
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => handleTabChange('profile')}
              >
                <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => handleTabChange('settings')}
              >
                <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
              </button>
              <Link to="/logout" className="list-group-item list-group-item-action text-danger">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-lg-9">
          {/* Dashboard Overview */}
          {activeTab === 'dashboard' && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">Dashboard</h4>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body text-center">
                        <FontAwesomeIcon icon={faHeart} size="2x" className="text-primary mb-3" />
                        <h5>{savedProperties.length}</h5>
                        <p className="text-muted mb-0">Saved Properties</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body text-center">
                        <FontAwesomeIcon icon={faEnvelope} size="2x" className="text-primary mb-3" />
                        <h5>{messages.length}</h5>
                        <p className="text-muted mb-0">Messages</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body text-center">
                        <FontAwesomeIcon icon={faHome} size="2x" className="text-primary mb-3" />
                        <h5>{myListings.length}</h5>
                        <p className="text-muted mb-0">My Listings</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h5 className="mb-3">Recent Activity</h5>
                <div className="list-group">
                  <div className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">You saved a property</h6>
                      <small className="text-muted">3 days ago</small>
                    </div>
                    <p className="mb-1">Luxury Villa with Pool in Beverly Hills, CA</p>
                  </div>
                  <div className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">New message received</h6>
                      <small className="text-muted">5 days ago</small>
                    </div>
                    <p className="mb-1">Michael Rodriguez sent you a message about a viewing appointment</p>
                  </div>
                  <div className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">Property status updated</h6>
                      <small className="text-muted">1 week ago</small>
                    </div>
                    <p className="mb-1">Your listing "Suburban Family Home" is now marked as "Pending"</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Saved Properties */}
          {activeTab === 'favorites' && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">Saved Properties</h4>
              </div>
              <div className="card-body">
                {savedProperties.length > 0 ? (
                  <div className="row">
                    {savedProperties.map(property => (
                      <div className="col-md-6 mb-4" key={property.id}>
                        <div className="card h-100">
                          <img 
                            src={property.image} 
                            className="card-img-top" 
                            alt={property.title} 
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{property.title}</h5>
                            <p className="card-text text-muted mb-2">{property.location}</p>
                            <h6 className="text-primary mb-3">${property.price.toLocaleString()}</h6>
                            <div className="d-flex justify-content-between">
                              <Link to={`/properties/${property.id}`} className="btn btn-outline-primary">
                                View Details
                              </Link>
                              <button className="btn btn-outline-danger">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FontAwesomeIcon icon={faHeart} size="3x" className="text-muted mb-3" />
                    <h5>No saved properties yet</h5>
                    <p className="text-muted">Start browsing and save properties you're interested in.</p>
                    <Link to="/properties" className="btn btn-primary">
                      Browse Properties
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Messages */}
          {activeTab === 'messages' && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">Messages</h4>
              </div>
              <div className="card-body">
                {messages.length > 0 ? (
                  <div className="list-group">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`list-group-item list-group-item-action ${!message.read ? 'bg-light' : ''}`}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">
                            {!message.read && (
                              <span className="badge bg-primary me-2">New</span>
                            )}
                            {message.from}
                          </h6>
                          <small className="text-muted">{message.date}</small>
                        </div>
                        <p className="mb-1">{message.subject}</p>
                        <div className="d-flex mt-2">
                          <button className="btn btn-sm btn-outline-primary me-2">
                            <FontAwesomeIcon icon={faEnvelope} className="me-1" /> Read
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <FontAwesomeIcon icon={faTrash} className="me-1" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FontAwesomeIcon icon={faEnvelope} size="3x" className="text-muted mb-3" />
                    <h5>No messages yet</h5>
                    <p className="text-muted">Your messages will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* My Listings */}
          {activeTab === 'listings' && (
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">My Listings</h4>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Listing
                </button>
              </div>
              <div className="card-body">
                {myListings.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Property</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Views</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myListings.map(listing => (
                          <tr key={listing.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={listing.image} 
                                  alt={listing.title} 
                                  className="rounded me-3" 
                                  width="60" 
                                  height="60"
                                  style={{ objectFit: 'cover' }}
                                />
                                <div>
                                  <h6 className="mb-0">{listing.title}</h6>
                                  <small className="text-muted">{listing.location}</small>
                                </div>
                              </div>
                            </td>
                            <td>${listing.price.toLocaleString()}</td>
                            <td>
                              <span className={`badge ${listing.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>
                                {listing.status}
                              </span>
                            </td>
                            <td>{listing.views} views</td>
                            <td>
                              <div className="btn-group">
                                <button className="btn btn-sm btn-outline-primary">
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FontAwesomeIcon icon={faHome} size="3x" className="text-muted mb-3" />
                    <h5>No listings yet</h5>
                    <p className="text-muted">Start adding your properties for sale or rent.</p>
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Listing
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">Profile Information</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-4 text-center">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="rounded-circle mb-3" 
                      width="100" 
                      height="100"
                    />
                    <div>
                      <button type="button" className="btn btn-sm btn-outline-primary">
                        Change Photo
                      </button>
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        defaultValue="John"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        defaultValue="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      defaultValue={user.email}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      defaultValue={user.phone}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <textarea 
                      className="form-control" 
                      id="bio" 
                      rows="4"
                      placeholder="Tell us a bit about yourself"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}
          
          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0">Account Settings</h4>
              </div>
              <div className="card-body">
                <h5 className="mb-3">Password</h5>
                <form className="mb-4">
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="currentPassword" 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="newPassword" 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </form>
                
                <hr />
                
                <h5 className="mb-3">Notification Preferences</h5>
                <form className="mb-4">
                  <div className="form-check mb-2">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="emailNotifications" 
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="emailNotifications">
                      Email Notifications
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="smsNotifications" 
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="smsNotifications">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="marketingEmails" 
                    />
                    <label className="form-check-label" htmlFor="marketingEmails">
                      Marketing Emails
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">
                    Save Preferences
                  </button>
                </form>
                
                <hr />
                
                <h5 className="mb-3 text-danger">Danger Zone</h5>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn btn-outline-danger">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
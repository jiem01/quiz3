import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './pages/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import UserListPage from './pages/UserListPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/service/:id" element={<ServiceDetailPage />} /> {/* Single service */}
            <Route path="/users" element={<UserListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

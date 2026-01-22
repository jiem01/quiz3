import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // <-- add this
import store from './store'; // <-- make sure this path is correct

// Pages
import Header from './pages/Header';
// import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import UserListPage from './pages/UserListPage';
// import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import NoPage from './pages/NoPage';

function App() {
  return (
    <Provider store={store}>  {/* <-- wrap the app */}
      <Router>
        <Header />
        <main className='py-3'>
          <div className="container">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/service/:id' element={<ServiceDetailPage />} />
              <Route path='/users' element={<UserListPage />} />
              {/* <Route path='/profile' element={<ProfilePage />} /> */}
              <Route path='*' element={<NoPage />} />
            </Routes>
          </div>
        </main>
        {/* <Footer /> */}
      </Router>
    </Provider>
  );
}

export default App;

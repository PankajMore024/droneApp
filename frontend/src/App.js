import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Drone from './components/Drone';
import PrivateComponent from './components/privateComponent';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {

  const [drones, setDrones] = useState([]);

  const addDrone = (newDrone) => {
    setDrones([...drones, newDrone]);
  };

  const deleteDrone = (droneId) => {
    setDrones(drones.filter((drone) => drone._id !== droneId));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Profile />} />
            <Route path='/drones' element={<Drone addDrone={addDrone} deleteDrone={deleteDrone} />} />
            <Route path='/sites' element={<h1>Sites Component</h1>} />
            <Route path='/logout' element={<h1>Logout Component</h1>} />
            <Route path='/missions' element={<h1>Missions Component</h1>} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/Login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

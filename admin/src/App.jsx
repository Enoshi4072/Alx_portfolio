import React from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar'; // More descriptive name
import SideMenu from './components/SideMenu/SideMenu'; // More descriptive name
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodList from './pages/FoodList/FoodList'; // More descriptive name
import OrdersList from './pages/OrdersList/OrdersList'; // More descriptive name
import AddFood from './pages/AddFood/AddFood'; // More descriptive name
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const baseUrl = 'http://localhost:4000'; // Use a more generic name

  return (
    <Router>
      <div className="app-container"> {/* More descriptive class name */}
        <ToastContainer />
        <NavigationBar />
        <hr />
        <div className="app-content">
          <SideMenu />
          <Routes>
            <Route path="/add-food" element={<AddFood baseUrl={baseUrl} />} /> {/* Update path and component name */}
            <Route path="/food-list" element={<FoodList baseUrl={baseUrl} />} /> {/* Update path and component name */}
            <Route path="/orders" element={<OrdersList baseUrl={baseUrl} />} /> {/* Update path and component name */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

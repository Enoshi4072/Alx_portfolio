import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

const SidebarOption = ({ to, icon, label }) => (
  <NavLink to={to} className="sidebar-option">
    <img src={icon} alt={label} />
    <p>{label}</p>
  </NavLink>
);

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <SidebarOption to='/add' icon={assets.add_icon} label="Add Items" />
        <SidebarOption to='/list' icon={assets.order_icon} label="List Items" />
        <SidebarOption to='/orders' icon={assets.order_icon} label="Orders" />
      </div>
    </div>
  );
};

export default Sidebar;

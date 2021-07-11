import homeIcon from './img/homeIcon.png';
import equipIcon from './img/equipmentIcon.png';
import locationIcon from './img/locationIcon.png';
import usersIcon from './img/usersIcon.png';
import agentsIcon from './img/agentsIcon.png';
import reqIcon from './img/reqIcon.png';
import forecastIcon from './img/forecastIcon.png';

import './css/Sidebar.css' ;
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <div id="sidebar-header">
                <p id="title">Cold Chain Inventory Management System</p>  
                <p className="postscript">Epidemiology Unit, Ministry of Health, Sri Lanka</p> 
            </div>   
            <div className="sidebarlinkcont" id="homeLink">       
                <NavLink to="./home" id="homelink">
                    <img src={homeIcon} className="sidebaricon" alt=""/> Home
                </NavLink>
            </div>
            <div className="sidebarlinkcont" id="equipmentLink">    
                <NavLink to="./equipment" id="equipmentLink">
                    <img src={equipIcon} className="sidebaricon" alt=""/> Equipment
                </NavLink>
            </div>
            <div className="sidebarlinkcont"> 
                <NavLink to="./locations">
                    <img src={locationIcon} className="sidebaricon" alt=""/> Locations
                </NavLink>
            </div>
            <div className="sidebarlinkcont"> 
                <NavLink to="./users">
                    <img src={usersIcon} className="sidebaricon" alt=""/> Users
                </NavLink>
            </div>
            <div className="sidebarlinkcont">       
                <NavLink to="./agents">
                    <img src={agentsIcon} className="sidebaricon" alt=""/> Supply Agents
                </NavLink>
            </div>
            <div className="sidebarlinkcont">       
                <NavLink to="./requests">
                    <img src={reqIcon} className="sidebaricon" alt=""/> Requests
                </NavLink>
            </div>
            <div className="sidebarlinkcont">       
                <NavLink to="./forecasts">
                    <img src={forecastIcon} className="sidebaricon" alt=""/> Forecast
                </NavLink>
            </div>
        </div>
    );
}
export default Sidebar;
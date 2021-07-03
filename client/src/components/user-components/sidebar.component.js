import homeIcon from '../img/homeIcon.png';
import equipIcon from '../img/equipmentIcon.png';
import locationIcon from '../img/locationIcon.png';
import usersIcon from '../img/usersIcon.png';
import agentsIcon from '../img/agentsIcon.png';
import reqIcon from '../img/reqIcon.png';
import forecastIcon from '../img/forecastIcon.png';

import '../css/Sidebar.css' ;

function SidebarUser() {
    return (
        <div class="sidebar">
            <div id="sidebar-header">
                <p id="title">Cold Chain Inventory Management System</p>  
                <p className="postscript">Epidemiology Unit, Ministry of Health, Sri Lanka</p> 
            </div>  
            <div class="sidebarlinkcont">       
                <a href="./home">
                    <img src={homeIcon} className="sidebaricon" alt=""/> Home
                </a>
            </div>
            <div class="sidebarlinkcont">    
                <a href="./equipment">
                    <img src={equipIcon} className="sidebaricon" alt=""/> Equipment
                </a>
            </div>
            <div class="sidebarlinkcont"> 
                <a href="./locations">
                    <img src={locationIcon} className="sidebaricon" alt=""/> Locations
                </a>
            </div>
            <div class="sidebarlinkcont"> 
                <a href="./users">
                    <img src={usersIcon} className="sidebaricon" alt=""/> Users
                </a>
            </div>
            <div class="sidebarlinkcont">       
                <a href="./agents">
                    <img src={agentsIcon} className="sidebaricon" alt=""/> Supply Agents
                </a>
            </div>
            <div class="sidebarlinkcont">       
                <a href="./requests">
                    <img src={reqIcon} className="sidebaricon" alt=""/> Requests
                </a>
            </div>
            <div class="sidebarlinkcont">       
                <a href="./forecasts">
                    <img src={forecastIcon} className="sidebaricon" alt=""/> Forecast
                </a>
            </div>
        </div>
    );
}
export default SidebarUser;
import Button from 'react-bootstrap/Button';

import homeImage from './img/homeScreenPic.png';

import './css/Homepage.css' ;

function Homepage() {
    return (
        <div id="homepageContainer">            
            <div className="homepage" id="homepageContent"> 
                <div id="description">
                    Cold Chain Inventory Management System of the Ministry of Health of Sri Lanka.  
                </div><br/><br/><br/>
                <div className="homeOptions center" id="option1">
                    {/* <p>Log in as User</p> */}
                    <Button className="homepageBtn" variant="outline-info" href="./home/login-user">User Login</Button>
                    <br/><br/>
                </div>
                <div className="homeOptions center" id="option2">
                    {/* <p>Log in as Admin</p> */}
                    <Button className="homepageBtn" variant="outline-info" href="./home/login-admin">Admin Login</Button>
                </div>
            </div>
            <div className="homepage" id="homepageImage">  
                <img src={homeImage} className="center" id="homepageImg" alt=""></img>
            </div>
        </div>
    );
}
export default Homepage;
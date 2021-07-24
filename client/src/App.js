import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navigbar from './components/navigationbar.component';
import Sidebar from './components/sidebar.component';
import Homepage from './components/homePage.component';
import AddUser from "./components/create-user.comoponent";
import UserList from "./components/user-list.component";
import LocationList from "./components/location-list.component";
import AddLocation from "./components/create-location.comoponent";
import EditUser from "./components/edit-user.component";
import EditLocation from "./components/edit-location.component";
import AddItem from "./components/create-eqItem.comoponent";
import ItemList from "./components/eqItem-list.component";
import EditItem from "./components/edit-eqItem.component";
import AddEqType from "./components/create-eqType.comoponent";
import EqTypeList from "./components/eqType-list.component";
import ModelList from "./components/eqModel-list.component";
import AddModel from "./components/create-eqModel.comoponent";
import AgentList from "./components/agent-list.component";
import AddAgent from "./components/create-agent.comoponent";
import EditAgent from "./components/edit-agent.component";
import AdminLoginPage from "./components/adminLoginPage.component";
import UserLoginPage from "./components/userLoginPage.component";
import ItemListUser from "./components/user-components/eqItem-list.component";
import EditItemUser from "./components/user-components/edit-eqItem.component";
import SidebarUser from "./components/user-components/sidebar.component";
import EqTypeListUser from "./components/user-components/eqType-list.component";
import ModelListUser from "./components/user-components/eqModel-list.component";
import LocationListUser from "./components/user-components/location-list.component";
import UserListUser from "./components/user-components/user-list.component";
import AgentListUser from "./components/user-components/agent-list.component";
import NavigbarContent from "./components/navigationbar-content.component";
import Footer from "./components/footer.component";
import MaintenaceRequestList from "./components/reqMaintenace-list.component";
import AddMaintenaceRequest from "./components/user-components/create-reqMaintenance.comoponent";
import MaintenaceRequestListUser from "./components/user-components/reqMaintenace-list.component";
import AddMaintenaceRecord from "./components/create-maintenanceRecord.comoponent";
import MaintenaceRecordList from "./components/maintenanceRecord-list.component";
import EditMaintenaceRecord from "./components/edit-maintenanceRecord.comoponent";
import MaintenaceRecordListUser from "./components/user-components/maintenanceRecord-list.component";
import Report from "./components/Report.component";
// import Example from "./components/modal.component";

function App() {
  return (
    <div className="App">
      <Router>               
        <Route path="/home" component={Navigbar}/>
        <Route path={["/admin", "/user"]} component={NavigbarContent}/>
        <div id="bodyContainer">
        <Route path="/home" exact component={Homepage}/>
        <Route path="/home/login-admin" exact component={AdminLoginPage}/>
        <Route path="/home/login-user" exact component={UserLoginPage}/>
        <div id="sidebar-wrapper"> 
          <Route path="/admin" component={Sidebar}/>
          <Route path="/user" component={SidebarUser}/>
        </div>
        <div id="sidebarMain">
          <Route path="/admin/equipment" exact component={ItemList}/>
          <Route path="/admin/eqitem-add" exact component={AddItem}/> 
          <Route path="/admin/eqitem-edit/:id" exact component={EditItem}/>
          <Route path="/admin/eqtype" exact component={EqTypeList}/>
          <Route path="/admin/eqtype" exact component={AddEqType}/> 
          <Route path="/admin/model" exact component={ModelList}/> 
          <Route path="/admin/model" exact component={AddModel}/>        
          <Route path="/admin/locations" exact component={LocationList}/>
          <Route path="/admin/location-add" exact component={AddLocation}/> 
          <Route path="/admin/location-edit/:id" exact component={EditLocation}/>
          <Route path="/admin/users" exact component={UserList}/>
          <Route path="/admin/user-add" exact component={AddUser}/>
          <Route path="/admin/user-edit/:id" exact component={EditUser}/>
          <Route path="/admin/agents" exact component={AgentList}/>
          <Route path="/admin/agent-add" exact component={AddAgent}/>
          <Route path="/admin/agent-edit/:id" exact component={EditAgent}/>
          <Route path="/admin/reqmaintenance" exact component={MaintenaceRequestList}/>
          <Route path="/admin/maintenancerec" exact component={MaintenaceRecordList}/> 
          <Route path="/admin/maintenancerec-add" exact component={AddMaintenaceRecord}/>
          <Route path="/admin/maintenancerec-edit/:id" exact component={EditMaintenaceRecord}/> 
          <Route path={["/admin/home", "/user/home"]} exact component={Report}/> 
          

          <Route path="/user/equipment" exact component={ItemListUser}/>
          <Route path="/user/eqitem-edit/:id" exact component={EditItemUser}/>
          <Route path="/user/eqtype" exact component={EqTypeListUser}/>
          <Route path="/user/model" exact component={ModelListUser}/>
          <Route path="/user/locations" exact component={LocationListUser}/>
          <Route path="/user/users" exact component={UserListUser}/>
          <Route path="/user/agents" exact component={AgentListUser}/>
          <Route path="/user/reqmaintenance" exact component={MaintenaceRequestListUser}/>
          <Route path="/user/reqmaintenance-add" exact component={AddMaintenaceRequest}/> 
          <Route path="/user/maintenancerec" exact component={MaintenaceRecordListUser}/>          
        </div> 
        </div>
        <Route path="/home" component={Footer}/>       
      </Router>
    </div>
  );
}

export default App;
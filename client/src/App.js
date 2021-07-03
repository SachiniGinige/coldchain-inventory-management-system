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
// import Example from "./components/modal.component";

function App() {
  return (
    <div className="App">
      <Router>               
        <Route path="/home" component={Navigbar}/>
        <Route path="/admin" component={NavigbarContent}/>
        <Route path= "/user" component={NavigbarContent}/>
        <div id="bodyContainer">
        <Route path="/home/homepage" component={Homepage}/>
        <Route path="/home/login-admin" component={AdminLoginPage}/>
        <Route path="/home/login-user" component={UserLoginPage}/>
        <div id="sidebar-wrapper"> 
          <Route path="/admin" component={Sidebar}/>
          <Route path="/user" component={SidebarUser}/>
        </div>
        <div id="sidebarMain">
          <Route path="/admin/equipment" component={ItemList}/>
          <Route path="/admin/eqitem-add" component={AddItem}/> 
          <Route path="/admin/eqitem-edit/:id" component={EditItem}/>
          <Route path="/admin/eqtype" component={EqTypeList}/>
          <Route path="/admin/eqtype" component={AddEqType}/> 
          <Route path="/admin/model" component={ModelList}/> 
          <Route path="/admin/model" component={AddModel}/>        
          <Route path="/admin/locations" component={LocationList}/>
          <Route path="/admin/location-add" component={AddLocation}/> 
          <Route path="/admin/location-edit/:id" component={EditLocation}/>
          <Route path="/admin/users" component={UserList}/>
          <Route path="/admin/user-add" component={AddUser}/>
          <Route path="/admin/user-edit/:id" component={EditUser}/>
          <Route path="/admin/agents" component={AgentList}/>
          <Route path="/admin/agent-add" component={AddAgent}/>
          <Route path="/admin/agent-edit/:id" component={EditAgent}/>

          <Route path="/user/equipment" component={ItemListUser}/>
          <Route path="/user/eqitem-edit/:id" component={EditItemUser}/>
          <Route path="/user/eqtype" component={EqTypeListUser}/>
          <Route path="/user/model" component={ModelListUser}/>
          <Route path="/user/locations" component={LocationListUser}/>
          <Route path="/user/users" component={UserListUser}/>
          <Route path="/user/agents" component={AgentListUser}/>          
        </div> 
        </div>
        <Route path="/home" component={Footer}/>       
      </Router>
    </div>
  );
}

export default App;
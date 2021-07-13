const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const app=express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Asusvivo",
    database: "coldchain_db"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hello world!");
});


//Equipment Type
app.post("/eqtypes/add", (req, res) => {

    const name = req.body.name;

    console.log(req.body.name)

    const sqlInsert =  "INSERT INTO equipment_type (name) VALUES (?);";
    
    db.query(sqlInsert,[name], (err, result)=>{
        if(!err){
            console.log(result)
            res.json("Successfully added under ID: " + result.insertId);
        }
        else{
            res.json(err);
        }
    });    
});

app.get("/eqtypes/get", (req, res) => {
    const sqlSelect = "SELECT * FROM coldchain_db.equipment_type;";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {
                res.json(result);}
            else{
                res.json(err);                
            }        
    })
});

app.delete("/eqtypes/delete/:id", (req, res)=>{
    const id= req.params.id;

    const sqlDelete = "DELETE FROM equipment_type WHERE equipmentId = ?;";

    db.query(sqlDelete, id, (err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows===0){
                res.json("Nothing to be deleted under the ID: " + id);
            }
            else{
                res.json("Successfully Deleted");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.get("/eqtypes/get/:id", (req, res) => {
    const id= req.params.id;

    const sqlSelect = "SELECT * FROM equipment_type WHERE equipmentId= ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            console.log(result);        
            res.send(result[0]);
        }
        else{
            res.json(err);
        }
    })
});

app.put("/eqtypes/update/:id", (req, res)=>{
    const id= req.params.id;

    const name = req.body.name;

    const sqlUpdate = "UPDATE equipment_type SET name=? WHERE equipmentId = ?;";

    db.query(sqlUpdate, [name, id],(err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows>=1){
                res.json("Successfully Updated ID: " +id);
            }
            else{
                res.json("Unsuccessful");
            }            
        }
        else{
            res.json(err);
        }
    });
});

//Equipment Model
app.post("/models/add", (req, res) => {

    const name = req.body.name;
    const eqtype = req.body.eqtype;
    const supplyAgent = req.body.supplyAgent;

    console.log(req.body.name, req.body.eqtype, req.body.supplyAgent)

    const sqlInsert =  "INSERT INTO model (name,equipmentId,supplyAgentId) VALUES (?,?,?);";
    
    db.query(sqlInsert,[name,eqtype,supplyAgent], (err, result)=>{
        if(!err){
            console.log(result)
            res.json("Successfully added under ID: " + result.insertId);
        }
        else{
            res.json(err);
        }
    });    
});

app.get("/models/get", (req, res) => {

    const sqlSelect = "SELECT * FROM model;";
    
    db.query(sqlSelect, (err, result)=>{
        if(!err){       
            res.send(result);
        }
        else{
            res.json(err);
        }
    })
});

app.get("/models/get-table", (req, res) => {

    const sqlSelect = "SELECT m.modelId, m.name as model, t.name as eqtype, a.name as agent FROM model as m LEFT JOIN equipment_type as t ON m.equipmentId=t.equipmentId LEFT JOIN agent as a ON m.supplyAgentId=a.agentId ORDER BY m.modelId;";
    
    db.query(sqlSelect, (err, result)=>{
        if(!err){
            // console.log(result);        
            res.send(result);
        }
        else{
            res.json(err);
        }
    })
});

app.get("/models/getbyeq/:id", (req, res) => {
    const id= req.params.id;

    const sqlSelect = "SELECT * FROM model WHERE equipmentId= ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            // console.log(result);        
            res.send(result);
        }
        else{
            res.json(err);
        }
    })
});

app.delete("/models/delete/:id", (req, res)=>{
    const id= req.params.id;

    const sqlDelete = "DELETE FROM model WHERE modelId = ?;";

    db.query(sqlDelete, id, (err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows===0){
                res.json("Nothing to be deleted under the ID: " + id);
            }
            else{
                res.json("Successfully Deleted");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.get("/models/get/:id", (req, res) => {
    const id= req.params.id;

    const sqlSelect = "SELECT * FROM model WHERE modelId= ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            console.log(result);        
            res.send(result[0]);
        }
        else{
            res.json(err);
        }
    })
});

app.put("/models/update/:id", (req, res)=>{
    const id= req.params.id;

    const name = req.body.name;
    const eqtype = req.body.eqtype;
    const supplyAgent = req.body.supplyAgent;

    const sqlUpdate = "UPDATE model SET name=?, equipmentId=?, supplyAgentId=? WHERE modelId = ?;";

    db.query(sqlUpdate, [name, eqtype, supplyAgent, id],(err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows>=1){
                res.json("Successfully Updated ID: " +id);
            }
            else{
                res.json("Unsuccessful");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.get("/models/getagent/:id", (req, res) => {
    const id= req.params.id;

    // const sqlSelect = "SELECT name FROM agent WHERE agentId=(SELECT supplyAgentId FROM model WHERE modelId= ?);";
    const sqlSelect = "SELECT supplyAgentId FROM coldchain_db.model WHERE name = ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){  
            // console.log(result[0]);     
            res.send(result[0]);
        }
        else{
            res.json(err);
        }
    })
});


//Equipment Item
app.post("/eqitems/add", (req, res) => {

    const dateProcured = req.body.dateProcured;
    const productionYear = req.body.productionYear;
    const shelfLife = req.body.shelfLife;
    const manufacturer= req.body.manufacturer;
    const functionalStatus= req.body.functionalStatus;
    const eqtype= req.body.eqtype;
    const model= req.body.model;
    const location= req.body.location;
    const supplyAgent= req.body.supplyAgent;
    const maintenanceAgent= req.body.maintenanceAgent;

    console.log("eqtype:"+req.body.eqtype+" model:"+req.body.model+" loc:"+req.body.location)

    // const sqlInsert = "INSERT INTO equipment_item (dateProcured,productionYear,shelfLife,manufacturer,currentFunctionalStatus,equipmentId,modelId,locationId,supplyAgentId,maintenanceAgentId) VALUES (?, ?, ?, ?, ?, ?, (SELECT modelId FROM model where name =?), (SELECT locationId FROM location where name =?), ?, ?);";

    const sqlInsert = "INSERT INTO equipment_item (dateProcured,productionYear,shelfLife,manufacturer,currentFunctionalStatus,equipmentId,modelId,locationId,supplyAgentId,maintenanceAgentId) VALUES (?, ?, ?, ?, ?, ?, (SELECT modelId FROM model where name =?), ?, ?, ?);";
    
    db.query(sqlInsert,[dateProcured, productionYear, shelfLife, manufacturer, functionalStatus, eqtype, model, location, supplyAgent, maintenanceAgent], (err, result)=>{
        if(!err){
            console.log(result)
            res.json("Successfully added under ID: " + result.insertId);
        }
        else{
            res.json(err);
        }
    });    
});

app.get("/eqitems/get", (req, res) => {
    const sqlSelect = "SELECT * FROM coldchain_db.equipment_item;";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {
                res.json(result);}
            else{
                res.json(err);                
            }        
    })
});

app.get("/eqitems/get-table", (req, res) => {
    const sqlSelect = "SELECT i.itemId, i.dateProcured, i.productionYear, i.shelfLife, i.manufacturer, i.currentFunctionalStatus, t.name as equipment, m.name as model, l.name as location, sa.name as supplyAgent, ma.name as maintenanceAgent FROM coldchain_db.equipment_item AS i LEFT JOIN coldchain_db.equipment_type AS t ON (i.equipmentId = t.equipmentId) LEFT JOIN coldchain_db.location AS l ON (i.locationId = l.locationId) LEFT JOIN coldchain_db.agent AS sa ON (i.supplyAgentId = sa.agentId) LEFT JOIN coldchain_db.agent AS ma ON (i.maintenanceAgentId = ma.agentId) LEFT JOIN coldchain_db.model AS m ON (i.modelId = m.modelId) ORDER BY i.itemId;";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {
                res.json(result);}
            else{
                res.json(err);                
            }        
    })
});

app.get("/eqitems/getbyuser-table/:id", (req, res) => {
    const id= req.params.id;

    // const sqlSelect = "SELECT * FROM equipment_item WHERE locationId=(SELECT locationId FROM user WHERE userId= ?);";
    
    const sqlSelect = "SELECT i.itemId, i.dateProcured, i.productionYear, i.shelfLife, i.manufacturer, i.currentFunctionalStatus, t.name as equipment, m.name as model, l.name as location, sa.name as supplyAgent, ma.name as maintenanceAgent FROM coldchain_db.equipment_item AS i LEFT JOIN coldchain_db.equipment_type AS t ON (i.equipmentId = t.equipmentId) LEFT JOIN coldchain_db.location AS l ON (i.locationId = l.locationId) LEFT JOIN coldchain_db.agent AS sa ON (i.supplyAgentId = sa.agentId) LEFT JOIN coldchain_db.agent AS ma ON (i.maintenanceAgentId = ma.agentId) LEFT JOIN coldchain_db.model AS m ON (i.modelId = m.modelId) WHERE i.locationId=(SELECT locationId FROM coldchain_db.user WHERE userId=?) ORDER BY i.itemId;";

    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            res.json(result);
        }
        else{
            res.json(err);
        }
    })
});

// app.get("/eqitems/get-search/:val", (req, res) => {
//     const val=req.params.val;

//     const sqlSelect = "SELECT * FROM coldchain_db.equipment_item WHERE (SELECT locationId FROM location where name = ?) ORDER BY itemId";

//     db.query(sqlSelect, val, (err,result)=>{
//            if(!err) {
//                 res.json(result);}
//             else{
//                 res.json(err);                
//             }        
//     })
// });

app.delete("/eqitems/delete/:id", (req, res)=>{
    const id= req.params.id;

    const sqlDelete = "DELETE FROM equipment_item WHERE itemId = ?;";

    db.query(sqlDelete, id, (err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows===0){
                res.json("Nothing to be deleted under the ID: " + id);
            }
            else{
                res.json("Successfully Deleted");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.get("/eqitems/get/:id", (req, res) => {
    const id= req.params.id;

    const sqlSelect = "SELECT * FROM equipment_item WHERE itemId= ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            console.log(result);        
            res.send(result[0]);
        }
        else{
            res.json(err);
        }
    })
});

app.put("/eqitems/update/:id", (req, res)=>{
    const id= req.params.id;

    const dateProcured = req.body.dateProcured;
    const productionYear = req.body.productionYear;
    const shelfLife = req.body.shelfLife;
    const manufacturer= req.body.manufacturer;
    const functionalStatus= req.body.functionalStatus;
    const eqtype= req.body.eqtype;
    const model= req.body.model;
    const location= req.body.location;
    const supplyAgent= req.body.supplyAgent;
    const maintenanceAgent= req.body.maintenanceAgent;

    // console.log(req.body.supplyAgent+"  "+req.body.maintenanceAgent);

    const sqlUpdate = "UPDATE equipment_item SET dateProcured=?, productionYear=?, shelfLife=?, manufacturer=?, currentFunctionalStatus=?, equipmentId=?, modelId=(SELECT modelId FROM model where name =?) , locationId=?, supplyAgentId=?, maintenanceAgentId=? WHERE itemId = ?;";

    db.query(sqlUpdate, [dateProcured, productionYear, shelfLife, manufacturer, functionalStatus, eqtype, model, location, supplyAgent, maintenanceAgent, id],(err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows>=1){
                res.json("Successfully Updated ID: " +id);
            }
            else{
                res.json("Unsuccessful");
            }            
        }
        else{
            res.json(err);
        }
    });
});


//User
app.post("/users/add", (req, res) => {

    const name = req.body.name;
    const designation = req.body.designation;
    const email = req.body.email;
    const contactNo= req.body.contactNo;
    const username= req.body.username;
    const password= req.body.password;
    const location= req.body.location;

    console.log(req.body.location)

    const sqlInsert =  "INSERT INTO user (name,designation,email,contactNo,username,password,locationId) VALUES (?, ?, ?, ?, ?, ?, ?);";
    
    db.query(sqlInsert,[name, designation, email, contactNo, username, password, location], (err, result)=>{
        if(!err){
            console.log(result)
            res.json("Successfully added under ID: " + result.insertId);
        }
        else{
            res.json(err);
        }
    });    
});

app.get("/users/get", (req, res) => {
    const sqlSelect = "SELECT * FROM coldchain_db.user;";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {
                // console.log(result)
                res.json(result);}
            else{
                res.json(err);                
            }        
    })
});

app.get("/users/get-table", (req, res) => {
    const sqlSelect = "SELECT u.userId, u.name, u.designation, u.email, u.contactNo, l.name as location FROM coldchain_db.user AS u LEFT JOIN coldchain_db.location AS l ON (u.locationId = l.locationId);";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {
                res.json(result);}
            else{
                res.json(err);                
            }        
    })
});

app.delete("/users/delete/:id", (req, res)=>{
    const id= req.params.id;

    const sqlDelete = "DELETE FROM user WHERE userId = ?;";

    db.query(sqlDelete, id, (err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows===0){
                res.json("Nothing to be deleted under the ID: " + id);
            }
            else{
                res.json("Successfully Deleted");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.get("/users/get/:id", (req, res) => {
    const id= req.params.id;

    const sqlSelect = "SELECT * FROM user WHERE userId= ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            console.log(result)

            //To send result as array (which contains the required object as first element or [0])
            // res.json(result);
            // res.send(result); gives same result
            
            //to send the first element of the array (which contains only required element)
            res.send(result[0]);
            // res.json(result[0]); gives same result
        }
        else{
            res.json(err);
        }
    })
});

app.put("/users/update/:id", (req, res)=>{
    const id= req.params.id;

    const name = req.body.name;
    const designation = req.body.designation;
    const email = req.body.email;
    const contactNo= req.body.contactNo;
    const username= req.body.username;
    const password= req.body.password;
    const location= req.body.location;

    const sqlUpdate = "UPDATE user SET name=?, designation=?, email=?, contactNo=?, username=?, password=?, locationId=? WHERE userId = ?;";

    db.query(sqlUpdate, [name, designation, email, contactNo, username, password, location, id],(err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows>=1){
                res.json("Successfully Updated ID: " +id);
            }
            else{
                res.json("Unsuccessful");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.post("/users/login/", (req, res) => {

    const username=req.body.username;
    const password=req.body.password;
    const sqlSelect = "SELECT * FROM coldchain_db.user where username=? AND password=?;";
    
    db.query(sqlSelect,[username,password], (err,result)=>{
            if(!err) {                
                if(result.length>0){
                    console.log("Successfully logged in. Welcome "+result[0].username+"!");
                    res.json(result[0]);}
                else{                    
                    res.json({message: "Invalid credentials"});}
            }
            else{
                res.json({err: err});
            }        
    })
});


//Locations
app.post("/locations/add", (req, res) => {

    const name = req.body.name;
    const level = req.body.level;
    const address = req.body.address;
    const contactPerson = req.body.contactPerson;
    const contactNo1= req.body.contactNo1;
    const contactNo2= req.body.contactNo2;
    const status= req.body.status;

    console.log(req.body.name)

    const sqlInsert =  "INSERT INTO location (name,level,address,contactPerson,contactNo1,contactNo2,status) VALUES (?, ?, ?, ?, ?, ?, ?);";
    
    db.query(sqlInsert,[name, level, address, contactPerson, contactNo1, contactNo2, status], (err, result)=>{
        if(!err){
            console.log(result)
            res.json("Successfully added under ID: " + result.insertId);
        }
        else{
            res.json(err);
        }
    });    
});

app.get("/locations/get", (req, res) => {
    const sqlSelect = "SELECT * FROM coldchain_db.location ORDER BY level;";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {
                res.json(result);}
            else{
                res.json(err);
            }        
    })
});

app.get("/locations/get-districts", (req, res) => {
    const sqlSelect = "SELECT * FROM coldchain_db.location where level=?;";
    
    db.query(sqlSelect, "District", (err,result)=>{
           if(!err) {
                res.json(result);}
            else{
                res.json(err);
            }        
    })
});

app.delete("/locations/delete/:id", (req, res)=>{
    const id= req.params.id;

    const sqlDelete = "DELETE FROM location WHERE locationId = ?;";

    db.query(sqlDelete, id, (err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows===0){
                res.json("Nothing to be deleted under the ID: " + id);
            }
            else{
                res.json("Successfully Deleted");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.get("/locations/get/:id", (req, res) => {
    const id= req.params.id;

    const sqlSelect = "SELECT * FROM location WHERE locationId= ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            console.log(result[0]);        
            res.send(result[0]);
        }
        else{
            res.json(err);
        }
    })
});

app.put("/locations/update/:id", (req, res)=>{
    const id= req.params.id;

    const name = req.body.name;
    const level = req.body.level;
    const address = req.body.address;
    const contactPerson = req.body.contactPerson;
    const contactNo1= req.body.contactNo1;
    const contactNo2= req.body.contactNo2;
    const status= req.body.status;

    const sqlUpdate = "UPDATE location SET name=?,level=?,address=?,contactPerson=?, contactNo1=?, contactNo2=?, status=? WHERE locationId = ?;";

    db.query(sqlUpdate, [name, level, address, contactPerson, contactNo1, contactNo2, status, id],(err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows>=1){
                res.json("Successfully Updated ID: " +id);
            }
            else{
                res.json("Unsuccessful");
            }            
        }
        else{
            res.json(err);
        }
    });
});

//Agents (Supply and Maintenance)
app.post("/agents/add", (req, res) => {

    const name = req.body.name;
    const contactPerson = req.body.contactPerson;
    const contactNo= req.body.contactNo;
    const email= req.body.email;
    const address= req.body.address;

    console.log(req.body.name)

    const sqlInsert =  "INSERT INTO agent (name,contactPerson,contactNo,email,address) VALUES (?, ?, ?, ?, ?);";
    
    db.query(sqlInsert,[name, contactPerson, contactNo, email, address], (err, result)=>{
        if(!err){
            console.log(result)
            res.json("Successfully added under ID: " + result.insertId);
        }
        else{
            res.json(err);
        }
    });    
});

app.get("/agents/get", (req, res) => {
    const sqlSelect = "SELECT * FROM coldchain_db.agent;";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {
                res.json(result);}
            else{
                res.json(err);
            }        
    })
});

app.delete("/agents/delete/:id", (req, res)=>{
    const id= req.params.id;

    const sqlDelete = "DELETE FROM agent WHERE agentId = ?;";

    db.query(sqlDelete, id, (err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows===0){
                res.json("Nothing to be deleted under the ID: " + id);
            }
            else{
                res.json("Successfully Deleted");
            }            
        }
        else{
            res.json(err);
        }
    });
});

app.get("/agents/get/:id", (req, res) => {
    const id= req.params.id;

    const sqlSelect = "SELECT * FROM agent WHERE agentId= ?;";
    
    db.query(sqlSelect, id , (err, result)=>{
        if(!err){
            console.log(result);        
            res.send(result[0]);
        }
        else{
            res.json(err);
        }
    })
});

app.put("/agents/update/:id", (req, res)=>{
    const id= req.params.id;

    const name = req.body.name;
    const contactPerson = req.body.contactPerson;
    const contactNo= req.body.contactNo;
    const email= req.body.email;
    const address= req.body.address;

    const sqlUpdate = "UPDATE agent SET name=?, contactPerson=?, contactNo=?, email=?, address=? WHERE agentId = ?;";

    db.query(sqlUpdate, [name, contactPerson, contactNo, email, address, id],(err, result)=>{
        if(!err){
            console.log(result)
            if(result.affectedRows>=1){
                res.json("Successfully Updated ID: " +id);
            }
            else{
                res.json("Unsuccessful");
            }            
        }
        else{
            res.json(err);
        }
    });
});


//  Admin
app.get("/admin/get", (req, res) => {
    const sqlSelect = "SELECT * FROM coldchain_db.admin;";
    
    db.query(sqlSelect, (err,result)=>{
           if(!err) {                
                res.json(result);}
            else{
                res.json(err);
            }        
    })
});

app.get("/admin/getbyusername/:id", (req, res) => {

    const id=req.params.id;
    const sqlSelect = "SELECT * FROM coldchain_db.admin where username=?;";
    
    db.query(sqlSelect, id, (err,result)=>{
           if(!err) {
                console.log(result);
                res.json(result);}
            else{
                res.json(err);
            }        
    })
});

app.post("/admin/login/", (req, res) => {

    const username=req.body.username;
    const password=req.body.password;
    const sqlSelect = "SELECT * FROM coldchain_db.admin where username=? AND password=?;";
    
    db.query(sqlSelect,[username,password], (err,result)=>{
            if(!err) {                
                if(result.length>0){
                    console.log("Successfully logged in as Admin. Welcome "+result[0].username+"!");
                    res.json(result[0]);}
                else{                    
                    res.json({message: "Invalid credentials"});}
            }
            else{
                res.json({err: err});
            }        
    })
});


app.listen(3001, () => {
    console.log("running on port 3001");
});

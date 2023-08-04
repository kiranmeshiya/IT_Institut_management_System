import './App.css';
import * as React from 'react';
import { Routes, Route } from "react-router-dom"
import Dashboard from './Component/Dashboard';
import Login from './Component/login';
import Addcourse from './Component/Addcourse';
import Addcontent from './Component/Addcontent';
import Viewcourse from './Component/Viewcourse';
import Newadmission from './Component/Newadmission';
import Updatecourse from './Component/Updatecourse';
import Viewcontent from './Component/Viewcontent';
import Updatecontent from './Component/Updatecontent';
import Viewadmission from './Component/Viewadmission';
import CollapsibleTable from './Component/abc';
import UpdateStudentdetail from './Component/UpdateStudentdetail';
import Viewstudent from './Component/Viewstudent';


function App() {
  
  return (
   <>

      <Routes>
     <Route path="/" element={ localStorage.getItem('token') ? <Dashboard /> : <Login />} />
      <Route path="/dashboard" element={localStorage.getItem('token') !== null ? (<Dashboard />) : (<Login />)}/>
      <Route path="/addcourse" element={ <Addcourse /> } />
      <Route path="/viewcourse" element={ <Viewcourse /> } />
      <Route path="/updatecourse/:id" element={ <Updatecourse /> } />
      <Route path="/addcontent" element={ <Addcontent /> } />
      <Route path='/viewcontent' element={<Viewcontent/>}/>
      <Route path="/updatecontent/:id" element={ <Updatecontent /> } />
      <Route path="/newadmission" element={ <Newadmission /> } />
      <Route path='/viewadmission' element={<Viewadmission/>}/>
      <Route path='/updatestudentDetails/:id' element={<UpdateStudentdetail/>}/>
      <Route path='/viewstudent/:id' element={<Viewstudent/>}/>
  

      </Routes>
      

   </>
  );
}


export default App;

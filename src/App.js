import React from 'react';
import './App.css';
import InstanceCards from './Components/InstanceCards/InstanceCards';


import {Route } from 'react-router-dom'
import Layout from './Components/Containers/Layout/Layout'
import RegisterInstance from './Components/RegisterInstance/RegisterInstance'
import instanceDetails from './Components/instanceDetails/instanceDetails'

function App() {
  
  return (
     <Layout>
         <Route path="/" exact  component={InstanceCards}/>
         <Route path="/register" exact component={RegisterInstance}/>
         <Route path="/instanceDetail"  component={instanceDetails}/>
     </Layout>
  );
}

 

export default App;

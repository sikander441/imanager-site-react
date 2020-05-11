import React from 'react';
import './App.css';
import InstanceCards from './Components/InstanceCards/InstanceCards';
import NavBar from './Components/NavBar/NavBar'

function App() {
  return (
     <React.Fragment>
    <NavBar/>
    <div className="App">
     <InstanceCards/>
    </div>
    </React.Fragment>
  );
}

export default App;

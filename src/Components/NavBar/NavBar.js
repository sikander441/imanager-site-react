import React,{Component} from 'react';
import './NavBar.css'
class NavBar extends Component{
  render(){
    return (

      <nav className="navbar navbar-expand-lg ">
           <div className="container-fluid ">
                 <div className="navbar-header">
                   <span className="navbar-brand mb-0 h1">iManager</span>
               </div>
               <ul className="nav navbar-nav navbar-right">
                       <li className= " nav-item dropdown">
                           <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">
                           <span className="fas fa-user caret"></span> Account</button>

                           <ul className="dropdown-menu ">
                           <li><a className="dropdown-item" href="/"> Log out</a></li>
                           <li><a className="dropdown-item" href="/"> Edit profile</a></li>
                           </ul>
                       </li>

                   </ul>

           </div>

       </nav>
    )
  }
}

export default NavBar;

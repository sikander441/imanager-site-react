import React,{Component} from 'react';
import './NavBar.css'
import {withRouter,Link} from 'react-router-dom'
class NavBar extends Component{
  render(){
    return (
      <nav className="navbar navbar-expand-lg ">
           <div className="container-fluid ">
                 <div className="navbar-header">
                 <Link to="/"><span  className="navbar-brand mb-0 h1">iManager</span></Link>
                </div>
               <ul className="nav navbar-nav navbar-right">
                     <Link to="/register"> <li>
                      <button className="btn btn-default "  type="button">
                         Register Instance
                      </button>
                      </li>
                      </Link>


                   </ul>

           </div>

       </nav>
        
    )
  }
}

export default withRouter(NavBar);

import React,{Component} from 'react'
import './InstanceCard.css'
import axios from 'axios'
import Switch from "react-switch";
import {withRouter,Link} from 'react-router-dom'

class InstanceCard extends Component{
  state={
    refreshing:false,
    status:this.props.instance.status,
    checked:this.props.instance.status.toLowerCase()==="down"?false:true
  }
  disabled=false;
   refresh = () =>{
     this.setState({refreshing:true})
     let url = `http://INW1PF14DEZC:3000/instances/isUp/${this.props.instance._id}`
     axios.get(url)
     .then(res => {
      this.setState({status:res.data,refreshing:false,checked:res.data.toLowerCase()==="down"?false:true})
     if(res.data.toLowerCase()==="up")
      this.disabled=false;
    }).catch(err =>{
      console.log('came here')
      this.setState({refreshing:false})
      console.log(err)
    } )

  }
  handleChange = ()=>{
    this.setState({checked:!this.state.checked})
     let url=`http://INW1PF14DEZC:3000/instances/shutdown?id=${this.props.instance._id}`
    if(this.state.status.toLowerCase()==="down"){
     url=`http://localhost:3000/instances/startup/${this.props.instance._id}`
     this.disabled=true;
     setTimeout(() => {
       console.log('button enabled again')
       this.refresh();
       this.disabled=false;
    }, 180000);
   }
    axios.get(url)
    .then(res => {
      alert(res.data)
    }).catch(err => console.log(err))
  }

  render()
  {
    var spin=null;
    if(this.state.refreshing)
     spin="fa-spin";

    var border="border-success"
    if(this.state.status.toLowerCase()==="down")
     border="border-danger"
    return (
       <div className="col-md-4 ">
          <div className={`card shadow  mb-3 ${border}`}>
              <div className="card-body">
                  <div className="card-title ">
                  <h6>{this.props.instance.version}<Switch disabled={this.disabled} className="float-right" onChange={ () => this.handleChange() } checked={this.state.checked} height={16} width={32}/> </h6 >

                  </div>

                  <hr className="dotted"/>

                  <p className="card-text">
                  URL:<a target="_blank"  className="links "  href={`http://${this.props.instance.host}:${this.props.instance.port}`}>{this.props.instance.host}:{this.props.instance.port}</a><br/>
                    Logs(Catalina)<a className="links" target="_blank" href={`http://INW1PF14DEZC:3000/instances/getLogs/${this.props.instance._id}/catalina`}>click here!</a><br/>
                    Logs(Node):<a  className="links"  target="_blank" href={`http://INW1PF14DEZC:3000/instances/getLogs/${this.props.instance._id}/node`}>click here!</a><br/>
                      <b>Refresh Status</b> <i onClick={ ()=> this.refresh()}className={`f fas fa-sync ${spin}`}></i>
                  </p>


              </div>
              <div className="card-footer ">
              <Link to={`instanceDetail?_id=${this.props.instance._id}`}> <button type="button" className="btn  btn-sm btn-block card-link">Instance Details </button></Link>
              </div>
          </div>
        </div>
    )
  }
}

export default withRouter(InstanceCard)

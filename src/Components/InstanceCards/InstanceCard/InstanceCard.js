import React,{Component} from 'react'
import './InstanceCard.css'
class InstanceCard extends Component{


  constructor(props){
    super(props);
    this.state={
      status:props.instance.status,
      style:{
        background:"yellow",
      }
    }
  }
  componentDidMount(){
    if(this.state.status=="Down")
     this.setState({style:{background:'#eeeeee'}})
    else
     this.setState({style:{background:'#00adb5'}})
  }
  render()
  {

    return (
       <div className="col-md-4">
          <div className="card shadow " style={this.state.style}>
              <div className="card-body">
                  <h5 className="card-title ">{this.props.instance.version}</h5>
                  <hr className="dotted"/>
                  <p className="card-text">
                  URL: {this.props.instance.host}:{this.props.instance.port}

                  </p>
                  <a href="#" className="btn btn-default" >Go somewhere</a>
              </div>
          </div>
        </div>
    )
  }
}

export default InstanceCard

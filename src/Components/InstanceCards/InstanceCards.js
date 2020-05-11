import React,{Component} from 'react'
import InstanceCard from './InstanceCard/InstanceCard'
import axios from 'axios';
class InstanceCards extends Component{

 state={
   instances:[]
 }
 componentDidMount(){
   axios.get(`http://localhost:3000/instances`)
   .then(res => {
     const instances = res.data.data;
     console.log(instances)
     this.setState({ instances });
   })
}

  render()
  {
    return (
      <div className="container">
        <div className="row">
          {this.state.instances.map( (item)=> {
            return <InstanceCard instance={item}/>
          } )}
        </div>
       </div>
    )
  }
}

export default InstanceCards

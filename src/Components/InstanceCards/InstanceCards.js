import React,{Component} from 'react'
import InstanceCard from './InstanceCard/InstanceCard'
import axios from 'axios';


class InstanceCards extends Component{

 state={
   instances:[],
   filter:""
 }
 componentDidMount(){
   axios.get(`http://inmgr01:3000/instances`)
   .then(res => {
     const instances = res.data.data;
     this.setState({ instances });
   }).catch(err => console.log(err))
   
  
}

handleChange = event => {
  this.setState({ filter: event.target.value });
};


  render()
  {
      const { filter, instances } = this.state;
      const lowercasedFilter = filter.toLowerCase();
      const filteredData = instances.filter(item => {
       return item.version.toLowerCase().includes(lowercasedFilter)
     });
    return (
      <React.Fragment>
      <center> <h5 className='center' style={{marginBottom:"20px"}}> Total Instances: {filteredData.length}</h5> </center>
      <div className="container">
        <div className="input-group col-12">
            <div className="input-group-prepend">
              <span className="input-group-text " id=""><b>Filter by Version:</b></span>
            </div>
            <input className="search-query form-control" value={filter} onChange={this.handleChange} />
        </div>

        <div className="row">
             {filteredData.sort((a,b) => a.status.toLowerCase()=="up"?-1:1000).map( (item)=> {
               return <InstanceCard instance={item} key={item._id}/>
             } )}
        </div>
     </div>
     </React.Fragment>
    );
  }
}

export default InstanceCards

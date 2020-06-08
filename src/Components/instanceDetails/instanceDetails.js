import React,{Component} from 'react';
import './instanceDetails.css'
import axios from 'axios';
import queryString from 'query-string'

class instanceDetails extends Component{
    
    state = {
        version:"",
        sshPort:22,
        logDirectory:"",
        domainName:"",
        ihome:"",
        host:"",
        port:0,
        instancePassword:"",
        instanceUser:""

    }
    componentDidMount(){
        const _id = queryString.parse(this.props.location.search)._id
        axios.get(`http://INW1PF14DEZC:3000/instances?_id=${_id}`)
   .then(res => {
     const instance = res.data.data;
    this.setState({
        version:instance[0].version,
        sshPort:instance[0].sshPort,
        logDirectory:instance[0].logDirectory,
        domainName:instance[0].domainName,
        ihome:instance[0].ihome,
        host:instance[0].host,
        port:instance[0].port,
        instancePassword:instance[0].instancePassword,
        instanceUser:instance[0].instanceUser
    })
   }).catch(err => console.log(err))
    }
    

    render(){
        
        return (
           
            <React.Fragment>

            <h2>Instance Details</h2>
                    
                <table className="table table-hover  table-responsive-sm table-sm table-active">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Key</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>version</td>
                                <td>{this.state.version}</td>
                       
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>sshPort</td>
                                <td>{this.state.sshPort}</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>logDirectory</td>
                                <td>{this.state.logDirectory}</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>domainName</td>
                                <td>{this.state.ihome}</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>ihome</td>
                                <td>{this.state.ihome}</td>
                            </tr>
                              <tr>
                                <th scope="row">6</th>
                                <td>Admin Console</td>
                                <td><a target="_blank" href={`http://${this.state.host}:${this.state.port}`}>{`${this.state.host}:${this.state.port}`}</a></td>
                            </tr>
                            <tr>
                                <th scope="row">9</th>
                                <td>instanceUser</td>
                                <td>{this.state.instanceUser}</td>
                            </tr>
                            <tr>
                                <th scope="row">10</th>
                                <td>instancePassword</td>
                                <td>{this.state.instancePassword}</td>
                            </tr>
                        </tbody>
                    </table>
            <br/>
           
            <div className="LogButtons" id="test">
               <p>
                    <button className="btn btn-default"  type="button" data-toggle="collapse" data-target="#logs" >Catalina.out</button>
                    <button className="btn btn-default"  type="button" data-toggle="collapse" data-target="#logs" >node.log</button>
               </p>
                
                <div className="collapse" id="logs">
                    
                    <div className="card card-body">
                        <button className="btn btn-primary" id="refresh" type="button"><span className="fas fa-sync"></span> Refresh</button>
                      Test 1 node log

                    </div>
                </div>
              
            </div>
            
            </React.Fragment>

        )
    }
}

export default instanceDetails;
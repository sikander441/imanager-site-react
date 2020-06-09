import React,{Component} from 'react';
import './instanceDetails.css'
import axios from 'axios';
import queryString from 'query-string'
import Terminal from 'terminal-in-react';

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
    processCommand(cmd,cb)
    {
        const _id = queryString.parse(this.props.location.search)._id
        console.log(cmd)
        axios.post(`http://inmgr01:3000/instances/runSSH`,{id:_id,cmd:cmd.join(" ")})
        .then ( res => {
            cb(res.data)
        }).catch( err =>{
            cb(err.message)
        })
    }
    componentDidMount(){
        const _id = queryString.parse(this.props.location.search)._id
        axios.get(`http://inmgr01:3000/instances?_id=${_id}`)
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
                <Terminal
          color='green'
          backgroundColor='black'
          barColor='black'
          startState='maximised'
          style={{ fontWeight: "bold", fontSize: "1em", height: "60vh" }}
          commandPassThrough ={
             (cmd,cb) => this.processCommand(cmd,cb)
          }
          descriptions={{
            color: false, show: false, clear: false
          }}
          msg='You can run basic commands like cp,mv, cat etc.Please note:  vi, cd,tailf  etc are not supported.'
        />

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
                                <td>Domain Name</td>
                                <td>{this.state.domainName}</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Infa Home</td>
                                <td>{this.state.ihome}</td>
                            </tr>
                              <tr>
                                <th scope="row">6</th>
                                <td>Admin Console URL</td>
                                <td><a target="_blank" href={`http://${this.state.host}:${this.state.port}`}>{`${this.state.host}:${this.state.port}`}</a></td>
                            </tr>
                            <tr>
                                <th scope="row">7</th>
                                <td>Username</td>
                                <td>{this.state.instanceUser}</td>
                            </tr>
                            <tr>
                                <th scope="row">8</th>
                                <td>Password</td>
                                <td>{this.state.instancePassword}</td>
                            </tr>
                        </tbody>
                    </table>
            <br/>
           

            
            </React.Fragment>

        )
    }
}

export default instanceDetails;
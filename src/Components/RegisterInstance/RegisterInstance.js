import React,{Component} from 'react';
import './RegisterInstance.css'
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


class RegisterInstance extends Component{

    state={
        testingConnection:false,
        testPerformed:false,
        testConnResults:null,
        testConnStatus:null,
        instance:{
            host:'',
            linuxUser:'',
            linuxPassword:'',
            sshPort:22,
            instanceUser:'',
            instancePassword:'',
            ihome:''
        },
        processing:false
    }
    handleTestConnection = async () =>{

        this.setState({testingConnection:true})
        var result = ""
        let instance=this.state.instance
        if(instance.host==='' || instance.linuxUser==='' || !instance.linuxPassword==='')
         {
             this.setState({testingConnection:false,testConnResults:'Hostname, linux username, linux password is required to perform test connection!',testPerformed:true})
             return result
         }
         
        let url=`http://inmgr01:3000/instances/testConnection?host=${instance.host}&linuxPassword=${instance.linuxPassword}&linuxUser=${instance.linuxUser}&port=${instance.sshPort}`
       
       try{
        const res = await Axios.get(url)
         if(res.data.status==='success'){
                toast.success(res.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.setState({testConnStatus:'success'})
            console.log('Came here')
            result="success"
        }else{

            toast.error(res.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                this.setState({testConnStatus:'fail'})
                result="fail"
            }
       }catch(err){
            toast.error(err.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                this.setState({testConnStatus:'fail'})
                result="fail"

        }finally{
        this.setState({testingConnection:false,testPerformed:true,testConnResults:null})
        return result
       } 
        
    }

    handleInputChange =  (e)=> {
        const id = e.target.id;
        const value = e.target.value
        this.setState( (prevState) => {
            prevState.instance[id]=value
            return {
                    ...prevState
                }
            }
        )
    }
    handleSubmit = async (event) =>{
        this.setState({processing:true})
        event.preventDefault()
        if(!this.state.testConnStatus || this.state.testConnStatus==='fail')
         {
             let res =  await this.handleTestConnection();
             console.log(res)
             if(res!="success")
             {
                this.setState({processing:false})
                return;
             }
            
         }
         console.log('fetching')
         Axios.post('http://inmgr01:3000/instances',this.state.instance)
         .then((res) => {
            console.log(res.data)
             if(res.data.status=="success")
            {
                toast.success(`Instance Registered Succesfully with id: ${res.data.instance._id}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else{
                toast.error(res.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                }
            
         }
         ).catch( (e) =>{
            toast.error(e.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

         }).finally(()=>
            this.setState({processing:false})
         )
        
    }

 render(){
    let testResults  = null
    if(this.state.testingConnection)
     testResults = (<div>Testing Connection<Loader visible={true} type="ThreeDots" color="#00BFFF" height={30} width={30} />
     </div>)
    else if(this.state.testPerformed)
     testResults = (<div>{this.state.testConnResults}</div>)
    return(
        <div className="container">
           
        
        <div className="row">
            <div style={{marginBottom:"35px",height:"80vh"}} className="test col-sm-5">
                  <div className="page-header">
                      
                      <h2>iMANAGER</h2>
                      <p className="lead">Please register your Instances here..</p>
                      <Loader visible={this.state.processing} type="ThreeDots" color="#00BFFF" height={110} width={110} />
                  </div>
                  
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-6 ">
            <form onSubmit={(event) => this.handleSubmit(event)  }>
            <div>
                        <b>NOTE: Instance must be up while registering for first time.</b>
                        <br/><br/>
                    </div>
                    
                <div className="form-group required">
                         <label  className="control-label" htmlFor="hostname">Hostname or IP</label>
                        <input type="text" id="host" className="form-control"  onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-group required">
                      <label className="control-label" htmlFor="InfaHome">Informatica Home Directory(INFA_HOME)</label>
                        <input type="text" id="ihome" className="form-control"  onChange={this.handleInputChange} required />
                    </div>
                  
                     <div className="form-group required">
                         <label className="control-label" htmlFor="username">Admin Console Username</label>
                        <input type="text" id="instanceUser" className="form-control" onChange={this.handleInputChange} required />
                    </div>
                    
                    <div className="form-group required">
                         <label  className="control-label" htmlFor="password">Admin Console Password</label>
                        <input type="password" id="instancePassword" className="form-control"  onChange={this.handleInputChange} required />
                    </div>
                    <div className="row">
                    <div className="form-group col-sm-6 required">
                         <label className="control-label" htmlFor="linux-username">Linux Machine Username</label>
                        <input type="text" id="linuxUser" className="form-control" onChange={this.handleInputChange} required  />
                    </div>
                    
                    <div className="col-sm-6 form-group required">
                         <label className="control-label" htmlFor="linux-password">Linux Machine Password</label>
                        <input type="password" id="linuxPassword" className="form-control" onChange={this.handleInputChange} required />
                    </div>
                    </div>
                    <div className="form-group ">
                         <label htmlFor="port">SSH Port</label>
                        <input type="text" id="sshPort" className="form-control" defaultValue="22" onChange={this.handleInputChange}/>
                    </div>
                    <div className="button-group">
                    <button onClick={()=> this.handleTestConnection()} type="button" className="btn btn-secondary">Test Connection</button>
                    <button  type="submit" className="btn btn-primary">Submit</button>

                    { testResults}
                    
                    <ToastContainer
                    position="bottom-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    </div>
                    </form>
            </div>
            
        
        </div>
    
    </div>
    
    
     )

 }
    

}


export default RegisterInstance;
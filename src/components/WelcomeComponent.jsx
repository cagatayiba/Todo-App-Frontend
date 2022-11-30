import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import HelloWorldService from '../api/todo/HelloWorldService';

class Welcome extends Component{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
        this.state = {
            welcomeMessage : ''
        }
    }
    render(){
        return(
            <>
                <h1>Welcome!</h1>
                <div className='container'>
                    Welcome To ToDo App {this.props.params.name}. You can go to todo list <Link to="/todos">here</Link>
                </div>
                <div className='container'>
                    Click here to get a cutomized welcome message.
                    <button onClick={this.retrieveWelcomeMessage}
                        className="btn btn-success">Get Welcome Message</button>

                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }
    retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldBeanWithParamService(this.props.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleErrorResponse(error))
    }
    
    

    handleSuccessfulResponse(response){
        this.setState({welcomeMessage : response.data.str})
    }

    handleErrorResponse(error){
        let errorMessage = '';
        if(error.message){
            errorMessage += error.message

        }
        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }
        this.setState({welcomeMessage : errorMessage})
    }
}

export default Welcome  
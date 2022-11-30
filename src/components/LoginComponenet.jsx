import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';
import { Navigate } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "cagatay",
            password: "",
            isValid: false,
            isInvalid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    loginClicked() {
        // if(this.state.username==='cagatay' && this.state.password==='iba'){
        //     //console.log("successfull");
        //     AuthenticationService.registerSuccessfull(this.state.username,this.state.password);
        //     this.props.navigate(`/welcome/${this.state.username}`)
        //     //this.setState({isValid : true});
        //     //this.setState({isInvalid : false});
        // }else{
        //     //console.log("fail");
        //     this.setState({isValid : false});
        //     this.setState({isInvalid : true});
        // }
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log("successfully logged in");
                
                AuthenticationService.registerSuccessfullForJwt(this.state.username, response.data.token)
                this.props.navigate(`/welcome/${this.state.username}`)
                console.log(AuthenticationService.isUserLoggedIn());

            }
            ).catch(() => {
                this.setState({ isValid: false });
                this.setState({ isInvalid: true });
            }

            )
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    <>
                        {this.state.isInvalid && <div className="alert alert-warning">Username or Password incorrect</div>}
                    </>
                    User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>login</button>
                </div>
            </div>
        )
    }
}

export default Login
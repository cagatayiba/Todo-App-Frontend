import React, { Component } from 'react';
import withNavigation from './WithNavigation.jsx' 
import withParams from './WithParams.jsx';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import Login from './LoginComponenet.jsx';
import ListToDosCompenent from './ListTodosComponenet'
import ErrorComponenet from './ErrorCompenent.jsx';
import HeaderComponenet from './HeaderComponent.jsx';
import FooterComponenet from './FooterComponent.jsx';
import LogoutComponenet from './LogoutCompenent.jsx';
import Welcome from './WelcomeComponent.jsx';
import TodoComponent from './TodoComponent'


class ToDoApp extends Component{
    render(){
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));
        const LoginComponentWithNavigation = withNavigation(Login);
        const WelcomeComponentWithParams = withParams(Welcome);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponenet);
        const ListToDosCompenentWithNavigation = withNavigation(ListToDosCompenent);
        return(
            <div className='ToDoApp'>
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/welcome/:name" element=
                            {<AuthenticatedRoute>
                                <WelcomeComponentWithParams/>
                            </AuthenticatedRoute>}/>
                        <Route path="/todos/:id" element= 
                             {<AuthenticatedRoute>
                                <TodoComponentWithParamsAndNavigation/>
                            </AuthenticatedRoute>}/>
                        <Route path="/todos" element=
                            {<AuthenticatedRoute>
                                <ListToDosCompenentWithNavigation/>   
                            </AuthenticatedRoute>}/>
                        <Route path="/logout" element=
                            {<AuthenticatedRoute>
                                 <LogoutComponenet/>
                            </AuthenticatedRoute>
                            }/>
                        <Route path="*" element={<ErrorComponenet/>}/>
                    </Routes>
                    <FooterComponenet/>
                </Router>
            </div>
            
        )
    }
}




export default ToDoApp;
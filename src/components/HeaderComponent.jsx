import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

class HeaderComponenet extends Component{

    render(){
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
            <>
                <header>

                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <ul className="navbar-nav">
                            {isLoggedIn && <li><Link className="nav-link" to="/welcome/cagatay">Home</Link></li>}
                            {isLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {!isLoggedIn && <li ><Link className="nav-link" to="/login">Login</Link></li>}
                            {isLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>
                    </nav>
                </header>
            </>
        )
    }
}

export default HeaderComponenet

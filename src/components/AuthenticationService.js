import axios from "axios";
import {API_URL} from "../Constant.js"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser"
class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`,
            {
                username,
                password
            })
    }
    registerSuccessfullForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }
    registerSuccessfull(username, password) {
        //console.log('successfully logged in');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(null)
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) {
            return false;
        } else {
            return true;
        }
    }

    getUserName() {

        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    createJWTToken(token){
        return "Bearer " + token;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()
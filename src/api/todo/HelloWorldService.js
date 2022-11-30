import axios from "axios"
import { API_URL } from "../../Constant.js"

class HelloWorldService{
    executeHelloWorldService(){
        return axios.get(`${API_URL}/api/hello/world`);
        //console.log('executed service');    
    }
    executeHelloWorldBeanService(){
        return axios.get(`${API_URL}/api/hello-world`);
    }
    executeHelloWorldBeanWithParamService(name){
        // let username = 'cagatay'
        // let password = 'iba'

        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return axios.get(`${API_URL}/api/hello/${name}`);
    }
}

export default new HelloWorldService()
import axios from "axios"
import { API_URL, JPA_API_URL } from "../../Constant.js"
//import { Component } from "react";

class ToDoService{
    getToDos(usrnm){
        console.log(usrnm);
        return axios.get(`${JPA_API_URL}/api/users/${usrnm}/todos`);

    }
    getTodo(usrnm,id){
        return axios.get(`${JPA_API_URL}/api/users/${usrnm}/todos/${id}`);
    }
    deleteTodo(username,id){
        return axios.delete(`${JPA_API_URL}/api/users/${username}/todos/${id}`)
    }
    updateTodo(usrnm,id, todo){
        return axios.put(`${JPA_API_URL}/api/users/${usrnm}/todos/${id}`, todo);
    }
    createTodo(usrnm, todo){
        return axios.post(`${JPA_API_URL}/api/users/${usrnm}/todos/`, todo);
    }
}

export default new ToDoService()

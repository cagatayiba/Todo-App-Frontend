import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';
import {Navigate} from 'react-router-dom'
import ToDoDataService from '../api/todo/ToDoDataService.js'
import moment from 'moment';


class ListToDosCompenent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todos : [],
            message : null
            
           
        };
        this.deleteToDo = this.deleteToDo.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.addButoonClicked = this.addButoonClicked.bind(this);
    }

    componentDidMount(){
        let username = AuthenticationService.getUserName();

        ToDoDataService.getToDos(username)
        .then(response => this.setState({todos : response.data}))
    }

    refreshTodos(){
        let username = AuthenticationService.getUserName;
        ToDoDataService.getToDos(username)
        .then(response => this.setState({todos : response.data}))
    }


    render(){
        return(
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className='container'>

                
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>description</th>
                                <th>is completed </th>
                                <th> target date</th>
                                <th>update </th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map 
                                (
                                    todo =>
                                        <tr  key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{moment(todo.date).format('YYYY-MM-DD')}</td>
                                            <td><button className='btn btn-success' onClick={() => this.updateTodo(todo.id)}>update</button></td>
                                            <td><button className='btn btn-warning' onClick={() => this.deleteToDo(todo.id)}>delete</button></td>
                                        </tr>

                                )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                        <button className='btn btn-success' onClick={this.addButoonClicked}>Add</button>
                    </div>
                </div>
                
            </div>
        )
    }

    deleteToDo(id){
        let username = AuthenticationService.getUserName;
        ToDoDataService.deleteTodo(username,id)
        .then(
            response => {
                this.setState(
                    {message : `delete of todo ${id} Successful`}
                    
                )
                this.refreshTodos();
            }
        )
    }

    updateTodo(id){
        this.props.navigate(`/todos/${id}`)

    }

    addButoonClicked(){
        this.props.navigate(`/todos/-1`)
    }
}

export default ListToDosCompenent

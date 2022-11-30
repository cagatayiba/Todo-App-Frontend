import React, {Component} from 'react'
import moment from 'moment'
import { Form, Formik, Field, ErrorMessage } from 'formik';
import AuthenticationService from './AuthenticationService';
import ToDoDataService from '../api/todo/ToDoDataService';

class TodoComponenet extends  Component{
    constructor(props){
        super(props)
        this.state = {
            id : this.props.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        let usrnm = AuthenticationService.getUserName();
        ToDoDataService.getTodo(usrnm,this.state.id)
            .then(response => this.setState(
                {
                    description : response.data.description,
                    targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
                }
                
            ))
    }
    validate(values){
        let errors = {}
       if(!values.description){
           errors.description = 'Enter a Description'
       }else if(values.description.length<5){
           errors.description = 'Enter at least 5 Characters in Description'
       }
       if(!moment(values.targetDate).isValid()){
           errors.targetDate = 'Enter a Valid Target Date'
       }
        return errors
    }
    onSubmit(values){
        let username = AuthenticationService.getUserName();
        if(this.state.id == -1){
            ToDoDataService.createTodo(username, {
                id: this.state.id,
                username : username,
                description : values.description,
                date : values.targetDate,
                done : false
            }).then(
                () => {
                    this.props.navigate(`/todos`)
                }
            )
        }else{
            ToDoDataService.updateTodo(username, this.state.id,{
                id : this.state.id,
                username : username,
                description : values.description,
                date : values.targetDate,
                done : false
            }).then(
                () => {
                    this.props.navigate(`/todos`)
                }
            )

        }
        
        console.log(this.state);
    }
    render(){
        let {description,targetDate} = this.state   
       
        return(
            <div>
                <h1>Todo</h1>
                <div className='container'>
                
                    <Formik
                        initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) =>(
                                <Form>
                                    <ErrorMessage name='description' component="div" 
                                        className='alert alert-warning'/>
                                    <ErrorMessage name='targetDate' component="div" 
                                        className='alert alert-warning'/>
                                    <fieldset className='form-group'>
                                        <label>Descriptpon</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <label></label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                                
                            )
                        }
                    </Formik>
                </div>
                
            </div>
        )
    }
}

export default TodoComponenet
import React, { Fragment, useReducer } from 'react';
import RegisterReducer from './RegisterReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import config from '../../config';

const RegisterPage = () => {
    let history = useHistory();
    const [state, dispatch] = useReducer(RegisterReducer, {
        user: {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    })

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.app.SERVER}/users`, {
                ...state.user
            });
            toast.success(response.data.msg);
            setTimeout(() => {
                history.push('/login');
            }, 3000);
        } catch (error) {
            toast.warning(error.response.data.msg);
        }
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <h1>Register</h1>

                <form className="justify-content-center align-items-center" onSubmit={register}>

                     <div className="row form-group">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <label htmlFor="firstname" className="float-right">Firstname</label>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <input type="text" id="firstname" placeholder="Firstname" name="firstname" style={input} onChange={(e) =>  dispatch({ type: 'SET_FIRSTNAME', value: e.target.value})} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <label htmlFor="lastname" className="float-right">Lastname</label>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <input type="text" id="lastname" placeholder="Lastname" name="lastname" style={input} onChange={(e) =>  dispatch({ type: 'SET_LASTNAME', value: e.target.value})} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <label htmlFor="email" className="float-right">Email</label>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <input type="text" id="email" placeholder="Email" name="email" style={input} onChange={(e) =>  dispatch({ type: 'SET_EMAIL', value: e.target.value})} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <label htmlFor="password" className="float-right">Password</label>
                        </div>
                        <div className="col-sm-12 col-md-5">
                            <input type="text" id="password" placeholder="Password" name="password" style={input} onChange={(e) =>  dispatch({ type: 'SET_PASSWORD', value: e.target.value})} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-12 col-md-6 col-lg-4 offset-sm-2 py-2">
                            <input type="submit" style={btnConfirm} value="Register" />
                        </div>
                    </div>
                    
                </form>
            </div>
        </Fragment>
    )
}

const btnConfirm = {
    width: '90%',
    border: 'none',
    borderRadius: '8px',
    padding: '5px 0',
    backgroundColor: 'rgb(15, 76, 117)',
    color: 'white',
}

const input = {
    border: '1px solid lightgray',
    width: '50%',
    padding: '5px',
    borderRadius: '12px',
}

export default RegisterPage;
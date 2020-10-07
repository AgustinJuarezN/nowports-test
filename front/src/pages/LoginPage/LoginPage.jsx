import React, { Fragment, useReducer } from "react";
import LoginReducer from './LoginReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import config from '../../config';
import { saveSession, saveUser } from 'react-session-persist';

const LoginPage = () => {
    let history = useHistory();
    const [state, dispatchForm] = useReducer(LoginReducer, {
        user: {
            email: '',
            password: ''
        }
    })

  const onLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${config.app.SERVER}/auth/login`, {
            ...state.user
        });
        await saveSession({token : response.data.token});
        await saveUser(response.data.user);
        toast.success('User logged in successfully!');
        setTimeout(() => {
            history.push('/me/contact-book');
        }, 2000);
    } catch (error) {
        toast.warning(error.response.data.msg);
    }
  };

  return (
    <Fragment>
        <div className="container-fluid">
          <div>
            <h1>Login</h1>
          </div>
          <form
            className="justify-content-center align-items-center"
            onSubmit={onLogin}
          >
            <div className="row form-group">
              <div className="col-sm-12 col-md-4 col-lg-3">
                <label htmlFor="email" className="float-right">
                  Email
                </label>
              </div>
              <div className="col-sm-12 col-md-5">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  style={input}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_EMAIL", value: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-sm-12 col-md-4 col-lg-3">
                <label htmlFor="password" className="float-right">
                  Password
                </label>
              </div>
              <div className="col-sm-12 col-md-5">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  style={input}
                  onChange={(e) =>
                    dispatchForm({ type: "SET_PASSWORD", value: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12 col-md-6 col-lg-4 offset-sm-2 py-2">
                <input type="submit" className="btn btn-outline-primary" value="Login" />
              </div>
            </div>
          </form>
        </div>
    </Fragment>
  );
};

const input = {
    border: '1px solid lightgray',
    width: '50%',
    padding: '5px',
    borderRadius: '12px',
}

export default LoginPage;

import React, { useReducer } from "react";
import { getSession } from "react-session-persist";
import AddContactReducer from "./AddContactReducer";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchContacts } from '../../actions/contacts.action';

const AddContactForm = ({ owner }) => {
  const dispatch = useDispatch();
  const [state, formDispatch] = useReducer(AddContactReducer, {
    user: {
      firstname: '',
      lastname: '',
      phone: '',
    },
  });

  const add = async (e) => {
    e.preventDefault();
    try {
      const session = await getSession();
      const { token } = session;
      const response = await axios.post(
        `${config.app.SERVER}/contacts`,
        {
          owner,
          firstname: state.user.firstname,
          lastname: state.user.lastname,
          phone: state.user.phone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchContacts(owner));
      toast.success(response.data.msg);
    } catch (error) {
      toast.warning(error.response.data.msg);
    }
  };

  return (
    <form className="justify-content-center align-items-center w-100" onSubmit={add}>
      <div className="row form-group">
        <div className="col-6 col-md-4">
          <label htmlFor="firstname" className="float-right">
            Firstname
          </label>
        </div>
        <div className="col-6 col-md-8">
          <input
            type="text"
            id="firstname"
            placeholder="Firstname"
            name="firstname"
            value={state.user.firstname}
            style={input}
            onChange={(e) =>
              formDispatch({ type: "SET_FIRSTNAME", value: e.target.value })
            }
          />
        </div>
      </div>

      <div className="row form-group">
        <div className="col-6 col-md-4">
          <label htmlFor="lastname" className="float-right">
            Lastname
          </label>
        </div>
        <div className="col-6 col-md-8">
          <input
            type="text"
            id="lastname"
            placeholder="Lastname"
            name="lastname"
            value={state.user.lastname}
            style={input}
            onChange={(e) =>
              formDispatch({ type: "SET_LASTNAME", value: e.target.value })
            }
          />
        </div>
      </div>

      <div className="row form-group">
        <div className="col-6 col-md-4">
          <label htmlFor="phone" className="float-right">
            Phone
          </label>
        </div>
        <div className="col-6 col-md-8">
          <input
            type="text"
            id="phone"
            placeholder="phone"
            name="phone"
            value={state.user.phone}
            style={input}
            onChange={(e) =>
              formDispatch({ type: "SET_PHONE", value: e.target.value })
            }
          />
        </div>
      </div>

      <div className="row form-group">
        <div className="col-sm-12 col-md-12 py-2">
          <input
            type="submit"
            style={btnConfirm}
            className="w-100"
            value="Add"
          />
        </div>
      </div>
    </form>
  );
};

const btnConfirm = {
  width: "90%",
  border: "none",
  borderRadius: "8px",
  padding: "5px 0",
  backgroundColor: "rgb(15, 76, 117)",
  color: "white",
};

const input = {
  border: "1px solid lightgray",
  width: "50%",
  padding: "5px",
  borderRadius: "12px",
};

export default AddContactForm;

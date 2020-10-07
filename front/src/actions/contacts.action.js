import { SET_CONTACTS, SET_CONTACTS_SUCCESS } from "../types/contacts.type";
import { getSession } from "react-session-persist";
import axios from 'axios';
import config from '../config';

export const fetchContacts = (ownerId) => {
    const token = getSession().token;
    return (dispatch) => {
        dispatch(setContacts());
        return axios.get(`${config.app.SERVER}/contacts`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { owner: ownerId },
          }).then((response) => {
            dispatch(setContactsSuccess(response.data));
          })
          .catch((error) => {
              throw error;
          }) 
    };
}

export const setContactsSuccess = (data) => {
    return {
        type: SET_CONTACTS_SUCCESS,
        payload: {
            contacts: data
        }
    }
}

export const setContacts = () => {
    return {
        type: SET_CONTACTS
    }
}
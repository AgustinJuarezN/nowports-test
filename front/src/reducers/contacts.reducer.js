import { SET_CONTACTS, SET_CONTACTS_SUCCESS } from "../types/contacts.type";

const initialState = { 
    contacts: null,
    loading: false
}

export function contacts(state = initialState, action) {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                loading: true
            };
        case SET_CONTACTS_SUCCESS:
            return {
                contacts: action.payload.contacts,
                loading: false
            };
        default:
            return state
    }
}
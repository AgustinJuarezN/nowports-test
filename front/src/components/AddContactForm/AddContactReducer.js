const EditContactReducer = (state, action) => {
    switch (action.type) {  
        case 'SET_FIRSTNAME':
            return {
                ...state,
                user: {
                    ...state.user,
                    firstname: action.value
                }
            };
        case 'SET_LASTNAME':
            return {
                ...state,
                user: {
                    ...state.user,
                    lastname: action.value
                }
            };
        case 'SET_PHONE':
            return {
                ...state,
                user: {
                    ...state.user,
                    phone: action.value
                }
            };
        default:
            return {
                state
            };
    }
}

export default EditContactReducer
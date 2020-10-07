const RegisterReducer = (state, action) => {
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
        case 'SET_EMAIL':
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.value
                }
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.value
                }
            };
        default:
            return {
                state
            };
    }
}

export default RegisterReducer
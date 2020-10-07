const LoginReducer = (state, action) => {
    switch (action.type) {  
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

export default LoginReducer
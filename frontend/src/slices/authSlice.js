import { createSlice } from "@reduxjs/toolkit";

// Creating an auth slice using Redux Toolkit's createSlice
const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState: {
        loading: true, // Initial loading state
        isAuthenticated: false  // Initial authentication state
    },
    reducers: {
         // Action to handle login request
        loginRequest(state, action){
            return {
                ...state,
                loading: true, // Set loading to true
            }
        },

         // Action to handle successful login
        loginSuccess(state, action){
            return {
                loading: false, // Set loading to false
                isAuthenticated: true, // Set isAuthenticated to true
                user: action.payload.user  // Set user data
            }
        },

                // Action to handle login failure
        loginFail(state, action){
            return {
                ...state,
                loading: false, // Set loading to false
                error:  action.payload // Set error message
            }
        },

                // Action to clear errors
        clearError(state, action){
            return {
                ...state,
                error:  null // Clear error message
            }
        },

                // Action to handle register request
        registerRequest(state, action){
            return {
                ...state,
                loading: true,  // Set loading to true
            }
        },

                // Action to handle successful registration
        registerSuccess(state, action){
            return {
                loading: false, // Set loading to false
                isAuthenticated: true, // Set isAuthenticated to true
                user: action.payload.user // Set user data
            }
        },

                // Action to handle registration failure
        registerFail(state, action){
            return {
                ...state,
                loading: false, // Set loading to false
                error:  action.payload // Set error message
            }
        },

                // Action to handle user loading request
        loadUserRequest(state, action){
            return {
                ...state,
                isAuthenticated: false, // Set isAuthenticated to false
                loading: true, // Set loading to true
            }
        },
        loadUserSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },

                // Action to handle successful user loading
        loadUserFail(state, action){
            return {
                ...state,
                loading: false,  // Set loading to false
            }
        },

                // Action to handle successful logout
        logoutSuccess(state, action){
            return {
                loading: false, // Set loading to false
                isAuthenticated: false, // Set isAuthenticated to false
            }
        },

                // Action to handle logout failure
        logoutFail(state, action){
            return {
                ...state,
                error:  action.payload // Set error message
            }
        },

                // Action to handle profile update request
        updateProfileRequest(state, action){
            return {
                ...state,
                loading: true, // Set loading to true
                isUpdated: false // Set isUpdated to false
            }
        },

                // Action to handle successful profile update
        updateProfileSuccess(state, action){
            return {
                ...state,
                loading: false, // Set loading to false
                user: action.payload.user, // Set updated user data
                isUpdated: true // Set isUpdated to true
            }
        },

                // Action to handle profile update failure
        updateProfileFail(state, action){
            return {
                ...state,
                loading: false, // Set loading to false
                error:  action.payload // Set error message
            }
        },

                // Action to clear profile update status
        clearUpdateProfile(state, action){
            return {
                ...state,
                isUpdated: false // Clear isUpdated status
            }
        },

                // Action to handle password update request
        updatePasswordRequest(state, action){
            return {
                ...state,
                loading: true, // Set loading to true
                isUpdated: false // Set isUpdated to false
            }
        },
                // Action to handle successful password update
        updatePasswordSuccess(state, action){
            return {
                ...state,
                loading: false, // Set loading to false
                isUpdated: true // Set isUpdated to true
            }
        },

                // Action to handle password update failure
        updatePasswordFail(state, action){
            return {
                ...state,
                loading: false, // Set loading to false
                error:  action.payload // Set error message
            }
        }
       
      
        
    }
});

// Destructure actions and reducer from authSlice
const { actions, reducer } = authSlice;

// Export actions for use in components and action creators
export const { 
    loginRequest, 
    loginSuccess, 
    loginFail, 
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutFail,
    logoutSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    clearUpdateProfile,
    updatePasswordFail,
    updatePasswordSuccess,
    updatePasswordRequest,
  

    
 } = actions;

 // Export the reducer to be used in the store
export default reducer;


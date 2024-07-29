import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing the user state
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,  // Indicates the loading state for user operations
        user: {},  // Stores the details of a single user
        users: [],  // Stores the list of users
        isUserUpdated: false,  // Tracks the status of user update
        isUserDeleted: false // Tracks the status of user deletion
    },
    reducers: {

                // Actions for handling users request
        usersRequest(state, action){
            return {
                ...state,
                loading: true  // Set loading state to true
            }
        },
        usersSuccess(state, action){
            return {
                ...state,
                loading: false, // End loading state
                users: action.payload.users, // Store fetched users
            }
        },
        usersFail(state, action){
            return {
                ...state,
                loading: false,   // End loading state
                error:  action.payload  // Store error message
            }
        },

                // Actions for handling single user request
        userRequest(state, action){
            return {
                ...state, 
                loading: true  // Set loading state to true
            }
        },
        userSuccess(state, action){
            return {
                ...state,
                loading: false,  // End loading state
                user: action.payload.user, // Store fetched user details
            }
        },
        userFail(state, action){
            return {
                ...state,
                loading: false,  // End loading state
                error:  action.payload  // Store error message
            }
        },

                // Actions for handling user deletion
        deleteUserRequest(state, action){
            return {
                ...state,
                loading: true  // Set loading state to true
            }
        },
        deleteUserSuccess(state, action){
            return {
                ...state,
                loading: false,  // End loading state
                isUserDeleted : true  // Set user deletion status to true
            }
        },
        deleteUserFail(state, action){
            return {
                ...state,
                loading: false, // End loading state
                error:  action.payload   // Store error message
            }
        },

        // Actions for handling user update
                updateUserRequest(state, action){
            return {
                ...state,
                loading: true  // Set loading state to true
            }
        },
        updateUserSuccess(state, action){
            return {
                ...state,
                loading: false,  // End loading state
                isUserUpdated : true // Set user update status to true
            }
        },
        updateUserFail(state, action){
            return {
                ...state,
                loading: false,   // End loading state
                error:  action.payload   // Store error message
            }
        },

                // Action to clear user deletion status
        clearUserDeleted(state, action){
            return {
                ...state,
                isUserDeleted : false // Reset user deletion status
            }
        },

                // Action to clear user update status
        clearUserUpdated(state, action){
            return {
                ...state,
                isUserUpdated : false // Reset user update status
            }
        },

                // Action to clear error messages
        clearError(state, action){
            return {
                ...state,
                error:  null // Clear the error message
            }
        }
       
    }
});

// Extract actions and reducer from userSlice
const { actions, reducer } = userSlice;

// Export actions for dispatching
export const { 
    usersRequest, 
    usersSuccess, 
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserFail,
    deleteUserSuccess,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail,
    clearUserDeleted,
    clearUserUpdated,
    clearError

} = actions;

// Export the reducer as the default export
export default reducer;


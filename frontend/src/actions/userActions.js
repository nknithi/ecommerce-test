import {

    // Importing action creators from authSlice
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,


} from '../slices/authSlice';


import {

    // Importing action creators from userSlice
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail

} from '../slices/userSlice'
import axios from 'axios';

// Action creator to log in a user
export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const { data } = await axios.post(`/api/v1/login`, { email, password });
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }

}

// Action creator to clear authentication errors
export const clearAuthError = dispatch => {
    dispatch(clearError()) // Dispatching action to clear authentication error
}

// Action creator to register a new user
export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest()) // Dispatching action to set loading state
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        // Making a POST request to register a new user
        const { data } = await axios.post(`/api/v1/register`, userData, config);
        dispatch(registerSuccess(data)) // Dispatching action on successful registration
    } catch (error) {
        dispatch(registerFail(error.response.data.message))  // Dispatching action on registration failure
    }

}


// Action creator to load user profile information
export const loadUser = async (dispatch) => {

    try {
        dispatch(loadUserRequest()) // Dispatching action to set loading state

        // Making a GET request to fetch user profile
        const { data } = await axios.get(`/api/v1/myprofile`);
        dispatch(loadUserSuccess(data)) // Dispatching action on successful profile load
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message)) // Dispatching action on profile load failure
    }

}


// Action creator to log out a user
export const logout = () => async (dispatch) => {
    try {

        // Making a GET request to logout
        await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess()); // Dispatching action on successful logout
    } catch (error) {
        dispatch(logoutFail(error.response.data.message));  // Dispatching action on logout failure
    }
};


// Action creator to update user profile information
export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest()) // Dispatching action to set loading state
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        // Making a PUT request to update user profile
        const { data } = await axios.put(`/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data)) // Dispatching action on successful profile update
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message)) // Dispatching action on profile update failure
    }

}

// Action creator to update user password
export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest()) // Dispatching action to set loading state
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // Making a PUT request to update user password
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess()) // Dispatching action on successful password update
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message)) // Dispatching action on password update failure
    }

}

// Action creator to fetch all users (admin-only)
export const getUsers = async (dispatch) => {

    try {
        dispatch(usersRequest()); // Dispatching action to set loading state

        // Making a GET request to fetch all users (admin-only)
        const { data } = await axios.get(`/api/v1/admin/users`);
        dispatch(usersSuccess(data)) // Dispatching action on successful user fetch
    } catch (error) {
        dispatch(usersFail(error.response.data.message)) // Dispatching action on user fetch failure
    }

}


// Action creator to fetch a user by ID (admin-only)
export const getUser = id => async (dispatch) => {

    try {
        dispatch(userRequest())  // Dispatching action to set loading state

        // Making a GET request to fetch a user by ID (admin-only)
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data)) // Dispatching action on successful user fetch
    } catch (error) {
        dispatch(userFail(error.response.data.message)) // Dispatching action on user fetch failure
    }

}

// Action creator to delete a user by ID (admin-only)
export const deleteUser = id => async (dispatch) => {

    try {
        dispatch(deleteUserRequest()) // Making a DELETE request to delete a user by ID (admin-only)


        // Making a DELETE request to delete a user by ID (admin-only)
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess()) // Dispatching action on successful user deletion
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message)) // Dispatching action on user deletion failure
    }

}

// Action creator to update a user by ID (admin-only)
export const updateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest())  // Dispatching action to set loading state
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // Making a PUT request to update a user by ID (admin-only)
        await axios.put(`/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess()) // Dispatching action on successful user update
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message)) // Dispatching action on user update failure
    }

}
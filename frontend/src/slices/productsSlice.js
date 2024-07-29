import { createSlice } from "@reduxjs/toolkit";

// Create a slice for managing the products state
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false // Indicates the loading state for product operations
    },
    reducers: {
                // Action for initiating a request to fetch products
        productsRequest(state, action){
            return {
                loading: true
            }
        },

                // Action for handling successful fetching of products
        productsSuccess(state, action){
            return {
                loading: false,   // End loading state
                products: action.payload.products,  // Store fetched products
                productsCount: action.payload.count,  // Store total product count
                resPerPage : action.payload.resPerPage  // Store results per page
            }
        },

                // Action for handling failure to fetch products
        productsFail(state, action){
            return {
                loading: false,  // End loading state
                error:  action.payload // Store error message
            }
        },

                // Action for initiating a request to fetch products for admin
        adminProductsRequest(state, action){
            return {
                loading: true
            }
        },

         // Action for handling successful fetching of products for admin
        adminProductsSuccess(state, action){
            return {
                loading: false,  // End loading state
                products: action.payload.products,  // Store fetched products
            }
        },

                // Action for handling failure to fetch products for admin
        adminProductsFail(state, action){
            return {
                loading: false,   // End loading state
                error:  action.payload // Store error message
            }
        },

                // Action to clear error messages
        clearError(state, action){
            return {
                ...state,  // Keep the existing state
                error:  null  // Clear the error message
            }
        }
    }
});

// Extract actions and reducer from productsSlice
const { actions, reducer } = productsSlice;

// Export actions for dispatching
export const { 
    productsRequest, 
    productsSuccess, 
    productsFail,
    adminProductsFail,
    adminProductsRequest,
    adminProductsSuccess

} = actions;

// Export the reducer as the default export
export default reducer;


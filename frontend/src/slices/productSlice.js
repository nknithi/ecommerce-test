import { createSlice } from "@reduxjs/toolkit";


// Create a slice for product state management
const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false, // Loading state to show loading indicators
        product: {}, // Store product details
        isReviewSubmitted: false, // Track review submission status
        isProductCreated: false,  // Track product creation status
        isProductDeleted: false,  // Track product deletion status
        isProductUpdated: false,  // Track product update status
        isReviewDeleted: false, // Track review deletion status
        reviews: []  // Store reviews for the product
    }, 
    reducers: {

                // Actions for handling product requests
        productRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        productSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

                // Actions for handling review creation
        createReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        createReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

                // Action to clear review submission status
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },

                // Action to clear error state
clearError(state, action) {
           return{ ...state,
            error: null
           }
        },

                // Action to clear product details
        clearProduct(state, action) {
            return{ ...state,
                product : {}
            }
        },

                // Actions for handling new product creation
        newProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        newProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
                isProductCreated: false
            }
        },

                // Action to clear product creation status
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
         newProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        newProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
                isProductCreated: false
            }
        },
        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },

                // Actions for handling product deletion
        deleteProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        deleteProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },

                // Action to clear product deletion status
        clearProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false
            }
        },

                // Actions for handling product updates
        updateProductRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action){
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        updateProductFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },

                // Action to clear product update status
        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },

                // Actions for handling reviews fetching
        reviewsRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action){
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },

                // Actions for handling review deletion
        deleteReviewRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteReviewSuccess(state, action){
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload,
            }
        },

                // Action to clear review deletion status
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        },

    }
});

// Extract actions and reducer from productSlice
const { actions, reducer } = productSlice;


// Export actions for dispatching
export const { 
    productRequest, 
    productSuccess, 
    productFail,
    createReviewFail,
    createReviewRequest,
    createReviewSuccess,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newProductFail,
    newProductSuccess,
    newProductRequest,
    clearProductCreated,
    deleteProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    clearProductDeleted,
    updateProductFail,
    updateProductRequest,
    updateProductSuccess,
    clearProductUpdated,
    reviewsRequest,
    reviewsFail,
    reviewsSuccess,
    deleteReviewFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    clearReviewDeleted
} = actions;


// Export the reducer as the default export
export default reducer;


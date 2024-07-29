import axios from 'axios';
import {

    // Importing action creators from productsSlice
    productsFail,
    productsSuccess,
    productsRequest,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail
} from '../slices/productsSlice';

import {
    // Importing action creators from productSlice
    productFail,
    productSuccess,
    productRequest,
    createReviewRequest,
    createReviewSuccess,
    createReviewFail,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    reviewsRequest,
    reviewsSuccess,
    reviewsFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail
} from '../slices/productSlice';


// Action creator to fetch products based on filters
export const getProducts = (keyword, price, category, rating, currentPage, resPerPage) => async (dispatch) => {
    try {
        dispatch(productsRequest());  // Dispatching action to set loading state
        let link = `/api/v1/products?page=${currentPage}&resPerPage=${resPerPage}`;

        // Building query parameters based on filters
        if (keyword && keyword !== 'all') {
            link += `&keyword=${keyword}`;
        }
        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }
        if (category) {
            link += `&category=${category}`;
        }
        if (rating) {
            link += `&ratings=${rating}`;
        }

        // Making a GET request to fetch products
        const { data } = await axios.get(link);
        dispatch(productsSuccess(data)); // Dispatching action on successful response
    } catch (error) {
        dispatch(productsFail(error.response.data.message));  // Dispatching action on failure
    }
};




// Action creator to fetch a single product by ID
export const getProduct = id => async (dispatch) => {

    try {
        dispatch(productRequest()) // Dispatching action to set loading state

        // Making a GET request to fetch product details by ID
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data)); // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message)) // Dispatching action on failure
    }

}

// Action creator to create a new review for a product
export const createReview = reviewData => async (dispatch) => {

    try {
        dispatch(createReviewRequest()) // Dispatching action to set loading state
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        // Making a PUT request to add a review
        const { data } = await axios.put(`/api/v1/review`, reviewData, config);
        dispatch(createReviewSuccess(data)) // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(createReviewFail(error.response.data.message)) // Dispatching action on failure
    }

}


// Action creator to fetch all products (admin-only)
export const getAdminProducts = async (dispatch) => {

    try {
        dispatch(adminProductsRequest())  // Dispatching action to set loading state

        // Making a GET request to fetch all products (admin-only)
        const { data } = await axios.get(`/api/v1/admin/products`);
        dispatch(adminProductsSuccess(data)) // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))  // Dispatching action on failure
    }

}


// Action creator to create a new product (admin-only)
export const createNewProduct = productData => async (dispatch) => {

    try {
        dispatch(newProductRequest()) // Dispatching action to set loading state

        // Making a POST request to create a new product (admin-only)
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData);
        dispatch(newProductSuccess(data)) // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message))  // Dispatching action on failure
    }

}

// Action creator to delete a product by ID (admin-only)
export const deleteProduct = id => async (dispatch) => {

    try {
        dispatch(deleteProductRequest()) // Dispatching action to set loading state

        // Making a DELETE request to delete a product by ID (admin-only)
        await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch(deleteProductSuccess()) // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message)) // Dispatching action on failure
    }

}


// Action creator to update a product by ID (admin-only)
export const updateProduct = (id, productData) => async (dispatch) => {

    try {
        dispatch(updateProductRequest()) // Dispatching action to set loading state

        // Making a PUT request to update a product by ID (admin-only)
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData);
        dispatch(updateProductSuccess(data)) // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message)) // Dispatching action on failure
    }

}

// Action creator to fetch reviews for a product by ID (admin-only)
export const getReviews = id => async (dispatch) => {

    try {
        dispatch(reviewsRequest()) // Dispatching action to set loading state

        // Making a GET request to fetch reviews for a product by ID (admin-only)
        const { data } = await axios.get(`/api/v1/admin/reviews`, { params: { id } });
        dispatch(reviewsSuccess(data)) // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(reviewsFail(error.response.data.message)) // Dispatching action on failure
    }

}

// Action creator to delete a review for a product (admin-only)
export const deleteReview = (productId, id) => async (dispatch) => {

    try {
        dispatch(deleteReviewRequest()) // Dispatching action to set loading state

        // Making a DELETE request to delete a review for a product (admin-only)
        await axios.delete(`/api/v1/admin/review`, { params: { productId, id } });
        dispatch(deleteReviewSuccess())  // Dispatching action on successful response
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message)) // Dispatching action on failure
    }

}
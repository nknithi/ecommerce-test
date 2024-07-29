import { Fragment, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview, getReviews } from "../../actions/productActions"
import { clearError, clearReviewDeleted } from "../../slices/productSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"

export default function ReviewList() {

    // State variables
    const { reviews = [], loading = true, error, isReviewDeleted }  = useSelector(state => state.productState)
    const [productId, setProductId] = useState("");
    const dispatch = useDispatch();

        // Function to format data for MDBDataTable
    const setReviews = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }


         // Loop through reviews and populate data rows
        reviews.forEach( review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user : review.user.name,
                comment: review.comment ,
                actions: (
                    <Fragment>

                          {/* Button to delete review */}
                        <Button onClick={e => deleteHandler(e, review._id)} className="btn btn-danger py-1 px-2 ms-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }


        // Function to handle review deletion
    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteReview(productId, id))
    }


        // Function to handle form submission to fetch reviews
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(getReviews(productId))
    }


        // useEffect hook to handle error messages and review deletion success
    useEffect(() => {
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

                // Display success toast message on review deletion and fetch updated reviews
        if(isReviewDeleted) {
            toast('Review Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewDeleted())
            })
            dispatch(getReviews(productId))
            return;
        }

       
    },[dispatch, error, isReviewDeleted])


    return (
        <div className="row">
             {/* Sidebar Component */}
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>

          {/* Main Content */}
        <div className="col-12 col-md-10">
            <h1 className="my-4">Review List</h1>

            {/* Search Form */}
            <div className="row justify-content-center mt-5">
                <div className="col-5">
                    <form onSubmit={submitHandler}>
                        <div className="form-group text-center">
                            <label className="form-label fw-bold ">Product ID</label>
                            <input 
                                type="text"
                                onChange= {e => setProductId(e.target.value)}
                                value={productId}
                                className="form-control"
                            />
                        </div>
    
        {/* Submit button */}
  <div className="mb-3 d-flex justify-content-center">
                        <button type="submit" disabled={loading}  className="btn bg-warning mt-3 fw-bold text-black" >
                            Search
                        </button>
                        </div>
                    </form>
                </div>
            </div>

              {/* Display reviews in MDBDataTable */}
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setReviews()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}
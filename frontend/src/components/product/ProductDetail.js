import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions"
import Loader from '../layouts/Loader';
import { Carousel, Modal } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import './product.css'; // Make sure to import the CSS file


export default function ProductDetail() {
    // Redux state and dispatch

    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();


    const [quantity, setQuantity] = useState(1);


    // Function to increase quantity
    const increaseQty = () => {
        const count = document.querySelector('.count');
        if (product.stock == 0 || count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    // Function to decrease quantity
    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.valueAsNumber == 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // State for rating and comment
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData))
    }


    // Effect hook to manage side effects (dispatch actions)
    useEffect(() => {

        // Handle review submission success toast
        if (isReviewSubmitted) {
            handleClose();
            toast('Review Submitted successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())
            });
        }

        // Handle error toast
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }

        // Fetch product details if not loaded or review submitted
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id));
        }

        // Clean up function
        return () => {
            dispatch(clearProduct());
        }

    }, [dispatch, id, isReviewSubmitted, error]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />

                    {/* Product details section */}
                    <div className="row f-flex justify-content-around mb-5">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">

                            {/* Carousel for product images */}
                            <Carousel pause="hover">
                                {product.images && product.images.length > 0 && product.images.map(image =>
                                    <Carousel.Item key={image._id}>
                                        <img className="d-block w-100 img-fluid" src={image.image} alt={product.name} height="500" width="500" />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">

                            {/* Product name and ID */}
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            {/* Product rating */}
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            {/* Product price and quantity */}
                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty} >-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus me-3" onClick={increaseQty}>+</span>
                            </div>

                        
                            <hr />

                            {/* Product stock status */}
                            <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            {/* Product description */}
                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />

                            {/* Product seller */}
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            {/* Review submission section */}
                            {user ?
                                <button onClick={handleShow} id="review_btn" type="button" className="btn bg-warning fw-bold text-black rounded-2 mt-4" data-toggle="modal" data-target="#ratingModal">
                                    Submit Your Review
                                </button> :
                                <div className="alert alert-danger mt-5"> Login to Post Review</div>
                            }

                            {/* Modal for review submission */}
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                                            <Modal.Title>Submit Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            {/* Star rating selection */}
                                            <ul className="stars">
                                                {
                                                    [1, 2, 3, 4, 5].map(star => (
                                                        <li
                                                            value={star}
                                                            onClick={() => setRating(star)}
                                                            className={`star ${star <= rating ? 'orange' : ''}`}
                                                            onMouseOver={(e) => e.target.classList.add('yellow')}
                                                            onMouseOut={(e) => e.target.classList.remove('yellow')}

                                                        ><i className="fa fa-star"></i></li>
                                                    ))
                                                }
                                            </ul>

                                            {/* Review text area */}
                                            <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                            </textarea>
                                            {/* Submit button */}
                                            <div className="mb-3 d-flex justify-content-center">
                                                <button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btn my-3 float-right bg-warning fw-bold review-btn px-4 rounded-2 text-black">Submit</button>
                                            </div>
                                        </Modal.Body>

                                    </Modal>
                                </div>
                            </div>

                        </div>

                    </div>

                    {

                        product.reviews && product.reviews.length > 0 ?
                            <ProductReview reviews={product.reviews} /> : null
                    }
                </Fragment>}
        </Fragment>
    )
}

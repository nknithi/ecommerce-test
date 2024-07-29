import { Link } from 'react-router-dom';
import './product.css'; // Make sure to import the CSS file
import Rating from './Rating';  // Import Rating component


export default function Product({ product, col }) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card rounded">

                {/* Display product image if available */}
                {product.images.length > 0 &&
                    <img
                        className="card-img-top img-fluid mx-auto product-image"
                        src={product.images[0].image}
                        alt={product.name}
                    />}
                <div className="card-body p-3 d-flex flex-column">

                    {/* Product title with a link to product details page */}
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>


                    {/* Rating component to display product rating */}
                    <Rating product={product} />


                    {/* Product price */}
                    <p className="card-text">${product.price}</p>

                    {/* Button to view product details */}
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn bg-warning btn-block w-100 fw-bold text-black">View Details</Link>
                </div>
            </div>
        </div>
    )
}
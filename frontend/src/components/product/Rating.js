import React from 'react'


// Component to display product rating and number of reviews
const Rating = ({ product }) => {
  return (
    <div className="ratings mt-auto">

            {/* Rating visualization */}
    <div className="rating-outer">
    <div className="rating-inner" style={{width: `${product.ratings/ 5 * 100}%` }}></div>
    </div>

          {/* Display number of reviews */}
    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
</div>
  )
}

export default Rating
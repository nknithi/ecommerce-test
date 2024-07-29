export default function ProductReview({ reviews }) {
    return (
        <div class="reviews w-75">
            <h3>Reviews</h3>
            <hr />

            {/* Render each review */}
            {reviews && reviews.map(review => (
                <div key={review._id} class="review-card my-3">

                    {/* Star rating */}
                    <div class="rating-outer">
                        <div class="rating-inner" style={{ width: `${review.rating / 5 * 100}%` }}></div>
                    </div>

                    {/* Reviewer name */}
                    <p class="review_user">by {review.user.name}</p>

                    {/* Review comment */}
                    <p class="review_comment">{review.comment}</p>

                    <hr />
                </div>
            ))
            }

        </div>
    )
}
function Review(props) {
    const { reviews, getAverageRating, isLoggedIn, activeUser, deleteReview } = props;
  
    function renderRating() {
      return reviews.map((review) => (
        <div key={review._id}>
          <hr />
          <p>
            Comment by:{" "}
            {review.user === null ? "Deleted User" : review.user.username}
          </p>
          <p>{review.comment}</p>
          <p>
            Rating:{" "}
            {review.rating === 0
              ? "✰✰✰✰✰"
              : review.rating === 1
              ? "⭐✰✰✰✰"
              : review.rating === 2
              ? "⭐⭐✰✰✰"
              : review.rating === 3
              ? "⭐⭐⭐✰✰"
              : review.rating === 4
              ? "⭐⭐⭐⭐✰"
              : review.rating === 5
              ? "⭐⭐⭐⭐⭐"
              : ""}
          </p>
          {isLoggedIn &&
            review.user !== null &&
            (review.user._id === activeUser._id ||
              activeUser.role === "admin") && (
              <button onClick={() => deleteReview(review._id)}>
                Delete
              </button>
            )}
        </div>
      ));
    }
  
    return (
      <div>
        <h4>Comments:</h4>
        <p>
          Global rating: {getAverageRating()}/5 {reviews ? <span>({reviews.length})</span> : ""}
        </p>
        {renderRating()}
      </div>
    );
  }
  
  export default Review;
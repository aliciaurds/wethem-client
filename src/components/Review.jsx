import { Button } from "react-bootstrap";

function Review(props) {
    const { reviews, getAverageRating, isLoggedIn, activeUser, deleteReview } = props;
  
    function renderRating() {
      return reviews.map((review) => (
        <div className = "text-box" key={review._id}>

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
              <Button variant = "outline-danger" onClick={() => deleteReview(review._id)}>
                Delete
              </Button>
            )}
        </div>
      ));
    }
  
    return (
      <div >
        <h5 style={{marginBottom : "20px"}}>
          Global rating: {getAverageRating()}/5 {reviews ? <span>({reviews.length})</span> : ""}
        </h5>


        {renderRating()}
      </div>
    );
  }
  
  export default Review;
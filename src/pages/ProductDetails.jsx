import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";
import { AuthContext } from "../context/auth.context";

function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  // console.log(params);

  //Create state
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("0");
  const [reviews, setReviews] = useState([]);
  const { isLoggedIn, activeUser } = useContext(AuthContext);

  useEffect(() => {
    productData(), reviewsByProduct();
  }, []);

  console.log(reviews);
  const productData = async () => {
    try {
      const response = await service.get(
        `/products/${params.productId}/details`
      );
      // console.log(response);
      setDetails(response.data);
      setIsLoading(false);
    } catch (err) {
      // console.log(err);
      navigate("/error");
    }
  };
  const reviewsByProduct = async () => {
    try {
      const response = await service.get(`/review/${params.productId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addReview = async (comment, rating) => {
    try {
      const response = await service.post(`/review/${params.productId}/add`, {
        comment,
        rating,
      });
      setComment("");
      setRating("0");
      productData();
      reviewsByProduct();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteReview = async (reviewId) => {
    try {
      const response = await service.delete(`/review/${reviewId}/delete`);
      reviewsByProduct(); // Actualizar la lista de revisiones después de eliminar una
    } catch (error) {
      console.error(error);
    }
  };
  //calculate average of rating
  const getAverageRating = () => {
    if (reviews.length === 0) {
      return "";
    }

    const totalRating = reviews.reduce(
      (accumulator, review) => accumulator + review.rating,
      0
    );
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(1); // Redondear a un decimal
  };
  const isAdmin = isLoggedIn && activeUser && activeUser.role === "admin";

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <RingLoader color="red" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to={"/all"}>
        <p>Back</p>
      </Link>
      <h3>{details.name}</h3>
      <div>
        <p>
          <button>❤️</button> <button>🛒</button>
        </p>
      </div>
      <img src={details.image} alt="clothesPicture" />
      <br />
      <p>Description: {details.description}</p>
      <p>{details.price} €</p>
      <p>Size: {details.size}</p>
      <p>Color: {details.color}</p>
      {isAdmin && (
        <Link to={`/products/${details._id}/update`}>
          <button>Update Product</button>
        </Link>
      )}
      {!isLoggedIn && (
        <div>
          <p>
            Please{" "}
            <Link style={{ color: "red" }} to={"/login"}>
              log in
            </Link>{" "}
            to add a comment
          </p>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addReview(comment, rating);
            }}
          >
            <textarea
              placeholder="Add your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button type="submit">Send Review</button>
          </form>
        </div>
      )}

      {reviews.length > 0 && (
        <div>
          <h4>Comments:</h4>
          <p>
            Global rating: {getAverageRating()}/5{" "}
            {reviews.length ? <span>({reviews.length})</span> : ""}
          </p>
          {reviews.map((review) => (
            <div key={review._id}>
              <hr />
              <p>Comment by: {review.username}</p>
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
                (review.user === activeUser._id ||
                  activeUser.role === "admin") && (
                  <button onClick={() => deleteReview(review._id)}>
                    Delete
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

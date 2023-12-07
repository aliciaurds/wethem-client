import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";
import { AuthContext } from "../context/auth.context";
import WishListLogo from "../assets/images/wishlist.png";
import CartLogo from "../assets/images/cart.webp";
import Review from "../components/Review";

const btnStyles = { border: "none", background: "transparent" };
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

  // console.log(reviews);
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
      await service.post(`/review/${params.productId}/add`, {
        comment,
        rating,
      });
      setComment("");
      setRating("0");
      productData();
      reviewsByProduct(); //actualizar reviews
    } catch (error) {
      console.error(error);
    }
  };
  const deleteReview = async (reviewId) => {
    try {
      await service.delete(`/review/${reviewId}/delete`);
      reviewsByProduct(); // Actualizar reviews después de eliminar una
    } catch (error) {
      console.error(error);
    }
  };
  //calculate average of rating
  const getAverageRating = () => {
    if (reviews.length === 0) {
      return "";
    }
    //reduce acumula cada elemento del array, toma los parametos de acumulador("suma") que se inizializa en 0 y le suma cada valor de eachReview("cada elemento del array review")
    //el resultado es la suma total de cada review
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    const totalRating = reviews.reduce(
      (acumulator, eachReview) => acumulator + eachReview.rating,
      0
    );
    //obtengo la media: esa suma entre la longitud de mi array
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(1);
  };
  const addToWishlist = async () => {
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      await service.post(`profile//wishlist/${params.productId}/add`);
      navigate("/wishlist");
    } catch (error) {
      console.error(error);
    }
  };
  const addToShoppingCart = async () => {
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      await service.post(`profile/shoppingCart/${params.productId}/add`);
      navigate("/shoppingCart");
    } catch (error) {
      console.error(error);
    }
  };

  //variable to check if user is logged in, active and it's role its admin
  const isAdmin = isLoggedIn && activeUser && activeUser.role === "admin";
  const isUser = isLoggedIn && activeUser && activeUser.role === "user";

  //capitalization
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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
      {isUser && (
        <div>
          <p>
            <button style={btnStyles} onClick={addToWishlist}>
              <img src={WishListLogo} alt="wishlistlogo" width={20} />
            </button>
            <button style={btnStyles} onClick={addToShoppingCart}>
              <img src={CartLogo} alt="cartlogo" width={20} />
            </button>
          </p>
        </div>
      )}

      <img src={details.image} alt="clothesPicture" />
      <br />
      <p>Description: {details.description}</p>
      <p>{details.price} €</p>
      <p>Size: {capitalize(details.size)}</p>
      <p>Color: {capitalize(details.color)}</p>
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
      {isUser && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addReview(comment, rating);
            }}
          >
            <textarea
              placeholder="Give us your opinion"
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
        <Review
        reviews={reviews}
        getAverageRating={getAverageRating}
        isLoggedIn={isLoggedIn}
        activeUser={activeUser}
        deleteReview={deleteReview}
        />
      )}
    </div>
  );
}

export default ProductDetails;

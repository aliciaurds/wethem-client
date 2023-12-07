import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/config";
import { RingLoader } from "react-spinners";
import { AuthContext } from "../context/auth.context";
import HeartFilled from "../assets/images/filledHeart.png";
import CartFilled from "../assets/images/filledCart.png";
import LineHeart from "../assets/images/lineHeart.png";
import LineCart from "../assets/images/lineCart.png";
import Review from "../components/Review";
import { Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

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

  // Estados para controlar qué imagenes mostrar
  const [wishlistImgVisible, setWishlistImgVisible] = useState(true); 
  const [cartImgVisible, setCartImgVisible] = useState(true); 

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
    //cambio de img
    setWishlistImgVisible(!wishlistImgVisible);
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      await service.patch(`profile//wishlist/${params.productId}/add`);
      
    } catch (error) {
      console.error(error);
    }
     //volver a la imagen original dsp de 1 s
     setTimeout(() => {
      setWishlistImgVisible(true);
    }, 1000)
  };
  const addToShoppingCart = async () => {
    setCartImgVisible(!cartImgVisible);
    try {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      await service.patch(`profile/shoppingCart/${params.productId}/add`);

    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setCartImgVisible(true);
    }, 1000);
   
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
    <div className="details-container">
      <Link to={"/all"}>
        <p>Back</p>
      </Link>
      <h3>{details.name}</h3>
      {isUser && (
        <div>
          <p>
            <button className="add-btn-style" onClick={addToWishlist}>
            {wishlistImgVisible ? (
                <img src={LineHeart} alt="wishlistlogo" width={20} />
              ) : (
                <img src={HeartFilled} alt="wishlistlogo" width={20} />
              )}
            </button>
            <button className="add-btn-style" onClick={addToShoppingCart}>
            {cartImgVisible ? (
                <img src={LineCart} alt="cartlogo" width={20} />
              ) : (
                <img src={CartFilled} alt="cartlogo" width={20} />
              )}
            </button>
          </p>
        </div>
      )}
        <div>
      <img className="img-details" src={details.image} alt="clothesPicture" />
      </div>
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
            <Link to={"/login"}>
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
                
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Give us your opinion"
          style={{ height: '100px' }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
            </FloatingLabel><br />
            <h5>Rate this product</h5>
            <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select><br />
            <Button className="btn-form" variant="outline-danger" type="submit">Send Review</Button>
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

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";


import service from "../services/config";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation()

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {

    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId
    }

    try {
      await service.patch("/payment/update-payment-intent", paymentIntentInfo)
    

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <h3>... updating payment</h3>;
  }

  return (
      <div className="details-container">
        <h1>Thank you for your order!</h1>
        <Link to={"/"}>Go back to Home</Link>
      </div>
  );
};

export default PaymentSuccess;
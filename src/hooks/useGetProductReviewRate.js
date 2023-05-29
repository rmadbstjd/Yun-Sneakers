import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getProductReviews from "../api/review";
import useGetProductInfo from "./useGetProductInfo";
export const useGetProductReviewRate = (props) => {
  const [rate, setRate] = useState(0);
  const [star, setStar] = useState([false, false, false, false, false]);
  const { id } = useParams();
  const { productInfo } = useGetProductInfo(id);
  const productId = productInfo?.product?.id;
  const { data: productReviews } = useQuery(
    ["review", id],
    () => getProductReviews(id),
    {
      enabled: !!productId,
    }
  );
  useEffect(() => {
    if (productReviews) {
      if (productReviews.count === 0) {
        setRate(0);
        return;
      }

      for (let i = 0; i < productReviews.count; i++) {
        setRate((prev) => prev + productReviews?.reviews[i]?.rate);
      }
      setRate((prev) => (prev / productReviews?.count).toFixed(0));
    }
  }, [productReviews]);

  useEffect(() => {
    switch (rate) {
      case 0:
        setStar([false, false, false, false, false]);
        break;
      case "1":
        setStar([true, false, false, false, false]);
        break;
      case "2":
        setStar([true, true, false, false, false]);
        break;
      case "3":
        setStar([true, true, true, false, false]);
        break;
      case "4":
        setStar([true, true, true, true, false]);
        break;
      case "5":
        setStar([true, true, true, true, true]);
        break;
      default:
        break;
    }
  }, [rate]);
  return { star };
};

import React, { useEffect } from "react";

import { useImmer } from "use-immer";
import Navbar from "../../common/Navbar";
import convertStringToNumber from "../../../utils/convertStringToNumber";
import InputProduct from "./InputProduct";
const EditProductForm = ({ productInfo }) => {
  const [product, setProduct] = useImmer({
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  });

  useEffect(() => {
    if (productInfo) {
      setProduct((product) => {
        product["url"] = productInfo.product.image;
        product["price"] = convertStringToNumber(productInfo.product.price);
        product["title"] = productInfo.product.name;
        product["size"] = productInfo.product.size;
        product["description"] = productInfo.product.description;
        product["category"] = productInfo.product.category;
      });
    }
  }, [productInfo]);

  return (
    <>
      <Navbar />
      <InputProduct
        product={product}
        setProduct={setProduct}
        productId={productInfo?.product?.id}
      />
    </>
  );
};

export default EditProductForm;

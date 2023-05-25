import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import convertStringToNumber from "../utils/convertStringToNumber";

export const useTextInputs = (initState, maxLength) => {
  const [state, setState] = useState(initState);
  const getValue = (e) => {
    const value = e.substring(0, maxLength);
    return value;
  };

  const handleChange = (e) => {
    setState(getValue(e));
  };
  return { state, handleChange, getValue };
};

export const useNumberInputs = (initState, maxLength) => {
  const [state, setState] = useState(initState);

  const getValue = (e) => {
    const number = e.replace(/[^0-9]/g, "");
    const value = number.substring(0, maxLength);
    return value;
  };

  const handleChange = (e) => {
    setState(getValue(e));
  };

  return { state, handleChange, getValue };
};

export const useProductInputs = (productInfo) => {
  const [product, setProduct] = useImmer({
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  });
  const [file, setFile] = useState("");

  const onChangeFile = (e) => {
    const { files } = e.target;
    setFile(files && files[0]);
  };

  const onChangeProduct = (e, value) => {
    const row = e.target.value;
    setProduct((product) => {
      product[value] = row;
    });
  };
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
  return { product, setProduct, onChangeProduct, file, onChangeFile };
};

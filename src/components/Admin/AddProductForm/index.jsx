import React from "react";
import { useImmer } from "use-immer";
import Navbar from "../../common/Navbar";

import InputProduct from "./InputProduct/InputProduct";
const AddProductForm = () => {
  const [newProduct, setNewProduct] = useImmer({
    url: "",
    title: "",
    price: "",
    category: "",
    description: "",
    size: "",
  });

  return (
    <>
      <Navbar />
      <InputProduct newProduct={newProduct} setNewProduct={setNewProduct} />
    </>
  );
};

export default AddProductForm;

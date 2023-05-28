import React, { useState } from "react";
import { deleteProduct } from "../../../../api/product";
import { getAllProducts } from "../../../../api/product";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UIManageProducts from "../UIMangeProducts";
const ManageProducts = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  let { data: products, refetch } = useQuery(["products"], () =>
    getAllProducts(page)
  );

  let productsCount = products && products.count;
  products = products && products.products;

  const clickToEditBtn = (productId) => {
    navigate("/admin/edit", { state: { productId } });
  };

  const handleChange = async (page) => {
    setPage(page);
    products = await getAllProducts(page);
    refetch();
  };

  const goToDetailPage = (productId) => {
    navigate(`/products/${productId}`);
  };
  const clickToDeleteBtn = (productId) => {
    Swal.fire({
      title: "상품을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(productId);
        refetch();
        navigate("/admin/manage");
      }
    });
  };
  return (
    <UIManageProducts
      products={products}
      goToDetailPage={goToDetailPage}
      clickToDeleteBtn={clickToDeleteBtn}
      clickToEditBtn={clickToEditBtn}
      productsCount={productsCount}
      page={page}
      handleChange={handleChange}
    ></UIManageProducts>
  );
};

export default ManageProducts;

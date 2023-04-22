import React, { useState } from "react";
import * as Style from "./styles";
import productStore from "../../../store/productStore";
import Navbar from ".././../../components/common/Navbar/index";
import { useQuery } from "@tanstack/react-query";
import convertToPrice from "./../../../hooks/convertToPrice";
import Pagination from "../../../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const itemArr3 = ["상품명", "상품코드", "가격", "관리"];
const ManageProducts = () => {
  const navigate = useNavigate();
  const { product } = productStore();
  const [page, setPage] = useState(1);
  let { data: products, refetch } = useQuery(["products"], () =>
    product.getAllProducts(page)
  );

  let productsCount = products && products.count;
  products = products && products.products;

  const clickToEditBtn = (productId) => {
    navigate("/edit", { state: { productId } });
  };

  const handleChange = async (page) => {
    setPage(page);
    products = await product.getAllProducts(page);
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
        await product.deleteProduct(productId);
        refetch();
        navigate("/manage");
      }
    });
  };

  return (
    <div>
      <Navbar />
      <Style.MyPageContainer>
        <Style.MainContainer>
          <Style.Title>상품 관리</Style.Title>
          <Style.ReviewContainer>
            <Style.ReviewLeftTitle>상품</Style.ReviewLeftTitle>

            <Style.HorizonLine
              width={"1280px"}
              border={3}
              color={"black"}
            ></Style.HorizonLine>
          </Style.ReviewContainer>
          <Style.TopContainer>
            <Style.TopItem width={"610px"}>{itemArr3[0]}</Style.TopItem>
            <Style.TopItem width={"70px"}>{itemArr3[1]}</Style.TopItem>
            <Style.TopItem width={"645px"}>{itemArr3[2]}</Style.TopItem>
            <Style.TopItem width={"60px"}>{itemArr3[3]}</Style.TopItem>
          </Style.TopContainer>

          <Style.HorizonLine
            width={"1465px"}
            border={3}
            color={"black "}
          ></Style.HorizonLine>

          {products &&
            products.map((item, index) => (
              <div key={index}>
                <Style.ProductContent>
                  <Style.Img
                    src={item.image}
                    onClick={() => {
                      goToDetailPage(item.id);
                    }}
                  ></Style.Img>
                  <Style.Info>
                    <Style.Text>
                      <span>[카테고리] {item.category}</span>
                    </Style.Text>
                    <Style.Text>
                      <span>{item.name}</span>
                    </Style.Text>
                    <Style.Text>
                      <span>{item.description}</span>
                    </Style.Text>
                  </Style.Info>

                  <Style.PriceContainer height={"120px"}>
                    <div>{item.id}</div>
                  </Style.PriceContainer>
                  <Style.PriceContainer height={"120px"}>
                    <div>{convertToPrice(item.price)}</div>
                  </Style.PriceContainer>
                  <Style.BtnContainer>
                    <Style.Review onClick={() => clickToEditBtn(item.id)}>
                      수정
                    </Style.Review>
                    <Style.Review onClick={() => clickToDeleteBtn(item.id)}>
                      삭제
                    </Style.Review>
                  </Style.BtnContainer>
                </Style.ProductContent>
              </div>
            ))}
        </Style.MainContainer>
      </Style.MyPageContainer>
      <Pagination
        count={productsCount}
        pagePerCount={5}
        page={page}
        handleChange={handleChange}
      ></Pagination>
    </div>
  );
};

export default ManageProducts;

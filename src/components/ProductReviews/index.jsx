import React, { useState } from "react";
import * as Style from "./styles";
import HorizonLine from "../../components/common/HorizonLine";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Pagination from "../../components/common/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import userInfoStore from "../../store/userInfoStore";
const ProductReviews = () => {
  const { id } = useParams();
  const [isClicked, setIsClicked] = useState();
  const [page, setPage] = useState(1);
  const { review } = userInfoStore();
  const clickToReview = (index) => {
    if (index === isClicked) {
      setIsClicked();
      return;
    }
    setIsClicked(index);
  };
  let { data: productReviews, refetch } = useQuery(["review", id], () =>
    review.getProductReviews(id, page)
  );
  const productReviewsCount = productReviews?.count;
  productReviews = productReviews?.reviews;

  const handlePageChange = async (page) => {
    setPage(page);
    productReviews = await review.getProductReviews(id, page);
    refetch();
  };

  return (
    <Style.Layout>
      <Style.Title>리뷰({productReviewsCount})</Style.Title>
      <HorizonLine
        width={"80%"}
        color={"black"}
        border={"4px"}
        margin={"10px 0px 0px 170px"}
      />
      <Style.ReviewContainer>
        {productReviews?.length === 0 ? (
          <>
            <Style.NoneTextTitle>
              작성된 리뷰가 존재하지 않습니다.
            </Style.NoneTextTitle>
            <Style.NoneTextContent>
              이 상품의 첫 번째 리뷰를 작성해보세요!
            </Style.NoneTextContent>
            <HorizonLine
              width={"100%"}
              border={"1px"}
              color={"gray"}
              margin={"30px 0px 0px 0px"}
            />
          </>
        ) : null}
        {productReviews?.map((review, index) => (
          <Style.Review
            key={review._id}
            onClick={() => {
              clickToReview(index);
            }}
            isClicked={index === isClicked}
          >
            <Style.Header>
              <Style.Star>
                {review.star.map((item, index) =>
                  item === false ? (
                    <AiOutlineStar
                      size={15}
                      key={index}
                      color={"gray"}
                      cursor={"pointer"}
                    />
                  ) : (
                    <AiFillStar
                      size={15}
                      key={index}
                      color={"yellow"}
                      cursor={"pointer"}
                    />
                  )
                )}
                <Style.UserId>{review.userId}</Style.UserId>
              </Style.Star>
              <Style.Date>{review.date}</Style.Date>
            </Style.Header>
            <Style.Info>
              <Style.LeftLayout>
                <Style.Size>옵션: 사이즈 [{review.size}]</Style.Size>
                <Style.Content isClicked={index === isClicked}>
                  {review.content}
                </Style.Content>
              </Style.LeftLayout>
              <Style.Img
                isClicked={index === isClicked}
                alt="상품"
                src={review.image}
              ></Style.Img>
            </Style.Info>
            <HorizonLine
              width={"100%"}
              border={"1px"}
              color={"gray"}
              margin={"10px 0px 0px 0px"}
            />
          </Style.Review>
        ))}
        {productReviews?.length !== 0 && (
          <Pagination
            count={productReviewsCount}
            pagePerCount={5}
            page={page}
            handleChange={handlePageChange}
          ></Pagination>
        )}
      </Style.ReviewContainer>
    </Style.Layout>
  );
};

export default ProductReviews;

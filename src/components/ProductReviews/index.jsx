import React, { useState } from "react";
import * as Style from "./styles";
import HorizonLine from "../../components/common/HorizonLine";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
const ProductReviews = ({ productReviews }) => {
  const [isClicked, setIsClicked] = useState();
  const clickToReview = (index) => {
    if (index === isClicked) {
      setIsClicked();
      return;
    }
    setIsClicked(index);
  };
  return (
    <Style.Layout>
      <Style.Title>리뷰({productReviews && productReviews.length})</Style.Title>
      <HorizonLine
        width={"80%"}
        color={"black"}
        border={"4px"}
        margin={"10px 0px 0px 170px"}
      />
      <Style.ReviewContainer>
        {productReviews &&
          productReviews.map((review, index) => (
            <Style.Review
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
                  {review.userId}
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
      </Style.ReviewContainer>
    </Style.Layout>
  );
};

export default ProductReviews;

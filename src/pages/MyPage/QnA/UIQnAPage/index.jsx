import React from "react";
import * as Style from "./styles";
import Navbar from "../../../../components/common/Navbar/Container";
import MypageSide from "../../../../components/MypageSide/Container";
import convertStringToNumber from "./../../../../utils/convertStringToNumber";
import Pagination from "../../../../components/common/Pagination";
const navbarItems = ["상품 정보", "문의 내용", "작성일", "답변 유무"];
const UIQnAPage = ({
  myQnAs,
  showContent,
  clickToQnA,
  goToDetailPage,
  QnAcounts,
  page,
  handlePageChange,
}) => {
  return (
    <>
      <Navbar />
      <Style.MyPageContainer>
        <MypageSide />
        <Style.MainContainer>
          {" "}
          <Style.Title>상품 Q&A 내역</Style.Title>
          <Style.ReviewContainer>
            <Style.ReviewLeftTitle>Q&A</Style.ReviewLeftTitle>

            <Style.HorizonLine
              width={"1280px"}
              border={3}
              color={"black"}
            ></Style.HorizonLine>
          </Style.ReviewContainer>
          <Style.TopContainer>
            <Style.TopItem width={"390px"}>{navbarItems[0]}</Style.TopItem>
            <Style.TopItem width={"810px"}>{navbarItems[1]}</Style.TopItem>
            <Style.TopItem width={"96px"}>{navbarItems[2]}</Style.TopItem>
            <Style.TopItem width={"100px"}>{navbarItems[3]}</Style.TopItem>
          </Style.TopContainer>
          <Style.HorizonLine width={"1466px"} border={1} color={"gray"} />
          {myQnAs &&
            myQnAs.QnA.map((item, index) => (
              <div key={item._id}>
                <Style.ProductContent
                  isClicked={index === showContent}
                  onClick={() => {
                    clickToQnA(index);
                  }}
                >
                  <Style.Img
                    alt="상품"
                    src={item.image}
                    onClick={() => {
                      goToDetailPage(item.productId);
                    }}
                  ></Style.Img>
                  <Style.Info>
                    <Style.Text>
                      <span>
                        [카테고리]
                        {myQnAs && myQnAs.products[index][0].category[0]}
                      </span>
                    </Style.Text>
                    <Style.Text>
                      <span>{myQnAs && myQnAs.products[index][0].name}</span>
                    </Style.Text>
                    <Style.Text>
                      <span>
                        {convertStringToNumber(
                          myQnAs && myQnAs.products[index][0].price
                        )}
                        원
                      </span>
                    </Style.Text>
                  </Style.Info>
                  <Style.PriceContainer width={"783px"} height={"120px"}>
                    <div>{item.content}</div>
                  </Style.PriceContainer>
                  <Style.PriceContainer width={"126px"} height={"120px"}>
                    <div>{item.dates}</div>
                  </Style.PriceContainer>
                  <Style.PriceContainer width={"100px"} height={"120px"}>
                    <Style.AnswerBox answered={item.isAnswered}>
                      {item.isAnswered ? "yes" : "no"}
                    </Style.AnswerBox>
                  </Style.PriceContainer>
                </Style.ProductContent>
                {index === showContent && (
                  <Style.QnALayout
                    isShow={index === showContent}
                    onClick={() => {
                      clickToQnA(index);
                    }}
                  >
                    <Style.QnAContent>
                      <Style.Q>Q.</Style.Q>
                      <Style.QnATitle>{item.title}</Style.QnATitle>
                      <Style.QnAContents>{item.content}</Style.QnAContents>
                      <Style.QnAContents>{item.answer}</Style.QnAContents>
                    </Style.QnAContent>
                    <Style.Q>A.</Style.Q>
                    <Style.QnAAnswer>{item.answer}</Style.QnAAnswer>
                  </Style.QnALayout>
                )}

                <Style.HorizonLine width={"1466px"} border={1} color={"gray"} />
              </div>
            ))}
          {myQnAs && myQnAs.QnA.length !== 0 && (
            <Pagination
              count={QnAcounts}
              pagePerCount={5}
              page={page}
              handleChange={handlePageChange}
            ></Pagination>
          )}
        </Style.MainContainer>
      </Style.MyPageContainer>
    </>
  );
};

export default UIQnAPage;

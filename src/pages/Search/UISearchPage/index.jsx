import React from "react";
import * as Style from "./styles";
import Navbar from "../../../components/common/Navbar/Container";
import HorizonLine from "../../../components/common/HorizonLine";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Pagination from "../../../components/common/Pagination";
import ProductCard from "../../../components/common/ProductCard";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineMinus } from "@react-icons/all-files/ai/AiOutlineMinus";
import convertStringToNumber from "../../../utils/convertStringToNumber";
const priceInitArr = [
  "20만원 이하",
  "20만원 - 40만원 이하",
  "40만원 - 60만원 이하",
  "60만원 이상",
];
const sortArr = [
  { id: "popular", title: "인기순" },
  { id: "new", title: "최신순" },
  { id: "highprice", title: "높은 가격순" },
  { id: "lowprice", title: "낮은 가격순" },
];
const UISearchPage = ({
  searchKeyword,
  sessionSort,
  collectionName,
  priceOrder,
  result,
  handleChange,
  handleKeyDown,
  handleBlur,
  submitKeyword,
  clickToBrand,
  clickToClose,
  clickToPrice,
  clickToSort,
  showSearchedProducts,
  searchProducts,
  handleMouseDown,
  goToDetail,
  scrollPosition,
  showBrand,
  brands,
  checkedBrandList,
  onChecked,
  showPrice,
  checkedPriceList,
  products,
  checkedSort,
  selectedBrands,
  closeToBrand,
  isLoading,
  handlePageChange,
  pages,
}) => {
  return (
    <div>
      <Navbar
        searchKeyword={searchKeyword}
        sort={sessionSort}
        collectionName={collectionName}
        priceOrder={priceOrder}
      />
      <Style.Layout>
        <Style.Container>
          <Style.SearchBarLayout>
            <Style.SearchContainer isText={false}>
              <Style.SearchContent onSubmit={(e) => submitKeyword(e)}>
                <Style.InputSearch
                  type="text"
                  value={result}
                  placeholder="브랜드명, 모델명 등"
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onBlur={() => handleBlur()}
                />
                <AiFillCloseCircle
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    margin: "10px 0px 0px 10px",
                    color: "black",
                  }}
                  onClick={() => {
                    clickToClose();
                  }}
                />
              </Style.SearchContent>
              <HorizonLine
                width={"558px"}
                border={"3px"}
                color={"black"}
              ></HorizonLine>
              {showSearchedProducts ? (
                searchProducts.length !== 0 ? (
                  <Style.ProductsLayout>
                    {searchProducts.map((item) => (
                      <div key={item.name}>
                        <Style.ProductContent
                          onMouseDown={handleMouseDown}
                          onClick={() => {
                            goToDetail(item);
                          }}
                        >
                          <Style.ProductImage
                            src={item.image}
                          ></Style.ProductImage>
                          <Style.ProductInfo>
                            <Style.ProductDesc>
                              {item.description}
                            </Style.ProductDesc>
                            <Style.ProductTitle>
                              {item.name}123
                            </Style.ProductTitle>
                          </Style.ProductInfo>
                        </Style.ProductContent>
                      </div>
                    ))}
                  </Style.ProductsLayout>
                ) : result && result.length !== 0 ? (
                  <Style.NullTextLayout>
                    <Style.NullText>
                      검색하신 상품이 존재하지 않습니다.
                    </Style.NullText>
                  </Style.NullTextLayout>
                ) : null
              ) : null}
            </Style.SearchContainer>
          </Style.SearchBarLayout>

          <Style.Content>
            <Style.SideLayout isScrolled={scrollPosition > 100 ? true : false}>
              <Style.Filter>필터</Style.Filter>

              <Style.SideContainer onClick={clickToBrand}>
                <Style.BrandNavbar isShow={showBrand ? true : false}>
                  브랜드
                </Style.BrandNavbar>

                {!showBrand ? (
                  <AiOutlinePlus style={{ width: "20px" }} />
                ) : (
                  <AiOutlineMinus style={{ width: "20px" }} />
                )}
              </Style.SideContainer>
              {!showBrand && (
                <HorizonLine
                  width={"85%"}
                  border={"1px"}
                  color={"black"}
                  margin={"0px 0px 10% 0px"}
                ></HorizonLine>
              )}
              <Style.BrandContent isShow={showBrand ? true : false}>
                {brands &&
                  brands.map((item) => (
                    <Style.Item key={item}>
                      <Style.ItemName>
                        <input
                          type="checkbox"
                          checked={
                            checkedBrandList.includes(item) ? true : false
                          }
                          value={item}
                          onChange={(e) => onChecked(e, "brand")}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "8px",
                          }}
                        />
                        <Style.Span>{item}</Style.Span>
                      </Style.ItemName>
                    </Style.Item>
                  ))}
              </Style.BrandContent>

              <Style.SideContainer onClick={clickToPrice}>
                <Style.PriceNavbar>가격</Style.PriceNavbar>
                {!showPrice ? (
                  <AiOutlinePlus style={{ width: "20px" }} />
                ) : (
                  <AiOutlineMinus style={{ width: "20px" }} />
                )}
              </Style.SideContainer>

              {!showPrice && (
                <HorizonLine
                  width={"85%"}
                  border={"1px"}
                  color={"black"}
                  margin={"0px 0px 10% 0px"}
                ></HorizonLine>
              )}
              <Style.PriceContent isShow={showPrice ? true : false}>
                {priceInitArr.map((item, index) => (
                  <Style.Item key={item}>
                    <Style.ItemName>
                      {" "}
                      <input
                        type="checkbox"
                        checked={
                          checkedPriceList.includes(`${index + 1}`)
                            ? true
                            : false
                        }
                        value={item}
                        onChange={(e) => onChecked(e, "price", index + 1)}
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                        }}
                      />
                      <Style.Span>{item}</Style.Span>
                    </Style.ItemName>
                  </Style.Item>
                ))}
                <HorizonLine
                  width={"85%"}
                  border={"1px"}
                  color={"black"}
                  margin={"0px 0px 10% 0px"}
                ></HorizonLine>
              </Style.PriceContent>
            </Style.SideLayout>

            <Style.Products>
              <Style.SortLayout>
                <Style.ProductsCount>
                  상품{" "}
                  {products && products.products.length !== 0
                    ? convertStringToNumber(products.count)
                    : 0}
                </Style.ProductsCount>
                <Style.SortContainer>
                  {sortArr.map((item) => (
                    <Style.SortContent
                      isClicked={checkedSort === item.id}
                      width={item.length}
                      key={item.id}
                      onClick={() => {
                        clickToSort(item);
                      }}
                    >
                      {item.title}
                    </Style.SortContent>
                  ))}
                </Style.SortContainer>
              </Style.SortLayout>
              {selectedBrands[0] && (
                <Style.SelectedBrandContainer>
                  {selectedBrands[0] &&
                    selectedBrands[0].map((item, index) => (
                      <Style.SelectedBrand key={item}>
                        {item}
                        <Style.ItemName>
                          <Style.Close
                            onClick={() => {
                              closeToBrand(item);
                            }}
                          >
                            X
                          </Style.Close>
                        </Style.ItemName>
                      </Style.SelectedBrand>
                    ))}
                </Style.SelectedBrandContainer>
              )}
              <Style.Cards>
                {isLoading && (
                  <LoadingSpinner
                    width={"80%"}
                    margin={"100px 0px 0px 0px"}
                    text={"상품을 준비하는 중입니다."}
                  />
                )}
                {!isLoading && products && products.products.length === 0 ? (
                  <Style.NotFound>
                    검색하신 상품이 존재하지 않습니다.
                  </Style.NotFound>
                ) : null}
                {products && products.products.length !== 0
                  ? products.products.map((item) => (
                      <ProductCard
                        width={"190px"}
                        height={"320px"}
                        margin={"20px 30px 30px 0px"}
                        key={item.id}
                        product={item}
                        navigate={() => goToDetail(item.id)}
                      ></ProductCard>
                    ))
                  : null}
              </Style.Cards>
            </Style.Products>
          </Style.Content>
          <Pagination
            count={products?.count}
            handleChange={handlePageChange}
            page={pages}
            pagePerCount={10}
            margin={"40px 0px 0px 230px"}
          ></Pagination>
        </Style.Container>
      </Style.Layout>
    </div>
  );
};

export default UISearchPage;

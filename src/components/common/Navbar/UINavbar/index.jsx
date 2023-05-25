import React from "react";
import * as Style from "./styles";
import { GiConverseShoe } from "@react-icons/all-files/gi/GiConverseShoe";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import ScrollToTop from "../../../../utils/scrollToTop";
import AdminNavbar from "../UIAdminNavbar/AdminNavbar";
import UserNavbar from "../UIUserNavbar/UserNavbar";
import Button from "../../button";
import SearchModal from "../../Modal/Children/SearchContainer";
const Container = ({
  showNavbar,
  scrollPosition,
  setShowSearch,
  navigate,
  isAdmin,
  searchKeyword,
  sort,
  collectionName,
  priceOrder,
  setShowNavbar,
  setShowBar,
  cartCount,
  nickName,
  userId,
  handleLogin,
  handleLogout,
  clickToSearch,
  showSearch,
}) => {
  return (
    <>
      <ScrollToTop />
      {showNavbar && (
        <Style.Container isScrolled={scrollPosition > 100}>
          <Style.NavbarContainer>
            <Style.NavbarLeftContainer
              onClick={() => {
                navigate("/");
                setShowSearch(false);
              }}
            >
              <GiConverseShoe
                size={45}
                style={{ marginLeft: "6px", marginRight: "6px" }}
              />
              <Style.ShopName
                onClick={() => {
                  navigate("/");
                  setShowSearch(false);
                }}
              >
                Yun'Sneakers
              </Style.ShopName>
            </Style.NavbarLeftContainer>

            <Style.NavbarRightContainer>
              {isAdmin ? (
                <AdminNavbar
                  navigate={navigate}
                  setShowSearch={setShowSearch}
                />
              ) : (
                <UserNavbar
                  searchKeyword={searchKeyword}
                  sort={sort}
                  collectionName={collectionName}
                  priceOrder={priceOrder}
                  setShowSearch={setShowSearch}
                  setShowNavbar={setShowNavbar}
                  setShowBar={setShowBar}
                  cartCount={cartCount}
                />
              )}
              {<Style.Nickname>{nickName}</Style.Nickname>}
              {!userId ? (
                <Button
                  style={{
                    border: "solid black 0px",
                    width: "60px",
                    height: "24px",
                    borderRadius: "5px",
                    margin: "10px 0px 0px 0px",
                    background: "#fafafa",
                    hoverFontWeight: "bolder",
                  }}
                  onClick={handleLogin}
                >
                  LOGIN
                </Button>
              ) : (
                <Button
                  style={{
                    border: "solid black 0px",
                    width: "60px",
                    height: "24px",
                    borderRadius: "5px",
                    margin: "10px 0px 0px 0px",
                    background: "#fafafa",
                    hoverFontWeight: "bolder",
                  }}
                  onClick={handleLogout}
                >
                  LOGOUT
                </Button>
              )}
              <Style.SearchIconContainer onClick={clickToSearch}>
                <FiSearch
                  style={{
                    margin: "5px 2px 0px 10px",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />
              </Style.SearchIconContainer>
            </Style.NavbarRightContainer>
          </Style.NavbarContainer>
        </Style.Container>
      )}
      {showSearch && (
        <SearchModal
          searchKeyword={searchKeyword}
          sort={sort}
          collectionName={collectionName}
          priceOrder={priceOrder}
          setShowSearch={setShowSearch}
          setShowNavbar={setShowNavbar}
          setShowBar={setShowBar}
        />
      )}
    </>
  );
};

export default Container;

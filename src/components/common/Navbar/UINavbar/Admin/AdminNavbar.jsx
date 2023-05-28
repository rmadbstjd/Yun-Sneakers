import React from "react";
import { RiFileEditFill } from "@react-icons/all-files/ri/RiFileEditFill";
import { RiQuestionAnswerFill } from "@react-icons/all-files/ri/RiQuestionAnswerFill";
import { AiFillFileAdd } from "@react-icons/all-files/ai/AiFillFileAdd";
import * as Style from "./styles";
const AdminNavbar = ({ navigate, setShowSearch }) => {
  return (
    <>
      <RiFileEditFill
        size={19}
        style={{
          marginTop: "12px",
          marginRight: "3px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/admin/manage");
          setShowSearch(false);
        }}
      />
      <Style.NavbarItemLayout
        onClick={() => {
          navigate("/admin/manage");
          setShowSearch(false);
        }}
      >
        상품 관리
      </Style.NavbarItemLayout>

      <RiQuestionAnswerFill
        size={20}
        style={{
          marginTop: "11px",
          marginRight: "3px",
          cursor: "pointer",
        }}
      />
      <Style.NavbarItemLayout
        onClick={() => {
          navigate("/admin/qna");
          setShowSearch(false);
        }}
      >
        Q&A
      </Style.NavbarItemLayout>

      <AiFillFileAdd
        size={20}
        style={{
          marginTop: "11px",
          marginRight: "3px",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/admin/new");
          setShowSearch(false);
        }}
      />
      <Style.NavbarItemLayout
        onClick={() => {
          navigate("/admin/new");
          setShowSearch(false);
        }}
      >
        상품 추가
      </Style.NavbarItemLayout>
    </>
  );
};

export default AdminNavbar;

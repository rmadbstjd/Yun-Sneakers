import React from "react";
import * as Style from "./styles";
import Navbar from "../../../components/common/Navbar/Container";
const UILoginPage = ({
  showModal,
  goToMainPage,
  allows,
  handleChangeID,
  handleKeyDown,
  id,
  handleSubmit,
  handleChangePW,
  pw,
  isPassed,
  clickToSubmit,
  goToSignUp,
}) => {
  return (
    <>
      <Navbar />
      <Style.Container>
        {showModal && (
          <Style.Modal>
            <span>아이디 혹은 비밀번호가 일치하지 않습니다.</span>
            <span>다시 입력해주세요.</span>
          </Style.Modal>
        )}
        <Style.Title
          onClick={() => {
            goToMainPage();
          }}
        >
          Yun's Sneakers
        </Style.Title>
        <Style.InputContainer>
          <Style.Label isAllowed={allows.id}>아이디</Style.Label>
          <Style.InputValue
            type="text"
            onChange={(e) => handleChangeID(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="6-20자의 영문,숫자를 입력해주세요"
            value={id}
            isAllowed={allows.id}
          ></Style.InputValue>
          {allows.id === false ? (
            <Style.Text>아이디를 정확하게 입력해주세요.</Style.Text>
          ) : (
            <Style.Text></Style.Text>
          )}
        </Style.InputContainer>
        <Style.InputContainer>
          <Style.Label isAllowed={allows.pw}>비밀번호</Style.Label>
          <Style.Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Style.InputValue
              type="password"
              onChange={(e) => handleChangePW(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="영문,숫자,특수문자를 각각 최소 한 개씩 포함하여 8-16자"
              value={pw}
              isAllowed={allows.pw}
              autoComplete="off"
            ></Style.InputValue>
          </Style.Form>
          {allows.pw === false ? (
            <Style.Text>
              영문, 숫자, 특수문자를 조합해서 입력해주세요(8-16자).
            </Style.Text>
          ) : (
            <Style.Text></Style.Text>
          )}
        </Style.InputContainer>

        <Style.SubmitBtn
          isPassed={isPassed}
          onClick={() => {
            clickToSubmit();
          }}
        >
          로그인
        </Style.SubmitBtn>
        <Style.SignUpLink
          onClick={() => {
            goToSignUp();
          }}
        >
          아직 회원이 아니시라면
        </Style.SignUpLink>
      </Style.Container>
    </>
  );
};

export default UILoginPage;

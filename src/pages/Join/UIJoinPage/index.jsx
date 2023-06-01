import React from "react";
import * as Style from "./styles";
import Navbar from "../../../components/common/Navbar/Container";
const UIJoinPage = ({
  allows,
  handleChangeID,
  id,
  result,
  handleChangePW,
  pw,
  handleChangeRePW,
  rePw,
  handleChangeNickName,
  nickName,
  isPassed,
  clickToSubmit,
}) => {
  return (
    <div>
      <Navbar />
      <Style.Container>
        <Style.Title>회원가입</Style.Title>
        <Style.InputContainer>
          <Style.Label isAllowed={allows.id}>아이디</Style.Label>
          <Style.InputValue
            type="text"
            onChange={(e) => {
              handleChangeID(e);
            }}
            placeholder="6-20자의 영문,숫자를 입력해주세요"
            value={id}
            isAllowed={allows.id}
          ></Style.InputValue>
          {allows.id === false ? (
            <Style.Text>양식에 준수하여 아이디를 입력해주세요.</Style.Text>
          ) : result === false ? (
            <Style.Text>중복된 아이디입니다. 다시 입력해주세요.</Style.Text>
          ) : (
            <Style.Text></Style.Text>
          )}
        </Style.InputContainer>

        <Style.InputContainer>
          <Style.Form>
            <Style.Label isAllowed={allows.pw}>비밀번호</Style.Label>
            <Style.InputValue
              type="password"
              onChange={(e) => {
                handleChangePW(e);
              }}
              placeholder="영문,숫자,특수문자를 각각 최소 한 개씩 포함하여 8-16자"
              value={pw}
              isAllowed={allows.pw}
              autoComplete="off"
            ></Style.InputValue>
          </Style.Form>
          {allows.pw === false ? (
            <Style.Text>양식에 준수하여 비밀번호를 입력해주세요.</Style.Text>
          ) : (
            <Style.Text></Style.Text>
          )}
        </Style.InputContainer>

        <Style.InputContainer>
          <Style.Label isAllowed={allows.rePW}>비밀번호 확인</Style.Label>
          <Style.Form>
            <Style.InputValue
              type="password"
              onChange={(e) => {
                handleChangeRePW(e);
              }}
              placeholder="비밀번호를 다시 입력해주세요."
              value={rePw}
              isAllowed={allows.rePW}
              autoComplete="off"
            ></Style.InputValue>
          </Style.Form>
          {allows.rePW === false ? (
            <Style.Text>비밀번호가 일치하지 않습니다.</Style.Text>
          ) : (
            <Style.Text></Style.Text>
          )}
        </Style.InputContainer>

        <Style.InputContainer>
          <Style.Label isAllowed={allows.nickname}>닉네임</Style.Label>
          <Style.InputValue
            type="text"
            onChange={(e) => {
              handleChangeNickName(e);
            }}
            placeholder="2~6글자를 입력해주세요."
            value={nickName}
            isAllowed={allows.nickname}
          ></Style.InputValue>
          {allows.nickname === false ? (
            <Style.Text>양식에 준수하여 닉네임을 입력해주세요.</Style.Text>
          ) : (
            <Style.Text></Style.Text>
          )}
        </Style.InputContainer>

        <Style.SubmitButton isPassed={isPassed} onClick={clickToSubmit}>
          가입하기
        </Style.SubmitButton>
      </Style.Container>
    </div>
  );
};

export default UIJoinPage;

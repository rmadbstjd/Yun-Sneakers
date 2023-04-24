import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../store/userInfoStore";
import Navbar from "./../../components/common/Navbar";

const Join = () => {
  const navigate = useNavigate();
  const { user } = userInfoStore();
  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
    rePW: "",
    nickname: "",
  });
  const [allows, setAllows] = useState({
    id: null,
    pw: null,
    rePW: null,
    nickname: null,
  });
  const [result, setResult] = useState();
  const [isPassed, setIsPassed] = useState(false);

  let regex;
  const changeInput = (e, type) => {
    switch (type) {
      case "id":
        regex = /^[A-za-z0-9]{5,19}$/;
        if (e.target.value.length <= 19)
          if (!regex.test(e.target.value)) {
            setAllows({ ...allows, [type]: false });
          } else {
            setAllows({ ...allows, [type]: true });
          }
        setInputs({ ...inputs, [type]: e.target.value });
        if (e.target.value.length > 19) {
          let limitID = e.target.value.substring(0, 19);
          if (!regex.test(limitID)) {
            setAllows({ ...allows, [type]: false });
          } else {
            setAllows({ ...allows, [type]: true });
          }
          setInputs({ ...inputs, [type]: limitID });
        }
        break;

      case "pw":
        regex =
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (e.target.value.length <= 16)
          if (!regex.test(e.target.value)) {
            setAllows({ ...allows, [type]: false });
          } else {
            setAllows({ ...allows, [type]: true });
          }
        setInputs({ ...inputs, [type]: e.target.value });
        if (e.target.value.length > 16) {
          let limitPW = e.target.value.substring(0, 16);
          if (!regex.test(limitPW)) {
            setAllows({ ...allows, [type]: false });
          } else {
            setAllows({ ...allows, [type]: true });
          }
          setInputs({ ...inputs, [type]: limitPW });
        }

        break;

      case "rePW":
        if (e.target.value !== inputs.pw) {
          setAllows({ ...allows, [type]: false });
        } else {
          setAllows({ ...allows, [type]: true });
        }
        if (e.target.value.length > 16)
          setInputs({ ...inputs, [type]: e.target.value.substring(0, 16) });
        else setInputs({ ...inputs, [type]: e.target.value });
        break;

      case "nickname":
        regex = /[A-Za-z0-9가-힣]{2,7}/;
        if (e.target.value.length <= 6)
          if (!regex.test(e.target.value)) {
            setAllows({ ...allows, [type]: false });
          } else {
            setAllows({ ...allows, [type]: true });
          }
        setInputs({ ...inputs, [type]: e.target.value });
        if (e.target.value.length > 6) {
          let limitNickName = e.target.value.substring(0, 6);
          if (!regex.test(limitNickName)) {
            setAllows({ ...allows, [type]: false });
          } else {
            setAllows({ ...allows, [type]: true });
          }
          setInputs({ ...inputs, [type]: limitNickName });
        }

        break;
      default:
        break;
    }
  };
  const clickToSubmit = async () => {
    if (isPassed) {
      const response = await user.signUp(inputs.id, inputs.pw, inputs.nickname);
      setResult(response);
    }
  };
  useEffect(() => {
    if (allows.id && allows.pw && allows.rePW && allows.nickname) {
      if (inputs.pw === inputs.rePW) setIsPassed(true);
      else setIsPassed(false);
    } else setIsPassed(false);

    if (isPassed) if (result) navigate("/login");
  }, [result, allows, inputs, isPassed, navigate]);

  return (
    <div>
      <Navbar />
      <Style.Container>
        <Style.Title>회원가입</Style.Title>
        <Style.InputContainer>
          <Style.Label isAllowed={allows.id}>아이디</Style.Label>
          <Style.InputValue
            type="text"
            onChange={(e) => changeInput(e, "id")}
            placeholder="6-20자의 영문,숫자를 입력해주세요"
            value={inputs.id}
            isAllowed={allows.id}
          ></Style.InputValue>
          {allows.id === false ? (
            <Style.Text>양식에 준수하여 아이디를 입력해주세요.</Style.Text>
          ) : result === false ? (
            <Style.Text>중복된 아이디입니다. 다시 입력해주세요.</Style.Text>
          ) : null}
        </Style.InputContainer>

        <Style.InputContainer>
          <Style.Form>
            <Style.Label isAllowed={allows.pw}>비밀번호</Style.Label>
            <Style.InputValue
              type="password"
              onChange={(e) => changeInput(e, "pw")}
              placeholder="영문,숫자,특수문자를 각각 최소 한 개씩 포함하여 8-16자"
              value={inputs.pw}
              isAllowed={allows.pw}
              autoComplete="off"
            ></Style.InputValue>
          </Style.Form>
          {allows.pw === false ? (
            <Style.Text>양식에 준수하여 비밀번호를 입력해주세요.</Style.Text>
          ) : null}
        </Style.InputContainer>

        <Style.InputContainer>
          <Style.Label isAllowed={allows.rePW}>비밀번호 확인</Style.Label>
          <Style.Form>
            <Style.InputValue
              type="password"
              onChange={(e) => changeInput(e, "rePW")}
              placeholder="비밀번호를 다시 입력해주세요."
              value={inputs.rePW}
              isAllowed={allows.rePW}
              autoComplete="off"
            ></Style.InputValue>
          </Style.Form>
          {allows.rePW === false ? (
            <Style.Text>비밀번호가 일치하지 않습니다.</Style.Text>
          ) : null}
        </Style.InputContainer>

        <Style.InputContainer>
          <Style.Label isAllowed={allows.nickname}>닉네임</Style.Label>
          <Style.InputValue
            type="text"
            onChange={(e) => changeInput(e, "nickname")}
            placeholder="2~6글자를 입력해주세요."
            value={inputs.nickname}
            isAllowed={allows.nickname}
          ></Style.InputValue>
          {allows.nickname === false ? (
            <Style.Text>양식에 준수하여 닉네임을 입력해주세요.</Style.Text>
          ) : null}
        </Style.InputContainer>

        <Style.SubmitBtn isPassed={isPassed} onClick={clickToSubmit}>
          가입하기
        </Style.SubmitBtn>
      </Style.Container>
    </div>
  );
};

export default Join;

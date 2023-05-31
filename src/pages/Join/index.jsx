import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Container";
import userApi from "../../api/user";
import { useTextInputs } from "../../hooks/useInputs";
const Join = () => {
  const navigate = useNavigate();

  const { state: id, handleChange: setId } = useTextInputs("", 19);
  const { state: pw, handleChange: setPw } = useTextInputs("", 16);
  const { state: rePw, handleChange: setRePw } = useTextInputs("", 16);
  const { state: nickName, handleChange: setNickName } = useTextInputs("", 6);
  const [allows, setAllows] = useState({
    id: null,
    pw: null,
    rePW: null,
    nickname: null,
  });
  const [result, setResult] = useState();
  const [isPassed, setIsPassed] = useState(false);

  let regex;
  const handleChangeID = (e) => {
    regex = /^[A-za-z0-9]{5,19}$/;
    if (!regex.test(e.target.value)) {
      setAllows({ ...allows, id: false });
    } else {
      setAllows({ ...allows, id: true });
    }
    setId(e.target.value);
  };

  const handleChangePW = (e) => {
    regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    if (!regex.test(e.target.value)) {
      setAllows({ ...allows, pw: false });
    } else {
      setAllows({ ...allows, pw: true });
    }
    setPw(e.target.value);
  };

  const handleChangeRePW = (e) => {
    regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (e.target.value !== pw) {
      setAllows({ ...allows, rePW: false });
    } else {
      setAllows({ ...allows, rePW: true });
    }
    setRePw(e.target.value);
  };

  const handleChangeNickName = (e) => {
    regex = /[A-Za-z0-9가-힣]{2,7}/;
    if (!regex.test(e.target.value)) {
      setAllows({ ...allows, nickname: false });
    } else {
      setAllows({ ...allows, nickname: true });
    }
    setNickName(e.target.value);
  };

  const clickToSubmit = async () => {
    if (isPassed) {
      const response = await userApi.signUp(id, pw, nickName);
      setResult(response);
    }
  };
  useEffect(() => {
    if (allows.id && allows.pw && allows.rePW && allows.nickname) {
      if (pw === rePw) setIsPassed(true);
      else setIsPassed(false);
    } else setIsPassed(false);

    if (isPassed) if (result) navigate("/login");
  }, [result, allows, pw, rePw, isPassed, navigate]);

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

export default Join;

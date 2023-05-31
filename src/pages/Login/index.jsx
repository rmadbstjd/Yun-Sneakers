import React, { useState, useEffect } from "react";
import * as Style from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { history } from "../../utils/history";
import Navbar from "../../components/common/Navbar/Container";

import userApi from "../../api/user";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });
  const [allows, setAllows] = useState({
    id: null,
    pw: null,
  });
  const [isPassed, setIsPassed] = useState(false);
  const [result, setResult] = useState();
  const [showModal, setShowModal] = useState(false);
  let regex;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (isPassed) {
        const data = await userApi.login(inputs.id, inputs.pw);
        if (data === false) {
          setResult(false);
        } else setResult(true);
      }
    }
  };
  const changeInput = (e, type) => {
    switch (type) {
      case "id":
        regex = /^[A-za-z0-9]{5,19}$/g;
        if (!regex.test(e.target.value)) {
          setAllows({ ...allows, [type]: false });
          setIsPassed(false);
        } else {
          setAllows({ ...allows, [type]: true });
        }
        setInputs({ ...inputs, [type]: e.target.value });
        break;
      case "pw":
        regex =
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (!regex.test(e.target.value)) {
          setAllows({ ...allows, [type]: false });
          setIsPassed(false);
        } else {
          setAllows({ ...allows, [type]: true });
          setIsPassed(true);
        }
        setInputs({ ...inputs, [type]: e.target.value });
        break;
      default:
        break;
    }
  };
  const clickToSubmit = async () => {
    if (isPassed) {
      const data = await userApi.login(inputs.id, inputs.pw);

      if (data === false) {
        setResult(false);
      } else setResult(true);
    }
  };

  const goToSignUp = () => {
    navigate("/join");
  };

  const goToMainPage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (allows.id && allows.pw) setIsPassed(true);
    if (result) navigate("/");
    else if (result === false) {
      setShowModal((prev) => !prev);
      setTimeout(setShowModal, 2000);
      setResult(null);
    }
  }, [result, allows]);

  useEffect(() => {
    const listenBackEvent = () => navigate("/");
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        if (location.pathname === "/login") listenBackEvent();
      }
    });

    return unlistenHistoryEvent;
  }, [navigate, location.pathname]);

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
            onChange={(e) => changeInput(e, "id")}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="6-20자의 영문,숫자를 입력해주세요"
            value={inputs.id}
            isAllowed={allows.id}
          ></Style.InputValue>
          {allows.id === false ? (
            <Style.Text>아이디를 정확하게 입력해주세요.</Style.Text>
          ) : null}
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
              onChange={(e) => changeInput(e, "pw")}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="영문,숫자,특수문자를 각각 최소 한 개씩 포함하여 8-16자"
              value={inputs.pw}
              isAllowed={allows.pw}
              autoComplete="off"
            ></Style.InputValue>
          </Style.Form>
          {allows.pw === false ? (
            <Style.Text>
              영문, 숫자, 특수문자를 조합해서 입력해주세요(8-16자).
            </Style.Text>
          ) : null}
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

export default Login;

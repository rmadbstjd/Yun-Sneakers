import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Style from "./styles";
import userInfoStore from "../../store/userInfoStore";
import axios from "axios";
import { history } from "../../hooks/history";
import Navbar from "../../components/common/Navbar";
const Login = ({ isAuthenticated }) => {
  const location = useLocation();
  //window.history.forward();
  const { setNickName, setUserId } = userInfoStore();
  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });
  const [allows, setAllows] = useState({
    id: null,
    pw: null,
  });

  const [allowAll, setAllowAll] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  let regex;
  const login = async () => {
    await axios({
      url: "http://localhost:3001/login",
      method: "POST",
      withCredentials: "true",
      data: {
        userId: inputs.id,
        password: inputs.pw,
      },
    }).then(async (result) => {
      if (result.status === 201) {
        localStorage.setItem("isLogin", false);

        setResult(false);
      } else if (result.status === 200) {
        localStorage.setItem("isLogin", true);
        setNickName(result.data.data.user.nickname);
        setUserId(result.data.data.user.userId);

        setResult(true);
      }
    });
  };

  const changeInput = (e, type) => {
    switch (type) {
      case "id":
        regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (!regex.test(e.target.value)) {
          setAllows({ ...allows, [type]: false });
          setAllowAll(false);
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
          setAllowAll(false);
        } else {
          setAllows({ ...allows, [type]: true });
          setAllowAll(true);
        }
        setInputs({ ...inputs, [type]: e.target.value });
        break;
      default:
        break;
    }
  };
  const clickToSubmit = () => {
    if (allowAll) {
      login();
      setCount((prev) => prev + 1);
    }
  };
  const goToSignUp = () => {
    navigate("/join");
  };

  const goToMainPage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    if (allows.id && allows.pw) setAllowAll(true);
    if (result === true) navigate("/");
    else if (result === false) {
      setShowModal((prev) => !prev);
      setTimeout(setShowModal, 2000);
      setResult(null);
    }
  }, [result, count, allows, isAuthenticated, navigate]);

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
            <div>아이디 혹은 비밀번호가 일치하지 않습니다.</div>
            <div>다시 입력해주세요.</div>
          </Style.Modal>
        )}
        <Style.Title onClick={goToMainPage}>Yun's Sneakers</Style.Title>
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
            <Style.Text>아이디를 입력해주세요.</Style.Text>
          ) : null}
        </Style.InputContainer>
        <Style.InputContainer>
          <Style.Label isAllowed={allows.pw}>비밀번호</Style.Label>
          <Style.Form>
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
            <Style.Text>비밀번호를 입력해주세요.</Style.Text>
          ) : null}
        </Style.InputContainer>

        <Style.SubmitBtn isPassed={allowAll} onClick={clickToSubmit}>
          로그인
        </Style.SubmitBtn>
        <Style.SignUpLink onClick={goToSignUp}>
          아직 회원이 아니시라면
        </Style.SignUpLink>
      </Style.Container>
    </>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import userInfoStore from "../../store/userInfoStore";
import axios from "axios";

const Login = ({ isAuthenticated }) => {
  window.history.forward();
  const { setNickName, setUserId } = userInfoStore();

  const [inputs, setInputs] = useState({
    id: null,
    pw: null,
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

  return (
    <div className={styles.container}>
      {showModal && (
        <div className={styles.modal}>
          <div>아이디 혹은 비밀번호가 일치하지 않습니다.</div>
          <div>다시 입력해주세요.</div>
        </div>
      )}
      <div className={styles.title} onClick={goToMainPage}>
        Yun's Shoes Shop
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allows.id === null
              ? styles.inputTitleID
              : allows.id === false
              ? styles.inputTitleIDNotAllowed
              : styles.inputTitleID
          }
        >
          아이디
        </label>
        <input
          type="text"
          onChange={(e) => changeInput(e, "id")}
          placeholder="6-20자의 영문,숫자를 입력해주세요"
          value={inputs.id}
          className={
            allows.id === null
              ? styles.inputValue
              : allows.id === false
              ? styles.inputValueNotAllowed
              : styles.inputValue
          }
        ></input>
        {allows.id === false ? (
          <div className={styles.text}>
            양식에 준수하여 아이디를 입력해주세요.
          </div>
        ) : null}
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allows.pw === null
              ? styles.inputTitlePW
              : allows.pw === false
              ? styles.inputTitlePWNotAllowed
              : styles.inputTitlePW
          }
        >
          비밀번호
        </label>
        <input
          type="password"
          onChange={(e) => changeInput(e, "pw")}
          placeholder="영문,숫자,특수문자를 각각 최소 한 개씩 포함하여 8-16자"
          value={inputs.pw}
          className={
            allows.pw === null
              ? styles.inputValue
              : allows.pw === false
              ? styles.inputValueNotAllowed
              : styles.inputValue
          }
        ></input>
        {allows.pw === false ? (
          <div className={styles.text}>
            양식에 준수하여 비밀번호를 입력해주세요.
          </div>
        ) : null}
      </div>

      <div
        className={
          allowAll === false ? styles.submitBtn : styles.submitBtnAllowed
        }
        onClick={clickToSubmit}
      >
        로그인하기
      </div>
      <div className={styles.signUpLink} onClick={goToSignUp}>
        아직 회원이 아니시라면
      </div>
    </div>
  );
};

export default Login;

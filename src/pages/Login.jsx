import React, { useState, useEffect } from "react";
import styles from "../pages/css/Login.module.css";
import useStore from "../store";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { user, setNickName, setUserId } = useStore();
  const [id, setID] = useState(null);
  const [pw, setPW] = useState(null);
  const [allowID, setAllowID] = useState(true);
  const [allowPW, setAllowPW] = useState(true);
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
        userId: id,
        password: pw,
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
      case "ID":
        regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (!regex.test(e.target.value)) {
          setAllowID(false);
          setAllowAll(false);
        } else {
          setAllowID(true);
        }
        setID(e.target.value);
        break;
      case "PW":
        regex =
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if (!regex.test(e.target.value)) {
          setAllowPW(false);
          setAllowAll(false);
        } else {
          setAllowPW(true);
          setAllowAll(true);
        }
        setPW(e.target.value);
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
  useEffect(() => {
    if (result === true) {
      navigate("/");
    } else if (result === false) {
      setShowModal((prev) => !prev);
      setTimeout(setShowModal, 2000);
      setResult(null);
    }
  }, [result, count]);
  return (
    <div className={styles.container}>
      {showModal && (
        <div className={styles.modal}>
          <div>아이디 혹은 비밀번호가 일치하지 않습니다.</div>
          <div>다시 입력해주세요.</div>
        </div>
      )}
      <div className={styles.title}>Yun's Shoes Shop</div>
      <div className={styles.inputContainer}>
        <label
          className={
            allowID === true
              ? styles.inputTitleID
              : styles.inputTitleIDNotAllowed
          }
        >
          아이디
        </label>
        <input
          type="text"
          onChange={(e) => changeInput(e, "ID")}
          placeholder="6-20자의 영문,숫자를 입력해주세요"
          value={id}
          className={
            allowID === true ? styles.inputValue : styles.inputValueNotAllowed
          }
        ></input>
        {!allowID && (
          <div className={styles.text}>
            양식에 준수하여 아이디를 입력해주세요.
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allowPW === true
              ? styles.inputTitlePW
              : styles.inputTitlePWNotAllowed
          }
        >
          비밀번호
        </label>
        <input
          type="password"
          onChange={(e) => changeInput(e, "PW")}
          placeholder="영문,숫자,특수문자를 각각 최소 한 개씩 포함하여 8-16자"
          value={pw}
          className={styles.inputValue}
        ></input>
        {!allowPW && (
          <div className={styles.text}>
            양식에 준수하여 비밀번호를 입력해주세요.
          </div>
        )}
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

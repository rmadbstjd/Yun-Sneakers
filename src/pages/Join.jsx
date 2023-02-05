import React, { useState, useEffect } from "react";
import styles from "../pages/css/Join.module.css";
import useStore from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginSuccess from "../hooks/loginSuccess";
import { set } from "firebase/database";
const Join = () => {
  const { user, setNickName, setUserId } = useStore();
  const [id, setID] = useState(null);
  const [pw, setPW] = useState(null);
  const [rePw, setRePW] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [allowID, setAllowID] = useState(null);
  const [allowPW, setAllowPW] = useState(null);
  const [allowREPW, setAllowREPW] = useState(null);
  const [allowNick, setAllowNick] = useState(null);
  const [allowAll, setAllowAll] = useState(false);
  const [result, setResult] = useState();
  const navigate = useNavigate();
  let regex;
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
        }
        setPW(e.target.value);

        break;
      case "REPW":
        if (e.target.value !== pw) {
          setAllowREPW(false);
          setAllowAll(false);
        } else {
          setAllowREPW(true);
        }
        break;
      case "NICK":
        regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
        if (!regex.test(e.target.value)) {
          setAllowNick(false);
          setAllowAll(false);
        } else {
          setAllowNick(true);
        }
        setNickname(e.target.value);
      default:
        break;
    }
  };
  const clickToSubmit = async () => {
    if (allowAll) {
      const response = await user.signUp(id, pw, nickname);

      setResult(response);
    }
  };
  useEffect(() => {
    if (allowID && allowPW && allowREPW && allowNick) setAllowAll(true);
    if (allowAll) {
      if (!result) {
      }
      if (result) navigate("/login");
    }
  }, [result, navigate, allowAll, allowID, allowPW, allowREPW, allowNick]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>회원가입</div>
      <div className={styles.inputContainer}>
        <label
          className={
            allowID === null
              ? styles.inputTitleID
              : allowID === false
              ? styles.inputTitleIDNotAllowed
              : styles.inputTitleID
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
            allowID === null
              ? styles.inputValue
              : allowID === false
              ? styles.inputValueNotAllowed
              : styles.inputValue
          }
        ></input>
        {allowID === false ? (
          <div className={styles.text}>
            양식에 준수하여 아이디를 입력해주세요.
          </div>
        ) : null}
        {result === false ? (
          <div className={styles.text}>
            중복된 아이디입니다. 다시 입력해주세요.
          </div>
        ) : null}
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allowPW === null
              ? styles.inputTitlePW
              : allowPW === false
              ? styles.inputTitlePWNotAllowed
              : styles.inputTitlePW
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
        {allowPW === false ? (
          <div className={styles.text}>
            양식에 준수하여 비밀번호를 입력해주세요.
          </div>
        ) : null}
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allowREPW === null
              ? styles.inputTitlePW
              : allowPW === false
              ? styles.inputTitlePWNotAllowed
              : styles.inputTitlePW
          }
        >
          비밀번호
        </label>
        <input
          type="password"
          onChange={(e) => changeInput(e, "REPW")}
          placeholder="비밀번호를 다시 입력해주세요"
          value={rePw}
          className={styles.inputValue}
        ></input>
        {allowREPW === false ? (
          <div className={styles.text}>비밀번호가 일치하지 않습니다.</div>
        ) : null}
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allowNick === null
              ? styles.inputTitleNick
              : allowNick === false
              ? styles.inputTitleNickNotAllowed
              : styles.inputTitleNick
          }
        >
          닉네임
        </label>
        <input
          type="text"
          onChange={(e) => changeInput(e, "NICK")}
          placeholder="2~6 글자를 입력해주세요."
          value={nickname}
          className={
            allowNick === null
              ? styles.inputValue
              : allowNick === false
              ? styles.inputValueNotAllowed
              : styles.inputValue
          }
        ></input>
        {allowNick === false ? (
          <div className={styles.text}>
            양식에 준수하여 닉네임을 입력해주세요
          </div>
        ) : null}
      </div>
      <div
        className={
          allowAll === false ? styles.submitBtn : styles.submitBtnAllowed
        }
        onClick={clickToSubmit}
      >
        가입하기
      </div>
    </div>
  );
};

export default Join;

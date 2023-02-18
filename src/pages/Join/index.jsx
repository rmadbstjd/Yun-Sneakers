import React, { useState, useEffect, useReducer } from "react";
import styles from "./Join.module.css";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [result, setResult] = useState();
  const [isPassed, setIsPassed] = useState(false);
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
    all: false,
  });

  let regex;
  const changeInput = (e, type) => {
    switch (type) {
      case "id":
        regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (!regex.test(e.target.value)) {
          setAllows({ ...allows, [type]: false });
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
        } else {
          setAllows({ ...allows, [type]: true });
        }
        setInputs({ ...inputs, [type]: e.target.value });

        break;
      case "rePW":
        if (e.target.value !== inputs.pw) {
          setAllows({ ...allows, [type]: false });
        } else {
          setAllows({ ...allows, [type]: true });
        }
        break;
      case "nickname":
        regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
        if (!regex.test(e.target.value)) {
          setAllows({ ...allows, [type]: false });
        } else {
          setAllows({ ...allows, [type]: true });
        }
        setInputs({ ...inputs, [type]: e.target.value });
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
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
    if (isPassed) {
      if (!result) {
      }
      if (result) navigate("/login");
    }
  }, [result, navigate, allows, isPassed]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>회원가입</div>
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
        {result === false ? (
          <div className={styles.text}>
            중복된 아이디입니다. 다시 입력해주세요.
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
          className={styles.inputValue}
        ></input>
        {allows.pw === false ? (
          <div className={styles.text}>
            양식에 준수하여 비밀번호를 입력해주세요.
          </div>
        ) : null}
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allows.rePW === null
              ? styles.inputTitlePW
              : allows.PW === false
              ? styles.inputTitlePWNotAllowed
              : styles.inputTitlePW
          }
        >
          비밀번호
        </label>
        <input
          type="password"
          onChange={(e) => changeInput(e, "rePW")}
          placeholder="비밀번호를 다시 입력해주세요"
          value={inputs.rePw}
          className={styles.inputValue}
        ></input>
        {allows.rePW === false ? (
          <div className={styles.text}>비밀번호가 일치하지 않습니다.</div>
        ) : null}
      </div>
      <div className={styles.inputContainer}>
        <label
          className={
            allows.nickname === null
              ? styles.inputTitleNick
              : allows.nickname === false
              ? styles.inputTitleNickNotAllowed
              : styles.inputTitleNick
          }
        >
          닉네임
        </label>
        <input
          type="text"
          onChange={(e) => changeInput(e, "nickname")}
          placeholder="2~6 글자를 입력해주세요."
          value={inputs.nickname}
          className={
            allows.nickname === null
              ? styles.inputValue
              : allows.nickname === false
              ? styles.inputValueNotAllowed
              : styles.inputValue
          }
        ></input>
        {allows.nickname === false ? (
          <div className={styles.text}>
            양식에 준수하여 닉네임을 입력해주세요
          </div>
        ) : null}
      </div>
      <div
        className={
          isPassed === false ? styles.submitBtn : styles.submitBtnAllowed
        }
        onClick={clickToSubmit}
      >
        가입하기
      </div>
    </div>
  );
};

export default Join;

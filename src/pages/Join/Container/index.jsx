import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/user";
import { useTextInputs } from "../../../hooks/useInputs";
import UIJoinPage from "../UIJoinPage";
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
    <UIJoinPage
      allows={allows}
      handleChangeID={handleChangeID}
      id={id}
      result={result}
      handleChangePW={handleChangePW}
      pw={pw}
      handleChangeRePW={handleChangeRePW}
      rePw={rePw}
      handleChangeNickName={handleChangeNickName}
      nickName={nickName}
      isPassed={isPassed}
      clickToSubmit={clickToSubmit}
    />
  );
};

export default Join;

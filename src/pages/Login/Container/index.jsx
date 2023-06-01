import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTextInputs } from "../../../hooks/useInputs";
import userApi from "../../../api/user";
import { history } from "../../../utils/history";
import UILoginPage from "../UILoginPage";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });
  const { state: id, handleChange: setId } = useTextInputs("", 19);
  const { state: pw, handleChange: setPw } = useTextInputs("", 16);
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

  const handleChangeID = (e) => {
    regex = /^[A-za-z0-9]{5,19}$/g;
    if (!regex.test(e.target.value)) {
      setAllows({ ...allows, id: false });
      setIsPassed(false);
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
      setIsPassed(false);
    } else {
      setAllows({ ...allows, pw: true });
      setIsPassed(true);
    }
    setPw(e.target.value);
  };

  const clickToSubmit = async () => {
    if (isPassed) {
      const data = await userApi.login(id, pw);

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
    <UILoginPage
      showModal={showModal}
      goToMainPage={goToMainPage}
      allows={allows}
      handleChangeID={handleChangeID}
      handleKeyDown={handleKeyDown}
      id={id}
      handleSubmit={handleSubmit}
      handleChangePW={handleChangePW}
      pw={pw}
      isPassed={isPassed}
      clickToSubmit={clickToSubmit}
      goToSignUp={goToSignUp}
    />
  );
};

export default Login;

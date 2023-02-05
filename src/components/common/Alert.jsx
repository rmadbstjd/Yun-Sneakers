import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "./css/Alert.module.css";
const Alert = ({ onClick, btnText, message, state, time, role }) => {
  Swal.fire({
    title: `${message}`,
    icon: `${state}`,
    timer: `${time}`,
  });

  /*return (
    <button
      onClick={handleButtonClick}
      className={role === "payment" ? styles.payment : null}
    >
      {btnText}
    </button>
  );*/
};

export default Alert;

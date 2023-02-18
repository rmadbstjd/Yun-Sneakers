import React from "react";
import styles from "./Filter.module.css";
import { GrClose } from "react-icons/gr";
import FilterContent from "../FilterContent";
const Filter = ({ setHamburger, setShow }) => {
  const closeHamburger = () => {
    setHamburger(false);
    setShow(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbarContainer}>
        <div></div>
        <div className={styles.navbarTitle}>필터</div>
        <div className={styles.navabrClose} onClick={closeHamburger}>
          <GrClose className={styles.closeBtn} />
        </div>
      </div>

      <div>
        <FilterContent />
      </div>
      <div className={styles.footer} onClick={closeHamburger}>
        적용하기
      </div>
    </div>
  );
};

export default Filter;

import React, { useEffect, useState } from "react";
import styles from "./css/SizeMordal.module.css";
import useStore from "../store";
const SizeMordal = ({ setSizeShow, size }) => {
  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    setSizes(size.split(","));
  }, []);
  const { setSize } = useStore();
  const closeShow = () => {
    setSizeShow((prev) => !prev);
  };
  const clickSize = (item) => {
    setSize(item);
    setSizeShow((prev) => !prev);
  };

  return (
    <div className={styles.mordalBackground}>
      <div className={styles.mordal}>
        <div className={styles.sizeContainer}>
          <div className={styles.name}>Size</div>
          <div className={styles.sizeContainer}>
            {sizes &&
              sizes.map((item) => (
                <div
                  onClick={() => {
                    clickSize(item);
                  }}
                  className={styles.sizeBox}
                >
                  {item}
                </div>
              ))}
          </div>
        </div>

        <button className={styles.close} onClick={closeShow}>
          X
        </button>
      </div>
    </div>
  );
};

export default SizeMordal;

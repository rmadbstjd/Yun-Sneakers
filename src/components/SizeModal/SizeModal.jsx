/*import React, { useEffect, useState } from "react";
import styles from "./SizeModal.module.css";
import useStore from "../../store";
const SizeModal = ({ setSizeShow, size }) => {
  const [sizes, setSizes] = useState([]);
  const { setSize } = useStore();
  useEffect(() => {
    setSizes(size.split(","));
  }, []);

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

export default SizeModal;*/

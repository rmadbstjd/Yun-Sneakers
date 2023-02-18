import React from "react";
import styles from "./HeartModal.module.css";
const HeartModal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div>
          좋아요<span className={styles.heart}>♥</span>
        </div>
      </div>
    </div>
  );
};

export default HeartModal;

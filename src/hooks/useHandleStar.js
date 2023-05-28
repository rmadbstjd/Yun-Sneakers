import { useState } from "react";
import produce from "immer";
export const useHandleStar = () => {
  const [star, setStar] = useState([false, false, false, false, false]);
  const [clickIndex, setClickIndex] = useState();

  const clickToStar = (index) => {
    setClickIndex(index);
    if (clickIndex === index) {
      setStar(
        produce(star, (draft) => {
          for (let i = 0; i <= index; i++) {
            draft[i] = false;
          }
        })
      );
      setClickIndex("");
      return;
    }
    setStar(
      produce(star, (draft) => {
        for (let i = 0; i <= index; i++) {
          draft[i] = true;
        }
        for (let i = index + 1; i <= 4; i++) {
          draft[i] = false;
        }
      })
    );
  };
  return { star, setStar, clickIndex, setClickIndex, clickToStar };
};

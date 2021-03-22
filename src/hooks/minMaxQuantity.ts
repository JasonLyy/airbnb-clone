import { useState } from "react";

type useMinMaxQuantityType = [() => void, () => void, boolean, boolean, number];
export const useMinMaxQuantity = (
  min: number,
  max: number
): useMinMaxQuantityType => {
  const [quantity, setQuantity] = useState<number>(0);

  const incrementQuantity = () => {
    const notReachedMaxQuantity = quantity + 1 <= max;
    if (notReachedMaxQuantity) {
      setQuantity((val) => val + 1);
    }
  };

  const decrementQuantity = () => {
    const notReachedMinQuantity = quantity - 1 >= min;
    if (notReachedMinQuantity) {
      setQuantity((val) => val - 1);
    }
  };

  const reachedMinQuantity = min === quantity;
  const reachedMaxQuanity = max === quantity;

  return [
    decrementQuantity,
    incrementQuantity,
    reachedMinQuantity,
    reachedMaxQuanity,
    quantity,
  ];
};

import { useState } from "react";
import type { Product } from "../types/product/product";
import { getInitialDisplayImage } from "../utils/product";

const useProductDisplay = (product: Product) => {
  const initialImage = getInitialDisplayImage(product!);
  const [displayImage, setDisplayImage] = useState<string | undefined>(
    initialImage
  );

  const changeDisplayImage = (src?: string) => {
    if (src) setDisplayImage(src);
  };

  return { displayImage, changeDisplayImage };
};

export default useProductDisplay;

import "./ProductDetailsActions.css";

import type { Product } from "../../../types/product/product";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ProductFormData } from "../../../types/product/product-form-data";
import type { ProductColor } from "../../../types/product/product-color";
import ColorSelector from "../ColorSelector/ColorSelector";
import SizeSelector from "../SizeSelector/SizeSelector";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import Button from "../../atoms/Button/Button";
import useModal from "../../../context/Modal/useModal";
import useProductAvailability from "../../../hooks/useProductAvailability";
import { useValidatedAddToCart } from "../../../hooks/useValidatedAddToCart";

const ProductDetailsActions = ({ product }: { product: Product }) => {
  const { handleSubmit, watch, setValue } = useForm<ProductFormData>({
    defaultValues: {
      id: product._id,
      name: product.name,
      price: product.price,
      color: product.featuredColor,
      size: "L",
      quantity: 1
    }
  });

  const { openModal } = useModal();

  const selectedColor = watch("color");
  const selectedSize = watch("size");
  const selectedQuantity = watch("quantity") || 1;

  const { availableColors, availableSizes } = useProductAvailability(
    product,
    selectedColor,
    selectedSize
  );

  const { tryAddToCart, getStockInfo } = useValidatedAddToCart(product);

  const { finalStock } = getStockInfo(selectedColor, selectedSize);

  const handleAddToCart = (data: ProductFormData) => {
    tryAddToCart(data);
  };

  useEffect(() => {
    if (!availableColors.includes(selectedColor)) {
      setValue("color", availableColors[0]);
    }
  }, [availableColors, selectedColor, setValue]);

  useEffect(() => {
    if (!availableSizes.includes(selectedSize))
      setValue("size", availableSizes[0]);
  }, [selectedColor, availableSizes, selectedSize, setValue]);

  return (
    <form
      className="product-details-actions__form"
      onSubmit={handleSubmit(handleAddToCart)}
    >
      <div className="product-details-actions__selectors">
        <ColorSelector
          options={availableColors}
          selected={selectedColor}
          onSelect={(color: ProductColor) => setValue("color", color)}
        />
        <SizeSelector
          options={availableSizes}
          selected={selectedSize}
          onSelect={(size) => setValue("size", size)}
        />
        <QuantitySelector
          value={selectedQuantity}
          onIncrement={() => {
            if (selectedQuantity < finalStock) {
              setValue("quantity", selectedQuantity + 1);
            } else {
              openModal("info", "No hay más stock disponible.", "error");
            }
          }}
          disableIncrement={selectedQuantity >= finalStock}
          onDecrement={() =>
            setValue("quantity", Math.max(1, selectedQuantity - 1))
          }
          disableDecrement={selectedQuantity <= 1}
        />
        <Button type="submit" disabled={finalStock === 0}>
          Añadir a la cesta
        </Button>
      </div>
    </form>
  );
};

export default ProductDetailsActions;

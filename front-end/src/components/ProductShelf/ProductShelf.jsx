import ProductCard from "../ProductCard/ProductCard";
import "./product-shelf.css";
const ProductShelf = ({ products }) => {
  return (
    <div className="product-shelf">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductShelf;

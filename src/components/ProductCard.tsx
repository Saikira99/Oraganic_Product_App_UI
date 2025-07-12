import { Product } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => (
  <Link to={`/product/${product._id}`} className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.brand}</p>
  </Link>
);

export default ProductCard;

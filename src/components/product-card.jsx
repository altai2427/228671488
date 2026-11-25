import { ShoppingCart, Heart } from 'lucide-react';
import { useToggleFavorite } from '../store/favorites/toggle-favorite.js';
import { useAddToCart } from '../store/cart/cart-store.js';

export function ProductCard({ product }) {
  const { mutate, isPending } = useToggleFavorite();
  const { mutate: addToCart, isPending: isCartPending } = useAddToCart();

  const handleToggle = () => {
    if (!isPending) {
      mutate({
        isFavorite: product?.isFavorite,
        productId: product?._id || product?.id,
      });
    }
  };

  const handleAddToCart = () => {
    if (!isCartPending) {
      addToCart(product?._id || product?.id);
    }
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-md p-4">
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4">
        <img src={product?.image} alt={product?.name} className="w-full h-full object-cover mb-4" />
      </div>
      <h2 className="text-lg font-bold mb-2">{product?.name}</h2>
      <p className="text-gray-600 mb-4">{product?.description}</p>
      <p className="text-xl font-bold">${product?.price?.toFixed(2)}</p>

      <Heart
        onClick={handleToggle}
        className="text-red-500 cursor-pointer"
        color={product?.isFavorite ? 'red' : 'gray'}
        fill={product?.isFavorite ? 'red' : 'none'}
      />

      <button
        onClick={handleAddToCart}
        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300 flex items-center gap-2 cursor-pointer"
      >
        <ShoppingCart />
        <span>в корзину</span>
      </button>
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { cartService } from '../service/cart-service.js';
import { useUpdateCart, useRemoveFromCart, useClearCart } from '../store/cart/cart-store.js';
export function CartPage() {
  const { data, isLoading } = useQuery({
    ...cartService.getCartQueryOptions(),
  });

  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: clearCart } = useClearCart();

  const items = data?.items || data?.data?.items || data?.data || [];

  const totalPrice = items.reduce((sum, item) => {
    const product = item.product || item;
    return sum + (product.price || 0) * (item.quantity || 1);
  }, 0);

  if (isLoading) return <p>загрузка</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-500">Корзина</h1>
        {items.length > 0 && (
          <button onClick={() => clearCart()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
            Очистить корзину
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">Корзина пуста</p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const product = item.product || item;
            const productId = product._id || product.id || item.productId;
            const quantity = item.quantity || 1;

            return (
              <div key={productId} className="flex items-center justify-between bg-white ">
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h2 className="font-bold">{product.name}</h2>
                    <p className="text-gray-600">${product.price?.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => quantity > 1 ? updateCart({ productId, quantity: quantity - 1 }) : removeFromCart(productId)} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">-</button>
                  <span>{quantity}</span>
                  <button onClick={() => updateCart({ productId, quantity: quantity + 1 })} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">+</button>

                  <button onClick={() => removeFromCart(productId)} className="ml-4 text-red-500 hover:underline cursor-pointer">
                    Удалить
                  </button>
                </div>
              </div>
            );
          })}

          <div className="text-right text-xl font-bold mt-4">
            Итого: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

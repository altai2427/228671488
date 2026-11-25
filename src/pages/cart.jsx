import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cartService } from '../service/cart-service.js';
import { useUpdateCart, useRemoveFromCart, useClearCart } from '../store/cart/cart-store.js';
import { useCreateOrder } from '../store/orders/order-store.js';
export function CartPage() {
  const { data, isLoading } = useQuery({ ...cartService.getCartQueryOptions() });
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: clearCart } = useClearCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const items = data?.items || data?.data?.items || data?.data || [];

  const totalPrice = items.reduce((sum, item) => {
    const product = item.product || item;
    return sum + (product.price || 0) * (item.quantity || 1);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) {
      setError('ввведите адрес доставки');
      return;
    }

    const orderItems = items.map((item) => {
      const product = item.product || item;
      return { productId: product._id || product.id || item.productId, quantity: item.quantity || 1, price: product.price || item.price || 0 };
    });
    createOrder({ items: orderItems, deliveryAddress, comment });
  };

  if (isLoading) return <p>Загрузка</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-500">Корзина</h1>
        {items.length > 0 && <button onClick={() => clearCart()} className="bg-red-500 text-white px-4 py-2 cursor-pointer">Очистить корзину</button>}
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
                  <img src={product.image} alt={product.name} className="w-16 h-16 " />
                  <div>
                    <h2 className="font-bold">{product.name}</h2>
                    <p className="text-gray-600">${product.price?.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => quantity > 1 ? updateCart({ productId, quantity: quantity - 1 }) : removeFromCart(productId)} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">-</button>
                  <span>{quantity}</span>
                  <button onClick={() => updateCart({ productId, quantity: quantity + 1 })} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">+</button>
                  <button onClick={() => removeFromCart(productId)} className="ml-4 text-red-500 hover:underline cursor-pointer">Удалить</button>
                </div>
              </div>
            );
          })}

          <div className="text-right text-xl font-bold mt-4">Итого: ${totalPrice.toFixed(2)}</div>

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4 flex flex-col gap-3">
            <h2 className="text-xl font-bold">Оформление заказа</h2>

            <div>
              <input type="text" value={deliveryAddress} onChange={(e) => { setDeliveryAddress(e.target.value); setError(''); }} placeholder="Адрес доставки" className="border border-gray-300 rounded px-3 py-2 w-full" />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Комментарий к заказу" className="border border-gray-300 rounded px-3 py-2 w-full" />

            <button type="submit" disabled={!deliveryAddress.trim() || isPending} className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 disabled:bg-gray-400 cursor-pointer">
              {isPending ? 'отправка' : 'Оформить заказ'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

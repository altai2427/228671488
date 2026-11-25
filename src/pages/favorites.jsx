import { useQuery } from '@tanstack/react-query';
import { favoritesService } from '../service/favorites-service.js';
import { ProductCard } from '../components/product-card.jsx';

export default function FavoritesPage() {
  const { data, isLoading } = useQuery({
    ...favoritesService.getFavoritesQueryOptions(),
  });

  const favorites = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data?.items)
          ? data.data.items
          : [];

  if (isLoading) return <p>щагрузка</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-500 mb-6">Избранное</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">в избранном пока пусто</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {favorites.map((item) => {
            const product = item.product || item;
            return (
              <ProductCard
                key={product.id || product._id}
                product={{ ...product, isFavorite: true }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

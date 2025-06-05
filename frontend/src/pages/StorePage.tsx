import { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/store/items');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('API no disponible, usando datos mock', error);
    return [
      {
        id: 1,
        name: 'Proteína Whey',
        price: 29.99,
        category: 'suplements',
        image: 'https://m.media-amazon.com/images/I/71qjkdamFQL._AC_UF894,1000_QL80_.jpg',
      },
      {
        id: 2,
        name: 'Camiseta Gym',
        price: 19.99,
        category: 'clothing',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OtTh8JbQl_kNlagMXI3-wT1_yUmb6i8vcQ&s',
      },
    ];
  }
};

export default function StorePage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const subscriptions = [
    {
      id: 1,
      name: 'Plan Básico',
      price: 9.99,
      benefits: ['Acceso a máquinas', '1 clase semanal'],
    },
    {
      id: 2,
      name: 'Plan Premium',
      price: 19.99,
      benefits: ['Acceso ilimitado', '3 clases semanales'],
    },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  return (
    <div className="p-4 max-w-6xl mx-auto bg-white min-h-screen relative">
      {/* Botón carrito */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        🛒 Carrito ({cart.length})
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center text-black">Tienda</h1>

      {/* Productos */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-black">Productos</h2>
        {isLoading && <p className="text-black">Cargando productos...</p>}
        {error && <p className="text-red-600 text-black">{error}</p>}
        {!isLoading && !error && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  width: '150px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                  boxShadow: '0 2px 5px rgb(0 0 0 / 0.1)',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                />
                <h3 className="font-semibold text-black">{product.name}</h3>
                <p className="text-black">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  Añadir al carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Suscripciones */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black">Suscripciones</h2>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              style={{
                width: '250px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 2px 5px rgb(0 0 0 / 0.1)',
              }}
            >
              <h3 className="font-bold text-xl mb-1 text-black">{sub.name}</h3>
              <p className="text-lg mb-2 text-black">${sub.price}/mes</p>
              <ul className="mb-3 text-sm text-black">
                {sub.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-green-600">✔</span>
                    <span className="text-black">{benefit}</span>
                  </li>
                ))}
              </ul>
              <button
                style={{
                  width: '100%',
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Suscribirse
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Drawer del carrito */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 border-l border-gray-300 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">Tu carrito</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-red-500 font-bold text-lg">
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium text-black">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(index)} className="text-red-500 text-sm">
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <p className="font-bold text-black">Total: ${total}</p>
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

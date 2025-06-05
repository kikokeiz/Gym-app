import { useState } from 'react';

interface Subscription {
  id: number;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  benefits: string[];
}

export default function SubscriptionsPage() {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const subscriptions: Subscription[] = [
    {
      id: 1,
      name: 'Básico',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      benefits: ['Acceso básico', 'App móvil'],
    },
    {
      id: 2,
      name: 'Premium',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      benefits: ['Clases ilimitadas', 'Entrenador virtual'],
    },
  ];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Suscripciones</h1>
      
      {/* Toggle Yearly/Monthly */}
      <div className="flex justify-center mb-6 space-x-2">
        <button
          onClick={() => setIsYearly(false)}
          className={`px-4 py-2 rounded ${
            !isYearly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Mensual
        </button>
        <button
          onClick={() => setIsYearly(true)}
          className={`px-4 py-2 rounded ${
            isYearly ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Anual
        </button>
      </div>

      {/* Subscription Plans */}
      <div className="flex flex-wrap justify-center gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="border rounded-lg p-6 shadow-md w-72 flex flex-col"
          >
            <h2 className="text-xl font-bold mb-2">{sub.name}</h2>
            <p className="text-3xl font-semibold mb-4">
              ${isYearly ? sub.yearlyPrice : sub.monthlyPrice}
              <span className="text-sm text-gray-500 ml-1">
                /{isYearly ? 'año' : 'mes'}
              </span>
            </p>
            <ul className="mb-6 space-y-1">
              {sub.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="mr-2 text-green-600 font-bold">✓</span> {benefit}
                </li>
              ))}
            </ul>
            <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Elegir Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

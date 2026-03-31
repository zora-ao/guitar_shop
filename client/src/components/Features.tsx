import { Truck, RotateCcw, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: <Truck size={24} />, title: 'Fast Shipping', desc: 'Lorem ipsum dolor' },
    { icon: <RotateCcw size={24} />, title: 'Money Cashback', desc: 'Lorem ipsum dolor' },
    { icon: <Truck size={24} />, title: 'Fast Shipping', desc: 'Lorem ipsum dolor' },
    { icon: <Headphones size={24} />, title: '24/7 Support', desc: 'Lorem ipsum dolor' },
  ];

  return (
    <section className="px-6 md:px-12 py-10 bg-[#FDFCFA]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#EFEFEF] p-5 rounded-lg flex items-center gap-4">
            <div className="text-stone-800">{feature.icon}</div>
            <div>
              <h4 className="font-bold text-sm text-stone-900">{feature.title}</h4>
              <p className="text-xs text-stone-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
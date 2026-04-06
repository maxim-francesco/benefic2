import { Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface CarProps {
  id: number | string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: string;
  price: number;
  monthly?: number;
  badge?: string;
  image?: string;
}

export function CarCard({ car, index }: { car: CarProps; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/masini/${car.id}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-navy-100 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-800/10 transition-all duration-[350ms] ease-out hover:-translate-y-2 cursor-pointer h-full">
        {/* Image container cu aspect 4:3 */}
        <div className="relative aspect-[4/3] bg-navy-50 overflow-hidden">
          {car.image ? (
            <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
          ) : (
            <div className="w-full h-full bg-navy-100/40 flex items-center justify-center group-hover:scale-105 group-hover:brightness-[1.02] transition-all duration-500">
              <Car size={48} className="text-navy-300 drop-shadow-sm" />
            </div>
          )}
        
        {car.badge && (
          <div className="absolute top-4 left-4 bg-mauve-600 text-white font-display font-medium text-[0.7rem] px-3 py-1 rounded-full tracking-wider z-10 shadow-sm">
            {car.badge}
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-navy-800 text-[1.1rem] leading-snug">
          {car.brand} {car.model}
        </h3>
        
        <div className="font-body text-navy-500 text-[0.8rem] mt-[0.35rem] mb-2">
          {car.year} &middot; {car.km.toLocaleString('ro-RO')} km &middot; {car.fuel}
        </div>
        
        <div className="h-px bg-navy-100 my-3" />
        
        <div className="mt-auto pt-1 flex flex-col">
          <div className="font-display font-bold text-navy-800 text-[1.3rem] leading-none">
            {car.price.toLocaleString('ro-RO')} &euro;
          </div>
          {car.monthly && (
            <div className="font-body text-mauve-600 text-[0.8rem] mt-1 font-medium">
              sau de la {car.monthly}&euro;/lună
            </div>
          )}
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

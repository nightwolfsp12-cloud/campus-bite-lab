import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  CreditCard, 
  MenuIcon, 
  Clock, 
  MapPin, 
  Star, 
  Settings, 
  ChefHat, 
  Gift 
} from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Digital Payments',
    description: '₹/UPI/Wallet payments with instant transactions',
    color: 'text-primary'
  },
  {
    icon: MenuIcon,
    title: 'Menu + Daily Specials',
    description: 'Fresh vegetarian meals updated daily with seasonal specials',
    color: 'text-secondary'
  },
  {
    icon: Clock,
    title: 'Order Scheduling',
    description: 'Pre-order your meals and skip the queue',
    color: 'text-accent'
  },
  {
    icon: MapPin,
    title: 'Live Tracking',
    description: 'Real-time order tracking from kitchen to pickup',
    color: 'text-success'
  },
  {
    icon: Star,
    title: 'Feedback & Ratings',
    description: 'Rate your meals and help improve our service',
    color: 'text-warning'
  },
  {
    icon: Settings,
    title: 'Admin Dashboard',
    description: 'Complete management system for staff and operations',
    color: 'text-primary'
  },
  {
    icon: ChefHat,
    title: "Today's Special Dish",
    description: 'Chef-curated vegetarian specials made fresh daily',
    color: 'text-secondary'
  },
  {
    icon: Gift,
    title: "Today's Special Offer",
    description: 'Exclusive deals and discounts for students',
    color: 'text-accent'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Everything You Need</span>
            <br />
            <span className="text-white">For Campus Dining</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive food ordering platform designed specifically for student life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ 
                y: -15,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              className="will-change-transform"
            >
              <Card className="glass-card p-8 h-full hover:border-white/60 hover:shadow-2xl transition-all duration-500 group border-2 border-white/20 bg-white/5 backdrop-blur-xl">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-6 group-hover:scale-125 shadow-lg`}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color} drop-shadow-sm`} strokeWidth={2.5} />
                </motion.div>
                
                <h3 className="text-xl font-bold mb-4 text-white tracking-tight leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-base text-white/80 leading-relaxed font-medium">
                  {feature.description}
                </p>
                
                {/* Enhanced animated bottom border */}
                <motion.div
                  className="h-1.5 bg-gradient-secondary rounded-full mt-6 transform scale-x-0 origin-left shadow-sm"
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
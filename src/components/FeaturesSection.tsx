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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive food ordering platform designed specifically for student life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <Card className="glass-card p-6 h-full hover:border-white/40 transition-all duration-500 group">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110`}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </motion.div>
                
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Animated bottom border */}
                <motion.div
                  className="h-1 bg-gradient-secondary rounded-full mt-4 transform scale-x-0 origin-left"
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
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
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Smartphone, Users, TrendingUp, Wallet, PhoneCall } from 'lucide-react';
import heroFoodTray from '@/assets/hero-food-tray.jpg';
import FeaturesSection from './FeaturesSection';

interface HeroSectionProps {
  onStudentClick: () => void;
  onAdminClick: () => void;
}

export default function HeroSection({ onStudentClick, onAdminClick }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const y3 = useTransform(scrollY, [0, 300], [0, -25]);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        {/* Enhanced Floating Background Elements with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            style={{ y: y3 }}
            className="absolute top-1/2 left-10 w-24 h-24 bg-accent/30 rounded-full blur-xl"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          {/* Additional 3D animated elements */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-1/4 right-1/3 w-16 h-16"
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 180, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Smartphone className="w-full h-full text-primary/40" />
          </motion.div>
          
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-1/3 left-1/4 w-20 h-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Wallet className="w-full h-full text-secondary/40" />
          </motion.div>
        </div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          className="text-center lg:text-left space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="gradient-text">Campus Food</span>
            <br />
            <span className="text-white">Ordering Made</span>
            <br />
            <span className="text-secondary">Faster.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Skip the lines, customize your meals, and track orders in real-time. 
            The smartest way to fuel your campus life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              onClick={onStudentClick}
              className="bg-primary hover:bg-primary-glow text-primary-foreground btn-interactive pulse-glow text-lg px-8 py-6 rounded-2xl"
            >
              <Smartphone className="mr-2 h-6 w-6" />
              Student App
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onAdminClick}
              className="border-2 border-white/30 text-white hover:bg-white/10 btn-interactive text-lg px-8 py-6 rounded-2xl backdrop-blur-sm"
            >
              <Users className="mr-2 h-6 w-6" />
              Admin Dashboard
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">2.5x</div>
              <div className="text-sm text-muted-foreground">Faster Orders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">95%</div>
              <div className="text-sm text-muted-foreground">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">30min</div>
              <div className="text-sm text-muted-foreground">Avg Wait Time</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Food Tray */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={heroFoodTray}
              alt="Modern campus food tray with healthy meals"
              className="w-full max-w-lg h-auto float drop-shadow-2xl"
            />
            
            {/* Floating UI Elements */}
            <motion.div
              className="absolute -top-4 -left-4 glass-card p-3 rounded-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span>Order Ready!</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 glass-card p-3 rounded-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span>85% Faster</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Features Section */}
    <FeaturesSection />
    </>
  );
}
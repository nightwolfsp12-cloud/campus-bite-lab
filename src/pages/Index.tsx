import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import StudentApp from '@/components/StudentApp';
import AdminDashboard from '@/components/AdminDashboard';

type View = 'hero' | 'student' | 'admin';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('hero');

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection 
              onStudentClick={() => setCurrentView('student')}
              onAdminClick={() => setCurrentView('admin')}
            />
          </motion.div>
        )}
        
        {currentView === 'student' && (
          <motion.div
            key="student"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <StudentApp onBack={() => setCurrentView('hero')} />
          </motion.div>
        )}
        
        {currentView === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <AdminDashboard onBack={() => setCurrentView('hero')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

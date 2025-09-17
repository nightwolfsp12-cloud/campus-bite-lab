import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HeroSection 
        onStudentClick={() => navigate('/student')}
        onAdminClick={() => navigate('/admin')}
      />
      <FeaturesSection />
    </div>
  );
};

export default Index;

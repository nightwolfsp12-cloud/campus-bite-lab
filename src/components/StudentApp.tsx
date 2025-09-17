import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Clock, 
  Star, 
  CreditCard, 
  Wallet,
  CheckCircle,
  Gift,
  Bell
} from 'lucide-react';

interface StudentAppProps {
  onBack: () => void;
}

type Screen = 'menu' | 'customize' | 'schedule' | 'payment' | 'tracking' | 'rewards';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  image: string;
  isSpecial?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Chicken Bowl',
    price: 12.99,
    rating: 4.8,
    description: 'Healthy grilled chicken with quinoa and vegetables',
    category: 'Mains',
    image: '🍗',
    isSpecial: true
  },
  {
    id: '2',
    name: 'Veggie Buddha Bowl',
    price: 10.99,
    rating: 4.6,
    description: 'Fresh vegetables with tahini dressing',
    category: 'Healthy',
    image: '🥗'
  },
  {
    id: '3',
    name: 'BBQ Burger Combo',
    price: 14.99,
    rating: 4.7,
    description: 'Juicy beef burger with fries and drink',
    category: 'Burgers',
    image: '🍔'
  },
  {
    id: '4',
    name: 'Margherita Pizza Slice',
    price: 8.99,
    rating: 4.5,
    description: 'Fresh mozzarella and basil',
    category: 'Pizza',
    image: '🍕'
  }
];

export default function StudentApp({ onBack }: StudentAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTime, setSelectedTime] = useState('12:30 PM');
  const [orderProgress, setOrderProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const scheduleOptions = [
    '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'
  ];

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
    setCurrentScreen('customize');
  };

  const handleStartTracking = () => {
    setCurrentScreen('tracking');
    // Simulate order progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setOrderProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setShowNotification(true), 1000);
      }
    }, 1500);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold gradient-text">Today's Menu</h2>
              <p className="text-muted-foreground">Fresh meals made daily</p>
            </div>

            <div className="grid gap-4">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="glass-card p-4 cursor-pointer hover:border-primary/50 transition-all"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          {item.isSpecial && (
                            <Badge className="bg-secondary text-secondary-foreground">
                              Special
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                          <span className="text-xl font-bold text-primary">
                            ${item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'customize':
        if (!selectedItem) return null;
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2">{selectedItem.image}</div>
              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
              <p className="text-muted-foreground">{selectedItem.description}</p>
            </div>

            <Card className="glass-card p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-8 w-8 p-0 border-white/30"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 p-0 border-white/30"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-medium">Add-ons</span>
                  {['Extra Cheese (+$1.50)', 'Avocado (+$2.00)', 'Bacon (+$2.50)'].map((addon) => (
                    <div key={addon} className="flex items-center justify-between p-2 rounded-lg border border-white/20">
                      <span className="text-sm">{addon}</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${(selectedItem.price * quantity).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary-glow btn-interactive"
                  onClick={() => setCurrentScreen('schedule')}
                >
                  Continue to Scheduling
                </Button>
              </div>
            </Card>
          </motion.div>
        );

      case 'schedule':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <Clock className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Choose Pickup Time</h2>
              <p className="text-muted-foreground">When would you like to collect your order?</p>
            </div>

            <Card className="glass-card p-6">
              <div className="grid grid-cols-2 gap-3">
                {scheduleOptions.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`h-12 ${selectedTime === time 
                      ? 'bg-primary hover:bg-primary-glow' 
                      : 'border-white/30 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-accent/20 border border-accent/30">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Estimated prep time: 15-20 minutes</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-primary hover:bg-primary-glow btn-interactive"
                onClick={() => setCurrentScreen('payment')}
              >
                Proceed to Payment
              </Button>
            </Card>
          </motion.div>
        );

      case 'payment':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <CreditCard className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Payment</h2>
              <p className="text-muted-foreground">Choose your payment method</p>
            </div>

            <Card className="glass-card p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border border-white/20 bg-primary/10">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-medium">Campus Wallet</div>
                      <div className="text-sm text-muted-foreground">Balance: $45.80</div>
                    </div>
                  </div>
                  <input type="radio" name="payment" defaultChecked className="text-primary" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-white/20">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6" />
                    <div>
                      <div className="font-medium">UPI Payment</div>
                      <div className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</div>
                    </div>
                  </div>
                  <input type="radio" name="payment" />
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${selectedItem ? (selectedItem.price * quantity).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>$0.99</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-white/20 pt-2">
                    <span>Total</span>
                    <span className="text-primary">
                      ${selectedItem ? (selectedItem.price * quantity + 0.99).toFixed(2) : '0.99'}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary-glow btn-interactive"
                onClick={handleStartTracking}
              >
                Place Order
              </Button>
            </Card>
          </motion.div>
        );

      case 'tracking':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <CheckCircle className="w-12 h-12 text-success mx-auto" />
              <h2 className="text-2xl font-bold">Order Confirmed!</h2>
              <p className="text-muted-foreground">Order #AB123 • Pickup at {selectedTime}</p>
            </div>

            <Card className="glass-card p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Order Progress</span>
                    <span className="text-sm text-muted-foreground">{orderProgress}%</span>
                  </div>
                  <Progress value={orderProgress} className="h-3" />
                </div>

                <div className="space-y-4">
                  {[
                    { status: 'Order Received', completed: orderProgress >= 20 },
                    { status: 'Preparing', completed: orderProgress >= 40 },
                    { status: 'Cooking', completed: orderProgress >= 60 },
                    { status: 'Quality Check', completed: orderProgress >= 80 },
                    { status: 'Ready for Pickup', completed: orderProgress >= 100 }
                  ].map((step, index) => (
                    <div key={step.status} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? 'bg-success' : 'bg-muted'
                      } transition-colors`} />
                      <span className={step.completed ? 'text-success font-medium' : 'text-muted-foreground'}>
                        {step.status}
                      </span>
                    </div>
                  ))}
                </div>

                {orderProgress >= 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center p-4 bg-success/20 rounded-lg border border-success/30"
                  >
                    <div className="text-success font-bold text-lg">🎉 Your order is ready!</div>
                    <div className="text-sm text-success/80 mt-1">
                      Head to counter #3 to collect your meal
                    </div>
                  </motion.div>
                )}

                <Button 
                  variant="outline"
                  className="w-full border-white/30 hover:bg-white/10"
                  onClick={() => setCurrentScreen('rewards')}
                >
                  <Gift className="mr-2 h-4 w-4" />
                  View Rewards
                </Button>
              </div>
            </Card>

            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="fixed bottom-4 left-4 right-4 glass-card p-4 border border-success/50"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-success animate-pulse" />
                    <div>
                      <div className="font-medium text-success">Order Ready!</div>
                      <div className="text-sm text-muted-foreground">
                        Your {selectedItem?.name} is waiting at counter #3
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'rewards':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <Gift className="w-12 h-12 text-secondary mx-auto" />
              <h2 className="text-2xl font-bold gradient-text">Loyalty Rewards</h2>
              <p className="text-muted-foreground">Earn points with every order</p>
            </div>

            <Card className="glass-card p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">847</div>
                  <div className="text-muted-foreground">Points Available</div>
                  <Progress value={65} className="mt-4 h-2" />
                  <div className="text-sm text-muted-foreground mt-2">
                    153 points to next reward
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    { reward: 'Free Drink', points: 200, available: true },
                    { reward: 'Free Side', points: 400, available: true },
                    { reward: 'Free Main', points: 800, available: true },
                    { reward: '20% Off', points: 1000, available: false }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.available ? 'border-primary/50 bg-primary/10' : 'border-white/20'
                    }`}>
                      <span className="font-medium">{item.reward}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold">{item.points} pts</div>
                        {item.available && (
                          <Badge variant="outline" className="text-xs border-primary text-primary">
                            Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary relative">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={currentScreen === 'menu' ? onBack : () => {
              if (currentScreen === 'customize') setCurrentScreen('menu');
              else if (currentScreen === 'schedule') setCurrentScreen('customize');
              else if (currentScreen === 'payment') setCurrentScreen('schedule');
              else if (currentScreen === 'tracking') setCurrentScreen('payment');
              else if (currentScreen === 'rewards') setCurrentScreen('tracking');
            }}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-bold">CampusEats</h1>
          <div className="w-16" /> {/* Spacer */}
        </motion.div>

        <motion.div
          key={currentScreen}
          className="max-w-md mx-auto"
        >
          {renderScreen()}
        </motion.div>
      </div>
    </div>
  );
}
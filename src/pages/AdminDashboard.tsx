import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Package,
  AlertTriangle,
  Plus,
  Edit,
  BarChart3,
  CheckCircle,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Screen = 'overview' | 'orders' | 'analytics' | 'menu' | 'inventory';

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  time: string;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  lowStock: boolean;
}

const mockOrders: Order[] = [
  { id: '#AB123', customer: 'Sarah M.', items: 'Paneer Butter Masala Bowl', total: 190, status: 'preparing', time: '12:35' },
  { id: '#AB124', customer: 'John D.', items: 'Aloo Tikki Burger Combo', total: 170, status: 'pending', time: '12:37' },
  { id: '#AB125', customer: 'Emma R.', items: 'Veggie Buddha Bowl', total: 150, status: 'ready', time: '12:30' },
  { id: '#AB126', customer: 'Mike T.', items: 'Dal Makhani Thali', total: 210, status: 'completed', time: '12:25' },
  { id: '#AB127', customer: 'Lisa K.', items: 'Chole Bhature (Special Offer)', total: 110, status: 'pending', time: '12:40' }
];

const mockMenuItems: MenuItem[] = [
  { id: '1', name: 'Paneer Butter Masala Bowl', category: 'Mains', price: 180, stock: 25, lowStock: false },
  { id: '2', name: 'Veggie Buddha Bowl', category: 'Healthy', price: 140, stock: 8, lowStock: true },
  { id: '3', name: 'Aloo Tikki Burger Combo', category: 'Burgers', price: 160, stock: 15, lowStock: false },
  { id: '4', name: 'Dal Makhani Thali', category: 'Thali', price: 200, stock: 12, lowStock: false },
  { id: '5', name: 'Chole Bhature', category: 'Street Food', price: 100, stock: 3, lowStock: true },
  { id: '6', name: 'Margherita Pizza', category: 'Pizza', price: 120, stock: 5, lowStock: true }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<Screen>('overview');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [newItem, setNewItem] = useState({ name: '', category: '', price: '' });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const addMenuItem = () => {
    if (newItem.name && newItem.category && newItem.price) {
      const item: MenuItem = {
        id: (menuItems.length + 1).toString(),
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price),
        stock: 20,
        lowStock: false
      };
      setMenuItems([...menuItems, item]);
      setNewItem({ name: '', category: '', price: '' });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'preparing': return 'bg-accent text-accent-foreground';
      case 'ready': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Active Orders', value: '12', icon: Clock, color: 'text-primary' },
                { title: 'Daily Revenue', value: '₹8,240', icon: DollarSign, color: 'text-success' },
                { title: 'Customers', value: '89', icon: Users, color: 'text-accent' },
                { title: 'Avg Time', value: '18min', icon: TrendingUp, color: 'text-secondary' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentScreen('orders')}
                  className="border-white/30 hover:bg-white/10"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border border-white/20">
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-muted-foreground">{order.customer} • {order.items}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₹{order.total}</div>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="glass-card h-20 flex flex-col gap-2 bg-primary/20 hover:bg-primary/30 border-primary/50"
                onClick={() => setCurrentScreen('orders')}
              >
                <Package className="h-6 w-6" />
                Manage Orders
              </Button>
              <Button 
                className="glass-card h-20 flex flex-col gap-2 bg-accent/20 hover:bg-accent/30 border-accent/50"
                onClick={() => setCurrentScreen('analytics')}
              >
                <BarChart3 className="h-6 w-6" />
                View Analytics
              </Button>
            </div>
          </motion.div>
        );

      case 'orders':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <Badge className="bg-primary/20 text-primary">
                {orders.filter(o => o.status !== 'completed').length} Active
              </Badge>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="glass-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-lg">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.customer} • {order.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-primary">₹{order.total}</div>
                        <Badge className={`${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4 p-3 rounded-lg bg-white/5">
                      <div className="font-medium">{order.items}</div>
                    </div>

                    {order.status !== 'completed' && (
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="bg-accent hover:bg-accent/80"
                          >
                            Start Preparing
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="bg-success hover:bg-success/80"
                          >
                            Mark Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="bg-primary hover:bg-primary/80"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'analytics':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold gradient-text">Analytics Dashboard</h2>

            {/* Peak Hours Chart */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Busy Hours Today</h3>
              <div className="space-y-3">
                {[
                  { hour: '11:00 AM', orders: 45, percentage: 70 },
                  { hour: '12:00 PM', orders: 78, percentage: 100 },
                  { hour: '01:00 PM', orders: 62, percentage: 85 },
                  { hour: '02:00 PM', orders: 34, percentage: 50 },
                  { hour: '03:00 PM', orders: 28, percentage: 40 }
                ].map((data) => (
                  <div key={data.hour} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{data.hour}</span>
                      <span className="font-medium">{data.orders} orders</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-secondary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${data.percentage}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Items */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Items Today</h3>
              <div className="space-y-3">
                {[
                  { name: 'Dal Makhani Thali', sales: 32, revenue: 6400 },
                  { name: 'Paneer Butter Masala Bowl', sales: 28, revenue: 5040 },
                  { name: 'Aloo Tikki Burger Combo', sales: 22, revenue: 3520 },
                  { name: 'Chole Bhature (Special)', sales: 18, revenue: 1980 }
                ].map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg border border-white/20">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.sales} orders</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">₹{item.revenue}</div>
                      <Badge className="text-xs bg-success/20 text-success">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        );

      case 'menu':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Menu Management</h2>
              <Badge className="bg-warning/20 text-warning">
                {menuItems.filter(item => item.lowStock).length} Low Stock
              </Badge>
            </div>

            {/* Add New Item */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Add New Vegetarian Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  placeholder="Item name (e.g. Palak Paneer)"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="bg-white/10 border-white/30"
                />
                <Input
                  placeholder="Category (e.g. Mains)"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="bg-white/10 border-white/30"
                />
                <Input
                  placeholder="Price (₹)"
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="bg-white/10 border-white/30"
                />
              </div>
              <Button 
                onClick={addMenuItem}
                className="bg-primary hover:bg-primary-glow"
                disabled={!newItem.name || !newItem.category || !newItem.price}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vegetarian Item
              </Button>
            </Card>

            {/* Menu Items List */}
            <div className="space-y-4">
              {menuItems.map((item) => (
                <Card key={item.id} className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        {item.lowStock && (
                          <Badge className="bg-warning/20 text-warning border-warning/50">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Category: {item.category}</span>
                        <span>Stock: {item.stock}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary mb-2">₹{item.price}</div>
                      <Button size="sm" variant="outline" className="border-white/30 hover:bg-white/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
            onClick={currentScreen === 'overview' ? () => navigate('/') : () => setCurrentScreen('overview')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {currentScreen === 'overview' ? 'Home' : 'Overview'}
          </Button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <Home className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-6 overflow-x-auto"
        >
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'orders', label: 'Orders', icon: Package },
            { key: 'analytics', label: 'Analytics', icon: TrendingUp },
            { key: 'menu', label: 'Menu', icon: Edit }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={currentScreen === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentScreen(tab.key as Screen)}
              className={currentScreen === tab.key 
                ? 'bg-primary hover:bg-primary-glow' 
                : 'border-white/30 hover:bg-white/10'
              }
            >
              <tab.icon className="w-4 h-4 mr-1" />
              {tab.label}
            </Button>
          ))}
        </motion.div>

        {renderScreen()}
      </div>
    </div>
  );
}
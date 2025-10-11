import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Plus,
  Users,
  IndianRupee,
  TrendingUp,
  Home,
  Phone,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Mock owner data
const ownerData = {
  name: "Rajesh Kumar",
  totalPGs: 2,
  totalRooms: 24,
  occupiedRooms: 18,
  totalRevenue: 178500,
  pendingPayments: 3
};

const mockPGs = [
  {
    id: 1,
    name: "Green Valley PG",
    location: "Jayanagar, Bangalore",
    floors: 3,
    totalRooms: 12,
    occupiedRooms: 9,
    revenue: 89250,
    pendingPayments: 2
  },
  {
    id: 2,
    name: "Sunrise Residency",
    location: "Koramangala, Bangalore",
    floors: 2,
    totalRooms: 12,
    occupiedRooms: 9,
    revenue: 89250,
    pendingPayments: 1
  }
];

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [pgs, setPgs] = useState(mockPGs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/pgs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          // Filter PGs owned by current user
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const ownerPGs = data.filter(pg => pg.owner_id === user.id);
          
          if (ownerPGs.length > 0) {
            setPgs(ownerPGs.map(pg => ({
              id: pg.id,
              name: pg.name,
              location: pg.address,
              floors: Math.ceil(pg.total_rooms / 4),
              totalRooms: pg.total_rooms,
              occupiedRooms: pg.total_rooms - pg.available_rooms,
              revenue: (pg.total_rooms - pg.available_rooms) * 8500, // Estimate
              pendingPayments: Math.floor(Math.random() * 3) // Mock for now
            })));
          }
        }
      } catch (error) {
        console.error('Error fetching PGs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerPGs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 backdrop-blur-lg bg-card/95">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 
              className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              PG<span className="text-primary">Connect</span>
            </h1>
            <Badge variant="secondary">Owner Dashboard</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={async () => {
                await logout();
                navigate('/');
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary">{ownerData.totalPGs}</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">{ownerData.totalRooms}</h3>
            <p className="text-sm text-muted-foreground">Total Rooms</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-success" />
              </div>
              <Badge className="bg-success">{Math.round((ownerData.occupiedRooms / ownerData.totalRooms) * 100)}%</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">{ownerData.occupiedRooms}/{ownerData.totalRooms}</h3>
            <p className="text-sm text-muted-foreground">Rooms Occupied</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-primary" />
              </div>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-1">₹{ownerData.totalRevenue.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-destructive/50">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <Badge variant="destructive">{ownerData.pendingPayments}</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">Pending Payments</h3>
            <p className="text-sm text-muted-foreground">Requires attention</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button size="lg" onClick={() => navigate('/owner/register-pg')}>
            <Plus className="h-5 w-5 mr-2" />
            Register New PG
          </Button>
          <Button size="lg" variant="outline">
            <Users className="h-5 w-5 mr-2" />
            View All Tenants
          </Button>
        </div>

        {/* PG List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">Your Properties</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pgs.map((pg) => (
              <Card 
                key={pg.id}
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/owner/pg/${pg.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {pg.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{pg.location}</p>
                  </div>
                  <Badge variant="outline">{pg.floors} Floors</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Occupancy</span>
                    </div>
                    <p className="text-lg font-bold">{pg.occupiedRooms}/{pg.totalRooms}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Revenue</span>
                    </div>
                    <p className="text-lg font-bold">₹{pg.revenue.toLocaleString()}</p>
                  </div>
                </div>

                {pg.pendingPayments > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">{pg.pendingPayments} Pending Payments</span>
                    </div>
                    <Button size="sm" variant="destructive">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/manage/pg/${pg.id}`);
                  }}
                >
                  View Dashboard
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

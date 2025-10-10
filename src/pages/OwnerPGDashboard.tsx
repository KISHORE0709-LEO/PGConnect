import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Building2,
  Users,
  IndianRupee,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  Search
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ActualBuildingVisualizer from "@/components/ActualBuildingVisualizer";

// Mock tenant data
const mockTenants = [
  {
    id: 1,
    name: "Amit Sharma",
    room: 301,
    floor: 3,
    phone: "+91 98765 43211",
    email: "amit@example.com",
    rentPaid: true,
    rentAmount: 8500,
    joinDate: "2024-08-15"
  },
  {
    id: 2,
    name: "Priya Patel",
    room: 302,
    floor: 3,
    phone: "+91 98765 43212",
    email: "priya@example.com",
    rentPaid: true,
    rentAmount: 8500,
    joinDate: "2024-09-01"
  },
  {
    id: 3,
    name: "Rahul Singh",
    room: 201,
    floor: 2,
    phone: "+91 98765 43213",
    email: "rahul@example.com",
    rentPaid: false,
    rentAmount: 8500,
    joinDate: "2024-07-20"
  },
  {
    id: 4,
    name: "Sneha Kumar",
    room: 202,
    floor: 2,
    phone: "+91 98765 43214",
    email: "sneha@example.com",
    rentPaid: true,
    rentAmount: 8500,
    joinDate: "2024-08-10"
  },
  {
    id: 5,
    name: "Vikram Reddy",
    room: 101,
    floor: 1,
    phone: "+91 98765 43215",
    email: "vikram@example.com",
    rentPaid: false,
    rentAmount: 8500,
    joinDate: "2024-09-15"
  }
];

const OwnerPGDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [pgData, setPgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPGData = async () => {
      try {
        const response = await fetch(`/api/pgs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPgData(data);
        } else {
          console.error('Failed to fetch PG data');
        }
      } catch (error) {
        console.error('Error fetching PG data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPGData();
    }
  }, [id]);

  // Sample building configuration from owner's setup
  const buildingConfig = [
    {
      id: "1",
      number: 1,
      rooms: [
        { id: "101", number: "101", sharing: 1, rent: 15000, isOccupied: false },
        { id: "102", number: "102", sharing: 1, rent: 15000, isOccupied: true },
        { id: "103", number: "103", sharing: 2, rent: 10000, isOccupied: false },
        { id: "104", number: "104", sharing: 2, rent: 10000, isOccupied: true }
      ]
    },
    {
      id: "2",
      number: 2,
      rooms: [
        { id: "201", number: "201", sharing: 4, rent: 7000, isOccupied: true },
        { id: "202", number: "202", sharing: 4, rent: 7000, isOccupied: false },
        { id: "203", number: "203", sharing: 2, rent: 9000, isOccupied: true }
      ]
    },
    {
      id: "3",
      number: 3,
      rooms: [
        { id: "301", number: "301", sharing: 1, rent: 12000, isOccupied: false },
        { id: "302", number: "302", sharing: 3, rent: 8000, isOccupied: true }
      ]
    }
  ];

  // Use real PG data or fallback to mock data
  const displayPgData = pgData || {
    name: "Green Valley PG",
    address: "Jayanagar, Bangalore",
    total_rooms: buildingConfig.reduce((sum, floor) => sum + floor.rooms.length, 0),
    available_rooms: buildingConfig.reduce((sum, floor) => 
      sum + floor.rooms.filter(room => !room.isOccupied).length, 0
    )
  };

  const occupiedRooms = displayPgData.total_rooms - displayPgData.available_rooms;
  const floors = Math.ceil(displayPgData.total_rooms / 4); // Estimate floors

  const pendingTenants = mockTenants.filter(t => !t.rentPaid);
  const paidTenants = mockTenants.filter(t => t.rentPaid);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading PG details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 backdrop-blur-lg bg-card/95">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">PG<span className="text-primary">Connect</span></h1>
            <Badge variant="secondary">Owner</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* PG Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{displayPgData.name}</h1>
              <p className="text-muted-foreground">{displayPgData.address}</p>
            </div>
            <Badge variant="outline" className="text-lg py-2 px-4">
              <Building2 className="h-5 w-5 mr-2" />
              {floors} Floors
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <Badge className="bg-success">{Math.round((occupiedRooms / displayPgData.total_rooms) * 100)}%</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">{occupiedRooms}/{displayPgData.total_rooms}</h3>
            <p className="text-sm text-muted-foreground">Rooms Occupied</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-1 text-success">{paidTenants.length}</h3>
            <p className="text-sm text-muted-foreground">Paid This Month</p>
          </Card>

          <Card className="p-6 border-destructive/50">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <Badge variant="destructive">{pendingTenants.length}</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1 text-destructive">{pendingTenants.length}</h3>
            <p className="text-sm text-muted-foreground">Pending Payments</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <IndianRupee className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-1">₹{(paidTenants.length * 8500).toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Collected</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Building Visualization */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Building Layout & Room Status</h2>
            <ActualBuildingVisualizer 
              floors={buildingConfig}
              onRoomClick={(floorId, roomId) => {
                const floor = buildingConfig.find(f => f.id === floorId);
                const room = floor?.rooms.find(r => r.id === roomId);
                if (room) {
                  toast.info(`Room ${room.number} - ${room.sharing}-sharing - ₹${room.rent}/month`);
                }
              }}
            />
          </div>

          {/* Tenants List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Tenant Management</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tenants..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Pending Payments */}
            {pendingTenants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-destructive flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Pending Payments ({pendingTenants.length})
                </h3>
                <div className="space-y-3">
                  {pendingTenants.map((tenant) => (
                    <Card key={tenant.id} className="p-4 border-destructive/50 bg-destructive/5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{tenant.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              Room {tenant.room}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {tenant.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-3 w-3" />
                              ₹{tenant.rentAmount.toLocaleString()} pending
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleCall(tenant.phone)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Paid Tenants */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-success flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Paid Tenants ({paidTenants.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {paidTenants.map((tenant) => (
                  <Card key={tenant.id} className="p-4 bg-success/5 border-success/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{tenant.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            Room {tenant.room}
                          </Badge>
                          <Badge className="bg-success text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Paid
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {tenant.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {tenant.email}
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCall(tenant.phone)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerPGDashboard;

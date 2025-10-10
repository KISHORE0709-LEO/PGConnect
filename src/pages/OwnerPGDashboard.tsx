import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Edit, 
  Upload, 
  Eye,
  Calendar,
  MapPin,
  IndianRupee,
  Users,
  Wifi,
  Car,
  Utensils,
  Shield,
  Zap,
  Shirt,
  Wind,
  Camera
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const OwnerPGDashboard = () => {
  const navigate = useNavigate();
  const { pgId } = useParams();
  const { user } = useAuth();
  const [pgData, setPgData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock room data for visualization
  const mockRooms = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    number: `R${String(i + 1).padStart(2, '0')}`,
    floor: Math.floor(i / 4) + 1,
    status: Math.random() > 0.3 ? 'occupied' : 'available',
    tenant: Math.random() > 0.3 ? `Tenant ${i + 1}` : null
  }));

  useEffect(() => {
    const fetchPGData = async () => {
      try {
        // Fetch from Firebase
        const { db } = await import('@/config/firebase');
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        
        const q = query(collection(db, 'pgs'), where('ownerId', '==', user?.id));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const pgDoc = querySnapshot.docs[0];
          setPgData({ id: pgDoc.id, ...pgDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching PG data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPGData();
    }
  }, [user, pgId]);

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': Wifi,
      'Parking': Car,
      'Food Included': Utensils,
      'CCTV': Shield,
      'Power Backup': Zap,
      'Laundry': Shirt,
      'AC': Wind,
      'Attached Bathroom': Camera
    };
    return icons[amenity] || Shield;
  };

  const getRoomColor = (status) => {
    return status === 'occupied' ? 'bg-red-500' : 'bg-green-500';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!pgData) {
    return <div className="min-h-screen flex items-center justify-center">PG not found</div>;
  }

  const occupiedRooms = mockRooms.filter(room => room.status === 'occupied').length;
  const availableRooms = mockRooms.length - occupiedRooms;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 backdrop-blur-lg bg-card/95">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/owner-dashboard')}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Listing
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Add Media
            </Button>
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              Preview Public
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section - PG Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{pgData.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{pgData.address}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{pgData.pgType} PG</Badge>
                      <Badge variant="outline">{pgData.nearestCollege} - {pgData.distance}km</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹{pgData.monthlyRent?.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>
                <p className="text-muted-foreground">{pgData.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {pgData.amenities?.map((amenity, index) => {
                    const IconComponent = getAmenityIcon(amenity);
                    return (
                      <div key={index} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>

          {/* Side Widgets */}
          <div className="space-y-6">
            {/* Room Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Room Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Rooms</span>
                  <span className="font-semibold">{mockRooms.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Occupied</span>
                  <span className="font-semibold text-red-600">{occupiedRooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-semibold text-green-600">{availableRooms}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Occupancy Rate</span>
                    <span className="font-semibold">{Math.round((occupiedRooms / mockRooms.length) * 100)}%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* House Rules */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">House Rules</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Gate Opens</span>
                  <span className="font-medium">{pgData.gateOpening || '6:00 AM'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gate Closes</span>
                  <span className="font-medium">{pgData.gateClosing || '10:00 PM'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Smoking</span>
                  <Badge variant={pgData.smokingAllowed ? "default" : "secondary"}>
                    {pgData.smokingAllowed ? 'Allowed' : 'Not Allowed'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Drinking</span>
                  <Badge variant={pgData.drinkingAllowed ? "default" : "secondary"}>
                    {pgData.drinkingAllowed ? 'Allowed' : 'Not Allowed'}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Current Status</h3>
              <div className="text-center">
                <Badge 
                  variant={pgData.availability === 'open' ? "default" : "secondary"}
                  className="text-lg px-4 py-2"
                >
                  {pgData.availability === 'open' ? 'Open for Bookings' : 'Closed'}
                </Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Interactive Building Diagram */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Building Layout</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Occupied</span>
              </div>
            </div>
          </div>

          {/* Room Grid by Floor */}
          <div className="space-y-8">
            {[3, 2, 1].map(floor => (
              <div key={floor} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Floor {floor}</h3>
                <div className="grid grid-cols-4 gap-4">
                  {mockRooms
                    .filter(room => room.floor === floor)
                    .map(room => (
                      <div
                        key={room.id}
                        className={`
                          relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105
                          ${getRoomColor(room.status)} text-white
                        `}
                        title={room.tenant || 'Available'}
                      >
                        <div className="text-center">
                          <div className="font-bold">{room.number}</div>
                          <div className="text-xs mt-1">
                            {room.status === 'occupied' ? 'Occupied' : 'Available'}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            View Bookings
          </Button>
          <Button size="lg" variant="outline">
            <Users className="h-5 w-5 mr-2" />
            Manage Tenants
          </Button>
          <Button size="lg" variant="outline">
            <IndianRupee className="h-5 w-5 mr-2" />
            Payment History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OwnerPGDashboard;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Camera,
  UserPlus,
  Building2
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import SimpleBuildingView from "@/components/SimpleBuildingView";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const OwnerPGDashboard = () => {
  const navigate = useNavigate();
  const { pgId } = useParams();
  const { user } = useAuth();
  const [pgData, setPgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [numFloors, setNumFloors] = useState(3);
  const [roomsPerFloor, setRoomsPerFloor] = useState(4);
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [selectedRoomForTenant, setSelectedRoomForTenant] = useState<string | null>(null);
  const [creatingRooms, setCreatingRooms] = useState(false);
  const [buildingConfigured, setBuildingConfigured] = useState(false);

  const createSampleRooms = async () => {
    if (!pgId) return;
    setCreatingRooms(true);
    try {
      const roomsCollection = collection(db, 'pgs', pgId, 'rooms');
      const batchPromises = [];

      const sampleTenants = [
        { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91-9876543210', rentStatus: true },
        { name: 'Vivek Kumar', email: 'vivek@example.com', phone: '+91-9876543211', rentStatus: false },
        { name: 'Priya Singh', email: 'priya@example.com', phone: '+91-9876543212', rentStatus: true },
        { name: 'Amit Patel', email: 'amit@example.com', phone: '+91-9876543213', rentStatus: false }
      ];

      let tenantIndex = 0;
      for (let floor = 1; floor <= numFloors; floor++) {
        for (let roomNum = 1; roomNum <= roomsPerFloor; roomNum++) {
          const roomNo = `R${floor}${String(roomNum).padStart(2, '0')}`;
          const numOccupants = Math.floor(Math.random() * 3);
          const occupants = [];
          
          for (let i = 0; i < numOccupants && tenantIndex < sampleTenants.length; i++) {
            occupants.push(sampleTenants[tenantIndex]);
            tenantIndex++;
          }
          
          batchPromises.push(addDoc(roomsCollection, {
            roomNo,
            floorNo: floor,
            occupants,
            capacity: 3,
            createdAt: serverTimestamp()
          }));
        }
      }

      await Promise.all(batchPromises);
      setShowConfigModal(false);
      setBuildingConfigured(true);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to create rooms');
    } finally {
      setCreatingRooms(false);
    }
  };

  useEffect(() => {
    const fetchPGData = async () => {
      if (!pgId) return;
      try {
        // Fetch from Firebase
        const { db } = await import('@/config/firebase');
        const { doc, getDoc } = await import('firebase/firestore');
        
        const pgRef = doc(db, 'pgs', pgId);
        const pgSnap = await getDoc(pgRef);
        
        if (pgSnap.exists()) {
          setPgData({ id: pgId, ...pgSnap.data() });
        } else {
          // Fallback data if PG not found
          setPgData({
            id: pgId,
            name: "Sample PG for Testing",
            description: "A comfortable PG with all modern amenities",
            address: "123 Test Street, Bangalore",
            pgType: "any",
            monthlyRent: 12000,
            nearestCollege: "NMIT",
            distance: 2.5,
            amenities: ["WiFi", "AC", "Food Included", "Laundry", "CCTV"],
            availability: "open",
            gateOpening: "6:00 AM",
            gateClosing: "10:00 PM",
            smokingAllowed: false,
            drinkingAllowed: false
          });
        }
      } catch (error) {
        console.error('Error fetching PG data:', error);
        // Fallback data on error
        setPgData({
          id: pgId,
          name: "Sample PG for Testing",
          description: "A comfortable PG with all modern amenities",
          address: "123 Test Street, Bangalore",
          pgType: "any",
          monthlyRent: 12000,
          nearestCollege: "NMIT",
          distance: 2.5,
          amenities: ["WiFi", "AC", "Food Included", "Laundry", "CCTV"],
          availability: "open",
          gateOpening: "6:00 AM",
          gateClosing: "10:00 PM",
          smokingAllowed: false,
          drinkingAllowed: false
        });
      } finally {
        setLoading(false);
      }
    };

    if (pgId) {
      fetchPGData();
    }
  }, [pgId]);

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!pgData) {
    return <div className="min-h-screen flex items-center justify-center">PG not found</div>;
  }

  const totalRooms = buildingConfigured ? numFloors * roomsPerFloor : 0;
  const occupiedRooms = buildingConfigured ? Math.floor(totalRooms * 0.6) : 0;
  const availableRooms = totalRooms - occupiedRooms;

  const hasNoRooms = !buildingConfigured;

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
                {hasNoRooms ? (
                  <div className="text-center py-4">
                    <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground mb-4">No rooms configured yet</p>
                    <Button onClick={() => setShowConfigModal(true)} className="w-full">
                      Configure Building Layout
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Rooms</span>
                      <span className="font-semibold">{totalRooms}</span>
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
                        <span className="font-semibold">{totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0}%</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    if (totalRooms === 0) {
                      alert('Please configure building layout first');
                      return;
                    }
                    alert('Add tenant functionality - coming soon!');
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Tenant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <IndianRupee className="h-4 w-4 mr-2" />
                  Collect Rent
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
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

        {/* Interactive Building Visualization */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Interactive Building Layout</h2>
              <p className="text-muted-foreground">
                {totalRooms === 0 && !buildingConfigured
                  ? "Configure your building layout to start managing tenants visually."
                  : "Hover over rooms to see tenant details. Click for actions."
                }
              </p>
            </div>
            {totalRooms === 0 && !buildingConfigured && (
              <Button onClick={() => setShowConfigModal(true)}>
                <Building2 className="h-4 w-4 mr-2" />
                Configure Layout
              </Button>
            )}
          </div>
          
          {totalRooms === 0 && !buildingConfigured ? (
            <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Building Layout</h3>
              <p className="text-muted-foreground mb-4">Set up floors and rooms to enable interactive management</p>
            </div>
          ) : buildingConfigured ? (
            <SimpleBuildingView numFloors={numFloors} roomsPerFloor={roomsPerFloor} />
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Configure building layout to get started</p>
            </div>
          )}
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
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => {
              if (totalRooms === 0) {
                alert('Please configure building layout first');
                return;
              }
              alert('Add tenant functionality - coming soon!');
            }}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add New Tenant
          </Button>
        </div>

        {/* Building Configuration Modal */}
        <Dialog open={showConfigModal} onOpenChange={setShowConfigModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Configure Building Layout</DialogTitle>
              <DialogDescription>
                Set up the number of floors and rooms per floor for your PG.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="numFloors">Number of Floors</Label>
                <Input
                  id="numFloors"
                  type="number"
                  min="1"
                  max="10"
                  value={numFloors}
                  onChange={(e) => setNumFloors(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div>
                <Label htmlFor="roomsPerFloor">Rooms per Floor</Label>
                <Input
                  id="roomsPerFloor"
                  type="number"
                  min="1"
                  max="20"
                  value={roomsPerFloor}
                  onChange={(e) => setRoomsPerFloor(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Preview</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  This will create {numFloors * roomsPerFloor} rooms with sample tenants for demonstration.
                </p>
                <p className="text-sm text-muted-foreground">
                  Room numbers: R101, R102, R201, R202, etc.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfigModal(false)}>
                Cancel
              </Button>
              <Button onClick={createSampleRooms} disabled={creatingRooms}>
                {creatingRooms ? 'Creating...' : 'Create Building Layout'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


      </div>
    </div>
  );
};

export default OwnerPGDashboard;
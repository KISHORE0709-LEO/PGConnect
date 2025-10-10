import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Users, 
  Wifi, 
  Utensils,
  Star,
  Filter,
  Eye,
  Zap,
  Bath,
  AirVent,
  Shirt
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock PG data
const mockPGs = [
  {
    id: 1,
    name: "Green Valley PG",
    location: "Jayanagar, Bangalore",
    price: 8500,
    sharing: "2-3 Sharing",
    gender: "Boys",
    rating: 4.5,
    amenities: ["WiFi", "Food", "Laundry"],
    availability: 3,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400"
  },
  {
    id: 2,
    name: "Sunrise Residency",
    location: "Koramangala, Bangalore",
    price: 10000,
    sharing: "2 Sharing",
    gender: "Girls",
    rating: 4.8,
    amenities: ["WiFi", "Food", "AC", "Laundry"],
    availability: 2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"
  },
  {
    id: 3,
    name: "Student Haven",
    location: "BTM Layout, Bangalore",
    price: 7000,
    sharing: "3 Sharing",
    gender: "Boys",
    rating: 4.2,
    amenities: ["WiFi", "Laundry"],
    availability: 5,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
  },
  {
    id: 4,
    name: "Elite Homes",
    location: "Electronic City, Bangalore",
    price: 9500,
    sharing: "2 Sharing",
    gender: "Girls",
    rating: 4.6,
    amenities: ["WiFi", "Food", "AC"],
    availability: 1,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [pgs, setPgs] = useState(mockPGs);
  const [allPgs, setAllPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        // Fetch from Firebase
        const { db } = await import('@/config/firebase');
        const { collection, getDocs } = await import('firebase/firestore');
        
        const querySnapshot = await getDocs(collection(db, 'pgs'));
        const firebasePGs = [];
        
        console.log('Firebase query result:', querySnapshot.size, 'documents found');
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('PG document:', doc.id, data);
          
          const images = [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400", 
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"
          ];
          
          firebasePGs.push({
            id: doc.id,
            name: data.name,
            location: data.address,
            price: data.monthlyRent || 8500,
            sharing: "2-3 Sharing",
            gender: data.pgType || "Any",
            rating: 4.5,
            amenities: data.amenities || ["WiFi"],
            availability: data.availableRooms || data.totalRooms || 1,
            image: images[firebasePGs.length % images.length]
          });
        });
        
        console.log('Processed Firebase PGs:', firebasePGs);
        
        const combinedPGs = [...firebasePGs, ...mockPGs];
        setAllPgs(combinedPGs);
        setPgs(combinedPGs);
      } catch (error) {
        console.error('Error fetching PGs from Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);
  const [college, setCollege] = useState("");
  const [distance, setDistance] = useState("");
  const [gender, setGender] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [sharingType, setSharingType] = useState<string[]>([]);
  const [roomFeatures, setRoomFeatures] = useState<string[]>([]);
  const [houseRules, setHouseRules] = useState<string[]>([]);
  const [gateTimings, setGateTimings] = useState("");
  const [visitorsAllowed, setVisitorsAllowed] = useState(false);
  const [securityDeposit, setSecurityDeposit] = useState("");

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSharingToggle = (sharing: string) => {
    setSharingType(prev => 
      prev.includes(sharing) 
        ? prev.filter(s => s !== sharing)
        : [...prev, sharing]
    );
  };

  const handleRoomFeatureToggle = (feature: string) => {
    setRoomFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleRuleToggle = (rule: string) => {
    setHouseRules(prev => 
      prev.includes(rule) 
        ? prev.filter(r => r !== rule)
        : [...prev, rule]
    );
  };

  const handleSearch = () => {
    let filtered = allPgs;

    // Filter by college
    if (college) {
      filtered = filtered.filter(pg => 
        pg.nearestCollege?.toLowerCase().includes(college.toLowerCase())
      );
    }

    // Filter by distance
    if (distance) {
      filtered = filtered.filter(pg => pg.distance <= parseFloat(distance));
    }

    // Filter by gender
    if (gender && gender !== 'any') {
      filtered = filtered.filter(pg => 
        pg.gender?.toLowerCase() === gender || pg.gender?.toLowerCase() === 'any'
      );
    }

    // Filter by sharing type
    if (sharingType.length > 0) {
      filtered = filtered.filter(pg => 
        sharingType.some(sharing => pg.sharing?.includes(sharing))
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(pg => pg.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(pg => pg.price <= parseInt(maxPrice));
    }

    // Filter by amenities
    if (amenities.length > 0) {
      filtered = filtered.filter(pg => 
        amenities.every(amenity => pg.amenities.includes(amenity))
      );
    }

    setPgs(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 backdrop-blur-lg bg-card/95">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">PG<span className="text-primary">Connect</span></h1>
            <Badge variant="secondary">Student</Badge>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Find PGs Near Your College</h2>
              
              <div className="space-y-6">
                {/* Find PGs Near Your College */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Find PGs Near Your College</Label>
                  <div className="text-xs text-gray-500 mb-2">Location</div>
                  <Select value={college} onValueChange={setCollege}>
                    <SelectTrigger>
                      <SelectValue placeholder="NMIT" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nmit">NMIT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Distance */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Distance (km)</Label>
                  <Input
                    placeholder="Enter distance in km"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    type="number"
                  />
                </div>

                {/* Gender */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Gender</Label>
                  <div className="space-y-2">
                    {[{value: 'male', label: 'male'}, {value: 'female', label: 'female'}, {value: 'any', label: 'any'}].map((g) => (
                      <div key={g.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={g.value}
                          checked={gender === g.value}
                          onCheckedChange={() => setGender(g.value)}
                        />
                        <Label htmlFor={g.value} className="cursor-pointer">{g.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range (₹)</Label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Min:</Label>
                        <Input
                          placeholder="Min"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          type="number"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Max:</Label>
                        <Input
                          placeholder="Max"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Amenities</Label>
                  <div className="space-y-2">
                    {[
                      'WiFi',
                      'Power Backup', 
                      'Food Included',
                      'Attached Bathroom',
                      'AC',
                      'Laundry'
                    ].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={amenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityToggle(amenity)}
                        />
                        <Label htmlFor={amenity} className="cursor-pointer">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sharing Type */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Sharing Type</Label>
                  <div className="space-y-2">
                    {['Private', '2 Sharing', '3 Sharing', 'More than 3'].map((sharing) => (
                      <div key={sharing} className="flex items-center space-x-2">
                        <Checkbox
                          id={sharing}
                          checked={sharingType.includes(sharing)}
                          onCheckedChange={() => handleSharingToggle(sharing)}
                        />
                        <Label htmlFor={sharing} className="cursor-pointer">{sharing}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Search Button */}
                <Button size="lg" className="w-full" onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search PGs
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">


            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {loading ? 'Loading...' : `Showing ${pgs.length} properties in Bangalore`}
              </h2>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {/* PG Cards */}
            {!loading && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pgs.map((pg) => (
                <Card 
                  key={pg.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pg.image} 
                      alt={pg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-success">
                      {pg.availability} rooms available
                    </Badge>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{pg.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {pg.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{pg.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <Badge variant="outline">{pg.gender}</Badge>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{pg.sharing}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {pg.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                          {amenity === "Food" && <Utensils className="h-3 w-3 mr-1" />}
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-2xl font-bold text-primary">
                        <IndianRupee className="h-5 w-5" />
                        {pg.price.toLocaleString()}
                        <span className="text-sm text-muted-foreground font-normal ml-1">/month</span>
                      </div>
                      <Button size="sm" onClick={() => navigate(`/student/pg/${pg.id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  CreditCard, 
  FileText, 
  Home, 
  LogOut, 
  Mail, 
  Phone, 
  Shield, 
  User, 
  Wallet,
  AlertTriangle,
  CheckCircle,
  Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your profile.</p>
          <Button onClick={() => navigate('/auth')}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors" onClick={() => navigate('/')}>PGConnect</h1>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen p-6">
          <nav className="space-y-2">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/student/bookings')}>
                <Calendar className="h-4 w-4 mr-3" />
                Bookings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Home className="h-4 w-4 mr-3" />
                Short Stays
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-3" />
                Schedule Visits
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-3" />
                PG Care
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Wallet className="h-4 w-4 mr-3" />
                PG Wallet
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-3" />
                Exit Property
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <div className="text-sm font-medium text-gray-500 mb-2">Account</div>
              <div className="space-y-1 ml-4">
                <Button 
                  variant={activeTab === 'edit-profile' ? "secondary" : "ghost"} 
                  className="w-full justify-start text-sm" 
                  onClick={() => setActiveTab('edit-profile')}
                >
                  <User className="h-4 w-4 mr-3" />
                  Edit Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <FileText className="h-4 w-4 mr-3" />
                  KYC Documents
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  <CreditCard className="h-4 w-4 mr-3" />
                  Transaction History
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/owner-dashboard')}>
                <Home className="h-4 w-4 mr-3" />
                My PG
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'edit-profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('edit-profile')}
            >
              Edit Profile
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'preferences' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'additional' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Information
            </button>
          </div>

          {/* Edit Profile Tab */}
          {activeTab === 'edit-profile' && (
            <div className="space-y-6">
              {/* Warning Bar */}
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">⚠ Email Verification Pending</span>
              </div>

              {/* Profile Section */}
              <Card className="p-6">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 mb-4">
                    <User className="h-12 w-12 text-gray-600" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Mobile Number</div>
                          <div className="text-sm text-gray-500">{formData.phone || 'Not provided'}</div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg shadow-sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">Email Address</div>
                          <div className="text-sm text-gray-500">{formData.email}</div>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <Badge className="bg-red-100 text-red-800">Unverified</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-lg shadow-sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" className="rounded-lg shadow-sm">
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full rounded-lg shadow-sm" disabled>
                  Save Changes
                </Button>
              </Card>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab === 'preferences' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              <p className="text-gray-500">Preference settings will be available here.</p>
            </Card>
          )}

          {activeTab === 'additional' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <p className="text-gray-500">Additional information settings will be available here.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
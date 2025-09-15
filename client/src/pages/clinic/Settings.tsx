
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import ClinicNavigation from "@/components/clinic/ClinicNavigation";
import { 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Building,
  Users,
  Key,
  Shield,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

// Mock data for staff
const staffMembers = [
  { id: 1, name: "Dr. Rajesh Rao", email: "rajesh@samnadaclinic.com", role: "Admin" },
  { id: 2, name: "Nurse Priya", email: "priya@samnadaclinic.com", role: "Staff" },
  { id: 3, name: "Dr. Anita Sharma", email: "anita@samnadaclinic.com", role: "Doctor" },
  { id: 4, name: "Receptionist Maya", email: "maya@samnadaclinic.com", role: "Staff" }
];

// Mock API keys
const apiKeys = [
  { id: 1, name: "SMS Gateway", key: "sk_live_1234567890abcdef", lastUsed: "2024-01-15", active: true },
  { id: 2, name: "Email Service", key: "ek_prod_abcdef1234567890", lastUsed: "2024-01-16", active: true },
  { id: 3, name: "Analytics", key: "ak_test_9876543210fedcba", lastUsed: "2024-01-10", active: false }
];

export default function Settings() {
  const [collapsed, setCollapsed] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState<{[key: number]: boolean}>({});
  
  // Clinic settings state
  const [clinicSettings, setClinicSettings] = useState({
    name: "Samnada Clinic",
    address: "123 Medical Plaza, Healthcare District",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
    phone: "+91 9876543210",
    email: "info@samnadaclinic.com",
    website: "www.samnadaclinic.com"
  });

  const toggleApiKeyVisibility = (keyId: number) => {
    setShowApiKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.slice(0, 4) + '••••••••' + key.slice(-4);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin": return "bg-purple-100 text-purple-700";
      case "doctor": return "bg-blue-100 text-blue-700";
      case "staff": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleSaveSettings = () => {
    // Mock save functionality
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage clinic settings and preferences</p>
            </div>
            
            <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-8">
            {/* Clinic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  <span>Clinic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input
                      id="clinicName"
                      value={clinicSettings.name}
                      onChange={(e) => setClinicSettings({...clinicSettings, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={clinicSettings.email}
                        onChange={(e) => setClinicSettings({...clinicSettings, email: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        value={clinicSettings.phone}
                        onChange={(e) => setClinicSettings({...clinicSettings, phone: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={clinicSettings.website}
                      onChange={(e) => setClinicSettings({...clinicSettings, website: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <Input
                        id="address"
                        value={clinicSettings.address}
                        onChange={(e) => setClinicSettings({...clinicSettings, address: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={clinicSettings.city}
                      onChange={(e) => setClinicSettings({...clinicSettings, city: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={clinicSettings.state}
                      onChange={(e) => setClinicSettings({...clinicSettings, state: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      value={clinicSettings.pincode}
                      onChange={(e) => setClinicSettings({...clinicSettings, pincode: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span>Staff Management</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Staff Member
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-purple-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={getRoleColor(member.role)}>
                          {member.role}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Keys */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="w-5 h-5 text-purple-600" />
                    <span>API Keys</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate New Key
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                              {showApiKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleApiKeyVisibility(apiKey.id)}
                            >
                              {showApiKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Last used: {apiKey.lastUsed}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Switch checked={apiKey.active} />
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

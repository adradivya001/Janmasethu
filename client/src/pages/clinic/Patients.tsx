import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ClinicNavigation from "@/components/clinic/ClinicNavigation";
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Calendar,
  User,
  FileText,
  Heart
} from "lucide-react";

// Import mock data
import patients from "@/data/clinic/patients.json";

export default function Patients() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientsData, setPatientsData] = useState(patients);
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    gender: "Female",
    age: "",
    dateOfBirth: "",
    status: "active",
    treatmentType: "IVF",
    cycle: "1",
    doctor: "Dr. Rao",
    medicalHistory: "",
    emergencyContact: ""
  });

  const filteredPatients = patientsData.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPatient = async () => {
    if (newPatient.firstName && newPatient.lastName && newPatient.email && newPatient.phone && newPatient.dateOfBirth) {
      const patientToAdd = {
        id: `P${String(patientsData.length + 1).padStart(3, '0')}`,
        name: `${newPatient.firstName} ${newPatient.lastName}`,
        ...newPatient,
        age: parseInt(newPatient.age) || 25,
        lastVisit: new Date().toISOString().split('T')[0]
      };
      
      try {
        console.log('🔵 Triggering patient webhook...');
        
        const webhookPayload = {
          first_name: newPatient.firstName,
          last_name: newPatient.lastName,
          gender: newPatient.gender,
          birth_date: newPatient.dateOfBirth,
          phone: newPatient.phone,
          email: newPatient.email
        };

        const webhookResponse = await fetch('https://n8n.ottobon.in/webhook/patient-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: {},
            body: webhookPayload
          })
        });

        console.log('📤 Sent to webhook:', webhookPayload);
        console.log('🔵 Webhook response status:', webhookResponse.status, webhookResponse.statusText);

        if (webhookResponse.ok) {
          const responseData = await webhookResponse.json();
          console.log('✅ Patient response:', responseData);
        }
      } catch (error) {
        console.error('❌ Error triggering patient webhook:', error);
      }
      
      setPatientsData([...patientsData, patientToAdd]);
      setNewPatient({
        firstName: "",
        lastName: "",
        name: "",
        email: "",
        phone: "",
        gender: "Female",
        age: "",
        dateOfBirth: "",
        status: "active",
        treatmentType: "IVF",
        cycle: "1",
        doctor: "Dr. Rao",
        medicalHistory: "",
        emergencyContact: ""
      });
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewPatient(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "completed": return "bg-blue-100 text-blue-700";
      case "inactive": return "bg-gray-100 text-gray-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
              <p className="text-gray-600">Manage patient records and information</p>
            </div>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Patient
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg px-8 max-h-[85vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                  <DialogTitle>Add New Patient</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 overflow-y-auto overflow-x-hidden pr-2 flex-1 scrollbar-hide">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={newPatient.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={newPatient.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newPatient.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={newPatient.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <select
                      id="gender"
                      value={newPatient.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={newPatient.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newPatient.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Age"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="treatmentType">Treatment Type</Label>
                    <select
                      id="treatmentType"
                      value={newPatient.treatmentType}
                      onChange={(e) => handleInputChange("treatmentType", e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="IVF">IVF</option>
                      <option value="IUI">IUI</option>
                      <option value="ICSI">ICSI</option>
                      <option value="Consultation">Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="doctor">Assigned Doctor</Label>
                    <select
                      id="doctor"
                      value={newPatient.doctor}
                      onChange={(e) => handleInputChange("doctor", e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Dr. Rao">Dr. Rao</option>
                      <option value="Dr. Mehta">Dr. Mehta</option>
                      <option value="Dr. Singh">Dr. Singh</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={newPatient.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      placeholder="Emergency contact details"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddPatient}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={!newPatient.firstName || !newPatient.lastName || !newPatient.email || !newPatient.phone || !newPatient.dateOfBirth}
                    >
                      Add Patient
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search patients by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.status === "active").length}</p>
                    <p className="text-sm text-gray-600">Active Patients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.treatmentType === "IVF").length}</p>
                    <p className="text-sm text-gray-600">IVF Patients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">7</p>
                    <p className="text-sm text-gray-600">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg mr-3">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                    <p className="text-sm text-gray-600">Total Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">ID: {patient.id}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {patient.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last visit: {patient.lastVisit}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Age:</span>
                        <span className="ml-1 font-medium">{patient.age}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cycle:</span>
                        <span className="ml-1 font-medium">{patient.cycle}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Treatment:</span>
                        <span className="ml-1 font-medium">{patient.treatmentType}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Doctor:</span>
                        <span className="ml-1 font-medium">{patient.doctor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-3 h-3 mr-1" />
                      View Records
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-3 h-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-600">Try adjusting your search terms or add a new patient.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
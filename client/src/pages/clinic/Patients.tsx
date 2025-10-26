import { useState, useEffect } from "react";
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

interface Patient {
  patient_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  birth_date: string;
  created_at: string;
  updated_at: string;
  // Additional fields for UI
  id?: string;
  name?: string;
  age?: number;
  status?: string;
  treatmentType?: string;
  cycle?: string;
  doctor?: string;
  lastVisit?: string;
}

export default function Patients() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const filteredPatients = patientsData.filter(patient => {
    const name = patient.name || `${patient.first_name} ${patient.last_name}`;
    const id = patient.id || patient.patient_id;
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddPatient = async () => {
    if (newPatient.firstName && newPatient.lastName && newPatient.email && newPatient.phone && newPatient.dateOfBirth) {
      try {
        setIsLoading(true);
        console.log('🔵 Triggering patient webhook...');
        
        const webhookPayload = {
          first_name: newPatient.firstName,
          last_name: newPatient.lastName,
          gender: newPatient.gender,
          birth_date: newPatient.dateOfBirth,
          phone: newPatient.phone,
          email: newPatient.email
        };

        console.log('📤 Sending to webhook:', webhookPayload);

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

        console.log('🔵 Webhook response status:', webhookResponse.status, webhookResponse.statusText);

        if (webhookResponse.ok) {
          const responseData = await webhookResponse.json();
          console.log('✅ Patient response:', responseData);

          // Calculate age from birth_date
          const calculateAge = (birthDate: string) => {
            const today = new Date();
            const birth = new Date(birthDate);
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
              age--;
            }
            return age;
          };

          // Handle both array and object response
          const patientData = Array.isArray(responseData) ? responseData[0] : responseData;

          // Map webhook response to our patient format
          const newPatientData: Patient = {
            patient_id: patientData.patient_id,
            first_name: patientData.first_name,
            last_name: patientData.last_name,
            email: patientData.email,
            phone: patientData.phone,
            gender: patientData.gender,
            birth_date: patientData.birth_date,
            created_at: patientData.created_at,
            updated_at: patientData.updated_at,
            // Additional fields for display
            id: patientData.patient_id,
            name: `${patientData.first_name} ${patientData.last_name}`,
            age: calculateAge(patientData.birth_date),
            status: newPatient.status || "active",
            treatmentType: newPatient.treatmentType || "IVF",
            cycle: newPatient.cycle || "1",
            doctor: newPatient.doctor || "Dr. Rao",
            lastVisit: new Date().toISOString().split('T')[0]
          };

          // Add the new patient to the list
          setPatientsData([newPatientData, ...patientsData]);
          
          // Reset form
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
        } else {
          console.error('❌ Patient creation failed:', webhookResponse.statusText);
          alert('Failed to create patient. Please try again.');
        }
      } catch (error) {
        console.error('❌ Error triggering patient webhook:', error);
        alert('An error occurred while creating the patient. Please try again.');
      } finally {
        setIsLoading(false);
      }
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
                    <div className="relative mt-1">
                      <select
                        id="gender"
                        value={newPatient.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="Female" className="bg-white text-gray-900 py-3">Female</option>
                        <option value="Male" className="bg-white text-gray-900 py-3">Male</option>
                        <option value="Other" className="bg-white text-gray-900 py-3">Other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
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
                    <div className="relative mt-1">
                      <select
                        id="treatmentType"
                        value={newPatient.treatmentType}
                        onChange={(e) => handleInputChange("treatmentType", e.target.value)}
                        className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="IVF" className="bg-white text-gray-900 py-3">IVF</option>
                        <option value="IUI" className="bg-white text-gray-900 py-3">IUI</option>
                        <option value="ICSI" className="bg-white text-gray-900 py-3">ICSI</option>
                        <option value="Consultation" className="bg-white text-gray-900 py-3">Consultation</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="doctor">Assigned Doctor</Label>
                    <div className="relative mt-1">
                      <select
                        id="doctor"
                        value={newPatient.doctor}
                        onChange={(e) => handleInputChange("doctor", e.target.value)}
                        className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="Dr. Rao" className="bg-white text-gray-900 py-3">Dr. Rao</option>
                        <option value="Dr. Mehta" className="bg-white text-gray-900 py-3">Dr. Mehta</option>
                        <option value="Dr. Singh" className="bg-white text-gray-900 py-3">Dr. Singh</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
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
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddPatient}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={!newPatient.firstName || !newPatient.lastName || !newPatient.email || !newPatient.phone || !newPatient.dateOfBirth || isLoading}
                    >
                      {isLoading ? 'Adding...' : 'Add Patient'}
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
                    <p className="text-2xl font-bold text-gray-900">{patientsData.filter(p => p.status === "active").length}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{patientsData.filter(p => p.treatmentType === "IVF").length}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{patientsData.filter(p => {
                      const today = new Date();
                      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                      const lastVisit = p.lastVisit ? new Date(p.lastVisit) : null;
                      return lastVisit && lastVisit >= weekAgo;
                    }).length}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{patientsData.length}</p>
                    <p className="text-sm text-gray-600">Total Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patients Grid */}
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Adding patient...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => {
                const patientName = patient.name || `${patient.first_name} ${patient.last_name}`;
                const patientId = patient.id || patient.patient_id;
                const patientStatus = patient.status || "active";
                
                return (
                  <Card key={patientId} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{patientName}</h3>
                            <p className="text-sm text-gray-600">ID: {patientId}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(patientStatus)}>
                          {patientStatus}
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
                        {patient.lastVisit && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            Last visit: {patient.lastVisit}
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {patient.age && (
                            <div>
                              <span className="text-gray-600">Age:</span>
                              <span className="ml-1 font-medium">{patient.age}</span>
                            </div>
                          )}
                          {patient.gender && (
                            <div>
                              <span className="text-gray-600">Gender:</span>
                              <span className="ml-1 font-medium">{patient.gender}</span>
                            </div>
                          )}
                          {patient.cycle && (
                            <div>
                              <span className="text-gray-600">Cycle:</span>
                              <span className="ml-1 font-medium">{patient.cycle}</span>
                            </div>
                          )}
                          {patient.treatmentType && (
                            <div className="col-span-2">
                              <span className="text-gray-600">Treatment:</span>
                              <span className="ml-1 font-medium">{patient.treatmentType}</span>
                            </div>
                          )}
                          {patient.doctor && (
                            <div className="col-span-2">
                              <span className="text-gray-600">Doctor:</span>
                              <span className="ml-1 font-medium">{patient.doctor}</span>
                            </div>
                          )}
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
                );
              })}
            </div>
          )}

          {filteredPatients.length === 0 && !isLoading && (
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
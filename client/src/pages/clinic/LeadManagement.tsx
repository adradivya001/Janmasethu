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
  MapPin,
  Eye,
  Edit,
  Filter,
  X
} from "lucide-react";

// Import mock data
import leads from "@/data/clinic/leads.json";

export default function LeadManagement() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadsData, setLeadsData] = useState(leads);
  const [isMobile, setIsMobile] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "new",
    source: "",
    interest: "",
    priority: "medium",
    age: "",
    location: ""
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.phone.includes(searchQuery);
    const matchesFilter = filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-700";
      case "contacted": return "bg-yellow-100 text-yellow-700";
      case "qualified": return "bg-green-100 text-green-700";
      case "scheduled": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleAddLead = async () => {
    if (newLead.name && newLead.email && newLead.phone) {
      try {
        console.log('🔵 Triggering lead creation webhook...');
        
        // Split the name into first_name and last_name
        const nameParts = newLead.name.trim().split(' ');
        const first_name = nameParts[0] || '';
        const last_name = nameParts.slice(1).join(' ') || '';
        
        // Prepare the payload in the exact format required
        const payload = {
          query: {},
          body: {
            first_name: first_name,
            last_name: last_name,
            email: newLead.email,
            phone: newLead.phone,
            age: newLead.age ? parseInt(newLead.age) : 29,
            source: newLead.source || 'Chatbot',
            campaign: 'Parenthood_Awareness',
            utm_source: 'Facebook',
            utm_medium: 'Ad',
            utm_campaign: 'IVF_Journey_2025',
            inquiry_type: newLead.interest || 'IVF_Consultation',
            priority: newLead.priority === 'high' ? 'High' : newLead.priority === 'medium' ? 'Medium' : 'Low'
          }
        };

        console.log('📤 Sending lead to webhook:', payload);

        const webhookResponse = await fetch('https://n8n.ottobon.in/webhook/lead_details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        console.log('🔵 Webhook response status:', webhookResponse.status, webhookResponse.statusText);

        if (webhookResponse.ok) {
          const responseData = await webhookResponse.json();
          console.log('✅ Lead created successfully:', responseData);

          // Add to local state
          const leadToAdd = {
            id: `L${String(leadsData.length + 1).padStart(3, '0')}`,
            ...newLead,
            lastContact: new Date().toISOString().split('T')[0],
            age: parseInt(newLead.age) || 0
          };
          
          setLeadsData([...leadsData, leadToAdd]);
          setNewLead({
            name: "",
            email: "",
            phone: "",
            status: "new",
            source: "",
            interest: "",
            priority: "medium",
            age: "",
            location: ""
          });
          setIsModalOpen(false);
        } else {
          console.error('❌ Lead creation failed:', webhookResponse.statusText);
          alert('Failed to create lead. Please try again.');
        }
      } catch (error) {
        console.error('❌ Error during lead creation:', error);
        alert('An error occurred while creating the lead. Please try again.');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewLead(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-3 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">Lead Management</h1>
              <p className="text-sm md:text-base text-gray-600 truncate">Track and manage potential patients</p>
            </div>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base px-3 md:px-4 py-2 w-full sm:w-auto">
                  <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span className="hidden xs:inline">Add New Lead</span>
                  <span className="xs:hidden">Add Lead</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[85vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                  <DialogTitle>Add New Lead</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 overflow-y-auto overflow-x-hidden pr-1 flex-1 scrollbar-hide">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newLead.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter full name"
                      className="mt-1 px-4 py-3"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newLead.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                      className="mt-1 px-4 py-3"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={newLead.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1 px-4 py-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newLead.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="30"
                        className="mt-1 px-4 py-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newLead.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="City"
                        className="mt-1 px-4 py-3"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="interest">Interest</Label>
                    <div className="relative filter-dropdown mt-1">
                      <select 
                        id="interest"
                        value={newLead.interest}
                        onChange={(e) => handleInputChange("interest", e.target.value)}
                        className="dropdown-trigger appearance-none cursor-pointer"
                      >
                        <option value="">Select interest</option>
                        <option value="IVF Consultation">IVF Consultation</option>
                        <option value="Fertility Assessment">Fertility Assessment</option>
                        <option value="IUI Treatment">IUI Treatment</option>
                        <option value="ICSI Treatment">ICSI Treatment</option>
                        <option value="Egg Freezing">Egg Freezing</option>
                      </select>
                      <div className="dropdown-chevron">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <div className="relative filter-dropdown mt-1">
                      <select 
                        id="source"
                        value={newLead.source}
                        onChange={(e) => handleInputChange("source", e.target.value)}
                        className="dropdown-trigger appearance-none cursor-pointer"
                      >
                        <option value="">Select source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="Walk-in">Walk-in</option>
                      </select>
                      <div className="dropdown-chevron">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <div className="relative filter-dropdown mt-1">
                      <select 
                        id="priority"
                        value={newLead.priority}
                        onChange={(e) => handleInputChange("priority", e.target.value)}
                        className="dropdown-trigger appearance-none cursor-pointer"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      <div className="dropdown-chevron">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddLead}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={!newLead.name || !newLead.email || !newLead.phone}
                    >
                      Add Lead
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-3 md:p-6">
          {/* Filters and Search */}
          <div className="mb-4 md:mb-6 space-y-3 md:space-y-0 md:flex md:flex-row md:gap-4 md:justify-between">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 md:pl-10 w-full sm:w-64 md:w-80 text-sm md:text-base"
                />
              </div>
              
              <div className="relative flex-1 sm:flex-initial min-w-0 filter-dropdown">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="dropdown-trigger appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="scheduled">Scheduled</option>
                </select>
                <div className="dropdown-chevron">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="text-sm md:text-base px-3 md:px-4">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-lg md:text-2xl font-bold text-blue-600">{leadsData.filter(l => l.status === "new").length}</p>
                  <p className="text-xs md:text-sm text-gray-600 truncate">New Leads</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-lg md:text-2xl font-bold text-yellow-600">{leadsData.filter(l => l.status === "contacted").length}</p>
                  <p className="text-xs md:text-sm text-gray-600 truncate">Contacted</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-lg md:text-2xl font-bold text-green-600">{leadsData.filter(l => l.status === "qualified").length}</p>
                  <p className="text-xs md:text-sm text-gray-600 truncate">Qualified</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-lg md:text-2xl font-bold text-purple-600">{leadsData.filter(l => l.status === "scheduled").length}</p>
                  <p className="text-xs md:text-sm text-gray-600 truncate">Scheduled</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leads Table */}
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-base md:text-lg">All Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              {/* Mobile Card Layout */}
              <div className="md:hidden">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="border-b border-gray-100 p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{lead.name}</h3>
                        <p className="text-sm text-gray-600">Age: {lead.age} • {lead.location}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 ml-3 flex-shrink-0">
                        <span className={`status-badge ${lead.status}`}>
                          {lead.status}
                        </span>
                        <span className={`priority-badge ${lead.priority}`}>
                          {lead.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{lead.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Interest: </span>
                        <span className="text-gray-700">{lead.interest}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Source: </span>
                        <span className="text-gray-700">{lead.source}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Lead</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Interest</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Source</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{lead.name}</p>
                            <p className="text-sm text-gray-600">Age: {lead.age} • {lead.location}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {lead.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              {lead.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`status-badge ${lead.status}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`priority-badge ${lead.priority}`}>
                            {lead.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-700">{lead.interest}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-700">{lead.source}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
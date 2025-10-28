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

interface Lead {
  lead_id: string;
  full_name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  interest: string;
  source: string;
  priority: string;
  status: string;
  created_at: string;
}

export default function LeadManagement() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "fetch" })
      });
      if (response.ok) {
        const data = await response.json();
        setLeadsData(data);
        console.log('✅ Leads fetched successfully:', data);
      } else {
        console.error('❌ Failed to fetch leads');
      }
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.phone.includes(searchQuery);
    const matchesFilter = filterStatus === "all" || lead.status.toLowerCase() === filterStatus;
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
        console.log('🔵 Creating new lead...');
        
        const payload = {
          action: "insert",
          full_name: newLead.name,
          last_name: "",
          email: newLead.email,
          phone: newLead.phone,
          age: newLead.age || "0",
          location: newLead.location || "",
          interest: newLead.interest || "IVF Consultation",
          source: newLead.source || "Website",
          priority: newLead.priority.charAt(0).toUpperCase() + newLead.priority.slice(1)
        };

        console.log('📤 Sending to backend API:', payload);

        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('✅ Lead created successfully:', responseData);

          // Add status field if not present
          const leadWithStatus = { ...responseData, status: 'new' };
          
          // Add the new lead to state
          setLeadsData([leadWithStatus, ...leadsData]);
          
          // Reset form
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
          console.error('❌ Lead creation failed:', response.statusText);
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

  const handleEditLead = async () => {
    if (!editingLead) return;

    try {
      console.log('🔵 Updating lead:', editingLead.lead_id);

      const payload = {
        action: "update",
        lead_id: editingLead.lead_id,
        full_name: editingLead.full_name,
        last_name: "",
        email: editingLead.email,
        phone: editingLead.phone,
        age: editingLead.age?.toString() || "0",
        location: editingLead.location || "",
        interest: editingLead.interest || "IVF Consultation",
        source: editingLead.source || "Website",
        priority: editingLead.priority
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const updatedLead = await response.json();
        console.log('✅ Lead updated successfully:', updatedLead);

        // Add status field if not present
        const leadWithStatus = { ...updatedLead, status: editingLead.status || 'new' };

        // Update the lead in state
        setLeadsData(leadsData.map(lead => 
          lead.lead_id === updatedLead.lead_id ? leadWithStatus : lead
        ));
        
        setIsEditModalOpen(false);
        setEditingLead(null);
      } else {
        console.error('❌ Lead update failed:', response.statusText);
        alert('Failed to update lead. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error during lead update:', error);
      alert('An error occurred while updating the lead. Please try again.');
    }
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && (
        <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      )}
      {isMobile && <ClinicNavigation />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-7xl mx-auto">
            <div className="min-w-0 flex-1">
              <h1 className="text-[28px] md:text-[32px] font-bold text-gray-900 leading-tight mb-2">Lead Management</h1>
              <p className="text-sm md:text-base text-gray-600">Track and manage potential patients</p>
            </div>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 md:px-4 py-2 w-full sm:w-auto rounded-lg shadow-md hover:shadow-lg transition-all">
                  <Plus className="w-4 h-4 mr-1.5" />
                  <span>Add New Lead</span>
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
                    <div className="relative mt-1">
                      <select 
                        id="interest"
                        value={newLead.interest}
                        onChange={(e) => handleInputChange("interest", e.target.value)}
                        className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="" className="bg-white text-gray-500 py-3">Select interest</option>
                        <option value="IVF Consultation" className="bg-white text-gray-900 py-3">IVF Consultation</option>
                        <option value="Fertility Assessment" className="bg-white text-gray-900 py-3">Fertility Assessment</option>
                        <option value="IUI Treatment" className="bg-white text-gray-900 py-3">IUI Treatment</option>
                        <option value="ICSI Treatment" className="bg-white text-gray-900 py-3">ICSI Treatment</option>
                        <option value="Egg Freezing" className="bg-white text-gray-900 py-3">Egg Freezing</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <div className="relative mt-1">
                      <select 
                        id="source"
                        value={newLead.source}
                        onChange={(e) => handleInputChange("source", e.target.value)}
                        className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="" className="bg-white text-gray-500 py-3">Select source</option>
                        <option value="Website" className="bg-white text-gray-900 py-3">Website</option>
                        <option value="Referral" className="bg-white text-gray-900 py-3">Referral</option>
                        <option value="Social Media" className="bg-white text-gray-900 py-3">Social Media</option>
                        <option value="Google Ads" className="bg-white text-gray-900 py-3">Google Ads</option>
                        <option value="Walk-in" className="bg-white text-gray-900 py-3">Walk-in</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <div className="relative mt-1">
                      <select 
                        id="priority"
                        value={newLead.priority}
                        onChange={(e) => handleInputChange("priority", e.target.value)}
                        className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        style={{ backgroundImage: 'none' }}
                      >
                        <option value="low" className="bg-white text-gray-900 py-3">Low</option>
                        <option value="medium" className="bg-white text-gray-900 py-3">Medium</option>
                        <option value="high" className="bg-white text-gray-900 py-3">High</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Filters and Search */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 md:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 sm:max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-2.5 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative min-w-0 sm:w-48">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="all" className="bg-white text-gray-900 py-3">All Status</option>
                    <option value="new" className="bg-white text-gray-900 py-3">New</option>
                    <option value="contacted" className="bg-white text-gray-900 py-3">Contacted</option>
                    <option value="qualified" className="bg-white text-gray-900 py-3">Qualified</option>
                    <option value="scheduled" className="bg-white text-gray-900 py-3">Scheduled</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="px-4 py-2.5 rounded-lg border-gray-300 hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

          {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600 mb-1">{leadsData.filter(l => l.status === "new").length}</p>
                    <p className="text-sm text-gray-600 font-medium">New Leads</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-600 mb-1">{leadsData.filter(l => l.status === "contacted").length}</p>
                    <p className="text-sm text-gray-600 font-medium">Contacted</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600 mb-1">{leadsData.filter(l => l.status === "qualified").length}</p>
                    <p className="text-sm text-gray-600 font-medium">Qualified</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600 mb-1">{leadsData.filter(l => l.status === "scheduled").length}</p>
                    <p className="text-sm text-gray-600 font-medium">Scheduled</p>
                  </div>
                </CardContent>
              </Card>
            </div>

          {/* Leads Table */}
            <Card className="border-0 shadow-md">
              <CardHeader className="p-6">
                <CardTitle className="text-lg font-semibold text-gray-900">All Leads ({filteredLeads.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                {/* Mobile Card Layout */}
                <div className="md:hidden">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-500">Loading leads...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No leads found</div>
                ) : (
                  filteredLeads.map((lead) => (
                    <div key={lead.lead_id} className="border-b border-gray-100 p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {lead.full_name}
                          </h3>
                          <p className="text-sm text-gray-600">Age: {lead.age}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 ml-3 flex-shrink-0">
                          <span className={`status-badge ${lead.status.toLowerCase()}`}>
                            {lead.status}
                          </span>
                          <span className={`priority-badge ${lead.priority.toLowerCase()}`}>
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
                        <div>
                          <span className="text-gray-500">Location: </span>
                          <span className="text-gray-700">{lead.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditModal(lead)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden md:block overflow-x-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-500">Loading leads...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No leads found</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Lead</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Interest</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Source</th>


        {/* Edit Lead Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>Edit Lead</DialogTitle>
            </DialogHeader>
            {editingLead && (
              <div className="space-y-4 overflow-y-auto pr-1 flex-1 scrollbar-hide">
                <div>
                  <Label htmlFor="edit-full-name">Full Name *</Label>
                  <Input
                    id="edit-full-name"
                    value={editingLead.full_name}
                    onChange={(e) => setEditingLead({...editingLead, full_name: e.target.value})}
                    className="mt-1 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingLead.email}
                    onChange={(e) => setEditingLead({...editingLead, email: e.target.value})}
                    className="mt-1 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-phone">Phone *</Label>
                  <Input
                    id="edit-phone"
                    value={editingLead.phone}
                    onChange={(e) => setEditingLead({...editingLead, phone: e.target.value})}
                    className="mt-1 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={editingLead.age || ''}
                    onChange={(e) => setEditingLead({...editingLead, age: parseInt(e.target.value)})}
                    className="mt-1 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={editingLead.location || ''}
                    onChange={(e) => setEditingLead({...editingLead, location: e.target.value})}
                    className="mt-1 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-interest">Interest</Label>
                  <Input
                    id="edit-interest"
                    value={editingLead.interest || ''}
                    onChange={(e) => setEditingLead({...editingLead, interest: e.target.value})}
                    className="mt-1 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-source">Source</Label>
                  <Input
                    id="edit-source"
                    value={editingLead.source || ''}
                    onChange={(e) => setEditingLead({...editingLead, source: e.target.value})}
                    className="mt-1 px-4 py-3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-priority">Priority</Label>
                  <select 
                    id="edit-priority"
                    value={editingLead.priority?.toLowerCase() || 'medium'}
                    onChange={(e) => setEditingLead({...editingLead, priority: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)})}
                    className="w-full appearance-none cursor-pointer bg-white border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <select 
                    id="edit-status"
                    value={editingLead.status?.toLowerCase() || 'new'}
                    onChange={(e) => setEditingLead({...editingLead, status: e.target.value})}
                    className="w-full appearance-none cursor-pointer bg-white border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingLead(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleEditLead}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.lead_id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {lead.full_name}
                              </p>
                              <p className="text-sm text-gray-600">Age: {lead.age}</p>
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
                            <span className={`status-badge ${lead.status.toLowerCase()}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`priority-badge ${lead.priority.toLowerCase()}`}>
                              {lead.priority}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-700">{lead.interest}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-700">{lead.location}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-gray-700">{lead.source}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openEditModal(lead)}>
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
                )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
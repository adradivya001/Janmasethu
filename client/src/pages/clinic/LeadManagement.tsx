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

  const handleAddLead = () => {
    if (newLead.name && newLead.email && newLead.phone) {
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
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
              <p className="text-gray-600">Track and manage potential patients</p>
            </div>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newLead.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter full name"
                      className="mt-1"
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
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={newLead.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1"
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
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newLead.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="City"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="interest">Interest</Label>
                    <select 
                      id="interest"
                      value={newLead.interest}
                      onChange={(e) => handleInputChange("interest", e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md bg-white"
                    >
                      <option value="">Select interest</option>
                      <option value="IVF Consultation">IVF Consultation</option>
                      <option value="Fertility Assessment">Fertility Assessment</option>
                      <option value="IUI Treatment">IUI Treatment</option>
                      <option value="ICSI Treatment">ICSI Treatment</option>
                      <option value="Egg Freezing">Egg Freezing</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <select 
                      id="source"
                      value={newLead.source}
                      onChange={(e) => handleInputChange("source", e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md bg-white"
                    >
                      <option value="">Select source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Walk-in">Walk-in</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select 
                      id="priority"
                      value={newLead.priority}
                      onChange={(e) => handleInputChange("priority", e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-md bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
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
        <main className="flex-1 overflow-auto p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{leadsData.filter(l => l.status === "new").length}</p>
                  <p className="text-sm text-gray-600">New Leads</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{leadsData.filter(l => l.status === "contacted").length}</p>
                  <p className="text-sm text-gray-600">Contacted</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{leadsData.filter(l => l.status === "qualified").length}</p>
                  <p className="text-sm text-gray-600">Qualified</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{leadsData.filter(l => l.status === "scheduled").length}</p>
                  <p className="text-sm text-gray-600">Scheduled</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
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
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getPriorityColor(lead.priority)}>
                            {lead.priority}
                          </Badge>
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
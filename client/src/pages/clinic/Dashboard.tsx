import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClinicNavigation from "@/components/clinic/ClinicNavigation";
import { 
  Search, 
  Bell, 
  User, 
  TrendingUp, 
  Calendar, 
  Users, 
  Target,
  MoreVertical,
  Phone,
  Mail,
  CheckCircle,
  Menu
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Import mock data
import tasks from "@/data/clinic/tasks.json";
import leads from "@/data/clinic/leads.json";
import appointments from "@/data/clinic/appointments.json";

const appointmentTrendData = [
  { name: "Mon", appointments: 8 },
  { name: "Tue", appointments: 12 },
  { name: "Wed", appointments: 10 },
  { name: "Thu", appointments: 15 },
  { name: "Fri", appointments: 18 },
  { name: "Sat", appointments: 6 },
  { name: "Sun", appointments: 3 }
];

const conversionData = [
  { name: "Leads", value: 45 },
  { name: "Qualified", value: 32 },
  { name: "Consulted", value: 24 },
  { name: "Converted", value: 16 }
];

export default function ClinicDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate metrics
  const newLeads = leads.filter(lead => lead.status === "new").length;
  const todayAppointments = appointments.filter(apt => apt.date === "2024-01-16").length;
  const conversionRate = Math.round((leads.filter(lead => lead.status === "qualified").length / leads.length) * 100);
  const activePatients = 120; // Mock data

  const priorityTasks = tasks.filter(task => task.priority === "high" && task.status === "pending");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Navigation Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${collapsed ? 'pointer-events-none' : ''}`}>
        {!collapsed && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setCollapsed(true)}
          />
        )}
        <div className={`absolute left-0 top-0 h-full transition-transform duration-300 ${collapsed ? '-translate-x-full' : 'translate-x-0'}`}>
          <ClinicNavigation collapsed={false} onCollapsedChange={setCollapsed} />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setCollapsed(!collapsed)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Welcome back, Dr. Rao</h1>
                <p className="text-sm lg:text-base text-gray-600 hidden sm:block">Here's what's happening at your clinic today</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search - Hidden on mobile, shown on tablet+ */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search patients, appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-60 lg:w-80 rounded-lg border-gray-200"
                />
              </div>
              
              {/* Mobile Search Button */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="w-5 h-5" />
              </Button>
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              
              {/* Profile */}
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium hidden sm:inline">Dr. Rao</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Mobile Search - Only visible on mobile */}
          <div className="md:hidden mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search patients, appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-200"
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-3 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="mb-2 lg:mb-0">
                    <p className="text-blue-100 text-xs lg:text-sm font-medium">New Leads</p>
                    <p className="text-xl lg:text-3xl font-bold">{newLeads}</p>
                    <p className="text-blue-100 text-xs hidden lg:block">+12% from last week</p>
                  </div>
                  <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 text-blue-100 self-end lg:self-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-3 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="mb-2 lg:mb-0">
                    <p className="text-green-100 text-xs lg:text-sm font-medium">Appointments Today</p>
                    <p className="text-xl lg:text-3xl font-bold">{todayAppointments}</p>
                    <p className="text-green-100 text-xs hidden lg:block">3 pending confirmation</p>
                  </div>
                  <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-green-100 self-end lg:self-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-3 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="mb-2 lg:mb-0">
                    <p className="text-purple-100 text-xs lg:text-sm font-medium">Conversion Rate</p>
                    <p className="text-xl lg:text-3xl font-bold">{conversionRate}%</p>
                    <p className="text-purple-100 text-xs hidden lg:block">+5% from last month</p>
                  </div>
                  <Target className="w-6 h-6 lg:w-8 lg:h-8 text-purple-100 self-end lg:self-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="p-3 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="mb-2 lg:mb-0">
                    <p className="text-orange-100 text-xs lg:text-sm font-medium">Active Patients</p>
                    <p className="text-xl lg:text-3xl font-bold">{activePatients}</p>
                    <p className="text-orange-100 text-xs hidden lg:block">8 new this week</p>
                  </div>
                  <Users className="w-6 h-6 lg:w-8 lg:h-8 text-orange-100 self-end lg:self-auto" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tasks Row */}
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 mb-6 lg:mb-8">
            {/* Appointment Trends */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 lg:pb-6">
                <CardTitle className="flex items-center justify-between text-base lg:text-lg">
                  <span>Weekly Appointment Trends</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={appointmentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="appointments" 
                      stroke="#7C3AED" 
                      strokeWidth={2}
                      dot={{ fill: "#7C3AED", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Priority Tasks */}
            <Card>
              <CardHeader className="pb-3 lg:pb-6">
                <CardTitle className="text-base lg:text-lg">Priority Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {priorityTasks.slice(0, 4).map((task) => (
                    <div key={task.id} className="flex items-start space-x-3 p-2 lg:p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs lg:text-sm text-gray-900 truncate">{task.title}</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                            task.priority === "high" ? "bg-red-100 text-red-700" :
                            task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500 truncate">{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Conversion Funnel */}
          <Card>
            <CardHeader className="pb-3 lg:pb-6">
              <CardTitle className="text-base lg:text-lg">Lead Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={conversionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={12} />
                  <YAxis dataKey="name" type="category" width={60} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7C3AED" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
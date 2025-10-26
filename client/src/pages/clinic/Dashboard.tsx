import { useState, useEffect } from "react";
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
  CheckCircle
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Calculate metrics
  const newLeads = leads.filter(lead => lead.status === "new").length;
  const todayAppointments = appointments.filter(apt => apt.date === "2024-01-16").length;
  const conversionRate = Math.round((leads.filter(lead => lead.status === "qualified").length / leads.length) * 100);
  const activePatients = 120; // Mock data

  const priorityTasks = tasks.filter(task => task.priority === "high" && task.status === "pending");

  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && (
        <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      )}
      {isMobile && <ClinicNavigation />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-7xl mx-auto">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Welcome back, Dr. Rao</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">Here's what's happening at your clinic today</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-2.5 w-full sm:w-64 md:w-80 rounded-lg border-gray-300 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-2.5 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
                
                {/* Profile */}
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 px-3 py-2.5 hover:bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium text-sm hidden sm:block text-gray-700">Dr. Rao</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm font-medium mb-2">New Leads</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{newLeads}</p>
                      <p className="text-green-600 text-xs font-medium">↑ 12% from last week</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm font-medium mb-2">Appointments Today</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{todayAppointments}</p>
                      <p className="text-gray-500 text-xs font-medium">3 pending confirmation</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm font-medium mb-2">Conversion Rate</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{conversionRate}%</p>
                      <p className="text-green-600 text-xs font-medium">↑ 5% from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm font-medium mb-2">Active Patients</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{activePatients}</p>
                      <p className="text-gray-500 text-xs font-medium">8 new this week</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          {/* Charts and Tasks Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Appointment Trends */}
              <Card className="lg:col-span-2 border-0 shadow-md">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-900">
                    <span>Weekly Appointment Trends</span>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={appointmentTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" fontSize={12} stroke="#6b7280" />
                      <YAxis fontSize={12} stroke="#6b7280" />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="appointments" 
                        stroke="#7C3AED" 
                        strokeWidth={3}
                        dot={{ fill: "#7C3AED", strokeWidth: 2, r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Priority Tasks */}
              <Card className="border-0 shadow-md">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">Priority Tasks</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    {priorityTasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 mb-1">{task.title}</p>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                              task.priority === "high" ? "bg-red-100 text-red-700" :
                              task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-xs text-gray-500">{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

          {/* Lead Conversion Funnel */}
            <Card className="border-0 shadow-md">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Lead Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={conversionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" fontSize={12} stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" width={80} fontSize={12} stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#7C3AED" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ClinicNavigation from "@/components/clinic/ClinicNavigation";
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Phone,
  User,
  Clock,
  Plus
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  doctor: string;
  type: string;
  status: "confirmed" | "scheduled" | "pending";
  notes: string;
}

export default function Appointments() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 16)); // January 16, 2024
  const [selectedDate, setSelectedDate] = useState(16);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const todayAppointments: Appointment[] = [
    {
      id: "P001",
      patientName: "Priya Sharma",
      patientId: "P001",
      time: "10:00",
      doctor: "Dr. Rao",
      type: "Initial Consultation",
      status: "confirmed",
      notes: "First fertility consultation"
    },
    {
      id: "P002",
      patientName: "Rajesh & Kavya Reddy",
      patientId: "P002",
      time: "11:30",
      doctor: "Dr. Mehta",
      type: "Ultrasound Scan",
      status: "confirmed",
      notes: "Follicular monitoring"
    },
    {
      id: "P003",
      patientName: "Anita Patel",
      patientId: "P003",
      time: "14:00",
      doctor: "Dr. Rao",
      type: "IUI Procedure",
      status: "scheduled",
      notes: "IUI cycle 2"
    }
  ];

  const weekStats = {
    scheduled: 2,
    confirmed: 2,
    pending: 1,
    total: 5
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getAppointmentsForDate = (day: number) => {
    if (day === 16) return 3;
    if (day === 17) return 2;
    return 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "scheduled": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && (
        <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      )}
      {isMobile && <ClinicNavigation />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Appointments</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">Manage patient appointments and scheduling</p>
            </div>
            
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3 w-full sm:w-auto rounded-lg shadow-md hover:shadow-lg transition-all">
              <Plus className="w-4 h-4 mr-2" />
              <span>New Appointment</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Section - Takes 2 columns on desktop */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-md h-full">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handlePrevMonth}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleNextMonth}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 md:gap-3">
                      {/* Day Headers */}
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-xs md:text-sm font-medium text-gray-600 pb-2">
                          {day}
                        </div>
                      ))}
                      
                      {/* Empty cells for days before month starts */}
                      {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                      ))}
                      
                      {/* Calendar days */}
                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const appointments = getAppointmentsForDate(day);
                        const isSelected = day === selectedDate;
                        const isToday = day === 16;
                        
                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedDate(day)}
                            className={`
                              aspect-square rounded-lg p-1 md:p-2 text-center transition-all
                              hover:bg-gray-100 relative
                              ${isSelected ? 'bg-purple-600 text-white hover:bg-purple-700' : ''}
                              ${isToday && !isSelected ? 'bg-purple-50 border-2 border-purple-600' : ''}
                            `}
                          >
                            <div className={`text-sm md:text-base font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                              {day}
                            </div>
                            {appointments > 0 && (
                              <div className={`text-xs mt-0.5 md:mt-1 ${isSelected ? 'text-purple-100' : 'text-purple-600'} font-medium`}>
                                {appointments} apt{appointments > 1 ? 's' : ''}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Appointments Sidebar */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-md h-full">
                  <CardHeader className="p-4 md:p-6 border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Today's Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                            {appointment.patientName}
                          </h3>
                          <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-2">ID: {appointment.patientId}</p>
                        
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center text-sm text-gray-700">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <User className="w-4 h-4 mr-2 text-gray-500" />
                            {appointment.doctor}
                          </div>
                        </div>
                        
                        <p className="font-medium text-sm text-gray-900 mb-1">{appointment.type}</p>
                        <p className="text-xs text-gray-600 mb-3">{appointment.notes}</p>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs"
                          >
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Week Overview Statistics */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">This Week's Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                        {weekStats.scheduled}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">Scheduled</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-bold text-green-600 mb-1">
                        {weekStats.confirmed}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">Confirmed</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-bold text-yellow-600 mb-1">
                        {weekStats.pending}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">Pending</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-center">
                      <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">
                        {weekStats.total}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">Total</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

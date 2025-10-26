
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClinicNavigation from "@/components/clinic/ClinicNavigation";
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Calendar,
  Filter
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Sep", leads: 45, consultations: 32, conversions: 16 },
  { month: "Oct", leads: 52, consultations: 38, conversions: 22 },
  { month: "Nov", leads: 48, consultations: 35, conversions: 18 },
  { month: "Dec", leads: 58, consultations: 42, conversions: 26 },
  { month: "Jan", leads: 64, consultations: 48, conversions: 30 }
];

const treatmentData = [
  { name: "IVF", value: 45, color: "#7C3AED" },
  { name: "IUI", value: 30, color: "#C4B5FD" },
  { name: "ICSI", value: 15, color: "#3B82F6" },
  { name: "Other", value: 10, color: "#10B981" }
];

const outcomeData = [
  { month: "Sep", successRate: 32 },
  { month: "Oct", successRate: 35 },
  { month: "Nov", successRate: 28 },
  { month: "Dec", successRate: 42 },
  { month: "Jan", successRate: 38 }
];

export default function Reports() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedReport, setSelectedReport] = useState("monthly");
  const [selectedPeriod, setSelectedPeriod] = useState("last6months");

  return (
    <div className="flex h-screen bg-gray-50">
      <ClinicNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-3 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">Reports & Analytics</h1>
              <p className="text-sm md:text-base text-gray-600 truncate">Track performance and generate insights</p>
            </div>
            
            <div className="export-buttons">
              <button className="export-button">
                <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden xs:inline">Download PDF</span>
                <span className="xs:hidden">PDF</span>
              </button>
              <button className="export-button">
                <FileText className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden xs:inline">Export Excel</span>
                <span className="xs:hidden">Excel</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-3 md:p-6">
          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <Card className="overflow-visible">
              <CardContent className="p-3 md:p-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <div className="relative">
                  <select 
                    value={selectedReport}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    style={{
                      backgroundImage: 'none',
                    }}
                  >
                    <option value="monthly" className="bg-white text-gray-900 py-3">Monthly Overview</option>
                    <option value="outcomes" className="bg-white text-gray-900 py-3">Treatment Outcomes</option>
                    <option value="financial" className="bg-white text-gray-900 py-3">Financial Summary</option>
                    <option value="patient" className="bg-white text-gray-900 py-3">Patient Demographics</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-visible">
              <CardContent className="p-3 md:p-4">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <div className="relative">
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full appearance-none cursor-pointer bg-gradient-to-r from-white to-purple-50/30 border-2 border-purple-200 rounded-2xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-purple-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    style={{
                      backgroundImage: 'none',
                    }}
                  >
                    <option value="last3months" className="bg-white text-gray-900 py-3">Last 3 Months</option>
                    <option value="last6months" className="bg-white text-gray-900 py-3">Last 6 Months</option>
                    <option value="lastyear" className="bg-white text-gray-900 py-3">Last Year</option>
                    <option value="custom" className="bg-white text-gray-900 py-3">Custom Range</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardContent className="p-3 md:p-4 flex items-end">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-xs md:text-sm font-semibold py-3">
                  <Filter className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <Card>
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-600 truncate">Total Patients</p>
                    <p className="text-xl md:text-3xl font-bold text-gray-900">248</p>
                    <p className="text-xs text-green-600">+12% vs last</p>
                  </div>
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-600 truncate">Success Rate</p>
                    <p className="text-xl md:text-3xl font-bold text-gray-900">38%</p>
                    <p className="text-xs text-green-600">+3% vs last</p>
                  </div>
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-purple-500 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-600 truncate">Revenue</p>
                    <p className="text-xl md:text-3xl font-bold text-gray-900">₹32L</p>
                    <p className="text-xs text-green-600">+8% vs last</p>
                  </div>
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-500 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-600 truncate">Avg. Cycle Time</p>
                    <p className="text-xl md:text-3xl font-bold text-gray-900">42</p>
                    <p className="text-xs text-gray-600">days</p>
                  </div>
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-orange-500 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Lead Conversion Trends */}
            <Card>
              <CardHeader className="p-3 md:p-6">
                <CardTitle className="text-sm md:text-lg">Lead Conversion Trends</CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} name="Leads" />
                    <Line type="monotone" dataKey="consultations" stroke="#7C3AED" strokeWidth={2} name="Consultations" />
                    <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Treatment Distribution */}
            <Card>
              <CardHeader className="p-3 md:p-6">
                <CardTitle className="text-sm md:text-lg">Treatment Type Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-6 pt-0">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={treatmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelStyle={{ fontSize: '12px' }}
                    >
                      {treatmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Success Rate Trends */}
          <Card className="mb-4 md:mb-6">
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-sm md:text-lg">Treatment Success Rate Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={outcomeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="successRate" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Report Summary */}
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="text-sm md:text-lg">Report Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Key Insights</h4>
                  <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                    <li>• Lead volume increased by 12% compared to previous period</li>
                    <li>• IVF treatments showed highest success rate at 45%</li>
                    <li>• Average patient age is 31 years</li>
                    <li>• Peak consultation hours are 10 AM - 2 PM</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Recommendations</h4>
                  <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                    <li>• Focus marketing efforts on 28-35 age demographic</li>
                    <li>• Optimize appointment scheduling for peak hours</li>
                    <li>• Enhance IUI protocols to improve success rates</li>
                    <li>• Implement patient education programs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

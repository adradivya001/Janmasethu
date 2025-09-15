import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserCheck, 
  BarChart3, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Heart
} from "lucide-react";

interface NavigationItem {
  key: string;
  href: string;
  icon: React.ComponentType<any>;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { key: "dashboard", href: "/clinic/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { key: "leads", href: "/clinic/leads", icon: Users, label: "Lead Management" },
  { key: "appointments", href: "/clinic/appointments", icon: Calendar, label: "Appointments" },
  { key: "patients", href: "/clinic/patients", icon: UserCheck, label: "Patients" },
  { key: "reports", href: "/clinic/reports", icon: BarChart3, label: "Reports" },
];

interface ClinicNavigationProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export default function ClinicNavigation({ collapsed = false, onCollapsedChange }: ClinicNavigationProps) {
  const [location] = useLocation();

  const handleToggleCollapse = () => {
    onCollapsedChange?.(!collapsed);
  };

  const handleLogout = () => {
    window.location.href = "/clinic";
  };

  return (
    <div className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
      collapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Samnada Clinic</h2>
              <p className="text-xs text-gray-500">Management Portal</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleCollapse}
          className="p-1.5 hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.key} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start p-3 h-auto transition-all duration-200 ${
                  isActive 
                    ? "bg-purple-50 text-purple-700 border-r-2 border-purple-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${collapsed ? "px-2" : ""}`}
                data-testid={`nav-${item.key}`}
              >
                <Icon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start p-3 h-auto text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 ${
            collapsed ? "px-2" : ""
          }`}
          data-testid="nav-logout"
        >
          <LogOut className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
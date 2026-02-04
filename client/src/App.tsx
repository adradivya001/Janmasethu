import { Switch, Route } from "wouter";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import { JourneyProvider } from "./contexts/JourneyContext";
import { JourneySelector } from "./components/JourneySelector";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import Article from "./pages/Article";
import Treatments from "./pages/Treatments";
import Treatment from "./pages/Treatment";
import SuccessStories from "./pages/SuccessStories";
import Story from "./pages/Story";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Experts from "./pages/Experts";
import Expert from "./pages/Expert";
import Sakhi from "./pages/Sakhi";
import SakhiTry from "./pages/SakhiTry";
import Investors from "./pages/Investors";
import Tools from "./pages/Tools";
import OvulationCalculator from "./components/tools/OvulationCalculator";
import DueDateCalculator from "./components/tools/DueDateCalculator";
import PregnancyWeekByWeek from "./components/tools/PregnancyWeekByWeek";
import VaccinationScheduler from "./components/tools/VaccinationScheduler";
import NotFound from "./pages/not-found";

// Clinic Pages
import ClinicLanding from "./pages/clinic/Landing";
import ClinicDashboard from "./pages/clinic/Dashboard";
import LeadManagement from "./pages/clinic/LeadManagement";
import Appointments from "./pages/clinic/Appointments";
import Patients from "./pages/clinic/Patients";
import Reports from "./pages/clinic/Reports";

function Router() {
  return (
    <Switch>
      {/* Standalone routes without Layout */}
      <Route path="/sakhi/try" component={SakhiTry} />
      <Route path="/clinic" component={ClinicLanding} />
      <Route path="/clinic/dashboard" component={ClinicDashboard} />
      <Route path="/clinic/leads" component={LeadManagement} />
      <Route path="/clinic/appointments" component={Appointments} />
      <Route path="/clinic/patients" component={Patients} />
      <Route path="/clinic/reports" component={Reports} />

      {/* All other routes with Layout */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/knowledge-hub" component={Knowledge} />
            <Route path="/knowledge-hub/:slug" component={Article} />
            <Route path="/treatments" component={Treatments} />
            <Route path="/treatments/:slug" component={Treatment} />
            <Route path="/success-stories" component={SuccessStories} />
            <Route path="/success-stories/:slug" component={Story} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/experts" component={Experts} />
            <Route path="/experts/:slug" component={Expert} />
            <Route path="/sakhi" component={Sakhi} />
            <Route path="/investors" component={Investors} />
            <Route path="/tools" component={Tools} />
            <Route path="/tools/ovulation-calculator" component={OvulationCalculator} />
            <Route path="/tools/due-date-calculator" component={DueDateCalculator} />
            <Route path="/tools/pregnancy-week-by-week" component={PregnancyWeekByWeek} />
            <Route path="/tools/vaccination-scheduler" component={VaccinationScheduler} />
            {/* Catch-all route to redirect to home instead of 404 */}
            <Route path="/:rest*" component={Home} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <JourneyProvider>
          <JourneySelector />
          <Router />
        </JourneyProvider>
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
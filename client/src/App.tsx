import { Switch, Route } from "wouter";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import Article from "./pages/Article";
import Treatments from "./pages/Treatments";
import Treatment from "./pages/Treatment";
import LifeStages from "./pages/LifeStages";
import LifeStage from "./pages/LifeStage";
import SuccessStories from "./pages/SuccessStories";
import Story from "./pages/Story";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Experts from "./pages/Experts";
import Expert from "./pages/Expert";
import Tools from "./pages/Tools";
import Sakhi from "./pages/Sakhi";
import SakhiTry from "./pages/SakhiTry";
import Investors from "./pages/Investors";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Standalone route without Layout */}
      <Route path="/sakhi/try" component={SakhiTry} />

      {/* All other routes with Layout */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/knowledge" component={Knowledge} />
            <Route path="/knowledge/:slug" component={Article} />
            <Route path="/treatments" component={Treatments} />
            <Route path="/treatments/:slug" component={Treatment} />
            <Route path="/life-stages" component={LifeStages} />
            <Route path="/life-stages/:slug" component={LifeStage} />
            <Route path="/success-stories" component={SuccessStories} />
            <Route path="/success-stories/:slug" component={Story} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/experts" component={Experts} />
            <Route path="/experts/:id" component={Expert} />
            <Route path="/tools" component={Tools} />
            <Route path="/sakhi" component={Sakhi} />
            <Route path="/investors" component={Investors} />
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
        <Router />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
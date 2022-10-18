import {useEffect} from "react";
import FooterBar from "./components/FooterBar";
import PanelPage from "./features/users/PanelPage";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Qualifications from "./pages/Qualifications";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import "./App.css";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { currentMode }  = useSelector((state) => state.mode);
  useEffect(() => {
    console.log('location');
    }, []);   
  return (
    <div className={currentMode ? "app__wrapper dark__background" : "app__wrapper"}>
       <Router>
          <Routes>
            <Route path="/*" element={<PanelPage /> }> 
              <Route index element={<About />} />
              <Route path="about" element={<About />} />
              <Route path="qualifications" element={<Qualifications />} />
              <Route path="skills" element={<Skills />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <FooterBar />
      </Router>
    </div>
  );
}

export default App;

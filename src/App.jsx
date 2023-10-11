import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gedung from "./pages/Gedung";
import Qr from "./pages/Qr";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gedung />} />
        <Route path="/qr" element={<Qr />} />
      </Routes>
    </Router>
  );
}

export default App;

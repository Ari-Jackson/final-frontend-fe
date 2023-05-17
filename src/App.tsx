import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Show from "./pages/Show";
import Edit from "./pages/Edit";

export default function App() {
  return (
    <>
      <Router>
        <main>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Index />} />
            <Route path="/books/new" element={<New />} />
            <Route path="/books/:id" element={<Show />} />
            <Route path="/books/:id/edit" element={<Edit />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </>
  );
}

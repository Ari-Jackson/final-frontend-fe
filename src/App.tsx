import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/global/NavBar";
import Footer from "./components/global/Footer";
import Home from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import PageWrapper from "./components/global/PageWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar />
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Index />} />
              <Route path="/books/new" element={<New />} />
              <Route path="/books/:id" element={<Show />} />
              <Route path="/books/:id/edit" element={<Edit />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </PageWrapper>
          <Footer />
        </Router>
      </QueryClientProvider>
    </>
  );
}

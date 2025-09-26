import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import AppLoader from "./components/Loader/AppLoader";
import Cart from "./pages/Cart"

function App() {
  return (
    <AppLoader>
      <div className="app">
        <Header />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </AppLoader>
  );
}

export default App;

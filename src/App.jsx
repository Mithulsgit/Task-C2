import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Articles from "./components/Articles";
import FeaturedArticles from "./components/FeaturedArticles";
import Tutorials from "./components/Tutorials";
import Photos from "./components/Photos";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import Pricing from "./pages/Pricing";
import NewPost from "./pages/NewPost";

function Home() {
  return (
    <>
      <Header />
      <Hero />

      <main>
        <Profile />
        <Articles />
        <FeaturedArticles />
        <Tutorials />
        <Photos />
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/post" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
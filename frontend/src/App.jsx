import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink
} from "react-router-dom"

import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"

import Home from "./pages/Home.jsx"
import Read from "./pages/Read.jsx"
import ReadById from "./pages/ReadById.jsx"
import Upload from "./pages/Upload.jsx"

export default function App() {
  return (
    <BrowserRouter>

      <div className="app-container">

        <Header />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<Read />} />
            <Route path="/read/:id" element={<ReadById />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}
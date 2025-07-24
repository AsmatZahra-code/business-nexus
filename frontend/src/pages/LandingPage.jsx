import React, { useState } from "react";

import { Link } from "react-router-dom";
import heroBg from "../assets/BG.png";
import sophia from "../assets/sophia.png";
import ethan from "../assets/ethan.png";
import olivia from "../assets/olivia.png";
import logo from "../assets/busLogo.png";
import network from "../assets/network.png";
import match from "../assets/match.png";
import collaborate from "../assets/collaborate.png";
import growthIcon from "../assets/growth.png";
import connectIcon from "../assets/connect.png";
import profileIcon from "../assets/profile.png";
import { Menu, X } from "lucide-react"
const LandingPage = () => {
     const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-sans text-gray-900 ">
      {/* Navbar */}
     
<nav className="px-6 py-4 shadow-md bg-white">
        <div className="flex items-center justify-between">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Business Nexus Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-800">Business Nexus</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
            <div className="space-y-2">
              <Link
                to="/register"
                className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block text-sm px-4 py-2 border rounded hover:bg-gray-100"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Hero Section */}
      <header
        className="bg-cover bg-center h-[500px] flex items-center justify-center text-white text-center px-4 "
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect, Collaborate, and Grow Your Business
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Business Nexus is the premier platform for entrepreneurs and
            investors to connect, collaborate, and drive business growth.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register?role=investor"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Join as Investor
            </Link>
            <Link
              to="/register?role=entrepreneur"
              className="bg-white text-gray-800 px-6 py-2 rounded border hover:bg-gray-100"
            >
              Join as Entrepreneur
            </Link>
          </div>
        </div>
      </header>

      {/* Testimonials */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sophia Carter",
              title: "Founder of InnovateTech",
              quote:
                "Business Nexus has been instrumental in connecting me with the right investors for my startup. The platform's intuitive interface and powerful networking tools have made fundraising efficient and effective.",
              img: sophia,
            },
            {
              name: "Ethan Walker",
              title: "Angel Investor",
              quote:
                "As an investor, Business Nexus provides a curated selection of promising startups. The platform's collaboration features have streamlined my investment process, allowing me to engage directly with entrepreneurs.",
              img: ethan,
            },
            {
              name: "Olivia Bennett",
              title: "Venture Capitalist",
              quote:
                "Business Nexus has transformed how I network and collaborate. The platform's messaging and project management tools have significantly improved my productivity and deal flow.",
              img: olivia,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded shadow text-left overflow-hidden"
            >
              <div className="h-90 w-full">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <p className="mb-2">{testimonial.quote}</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-8">
          Unlock the Power of Business Nexus
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <div className="flex items-center gap-2 mb-2">
              <img src={network} alt="Network Icon" className="h-6 w-6" />
              <h3 className="text-lg font-bold">Extensive Network</h3>
            </div>
            <p className="text-sm">
              Connect with a diverse network of entrepreneurs and investors from
              various industries and backgrounds.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
             <div className="flex items-center gap-2 mb-2">
              <img src={match} alt="Network Icon" className="h-6 w-6 " />
              <h3 className="text-lg font-bold">Targeted Matching</h3>
            </div>
            <p className="text-sm">
              Our advanced matching algorithm connects you with the most
              relevant partners based on your profile and goals.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <div className="flex items-center gap-2 mb-2">
              <img src={collaborate} alt="Network Icon" className="h-6 w-6" />
              <h3 className="text-lg font-bold">Seamless Collaboration</h3>
            </div>
            <p className="text-sm">
              Collaborate effectively with built-in messaging, project
              management, and document sharing tools.
            </p>
          </div>
        </div>
      </section>

     
<section className="py-16 px-6">
  <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
  <div className="max-w-3xl mx-auto relative">
    <div className="absolute left-4 top-6 bottom-6 w-px bg-gray-300"></div>
    <div className="space-y-10">
      {/* Step 1 */}
      <div className="flex items-start gap-4 relative">
        <img src={profileIcon} alt="Profile Icon" className="h-6 w-6 relative z-10 bg-white" />
        <div>
          <h3 className="font-semibold text-lg">Create Your Profile</h3>
          <p className="text-gray-600">
            Showcase your expertise, projects, and investment interests to attract the right partners.
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex items-start gap-4 relative">
        <img src={connectIcon} alt="Connect Icon" className="h-6 w-6 relative z-10 bg-white" />
        <div>
          <h3 className="font-semibold text-lg">Connect and Collaborate</h3>
          <p className="text-gray-600">
            Engage with potential collaborators through our messaging and project management tools.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex items-start gap-4 relative">
        <img src={growthIcon} alt="Growth Icon" className="h-6 w-6 relative z-10 bg-white" />
        <div>
          <h3 className="font-semibold text-lg">Grow Your Business</h3>
          <p className="text-gray-600">
            Leverage our network and resources to achieve your business objectives and expand your reach.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-blue-50">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Transform Your Business? Join Business Nexus Today!
        </h2>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="flex justify-center gap-4 text-gray-400">
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            <i className="fab fa-linkedin" />
          </a>
          <a href="#">
            <i className="fab fa-facebook" />
          </a>
        </div>
        <p className="mt-4">© 2024 Business Nexus. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

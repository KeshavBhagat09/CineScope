import React from "react";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="flex overflow-hidden flex-col justify-center items-center px-20 py-14 w-full bg-zinc-950 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-[1206px]">
        {/* Sign In Button */}
        <button className="gap-2.5 self-center px-5 py-2 text-base leading-7 bg-yellow-400 rounded-xl shadow-sm min-h-[44px] text-neutral-900 hover:bg-yellow-300 transition">
          Sign in for a great experience
        </button>

        {/* Footer Content */}
        <div className="flex flex-wrap justify-between gap-10 mt-16 max-md:mt-10 max-md:max-w-full">
          {/* Socials & Branding */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-stone-300">Cinescope 🎬</h2>
            <p className="text-neutral-400 text-sm">
              Your ultimate destination for movie reviews, ratings, and all things cinema. Discover, rate, and share your love for movies with Cinescope!
            </p>
            <div className="flex gap-5 items-center">
              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-neutral-400 transition"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-neutral-400 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/your-instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white text-neutral-400 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 text-sm text-neutral-400">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/watchlist" className="hover:text-white transition">
              Watchlist
            </Link>
            <Link to="/signin" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/signup" className="hover:text-white transition">
              Register
            </Link>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-4 text-sm text-neutral-400">
            <h3 className="font-semibold text-stone-300">Contact Us</h3>
            <p>Email: <span className="text-neutral-500">support@cinescope.com</span></p>
            <p>Phone: <span className="text-neutral-500">+1 234 567 890</span></p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-sm text-neutral-500 text-center w-full border-t border-neutral-800 pt-6">
          © {new Date().getFullYear()} Cinescope. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

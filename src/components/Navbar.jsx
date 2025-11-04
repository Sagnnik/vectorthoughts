import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import Button from "./Button";

export default function Navbar() {
  const baseClasses = "hover:text-terra transition cursor-pointer underline-offset-4 hover:underline";
  const activeClasses = "text-terra font-semibold underline";
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // mobile menu
  const [ddOpen, setDdOpen] = useState(false); // small dropdown inside menu
  const ddRef = useRef(null);
  const prevSignedIn = useRef(isSignedIn);

  useEffect(() => {
    if (!prevSignedIn.current && isSignedIn) {
      setOpen(false);
      navigate("/admin");
    }
    prevSignedIn.current = isSignedIn;
  }, [isSignedIn, navigate]);

  // close dropdown if click outside
  useEffect(() => {
    function onDocClick(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) {
        setDdOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass = ({ isActive }) => `${baseClasses} ${isActive ? activeClasses : "text-gray-300"}`;

  return (
    <nav className="w-full bg-neutral-800/70 backdrop-blur-sm border-b border-gray-800 py-3 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-bold font-mono text-terra">
          <NavLink to="/" className="hover:opacity-80 transition">
            vectorThoughts
          </NavLink>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center text-lg font-mono">
          <NavLink to={isSignedIn ? "/admin" : "/"} className={navLinkClass}>Blog</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>

          <div className="relative" ref={ddRef}>
            <button
              aria-haspopup="menu"
              aria-expanded={ddOpen}
              onClick={() => setDdOpen((s) => !s)}
              className="p-2 rounded hover:bg-neutral-700/40 transition"
              title="Open menu"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-200">
                <rect y="0.5" width="20" height="2" rx="1" fill="currentColor" />
                <rect y="6" width="20" height="2" rx="1" fill="currentColor" />
                <rect y="11.5" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>

            <div
              className={`origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-20 bg-neutral-900 z-50 transform transition-all ${ddOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
              role="menu"
              aria-hidden={!ddOpen}
            >
              <div className="py-1">
                {isSignedIn ? (
                  <div className="px-4 py-2"><UserButton /></div>
                ) : (
                  <div className="px-4 py-2">
                    <SignInButton>
                      <Button variant="primary">Sign In</Button>
                    </SignInButton>
                  </div>
                )}

                <NavLink to="/request-admin" className={({ isActive }) => `block px-4 py-2 text-sm ${baseClasses} ${isActive ? activeClasses : "text-gray-300"}`} role="menuitem" onClick={() => setDdOpen(false)}>
                  Invite Link
                </NavLink>

                <NavLink to="/tags" className={({ isActive }) => `block px-4 py-2 text-sm ${baseClasses} ${isActive ? activeClasses : "text-gray-300"}`} role="menuitem" onClick={() => setDdOpen(false)}>
                  Tags
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="p-2 rounded hover:bg-neutral-700/40 transition"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden fixed inset-0 z-40 transform transition-transform ${open ? "translate-x-0" : "translate-x-full"} `} aria-hidden={!open}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

        <div className="absolute right-0 top-0 h-full w-11/12 max-w-xs bg-neutral-900 shadow-xl p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <NavLink to="/" onClick={() => setOpen(false)} className="text-xl font-bold text-terra">vectorThoughts</NavLink>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded hover:bg-neutral-800/40">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <NavLink to={isSignedIn ? "/admin" : "/"} onClick={() => setOpen(false)} className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : "text-gray-300"}`}>Blog</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : "text-gray-300"}`}>About</NavLink>

            <div className="mt-4 border-t border-gray-800 pt-4">
              {isSignedIn ? (
                <div className="mb-4"><UserButton /></div>
              ) : (
                <div className="mb-4">
                  <SignInButton>
                    <Button variant="primary">Sign In</Button>
                  </SignInButton>
                </div>
              )}

              <NavLink to="/request-admin" onClick={() => setOpen(false)} className={({ isActive }) => `block py-2 ${baseClasses} ${isActive ? activeClasses : "text-gray-300"}`}>Invite Link</NavLink>
              <NavLink to="/tags" onClick={() => setOpen(false)} className={({ isActive }) => `block py-2 ${baseClasses} ${isActive ? activeClasses : "text-gray-300"}`}>Tags</NavLink>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}

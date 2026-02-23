import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import {
  BriefcaseBusiness,
  Heart,
  PenBox,
  Home,
  Briefcase,
  Menu,
  X,
} from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  /* ── Clerk sign-in trigger via ?sign-in=true ── */
  useEffect(() => {
    if (search.get("sign-in")) setShowSignIn(true);
  }, [search]);

  /* ── Scroll glass effect ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg ${isActive(path)
      ? "text-indigo-300 bg-indigo-500/15"
      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
    }`;

  return (
    <>
      <nav
        className={`py-3 px-0 flex justify-between items-center sticky top-0 z-40 transition-all duration-300 ${scrolled
          ? "nav-glass shadow-lg shadow-indigo-900/10"
          : "bg-transparent"
          }`}
      >
        {/* ── Logo → always goes home ── */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" className="h-14" alt="Hirrd Logo" />
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={navLinkClass("/")}>
            <span className="flex items-center gap-1.5">
              <Home size={14} />
              Home
            </span>
          </Link>
          <Link to="/jobs" className={navLinkClass("/jobs")}>
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} />
              Browse Jobs
            </span>
          </Link>
        </div>

        {/* ── Auth buttons ── */}
        <div className="flex gap-3 items-center">
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(true)}
              className="border-indigo-600/50 text-indigo-300 hover:bg-indigo-600/20 hover:border-indigo-500 hover:text-indigo-200 transition-all duration-200 hidden sm:flex"
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="destructive"
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white shadow-lg shadow-indigo-900/30 transition-all duration-200 hidden sm:flex"
                >
                  <PenBox size={16} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-9 h-9 ring-2 ring-indigo-500/40 ring-offset-2 ring-offset-[#050b18]",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] z-30 nav-glass border-b border-indigo-900/30 p-4 flex flex-col gap-2">
          <Link to="/" className={navLinkClass("/")}>
            <span className="flex items-center gap-2">
              <Home size={15} /> Home
            </span>
          </Link>
          <Link to="/jobs" className={navLinkClass("/jobs")}>
            <span className="flex items-center gap-2">
              <Briefcase size={15} /> Browse Jobs
            </span>
          </Link>

          <SignedOut>
            <Button
              onClick={() => { setShowSignIn(true); setMobileOpen(false); }}
              className="mt-2 w-full border-indigo-600/50 text-indigo-300 hover:bg-indigo-600/20"
              variant="outline"
            >
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job" className="mt-1">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl">
                  <PenBox size={15} className="mr-2" /> Post a Job
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      )}

      {/* ── Clerk sign-in modal ── */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: "rgba(5,11,24,0.85)",
            backdropFilter: "blur(8px)",
          }}
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;

import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid-background" />
      <main className="flex-1 container mx-auto px-4 max-w-7xl">
        <Header />
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-indigo-900/30 bg-[#050b18]/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Hirrd Logo" className="h-8" />
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Hirrd — Find your dream job.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;

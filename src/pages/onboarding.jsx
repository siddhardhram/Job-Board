import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Briefcase, Users } from "lucide-react";

const IS_DEMO =
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes("your_");

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    // Demo mode: no real user object — just navigate directly
    if (IS_DEMO) {
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
      return;
    }
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    // Skip in demo mode — no persisted role
    if (!IS_DEMO && user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366f1" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-12">
      <div className="text-center space-y-3">
        <h2 className="gradient-title font-extrabold text-6xl sm:text-8xl tracking-tighter">
          I am a...
        </h2>
        <p className="text-slate-400 text-lg">Select your role to get started</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        <button
          onClick={() => handleRoleSelection("candidate")}
          className="glass-card group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-indigo-900/30 hover:border-indigo-500/50 hover:bg-indigo-900/20 transition-all duration-300 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
            <Users size={30} className="text-indigo-300" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-100">Candidate</p>
            <p className="text-sm text-slate-500 mt-1">Browse & apply for jobs</p>
          </div>
        </button>

        <button
          onClick={() => handleRoleSelection("recruiter")}
          className="glass-card group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-purple-900/30 hover:border-purple-500/50 hover:bg-purple-900/20 transition-all duration-300 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
            <Briefcase size={30} className="text-purple-300" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-100">Recruiter</p>
            <p className="text-sm text-slate-500 mt-1">Post & manage jobs</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;

import CreatedApplications from "@/components/created-applications";
import BackNav from "@/components/back-nav";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Briefcase, ClipboardList } from "lucide-react";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366f1" />;
  }

  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  return (
    <div className="pb-16">
      <BackNav to="/" label="Home" />
      <div className="flex items-center justify-center gap-3 mb-10">
        {isCandidate ? (
          <ClipboardList size={32} className="text-indigo-400" />
        ) : (
          <Briefcase size={32} className="text-indigo-400" />
        )}
        <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center">
          {isCandidate ? "My Applications" : "My Jobs"}
        </h1>
      </div>

      {isCandidate ? <CreatedApplications /> : <CreatedJobs />}
    </div>
  );
};

export default MyJobs;

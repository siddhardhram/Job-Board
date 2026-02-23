import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";
import { Briefcase } from "lucide-react";

const CreatedJobs = () => {
  const { user } = useUser();
  const recruiterId = user?.id ?? "demo-recruiter";

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, { recruiter_id: recruiterId });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingCreatedJobs === true) {
    return <BarLoader className="mt-4" width={"100%"} color="#6366f1" />;
  }

  return (
    <div>
      {createdJobs?.length ? (
        <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onJobAction={fnCreatedJobs}
              isMyJob
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500">
          <Briefcase size={48} className="mx-auto mb-4 text-slate-600" />
          <p className="text-xl font-semibold">No Jobs Posted Yet</p>
          <p className="text-sm mt-1">Use the "Post a Job" button to create your first listing.</p>
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;

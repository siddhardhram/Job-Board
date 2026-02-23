import { getSavedJobs } from "@/api/apiJobs";
import BackNav from "@/components/back-nav";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Heart } from "lucide-react";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366f1" />;
  }

  return (
    <div className="pb-16">
      <BackNav to="/jobs" label="Browse Jobs" />
      <div className="flex items-center justify-center gap-3 mb-10">
        <Heart size={32} className="text-pink-500 fill-pink-500" />
        <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center">
          Saved Jobs
        </h1>
      </div>

      {loadingSavedJobs === false && (
        <div>
          {savedJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedJobs.map((saved) => (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              <Heart size={48} className="mx-auto mb-4 text-slate-600" />
              <p className="text-xl font-semibold">No Saved Jobs</p>
              <p className="mt-1 text-sm">
                Browse jobs and click the heart to save them here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;

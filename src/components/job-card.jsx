/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const IS_DEMO =
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes("your_");

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => { },
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const handleSaveJob = async () => {
    // Toggle optimistically so the user sees instant feedback
    setSaved((prev) => !prev);
    await fnSavedJob({
      // In demo mode user is null — use a stable fallback id
      user_id: user?.id ?? "demo-user",
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    // Sync with server response (real mode)
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  const previewText = job.description
    ? job.description.substring(0, job.description.indexOf(".") + 1) ||
    job.description.substring(0, 120) + "..."
    : "";

  return (
    <Card className="glass-card flex flex-col border-indigo-900/30 bg-[#0a1628]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-900/20 hover:-translate-y-1">
      {loadingDeleteJob && (
        <BarLoader width={"100%"} color="#6366f1" height={2} />
      )}

      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-start gap-2 font-bold text-slate-100">
          <span className="leading-snug">{job.title}</span>
          {isMyJob && (
            <button
              onClick={handleDeleteJob}
              className="text-slate-500 hover:text-red-400 transition-colors shrink-0 mt-0.5"
              title="Delete job"
            >
              <Trash2Icon size={17} />
            </button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1 pt-0">
        <div className="flex items-center justify-between">
          {job.company && (
            <span className="text-sm font-medium text-slate-300">
              {job.company.name}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <MapPinIcon size={13} className="text-indigo-400" />
            {job.location}
          </div>
        </div>

        {/* Status badge */}
        <div className="flex gap-2">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${job.isOpen
                ? "bg-green-900/30 text-green-400 border border-green-700/40"
                : "bg-red-900/30 text-red-400 border border-red-700/40"
              }`}
          >
            {job.isOpen ? "🟢 Open" : "🔴 Closed"}
          </span>
          {job.applications?.length > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-indigo-900/30 text-indigo-300 border border-indigo-700/40">
              {job.applications.length} applicant{job.applications.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <hr className="border-indigo-900/30" />
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
          {previewText}
        </p>
      </CardContent>

      <CardFooter className="flex gap-3 pt-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button
            variant="secondary"
            className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white border border-indigo-700/40 hover:border-indigo-500 transition-all duration-200"
          >
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
            title={saved ? "Remove from saved" : "Save job"}
            className={`shrink-0 border-indigo-700/40 transition-all duration-200 ${saved
                ? "bg-pink-500/20 border-pink-500/50 hover:bg-pink-500/30"
                : "hover:bg-slate-700/50"
              }`}
          >
            <Heart
              size={17}
              className={saved ? "fill-pink-500 stroke-pink-500" : "stroke-slate-400"}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;

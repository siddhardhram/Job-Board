import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import BackNav from "@/components/back-nav";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  Heart,
  MapPinIcon,
  Users,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";
import useFetch from "@/hooks/use-fetch";
import { getSingleJob, saveJob, updateHiringStatus } from "@/api/apiJobs";

const IS_DEMO =
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes("your_");

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  /* ── Load job ── */
  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });

  useEffect(() => {
    if (isLoaded) fnJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  /* ── Hiring status (recruiter only) ── */
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    { job_id: id }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  /* ── Save / like ── */
  const [saved, setSaved] = useState(false);
  const { loading: loadingSave, data: savedData, fn: fnSave } = useFetch(
    saveJob,
    { alreadySaved: saved }
  );

  const handleSave = async () => {
    setSaved((prev) => !prev); // optimistic toggle
    await fnSave({ user_id: user?.id ?? "demo-user", job_id: Number(id) });
  };

  useEffect(() => {
    if (savedData !== undefined) setSaved(savedData?.length > 0);
  }, [savedData]);

  /* ── Loading guard ──
     In demo mode loadingJob goes null → false (not null → true → false),
     so we only show the spinner if it's explicitly true or still null
     after a short render cycle. */
  if (!isLoaded || loadingJob === true) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366f1" />;
  }

  if (!job) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-xl font-semibold">Job not found</p>
        <BackNav to="/jobs" label="Browse all jobs" />
      </div>
    );
  }

  const isRecruiter = IS_DEMO ? false : job?.recruiter_id === user?.id;

  return (
    <div className="flex flex-col gap-8 mt-6 pb-16 max-w-4xl mx-auto">
      <BackNav to="/jobs" label="All Jobs" />

      {/* ── Title row ── */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row justify-between items-start sm:items-center">
        <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl leading-tight">
          {job.title}
        </h1>
        {job.company?.logo_url && (
          <img
            src={job.company.logo_url}
            className="h-12 object-contain opacity-80"
            alt={job.company.name}
          />
        )}
      </div>

      {/* ── Meta badges ── */}
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="flex items-center gap-1.5 bg-indigo-900/20 px-3 py-1.5 rounded-full border border-indigo-900/40 text-slate-400">
          <MapPinIcon size={14} className="text-indigo-400" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5 bg-indigo-900/20 px-3 py-1.5 rounded-full border border-indigo-900/40 text-slate-400">
          <Users size={14} className="text-indigo-400" />
          {job.applications?.length ?? 0} Applicant{(job.applications?.length ?? 0) !== 1 ? "s" : ""}
        </span>
        <span
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${job.isOpen
              ? "bg-green-900/20 border-green-700/40 text-green-400"
              : "bg-red-900/20 border-red-700/40 text-red-400"
            }`}
        >
          {job.isOpen ? <DoorOpen size={14} /> : <DoorClosed size={14} />}
          {job.isOpen ? "Hiring Open" : "Hiring Closed"}
        </span>
        <span className="flex items-center gap-1.5 bg-indigo-900/20 px-3 py-1.5 rounded-full border border-indigo-900/40 text-slate-400">
          <Briefcase size={14} className="text-indigo-400" />
          {job.company?.name}
        </span>
      </div>

      {/* ── Save button ── */}
      <div className="flex items-center gap-3">
        <Button
          onClick={handleSave}
          disabled={loadingSave}
          variant="outline"
          className={`gap-2 rounded-xl border transition-all duration-200 ${saved
              ? "bg-pink-500/20 border-pink-500/50 text-pink-300 hover:bg-pink-500/30"
              : "border-indigo-700/50 text-slate-400 hover:bg-indigo-900/20 hover:text-slate-200"
            }`}
        >
          <Heart
            size={17}
            className={saved ? "fill-pink-500 stroke-pink-500" : ""}
          />
          {saved ? "Saved to My List" : "Save Job"}
        </Button>
      </div>

      {/* ── Recruiter status toggle ── */}
      {isRecruiter && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full rounded-xl border ${job.isOpen
                ? "bg-green-950/40 border-green-700/40 text-green-300"
                : "bg-red-950/40 border-red-700/40 text-red-300"
              }`}
          >
            <SelectValue placeholder={"Hiring Status — " + (job.isOpen ? "Open" : "Closed")} />
          </SelectTrigger>
          <SelectContent className="bg-[#0d1f3c] border-indigo-900/50">
            <SelectItem value="open" className="text-green-400">Open</SelectItem>
            <SelectItem value="closed" className="text-red-400">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* ── About the job ── */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-900/30 space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">About the job</h2>
        <p className="text-slate-400 leading-relaxed sm:text-lg">{job.description}</p>
      </div>

      {/* ── Requirements ── */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-900/30 space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
          What we are looking for
        </h2>
        <MDEditor.Markdown
          source={job.requirements}
          className="bg-transparent sm:text-lg text-slate-300 [&_li]:text-slate-400 [&_li]:leading-loose"
        />
      </div>

      {/* ── Apply (candidates) ── */}
      {!isRecruiter && (
        <div className="flex justify-start">
          <ApplyJobDrawer
            job={job}
            user={user}
            fetchJob={fnJob}
            applied={job?.applications?.find(
              (ap) => ap.candidate_id === (user?.id ?? "demo-user")
            )}
          />
        </div>
      )}

      {loadingHiringStatus && <BarLoader width={"100%"} color="#6366f1" />}

      {/* ── Applications (recruiter) ── */}
      {job?.applications?.length > 0 && isRecruiter && (
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl text-slate-100">
            Applications ({job.applications.length})
          </h2>
          {job.applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;

/* eslint-disable react/prop-types */
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const statusColors = {
  applied: "text-blue-400",
  interviewing: "text-yellow-400",
  hired: "text-green-400",
  rejected: "text-red-400",
};

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    { job_id: application.job_id }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card className="glass-card border border-indigo-900/30 bg-[#0a1628]/60 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-200">
      {loadingHiringStatus && <BarLoader width={"100%"} color="#6366f1" height={2} />}

      <CardHeader>
        <CardTitle className="flex justify-between items-start font-bold text-slate-100 gap-3">
          <span className="leading-snug">
            {isCandidate
              ? `${application?.job?.title} at ${application?.job?.company?.name}`
              : application?.name}
          </span>
          <button
            onClick={handleDownload}
            title="Download Resume"
            className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-indigo-500/30 flex items-center justify-center transition-colors"
          >
            <Download size={14} className="text-slate-300" />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <BriefcaseBusiness size={14} className="text-indigo-400" />
            {application?.experience} yr{application?.experience !== 1 ? "s" : ""} experience
          </div>
          <div className="flex items-center gap-1.5">
            <School size={14} className="text-indigo-400" />
            {application?.education}
          </div>
          <div className="flex items-center gap-1.5">
            <Boxes size={14} className="text-indigo-400" />
            {application?.skills}
          </div>
        </div>
        <hr className="border-indigo-900/30" />
      </CardContent>

      <CardFooter className="flex justify-between items-center flex-wrap gap-3">
        <span className="text-xs text-slate-500">
          {new Date(application?.created_at).toLocaleString()}
        </span>
        {isCandidate ? (
          <span
            className={`text-sm font-bold capitalize ${statusColors[application.status] || "text-slate-300"
              }`}
          >
            {application.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-44 bg-[#0a1628]/80 border-indigo-900/50 text-slate-300 rounded-xl h-9 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1f3c] border-indigo-900/50">
              <SelectItem value="applied" className="text-blue-400">Applied</SelectItem>
              <SelectItem value="interviewing" className="text-yellow-400">Interviewing</SelectItem>
              <SelectItem value="hired" className="text-green-400">Hired</SelectItem>
              <SelectItem value="rejected" className="text-red-400">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;

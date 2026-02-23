import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { ClipboardList } from "lucide-react";

const CreatedApplications = () => {
  const { user } = useUser();
  const userId = user?.id ?? "demo-user";

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, { user_id: userId });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingApplications === true) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366f1" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.length ? (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        ))
      ) : (
        <div className="text-center py-16 text-slate-500">
          <ClipboardList size={48} className="mx-auto mb-4 text-slate-600" />
          <p className="text-xl font-semibold">No Applications Yet</p>
          <p className="text-sm mt-1">Browse jobs and apply to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;

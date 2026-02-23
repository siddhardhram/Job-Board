import { useSession } from "@clerk/clerk-react";
import { useState } from "react";
import {
  MOCK_JOBS,
  MOCK_COMPANIES,
  getMockSavedJobs,
  toggleMockSave,
  addMockJob,
} from "@/data/mock-data";

const IS_DEMO =
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes("your_");

/* ─────────────────────────────────────────────
   Mock dispatch — maps real API fn names to
   local mock implementations with full filter
   support so the UI works in demo mode.
───────────────────────────────────────────── */
function mockDispatch(cbName, options, extraArgs) {
  switch (cbName) {
    /* ── Jobs ── */
    case "getJobs": {
      const { location, company_id, searchQuery } = options;
      let results = [...MOCK_JOBS];
      if (location)
        results = results.filter((j) => j.location === location);
      if (company_id)
        // company_id from Radix Select is always a string; compare as string
        results = results.filter(
          (j) => String(j.company_id) === String(company_id)
        );
      if (searchQuery)
        results = results.filter((j) =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return results;
    }

    case "getSingleJob": {
      const { job_id } = options;
      return MOCK_JOBS.find((j) => j.id === Number(job_id)) || null;
    }

    case "getMyJobs": {
      const { recruiter_id } = options;
      return MOCK_JOBS.filter((j) => j.recruiter_id === recruiter_id);
    }

    case "addNewJob": {
      const [jobData] = extraArgs;
      return addMockJob(jobData);
    }

    case "deleteJob": {
      const { job_id } = options;
      const idx = MOCK_JOBS.findIndex((j) => j.id === Number(job_id));
      if (idx >= 0) MOCK_JOBS.splice(idx, 1);
      return [];
    }

    case "updateHiringStatus": {
      const { job_id } = options;
      const [isOpen] = extraArgs;
      const job = MOCK_JOBS.find((j) => j.id === Number(job_id));
      if (job) job.isOpen = isOpen;
      return [job];
    }

    /* ── Saved Jobs ── */
    case "getSavedJobs":
      return getMockSavedJobs();

    case "saveJob": {
      const [saveData] = extraArgs;
      return toggleMockSave(saveData.job_id);
    }

    /* ── Companies ── */
    case "getCompanies":
      return MOCK_COMPANIES;

    case "addNewCompany": {
      const [companyData] = extraArgs;
      const newCompany = {
        id: MOCK_COMPANIES.length + 1,
        name: companyData.name,
        logo_url: "",          // no real upload in demo
      };
      MOCK_COMPANIES.push(newCompany);
      return [newCompany];
    }

    /* ── Applications ── */
    case "applyToJob": {
      const [appData] = extraArgs;
      const job = MOCK_JOBS.find((j) => j.id === appData.job_id);
      if (job) {
        job.applications.push({
          id: Date.now(),
          candidate_id: appData.candidate_id || "demo-user",
          name: appData.name || "Demo User",
          experience: appData.experience,
          skills: appData.skills,
          education: appData.education,
          status: "applied",
          created_at: new Date().toISOString(),
        });
      }
      return [{ id: Date.now() }];
    }

    case "getApplications":
      return [];

    case "updateApplicationStatus":
      return [];

    default:
      return null;
  }
}

/* ─────────────────────────────────────────────
   useFetch hook
───────────────────────────────────────────── */
const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      if (IS_DEMO || !session) {
        // Small async tick so React batches the state update
        await Promise.resolve();
        const result = mockDispatch(cb.name, options, args);
        setData(result);
      } else {
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        const response = await cb(supabaseAccessToken, options, ...args);
        setData(response);
      }
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;

import { getCompanies } from "@/api/apiCompanies";
import BackNav from "@/components/back-nav";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const IS_DEMO =
  !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes("your_");

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCreateJob]);

  const onSubmit = (data) => {
    fnCreateJob({ ...data, recruiter_id: user?.id || "demo-recruiter", isOpen: true });
  };

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366f1" />;
  }

  // In demo mode skip role check — show the page to everyone
  if (!IS_DEMO && user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="pb-16 max-w-3xl mx-auto">
      <BackNav to="/jobs" label="Browse Jobs" />
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-10">
        Post a Job
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 glass-card p-8 rounded-2xl border border-indigo-900/30"
      >
        {/* Title */}
        <div>
          <Input
            placeholder="Job Title"
            {...register("title")}
            className="bg-[#0a1628]/80 border-indigo-900/50 focus:border-indigo-500 text-slate-200 placeholder:text-slate-500 rounded-xl h-12"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Textarea
            placeholder="Job Description"
            {...register("description")}
            className="bg-[#0a1628]/80 border-indigo-900/50 focus:border-indigo-500 text-slate-200 placeholder:text-slate-500 rounded-xl min-h-[100px]"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Location + Company */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-[#0a1628]/80 border-indigo-900/50 text-slate-300 rounded-xl h-12">
                    <SelectValue placeholder="Job Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-indigo-900/50">
                    <SelectGroup>
                      {State.getStatesOfCountry("IN").map(({ name }) => (
                        <SelectItem key={name} value={name} className="text-slate-300 focus:bg-indigo-900/40">
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location && (
              <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          <div className="flex-1">
            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-[#0a1628]/80 border-indigo-900/50 text-slate-300 rounded-xl h-12">
                    <SelectValue placeholder="Company">
                      {field.value
                        ? companies?.find((c) => c.id === Number(field.value))?.name
                        : "Company"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#0d1f3c] border-indigo-900/50">
                    <SelectGroup>
                      {companies?.map(({ name, id }) => (
                        <SelectItem key={id} value={id} className="text-slate-300 focus:bg-indigo-900/40">
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.company_id && (
              <p className="text-red-400 text-sm mt-1">{errors.company_id.message}</p>
            )}
          </div>

          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>

        {/* Requirements MD Editor */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Requirements</label>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.requirements && (
            <p className="text-red-400 text-sm mt-1">{errors.requirements.message}</p>
          )}
        </div>

        {errorCreateJob?.message && (
          <p className="text-red-400 text-sm">{errorCreateJob.message}</p>
        )}

        {loadingCreateJob && <BarLoader width={"100%"} color="#6366f1" />}

        <Button
          type="submit"
          className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white font-semibold text-base shadow-lg shadow-indigo-900/30 transition-all"
        >
          Post Job
        </Button>
      </form>
    </div>
  );
};

export default PostJob;

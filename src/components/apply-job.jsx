/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import { Briefcase } from "lucide-react";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className={
            job?.isOpen && !applied
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl px-8 shadow-lg shadow-indigo-900/30 transition-all"
              : "bg-slate-700 text-slate-400 rounded-xl px-8 cursor-not-allowed"
          }
          disabled={!job?.isOpen || applied}
        >
          <Briefcase size={17} className="mr-2" />
          {job?.isOpen ? (applied ? "Applied ✓" : "Apply Now") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-[#0d1f3c] border-t border-indigo-900/50">
        <DrawerHeader>
          <DrawerTitle className="text-slate-100 text-xl font-bold">
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription className="text-slate-400">
            Please fill in the form below carefully
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          {/* Experience */}
          <div>
            <Input
              type="number"
              placeholder="Years of Experience"
              className="bg-[#0a1628]/80 border-indigo-900/50 focus:border-indigo-500 text-slate-200 placeholder:text-slate-500 rounded-xl h-11"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-red-400 text-sm mt-1">{errors.experience.message}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <Input
              type="text"
              placeholder="Skills (Comma Separated: React, Node.js, …)"
              className="bg-[#0a1628]/80 border-indigo-900/50 focus:border-indigo-500 text-slate-200 placeholder:text-slate-500 rounded-xl h-11"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-red-400 text-sm mt-1">{errors.skills.message}</p>
            )}
          </div>

          {/* Education */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Education Level</label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-4"
                  {...field}
                >
                  {["Intermediate", "Graduate", "Post Graduate"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={level}
                        id={level.toLowerCase().replace(" ", "-")}
                        className="border-indigo-600 text-indigo-500"
                      />
                      <Label
                        htmlFor={level.toLowerCase().replace(" ", "-")}
                        className="text-slate-300 cursor-pointer"
                      >
                        {level}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.education && (
              <p className="text-red-400 text-sm mt-1">{errors.education.message}</p>
            )}
          </div>

          {/* Resume */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Resume (PDF or DOC)</label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="bg-[#0a1628]/80 border-indigo-900/50 text-slate-400 file:text-indigo-300 file:bg-indigo-900/40 file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-sm rounded-xl"
              {...register("resume")}
            />
            {errors.resume && (
              <p className="text-red-400 text-sm mt-1">{errors.resume.message}</p>
            )}
          </div>

          {errorApply?.message && (
            <p className="text-red-400 text-sm">{errorApply.message}</p>
          )}
          {loadingApply && <BarLoader width={"100%"} color="#6366f1" />}

          <Button
            type="submit"
            className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white font-semibold text-base shadow-lg shadow-indigo-900/30 mt-1"
          >
            Submit Application
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-400 hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { Plus } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      { message: "Only PNG or JPEG images are allowed" }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    fnAddCompany({ ...data, logo: data.logo[0] });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/30 hover:border-indigo-500 rounded-xl gap-1.5"
        >
          <Plus size={15} />
          Add Company
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-[#0d1f3c] border-t border-indigo-900/50">
        <DrawerHeader>
          <DrawerTitle className="text-slate-100 text-xl font-bold">
            Add a New Company
          </DrawerTitle>
        </DrawerHeader>

        <form className="flex flex-col sm:flex-row gap-3 p-4 pb-0">
          <Input
            placeholder="Company name"
            {...register("name")}
            className="bg-[#0a1628]/80 border-indigo-900/50 focus:border-indigo-500 text-slate-200 placeholder:text-slate-500 rounded-xl h-11"
          />
          <Input
            type="file"
            accept="image/png,image/jpeg"
            className="bg-[#0a1628]/80 border-indigo-900/50 text-slate-400 file:text-indigo-300 file:bg-indigo-900/40 file:border-0 file:rounded-lg file:px-3 file:py-1 file:text-sm rounded-xl h-11"
            {...register("logo")}
          />
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white h-11 shrink-0"
          >
            Add
          </Button>
        </form>

        <DrawerFooter>
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
          {errors.logo && (
            <p className="text-red-400 text-sm">{errors.logo.message}</p>
          )}
          {errorAddCompany?.message && (
            <p className="text-red-400 text-sm">{errorAddCompany.message}</p>
          )}
          {loadingAddCompany && <BarLoader width={"100%"} color="#6366f1" />}
          <DrawerClose asChild>
            <Button
              type="button"
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
};

export default AddCompanyDrawer;

import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

import JobCard from "@/components/job-card";
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

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import { Search, XCircle, SlidersHorizontal } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   JobListing – client-side filtering, clickable company & location
───────────────────────────────────────────────────────── */
const JobListing = () => {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState(""); // always a string
  const [inputValue, setInputValue] = useState(""); // controlled search box
  const [searchQuery, setSearchQuery] = useState(""); // debounced value

  const debounceRef = useRef(null);
  const { isLoaded } = useUser();

  /* ── Companies ── load once on mount */
  const { data: companies, fn: fnCompanies } = useFetch(getCompanies);
  useEffect(() => {
    fnCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── All jobs ── load once, no filter options passed to useFetch */
  const { loading: loadingJobs, data: allJobs, fn: fnJobs } = useFetch(getJobs, {});
  useEffect(() => {
    fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Debounced live search ── */
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchQuery(inputValue.trim());
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [inputValue]);

  /* ── CLIENT-SIDE FILTERING (no closure issues) ── */
  const jobs = useMemo(() => {
    if (!allJobs) return [];
    let result = [...allJobs];

    if (location) {
      result = result.filter((j) => j.location === location);
    }
    if (company_id) {
      result = result.filter((j) => String(j.company_id) === String(company_id));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.company?.name?.toLowerCase().includes(q) ||
          j.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allJobs, location, company_id, searchQuery]);

  /* ── Helpers ── */
  const handleSearch = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    setSearchQuery(inputValue.trim());
  };

  const clearFilters = () => {
    setLocation("");
    setCompany_id("");
    setInputValue("");
    setSearchQuery("");
  };

  /* ── Click-to-filter from card ── */
  const handleCompanyClick = (id, _name) => {
    setCompany_id(String(id));
    // scroll to top of listing smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLocationClick = (loc) => {
    setLocation(loc);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasFilters = location || company_id || searchQuery;

  const selectedCompanyName = company_id && companies
    ? companies.find((c) => String(c.id) === String(company_id))?.name
    : null;

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366f1" />;
  }

  return (
    <div className="pb-16">
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-10">
        Latest Jobs
      </h1>

      {/* ── Search bar ── */}
      <form
        onSubmit={handleSearch}
        className="flex flex-row w-full gap-2 items-center mb-5"
      >
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
          <Input
            type="text"
            placeholder="Search by title, company, or keyword…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10 h-12 bg-[#0a1628]/60 border-indigo-900/50 focus:border-indigo-500 text-slate-200 placeholder:text-slate-500 rounded-xl"
          />
        </div>
        <Button
          type="submit"
          className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
        >
          Search
        </Button>
      </form>

      {/* ── Filter row ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center">
        <div className="flex items-center gap-1.5 text-sm text-slate-500 shrink-0">
          <SlidersHorizontal size={15} />
          Filters:
        </div>

        {/* Location */}
        <Select
          value={location || "__none__"}
          onValueChange={(val) => setLocation(val === "__none__" ? "" : val)}
        >
          <SelectTrigger className="flex-1 bg-[#0a1628]/60 border-indigo-900/50 text-slate-300 rounded-xl h-10 min-w-[160px]">
            <SelectValue>
              {location ? `📍 ${location}` : "📍 All Locations"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#0d1f3c] border-indigo-900/50 max-h-72 overflow-y-auto">
            <SelectGroup>
              <SelectItem value="__none__" className="text-slate-400 italic focus:bg-indigo-900/40">
                All Locations
              </SelectItem>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem
                  key={name}
                  value={name}
                  className="text-slate-300 focus:bg-indigo-900/40"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Company — value is always a string */}
        <Select
          value={company_id || "__none__"}
          onValueChange={(val) => setCompany_id(val === "__none__" ? "" : val)}
        >
          <SelectTrigger className="flex-1 bg-[#0a1628]/60 border-indigo-900/50 text-slate-300 rounded-xl h-10 min-w-[160px]">
            <SelectValue>
              {selectedCompanyName ? `🏢 ${selectedCompanyName}` : "🏢 All Companies"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#0d1f3c] border-indigo-900/50 max-h-72 overflow-y-auto">
            <SelectGroup>
              <SelectItem value="__none__" className="text-slate-400 italic focus:bg-indigo-900/40">
                All Companies
              </SelectItem>
              {companies?.map(({ name, id }) => (
                <SelectItem
                  key={id}
                  value={String(id)}
                  className="text-slate-300 focus:bg-indigo-900/40"
                >
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Clear */}
        {hasFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            className="border-red-700/50 text-red-400 hover:bg-red-900/20 hover:border-red-600 rounded-xl gap-2 transition-all h-10 shrink-0"
          >
            <XCircle size={15} />
            Clear
          </Button>
        )}
      </div>

      {/* ── Active filter chips ── */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-700/40 text-indigo-300 text-xs font-medium">
              🔍 &quot;{searchQuery}&quot;
              <button
                onClick={() => { setSearchQuery(""); setInputValue(""); }}
                className="hover:text-white ml-1 leading-none"
              >✕</button>
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-700/40 text-indigo-300 text-xs font-medium">
              📍 {location}
              <button onClick={() => setLocation("")} className="hover:text-white ml-1 leading-none">✕</button>
            </span>
          )}
          {selectedCompanyName && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-700/40 text-indigo-300 text-xs font-medium">
              🏢 {selectedCompanyName}
              <button onClick={() => setCompany_id("")} className="hover:text-white ml-1 leading-none">✕</button>
            </span>
          )}
        </div>
      )}

      {/* ── Loader ── */}
      {loadingJobs && <BarLoader className="mt-2" width={"100%"} color="#6366f1" />}

      {/* ── Result count ── */}
      {!loadingJobs && allJobs != null && (
        <p className="text-sm text-slate-500 mb-5">
          Showing <span className="text-indigo-300 font-semibold">{jobs.length}</span> of{" "}
          {allJobs.length} jobs
          {hasFilters ? " matching your filters" : ""}
        </p>
      )}

      {/* ── Job Grid ── */}
      {!loadingJobs && (
        <div>
          {jobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                  onCompanyClick={handleCompanyClick}
                  onLocationClick={handleLocationClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              <Search size={48} className="mx-auto mb-4 text-slate-600" />
              <p className="text-xl font-semibold">No Jobs Found</p>
              <p className="mt-1 text-sm">
                Try adjusting your filters or search query.
              </p>
              {hasFilters && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4 border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/20 rounded-xl"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;

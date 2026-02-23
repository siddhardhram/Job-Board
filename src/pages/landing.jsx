import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Building2,
  Search,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Jobs Posted", value: "10,000+" },
  { icon: Users, label: "Active Candidates", value: "50,000+" },
  { icon: Building2, label: "Companies", value: "2,500+" },
  { icon: TrendingUp, label: "Placements", value: "8,000+" },
];

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-16 sm:gap-24 py-10 sm:py-16">

      {/* ── Hero ── */}
      <section className="text-center flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-2">
          <Zap size={14} className="text-indigo-400" />
          India&apos;s fastest growing job portal
        </div>

        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter leading-tight">
          Find Your Dream Job
          <span className="flex items-center gap-3 sm:gap-6 mt-2">
            and get
            <img
              src="/logo.png"
              className="h-14 sm:h-24 lg:h-32 drop-shadow-[0_0_24px_rgba(99,102,241,0.5)]"
              alt="Hirrd Logo"
            />
          </span>
        </h1>

        <p className="text-slate-400 sm:mt-2 text-sm sm:text-xl max-w-2xl">
          Explore thousands of job listings or find the perfect candidate.
          Hirrd connects talent with opportunity — fast, smart &amp; simple.
        </p>

        <div className="flex gap-4 mt-2 flex-wrap justify-center">
          <Link to="/jobs">
            <Button
              size="xl"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-xl shadow-indigo-900/40 transition-all duration-200 hover:scale-105"
            >
              <Search size={20} className="mr-2" />
              Find Jobs
            </Button>
          </Link>
          <Link to="/post-job">
            <Button
              size="xl"
              variant="outline"
              className="border-indigo-600/50 text-indigo-300 hover:bg-indigo-600/20 hover:border-indigo-500 hover:text-white transition-all duration-200 hover:scale-105"
            >
              <Building2 size={20} className="mr-2" />
              Post a Job
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="glass-card p-6 text-center flex flex-col items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-1">
              <Icon size={20} className="text-indigo-400" />
            </div>
            <span className="text-2xl font-extrabold gradient-title">{value}</span>
            <span className="text-sm text-slate-400">{label}</span>
          </div>
        ))}
      </section>

      {/* ── Company Carousel ── */}
      <section>
        <p className="text-center text-slate-500 text-sm font-medium uppercase tracking-widest mb-6">
          Trusted by top companies
        </p>
        <Carousel
          plugins={[Autoplay({ delay: 1800 })]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent className="flex gap-6 sm:gap-16 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 flex justify-center">
                <img
                  src={path}
                  alt={name}
                  className="h-8 sm:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 filter brightness-0 invert"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* ── Banner ── */}
      <div className="relative rounded-2xl overflow-hidden border border-indigo-900/30 shadow-xl shadow-indigo-900/20">
        <img src="/banner.jpeg" className="w-full object-cover max-h-80" alt="Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-transparent" />
      </div>

      {/* ── Feature Cards ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card border-indigo-900/30 bg-transparent hover:border-indigo-500/40 transition-all duration-300 group">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 flex items-center justify-center mb-2 group-hover:bg-indigo-500/25 transition-colors">
              <Search size={22} className="text-indigo-400" />
            </div>
            <CardTitle className="font-bold text-xl text-slate-100">
              For Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-400 leading-relaxed">
            Browse thousands of listings, apply in seconds, track your
            applications, and bookmark jobs to review later — all in one place.
          </CardContent>
        </Card>

        <Card className="glass-card border-purple-900/30 bg-transparent hover:border-purple-500/40 transition-all duration-300 group">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-2 group-hover:bg-purple-500/25 transition-colors">
              <Building2 size={22} className="text-purple-400" />
            </div>
            <CardTitle className="font-bold text-xl text-slate-100">
              For Employers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-400 leading-relaxed">
            Post jobs, manage applications end-to-end, update hiring status,
            and find the best candidates — with powerful filtering and a clean
            dashboard.
          </CardContent>
        </Card>
      </section>

      {/* ── FAQ ── */}
      <section>
        <h2 className="gradient-title text-center font-extrabold text-3xl sm:text-4xl mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="glass-card border border-indigo-900/30 rounded-xl px-5 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-200 hover:text-indigo-300 py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default LandingPage;

import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

/* eslint-disable react/prop-types */

/**
 * Breadcrumb — renders a "← Back" link for inner pages.
 * Usage:  <BackNav to="/jobs" label="All Jobs" />
 *         <BackNav />          ← uses navigate(-1) to go to previous page
 */
const BackNav = ({ to, label = "Back" }) => {
    const navigate = useNavigate();

    if (to) {
        return (
            <Link
                to={to}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-300 transition-colors duration-200 mb-4 group"
            >
                <ChevronLeft
                    size={16}
                    className="group-hover:-translate-x-0.5 transition-transform duration-200"
                />
                {label}
            </Link>
        );
    }

    return (
        <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-300 transition-colors duration-200 mb-4 group"
        >
            <ChevronLeft
                size={16}
                className="group-hover:-translate-x-0.5 transition-transform duration-200"
            />
            {label}
        </button>
    );
};

export default BackNav;

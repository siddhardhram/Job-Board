/**
 * ─── CLERK MOCK ───────────────────────────────────────────────────────────────
 * Used automatically (via Vite alias) when VITE_CLERK_PUBLISHABLE_KEY is absent.
 * Every component/hook returns safe no-op values so the full UI renders.
 */
import React from "react";

/* ── Provider (renders children, ignores all Clerk props) ── */
export const ClerkProvider = ({ children }) => <>{children}</>;

/* ── Hooks ── */
export const useUser = () => ({
    isLoaded: true,
    isSignedIn: false,
    user: null,
});

export const useSession = () => ({ session: null });

export const useAuth = () => ({
    isLoaded: true,
    isSignedIn: false,
    userId: null,
    getToken: async () => null,
});

/* ── Conditional render components ── */
export const SignedIn = () => null;
// Show children when signed out (demo = always signed out)
export const SignedOut = ({ children }) => <>{children}</>;

/* ── UI components – render nothing ── */
export const UserButton = () => null;
export const SignIn = () => (
    <div className="glass-card p-8 rounded-2xl border border-indigo-900/30 text-center space-y-3 max-w-sm mx-auto">
        <p className="text-slate-200 font-semibold text-lg">Authentication</p>
        <p className="text-slate-400 text-sm">
            Add your <code className="text-indigo-300">VITE_CLERK_PUBLISHABLE_KEY</code> to{" "}
            <code className="text-indigo-300">.env</code> to enable login.
        </p>
    </div>
);
export const SignUp = () => null;

/* ── Themes re-export ── */
export const shadesOfPurple = {};

import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
export default function Page() { return <main className="auth-page"><Suspense><AuthForm mode="sign-in" /></Suspense></main>; }

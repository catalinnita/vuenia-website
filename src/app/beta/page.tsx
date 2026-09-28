import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BetaForm from "./BetaForm";

export const metadata: Metadata = { title: "Request beta access — Vuenia" };

export default function BetaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-lg px-6 py-20">
        <h1 className="text-display-sm font-display font-bold text-ink md:text-display-md">
          Request beta access
        </h1>
        <p className="mt-4 text-body">
          Vuenia is invite-only right now. Tell us a bit about what you&apos;re
          looking to build and we&apos;ll reach out once a spot opens up.
        </p>
        <div className="mt-10">
          <BetaForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

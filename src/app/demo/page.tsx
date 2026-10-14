import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoForm from "./DemoForm";

export const metadata: Metadata = { title: "Request a private demo — Vuenia" };

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-lg px-6 py-20">
        <h1 className="text-display-sm font-display font-bold text-ink md:text-display-md">Request a private demo</h1>
        <p className="mt-4 text-body">
          See a Pipeline built around your own content, with time for your questions. Tell us a little about
          what you&apos;d like to make and we&apos;ll set up a call.
        </p>
        <div className="mt-10">
          <DemoForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackForm from "./FeedbackForm";

export const metadata: Metadata = { title: "Share your feedback — Vuenia" };

export default function FeedbackPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-lg px-6 py-20">
        <h1 className="text-display-sm font-display font-bold text-ink md:text-display-md">Share your feedback</h1>
        <p className="mt-4 text-body">
          What’s working? What’s missing? What would help you create and publish more of your own work? Every message
          is read by a person.
        </p>
        <div className="mt-10">
          <FeedbackForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

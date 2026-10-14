import { redirect } from "next/navigation";

// The old "Request beta access" form now lives on as "Request a private demo" — kept as
// a redirect so existing links still land somewhere useful.
export default function BetaPage() {
  redirect("/demo");
}

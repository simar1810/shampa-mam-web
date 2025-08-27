import ThankYou from "@/components/thank-you";
import { Suspense } from "react";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou />
    </Suspense>
  );
}

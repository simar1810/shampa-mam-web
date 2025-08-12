import { Scale, Soup } from "lucide-react";
import { Card } from "@/components/ui/card";

export function GoalJourney() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-[#fdfbf9] to-[#fff]">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Goal-Oriented Journey
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          &quot;Hey Delhi folks! Balance your lovely chaats and flavorful
          cravings with nourishing home-cooked meals. Let&apos;s take your
          health on a joyful journey with the best Dietitian and Nutritionist in
          Delhi NCR.&quot;
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <Card className="bg-gradient-to-br from-[#d1f1e6] to-[#a7e9cd] text-gray-900 border-none shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300">
            <Scale className="h-12 w-12 text-custom-green-dark mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Track Weight To Make Progress
            </h3>
            <p className="text-sm text-gray-700">
              Keep a check on your weight first thing in the morning before
              eating — it's a reliable progress tracker.
            </p>
          </Card>

          {/* Card 2 */}
          <Card className="bg-gradient-to-br from-[#ffe5ec] to-[#ffc7d9] text-gray-900 border-none shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300">
            <Soup className="h-12 w-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Meal Plans Designed For Your Body
            </h3>
            <p className="text-sm text-gray-700">
              Personalized meals tailored to your daily schedule and comfort —
              easy to follow, easier to enjoy.
            </p>
          </Card>

          {/* Card 3 */}
          <Card className="bg-gradient-to-br from-[#fff3d1] to-[#ffe3aa] text-gray-900 border-none shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lucide lucide-clipboard-list h-12 w-12 mb-4 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 15h4" />
              <path d="M8 11h.01" />
              <path d="M8 15h.01" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">
              Personalized Guidance
            </h3>
            <p className="text-sm text-gray-700">
              Get dedicated 1-on-1 support and frequent plan adjustments for
              better results.
            </p>
          </Card>

          {/* Card 4 */}
          <Card className="bg-gradient-to-br from-[#ffd4c4] to-[#ffb69e] text-gray-900 border-none shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:scale-[1.02] transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lucide lucide-heart-handshake h-12 w-12 mb-4 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5 5 0 0 0 17.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5 5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.34.34.76.63 1.22.85l.2.1V18" />
              <path d="M18.5 12.5a2.17 2.17 0 0 0-3.08 0v0c-.34.34-.63.76-.85 1.22L12 17" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Holistic Approach</h3>
            <p className="text-sm text-gray-700">
              We focus on your emotional and physical health—not just weight—for
              lasting transformation.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

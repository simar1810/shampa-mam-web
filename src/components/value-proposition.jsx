import { Trophy, Leaf, Handshake } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ValueProposition() {
  return (
    <section
      id="value"
      className="py-16 md:py-24 bg-gradient-to-b from-white via-[#fefbf8] to-[#fff] scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="bg-gradient-to-br from-[#e6f4ec] to-[#c5edd7] border-none shadow-lg rounded-2xl p-8 flex flex-col items-center text-center transition hover:scale-[1.02] hover:shadow-xl duration-300">
            <Trophy className="h-12 w-12 text-custom-green-dark mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Qualified & Experienced
            </h3>
            <p className="text-gray-600">
              5000+ success stories. Coached clients across 15+ countries.
            </p>
          </Card>

          {/* Card 2 */}
          <Card className="bg-gradient-to-br from-[#fde2e4] to-[#fcc7ce] border-none shadow-lg rounded-2xl p-8 flex flex-col items-center text-center transition hover:scale-[1.02] hover:shadow-xl duration-300">
            <Leaf className="h-12 w-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Only Natural & Healthy Diets
            </h3>
            <p className="text-gray-600">
              No pills or supplements; only real food from your kitchen.
            </p>
          </Card>

          {/* Card 3 */}
          <Card className="bg-gradient-to-br from-[#ffe5d0] to-[#ffcba3] border-none shadow-lg rounded-2xl p-8 flex flex-col items-center text-center transition hover:scale-[1.02] hover:shadow-xl duration-300">
            <Handshake className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Client Care & Support
            </h3>
            <p className="text-gray-600">
              Support on call, chat & email. Regular feedback sessions.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

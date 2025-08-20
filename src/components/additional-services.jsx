"use client";
import { FileText, Home, Ban } from "lucide-react";
import { motion } from "framer-motion";

export function AdditionalServices() {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.25,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-gradient-to-b from-white via-[#fefcfb] to-[#fff] scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Additional Wellness Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gradient-to-br from-[#d7f5e9] to-[#b0ead2] rounded-2xl p-8 text-center shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <FileText className="h-12 w-12 text-custom-green-dark mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Diet Friendly Recipes
            </h3>
            <p className="text-gray-700 text-sm">
              Eat well, live well — discover deliciously healthy meals crafted
              for your goals.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gradient-to-br from-[#fff2d5] to-[#ffe3ad] rounded-2xl p-8 text-center shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <Home className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Homemade Meals
            </h3>
            <p className="text-gray-700 text-sm">
              From our experience to your plate — home-cooked meals are the
              heart of happiness.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gradient-to-br from-[#ffd8d8] to-[#fbbbbb] rounded-2xl p-8 text-center shadow-lg hover:scale-[1.02] transition duration-300"
          >
            <Ban className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Supplements
            </h3>
            <p className="text-gray-700 text-sm">
              Embrace your true potential — no shortcuts, no supplements, just
              nature and nourishment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

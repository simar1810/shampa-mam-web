import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            ABOUT US
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Clinical Nutritionist
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            As a clinical nutritionist, I specialize in creating personalized
            diet plans for weight loss, gut health, skin and hair care, thyroid
            management, PCOS, diabetes, cardiovascular health, and blood
            pressure control. My approach is to make nutrition simple and
            sustainable, focusing on your existing eating habits and lifestyle.
            This ensures that the changes are easy to follow and can be
            maintained as part of your daily routine for life. My goal is to
            empower you to achieve lasting health and wellness through
            practical, enjoyable nutrition strategies tailored to your unique
            needs.
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/pooja.jpg"
            alt="Clinical Nutritionist"
            width={500}
            height={100}
            className="rounded-lg shadow-lg h-[600px] w-full max-w-md lg:max-w-none object-cover object-[center]"
          />
        </div>
      </div>
    </section>
  );
}

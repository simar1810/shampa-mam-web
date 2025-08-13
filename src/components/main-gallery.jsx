export function MainGallery() {
  const videoSrc = "https://www.youtube.com/embed/2LrJViFZQkQ";
  return (
    <section id="gallery" className="mx-auto py-12 md:py-20 bg-white scroll-mt-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            GALLERY: A VISUAL FEAST OF NUTRITIOUS DELIGHTS | DIETITIAN&apos;S
            CREATIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Gallery</h2>
        </div>
        <div className="flex flex-col gap-10">
          {/* Photos Row */}
          <div className="flex flex-col md:flex-row gap-10 justify-center">
            {/* Photo 1 */}
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2">
              <img
                src="/1.jpg"
                alt="Nutrition transformation"
                className="rounded-lg w-full h-auto object-cover mb-4 border"
              />
              <div className="bg-gray-50 rounded p-4 text-gray-700 text-base shadow w-full">
                You made nutrition simple, realistic, and sustainable. Your meal
                plans are not only effective but enjoyable and easy to follow.
                Thanks to your support, I feel healthier and more confident.
                🥰😘
              </div>
            </div>
            {/* Photo 2 */}
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2">
              <img
                src="/2.jpg"
                alt="Weight loss journey"
                className="rounded-lg w-full h-auto object-cover mb-4 border"
              />
              <div className="bg-gray-50 rounded p-4 text-gray-700 text-base shadow w-full">
                "I'm so grateful for your guidance and support throughout my
                weight loss journey. Your expertise and encouragement made all
                the difference. You've not only helped me shed pounds but also
                taught me sustainable habits for a healthier lifestyle. Thank
                you for believing in me and pushing me to reach my goals. You're
                an amazing dietician and an even better friend!"
              </div>
            </div>
          </div>
          {/* Video Below Photos */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-full mt-4">
            <div className="relative w-full max-w-3xl aspect-video overflow-hidden rounded-lg border shadow mb-4">
              <iframe
                src={videoSrc}
                title="Gallery video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image"

export function MediaPartners() {
  const mediaLogos = [
    "/news.png",
    "/news.png",
    "/news.png",
    "/news.png",
  
  ]
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Well Known Tv Channels & Media</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {mediaLogos.map((src, index) => (
            <div key={index} className="relative w-32 h-16 md:w-40 md:h-20 flex items-center justify-center">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Media partner logo ${index + 1}`}
                layout="fill"
                objectFit="contain"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

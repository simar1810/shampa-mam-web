export function StatisticsOverview() {
  const stats = [
    { label: "Total clients", value: "75K" },
    { label: "Happy clients", value: "7409k" },
    { label: "Certificates and Awards", value: "26" },
    { label: "Healthy Diet", value: "1,000 +" },
  ];
  return (
    <section id="stats" className="py-12 md:py-20 bg-gray-50 scroll-mt-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-800">
                {stat.value}
              </h3>
              <p className="text-lg text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

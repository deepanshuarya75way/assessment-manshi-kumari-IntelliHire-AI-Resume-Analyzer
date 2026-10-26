function Features() {
  const features = [
    {
      icon: "📄",
      title: "Resume Analysis",
      description:
        "Upload your resume and receive instant AI-powered analysis with personalized suggestions.",
    },
    {
      icon: "📊",
      title: "ATS Score Checker",
      description:
        "Analyze how well your resume matches job descriptions and improve ATS compatibility.",
    },
    {
      icon: "🧠",
      title: "Skill Gap Analysis",
      description:
        "Identify missing technical skills and receive AI-powered recommendations.",
    },
    {
      icon: "💼",
      title: "Job Match Suggestions",
      description:
        "Get intelligent job recommendations based on your resume and skills.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Why Choose IntelliHire?
        </h2>

        <p className="text-gray-600 text-center mt-6 max-w-2xl mx-auto leading-relaxed">
          Everything you need to analyze resumes, improve ATS score,
          and find the perfect candidates using AI.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="h-full bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-13 h-1 bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
                {feature.icon}
  
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;
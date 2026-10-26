import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleAnalyze() {
    const token = localStorage.getItem("token");

    // Resume validation
    if (!selectedFile) {
      setError("Please select your resume first");
      return;
    }

    if (jobDescription.trim() === "") {
      setError("Please enter the job description");
      return;
    }

    // Loading start
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("resume", selectedFile);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("/api/analyze", {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`
        },

        body: formData
      });
      // Backend error check
      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();

      console.log(data.analysis);

      const analysisWithResume={
        ...data.analysis,
        resumeId: data.resumeId
      };

      sessionStorage.setItem(
        "atsAnalysis",
        JSON.stringify(analysisWithResume)
      );


      // Result ko ATS Report page par bhejo
      navigate("/report", {
        state: {
          analysis: analysisWithResume
        }
      });

    }
    catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">

        <button
          onClick={() => navigate("/")}
          className="mb-8 text-blue-600 font-semibold hover:text-blue-800 cursor-pointer"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Upload Your Resume
        </h1>

        <p className="text-gray-600 text-center mt-6 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and paste the job description to receive
          an AI-powered ATS analysis.
        </p>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-8 mt-12">

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-500 transition duration-300">

            <div className="text-5xl">
              📄
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Drag and Drop Your Resume
            </h2>

            <p className="text-gray-500 mt-3">
              Supported format: PDF
            </p>

            <input
              type="file"
              accept=".pdf"
              id="resumeUpload"
              className="hidden"
              onChange={(event) =>
                setSelectedFile(event.target.files[0])
              }
            />

            <label
              htmlFor="resumeUpload"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              Choose File
            </label>

            {selectedFile && (
              <p className="mt-4 text-green-600 font-medium">
                Selected File: {selectedFile.name}
              </p>
            )}

          </div>

          <div className="mt-10">

            <h3 className="text-2xl font-bold">
              Job Description
            </h3>

            <p className="text-gray-600 mt-2">
              Paste the job description below.
            </p>

            <textarea
              value={jobDescription}

              onChange={(event) =>
                setJobDescription(event.target.value)
              }

              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleAnalyze();
                }
              }}

              placeholder="Paste the job description here..."
              rows="8"
              className="w-full mt-4 p-4 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
            />
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                {error}
              </div>
            )}

            <div className="mt-8 text-center">

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Analyzing Resume...
                  </span>
                ) : (
                  "Analyze Resume"
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default UploadResume;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeChat from "../components/ResumeChat/ResumeChat.jsx"

function Dashboard() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAnalyses() {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "/api/analyses",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch analyses");
        }

        const data = await response.json();

        setAnalyses(data.analyses);
      } catch (error) {
        console.error(error);
        setError("Could not load your analysis history.");
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyses();
  }, []);
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `/api/analyses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete analysis");
      }

      // UI se bhi immediately remove
      setAnalyses((previousAnalyses) =>
        previousAnalyses.filter(
          (analysis) => analysis._id !== id
        )
      );

    } catch (error) {
      console.error(error);
      alert("Could not delete analysis.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-blue-600 font-semibold hover:text-blue-800 cursor-pointer"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold">
          Analysis History
        </h1>

        <p className="text-gray-600 mt-2">
          View your previous ATS resume analyses.
        </p>

        {analyses.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 mt-10 text-center">
            <p className="text-gray-600">
              No resume analyses found.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Analyze Resume
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {analyses.map((analysis) => (
              <div
                key={analysis._id}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              >

                {/* ATS Score */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    ATS Score
                  </h2>

                  <span className="text-2xl font-bold text-blue-600">
                    {analysis.atsScore}/100
                  </span>
                </div>

                {/* Date */}
                <p className="text-gray-500 text-sm mt-3">
                  {new Date(analysis.createdAt).toLocaleString()}
                </p>

                {/* Matched Skills */}
                <div className="mt-5">
                  <h3 className="font-semibold">
                    Matched Skills
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.matchedSkills?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="mt-5">
                  <h3 className="font-semibold">
                    Missing Skills
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.missingSkills?.map((skill) => (
                      <span
                        key={skill}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Report */}
                <button
                  onClick={() =>
                    navigate("/report", {
                      state: {
                        analysis: analysis
                      }
                    })
                  }
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                  View Report
                </button>
                <button
                  onClick={() => handleDelete(analysis._id)}
                  className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition cursor-pointer"
                >
                  Delete
                </button>


              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

export default Dashboard;
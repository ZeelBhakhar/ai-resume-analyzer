import { useState } from "react";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setError("");

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  // --------------------------------
  // Analyze Resume
  // --------------------------------

  const analyzeResume = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData
      const formData = new FormData();

      formData.append("resume", file);

      console.log("Sending resume to backend...");

      // Send resume to backend
      const response = await fetch(
        "https://ai-resume-analyzer-backend-ytem.onrender.com/api/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      // Backend error
      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Resume analysis failed."
        );
      }

      // --------------------------------
      // Save analysis result
      // --------------------------------

      localStorage.setItem(
        "resumeAnalysis",
        JSON.stringify(data)
      );

      // Save uploaded file name
      localStorage.setItem(
        "resumeFileName",
        file.name
      );

      console.log("Analysis successful!");

      // --------------------------------
      // Go to results page
      // --------------------------------

      window.location.href = "/results";

    } catch (error) {
      console.error("Analysis error:", error);

      setError(
        error.message ||
          "Something went wrong while analyzing your resume."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      {/* Header */}
      <header className="upload-header">

        <div className="upload-logo">
          <div className="upload-logo-icon">
            R
          </div>

          <span>
            ResumeAI
          </span>
        </div>

        <button
          className="back-button"
          onClick={() =>
            (window.location.href = "/")
          }
        >
          ← Back to Home
        </button>

      </header>


      {/* Main */}
      <main className="upload-main">

        <div className="upload-heading">

          <div className="upload-badge">
            AI Resume Analyzer
          </div>

          <h1>
            Upload Your
            <span> Resume</span>
          </h1>

          <p>
            Upload your resume and let our AI analyze your
            skills, experience, ATS compatibility, and more.
          </p>

        </div>


        {/* Upload Card */}
        <div className="upload-card">

          {!file ? (

            <div
              className={`drop-zone ${
                dragActive ? "drag-active" : ""
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() =>
                setDragActive(false)
              }
              onDrop={handleDrop}
            >

              <div className="upload-icon">
                ↑
              </div>

              <h2>
                Drag & Drop Your Resume
              </h2>

              <p>
                or choose a file from your computer
              </p>

              <label className="browse-button">

                Browse File

                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleInputChange}
                  hidden
                />

              </label>

              <div className="file-info">
                Supported formats: PDF, DOCX
                <br />
                Maximum file size: 5 MB
              </div>

            </div>

          ) : (

            <div className="selected-file">

              <div className="file-icon">
                📄
              </div>

              <div className="file-details">

                <h3>
                  {file.name}
                </h3>

                <p>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>

                <div className="upload-success">
                  ✓ File ready for analysis
                </div>

              </div>

              <button
                className="remove-button"
                onClick={removeFile}
                disabled={loading}
              >
                ✕
              </button>

            </div>

          )}

        </div>


        {/* Error Message */}
        {error && (
          <div className="upload-error">
            ⚠ {error}
          </div>
        )}


        {/* Analyze Button */}
        {file && (

          <button
            className="analyze-button"
            onClick={analyzeResume}
            disabled={loading}
          >

            {loading ? (
              <>
                Analyzing Resume...
                <span className="loading-spinner">
                  ⟳
                </span>
              </>
            ) : (
              <>
                Analyze Resume
                <span>→</span>
              </>
            )}

          </button>

        )}


        {/* Privacy */}
        <div className="privacy-note">

          <span>
            🔒
          </span>

          <p>
            Your resume is securely processed for analysis.
            We do not use your resume for training.
          </p>

        </div>


        {/* What We Analyze */}
        <section className="analyze-section">

          <h2>
            What We'll Analyze
          </h2>

          <div className="analyze-grid">

            <div className="analyze-item">
              <span>📊</span>

              <div>
                <h3>
                  Resume Score
                </h3>

                <p>
                  Overall resume quality
                </p>
              </div>

            </div>


            <div className="analyze-item">
              <span>🎯</span>

              <div>
                <h3>
                  ATS Compatibility
                </h3>

                <p>
                  ATS-friendly structure
                </p>
              </div>

            </div>


            <div className="analyze-item">
              <span>🧠</span>

              <div>
                <h3>
                  Skills Analysis
                </h3>

                <p>
                  Skills and missing skills
                </p>
              </div>

            </div>


            <div className="analyze-item">
              <span>✨</span>

              <div>
                <h3>
                  AI Recommendations
                </h3>

                <p>
                  Personalized improvements
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Upload;
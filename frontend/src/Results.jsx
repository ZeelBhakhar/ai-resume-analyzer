import "./Results.css";

function Results() {
  const storedData = localStorage.getItem("resumeAnalysis");

  if (!storedData) {
    return (
      <div className="results-page">
        <h1>No analysis found</h1>
        <p>Please upload and analyze your resume first.</p>
      </div>
    );
  }

  const data = JSON.parse(storedData);
  const analysis = data.analysis || data;

  return (
    <div className="results-page">

      {/* Header */}
      <header className="results-header">

        <div className="results-logo">
          <div className="results-logo-icon">R</div>
          <span>ResumeAI</span>
        </div>

        <button
          className="new-analysis-btn"
          onClick={() => {
            window.location.href = "/upload";
          }}
        >
          + New Analysis
        </button>

      </header>


      {/* Main */}
      <main className="results-main">

        {/* Heading */}
        <div className="results-heading">

          <div className="results-badge">
            AI Resume Analysis
          </div>

          <h1>
            Resume Analysis <span>Results</span>
          </h1>

          <p>
            Here's what our AI found in your resume.
          </p>

        </div>


        {/* Score Cards */}
        <section className="score-grid">

          <div className="score-card">
            <div className="score-icon">📊</div>

            <p>Overall Score</p>

            <h2>
              {analysis.overallScore ?? 0}/100
            </h2>
          </div>


          <div className="score-card">
            <div className="score-icon">🎯</div>

            <p>ATS Score</p>

            <h2>
              {analysis.atsScore ?? 0}/100
            </h2>
          </div>


          <div className="score-card">
            <div className="score-icon">🧠</div>

            <p>Skills Score</p>

            <h2>
              {analysis.skillsScore ?? 0}/100
            </h2>
          </div>


          <div className="score-card">
            <div className="score-icon">💼</div>

            <p>Experience Score</p>

            <h2>
              {analysis.experienceScore ?? 0}/100
            </h2>
          </div>

        </section>


        {/* Summary */}
        <section className="result-card summary-card">

          <div className="section-title">
            <span>📝</span>
            <h2>Resume Summary</h2>
          </div>

          <p>
            {analysis.summary || "No summary available."}
          </p>

        </section>


        {/* Strengths + Weaknesses */}
        <section className="two-column">

          {/* Strengths */}
          <div className="result-card">

            <div className="section-title">
              <span>💪</span>
              <h2>Strengths</h2>
            </div>

            {analysis.strengths?.length > 0 ? (
              <ul>
                {analysis.strengths.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No strengths found.</p>
            )}

          </div>


          {/* Weaknesses */}
          <div className="result-card">

            <div className="section-title">
              <span>⚠️</span>
              <h2>Weaknesses</h2>
            </div>

            {analysis.weaknesses?.length > 0 ? (
              <ul>
                {analysis.weaknesses.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No weaknesses found.</p>
            )}

          </div>

        </section>


        {/* Skills */}
        <section className="result-card">

          <div className="section-title">
            <span>🧠</span>
            <h2>Skills</h2>
          </div>

          {analysis.skills?.length > 0 ? (

            <div className="tag-container">

              {analysis.skills.map((skill, index) => (
                <span
                  className="skill-tag"
                  key={index}
                >
                  {skill}
                </span>
              ))}

            </div>

          ) : (

            <p>No skills found.</p>

          )}

        </section>


        {/* Missing Skills */}
        <section className="result-card">

          <div className="section-title">
            <span>🔍</span>
            <h2>Missing Skills</h2>
          </div>

          {analysis.missingSkills?.length > 0 ? (

            <div className="tag-container">

              {analysis.missingSkills.map((skill, index) => (
                <span
                  className="missing-tag"
                  key={index}
                >
                  {skill}
                </span>
              ))}

            </div>

          ) : (

            <p>No missing skills identified.</p>

          )}

        </section>


        {/* AI Recommendations */}
        <section className="result-card">

          <div className="section-title">
            <span>✨</span>
            <h2>AI Recommendations</h2>
          </div>

          {analysis.recommendations?.length > 0 ? (

            <div className="recommendations">

              {analysis.recommendations.map((item, index) => (

                <div
                  className="recommendation"
                  key={index}
                >

                  <div className="recommendation-number">
                    {index + 1}
                  </div>

                  <p>
                    {item}
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <p>No recommendations available.</p>

          )}

        </section>


        {/* Experience */}
        <section className="result-card">

          <div className="section-title">
            <span>💼</span>
            <h2>Experience</h2>
          </div>

          {analysis.experience?.length > 0 ? (

            <ul>

              {analysis.experience.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          ) : (

            <p>No experience information found.</p>

          )}

        </section>


        {/* Education */}
        <section className="result-card">

          <div className="section-title">
            <span>🎓</span>
            <h2>Education</h2>
          </div>

          {analysis.education?.length > 0 ? (

            <ul>

              {analysis.education.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          ) : (

            <p>No education information found.</p>

          )}

        </section>


        {/* Projects */}
        <section className="result-card">

          <div className="section-title">
            <span>🚀</span>
            <h2>Projects</h2>
          </div>

          {analysis.projects?.length > 0 ? (

            <ul>

              {analysis.projects.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}

            </ul>

          ) : (

            <p>No projects information found.</p>

          )}

        </section>


        {/* Bottom */}
        <div className="results-footer">

          <button
            className="new-analysis-btn footer-btn"
            onClick={() => {
              window.location.href = "/upload";
            }}
          >
            Analyze Another Resume →
          </button>

        </div>

      </main>

    </div>
  );
}

export default Results;
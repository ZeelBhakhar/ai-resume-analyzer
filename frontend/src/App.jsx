import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Upload from "./Upload.jsx";
import Results from "./Results.jsx";


function Home() {

  const navigate = useNavigate();

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">

        <div className="nav-container">

          <div className="logo">
            <div className="logo-icon">R</div>
            <span>ResumeAI</span>
          </div>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          <button
            className="nav-button"
            onClick={() => navigate("/upload")}
          >
            Analyze Resume
          </button>

        </div>

      </nav>


      {/* Hero */}

      <main id="home">

        <section className="hero">

          <div className="hero-content">

            <div className="badge">
              <span className="badge-dot"></span>
              AI-Powered Resume Analysis
            </div>

            <h1>
              Build a Resume That
              <span> Gets You Noticed</span>
            </h1>

            <p className="hero-description">
              Get instant AI-powered insights, ATS scoring,
              skill analysis, and personalized recommendations
              to make your resume stronger.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={() => navigate("/upload")}
              >
                Analyze My Resume
                <span>→</span>
              </button>

              <button className="secondary-button">
                See How It Works
              </button>

            </div>

            <div className="trust-text">
              ✓ Free to analyze &nbsp;&nbsp;
              ✓ AI-powered &nbsp;&nbsp;
              ✓ Fast results
            </div>

          </div>


          {/* Resume Card */}

          <div className="hero-card-wrapper">

            <div className="glow"></div>

            <div className="resume-card">

              <div className="card-header">

                <div>
                  <div className="small-label">
                    RESUME ANALYSIS
                  </div>

                  <h3>
                    Resume Score
                  </h3>
                </div>

                <div className="status">
                  <span></span>
                  Excellent
                </div>

              </div>


              <div className="score-section">

                <div className="score-circle">

                  <div className="score-number">
                    87
                  </div>

                  <div className="score-total">
                    /100
                  </div>

                </div>

                <div className="score-info">

                  <h4>
                    Great Resume!
                  </h4>

                  <p>
                    Your resume is strong, but there is
                    still room for improvement.
                  </p>

                </div>

              </div>


              <div className="analysis-list">

                <div className="analysis-item">

                  <div>

                    <span>
                      ATS Compatibility
                    </span>

                    <div className="progress">
                      <div className="progress-fill width-92"></div>
                    </div>

                  </div>

                  <strong>92%</strong>

                </div>


                <div className="analysis-item">

                  <div>

                    <span>
                      Skills
                    </span>

                    <div className="progress">
                      <div className="progress-fill width-85"></div>
                    </div>

                  </div>

                  <strong>85%</strong>

                </div>


                <div className="analysis-item">

                  <div>

                    <span>
                      Experience
                    </span>

                    <div className="progress">
                      <div className="progress-fill width-78"></div>
                    </div>

                  </div>

                  <strong>78%</strong>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* Stats */}

        <section className="stats">

          <div className="stat">
            <h3>95%+</h3>
            <p>ATS Accuracy</p>
          </div>

          <div className="stat">
            <h3>10K+</h3>
            <p>Resumes Analyzed</p>
          </div>

          <div className="stat">
            <h3>50+</h3>
            <p>Skills Detected</p>
          </div>

          <div className="stat">
            <h3>4.9/5</h3>
            <p>User Rating</p>
          </div>

        </section>


        {/* Features */}

        <section
          id="features"
          className="features-section"
        >

          <div className="section-heading">

            <div className="section-badge">
              Powerful Features
            </div>

            <h2>
              Everything You Need to
              <span> Improve Your Resume</span>
            </h2>

            <p>
              Our AI analyzes every important aspect of
              your resume and gives you actionable
              recommendations.
            </p>

          </div>


          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon purple">
                📊
              </div>

              <h3>Resume Score</h3>

              <p>
                Get an overall score based on resume quality,
                structure, content, and relevance.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon blue">
                🎯
              </div>

              <h3>ATS Analysis</h3>

              <p>
                Check how well your resume performs with
                Applicant Tracking Systems.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon green">
                🧠
              </div>

              <h3>AI Insights</h3>

              <p>
                Discover strengths, weaknesses, missing
                skills, and personalized improvements.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon orange">
                💼
              </div>

              <h3>Job Matching</h3>

              <p>
                Compare your resume with a job description
                and discover your match percentage.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon pink">
                🛠
              </div>

              <h3>Skill Gap Analysis</h3>

              <p>
                Find the skills you are missing for your
                target job and learn what to improve.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon cyan">
                ✨
              </div>

              <h3>AI Recommendations</h3>

              <p>
                Receive practical suggestions to make your
                resume more effective and professional.
              </p>
            </div>

          </div>

        </section>


        {/* How It Works */}

        <section
          id="how-it-works"
          className="how-section"
        >

          <div className="section-heading">

            <div className="section-badge">
              Simple Process
            </div>

            <h2>
              Analyze Your Resume in
              <span> Three Steps</span>
            </h2>

          </div>


          <div className="steps">

            <div className="step">

              <div className="step-number">
                01
              </div>

              <h3>
                Upload Your Resume
              </h3>

              <p>
                Upload your resume in PDF or DOCX format.
              </p>

            </div>


            <div className="step-line"></div>


            <div className="step">

              <div className="step-number">
                02
              </div>

              <h3>
                AI Analyzes It
              </h3>

              <p>
                Our AI evaluates your resume using
                advanced language analysis.
              </p>

            </div>


            <div className="step-line"></div>


            <div className="step">

              <div className="step-number">
                03
              </div>

              <h3>
                Get Your Results
              </h3>

              <p>
                Receive scores, insights, skill gaps,
                and personalized recommendations.
              </p>

            </div>

          </div>

        </section>


        {/* CTA */}

        <section className="cta-section">

          <div className="cta-content">

            <div className="section-badge">
              Ready to Improve?
            </div>

            <h2>
              Give Your Resume
              <span> an AI Advantage</span>
            </h2>

            <p>
              Upload your resume and discover exactly
              what you can improve.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("/upload")}
            >
              Analyze My Resume
              <span>→</span>
            </button>

          </div>

        </section>

      </main>


      {/* Footer */}

      <footer className="footer">

        <div className="footer-container">

          <div className="logo">

            <div className="logo-icon">
              R
            </div>

            <span>
              ResumeAI
            </span>

          </div>

          <p>
            AI-powered resume analysis for smarter
            job applications.
          </p>

          <div className="footer-copy">
            © 2026 ResumeAI. All rights reserved.
          </div>

        </div>

      </footer>

    </div>
  );
}


function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/upload"
        element={<Upload />}
      />

      <Route
        path="/results"
        element={<Results />}
      />

    </Routes>

  );
}


export default App;
'use client';
import { useState } from 'react';
import "./join-us.css";

export default function JoinUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    experience: '',
    motivation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <main className="join-us-main">
        <div className="join-us-container">
          <div className="confirmation-section">
            <div className="confirmation-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="38" stroke="#00f0ff" strokeWidth="4"/>
                <path d="M25 40L35 50L55 30" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="confirmation-title">Application Submitted!</h1>
            <p className="confirmation-message">
              Thanks for your interest in becoming a Site Curator! We&apos;ve received your application 
              and will review it soon.
            </p>
            <div className="confirmation-details">
              <div className="detail-item">
                <strong>Submission ID:</strong> GHM-{Date.now().toString().slice(-8)}
              </div>
              <div className="detail-item">
                <strong>Submitted:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {formData.email}
              </div>
            </div>
            <div className="next-steps">
              <h2>What&apos;s Next?</h2>
              <ol>
                <li>We&apos;ll review your application within a few days</li>
                <li>Check your email at <strong>{formData.email}</strong> for updates</li>
                <li>If approved, you&apos;ll receive curator access credentials</li>
                <li>You&apos;ll be able to start contributing to exhibits right away!</li>
              </ol>
            </div>
            <p className="confirmation-note">
              Keep an eye on your inbox (and spam folder just in case). 
              Questions? Email us at <a href="mailto:curators@gaminghistorymuseum.org">curators@gaminghistorymuseum.org</a>
            </p>
            <button 
              className="back-home-button"
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Banner */}
      <section className="join-hero">
        <video className="join-video" autoPlay muted loop playsInline>
          <source src="/join-us.mp4" type="video/mp4" />
        </video>
        <div className="join-overlay">
          <h1 className="join-title">
            <span className="block">JOIN OUR</span>
            <span className="block">TEAM</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="join-content">
        {/* Header Section */}
        <section className="join-us-header">
          <h2 className="page-title">Become a Site Curator</h2>
          <p className="intro-text">
            Love gaming history? Join our team of curators who help shape and expand our exhibits. 
            As a curator, you&apos;ll contribute content, research, and ideas to help preserve gaming heritage 
            for future generations. This is a volunteer position perfect for passionate gaming enthusiasts!
          </p>
        </section>

        {/* What You'll Do */}
        <section className="what-you-do">
          <h3 className="section-title">What You&apos;ll Do</h3>
          <div className="responsibilities-grid">
            <div className="responsibility-item">
              <span className="icon">✏️</span>
              <h4>Create Content</h4>
              <p>Write exhibit descriptions, fun facts, and educational materials</p>
            </div>
            <div className="responsibility-item">
              <span className="icon">🔍</span>
              <h4>Research</h4>
              <p>Dig into gaming history and uncover fascinating stories</p>
            </div>
            <div className="responsibility-item">
              <span className="icon">🎮</span>
              <h4>Curate</h4>
              <p>Help select and organize games, consoles, and artifacts</p>
            </div>
            <div className="responsibility-item">
              <span className="icon">🤝</span>
              <h4>Collaborate</h4>
              <p>Work with other curators to build amazing experiences</p>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="application-section">
          <h3 className="section-title">Apply Now</h3>
          <p className="form-instructions">
            Fill out this quick form to get started. We&apos;re looking for people who are passionate 
            about gaming and want to share their knowledge!
          </p>

          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., Alex Chen"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="portfolio">Portfolio / Social Media</label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="form-input"
                placeholder="Link to your blog, YouTube, Twitter, etc. (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Your Gaming Experience *</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="6"
                placeholder="Tell us about your gaming background! What eras, genres, or platforms do you know best? Any favorite gaming memories?"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Why do you want to be a curator? *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="6"
                placeholder="What excites you about helping preserve gaming history? What would you want to contribute?"
              ></textarea>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                  className="checkbox-input"
                />
                <span>
                  I confirm that the information I&apos;ve provided is accurate. *
                </span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Submit Application
              </button>
            </div>
          </form>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <p>
            Questions? Email us at{' '}
            <a href="mailto:curators@gaminghistorymuseum.org">curators@gaminghistorymuseum.org</a>
          </p>
        </section>
      </div>
    </main>
  );
}

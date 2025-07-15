import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Welcome to Our World</h1>
        <p className="about-tagline">
          Turning data into insight. Building solutions with purpose.
        </p>
      </header>

      <section className="about-content">
        <p>
          Welcome! I am a dynamic technologist driven by the power of data and
          development to create meaningful solutions. As a data analyst, I
          specialize in transforming raw data into strategic insights,
          exemplified by my work on a Company Performance Dashboard – a project
          where I leveraged Python and SQL to provide clear, actionable
          intelligence.
        </p>

        <p>
          My passion for building extends to robust applications. I developed a
          comprehensive MOH Payment System as a web application, demonstrating
          my proficiency in React and C# to deliver seamless and secure user
          experiences. Furthermore, my commitment to practical innovation led me
          to create a HealthCare Android App, utilizing Java to bring essential
          services directly to users' fingertips. I thrive on connecting complex
          data with intuitive applications, eager to tackle new challenges and
          build solutions that truly matter.
        </p>

        <p className="highlight">
          Interactive Data Analysts are modern-day detectives—uncovering hidden
          stories within raw numbers. With a keen eye for patterns and mastery
          of analytical tools, they transform complexity into clarity and
          empower better decisions.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
};

export default About;

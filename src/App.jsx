import avatar from "./assets/avatar.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import urlShortenerImg from "./assets/url-shortener-3.png";
import studentManage from "./assets/student-management.png";
import finalProject from "./assets/final-project.png";


const projects = [
  {
    title: "URL Shortener",
    description: "Generate and manage shortened URLs.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "HTML5&CSS", "JS"],
    link: "https://url-shortner-pj72.onrender.com",
    image: urlShortenerImg,
  },

  {
    title: "Student Management System",
    description: "Manage student records efficiently.",
    tech: ["Java", "Spring Boot", "MySQL"],
    link: "https://final-student-management.onrender.com",
    image: studentManage,
  },

  {
    title: "HTML/CSS Project",
    description: "Responsive frontend project.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://laxmi-6214.github.io/Final_Project/",
    image: finalProject,
  },
];

function App() {
  const [speaking, setSpeaking] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
  speechSynthesis.getVoices();

  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
}, []);

  const introduceMe = () => {
  if (speaking) {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    return;
  }



  const speech = new SpeechSynthesisUtterance(
    "Hello Recruiter. I am Nellipalli Lakshmi Sai Sree. I am a Java Full Stack Developer, Electrical and Electronics Engineering graduate, and AI enthusiast. Welcome to my interactive portfolio."
  );

  const voices = window.speechSynthesis.getVoices();

  const femaleVoice =
    voices.find(v => v.name.includes("Zira")) ||
    voices.find(v => v.name.includes("Female")) ||
    voices.find(v => v.name.includes("Google UK English Female")) ||
    voices.find(v => v.name.includes("Samantha")) ||
    voices[0];

  speech.voice = femaleVoice;

  speech.rate = 0.95;
  speech.pitch = 1.1;

  speech.onstart = () => setSpeaking(true);
  speech.onend = () => setSpeaking(false);

  window.speechSynthesis.speak(speech);
};

const handleCardClick = (index) => {
  setActiveIndex(index);
};

  return (
    <>
      <nav className="navbar">
  <ul>
    <li>
      <a href="#hero">Home</a>
    </li>

    <li>
      <a href="#about">About</a>
    </li>

    <li>
      <a href="#projects">Projects</a>
    </li>

    <li>
      <a href="#skills">Skills</a>
    </li>

    <li>
      <a href="#certifications">Certifications</a>
    </li>

     <li>
      <a href="#resume">Resume</a>
    </li>

    <li>
      <a href="#contact">Contact</a>
    </li>
  </ul>
</nav>

      <section id="hero" className="hero">

        <div className="left">

          <h1>
            Nellipalli
            <br />
            Lakshmi Sai Sree
          </h1>

          <p>Java Full Stack Developer</p>
          <p>Electrical & Electronics Engineer</p>
          <p>AI Enthusiast</p>

          <button
            className={`talk-btn ${speaking ? "active" : ""}`}
            onClick={introduceMe}
          >
            <HiSpeakerWave />
            {speaking ? "Mute" : "Introduce Me"}
          </button>

          <div className="socials">
            <a   href="https://www.linkedin.com/in/lakshmisaisree"
  target="_blank"
  rel="noreferrer">
              <FaLinkedin />
            </a>

            <a   href="https://github.com/Laxmi-6214"
  target="_blank"
  rel="noreferrer">
             
               <FaGithub />
            </a>
          </div>

        </div>

       <div className="right">

  {speaking && (
    <div className="voice-ring"></div>
  )}

  <img
    src={avatar}
    alt="Lakshmi Sai Sree"
    className={`avatar ${speaking ? "speaking" : ""}`}
  />

</div>

      </section>


<motion.section
  id="about"
  className="about"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>

  <h2 className="about-title">
    About Me
  </h2>

  <div className="about-line"></div>

  <motion.div
    className="about-content"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.3 }}
    viewport={{ once: true }}
  >

    <p>
      I am <span>Nellipalli Lakshmi Sai Sree</span>,
      an Electrical and Electronics Engineering graduate
      from Sri Venkateswara University College of Engineering.
    </p>

    <p>
      Currently transitioning into
      <span> Java Full Stack Development </span>
      while exploring
      <span> Generative AI </span>
      and modern software engineering practices.
    </p>

    <p>
      Skilled in Java, HTML, CSS, JavaScript,
      React, Git, GitHub, VS Code, Eclipse,
      API Fundamentals and CI/CD concepts.
    </p>

    <p>
      My goal is to build impactful software
      solutions, solve real-world problems,
      and continuously grow as a developer.
    </p>

  </motion.div>

</motion.section>


<section id="projects" className="projects">

  <h2 className="projects-title">Projects</h2>

  <div className="projects-showcase">

    {projects.map((project, index) => {

      let position = "";

      if (index === activeIndex) {
        position = "center-card";
      }
      else if (
        index === (activeIndex + 1) % projects.length
      ) {
        position = "right-card";
      }
      else {
        position = "left-card";
      }

      return (

        <div
          key={index}
          className={`project-card ${position}`}
          onClick={() => handleCardClick(index)}
        >
<div className="project-image">
  <img
    src={project.image}
    alt={project.title}
    className="project-banner"
  />
</div>

          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <div className="tech-stack">
            {project.tech.map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>

          {index === activeIndex && (
            <button
              className="open-btn"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.link, "_blank");
              }}
            >
              Open →
            </button>
          )}

        </div>
      );
    })}

  </div>

</section>

<section id="skills" className="skills">

  <h2 className="skills-title">
    Skills
  </h2>

  <div className="skills-grid">

    <div className="skill-card">
      <h3>Languages</h3>

      <div className="skill-tags">
        <span>Java</span>
        <span>JavaScript</span>
        <span>HTML5</span>
        <span>CSS3</span>
        <span>MYSQL</span>
      </div>
    </div>

    <div className="skill-card">
      <h3>Frontend</h3>

      <div className="skill-tags">
        <span>React</span>
        <span>Responsive Design</span>
        <span>Flexbox</span>
        <span>Grid</span>
      </div>
    </div>

    <div className="skill-card">
      <h3>Backend</h3>

      <div className="skill-tags">
        <span>Spring Boot</span>
        <span>REST APIs</span>
        <span>CRUD</span>
        
      </div>
    </div>

    <div className="skill-card">
      <h3>Tools & Technologies</h3>

      <div className="skill-tags">
        <span>Git</span>
        <span>GitHub</span>
        <span>VS Code</span>
        <span>Eclipse</span>
        <span>CI/CD</span>
        <span>GenAI</span>
      </div>
    </div>

  </div>

</section>

<section id="certifications" className="certifications">

  <h2 className="certifications-title">
    Certifications
  </h2>

  <div className="certifications-container">

    <div className="cert-card">

      <h3>
        Oracle Cloud Infrastructure AI Foundations
      </h3>

      <p>
        Oracle Certified Professional
      </p>

      <button
        onClick={() =>
          window.open(
           `${import.meta.env.BASE_URL}eCertificate Oracle.pdf`,
            "_blank"
          )
        }
      >
        View Certificate
      </button>

    </div>

  </div>

</section>

<section id="resume" className="resume">

  <h2 className="resume-title">
    Resume
  </h2>

  <div className="resume-card">

    <h3>
      Nellipalli Lakshmi Sai Sree
    </h3>

    <p>
      Java Full Stack Developer • EEE Graduate
    </p>

    <p className="resume-desc">
      Download my resume to explore my
      projects, skills, certifications,
      and technical experience.
    </p>

    <a
     href={`${import.meta.env.BASE_URL}LAKSHMI-SAI-SREE@RESUME(1).pdf`}
      download
      className="resume-btn"
    >
      Download Resume ↓
    </a>

  </div>

</section>


<section id="contact" className="contact">

  <h2 className="contact-title">
    Contact Me
  </h2>

  <div className="contact-card">

    <h3>
      Let's Connect
    </h3>

    <p>
      Open to Java Full Stack Developer,
      Software Engineer and Internship opportunities.
    </p>

    <div className="contact-links">

      <a
        href="mailto:laxmiram6214@gmail.com"
      >
        📧 laxmiram6214@gmail.com
      </a>

      <a
        href="tel:6301200944"
      >
        📱 +91 6301200944
      </a>

      <a
        href="https://www.linkedin.com/in/lakshmisaisree"
        target="_blank"
        rel="noreferrer"
      >
        🔗 LinkedIn
      </a>

      <a
        href="https://github.com/Laxmi-6214"
        target="_blank"
        rel="noreferrer"
      >
        💻 GitHub
      </a>

    </div>

  </div>

</section>

    </>
  );
}

export default App;
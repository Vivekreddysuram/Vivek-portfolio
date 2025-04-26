import React from "react";
import "./Project.scss";
import ecomImage from "../../assets/img/Ecom.png";
import stockImage from "../../assets/img/Stock.png";
import weatherImage from "/Users/vivekreddysuram/Desktop/vivek-main/vivek-portfolio/src/assets/img/Car.png";

const Project = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, product management, and payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "SpringBoot","Express.js","JavaScript","HTML","CSS"],
      image: ecomImage,
      github: "https://github.com/Vivekreddysuram/ecommerce-store",
      demo: "https://ecommerce-demo.com",
    },
    {
      title: "Real-Time Stock Data Processing",
      description: "A Python-based system that processes live stock data and calculates Simple Moving Averages (SMA) to optimize decision-making and provide accurate insights into intraday market trends.",
      technologies: ["Python", "Polygon.io", "Pandas/NumPy", "Matplotlib","APIs"],
      image: stockImage,
      github: "https://github.com/Vivekreddysuram/CS-DBMS2",
      demo: "https://task-manager-demo.com",
    },
    {
      title: "Uphill Adventure - Car Game",
      description: "A 2D off-road driving game featuring procedural terrain, dynamic weather effects, and progressive levels, built using Godot Engine to provide an engaging and interactive gameplay experience.",
      technologies: ["Godot Engine", "GDScript", "Go Logger", "Go Programming Language"],
      image: weatherImage,
      github: "https://github.com/Mahesh1998/uphilladventure",
      demo: "https://weather-dashboard-demo.com",
    },
  ];

  return (
    <section className="project" id="projects">
      <div className="project-container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <div className="section-divider"></div>
        </div>
        <div className="project-content">
          {projects.map((project, index) => (
            <div className="project-item" key={index}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project; 
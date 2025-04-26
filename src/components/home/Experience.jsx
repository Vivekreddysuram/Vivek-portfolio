import React from "react";
import "./Experience.scss";

const Experience = () => {
  const experiences = [
    {
      company: "Unosis IT Solutions Pvt Ltd.",
      position: "Software Engineer",
      period: "Jul 2022 - Aug 2023",
      description: [
        "Provided Tier-2 level support for business-critical systems, reducing issue resolution time by 35% through proactive monitoring and documentation.",
        "Designed and deployed scalable web applications using Java, React.js, and Spring Boot to enhance user accessibility and performance.",
        "Translated business requirements into technical specifications, aligning system features with operational needs.",
        "Integrated Oracle, PostgreSQL, and MongoDB databases to streamline data handling and optimize queries.",
        "Implemented RESTful APIs and automated build processes using Maven and Gradle.",
        "Integrated AWS services (Lambda, S3, DynamoDB) to manage backend processing and improve scalability.",
        "Deployed applications using Docker and AWS Console services, ensuring consistent multi-stage environments.",
        "Created modular, reusable React components to improve maintainability and minimize redundancy."
      ],
    },
    {
      company: "New Mexico State University",
      position: "Embedded Systems Teacher Assistant",
      period: "Jan 2024 - Present",
      description: [
        "Developed and tested code for ultrasonic sensor-based robotic cars, simulating real-world sensor communication and response workflows, aligning with satellite configuration systems principles.",
        "Supported student projects involving embedded control logic and microcontroller programming, cultivating practical experience with real-time system constraints.",
        "Worked with Raspberry Pi 3 to design and deploy embedded solutions, providing students with hands-on experience in interfacing sensors and actuators",
        "Guided students through troubleshooting and optimizing embedded systems, improving their understanding of hardware-software interaction and real-time system design."
      ],
    },
  ];

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <div className="section-divider"></div>
        </div>
        <div className="experience-content">
          {experiences.map((exp, index) => (
            <div className="experience-item" key={index}>
              <div className="experience-header">
                <h3 className="company">{exp.company}</h3>
                <div className="position-period">
                  <span className="position">{exp.position}</span>
                  <span className="period">{exp.period}</span>
                </div>
              </div>
              <ul className="experience-description">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 
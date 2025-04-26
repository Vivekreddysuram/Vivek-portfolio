import React, { useState } from "react";
import "./Skills.scss";

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: "", level: 50 });
  
  const initialSkillsData = {
    programming_languages: {
      title: "Programming Languages",
      color: "#4A90E2",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "C#", level: 85 },
        { name: "Java", level: 80 },
        { name: "C++", level: 80 },
        { name: "C", level: 75 },
        { name: "PHP", level: 70 },
        { name: "GDScript", level: 70 }
      ]
    },
    frameworks_tools: {
      title: "Frameworks & Tools",
      color: "#7ED321",
      skills: [
        { name: "React", level: 90 },
        { name: "Angular", level: 85 },
        { name: "Docker", level: 85 },
        { name: "ASP.NET Core", level: 80 },
        { name: "AWS", level: 80 },
        { name: "Postman", level: 80 },
        { name: "Entity Framework", level: 75 },
        { name: "Streamlit", level: 70 }
      ]
    },
    databases_cloud: {
      title: "Databases & Cloud",
      color: "#F5A623",
      skills: [
        { name: "SQL Server", level: 85 },
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "AWS Lambda", level: 80 },
        { name: "AWS S3", level: 80 },
        { name: "AWS DynamoDB", level: 80 }
      ]
    },
    development_tools: {
      title: "Development & Integration",
      color: "#B197FC",
      skills: [
        { name: "Git", level: 90 },
        { name: "RESTful API Design", level: 90 },
        { name: "ETL", level: 80 },
        { name: "Maven", level: 80 },
        { name: "Go Logger", level: 80 },
        { name: "Gradle", level: 75 }
      ]
    },
    visualization_design: {
      title: "Visualization & Design",
      color: "#FF6B6B",
      skills: [
        { name: "Tableau", level: 80 },
        { name: "Power BI", level: 75 },
        { name: "UI/UX Design", level: 70 },
        { name: "Godot Engine", level: 80 }
      ]
    }
  };

  const [skillsData, setSkillsData] = useState(initialSkillsData);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.name && selectedCategory) {
      setSkillsData(prev => ({
        ...prev,
        [selectedCategory]: {
          ...prev[selectedCategory],
          skills: [...prev[selectedCategory].skills, newSkill]
        }
      }));
      setNewSkill({ name: "", level: 50 });
      setShowModal(false);
    }
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const renderSkillCard = (categoryKey, { title, color, skills }) => (
    <div className="skill-card" key={categoryKey}>
      <div className="card-header" style={{ borderColor: color }}>
        <div className="check-icon" style={{ backgroundColor: color }}>✓</div>
        <h3>{title}</h3>
      </div>
      <div className="card-content">
        {skills.map((skill, index) => (
          <div 
            className="skill-item" 
            key={index}
            onMouseEnter={() => setHoveredSkill(`${categoryKey}-${index}`)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-bar-container">
              <div 
                className={`skill-bar ${hoveredSkill === `${categoryKey}-${index}` ? 'hovered' : ''}`}
                style={{ 
                  width: `${skill.level}%`,
                  backgroundColor: color,
                  opacity: hoveredSkill === `${categoryKey}-${index}` ? 1 : 0.7
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="skills" id="skills">
      <div className="section-header">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="section-divider"></div>
      </div>
      <div className="skills-container">
        {Object.entries(skillsData).map(([key, category]) => 
          renderSkillCard(key, category)
        )}
      </div>
    </section>
  );
};

export default Skills; 
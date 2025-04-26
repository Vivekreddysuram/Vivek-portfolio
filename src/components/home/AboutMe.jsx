import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { createNoise4D } from 'simplex-noise';
import "./AboutMe.scss";

const AboutMe = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planeRef = useRef(null);
  const lightsRef = useRef(null);
  const noise4DRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const config = {
      fov: 75,
      cameraZ: 60,
      xyCoef: 20,
      zCoef: 25,
      lightIntensity: 2.0,
      ambientColor: 0x000000,
      light1Color: 0xffffff,
      light2Color: 0xffffff,
      light3Color: 0xffffff,
      light4Color: 0xffffff,
    };

    let width, height, wWidth, wHeight;
    
    const updateSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        const vFOV = cameraRef.current.fov * Math.PI / 180;
        const visibleHeight = 2 * Math.tan(vFOV / 2) * Math.abs(config.cameraZ);
        const visibleWidth = visibleHeight * cameraRef.current.aspect;
        wWidth = visibleWidth;
        wHeight = visibleHeight;
        
        if (planeRef.current) {
          const newGeometry = new THREE.PlaneGeometry(wWidth, wHeight, Math.floor(wWidth / 2), Math.floor(wHeight / 2));
          planeRef.current.geometry.dispose();
          planeRef.current.geometry = newGeometry;
        }
      }
    };

    const handleMouseMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const init = () => {
      rendererRef.current = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        antialias: true, 
        alpha: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
      });
      
      cameraRef.current = new THREE.PerspectiveCamera(config.fov);
      cameraRef.current.position.z = config.cameraZ;

      sceneRef.current = new THREE.Scene();
      
      const r = 30;
      const y = 10;
      const lightDistance = 200;

      lightsRef.current = {
        light1: new THREE.PointLight(config.light1Color, config.lightIntensity, lightDistance),
        light2: new THREE.PointLight(config.light2Color, config.lightIntensity, lightDistance),
        light3: new THREE.PointLight(config.light3Color, config.lightIntensity, lightDistance),
        light4: new THREE.PointLight(config.light4Color, config.lightIntensity, lightDistance)
      };

      Object.values(lightsRef.current).forEach(light => sceneRef.current.add(light));

      const material = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        specular: 0x666666,
        shininess: 10,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
      
      updateSize();
      
      const geometry = new THREE.PlaneGeometry(
        wWidth,
        wHeight,
        Math.floor(wWidth / 2),
        Math.floor(wHeight / 2)
      );
      
      planeRef.current = new THREE.Mesh(geometry, material);
      planeRef.current.rotation.x = -Math.PI / 2 - 0.2;
      planeRef.current.position.y = -25;
      sceneRef.current.add(planeRef.current);

      noise4DRef.current = createNoise4D();

      lightsRef.current.light1.position.set(0, y, r);
      lightsRef.current.light2.position.set(0, -y, -r);
      lightsRef.current.light3.position.set(r, y, 0);
      lightsRef.current.light4.position.set(-r, y, 0);

      window.addEventListener('resize', updateSize);
      window.addEventListener('mousemove', handleMouseMove);
      updateSize();

      const animate = () => {
        requestAnimationFrame(animate);
        
        const gArray = planeRef.current.geometry.attributes.position.array;
        const time = Date.now() * 0.0003;
        
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        
        for (let i = 0; i < gArray.length; i += 3) {
          const x = gArray[i];
          const y = gArray[i + 1];
          
          const distX = (x / wWidth) - mouseX;
          const distY = (y / wHeight) - mouseY;
          const dist = Math.sqrt(distX * distX + distY * distY);
          
          const influence = Math.max(0, 1 - dist * 0.5);
          
          gArray[i + 2] = noise4DRef.current(
            x / config.xyCoef,
            y / config.xyCoef,
            time,
            influence * 2
          ) * config.zCoef * (1 + influence);
        }
        
        planeRef.current.geometry.attributes.position.needsUpdate = true;

        const lightTime = Date.now() * 0.001;
        const d = 40;
        const mouseInfluence = 10;
        
        lightsRef.current.light1.position.x = Math.sin(lightTime * 0.2) * d + mouseX * mouseInfluence;
        lightsRef.current.light1.position.z = Math.cos(lightTime * 0.4) * d + mouseY * mouseInfluence;
        lightsRef.current.light2.position.x = Math.cos(lightTime * 0.6) * d - mouseX * mouseInfluence;
        lightsRef.current.light2.position.z = Math.sin(lightTime * 0.8) * d - mouseY * mouseInfluence;
        lightsRef.current.light3.position.x = Math.sin(lightTime * 1.0) * d + mouseX * mouseInfluence;
        lightsRef.current.light3.position.z = Math.sin(lightTime * 1.2) * d + mouseY * mouseInfluence;
        lightsRef.current.light4.position.x = Math.sin(lightTime * 1.4) * d - mouseX * mouseInfluence;
        lightsRef.current.light4.position.z = Math.cos(lightTime * 1.6) * d - mouseY * mouseInfluence;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };

      animate();
    };

    init();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (planeRef.current) {
        planeRef.current.geometry.dispose();
        planeRef.current.material.dispose();
      }
      Object.values(lightsRef.current || {}).forEach(light => {
        if (light) light.dispose();
      });
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <section className="about-me" id="about">
      <canvas ref={canvasRef} id="background" />
      <div className="about-me-container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </div>
        <div className="about-me-content">
          <div className="about-me-text">
            <p>
              I'm a passionate Full Stack Developer with a strong foundation in both front-end and back-end technologies.
              My journey in software development began with a curiosity for building things and solving problems.
            </p>
            <p>
              I specialize in creating responsive, user-friendly web applications using modern technologies like
              React, Node.js, and various databases. I'm constantly learning and adapting to new technologies
              to stay at the forefront of web development.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or working on personal projects that challenge me to grow as a developer.
            </p>
          </div>
          <div className="about-me-stats">
            <div className="stat-item">
              <h3>2+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3>5+</h3>
              <p>Technologies Mastered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 
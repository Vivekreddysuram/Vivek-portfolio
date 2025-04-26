import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { createNoise4D } from 'simplex-noise';
import { TypeAnimation } from 'react-type-animation';
import "./MainBody.scss";
import profileImage from "../../assets/img/profile.png";

const MainBody = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planeRef = useRef(null);
  const lightsRef = useRef(null);
  const noise4DRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleDownloadCV = () => {
    const cvUrl = "/Vivek-portfolio/Vivek_Resume.pdf";
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Vivek_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        
        // Calculate visible width and height at z=0
        const vFOV = cameraRef.current.fov * Math.PI / 180;
        const visibleHeight = 2 * Math.tan(vFOV / 2) * Math.abs(config.cameraZ);
        const visibleWidth = visibleHeight * cameraRef.current.aspect;
        wWidth = visibleWidth;
        wHeight = visibleHeight;
        
        // Update plane geometry if it exists
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
    <section className="main-body" id="home">
      <canvas ref={canvasRef} id="background" />
      <div className="main-body-container">
        <div className="main-body-content">
          <h1 className="main-title">
            Hi, I'm <span className="highlight">Vivek Reddy Suram</span>
          </h1>
          <h2 className="main-subtitle">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Frontend Developer',
                2000,
                'Backend Developer',
                2000,
                'Software Engineer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </h2>
          <p className="main-description">
            I build exceptional digital experiences with modern technologies.
            Let's create something amazing together.
          </p>
          <div className="main-cta">
            <div className="button-container">
              <a href="#contact" className="cta-button secondary">
                <span>Get In Touch</span>
              </a>
           <button onClick={handleDownloadCV} className="cta-button cv-button">
           <span>Download CV</span>
           </button>
            </div>
          </div>
        </div>
        <div className="main-body-image">
          <div className="image-container">
            <img 
              src={profileImage} 
              alt="Vivek Reddy Suram" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBody; 

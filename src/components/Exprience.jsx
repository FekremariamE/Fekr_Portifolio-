import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { ReactComponent as Logo } from "./file22.svg";
import "./logoDraw.css";

const Exprience = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll(
      "path, line, polyline, polygon, circle, rect, ellipse"
    );

    paths.forEach((path) => {
      const length = path.getTotalLength?.() || 0;

      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.strokeWidth = "3";
      path.style.stroke = "#00e5ff";
      path.style.fill = "none";
    });

    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutExpo",
      duration: 2500,
      delay: anime.stagger(50),
      complete: () => {
        paths.forEach((path) => {
          path.style.strokeDasharray = "none";
        });
      },
    });

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      anime({
        targets: svgRef.current,
        translateX: x,
        translateY: y,
        duration: 500,
        easing: "easeOutQuad",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="experience-container">
      <Logo ref={svgRef} className="interactive-logo" />
    </section>
  );
};

export default Exprience;
// src/components/CatCharacter.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const CatCharacter = ({ emotion }) => {
  const leftEye = useRef(null);
  const rightEye = useRef(null);

  useEffect(() => {
    const moveEyes = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to([leftEye.current, rightEye.current], {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", moveEyes);
    return () => window.removeEventListener("mousemove", moveEyes);
  }, []);

  const emotionMap = {
    neutral: "#FFC107",
    happy: "#FFB300",
    excited: "#FF9800",
    shy: "#FF6F00",
  };

  return (
    <motion.div
      className="relative w-40 h-40 flex justify-center items-center"
      animate={{ scale: emotion === "excited" ? 1.2 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute w-36 h-36 rounded-full border-4 border-black bg-yellow-200"
        style={{ backgroundColor: emotionMap[emotion] }}
      />
      <div
        ref={leftEye}
        className="absolute w-6 h-6 bg-black rounded-full top-1/3 left-1/3"
      />
      <div
        ref={rightEye}
        className="absolute w-6 h-6 bg-black rounded-full top-1/3 right-1/3"
      />
      <motion.div
        className="absolute bottom-1/3 w-10 h-2 rounded-full bg-black"
        animate={{
          y: emotion === "happy" ? -2 : 0,
          rotate: emotion === "excited" ? 20 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default CatCharacter;

/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function ModalProjectCard({ modal, projects }) {
  const { active, index } = modal;

  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    //Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { pageX, pageY } = e;

      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);

  return (
    <>
      <motion.div
        id="container"
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={`w-[400px] aspect-video bg-background pointer-events-none absolute overflow-hidden flex items-center justify-center`}
      >
        <div
          id="slider"
          style={{
            top: `-${index * 100}%`,
            transition: `top 0.5s cubic-bezier(0.76, 0, 0.24, 1)`,
          }}
          className={`w-full h-full absolute`}
        >
          {projects.map((project, index) => {
            return (
              <div
                id="modal"
                key={index}
                className={`w-full h-full flex items-center justify-center`}
              >
                <img
                  src={project.img_path}
                  alt=""
                  width={400}
                  height={0}
                  draggable={false}
                  className={`object-cover w-full h-full`}
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active && projects[index].url ? "enter" : "closed"}
        className={`w-[80px] aspect-square backdrop-blur bg-[#455CE9] rounded-full absolute z-10 flex items-center justify-center text-sm font-medium pointer-events-none`}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active && projects[index].url ? "enter" : "closed"}
        className={`w-[80px] aspect-square rounded-full text-white absolute z-10 flex items-center justify-center text-xs font-bold pointer-events-none`}
      >
        View
      </motion.div>
    </>
  );
}

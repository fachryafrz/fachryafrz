"use client";

import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export default function PixelCursorTrailing() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [numberOfBlocks, setNumberOfBlocks] = useState(0);

  const colorize = (el) => {
    el.style.backgroundColor = `#c18971`;
    el.style.border = `1px solid #1a1a1a`;
    setTimeout(() => {
      el.style.backgroundColor = `transparent`;
    }, 3e2);
  };

  const getBlocks = () => {
    return [...Array(numberOfBlocks).keys()].map((_, i) => (
      <div key={i} onMouseEnter={(e) => colorize(e.target)}></div>
    ));
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (!windowWidth) return;

    const blockSize = windowWidth * 0.03;
    setNumberOfBlocks(Math.ceil(windowWidth / blockSize));
  }, [windowWidth]);

  return (
    <div id="container" className={` h-dvh flex items-center justify-center`}>
      <div
        id="body"
        className={`pointer-events-none mix-blend-difference text-white text-center font-bold w-[70%] relative z-10 leading-tight`}
      >
        <div
          className={`font-tnr font-bold text-4xl flex flex-col items-center gap-2 sm:text-7xl sm:tracking-wide`}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Fachry D. Afriza")
                .callFunction((cb) => {
                  cb.elements.cursor.style.display = "none";
                })
                .start();
            }}
          />
        </div>
        <div
          className={`mt-4 text-xs font-fira-code text-accent sm:text-base font-medium`}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .callFunction((cb) => {
                  cb.elements.cursor.style.display = "none";
                })
                .pauseFor(2500)
                .callFunction((cb) => {
                  cb.elements.cursor.style.display = "inline";
                })
                .typeString("Front-End Web Developer")
                .callFunction((cb) => {
                  // cb.elements.cursor.style.display = "none";
                })
                .start();
            }}
          />
        </div>
      </div>

      <div
        id="grid"
        className={`hidden xl:flex w-full h-full overflow-hidden absolute`}
      >
        {windowWidth > 0 &&
          [...Array(numberOfBlocks).keys()].map((_, i) => {
            return (
              <div
                key={`b_${i}`}
                id="column"
                className={`w-[3vw] [&_div]:w-full [&_div]:h-[3vw]`}
              >
                {getBlocks()}
              </div>
            );
          })}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import ModalProjectCard from "@/components/modal/project-card";
import { projects as rawProjects } from "@/data/projects";
import { CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function ProjectMouseHover() {
  const [modal, setModal] = useState({
    active: false,
    index: 0,
  });

  const projects = rawProjects.slice().reverse();

  return (
    <div className={`px-4 lg:px-24`}>
      <h2 className={`sr-only`}>Projects</h2>

      <ul>
        {projects.map((project, index) => {
          return (
            <li key={index}>
              <ProjectCard
                project={project}
                index={index}
                setModal={setModal}
              />
            </li>
          );
        })}
      </ul>

      <ModalProjectCard modal={modal} projects={projects} />
    </div>
  );
}

function ProjectCard({ project, index, setModal }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
    // onMouseEnter={() => setModal({ active: true, index })}
    // onMouseLeave={() => setModal({ active: false, index })}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex sticky top-0 z-50 bg-bg w-full gap-4 sm:flex-row sm:items-center flex-col justify-between p-4 border-y [&_h3]:hover:opacity-20 hover:px-2 transition-all [&_*]:transition-all`}
      >
        <h3 className={`text-3xl text-start`}>{project.name}</h3>

        <span className={`text-start sm:text-end text-accent`}>
          {project.type}
        </span>
      </button>

      {isOpen && (
        <div className={`p-4 grid relative md:grid-cols-3 gap-4`}>
          {/* Images */}
          <div className={`flex flex-col gap-4 md:col-span-2`}>
            {project.img_path.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={``}
                role={`presentation`}
                width={500}
                height={250}
                className={`w-full`}
                draggable={false}
              />
            ))}
          </div>

          <div className={`space-y-4 sticky h-fit top-20`}>
            {/* Tech Stack */}
            <div className={`flex gap-2 items-center`}>
              {project.tech.map((tech, index) => (
                <span key={index} className={`mr-2`}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <img
                          src={`/tech/${encodeURI(tech)}.png`}
                          alt={``}
                          role={`presentation`}
                          width={50}
                          height={50}
                          draggable={false}
                        />
                      </TooltipTrigger>
                      <TooltipContent side={`bottom`}>
                        <p>{decodeURI(tech)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              ))}
            </div>

            {/* Date */}
            <div className={`flex text-accent items-center gap-2`}>
              <CalendarDays size={20} />
              <span className={`block`}>
                {new Date(project.date).toLocaleDateString("US", {
                  dateStyle: "long",
                })}
              </span>
            </div>

            {/* Description */}
            <p>{project.description}</p>

            {/* CTA */}
            {project.url && (
              <Link
                href={project.url}
                target={`_blank`}
                className={`btn-primary`}
              >
                <span>Check it out!</span>
                <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

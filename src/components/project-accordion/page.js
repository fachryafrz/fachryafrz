/* eslint-disable @next/next/no-img-element */
"use client";

import { projects as rawProjects } from "@/data/projects";
import { CalendarDays, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function ProjectAccordion() {
  const projects = rawProjects.slice().reverse();

  return (
    <div>
      <h2 className={`sr-only`}>Projects</h2>

      <Accordion type="multiple">
        {projects.map((project, index) => {
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`relative`}
            >
              <AccordionTrigger
                className={`flex-col px-4 items-start md:flex-row hover:px-2 [&_span]:hover:opacity-40`}
              >
                <span className={`text-3xl text-start`}>{project.name}</span>
                <span className={`text-start sm:text-end text-accent`}>
                  {project.type}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className={`px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4`}
                >
                  {/* Images */}
                  <div className={`flex flex-col gap-4 lg:col-span-2`}>
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

                  <div className={`space-y-4 sticky h-fit top-[68px]`}>
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
                    <div className={`flex gap-2 items-center`}>
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

                      {project.github_url && (
                        <Button
                          asChild
                          variant="outline"
                          className={`hover:bg-white hover:text-background`}
                        >
                          <Link href={project.github_url} target={`_blank`}>
                            <Github />
                            <span>GitHub</span>
                            <ExternalLink />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* <ModalProjectCard modal={modal} projects={projects} /> */}
    </div>
  );
}

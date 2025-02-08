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
import Image from "next/image";
import { useImageSlider } from "@/zustand/image-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import axios from "axios";
import useSWR from "swr";

export default function ProjectAccordion() {
  const projects = rawProjects.slice().reverse();
  const { open, setOpen, setImages, selectedIndex, setSelectedIndex } =
    useImageSlider();

  const handleSetImagesSlider = (index, imgIndex) => {
    setImages(projects[index].img_path);
    setSelectedIndex(imgIndex);
    setOpen(!open);
  };

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
                  className={`px-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4`}
                >
                  {/* Images */}
                  <div className={`lg:col-span-1`}>
                    <div
                      className={`h-fit sticky flex flex-col gap-4 top-[68px]`}
                    >
                      {project.img_path.map((img, imgIndex) => (
                        <div key={imgIndex}>
                          <Image
                            src={img}
                            alt={``}
                            role={`presentation`}
                            quality={100}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                            className={``}
                            draggable={false}
                            onClick={() =>
                              handleSetImagesSlider(index, imgIndex)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div className={`-mx-4`}>
                    <Swiper
                      modules={[FreeMode]}
                      slidesPerView={`auto`}
                      spaceBetween={16}
                      freeMode
                      className="w-full !px-4"
                    >
                      {project.img_path.map((img, imgIndex) => (
                        <SwiperSlide
                          key={imgIndex}
                          className={`!w-fit max-w-[calc(100%/1.75)]`}
                        >
                          <Image
                            src={img}
                            alt={``}
                            role={`presentation`}
                            quality={100}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: "auto",
                              height: "auto",
                              maxHeight: "400px",
                              objectFit: `contain`,
                            }}
                            className={``}
                            draggable={false}
                            onClick={() =>
                              handleSetImagesSlider(index, imgIndex)
                            }
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div> */}

                  <div className={`space-y-4 h-fit sticky top-[68px]`}>
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
                    <ProjectDescription project={project} />

                    {/* CTA */}
                    {(project.url || project.github_url) && (
                      <div className={`flex gap-2 items-center`}>
                        {project.url && (
                          <Button
                            asChild
                            variant="outline"
                            className={`bg-transparent border-accent text-accent`}
                          >
                            <Link href={project.url} target={`_blank`}>
                              <span>Check it out!</span>
                              <ExternalLink />
                            </Link>
                          </Button>
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
                            </Link>
                          </Button>
                        )}
                      </div>
                    )}
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

function ProjectDescription({ project }) {
  const { data } = useSWR(
    project.description,
    (query) => axios.get(query).then((res) => res.data),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className="prose [&_*]:text-white [&_*]:text-pretty prose-p:!text-neutral-400 prose-li:!text-neutral-400"
    >
      {data}
    </Markdown>
  );
}

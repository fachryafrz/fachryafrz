import Footer from "@/components/footer";
import PixelCursorTrailing from "@/components/pixel-cursor-trailing/page";
import ProjectAccordion from "@/components/project-accordion/page";

export default function Home() {
  return (
    <div>
      <PixelCursorTrailing />

      <ProjectAccordion />

      <Footer />
    </div>
  );
}

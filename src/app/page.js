import Footer from "@/components/footer";
import ImageSlider from "@/components/image-slider";
import PixelCursorTrailing from "@/components/pixel-cursor-trailing/page";
import ProjectAccordion from "@/components/project-accordion/page";

export default function Home() {
  return (
    <div>
      <PixelCursorTrailing />

      <ProjectAccordion />

      <ImageSlider />

      <Footer />
    </div>
  );
}

import Scene from '@/components/Scene';
import HeroSection from '@/components/HeroSection';
import FeatureShowcase from '@/components/FeatureShowcase';
import ProductExplainer from '@/components/ProductExplainer';
import CinematicBreak from '@/components/CinematicBreak';
import TechSpecs from '@/components/TechSpecs';
import FinalCTA from '@/components/FinalCTA';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <main className="relative w-full bg-[#050505] text-white">

        {/* Fixed 3D Background Scene */}
        <Scene />

        {/* Content Sections */}
        <div className="relative z-10">
          <HeroSection />
          <FeatureShowcase />
          <ProductExplainer />
          <CinematicBreak />
          <TechSpecs />
          <FinalCTA />
        </div>

      </main>
    </PageTransition>
  );
}

import Logo from "./components/home/Logo";
import HeroHeading from "./components/home/HeroHeading";
import SearchForm from "./components/home/SearchForm";
import FooterStats from "./components/home/FooterStats";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen p-6 relative overflow-x-hidden">
      {/* Animated glow orb behind content */}
      <div className="glow-bg" aria-hidden="true" />

      <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
        <Logo />
        <HeroHeading />
        <SearchForm />
        <FooterStats />
      </div>
    </main>
  );
}

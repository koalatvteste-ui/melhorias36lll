import React, { useEffect } from "react";
import Header from "./components/Header";
import ChapterSection from "./components/ChapterSection";
import ProgressIndicator from "./components/ProgressIndicator";
import Footer from "./components/Footer";
import { useChapterProgress } from "./hooks/useChapterProgress";

function App() {
  const { chapters, unlockChapter, unlockedCount } = useChapterProgress();

  // Smooth scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      const header = document.querySelector("header");
      if (header) {
        header.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <ProgressIndicator
        totalChapters={chapters.length}
        unlockedChapters={unlockedCount}
      />

      <main>
        {chapters.map((chapter) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            onUnlock={unlockChapter}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;

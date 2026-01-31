'use client';
import { Press_Start_2P } from 'next/font/google';
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import HoverCard from "../components/HoverCard";
import "../components/HoverCard.css";

const pressStart = Press_Start_2P({ subsets: ['latin'], weight: ['400'] });

export default function HomePage() {
  const router = useRouter();
  const [titleSpring, titleApi] = useSpring(() => ({ x: 0, y: 0 }));
  const [subCtaSpring, subCtaApi] = useSpring(() => ({ x: 0, y: 0 }));
  const [visitorCount, setVisitorCount] = useState(0);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const xVal = (e.clientX / innerWidth - 0.5) * 100;
    const yVal = (e.clientY / innerHeight - 0.5) * 100;

    titleApi.start({ x: xVal * 0.3, y: yVal * 0.3 });
    subCtaApi.start({ x: xVal * 0.8, y: yVal * 0.8 });
  };

  const sections = {
    default: {
      title: "Welcome",
      subtitle: "Explore the frontier of play",
      paragraph:
        "This space is your guide to the cyber gaming museum. Hover over a card to uncover stories of innovation, competition, and community. Each section opens a window into gaming's past, present, and future — from the consoles that defined childhoods to the technologies shaping tomorrow.",
      video: null,
      route: null
    },
    History: {
      title: "History",
      subtitle: "From pixels to powerhouses",
      paragraph:
        "Gaming's journey began with simple pixels lighting up arcade screens, yet quickly grew into a cultural phenomenon. From the rise of home consoles in the 1980s to the handheld revolutions of the 1990s, each milestone reflects not just technological progress but the creativity of pioneers who redefined entertainment. This section traces the legends, consoles, and turning points that transformed play into a global industry.",
      video: "/history.mp4",
      route: "/history"
    },
    Games: {
      title: "Games",
      subtitle: "Icons that shaped generations",
      paragraph:
        "Every era of gaming is defined by its titles — unforgettable adventures, competitive challenges, and imaginative worlds that captured hearts. From groundbreaking RPGs to fast‑paced shooters, these games became more than entertainment; they became cultural touchstones. Here you'll explore the stories behind the classics and the innovations that continue to inspire new generations of players.",
      video: "/games.mp4",
      route: "/games"
    },
    Esports: {
      title: "Esports",
      subtitle: "Competition without borders",
      paragraph:
        "What began as small LAN parties has evolved into stadium‑filling spectacles watched by millions worldwide. Esports represents the fusion of skill, technology, and community, where players become athletes and fans rally behind teams like traditional sports. This section dives into the tournaments, rivalries, and grassroots movements that turned gaming into a professional arena.",
      video: "/esports.mp4",
      route: "/esports"
    },
    Tech: {
      title: "Tech",
      subtitle: "Engines of innovation",
      paragraph:
        "Behind every game lies a world of engineering brilliance. From the silicon chips powering consoles to the engines rendering vast digital landscapes, technology drives the evolution of play. This section explores the breakthroughs in hardware, graphics, and design tools that not only make games possible but continually push the boundaries of imagination.",
      video: "/tech.mp4",
      route: "/tech"
    },
    Security: {
      title: "Security",
      subtitle: "Protecting play in the digital age",
      paragraph:
        "As gaming moved online, new challenges emerged: safeguarding accounts, preventing cheating, and ensuring fair play. Security is the invisible shield that keeps communities thriving. This section examines the systems, ethics, and innovations that protect players and platforms, ensuring that gaming remains a safe and welcoming space for all.",
      video: "/security.mp4",
      route: "/security"
    },
    "Join Us": {
      title: "Join Us",
      subtitle: "The heart of gaming culture",
      paragraph:
        "Beyond consoles and screens, gaming is about people. Communities form around shared experiences — fan art, conventions, online guilds, and friendships forged in virtual worlds. This section celebrates the creativity, passion, and inclusivity that make gaming culture vibrant, reminding us that play is most powerful when it brings us together.",
      video: "/join-us.mp4",
      route: "/join-us"
    }
  };

  const [activeSection, setActiveSection] = useState(sections.default);

  // Initialize visitor count on mount
  useEffect(() => {
    const initialCount = Math.floor(Math.random() * 9999999);
    setVisitorCount(initialCount);

    // Increment at random intervals
    const incrementVisitor = () => {
      setVisitorCount(prev => prev + 1);
      const nextInterval = Math.random() * 8000 + 2000; // 2-10 seconds
      setTimeout(incrementVisitor, nextInterval);
    };

    const firstInterval = Math.random() * 5000 + 3000;
    const timeoutId = setTimeout(incrementVisitor, firstInterval);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToPreviews = () => {
    const previewsSection = document.getElementById("previews");
    if (previewsSection) {
      previewsSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Format visitor count with leading zeros
  const formatCount = (num) => {
    return num.toString().padStart(7, '0').split('');
  };

  return (
    <main onMouseMove={handleMouseMove}>
      {/* Hero */}
      <div className="hero">
        <div className="hero-content">
          <animated.h1
            className={`${pressStart.className} hero-title`}
            style={{
              transform: titleSpring.x.to(
                (xVal) => `translate(${xVal}px, ${titleSpring.y.get()}px)`
              ),
            }}
          >
            <span className="typing-line line1">From pixels,</span><br />
            <span className="typing-line line2">to progress</span>
          </animated.h1>

          <animated.div
            style={{
              transform: subCtaSpring.x.to(
                (xVal) => `translate(${xVal}px, ${subCtaSpring.y.get()}px)`
              ),
            }}
          >
            <p className="hero-sub">[ Explore the cyber gaming frontier ]</p>
            <button className="cta" onClick={scrollToPreviews}>
              DISCOVER →
            </button>
          </animated.div>
        </div>
      </div>

      {/* Section Previews */}
      <div className="previews" id="previews">
        <div className="preview-grid">
          {Object.keys(sections)
            .filter((key) => key !== "default")
            .map((key, idx) => (
              <VideoPreviewCard
                key={idx}
                section={sections[key]}
                onHover={() => setActiveSection(sections[key])}
                onLeave={() => setActiveSection(sections.default)}
              />
            ))}
        </div>

        {/* Right text area */}
        <div className="preview-text">
          <h2 className="preview-title">{activeSection.title}</h2>
          <h3 className="preview-subtitle">{activeSection.subtitle}</h3>
          <p className="preview-paragraph">{activeSection.paragraph}</p>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2 className="about-heading">About GameScape</h2>
        <h3 className="about-subtitle">A Digital Museum of Play</h3>
        <p className="description-text">
          GameScape is more than a digital museum — it is a living archive of gaming's
          evolution, designed to capture the imagination of players across generations.
          From the blinking pixels of the earliest arcade machines to the sprawling
          open worlds of today, every milestone tells a story of creativity, innovation,
          and community. Our exhibits highlight not only the consoles and titles that
          defined eras, but also the cultural movements they inspired, the friendships
          they forged, and the artistry that transformed play into a global language.
        </p>

        <p className="description-text">
          Visitors are invited to explore timelines that trace the rise of home
          consoles, the handheld revolutions that made gaming portable, and the
          breakthroughs in online play that connected millions across borders. Each
          section is curated with care, blending nostalgic touchpoints with modern
          design to create an experience that feels both familiar and fresh. Like a
          museum gallery, GameScape balances clarity with wonder, offering interactive
          narratives that encourage reflection as much as discovery.
        </p>

        <p className="description-text">
          But GameScape is not only about the past. It celebrates the ongoing
          creativity of developers, communities, and players who continue to push the
          boundaries of what games can be. From esports arenas filled with cheering
          fans to indie studios crafting heartfelt adventures, the story of gaming is
          still being written — and GameScape is here to honor it. Whether you are
          revisiting childhood favorites, uncovering hidden gems, or considering the
          cultural impact of play, this space invites you to pause, remember, and share
          in the collective journey of gaming history.
        </p>
      </section>

      {/* Visitor Counter Section */}
      <section className="visitor-section">
        <h2 className="visitor-heading">Live Site Visitors</h2>
        <div className="flip-counter">
          {formatCount(visitorCount).map((digit, idx) => (
            <div key={idx} className="flip-digit">
              <div className="flip-digit-content">{digit}</div>
            </div>
          ))}
        </div>
        <p className="visitor-cta-text">
          Be part of our growing community of gaming enthusiasts
        </p>
        <button className="join-btn" onClick={() => router.push('/join-us')}>
          Join Our Community
        </button>
      </section>
    </main>
  );
}

// Video Preview Card Component
function VideoPreviewCard({ section, onHover, onLeave }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (section.route) {
      router.push(section.route);
    }
  };

  return (
    <div
      className="video-preview-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={`video-container ${isHovered ? 'hovered' : ''}`}>
        {section.video && (
          <video
            ref={videoRef}
            className="preview-video"
            muted
            loop
            playsInline
          >
            <source src={section.video} type="video/mp4" />
          </video>
        )}
        <div className="video-overlay">
          <HoverCard title={section.title} />
        </div>
      </div>
    </div>
  );
}

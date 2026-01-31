'use client';
import "./history.css";
import { useEffect } from "react";

export default function HistoryPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="history-hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/history.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <h1 className="history-hero-title">
            <span className="block">A HISTORY</span>
            <span className="block">OF CYBER GAMING</span>
          </h1>
        </div>
      </section>

      {/* Content Wrapper with grey background */}
      <div className="history-content">
        {/* Intro Section */}
        <section className="history-intro">
        <h2 className="history-timeline-title">From Arcade to Esports</h2>
        <p>
            Cyber gaming isn’t just about pixels and high scores — it’s about neon lights,
            button‑mashing marathons, and the thrill of discovering whole new worlds on a
            glowing screen. What began with quarters dropped into arcade machines has grown
            into a global culture where millions tune in to cheer their favorite teams and
            streamers.
        </p>
        <p>
            Along the way, every era brought its own flavor: the 8‑bit heroes of the 1980s,
            the 3D revolutions of the 1990s, the online battles of the 2000s, and the rise
            of esports arenas in the 2010s. Each milestone wasn’t just a technical upgrade —
            it was a new way to play, connect, and compete.
        </p>
        <p>
            Today, gaming is bigger than Hollywood, louder than sports stadiums, and more
            creative than ever. From cozy couch co‑op to massive esports tournaments, cyber
            gaming continues to evolve, surprise, and inspire.
        </p>
        <p>
            The story of cyber gaming kicks off in the buzzing arcades of the 1970s.
        </p>
        </section>




        {/* Timeline Section: 1970s–1980s */}
        <section className="timeline-section">
        <div
            className="timeline-background"
            style={{ backgroundImage: "url('/arcade-era.jpg')" }}
        ></div>

        <div className="timeline-textbox">
            <h3>1970s–1980s: The Arcade Era</h3>
            <p>
            The golden age of arcades introduced gaming to the masses. Titles like Pac-Man and Space Invaders weren’t just games — they were cultural icons that defined a generation. This era also saw the rise of home consoles and handheld devices, laying the foundation for gaming as a mainstream pastime.
            </p>
            <ul>
            <li><strong>1972:</strong> Pong released by Atari, one of the first commercially successful video games.</li>
            <li><strong>1977:</strong> Atari 2600 launches, bringing arcade-style games into homes.</li>
            <li><strong>1978:</strong> Space Invaders sparks the arcade boom.</li>
            <li><strong>1980:</strong> Pac-Man becomes a global phenomenon, instantly recognizable worldwide.</li>
            <li><strong>1981:</strong> Donkey Kong introduces “Jumpman,” later known as Mario.</li>
            <li><strong>1983:</strong> Video game crash in North America due to market oversaturation.</li>
            <li><strong>1985:</strong> Nintendo Entertainment System (NES) revives the industry with Super Mario Bros.</li>
            <li><strong>1986:</strong> The Legend of Zelda debuts, pioneering adventure gameplay.</li>
            <li><strong>1989:</strong> Game Boy launches, making handheld gaming mainstream and iconic.</li>
            <li><strong>1989:</strong> Tetris bundled with Game Boy becomes a global puzzle craze.</li>
            </ul>
        </div>
        </section>

        {/* Timeline Section: 1990s */}
        <section className="timeline-section">
        <div
            className="timeline-background"
            style={{ backgroundImage: "url('/pokemon-red-blue.jpg')" }}
        ></div>

        <div className="timeline-textbox">
            <h3>1990s: Rise of Iconic Franchises & 3D Gaming</h3>
            <p>
            The 1990s brought unforgettable franchises and the leap into 3D worlds. Pokémon became a global craze, Sonic raced into pop culture, and games like Doom and Ocarina of Time redefined interactive entertainment. LAN parties and early PC hits gave players their first taste of competitive and narrative-driven play.
            </p>
            <ul>
            <li><strong>1991:</strong> Sonic the Hedgehog defines Sega’s identity and becomes a cultural mascot.</li>
            <li><strong>1992:</strong> Mortal Kombat sparks controversy and leads to ESRB ratings.</li>
            <li><strong>1993:</strong> Doom revolutionizes first-person shooters and modding culture.</li>
            <li><strong>1994:</strong> PlayStation launches, ushering in CD-based gaming.</li>
            <li><strong>1996:</strong> Pokémon Red and Blue spark a global craze across games, TV, and trading cards.</li>
            <li><strong>1996:</strong> Nintendo 64 introduces 3D gameplay with Super Mario 64.</li>
            <li><strong>1997:</strong> GoldenEye 007 sets the standard for console FPS multiplayer.</li>
            <li><strong>1998:</strong> The Legend of Zelda: Ocarina of Time sets new standards for adventure games.</li>
            <li><strong>1998:</strong> StarCraft becomes a competitive RTS phenomenon, especially in South Korea.</li>
            <li><strong>1999:</strong> Half-Life expands narrative-driven PC gaming.</li>
            </ul>
        </div>
        </section>

        {/* Timeline Section: 2000s */}
        <section className="timeline-section">
        <div
            className="timeline-background"
            style={{ backgroundImage: "url('/gta-iv.jpg')" }}
        ></div>

        <div className="timeline-textbox">
            <h3>2000s: Online Multiplayer & Digital Platforms</h3>
            <p>
            The 2000s marked the era of online play and digital distribution. Counter-Strike and Halo turned multiplayer into a social phenomenon, while World of Warcraft created vast online communities. Steam changed how players accessed games forever, and the Wii opened gaming to families and casual audiences.
            </p>
            <ul>
            <li><strong>2000:</strong> Counter-Strike popularizes competitive online shooters.</li>
            <li><strong>2001:</strong> Halo: Combat Evolved launches with the Xbox, defining console shooters.</li>
            <li><strong>2002:</strong> Xbox Live debuts, standardizing online console play.</li>
            <li><strong>2003–2004:</strong> Steam launches, revolutionizing digital distribution.</li>
            <li><strong>2004:</strong> World of Warcraft dominates MMORPGs, creating massive online communities.</li>
            <li><strong>2006:</strong> Nintendo Wii introduces motion controls, expanding gaming to families.</li>
            <li><strong>2007:</strong> Call of Duty 4: Modern Warfare redefines online multiplayer shooters.</li>
            <li><strong>2007:</strong> Rock Band and Guitar Hero fuel rhythm game craze.</li>
            <li><strong>2008:</strong> Grand Theft Auto IV pushes open-world realism.</li>
            <li><strong>Late 2000s:</strong> Flash games on Newgrounds and Kongregate explode in popularity.</li>
            </ul>
        </div>
        </section>

        {/* Timeline Section: 2010s */}
        <section className="timeline-section">
        <div
            className="timeline-background"
            style={{ backgroundImage: "url('/minecraft-2010.png')" }}
        ></div>

        <div className="timeline-textbox">
            <h3>2010s: Esports, Streaming, Indie Breakouts</h3>
            <p>
            Gaming became a global spectacle in the 2010s. Twitch transformed players into entertainers, esports filled stadiums, and indie titles proved small studios could make a massive impact. Viral browser hits and AR games showed the power of simple multiplayer fun.
            </p>
            <ul>
            <li><strong>2010:</strong> StarCraft II reignites competitive RTS esports.</li>
            <li><strong>2011 (June):</strong> Twitch launches, changing how games are consumed and shared.</li>
            <li><strong>2011 (Nov):</strong> Minecraft officially releases, revolutionizing sandbox creativity.</li>
            <li><strong>2012:</strong> Journey and indie hits showcase artistic storytelling.</li>
            <li><strong>2013 (March):</strong> itch.io launches, democratizing indie publishing.</li>
            <li><strong>2013 (Oct):</strong> League of Legends World Championship fills stadiums, marking esports’ mainstream rise.</li>
            <li><strong>2015–2016:</strong> .io games like Agar.io and Slither.io go viral.</li>
            <li><strong>2016 (July):</strong> Pokémon GO brings augmented reality gaming to the masses.</li>
            <li><strong>2017 (Sept):</strong> Fortnite Battle Royale launches, popularizing live in-game events.</li>
            <li><strong>2019:</strong> Apex Legends and battle royale genre dominate online play.</li>
            </ul>
        </div>
        </section>

        {/* Timeline Section: 2020s */}
        <section className="timeline-section">
        <div
            className="timeline-background"
            style={{ backgroundImage: "url('/valorant.jpg')" }}
        ></div>

        <div className="timeline-textbox">
            <h3>2020s: Immersive Tech & Gaming as Culture</h3>
            <p>
            The 2020s pushed gaming into new dimensions. Pandemic-era hits became cultural lifelines, while VR and haptic tech expanded immersion. Landmark releases redefined open-world design, and social platforms turned gaming into shared virtual spaces.
            </p>
            <ul>
            <li><strong>2020 (March):</strong> Animal Crossing: New Horizons becomes a cultural phenomenon during the pandemic.</li>
            <li><strong>2020 (June):</strong> Among Us surges in popularity, becoming a social lifeline during lockdowns.</li>
            <li><strong>2020 (Aug):</strong> Fall Guys releases, blending party games with battle royale mechanics.</li>
            <li><strong>2020 (Nov):</strong> PlayStation 5 and Xbox Series X|S launch, introducing advanced haptic feedback and faster hardware.</li>
            <li><strong>2021:</strong> Valorant rises as a competitive FPS, cementing Riot’s place in esports beyond League of Legends.</li>
            <li><strong>2021 (Oct):</strong> Resident Evil 4 VR showcases immersive VR adaptations of classic titles.</li>
            <li><strong>2022 (Feb):</strong> Elden Ring launches, redefining open-world design and becoming a landmark title of the decade.</li>
            <li><strong>2022 (Nov):</strong> VRChat and similar platforms expand with full-body tracking, fostering social play in virtual spaces.</li>
            <li><strong>2023 (May):</strong> The Legend of Zelda: Tears of the Kingdom releases, setting new standards for open-world creativity.</li>
            <li><strong>2023–2024:</strong> Haptic suits, VR treadmills, and advanced controllers gain traction, pushing tactile immersion mainstream.</li>
            </ul>
        </div>
        </section>
      </div>
    </main>
  );
}

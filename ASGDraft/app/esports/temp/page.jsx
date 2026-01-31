'use client';
import { useState } from "react";
import "./esports.css";

export default function EsportsPage() {
  const [hoverText, setHoverText] = useState(
    "Hover over a tournament card to see its iconic moment."
  );

  const tournaments = [
    {
      name: "The International 2021",
      game: "Dota 2",
      prize: "$40M",
      winner: "Team Spirit",
      moment: "Team Spirit shocked viewers with an underdog victory, cementing their place in esports history.",
    },
    {
      name: "League of Legends Worlds 2023",
      game: "League of Legends",
      prize: "$2.25M",
      winner: "T1",
      moment: "Faker led T1 to their fourth Worlds title, dominating mid lane and thrilling millions of fans worldwide.",
    },
    {
      name: "Valorant Champions 2024",
      game: "Valorant",
      prize: "$2.25M",
      winner: "Evil Geniuses",
      moment: "Evil Geniuses delivered clutch plays in the finals, proving their resilience and securing Valorant's biggest crown.",
    },
    {
      name: "Fortnite World Cup 2019",
      game: "Fortnite",
      prize: "$15.3M",
      winner: "Bugha",
      moment: "16-year-old Bugha dominated the solo finals with 59 points, nearly doubling second place and taking home $3 million in the largest esports prize ever awarded to a single player.",
    },
  ];

  const players = [
    {
      img: "/faker.jpg",
      name: "Faker",
      realName: "Lee Sang-hyeok",
      description: "Legendary mid laner for T1, known as the 'Unkillable Demon King'. With multiple World Championships under his belt, Faker has redefined what it means to be a professional player."
    },
    {
      img: "/s1mple.jpg",
      name: "s1mple",
      realName: "Oleksandr Kostyliev",
      description: "Ukrainian CS:GO superstar, widely regarded as one of the greatest players of all time. His mechanical skill and game sense are unmatched in the competitive scene."
    },
    {
      img: "/tenz.png",
      name: "TenZ",
      realName: "Tyson Ngo",
      description: "Valorant prodigy from Canada, famous for his mechanical skill and clutch plays. TenZ has become the face of Valorant esports with his explosive gameplay."
    },
    {
      img: "/placeholder.png",
      name: "Ninja",
      realName: "Tyler Blevins",
      description: "Fortnite icon who brought streaming into the mainstream. Known for high-energy gameplay and revolutionizing what it means to be a content creator in esports."
    },
    {
      img: "/placeholder.png",
      name: "SonicFox",
      realName: "Dominique McLean",
      description: "Fighting game legend dominating across multiple titles. Multiple EVO champion known for incredible adaptability and creative playstyle across the FGC."
    },
    {
      img: "/placeholder.png",
      name: "Caps",
      realName: "Rasmus Winther",
      description: "European League of Legends mid lane powerhouse for G2 Esports. Known for fearless aggression and highlight-reel outplays that define modern competitive League."
    },
    {
      img: "/placeholder.png",
      name: "Serral",
      realName: "Joona Sotala",
      description: "Finnish StarCraft II prodigy, the only non-Korean to dominate the professional scene. His strategic mastery has redefined Zerg play at the highest level."
    },
  ];

  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handlePlayerClick = (index) => {
    setSelectedPlayerIndex(index);
    const anglePerCard = 360 / players.length;
    setRotation(-index * anglePerCard);
  };

  return (
    <main>
      {/* Hero Banner */}
      <section className="esports-hero">
        <video className="esports-video" autoPlay muted loop playsInline>
          <source src="/esports.mp4" type="video/mp4" />
        </video>
        <div className="esports-overlay">
          <h1 className="esports-title">
            <span className="block">THE GLOBAL STAGE</span>
            <span className="block">OF ESPORTS</span>
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <div className="esports-content">
        <section className="esports-intro">
          <h2 className="esports-section-title">
            Esports in the 2020s: Competition Without Borders
          </h2>
          <h3 className="esports-subtitle">
            From local arenas to global stages
          </h3>
          <p>
            Esports has transformed from niche LAN parties into a global phenomenon, 
            filling stadiums and streaming platforms with millions of fans. The 2020s 
            have seen competitive gaming rise alongside traditional sports, with 
            professional players, massive prize pools, and international leagues 
            capturing the spotlight. More than just games, esports represents 
            community, culture, and the thrill of competition. In this section, 
            explore the titles, teams, and tournaments that are shaping the future of play.
          </p>
        </section>

        {/* Major Tournaments Section */}
        <section className="tournament-section">
          <div className="tournament-text-intro">
            <h2 className="tournament-title">The Tournaments That Defined Esports</h2>
            <h3 className="tournament-subtitle">Epic Arenas, Legendary Victories</h3>
            <p className="tournament-intro">
              These tournaments represent the absolute pinnacle of competitive gaming — 
              moments where skill, strategy, and spectacle collide on the biggest stages 
              in the world. From sold‑out arenas to millions of viewers online, each event 
              pushes the boundaries of what esports can achieve, turning matches into 
              cultural milestones and players into legends. Flip the cards to uncover 
              the staggering prize pools, relive the iconic victories, and see which teams 
              carved their names into history.
            </p>
          </div>

          <div className="card-row">
            {tournaments.map((t, idx) => (
              <div
                key={idx}
                className="tournament-card"
                onMouseEnter={() => setHoverText(t.moment)}
                onMouseLeave={() =>
                  setHoverText(
                    "Hover over a tournament card to see its iconic moment."
                  )
                }
              >
                <div className="card-content">
                  <div className="card-front">
                    <span className="tournament-name">{t.name}</span>
                    <p className="tournament-game">{t.game}</p>
                  </div>
                  <div className="card-back">
                    <p className="prize-label">Prize Pool</p>
                    <p className="prize-amount">{t.prize}</p>
                    <p className="winner-text">Winner: {t.winner}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hover-info">
            <div className="info-glow-line"></div>
            <p>{hoverText}</p>
            <div className="info-glow-line"></div>
          </div>
        </section>

        {/* Teams & Players Section */}
        <section className="teams-section">
          {/* Top text block */}
          <div className="teams-text">
            <h2 className="esports-section-title">The Icons Behind the Game</h2>
            <h3 className="esports-subtitle">Teams that Dominate, Players that Inspire</h3>
            <p className="teams-intro">
              Esports is built on more than tournaments — it thrives on the teams and
              players who bring them to life. Organizations create dynasties through
              discipline and strategy, while individual stars capture the imagination
              of millions with their skill, personality, and unforgettable plays.
              Together, they form the stories that fans remember long after the final
              match.
            </p>
          </div>

          {/* Player Carousel + Info */}
          <div className="players-container">
            <div className="carousel-wrapper">
              <div 
                className="carousel-container"
                style={{
                  transform: `translate(-50%, -50%) rotateX(-10deg) rotateY(${rotation}deg)`
                }}
              >
                {players.map((player, index) => {
                  const anglePerCard = 360 / players.length;
                  const angle = index * anglePerCard;
                  const isSelected = index === selectedPlayerIndex;
                  
                  return (
                    <div
                      key={index}
                      className={`carousel-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(280px)`
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayerClick(index);
                      }}
                    >
                      <div 
                        className="player-card-image"
                        style={{ backgroundImage: `url(${player.img})` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info panel */}
            <div className="player-info">
              <h2>{players[selectedPlayerIndex].name}</h2>
              <h3>{players[selectedPlayerIndex].realName}</h3>
              <p>{players[selectedPlayerIndex].description}</p>
            </div>
          </div>

        </section>

        <section className="esports-conclusion">
          <div className="conclusion-glow-line"></div>
          <p className="conclusion-text">
            From Seoul to Stockholm, from Toronto to Tokyo, esports transcends borders. 
            The players you've seen here are more than champions — they are ambassadors 
            of a global culture, shaping how millions connect, celebrate, and dream. 
            Just as museums preserve the stories of art and history, this exhibit 
            preserves the living legacy of esports, reminding us that the stage is 
            truly worldwide and the next legend may rise from anywhere.
          </p>
          <div className="conclusion-glow-line"></div>
        </section>

      </div>
    </main>
  );
}

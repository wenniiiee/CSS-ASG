'use client';
import "./games.css";
import { useState } from "react";
import ScrollReveal from '../../components/ScrollReveal';

export default function GamesPage() {
  // --- Card Setup ---
  const gamesList = [
    "The Last of Us Part II", "Ghost of Tsushima", "Cyberpunk 2077",
    "Animal Crossing: New Horizons", "Final Fantasy VII Remake", "Elden Ring",
    "God of War: Ragnarök", "The Legend of Zelda: Tears of the Kingdom",
    "Starfield", "Marvel's Spider-Man 2", "Hades", "Fall Guys: Ultimate Knockout",
    "Genshin Impact", "It Takes Two", "Sifu", "Cult of the Lamb",
    "Baldur's Gate 3", "Dave the Diver", "Palworld", "Omori",
  ];

  const initialCards = gamesList.map((game, i) => ({
    id: i,
    name: game,
    tier: 'unranked'
  }));

  const [cards, setCards] = useState(initialCards);
  const [draggedCard, setDraggedCard] = useState(null);

  // Tier list data
  const tiers = [
    { id: 's-tier', label: 'S', description: 'Life-changing' },
    { id: 'a-tier', label: 'A', description: 'Amazing, but not life-changing' },
    { id: 'b-tier', label: 'B', description: "It's pretty alright" },
    { id: 'c-tier', label: 'C', description: "Couldn't get into it" },
    { id: 'd-tier', label: 'D', description: 'Uninstalled, hated it' },
  ];

  const handleDragStart = (e, card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedCard(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, tierId) => {
    e.preventDefault();
    if (!draggedCard) return;

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === draggedCard.id ? { ...card, tier: tierId } : card
      )
    );
    
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDragEnter = (e) => {
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  // --- Poll Setup ---
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasVoted) return;

    // Pick 3 random winners
    const topIndexes = [];
    while (topIndexes.length < 3) {
      const rand = Math.floor(Math.random() * gamesList.length);
      if (!topIndexes.includes(rand)) topIndexes.push(rand);
    }

    const votes = gamesList.map((game, i) => {
      let count;
      if (i === topIndexes[0]) {
        count = Math.floor(Math.random() * 100) + 1200;
      } else if (i === topIndexes[1]) {
        count = Math.floor(Math.random() * 150) + 900;
      } else if (i === topIndexes[2]) {
        count = Math.floor(Math.random() * 150) + 600;
      } else {
        count = Math.floor(Math.random() * 200) + 50;
      }
      return { game, count };
    });

    const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);
    const withPercent = votes.map((v) => ({
      ...v,
      percent: ((v.count / totalVotes) * 100).toFixed(1),
    }));

    withPercent.sort((a, b) => b.count - a.count);

    setAnimateBars(false);
    setResults(withPercent);
    setHasVoted(true);
    setTimeout(() => setAnimateBars(true), 100);
  };

  const adjustedWidth = (count, maxCount) => {
    const scaled = (count / maxCount) * 100;
    return Math.max(10, scaled);
  };

  return (
    <main>
      {/* Hero Banner */}
      <section className="games-hero">
        <video className="games-video" autoPlay muted loop playsInline>
          <source src="/games.mp4" type="video/mp4" />
        </video>
        <div className="games-overlay">
          <h1 className="games-title">
            <span className="block">THE WORLD</span>
            <span className="block">OF GAMES</span>
          </h1>
        </div>
      </section>

      <div className="games-content">
        {/* Intro Section */}
        <section className="games-intro">
          <h2 className="games-section-title">
            The Games That Are Shaping the 2020s and Redefining How We Play
          </h2>
          <p>
            The 2020s have already proven to be one of the most transformative decades
            in gaming history. With the rise of powerful new consoles, groundbreaking
            PC releases, and indie studios pushing creative boundaries, players have
            been treated to experiences that blend technical innovation with emotional
            storytelling. From sprawling open worlds that reward exploration, to
            competitive titles that connect millions across the globe, this decade has
            redefined what it means to play. As you scroll through the standout games
            showcased here, consider how each one has shaped culture, community, and
            the future of interactive entertainment — then cast your vote in the poll
            to decide which title best represents the spirit of the 2020s.
          </p>
        </section>

        {/* Scroll Reveal */}
        <section className="games-scroll-section">
          <ScrollReveal>
            RANK THE GAMES
          </ScrollReveal>
        </section>
        
        <section className="games-scroll-section">
          <ScrollReveal>
            THAT DEFINED
          </ScrollReveal>
        </section>
        
        <section className="games-scroll-section">
          <ScrollReveal>
            THIS DECADE
          </ScrollReveal>
        </section>

        {/* Tier List Section */}
        <section className="games-card-section">
          <div className="tierlist-wrapper">
            <div className="tierlist-container">
              {tiers.map(tier => (
                <div key={tier.id} className={`tier-row ${tier.id}`}>
                  <div className="tier-label">{tier.label}</div>
                  <div
                    className="tier-drop-zone"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, tier.id)}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                  >
                    {cards.filter(card => card.tier === tier.id).length === 0 && (
                      <span className="tier-description">{tier.description}</span>
                    )}
                    {cards
                      .filter(card => card.tier === tier.id)
                      .map(card => (
                        <div
                          key={card.id}
                          className="card"
                          draggable
                          onDragStart={(e) => handleDragStart(e, card)}
                          onDragEnd={handleDragEnd}
                        >
                          <img
                            src={`/${card.id + 1}.png`}
                            alt={card.name}
                            draggable="false"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="unranked-zone">
              <div className="unranked-title">Unranked Games</div>
              <div
                className="unranked-cards"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'unranked')}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                {cards
                  .filter(card => card.tier === 'unranked')
                  .map(card => (
                    <div
                      key={card.id}
                      className="card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, card)}
                      onDragEnd={handleDragEnd}
                    >
                      <img
                        src={`/${card.id + 1}.png`}
                        alt={card.name}
                        draggable="false"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Poll Section */}
        <section className="poll-section">
          <h2 className="poll-title">Cast your vote!</h2>
          <p className="poll-description">
            You've seen the logos, ranked the games, and jogged your memory of the 2020s. 
            Now it's time to settle the score — which game truly deserves the crown? 
            Pick your favorite from the list below and let's see how the community stacks up.
          </p>

          <form onSubmit={handleSubmit} className="poll-form">
            <div className="select">
              <div
                className="selected"
                onClick={() => setShowOptions(!showOptions)}
              >
                {selected || "Select a game"}
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
                  className={`arrow ${showOptions ? "open" : ""}`}>
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 
                    0l192-192c12.5-12.5 12.5-32.8 
                    0-45.3s-32.8-12.5-45.3 0L256 338.7 
                    86.6 169.4c-12.5-12.5-32.8-12.5-45.3 
                    0s-12.5 32.8 0 45.3l192 192z"></path>
                </svg>
              </div>
              {showOptions && (
                <div className="options">
                  {gamesList.map((game, i) => (
                    <div key={i} className="option"
                      onClick={() => { setSelected(game); setShowOptions(false); }}>
                      {game}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="vote-button" disabled={hasVoted}>
              {hasVoted ? "Voted!" : "Vote"}
            </button>
          </form>

          {results && (
            <div className="poll-results">
              <h3 className="poll-results-title">Poll Results</h3>
              <div>
                {results.map((r, i) => (
                  <div key={r.game} className="poll-result-item">
                    <span className="game-name">{r.game}</span>
                    <div className="bar-container">
                      <div
                        className={`bar ${i === 0 ? "first" : i === 1 ? "second" : i === 2 ? "third" : "other"}`}
                        style={{
                          width: animateBars
                            ? `${adjustedWidth(r.count, results[0].count)}%`
                            : "0%",
                        }}
                      >
                        <span className="bar-stats">{r.percent}% ({r.count})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

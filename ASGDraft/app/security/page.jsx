'use client';
import { useState } from 'react';
import "./security.css";

export default function SecurityPage() {
  // Account Breach Simulator State
  const [password, setPassword] = useState('');
  const [breachResult, setBreachResult] = useState(null);
  const [isHacking, setIsHacking] = useState(false);

  // Phishing Quest State
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [phishingResult, setPhishingResult] = useState(null);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [exp, setExp] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [droppedItems, setDroppedItems] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const maxExp = 1000;
  const expPerQuestion = 100;

  const quizQuestions = [
    {
      type: 'mcq',
      question: 'Which of the following is the MOST secure password?',
      options: [
        'password123',
        'Gamer2024!',
        'T#9mK$2pL@8xR&5nQ',
        'ilovegaming'
      ],
      correct: 2,
      explanation: 'A strong password uses a mix of uppercase, lowercase, numbers, and special characters with at least 12 characters. Random combinations are harder to crack than common words or patterns.'
    },
    {
      type: 'mcq',
      question: 'You receive a Discord message: "Click here to claim your free Robux!" What should you do?',
      options: [
        'Click the link immediately',
        'Share it with friends first',
        'Ignore and report as spam/phishing',
        'Click but don\'t enter any information'
      ],
      correct: 2,
      explanation: 'Legitimate companies never ask you to claim rewards through unsolicited links. This is a classic phishing attempt. Always report and ignore such messages.'
    },
    {
      type: 'drag-drop',
      question: 'Match each security threat to its correct description:',
      items: [
        { id: 'phishing', label: 'Phishing' },
        { id: 'malware', label: 'Malware' },
        { id: 'ddos', label: 'DDoS Attack' },
        { id: 'bruteforce', label: 'Brute Force' }
      ],
      zones: [
        { id: 'phishing', label: 'Fake messages trying to steal your credentials' },
        { id: 'malware', label: 'Malicious software that infects your system' },
        { id: 'ddos', label: 'Overwhelming a server with traffic to make it crash' },
        { id: 'bruteforce', label: 'Trying many password combinations to break in' }
      ],
      explanation: 'Understanding different types of cyber threats helps you recognize and defend against them in gaming environments.'
    },
    {
      type: 'mcq',
      question: 'What is Two-Factor Authentication (2FA)?',
      options: [
        'Using two different passwords',
        'Logging in from two devices',
        'A second verification step beyond your password',
        'Having two gaming accounts'
      ],
      correct: 2,
      explanation: '2FA adds an extra layer of security by requiring a second form of verification (like a code sent to your phone) in addition to your password. This dramatically reduces the risk of account takeover.'
    },
    {
      type: 'mcq',
      question: 'A player offers to trade you a rare item for half its market value. What\'s the safest response?',
      options: [
        'Accept immediately before they change their mind',
        'Ask them to send the item first',
        'Be suspicious - it\'s likely a scam',
        'Give them your account to complete the trade'
      ],
      correct: 2,
      explanation: 'If a deal seems too good to be true, it usually is. Scammers often use lowball offers to lure victims. Always use official trading platforms and verify the legitimacy of trades.'
    },
    {
      type: 'drag-drop',
      question: 'Categorize these actions as SAFE or UNSAFE:',
      items: [
        { id: 'safe1', label: 'Enable 2FA' },
        { id: 'unsafe1', label: 'Share account with friends' },
        { id: 'safe2', label: 'Use unique passwords' },
        { id: 'unsafe2', label: 'Click email links from strangers' },
        { id: 'safe3', label: 'Verify website URLs' },
        { id: 'unsafe3', label: 'Download mods from random sites' }
      ],
      zones: [
        { id: 'safe', label: 'SAFE PRACTICES', accepts: ['safe1', 'safe2', 'safe3'] },
        { id: 'unsafe', label: 'UNSAFE PRACTICES', accepts: ['unsafe1', 'unsafe2', 'unsafe3'] }
      ],
      explanation: 'Practicing good security habits like enabling 2FA, using unique passwords, and verifying sources keeps your gaming accounts and personal data protected.'
    }
  ];

  // Password strength checker
  const checkPasswordStrength = () => {
    if (!password) return;

    setIsHacking(true);
    
    setTimeout(() => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isLongEnough = password.length >= 12;

      const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough].filter(Boolean).length;

      // Calculate character set size
      let charSetSize = 0;
      if (hasLowerCase) charSetSize += 26;
      if (hasUpperCase) charSetSize += 26;
      if (hasNumbers) charSetSize += 10;
      if (hasSpecialChar) charSetSize += 32;
      
      // Calculate possible combinations
      const combinations = Math.pow(charSetSize, password.length);
      
      // Assume 10 billion guesses per second (modern GPU)
      const guessesPerSecond = 10000000000;
      const secondsToCrack = combinations / guessesPerSecond;
      
      // Convert to readable time
      let crackTime = '';
      if (secondsToCrack < 1) {
        crackTime = 'less than a second';
      } else if (secondsToCrack < 60) {
        crackTime = `${Math.round(secondsToCrack)} seconds`;
      } else if (secondsToCrack < 3600) {
        crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
      } else if (secondsToCrack < 86400) {
        crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
      } else if (secondsToCrack < 31536000) {
        crackTime = `${Math.round(secondsToCrack / 86400)} days`;
      } else if (secondsToCrack < 31536000000) {
        crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
      } else {
        crackTime = `${(secondsToCrack / 31536000).toExponential(2)} years`;
      }

      if (strengthScore >= 4) {
        setBreachResult({ status: 'secure', crackTime });
      } else {
        setBreachResult({ status: 'hacked', crackTime });
      }
      setIsHacking(false);
    }, 2000);
  };

  const resetBreach = () => {
    setPassword('');
    setBreachResult(null);
    setIsHacking(false);
  };

  // Phishing message handler
  const phishingMessages = [
    {
      id: 1,
      from: 'Steam Support',
      email: 'support@steam-security.tk',
      subject: 'URGENT: Account Security Verification Required',
      message: 'Dear Valued Customer,\n\nWe have detected unusual login activity on your Steam account from an unrecognized device in [Unknown Location]. For your security, we have temporarily limited your account access.\n\nTo restore full access to your account and verify your identity, please click the link below within the next 24 hours. Failure to verify your account will result in permanent suspension.\n\nClick here to verify your account: http://steam-security-verify.tk/auth/verify?id=8472659\n\nThis is an automated security measure to protect your account. If you believe this is an error, please contact our support team immediately.\n\nThank you for your cooperation.\n\nBest regards,\nSteam Security Team\nValve Corporation',
      link: 'http://steam-security-verify.tk/auth/verify?id=8472659',
      isPhishing: true,
      reason: 'This is a phishing attempt. Red flags include:\n\n1. The email domain uses .tk (a free domain often used by scammers), not the official @steampowered.com.\n\n2. Creates urgency with threats of "permanent suspension".\n\n3. Asks you to click an external link to verify.\n\n4. Official Steam will never ask for verification through external links - they direct you to check your account on their official website.\n\nAlways verify sender email addresses and go directly to official websites rather than clicking links.'
    },
    {
      id: 2,
      from: 'Epic Games Store',
      email: 'noreply@epicgames.com',
      subject: 'Purchase Confirmation - Fortnite V-Bucks',
      message: 'Hello,\n\nThank you for your recent purchase from the Epic Games Store.\n\nOrder Details:\n- Item: 5,000 Fortnite V-Bucks\n- Amount: $31.99 USD\n- Date: January 31, 2026\n- Order ID: EPG-2026-847291\n\nYour V-Bucks have been added to your account and are ready to use. You can view your purchase history and manage your account settings at any time by logging into your account at www.epicgames.com.\n\nIf you did not make this purchase or have any questions about this transaction, please review your account security settings and contact our support team through the official Epic Games website.\n\nThank you for being part of the Epic Games community.\n\nEpic Games Team',
      link: null,
      isPhishing: false,
      reason: 'This is a legitimate notification. Key indicators:\n\n1. Uses the official @epicgames.com email address.\n\n2. Doesn\'t create false urgency or threats.\n\n3. Doesn\'t ask you to click verification links - instead directs you to visit the official website yourself.\n\n4. Provides clear order details without requesting any personal information.\n\n5. Maintains a professional tone without pressuring you to act immediately.\n\nLegitimate companies send informational receipts and direct you to check your account through official channels, not external links.'
    }
  ];

  const handleMessageClick = (msg) => {
    setSelectedMessage(msg);
    setPhishingResult(msg);
  };

  const resetPhishing = () => {
    setSelectedMessage(null);
    setPhishingResult(null);
  };

  // Quiz handlers
  const handleMCQAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleDragStart = (e, itemId) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a visible drag image
    const dragImage = e.target.cloneNode(true);
    dragImage.style.opacity = '0.8';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, e.target.offsetWidth / 2, e.target.offsetHeight / 2);
    
    // Clean up the clone after drag starts
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (draggedItem) {
      setDroppedItems(prev => ({
        ...prev,
        [draggedItem]: zoneId
      }));
      setDraggedItem(null);
    }
  };

  const handleRemoveItem = (itemId) => {
    if (showResult) return;
    setDroppedItems(prev => {
      const newItems = { ...prev };
      delete newItems[itemId];
      return newItems;
    });
  };

  const checkDragDropAnswer = () => {
    const currentQ = quizQuestions[currentQuestion];
    let correct = true;

    if (currentQ.zones.length === 2 && currentQ.zones[0].accepts) {
      const safeZone = currentQ.zones.find(z => z.id === 'safe');
      const unsafeZone = currentQ.zones.find(z => z.id === 'unsafe');
      
      for (let [itemId, zoneId] of Object.entries(droppedItems)) {
        if (safeZone.accepts.includes(itemId) && zoneId !== 'safe') {
          correct = false;
        }
        if (unsafeZone.accepts.includes(itemId) && zoneId !== 'unsafe') {
          correct = false;
        }
      }
      
      if (Object.keys(droppedItems).length !== currentQ.items.length) {
        correct = false;
      }
    } else {
      for (let [itemId, zoneId] of Object.entries(droppedItems)) {
        if (itemId !== zoneId) {
          correct = false;
        }
      }
      
      if (Object.keys(droppedItems).length !== currentQ.items.length) {
        correct = false;
      }
    }

    return correct;
  };

  const submitAnswer = () => {
    const currentQ = quizQuestions[currentQuestion];
    let isCorrect = false;

    if (currentQ.type === 'mcq') {
      isCorrect = selectedAnswer === currentQ.correct;
    } else {
      isCorrect = checkDragDropAnswer();
    }

    if (isCorrect) {
      setExp(prev => Math.min(prev + expPerQuestion, maxExp));
      setScore(prev => prev + 1);
    }

    setAnsweredQuestions(prev => [...prev, { question: currentQuestion, correct: isCorrect }]);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setDroppedItems({});
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setExp(0);
    setShowResult(false);
    setQuizComplete(false);
    setScore(0);
    setDroppedItems({});
    setAnsweredQuestions([]);
  };

  const currentQ = quizQuestions[currentQuestion];
  const expPercentage = (exp / maxExp) * 100;
  const successPercentage = quizComplete ? Math.round((score / quizQuestions.length) * 100) : 0;

  return (
    <main>
      {/* Hero Banner */}
      <section className="security-hero">
        <video className="security-video" autoPlay muted loop playsInline>
          <source src="/security.mp4" type="video/mp4" />
        </video>
        <div className="security-overlay">
          <h1 className="security-title">
            <span className="block">CYBER SECURITY</span>
            <span className="block">IN GAMING</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="security-content">
        {/* Intro Section */}
        <section className="security-intro">
          <h2 className="security-section-title">
            Protecting Your Digital Identity
          </h2>
          <h3 className="security-subtitle">
            The Invisible Battlefield
          </h3>
          <p>
            In the digital age of gaming, threats don't just come from opponents in-game—they lurk in login screens, chat messages, and trading platforms. With millions of gaming accounts targeted each year, cybersecurity has become as crucial as mastering game mechanics. From credential theft and phishing scams to account takeovers and marketplace fraud, gamers face a unique set of security challenges. This interactive exhibit teaches you to recognize threats, protect your accounts, and navigate the digital gaming landscape safely. Welcome to the invisible battlefield—where your knowledge is your strongest defense.
          </p>
        </section>

        {/* Account Breach Simulator Section */}
        <section className="security-section">
          <h2 className="security-section-title">Account Breach Simulator</h2>
          <h3 className="security-subtitle">Test Your Password Strength</h3>
          <p className="security-description">
            Every day, thousands of gaming accounts are compromised through weak passwords. Hackers use automated tools that can try millions of password combinations per second, making simple passwords incredibly vulnerable. This simulator demonstrates how quickly a weak password can be cracked versus a strong one. Enter a password below and see if your account would survive a real attack. Strong passwords are your first line of defense—learn what makes them unbreakable.
          </p>
        </section>

        {/* Breach Simulator Interactive */}
        <section className="breach-simulator">
          <div className={`simulator-container ${breachResult ? breachResult.status : ''} ${isHacking ? 'hacking' : ''}`}>
            {!breachResult && !isHacking && (
              <div className="login-screen">
                <div className="login-header">
                  <img src="/placeholder.png" alt="Platform" className="platform-icon-img" />
                  <h3>GAMING PLATFORM LOGIN</h3>
                </div>
                <div className="login-form">
                  <div className="input-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value="GamerPro2024"
                      disabled
                      className="security-input disabled"
                    />
                  </div>
                  <div className="input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="security-input"
                    />
                  </div>
                  <button onClick={checkPasswordStrength} className="login-button">
                    LOGIN
                  </button>
                </div>
              </div>
            )}

            {isHacking && (
              <div className="hacking-screen">
                <div className="hacking-animation">
                  <img src="/placeholder.png" alt="Hacking" className="skull-img" />
                  <div className="hacking-text">ATTEMPTING BREACH...</div>
                  <div className="loading-bar">
                    <div className="loading-fill"></div>
                  </div>
                  <div className="code-lines">
                    <span>{'> Initiating brute force attack...'}</span>
                    <span>{'> Testing common passwords...'}</span>
                    <span>{'> Analyzing password strength...'}</span>
                  </div>
                </div>
              </div>
            )}

            {breachResult?.status === 'hacked' && (
              <div className="result-screen hacked">
                <img src="/placeholder.png" alt="Warning" className="result-icon-img" />
                <h2>ACCOUNT BREACHED!</h2>
                <p>Your password would be cracked in approximately <strong>{breachResult.crackTime}</strong>. Here&apos;s why:</p>
                <ul className="weakness-list">
                  {password.length < 12 && <li>Too short (less than 12 characters)</li>}
                  {!/[A-Z]/.test(password) && <li>No uppercase letters</li>}
                  {!/[a-z]/.test(password) && <li>No lowercase letters</li>}
                  {!/\d/.test(password) && <li>No numbers</li>}
                  {!/[!@#$%^&*(),.?":{}|<>]/.test(password) && <li>No special characters</li>}
                </ul>
                <p className="recommendation">
                  <strong>Recommendation:</strong> Use at least 12 characters with uppercase, lowercase, numbers, and special symbols.
                </p>
                <button onClick={resetBreach} className="retry-button">TRY AGAIN</button>
              </div>
            )}

            {breachResult?.status === 'secure' && (
              <div className="result-screen secure">
                <img src="/placeholder.png" alt="Shield" className="result-icon-img shield" />
                <h2>ACCOUNT SECURE!</h2>
                <p>Excellent! It would take approximately <strong>{breachResult.crackTime}</strong> to crack your password - that&apos;s strong enough to resist common attacks.</p>
                <div className="security-features">
                  <div className="feature">✓ Sufficient length</div>
                  <div className="feature">✓ Mixed characters</div>
                  <div className="feature">✓ Special symbols</div>
                  <div className="feature">✓ Hard to crack</div>
                </div>
                <p className="recommendation">
                  <strong>Pro Tip:</strong> Enable Two-Factor Authentication for an extra layer of security!
                </p>
                <button onClick={resetBreach} className="retry-button">TRY ANOTHER</button>
              </div>
            )}
          </div>
        </section>

        {/* Transition Text */}
        <div className="transition-text">
          <p>
            Strong passwords are essential, but they&apos;re not the only threat. Cybercriminals also use social engineering—manipulating you into giving up your credentials willingly. Let&apos;s learn to spot these deceptive tactics.
          </p>
        </div>

        {/* Phishing Quest Section */}
        <section className="security-section">
          <h2 className="security-section-title">Phishing Quest</h2>
          <h3 className="security-subtitle">Spot the Scam</h3>
          <p className="security-description">
            Phishing attacks are among the most common threats gamers face. Scammers impersonate legitimate platforms, create fake giveaways, or send urgent security alerts to trick you into revealing your login credentials or personal information. These messages often look convincing, using official logos and urgent language to pressure you into acting quickly. Below are two messages—one legitimate, one a phishing attempt. Can you identify the scam before it&apos;s too late?
          </p>
        </section>

        {/* Phishing Interactive */}
        <section className="phishing-quest">
          <div className="quest-container">
            {!phishingResult && (
              <div className="messages-grid">
                {phishingMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="message-card"
                    onClick={() => handleMessageClick(msg)}
                  >
                    <div className="message-header">
                      <img src="/placeholder.png" alt="Email" className="sender-icon-img" />
                      <div className="sender-info">
                        <div className="sender-name">{msg.from}</div>
                        <div className="sender-email">{msg.email}</div>
                        <div className="timestamp">2 hours ago</div>
                      </div>
                    </div>
                    <div className="message-subject">
                      <strong>Subject:</strong> {msg.subject}
                    </div>
                    <div className="message-body">
                      <p>{msg.message}</p>
                      {msg.link && (
                        <div className="message-link">
                          🔗 {msg.link}
                        </div>
                      )}
                    </div>
                    <div className="message-action">
                      <button className="inspect-button">INSPECT MESSAGE</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {phishingResult && (
              <div className={`phishing-result ${phishingResult.isPhishing ? 'phishing-detected' : 'legitimate'}`}>
                <div className="result-header">
                  <img 
                    src="/placeholder.png" 
                    alt={phishingResult.isPhishing ? 'Alert' : 'Verified'} 
                    className="result-icon-large-img"
                  />
                  <h2>
                    {phishingResult.isPhishing ? 'PHISHING DETECTED!' : 'LEGITIMATE MESSAGE'}
                  </h2>
                </div>
                <div className="analysis">
                  <h4>Analysis:</h4>
                  <p>{phishingResult.reason}</p>
                </div>
                {phishingResult.isPhishing && (
                  <div className="warning-tips">
                    <h4>Red Flags to Watch For:</h4>
                    <ul>
                      <li>Suspicious or misspelled URLs</li>
                      <li>Urgent threats about account suspension</li>
                      <li>Requests to click external links</li>
                      <li>Unsolicited messages asking for verification</li>
                      <li>Too-good-to-be-true offers</li>
                    </ul>
                  </div>
                )}
                <button onClick={resetPhishing} className="retry-button">ANALYZE AGAIN</button>
              </div>
            )}
          </div>
        </section>

        {/* Transition Text 2 */}
        <div className="transition-text">
          <p>
            Now that you&apos;ve learned to recognize weak passwords and phishing attempts, it&apos;s time to test your overall cybersecurity knowledge. Put your skills to the ultimate test in our Security Awareness Challenge.
          </p>
        </div>

        {/* Quiz Section */}
        <section className="security-section">
          <h2 className="security-section-title">Security Awareness Challenge</h2>
          <h3 className="security-subtitle">Level Up Your Cyber Defense</h3>
          <p className="security-description">
            Knowledge is power in the world of cybersecurity. This gamified quiz challenges your understanding of gaming security threats, best practices, and defensive strategies. Earn experience points for each correct answer and track your progress as you advance through increasingly challenging scenarios. Whether you&apos;re a security novice or a seasoned defender, this challenge will sharpen your skills and prepare you for real-world threats. Ready to prove you&apos;re a cybersecurity champion?
          </p>
        </section>

        {/* Quiz Interactive */}
        <section className="quiz-section">
          {!quizComplete ? (
            <div className="quiz-container">
              {/* EXP Bar */}
              <div className="exp-bar-container">
                <div className="exp-info">
                  <span className="exp-label">SECURITY LEVEL</span>
                  <span className="exp-value">{exp} / {maxExp} XP</span>
                </div>
                <div className="exp-bar">
                  <div className="exp-fill" style={{ width: `${expPercentage}%` }}>
                    <div className="exp-shine"></div>
                  </div>
                </div>
              </div>

              {/* Question Counter */}
              <div className="question-counter">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>

              {/* Question */}
              <div className="question-card">
                <h3 className="question-text">{currentQ.question}</h3>

                {currentQ.type === 'mcq' && (
                  <div className="options-grid">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        className={`option-button ${selectedAnswer === index ? 'selected' : ''} ${
                          showResult
                            ? index === currentQ.correct
                              ? 'correct'
                              : selectedAnswer === index
                              ? 'incorrect'
                              : ''
                            : ''
                        }`}
                        onClick={() => handleMCQAnswer(index)}
                        disabled={showResult}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span className="option-text">{option}</span>
                        {showResult && index === currentQ.correct && (
                          <span className="check-icon">✓</span>
                        )}
                        {showResult && selectedAnswer === index && index !== currentQ.correct && (
                          <span className="x-icon">✗</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {currentQ.type === 'drag-drop' && (
                  <div className="drag-drop-container">
                    <div className="drag-items">
                      <h4>Drag these items:</h4>
                      <div className="items-pool">
                        {currentQ.items.map((item) => (
                          <div
                            key={item.id}
                            className={`drag-item ${droppedItems[item.id] ? 'placed' : ''}`}
                            draggable={!showResult && !droppedItems[item.id]}
                            onDragStart={(e) => handleDragStart(e, item.id)}
                          >
                            {item.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="drop-zones">
                      <h4>Drop them here:</h4>
                      {currentQ.zones.map((zone) => (
                        <div
                          key={zone.id}
                          className={`drop-zone ${
                            showResult
                              ? zone.accepts
                                ? Object.entries(droppedItems).every(([itemId, zoneId]) => {
                                    if (zone.accepts.includes(itemId)) {
                                      return zoneId === zone.id;
                                    }
                                    return true;
                                  })
                                  ? 'correct-zone'
                                  : 'incorrect-zone'
                                : Object.keys(droppedItems).includes(zone.id) && droppedItems[zone.id] === zone.id
                                ? 'correct-zone'
                                : Object.values(droppedItems).includes(zone.id)
                                ? 'incorrect-zone'
                                : ''
                              : ''
                          }`}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, zone.id)}
                        >
                          <div className="zone-label">{zone.label}</div>
                          <div className="zone-content">
                            {Object.entries(droppedItems)
                              .filter(([_, zoneId]) => zoneId === zone.id)
                              .map(([itemId, _]) => {
                                const item = currentQ.items.find(i => i.id === itemId);
                                return (
                                  <div key={itemId} className="dropped-item" onClick={() => handleRemoveItem(itemId)}>
                                    {item.label}
                                    {!showResult && <span className="remove-icon">×</span>}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showResult && (
                  <div className={`explanation ${answeredQuestions[answeredQuestions.length - 1].correct ? 'correct-exp' : 'incorrect-exp'}`}>
                    <div className="exp-header">
                      <img 
                        src="/placeholder.png" 
                        alt={answeredQuestions[answeredQuestions.length - 1].correct ? 'Correct' : 'Learn'} 
                        className="exp-icon-img"
                      />
                      <span className="exp-title">
                        {answeredQuestions[answeredQuestions.length - 1].correct ? 'Correct! +100 XP' : 'Incorrect - Learn from this!'}
                      </span>
                    </div>
                    <p>{currentQ.explanation}</p>
                  </div>
                )}

                <div className="quiz-actions">
                  {!showResult ? (
                    <button
                      className="submit-button"
                      onClick={submitAnswer}
                      disabled={
                        currentQ.type === 'mcq'
                          ? selectedAnswer === null
                          : Object.keys(droppedItems).length !== currentQ.items.length
                      }
                    >
                      SUBMIT ANSWER
                    </button>
                  ) : (
                    <button className="next-button" onClick={nextQuestion}>
                      {currentQuestion < quizQuestions.length - 1 ? 'NEXT QUESTION' : 'VIEW RESULTS'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={`quiz-complete ${score > 4 ? 'success' : 'fail'}`}>
              <div className="completion-header">
                <img src="/placeholder.png" alt="Trophy" className="trophy-icon-img" />
                <h2>CHALLENGE COMPLETE!</h2>
              </div>
              <div className="final-stats">
                <div className="stat-card progress-wheel-card">
                  <svg className="progress-wheel" viewBox="0 0 200 200">
                    <circle
                      className="progress-wheel-bg"
                      cx="100"
                      cy="100"
                      r="85"
                    />
                    <circle
                      className={`progress-wheel-fill ${score > 4 ? 'success' : 'fail'}`}
                      cx="100"
                      cy="100"
                      r="85"
                      strokeDasharray={`${successPercentage * 5.34} 534`}
                    />
                    <text x="100" y="95" className={`progress-percentage ${score > 4 ? 'success' : 'fail'}`}>{successPercentage}%</text>
                    <text x="100" y="120" className="progress-label">Success Rate</text>
                  </svg>
                </div>
                <div className="stat-card">
                  <div className={`stat-value ${score > 4 ? 'success' : 'fail'}`}>{score}/{quizQuestions.length}</div>
                  <div className="stat-label">Questions Correct</div>
                </div>
              </div>
              <div className={`grade-message ${score > 4 ? 'success' : 'fail'}`}>
                {score === quizQuestions.length && (
                  <>
                    <h3>PERFECT SCORE!</h3>
                    <p>Outstanding! You&apos;re a cybersecurity expert. Your gaming accounts are in safe hands!</p>
                  </>
                )}
                {score >= quizQuestions.length * 0.7 && score < quizQuestions.length && (
                  <>
                    <h3>GREAT JOB!</h3>
                    <p>Well done! You have a solid understanding of gaming security. Keep practicing to master it!</p>
                  </>
                )}
                {score >= quizQuestions.length * 0.5 && score < quizQuestions.length * 0.7 && (
                  <>
                    <h3>GOOD EFFORT!</h3>
                    <p>You&apos;re on the right track. Review the explanations and try again to improve your score!</p>
                  </>
                )}
                {score < quizQuestions.length * 0.5 && (
                  <>
                    <h3>KEEP LEARNING!</h3>
                    <p>Cybersecurity takes practice. Review the material and retake the quiz to strengthen your skills!</p>
                  </>
                )}
              </div>
              <button className="retake-button" onClick={resetQuiz}>
                RETAKE CHALLENGE
              </button>
            </div>
          )}
        </section>

        {/* Final Conclusion */}
        <section className="security-conclusion">
          <p>
            Congratulations on completing the Cyber Security in Gaming exhibit. You&apos;ve learned to create strong passwords, identify phishing attempts, and understand the fundamental principles of digital security. But remember—cybersecurity isn&apos;t a one-time achievement; it&apos;s an ongoing practice. Threats evolve constantly, and staying informed is your best defense. Apply these lessons to your gaming accounts: enable two-factor authentication, use unique passwords for each platform, verify sources before clicking links, and stay skeptical of too-good-to-be-true offers. Your digital identity is valuable—protect it with the same dedication you bring to mastering your favorite games. Game on, stay safe, and remember: in the world of cybersecurity, knowledge truly is power.
          </p>
        </section>

        {/* Footer Spacing */}
        <div className="security-footer-space"></div>
      </div>
    </main>
  );
}

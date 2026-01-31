'use client';
import { useState, useRef, useEffect } from 'react';
import "./tech.css";

export default function TechPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [lineLength, setLineLength] = useState(0);
  const imageWrapperRef = useRef(null);
  const dotRefs = useRef({});

  const handleMove = (e) => {
    if (!isDragging && e.type === 'mousemove') return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // ============================================================
  // TO MOVE COMPONENT DOTS:
  // ============================================================
  // Change the x and y values in each component's position object:
  //
  // x: '??%' - Horizontal position
  //   - 0% = far left edge
  //   - 50% = center
  //   - 100% = far right edge
  //
  // y: '??%' - Vertical position  
  //   - 0% = top edge
  //   - 50% = middle
  //   - 100% = bottom edge
  //
  // side: 'left' or 'right' - Which side the popup appears on
  // ============================================================
  
  const componentInfo = {
    cpu: {
      name: "CPU",
      description: "The brain of your PC. Modern gaming CPUs feature multiple cores and high clock speeds, handling everything from game physics to AI calculations. Top processors like AMD Ryzen 9 and Intel Core i9 deliver exceptional performance.",
      position: { x: '65%', y: '35%' }, // ← CHANGE THESE VALUES TO MOVE THIS DOT
      side: 'right'
    },
    gpu: {
      name: "GPU",
      description: "The powerhouse behind stunning visuals. Modern GPUs like NVIDIA RTX 40-series and AMD RX 7000-series feature ray tracing, AI-powered upscaling, and massive memory bandwidth to render games at high resolutions and framerates.",
      position: { x: '42%', y: '60%' }, // ← CHANGE THESE VALUES TO MOVE THIS DOT
      side: 'left'
    },
    ram: {
      name: "RAM",
      description: "Your PC's short-term memory. DDR5 RAM offers speeds up to 7200MHz+, providing quick access to game data and applications. 32GB has become the sweet spot for modern gaming and content creation.",
      position: { x: '70%', y: '42%' }, // ← CHANGE THESE VALUES TO MOVE THIS DOT
      side: 'right'
    },
    motherboard: {
      name: "Motherboard",
      description: "The central nervous system connecting all components. Modern motherboards feature PCIe 5.0 support, advanced VRM designs, and extensive connectivity options for peripherals and storage devices.",
      position: { x: '35%', y: '38%' }, // ← CHANGE THESE VALUES TO MOVE THIS DOT
      side: 'left'
    },
    cooling: {
      name: "AIO Cooling",
      description: "Keeps your system running at optimal temperatures. Advanced all-in-one liquid coolers with RGB lighting, high-performance radiators, and intelligent fan curves that balance performance with acoustics.",
      position: { x: '52%', y: '20%' }, // ← CHANGE THESE VALUES TO MOVE THIS DOT
      side: 'right'
    },
    storage: {
      name: "NVMe SSD",
      description: "Lightning-fast storage using PCIe 4.0/5.0 technology. Modern NVMe drives reach read speeds of 7000+ MB/s, eliminating load times and enabling features like DirectStorage for near-instantaneous game loading.",
      position: { x: '48%', y: '45%' }, // ← CHANGE THESE VALUES TO MOVE THIS DOT
      side: 'left'
    },
    fans: {
      name: "RGB Fans",
      description: "High-performance case fans with customizable RGB lighting. Optimized for airflow and static pressure, these fans ensure proper ventilation while adding stunning visual effects to your build.",
      position: { x: '30%', y: '25%' }, // ← CHANGE THESE VALUES TO MOVE THIS DOT
      side: 'left'
    }
  };

  useEffect(() => {
    if (hoveredComponent && imageWrapperRef.current && dotRefs.current[hoveredComponent]) {
      const dot = dotRefs.current[hoveredComponent];
      const dotRect = dot.getBoundingClientRect();
      const info = componentInfo[hoveredComponent];
      
      // Calculate popup position - closer to dot (30px away instead of far)
      const popupWidth = 350;
      const spacing = 30; // Small gap between dot and popup
      
      let x, y;
      if (info.side === 'left') {
        // Position at dot's left edge, transform will move it left
        x = dotRect.left - spacing;
        y = dotRect.top + (dotRect.height / 2);
      } else {
        // Position at dot's right edge, no transform offset needed
        x = dotRect.right + spacing;
        y = dotRect.top + (dotRect.height / 2);
      }
      
      setPopupPosition({ x, y });
    }
  }, [hoveredComponent]);

  return (
    <main>
      {/* Hero Banner */}
      <section className="tech-hero">
        <video className="tech-video" autoPlay muted loop playsInline>
          <source src="/tech.mp4" type="video/mp4" />
        </video>
        <div className="tech-overlay">
          <h1 className="tech-title">
            <span className="block">THE FUTURE</span>
            <span className="block">OF TECHNOLOGY</span>
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <div className="tech-content">
        <section className="tech-intro">
          <h2 className="tech-section-title">
            Technology in the 2020s: Shaping Tomorrow
          </h2>
          <h3 className="tech-subtitle">
            From breakthroughs to everyday life
          </h3>
          <p>
            Technology has become the defining force of our era, transforming
            how we live, work, and connect. From artificial intelligence and
            quantum computing to renewable energy and biotechnology, the 2020s
            mark a decade of innovation without boundaries. This exhibit
            explores the tools, ideas, and breakthroughs that are shaping the
            future — not just for industries, but for humanity itself.
          </p>
        </section>

        {/* Evolution Section */}
        <section className="tech-section">
          <h2 className="tech-section-title">The Evolution of Gaming Hardware</h2>
          <h3 className="tech-subtitle">Two Decades of Innovation</h3>
          <p className="tech-description">
            The transformation of gaming PCs over the past twenty years represents one of the most remarkable technological leaps in computing history. What began as bulky, beige boxes with limited capabilities has evolved into sleek, RGB-lit powerhouses capable of rendering photorealistic worlds in real-time. This evolution showcases not just incremental improvements, but revolutionary changes in processing power, graphics fidelity, storage speed, and thermal management. Drag the slider below to witness the dramatic transformation from early 2000s gaming rigs to today's cutting-edge systems.
          </p>
        </section>

        {/* Image Comparison Slider - REVERSED: Old on left, New on right */}
        <section className="comparison-section">
          <div 
            className="comparison-container"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* NEW PC as base image (right) */}
            <div className="comparison-image-wrapper">
              <img src="/new-pc.png" alt="New PC" className="comparison-image" />
            </div>
            {/* OLD PC as overlay (left) */}
            <div 
              className="comparison-image-wrapper comparison-overlay"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img src="/old-pc.png" alt="Old PC" className="comparison-image" />
            </div>
            <div 
              className="comparison-slider"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="comparison-handle">
                <div className="comparison-arrow left"></div>
                <div className="comparison-arrow right"></div>
              </div>
            </div>
            <div className="comparison-labels">
              <span className="comparison-label left">OLD</span>
              <span className="comparison-label right">NEW</span>
            </div>
          </div>
        </section>

        {/* Transition Text */}
        <div className="transition-text">
          <p>
            But what exactly makes modern gaming PCs so powerful? The answer lies in the sophisticated harmony of cutting-edge components working in perfect synchronization. Each part plays a crucial role in delivering the immersive experiences that define contemporary gaming.
          </p>
        </div>

        {/* PC Components Section */}
        <section className="tech-section">
          <h2 className="tech-section-title">Anatomy of a Modern Gaming PC</h2>
          <h3 className="tech-subtitle">Inside the Machine</h3>
          <p className="tech-description">
            A gaming PC is more than the sum of its parts—it's a carefully orchestrated ecosystem where every component must work in harmony. From the CPU's lightning-fast calculations to the GPU's massive parallel processing power, from ultra-fast NVMe storage to cutting-edge cooling solutions, each element is pushed to its limits. Today's gaming rigs are engineering marvels, featuring RGB lighting ecosystems, advanced thermal management, and modular designs that allow enthusiasts to customize and upgrade their systems. Hover over the components below to discover what makes each one essential to the gaming experience.
          </p>
        </section>

        {/* Interactive PC Components */}
        <section className="components-section">
          <div className="components-container">
            <div className="components-image-wrapper" ref={imageWrapperRef}>
              <img src="/pc-components.png" alt="Gaming PC Components" className="components-image" />
              
              {/* Dots positioned on the image */}
              {Object.entries(componentInfo).map(([key, info]) => (
                <div key={key}>
                  <div
                    ref={el => dotRefs.current[key] = el}
                    className="component-dot"
                    style={{ left: info.position.x, top: info.position.y }}
                    onMouseEnter={() => setHoveredComponent(key)}
                    onMouseLeave={() => setHoveredComponent(null)}
                  >
                    <div className="dot-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Popup rendered near the dot */}
          {hoveredComponent && (
            <div 
              className={`component-popup ${componentInfo[hoveredComponent].side}`}
              style={{ 
                left: `${popupPosition.x}px`,
                top: `${popupPosition.y}px`
              }}
            >
              <div className="popup-content">
                <h4>{componentInfo[hoveredComponent].name}</h4>
                <p>{componentInfo[hoveredComponent].description}</p>
              </div>
            </div>
          )}
        </section>

        {/* Transition Text 2 */}
        <div className="transition-text">
          <p>
            As impressive as today's gaming hardware is, the future promises even more revolutionary experiences. The next frontier isn't just about more powerful components—it's about breaking down the barriers between the digital and physical worlds entirely.
          </p>
        </div>

        {/* Future Tech Section */}
        <section className="tech-section">
          <h2 className="tech-section-title">The Next Dimension of Gaming</h2>
          <h3 className="tech-subtitle">Full-Body Immersion Technologies</h3>
          <p className="tech-description">
            Imagine feeling the impact of every explosion, the texture of every surface, and the sensation of every movement within a virtual world. Haptic suits and advanced motion tracking systems are transforming this vision into reality. Companies like bHaptics, Teslasuit, and others are pioneering full-body haptic feedback systems that use arrays of actuators to simulate touch, force, temperature, and even pain in virtual environments. Combined with VR headsets, motion platforms, and neural interfaces, these technologies promise to create unprecedented levels of immersion—blurring the line between player and avatar, reality and simulation. The future of gaming isn't just about what you see and hear; it's about what you feel.
          </p>
        </section>

        {/* YouTube Embed */}
        <section className="video-section">
          <div className="video-container">
            <iframe
              className="video-embed"
              src="https://www.youtube.com/embed/Nu_f-El5V0Q"
              title="Haptic Suit Technology"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Final Section */}
        <section className="tech-conclusion">
          <p>
            From the earliest pixelated sprites to today's photorealistic worlds, from simple controllers to full-body haptic suits, gaming technology has continuously pushed the boundaries of what's possible. This digital archive serves as a testament to human ingenuity and our relentless pursuit of more immersive, more responsive, and more extraordinary experiences. As we stand on the cusp of neural interfaces, photonic computing, and true artificial intelligence, one thing remains certain: the evolution of gaming technology is far from over. The systems and innovations documented here represent not an endpoint, but a waypoint on an infinite journey into digital worlds yet unimagined. Welcome to the museum of tomorrow—built today.
          </p>
        </section>

        {/* Footer Spacing */}
        <div className="tech-footer-space"></div>
      </div>
    </main>
  );
}

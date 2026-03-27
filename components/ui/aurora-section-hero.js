'use client';

export default function BackgroundScene() {
  return (
    <>
      {/* Mysh-style gradient glow at bottom of hero */}
      <div className="hero-glow" />

      {/* Radial gradient background for entire site */}
      <div className="site-bg" />

      <style jsx>{`
        .hero-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 400px;
          background: linear-gradient(
            to top,
            rgba(255, 106, 26, 0.35) 0%,
            rgba(255, 106, 26, 0.12) 40%,
            transparent 100%
          );
          border-radius: 100% 100% 0 0;
          opacity: 0.8;
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        .site-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: radial-gradient(125% 125% at 50% 10%, #0A0A0A 40%, rgba(255, 106, 26, 0.45) 100%);
        }
      `}</style>
    </>
  );
}

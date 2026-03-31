'use client';

import { useState, useEffect, useRef } from 'react';
import LeadModal from '@/components/LeadModal';
import DynamicFrameLayout from '@/components/DynamicFrameLayout';
import BackgroundScene from '@/components/ui/aurora-section-hero';
import ShimmerText from '@/components/ui/shimmer-text';

const ServiceVideo = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) containerRef.current.requestFullscreen();
      else if (containerRef.current.webkitRequestFullscreen) containerRef.current.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    // Adiciona listener para padronizados e Webkit
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      className={`scard-video ${isPlaying ? 'playing' : ''} ${isFullscreen ? 'isfullscreen' : ''}`} 
      ref={containerRef}
      onClick={togglePlay}
    >
      <video ref={videoRef} src={videoSrc} muted={isMuted} loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div className="scard-play" style={{ opacity: isPlaying ? '0' : '1', transition: 'opacity 0.3s' }}>
        <svg viewBox="0 0 24 24" fill="none"><path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="#FF6A1A"/></svg>
      </div>
      
      <div className="mobile-video-controls" onClick={e => e.stopPropagation()}>
         <button onClick={togglePlay} className="mvc-btn">
           {isPlaying ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
           ) : (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M8 5v14l11-7z"/></svg>
           )}
         </button>
         <button onClick={toggleMute} className="mvc-btn">
           {isMuted ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
           ) : (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
           )}
         </button>
         <button onClick={toggleFullscreen} className="mvc-btn">
           {isFullscreen ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
           ) : (
             <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
           )}
         </button>
      </div>

      <button className="mvc-close-btn" onClick={toggleFullscreen} style={{ display: isFullscreen ? 'flex' : 'none' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFF"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Poppins:wght@500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0A; color: #F5F5F5; font-family: 'Montserrat', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; } .d2 { transition-delay: 0.2s; } .d3 { transition-delay: 0.3s; } .d4 { transition-delay: 0.4s; }

        /* HEADER */
        header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; height: 64px; background: rgba(10,10,10,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid #1C1C1C; }
        .logo-img { height: 160px; width: auto; max-width: 300px; object-fit: contain; }
        .nav { display: flex; align-items: center; gap: 6px; }
        .nav a { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 500; color: #8B8B8B; text-decoration: none; padding: 8px 14px; border-radius: 6px; transition: color 0.2s, background 0.2s; }
        .nav a:hover { color: #F5F5F5; background: #1C1C1C; }
        .nav .cta { color: #0A0A0A !important; background: #FF6A1A !important; font-weight: 600; border-radius: 100px; padding: 8px 20px; }
        .nav .cta:hover { background: #e05a10 !important; }

        /* HERO */
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 100px 40px 80px; position: relative; overflow: hidden; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #FF6A1A; border: 1px solid rgba(255,106,26,0.3); padding: 6px 14px; border-radius: 100px; margin-bottom: 32px; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #FF6A1A; }
        .hero h1 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(52px, 7vw, 96px); line-height: 0.95; letter-spacing: -0.04em; color: #F5F5F5; max-width: 900px; margin-bottom: 28px; }
        .hero h1 em { font-style: normal; color: #FF6A1A; }
        .hero-sub { font-size: 17px; line-height: 1.7; color: #8B8B8B; max-width: 520px; margin: 0 auto 48px; }
        .hero-btns { display: flex; gap: 12px; align-items: center; justify-content: center; flex-wrap: wrap; margin-bottom: 72px; }
        .btn-orange { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 14px; color: #F5F5F5; background: linear-gradient(-30deg, #cc5200 50%, #a84300 50%); border: none; padding: 16px 32px; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; position: relative; overflow: hidden; box-shadow: 0 12px 40px rgba(255,106,26,0.2); letter-spacing: 0.04em; }
        .btn-orange::before { content:''; position:absolute; inset:0; background:#fff; opacity:0; transition:.2s; }
        .btn-orange:hover::before { opacity:0.1; }
        .btn-orange .s { position:absolute; }
        .btn-orange .s:nth-child(1) { top:0;left:0;width:100%;height:2px; background:linear-gradient(to left,rgba(200,80,0,0),#FF6A1A); animation:aTop 2s linear infinite; }
        .btn-orange .s:nth-child(2) { top:0;right:0;height:100%;width:2px; background:linear-gradient(to top,rgba(200,80,0,0),#FF6A1A); animation:aRight 2s linear -1s infinite; }
        .btn-orange .s:nth-child(3) { bottom:0;left:0;width:100%;height:2px; background:linear-gradient(to right,rgba(200,80,0,0),#FF6A1A); animation:aBottom 2s linear infinite; }
        .btn-orange .s:nth-child(4) { top:0;left:0;height:100%;width:2px; background:linear-gradient(to bottom,rgba(200,80,0,0),#FF6A1A); animation:aLeft 2s linear -1s infinite; }
        .btn-outline { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 14px; color: #F5F5F5; background: linear-gradient(-30deg, #1C1C1C 50%, #141414 50%); border: none; padding: 16px 32px; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; position: relative; overflow: hidden; letter-spacing: 0.04em; }
        .btn-outline::before { content:''; position:absolute; inset:0; background:#fff; opacity:0; transition:.2s; }
        .btn-outline:hover::before { opacity:0.05; }
        .btn-outline .s { position:absolute; }
        .btn-outline .s:nth-child(1) { top:0;left:0;width:100%;height:2px; background:linear-gradient(to left,rgba(28,28,28,0),#8B8B8B); animation:aTop 2s linear infinite; }
        .btn-outline .s:nth-child(2) { top:0;right:0;height:100%;width:2px; background:linear-gradient(to top,rgba(28,28,28,0),#8B8B8B); animation:aRight 2s linear -1s infinite; }
        .btn-outline .s:nth-child(3) { bottom:0;left:0;width:100%;height:2px; background:linear-gradient(to right,rgba(28,28,28,0),#8B8B8B); animation:aBottom 2s linear infinite; }
        .btn-outline .s:nth-child(4) { top:0;left:0;height:100%;width:2px; background:linear-gradient(to bottom,rgba(28,28,28,0),#8B8B8B); animation:aLeft 2s linear -1s infinite; }
        @keyframes aTop    { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
        @keyframes aRight  { 0%{transform:translateY(100%)} 100%{transform:translateY(-100%)} }
        @keyframes aBottom { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes aLeft   { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        .hero-stats { display: flex; gap: 64px; justify-content: center; align-items: flex-end; padding-top: 40px; border-top: 1px solid #1C1C1C; }
        .hero-stats > div { text-align: center; }
        .stat-num { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 40px; color: #F5F5F5; letter-spacing: -0.03em; }
        .stat-num span { color: #FF6A1A; }
        .stat-label { font-size: 12px; color: #8B8B8B; margin-top: 4px; }

        /* PORTFÓLIO */
        .portfolio-banner { background: rgba(17,17,17,0.85); border-top: 1px solid #1C1C1C; border-bottom: 1px solid #1C1C1C; padding: 80px 40px; }
        .portfolio-banner-head { max-width: 1200px; margin: 0 auto 48px; display: flex; justify-content: space-between; align-items: flex-end; }
        .section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #FF6A1A; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .section-eyebrow::before { content: ''; width: 20px; height: 2px; background: #FF6A1A; }
        .section-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(28px, 3.5vw, 48px); line-height: 1.1; letter-spacing: -0.025em; color: #F5F5F5; }
        .link-orange { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; color: #FF6A1A; text-decoration: none; white-space: nowrap; display: flex; align-items: center; gap: 6px; transition: gap 0.2s; }
        .link-orange:hover { gap: 10px; }
        .grid-portfolio { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .pitem { position: relative; overflow: hidden; border-radius: 12px; background: #1C1C1C; border: 1px solid #2A2A2A; cursor: pointer; transition: transform 0.35s; aspect-ratio: 4/5; }
        .pitem:hover { transform: scale(0.98); }
        .pitem:hover .poverlay { opacity: 1; }
        .pitem img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .poverlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 20px; opacity: 0; transition: opacity 0.3s; }
        .pcap { font-size: 13px; font-weight: 700; color: #F5F5F5; background: rgba(10,10,10,0.75); padding: 6px 12px; border-radius: 6px; backdrop-filter: blur(4px); }

        /* SERVIÇOS */
        .services { padding: 100px 40px; }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .services-head { text-align: center; margin-bottom: 64px; }
        .services-sub { font-size: 16px; color: #8B8B8B; max-width: 480px; margin: 16px auto 0; line-height: 1.7; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

        /* Card de serviço com imagem de fundo */
        .scard { background: rgba(20,20,20,0.85); padding: 48px 36px; position: relative; overflow: hidden; transition: background 0.3s; min-height: 320px; display: flex; flex-direction: column; justify-content: flex-end; }
        .scard-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.15; transition: opacity 0.4s; }
        .scard:hover .scard-bg { opacity: 0.25; }
        .scard::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.5) 100%); }
        .scard-content { position: relative; z-index: 1; }
        .scard:hover { background: #1a1a1a; }
        .scard-line { position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #FF6A1A; transition: width 0.4s; z-index: 2; }
        .scard:hover .scard-line { width: 100%; }
        .scard-num { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 72px; color: rgba(255,255,255,0.08); line-height: 1; margin-bottom: 24px; display: block; letter-spacing: -0.04em; }
        .scard-title { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 20px; color: #F5F5F5; margin-bottom: 14px; }
        .scard-desc { font-size: 14px; color: #8B8B8B; line-height: 1.7; margin-bottom: 24px; }
        .scard-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .stag { font-size: 11px; font-weight: 600; color: #8B8B8B; border: 1px solid #2A2A2A; padding: 4px 12px; border-radius: 100px; }
        .scard-video { position: absolute; inset: 0; opacity: 0.18; transition: opacity 0.4s; cursor: pointer; z-index: 3; }
        .scard:hover .scard-video { opacity: 0.35; }
        .scard-video.playing { opacity: 0.5; }
        .scard:hover .scard-video.playing { opacity: 0.6; }
        .scard-video video { width: 100%; height: 100%; object-fit: cover; }
        .scard-play { position: absolute; top: 35%; left: 50%; transform: translate(-50%,-50%); width: 56px; height: 56px; background: rgba(10,10,10,0.75); border: 2px solid rgba(255,106,26,0.6); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; box-shadow: 0 0 24px rgba(255,106,26,0.15); pointer-events: none; }
        .scard-play svg { width: 22px; height: 22px; margin-left: 3px; }
        .scard:hover .scard-play { background: rgba(255,106,26,0.15); border-color: #FF6A1A; box-shadow: 0 0 32px rgba(255,106,26,0.3); transform: translate(-50%,-50%) scale(1.08); }

        /* NICHOS */
        .nichos { padding: 100px 40px; background: rgba(13,13,13,0.85); }
        .nichos-inner { max-width: 1200px; margin: 0 auto; }
        .nichos-head { margin-bottom: 48px; }
        .nichos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .ncard { background: rgba(20,20,20,0.85); padding: 36px 28px; transition: background 0.3s; }
        .ncard:hover { background: #191919; }
        .nicon { font-size: 28px; margin-bottom: 20px; }
        .ntitle { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 16px; color: #F5F5F5; margin-bottom: 12px; }
        .ndesc { font-size: 13px; color: #8B8B8B; line-height: 1.7; margin-bottom: 18px; }
        .ntags { display: flex; flex-wrap: wrap; gap: 6px; }
        .ntag { font-size: 11px; color: #FF6A1A; border: 1px solid rgba(255,106,26,0.25); padding: 3px 10px; border-radius: 100px; }

        /* POR QUE */
        .why { padding: 100px 40px; }
        .why-inner { max-width: 1200px; margin: 0 auto; }
        .why-head { text-align: center; margin-bottom: 64px; }
        .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
        .wcard { background: rgba(20,20,20,0.85); padding: 40px; display: flex; gap: 24px; align-items: flex-start; transition: background 0.3s; }
        .wcard:hover { background: #191919; }
        .wnum { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 52px; color: #FF6A1A; line-height: 1; flex-shrink: 0; letter-spacing: -0.04em; }
        .wtitle { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 17px; color: #F5F5F5; margin-bottom: 8px; }
        .wdesc { font-size: 14px; color: #8B8B8B; line-height: 1.7; }

        /* CTA */
        .cta { padding: 120px 40px; text-align: center; background: rgba(17,17,17,0.85); border-top: 1px solid #1C1C1C; position: relative; overflow: hidden; }
        .cta::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 800px; height: 600px; background: radial-gradient(ellipse, rgba(255,106,26,0.1) 0%, transparent 70%); pointer-events: none; }
        .cta-title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: clamp(36px, 5vw, 68px); line-height: 1.0; letter-spacing: -0.035em; color: #F5F5F5; max-width: 800px; margin: 16px auto 24px; }
        .cta-sub { font-size: 16px; color: #8B8B8B; max-width: 460px; margin: 0 auto 48px; line-height: 1.7; }
        .cta-metas { display: flex; justify-content: center; gap: 32px; margin-top: 32px; flex-wrap: wrap; }
        .cmeta { font-size: 13px; color: #8B8B8B; display: flex; align-items: center; gap: 8px; }
        .cmeta-icon { width: 18px; height: 18px; border-radius: 50%; background: #FF6A1A; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }

        /* FOOTER */
        footer { padding: 32px 40px; border-top: 1px solid #1C1C1C; display: flex; justify-content: space-between; align-items: center; }
        .footer-logo { height: 40px; width: auto; max-width: 180px; object-fit: contain; }
        .footer-copy { font-size: 13px; color: #8B8B8B; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: 13px; color: #8B8B8B; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: #F5F5F5; }

        .mobile-video-controls { display: none; }
        .mvc-close-btn { display: none; position: absolute; top: 16px; right: 16px; z-index: 20; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; padding: 6px; cursor: pointer; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
        .scard-video.isfullscreen { opacity: 1 !important; }
        .scard-video.isfullscreen .mobile-video-controls { top: 24px; }

        /* MOBILE */
        @media (max-width: 900px) {
          .mobile-video-controls { 
            display: flex; position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
            background: rgba(10,10,10,0.7); backdrop-filter: blur(8px); padding: 8px 16px; border-radius: 100px;
            gap: 20px; z-index: 10; align-items: center; border: 1px solid rgba(255,255,255,0.1);
          }
          .mvc-btn {
            background: none; border: none; display: flex; align-items: center; justify-content: center; padding: 4px; cursor: pointer;
          }
          header { padding: 0 20px; }
          .nav a:not(.cta) { display: none; }
          .hero { padding: 90px 24px 60px; }
          .hero-stats { gap: 32px; flex-wrap: wrap; }
          .portfolio-banner { padding: 60px 20px; }
          .portfolio-banner-head { flex-direction: column; align-items: flex-start; gap: 16px; }
          .grid-portfolio { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
          .pitem { height: 200px; }
          .services { padding: 64px 20px; }
          .services-grid { grid-template-columns: 1fr; }
          .nichos { padding: 64px 20px; }
          .nichos-grid { grid-template-columns: 1fr; }
          .why { padding: 64px 20px; }
          .why-grid { grid-template-columns: 1fr; }
          .cta { padding: 80px 20px; }
          .cta-metas { flex-direction: column; gap: 12px; align-items: center; }
          footer { flex-direction: column; gap: 16px; padding: 28px 20px; text-align: center; }
          .footer-links { justify-content: center; }
        }
        @media (max-width: 560px) {
          .hero-btns { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* HEADER — substitua o src pela sua logo quando tiver o SVG */}
      <header>
        <img src="/Imagens/LOGOSNAPVISUAL.svg" alt="SnapVisual" className="logo-img"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <span style={{ display: 'none', fontFamily: 'Montserrat', fontWeight: 900, fontSize: 18, color: '#F5F5F5' }}>
          Snap<span style={{ color: '#FF6A1A' }}>Visual</span>
        </span>
        <nav className="nav">
          <a href="http://instagram.com/snapvisual.design" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.behance.net/lucasmouraocm" target="_blank" rel="noopener">Portfólio</a>
          <a href="#" className="cta" onClick={e => { e.preventDefault(); openModal(); }}>Falar no WhatsApp</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <BackgroundScene />
          <div className="hero-badge reveal">Criativos Institucionais · Edição de Vídeo · Landing Pages</div>
          <ShimmerText as="h1" className="reveal d1">Fim do visual amador.<br />Sua marca pronta<br />para vender.</ShimmerText>
          <p className="hero-sub reveal d2">Criativos institucionais, vídeos e landing pages para negócios que precisam transmitir mais confiança, profissionalismo e valor no digital.</p>
          <div className="hero-btns reveal d3">
            <button className="btn-orange" onClick={openModal}><span className="s" /><span className="s" /><span className="s" /><span className="s" />Pedir orçamento</button>
            <a href="#portfolio" className="btn-outline"><span className="s" /><span className="s" /><span className="s" /><span className="s" />Ver nossos trabalhos</a>
          </div>
          <div className="hero-stats reveal d4">
            <div><div className="stat-num">+<span>30</span></div><div className="stat-label">marcas atendidas</div></div>
            <div><div className="stat-num"><span>100</span>%</div><div className="stat-label">entregue no prazo</div></div>
            <div><div className="stat-num" style={{fontSize: '32px'}}>Em poucas horas</div><div className="stat-label">Resposta rápida</div></div>
          </div>
        </section>

        {/* PORTFÓLIO */}
        <section className="portfolio-banner" id="portfolio">
          <div className="portfolio-banner-head">
            <div>
              <div className="section-eyebrow reveal">Trabalhos Recentes</div>
              <h2 className="section-title reveal d1">Visual que funciona na prática</h2>
            </div>
            <a href="https://www.behance.net/lucasmouraocm" target="_blank" rel="noopener" className="link-orange reveal">Ver portfólio completo →</a>
          </div>
          <div className="reveal">
            <DynamicFrameLayout />
          </div>
        </section>

        {/* SERVIÇOS — rebranding */}
        <section className="services" id="servicos">
          <div className="services-inner">
            <div className="services-head">
              <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>O que fazemos</div>
              <h2 className="section-title reveal d1">Três serviços. Um padrão visual.</h2>
              <p className="services-sub reveal d2">Nada genérico. Nada de tudo um pouco. Só o que a SnapVisual faz com excelência.</p>
            </div>
            <div className="services-grid">
              {[
                {
                  num: '01',
                  title: 'Criativos Institucionais',
                  desc: 'Posts, banners e peças visuais com identidade real, pensados para valorizar a marca, organizar a comunicação e transmitir mais profissionalismo no digital.',
                  tags: ['Feed', 'Stories', 'Banners', 'Apresentações'],
                  bg: '/Imagens/PALESTRA-CESVALE-HAZEL.png'
                },
                {
                  num: '02',
                  title: 'Edição de Vídeo',
                  desc: 'Edição de vídeos com ritmo, acabamento e identidade visual para reels, materiais institucionais e conteúdos que precisam parecer mais profissionais.',
                  tags: ['Reels', 'Institucional', 'Motion', 'Corporativo'],
                  video: '/Imagens/SEU-VIDEO.mp4'
                },
                {
                  num: '03',
                  title: 'Landing Pages',
                  desc: 'Landing pages com estrutura clara, copy objetivo e design orientado à ação, pensadas para apresentar melhor sua oferta e facilitar o contato.',
                  tags: ['Conversão', 'Copy', 'Mobile first', 'CTA claro'],
                  bg: '/Imagens/MOCKUP-SITE-DYF.png'
                },
              ].map((s, i) => (
                <div key={i} className={`scard reveal d${i + 1}`}>
                  {s.video ? (
                    <ServiceVideo videoSrc={s.video} />
                  ) : (
                    <div className="scard-bg" style={{ backgroundImage: `url(${s.bg})` }} />
                  )}
                  <div className="scard-line" />
                  <div className="scard-content">
                    <span className="scard-num">{s.num}</span>
                    <div className="scard-title">{s.title}</div>
                    <p className="scard-desc">{s.desc}</p>
                    <div className="scard-tags">{s.tags.map(t => <span key={t} className="stag">{t}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NICHOS — simplificado sem antes/depois */}
        <section className="nichos">
          <div className="nichos-inner">
            <div className="nichos-head">
              <div className="section-eyebrow reveal">Para quem fazemos</div>
              <h2 className="section-title reveal d1">Para negócios que já não podem parecer amadores</h2>
            </div>
            <div className="nichos-grid">
              {[
                { icon: '🏢', title: 'Empresas & Escritórios', desc: 'Contábeis, engenharias, consultorias e prestadores de serviço que precisam de visual corporativo sem custo de agência.', tags: ['Institucional', 'Apresentações', 'Landing Page'] },
                { icon: '🎬', title: 'Marcas em Crescimento', desc: 'Negócios que já vendem mas ainda não têm visual à altura do que entregam. Momento de profissionalizar.', tags: ['Reels', 'Feed', 'Identidade visual'] },
                { icon: '🚀', title: 'Lançamentos & Eventos', desc: 'Campanhas visuais para lançamentos de produto, eventos corporativos e ações que precisam de impacto rápido.', tags: ['Campanha', 'Evento', 'Motion'] },
              ].map((n, i) => (
                <div key={i} className={`ncard reveal d${i + 1}`}>
                  <div className="nicon">{n.icon}</div>
                  <div className="ntitle">{n.title}</div>
                  <p className="ndesc">{n.desc}</p>
                  <div className="ntags">{n.tags.map(t => <span key={t} className="ntag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POR QUE */}
        <section className="why">
          <div className="why-inner">
            <div className="why-head">
              <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>Por que funciona melhor</div>
              <h2 className="section-title reveal d1">Mais resultado. Menos enrolação.</h2>
            </div>
            <div className="why-grid">
              {[
                { n: '01', title: 'Resposta rápida', desc: 'Você não fica dias esperando retorno. A demanda é tratada com agilidade e comunicação direta.' },
                { n: '02', title: 'Visual com função', desc: 'O visual não existe para enfeitar. Ele existe para valorizar sua oferta e ajudar o cliente a decidir.' },
                { n: '03', title: 'Atendimento direto', desc: 'Sem excesso de etapas, sem enrolação e sem linguagem técnica desnecessária. Você mostra a demanda e recebe direção clara.' },
                { n: '04', title: 'Pronto para a rotina', desc: 'Os materiais já chegam pensados para uso real, com formatos adequados, aplicação simples e menos dependência técnica.' },
                { n: '05', title: 'Padrão visual consistente', desc: 'A comunicação deixa de parecer improvisada e passa a transmitir mais organização e confiança.' },
              ].map((w, i) => (
                <div key={i} className={`wcard reveal d${(i % 2) + 1}`}>
                  <div className="wnum">{w.n}</div>
                  <div><div className="wtitle">{w.title}</div><p className="wdesc">{w.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEMANDAS */}
        <section style={{ padding: '40px 20px 80px', background: '#0A0A0A' }}>
          <div className="reveal d2" style={{ maxWidth: '600px', margin: '0 auto', background: '#111', border: '1px solid #1C1C1C', borderRadius: '8px', padding: '32px' }}>
            <h3 style={{ fontSize: '16px', color: '#F5F5F5', marginBottom: '20px', fontFamily: 'Montserrat, sans-serif' }}>Você pode falar com a SnapVisual para:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#8B8B8B', fontSize: '14px', lineHeight: '1.8' }}>
              <li>• melhorar o visual do Instagram</li>
              <li>• criar landing page para apresentar melhor seu serviço</li>
              <li>• editar vídeos com mais acabamento profissional</li>
              <li>• montar materiais institucionais e apresentações</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>Comece hoje</div>
          <ShimmerText as="h2" className="cta-title reveal d1">Fale com a SnapVisual e receba uma direção clara para sua demanda</ShimmerText>
          <p className="cta-sub reveal d2">Você envia o básico da necessidade, a SnapVisual analisa o caso e indica a solução mais direta para sua marca, peça ou página. Sem enrolação e sem complicar o processo.</p>
          
          <button className="btn-orange reveal d3" onClick={openModal}><span className="s" /><span className="s" /><span className="s" /><span className="s" />Pedir orçamento no WhatsApp</button>

          <div className="cta-metas reveal d4">
            {['Resposta em poucas horas', 'Atendimento direto, sem robôs', 'Orçamento sem compromisso'].map(t => (
              <span key={t} className="cmeta">
                <span className="cmeta-icon">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </span>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <img src="/Imagens/LOGOSNAPVISUAL.svg" alt="SnapVisual" className="footer-logo"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
        />
        <span style={{ display: 'none', fontFamily: 'Montserrat', fontWeight: 900, fontSize: 16, color: '#F5F5F5' }}>
          Snap<span style={{ color: '#FF6A1A' }}>Visual</span>
        </span>
        <span className="footer-copy">© 2026 SnapVisual.</span>
        <div className="footer-links">
          <a href="http://wa.me/5586981308653" target="_blank" rel="noopener">WhatsApp</a>
          <a href="http://instagram.com/snapvisual.design" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.behance.net/lucasmouraocm" target="_blank" rel="noopener">Portfólio</a>
        </div>
      </footer>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

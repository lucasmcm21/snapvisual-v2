'use client';

import { useState, useEffect } from 'react';
import LeadModal from '@/components/LeadModal';
import DynamicFrameLayout from '@/components/DynamicFrameLayout';
import BackgroundScene from '@/components/ui/aurora-section-hero';
import ShimmerText from '@/components/ui/shimmer-text';

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

        /* MOBILE */
        @media (max-width: 900px) {
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
          <p className="hero-sub reveal d2">A SnapVisual cria criativos institucionais, edita vídeos e desenvolve landing pages para negócios que precisam parecer profissionais no digital.</p>
          <div className="hero-btns reveal d3">
            <button className="btn-orange" onClick={openModal}><span className="s" /><span className="s" /><span className="s" /><span className="s" />Quero melhorar minha marca</button>
            <a href="#portfolio" className="btn-outline"><span className="s" /><span className="s" /><span className="s" /><span className="s" />Ver nossos trabalhos</a>
          </div>
          <div className="hero-stats reveal d4">
            <div><div className="stat-num">+<span>30</span></div><div className="stat-label">marcas atendidas</div></div>
            <div><div className="stat-num"><span>100</span>%</div><div className="stat-label">entregue no prazo</div></div>
            <div><div className="stat-num">imediata</div><div className="stat-label">resposta média</div></div>
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
                  desc: 'Posts, banners e peças visuais com identidade real. Comunicação que representa a marca com profissionalismo e converte no feed.',
                  tags: ['Feed', 'Stories', 'Banners', 'Apresentações'],
                  bg: '/Imagens/PALESTRA-CESVALE-HAZEL.png'
                },
                {
                  num: '02',
                  title: 'Edição de Vídeo',
                  desc: 'Cortes precisos, motion e tratamento de cor para vídeos institucionais, reels e conteúdo corporativo que prende atenção.',
                  tags: ['Reels', 'Institucional', 'Motion', 'Corporativo'],
                  video: '/Imagens/SEU-VIDEO.mp4'
                },
                {
                  num: '03',
                  title: 'Landing Pages',
                  desc: 'Páginas de conversão com estrutura clara, copy direto e design que guia o visitante até a ação. Feitas para vender.',
                  tags: ['Conversão', 'Copy', 'Mobile first', 'CTA claro'],
                  bg: '/Imagens/MOCKUP-SITE-DYF.png'
                },
              ].map((s, i) => (
                <div key={i} className={`scard reveal d${i + 1}`}>
                  {s.video ? (
                    <div className="scard-video" onClick={e => {
                      const video = e.currentTarget.querySelector('video');
                      const playBtn = e.currentTarget.querySelector('.scard-play');
                      if (video.paused) {
                        video.play();
                        e.currentTarget.classList.add('playing');
                        playBtn.style.opacity = '0';
                      } else {
                        video.pause();
                        e.currentTarget.classList.remove('playing');
                        playBtn.style.opacity = '1';
                      }
                    }}>
                      <video src={s.video} muted loop playsInline />
                      <div className="scard-play">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" fill="#FF6A1A"/></svg>
                      </div>
                    </div>
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
              <h2 className="section-title reveal d1">Marcas que precisam parecer maiores do que parecem</h2>
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
                { n: '01', title: 'Resposta rápida', desc: 'Seu negócio não pode esperar dias por retorno. A comunicação anda no ritmo da sua demanda.' },
                { n: '02', title: 'Visual com função', desc: 'O visual não existe para enfeitar. Ele existe para valorizar sua oferta e ajudar o cliente a decidir.' },
                { n: '03', title: 'Atendimento direto', desc: 'Sem linguagem complicada, sem excesso de etapas. Você mostra a necessidade e a SnapVisual resolve.' },
                { n: '04', title: 'Pronto para a rotina', desc: 'Os materiais chegam pensados para uso real: formatos certos, aplicação simples, menos dependência técnica.' },
              ].map((w, i) => (
                <div key={i} className={`wcard reveal d${(i % 2) + 1}`}>
                  <div className="wnum">{w.n}</div>
                  <div><div className="wtitle">{w.title}</div><p className="wdesc">{w.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>Comece hoje</div>
          <ShimmerText as="h2" className="cta-title reveal d1">Seu visual pode começar a melhorar hoje</ShimmerText>
          <p className="cta-sub reveal d2">Você manda o básico da demanda. A SnapVisual analisa, responde rápido e indica o caminho mais direto.</p>
          <button className="btn-orange reveal d3" onClick={openModal}><span className="s" /><span className="s" /><span className="s" /><span className="s" />Quero melhorar minha marca</button>
          <div className="cta-metas reveal d4">
            {['Resposta em poucas horas', 'Atendimento direto, sem robôs', 'Orçamento sem compromisso'].map(t => (
              <span key={t} className="cmeta">
                <span className="cmeta-icon">
                  <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
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

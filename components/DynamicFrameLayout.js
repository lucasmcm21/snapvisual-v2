'use client';
import React, { useState, useEffect } from 'react';

const portfolioItems = [
  { label: 'Site institucional — DYF Engenharia', desc: 'Landing page para fortalecer autoridade técnica e apresentação comercial.', src: '/Imagens/MOCKUP-SITE-DYF.png' },
  { label: 'Feed institucional — DYF Engenharia', desc: 'Conteúdo visual para reforçar percepção profissional e presença digital.', src: '/Imagens/DYF-FEED-DOIS.png' },
  { label: 'Criativo feed — DYF Engenharia', src: '/Imagens/DYF-FEED-UM.png' },
  { label: 'Site institucional — Hazel Contábil', desc: 'Página para posicionar a marca como contabilidade consultiva e profissional.', src: '/Imagens/MOCKUP-SITE-HAZEL.png' },
  { label: 'Palestra corporativa — Hazel Contábil', src: '/Imagens/PALESTRA-CESVALE-HAZEL.png' },
  { label: 'Criativo IR 2026 — Hazel Contábil', src: '/Imagens/IR-2026-HAZEL.png' },
];

// 3 colunas x 2 linhas (desktop)
const columns = [
  [portfolioItems[0], portfolioItems[3]],
  [portfolioItems[1], portfolioItems[4]],
  [portfolioItems[2], portfolioItems[5]],
];

export default function DynamicFrameLayout() {
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const getColFlex = (i) => {
    if (hoveredCol === null) return 1;
    return hoveredCol === i ? 1.4 : 0.6;
  };

  const getRowFlex = (r) => {
    if (hoveredRow === null) return 1;
    return hoveredRow === r ? 1.4 : 0.8;
  };

  /* ── MOBILE: grid 2×3 com aspect-ratio fixo ── */
  if (isMobile) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {portfolioItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#1C1C1C',
              border: '1px solid #2A2A2A',
              aspectRatio: '4/5',
            }}
          >
            <img
              src={item.src}
              alt={item.label}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '12px',
            }}>
              <div style={{
                background: 'rgba(10,10,10,0.85)',
                padding: '6px 10px',
                borderRadius: '6px',
                backdropFilter: 'blur(6px)',
                width: '100%'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#F5F5F5',
                  fontFamily: 'Montserrat, sans-serif',
                  display: 'block',
                }}>
                  {item.label}
                </span>
                {item.desc && (
                  <span style={{
                    fontSize: '10px',
                    color: '#8B8B8B',
                    fontFamily: 'Poppins, sans-serif',
                    marginTop: '2px',
                    display: 'block',
                    lineHeight: 1.3
                  }}>
                    {item.desc}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── DESKTOP: 3 colunas flex com hover expand ── */
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
      gap: '10px',
      height: '1000px',
    }}>
      {columns.map((colItems, colIdx) => (
        <div
          key={colIdx}
          style={{
            flex: getColFlex(colIdx),
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            transition: 'flex 0.5s cubic-bezier(0.22,1,0.36,1)',
            minWidth: 0,
          }}
          onMouseEnter={() => setHoveredCol(colIdx)}
          onMouseLeave={() => { setHoveredCol(null); setHoveredRow(null); }}
        >
          {colItems.map((item, rowIdx) => {
            const isHovered = hoveredCol === colIdx && hoveredRow === rowIdx;
            return (
              <div
                key={rowIdx}
                style={{
                  flex: getRowFlex(rowIdx),
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#1C1C1C',
                  border: isHovered ? '1px solid #FF6A1A' : '1px solid #2A2A2A',
                  transition: 'flex 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.3s',
                  cursor: 'pointer',
                  minHeight: 0,
                  aspectRatio: '4/5',
                }}
                onMouseEnter={() => setHoveredRow(rowIdx)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}>
                  <div style={{
                    background: 'rgba(10,10,10,0.85)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backdropFilter: 'blur(6px)',
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                    width: '100%'
                  }}>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#F5F5F5',
                      fontFamily: 'Montserrat, sans-serif',
                      display: 'block',
                    }}>
                      {item.label}
                    </span>
                    {item.desc && (
                      <span style={{
                        fontSize: '11px',
                        color: '#8B8B8B',
                        fontFamily: 'Poppins, sans-serif',
                        marginTop: '4px',
                        display: 'block',
                        lineHeight: 1.4
                      }}>
                        {item.desc}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

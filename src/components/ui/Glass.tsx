import React from "react";

function Glass({ className, classGlassSize }: { className?: string; classGlassSize?: string }) {
  return (
    <div className={`${className}`}>
      <svg
        className={`${classGlassSize}`}
        viewBox="0 0 220 310"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          filter:
            "drop-shadow(0 55px 80px rgba(0,0,0,0.95)) drop-shadow(0 0 45px rgba(153,39,4,0.55)) drop-shadow(0 15px 30px rgba(0,0,0,0.7))",
        }}>
        <defs>
          <linearGradient id="liqO" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(55,4,0,1)" />
            <stop offset="30%" stopColor="rgba(153,39,4,0.97)" />
            <stop offset="65%" stopColor="rgba(220,75,18,0.82)" />
            <stop offset="100%" stopColor="rgba(255,135,55,0.55)" />
          </linearGradient>

          <linearGradient id="wlO" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="10%" stopColor="rgba(153,39,4,0.12)" />
            <stop offset="40%" stopColor="rgba(153,39,4,0.45)" />
            <stop offset="72%" stopColor="rgba(255,180,120,0.2)" />
            <stop offset="88%" stopColor="rgba(255,255,255,0.72)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <linearGradient id="wrO" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="12%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="28%" stopColor="rgba(255,200,150,0.15)" />
            <stop offset="55%" stopColor="rgba(153,39,4,0.42)" />
            <stop offset="82%" stopColor="rgba(30,0,0,0.65)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          <linearGradient id="rimO" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="14%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="42%" stopColor="rgba(255,210,170,0.5)" />
            <stop offset="72%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <linearGradient id="stO" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.08)" />
            <stop offset="22%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="50%" stopColor="rgba(153,39,4,0.55)" />
            <stop offset="78%" stopColor="rgba(153,39,4,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </linearGradient>

          <radialGradient id="bsO" cx="36%" cy="26%" r="64%">
            <stop offset="0%" stopColor="rgba(255,200,120,0.7)" />
            <stop offset="22%" stopColor="rgba(153,39,4,0.65)" />
            <stop offset="60%" stopColor="rgba(100,15,0,0.55)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.95)" />
          </radialGradient>

          <radialGradient id="glO" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(153,39,4,0.7)" />
            <stop offset="100%" stopColor="rgba(153,39,4,0)" />
          </radialGradient>

          <linearGradient id="ieO" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(153,39,4,0.05)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(153,39,4,0.05)" />
          </linearGradient>

          <radialGradient id="caO" cx="44%" cy="50%" r="56%">
            <stop offset="0%" stopColor="rgba(153,39,4,0.5)" />
            <stop offset="100%" stopColor="rgba(153,39,4,0)" />
          </radialGradient>

          <clipPath id="icO">
            <polygon points="24,22 196,22 110,150" />
          </clipPath>
        </defs>

        {/* Glow shadow */}
        <ellipse cx="110" cy="298" rx="68" ry="12" fill="url(#glO)" opacity="0.65" />

        {/* Base shadow */}
        <ellipse cx="112" cy="272" rx="58" ry="8" fill="rgba(0,0,0,0.7)" style={{ filter: "blur(6px)" }} />

        {/* Base */}
        <ellipse cx="110" cy="264" rx="56" ry="10.5" fill="url(#bsO)" />
        <ellipse cx="94" cy="259" rx="28" ry="4" fill="rgba(255,255,255,0.28)" style={{ filter: "blur(2px)" }} />
        <ellipse cx="110" cy="264" rx="56" ry="10.5" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />

        {/* Stem */}
        <rect x="106" y="152" width="8" height="111" rx="4" fill="url(#stO)" />
        <ellipse cx="110" cy="152" rx="11" ry="5" fill="rgba(153,39,4,0.3)" />
        <ellipse cx="107" cy="151" rx="5" ry="2.2" fill="rgba(255,255,255,0.45)" style={{ filter: "blur(1px)" }} />

        {/* Liquid */}
        <polygon points="61.6,78 158.4,78 110,150" fill="url(#liqO)" clipPath="url(#icO)" />

        {/* Liquid glow */}
        <ellipse cx="110" cy="156" rx="22" ry="8" fill="url(#caO)" opacity="0.55" style={{ filter: "blur(4px)" }} />

        {/* Liquid surface */}
        <line
          x1="63"
          y1="78"
          x2="157"
          y2="78"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "blur(1px)" }}
        />
        <ellipse cx="96" cy="78" rx="18" ry="3.5" fill="rgba(255,255,255,0.32)" style={{ filter: "blur(2.5px)" }} />

        {/* Glass body */}
        <polygon points="24,22 196,22 158.4,78 61.6,78" fill="url(#ieO)" />

        {/* Left facet */}
        <polygon points="10,22 24,22 110,150 110,158" fill="url(#wlO)" />

        {/* Left inner edge */}
        <line
          x1="24"
          y1="22"
          x2="110"
          y2="150"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: "blur(0.4px)" }}
        />

        {/* Left outer edge */}
        <line
          x1="10"
          y1="22"
          x2="110"
          y2="158"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: "blur(0.5px)" }}
        />

        {/* Right facet */}
        <polygon points="196,22 210,22 110,158 110,150" fill="url(#wrO)" />

        {/* Right inner edge */}
        <line
          x1="196"
          y1="22"
          x2="110"
          y2="150"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{ filter: "blur(0.4px)" }}
        />

        {/* Right outer edge */}
        <line x1="210" y1="22" x2="110" y2="158" stroke="rgba(0,0,0,0.78)" strokeWidth="3.5" strokeLinecap="round" />

        {/* Right outer edge highlight */}
        <line
          x1="209"
          y1="22"
          x2="111"
          y2="157"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Stem top dot */}
        <circle cx="110" cy="158" r="4.5" fill="rgba(153,39,4,0.4)" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" />

        {/* Rim gradient */}
        <line x1="10" y1="22" x2="210" y2="22" stroke="url(#rimO)" strokeWidth="5" strokeLinecap="round" />

        {/* Rim inner */}
        <line x1="24" y1="23" x2="196" y2="23" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" />

        {/* Rim left cap */}
        <line x1="10" y1="22" x2="24" y2="22" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />

        {/* Rim right cap */}
        <line x1="196" y1="22" x2="210" y2="22" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default Glass;

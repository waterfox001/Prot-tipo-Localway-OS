import React from 'react';
import { motion } from 'motion/react';

interface PoloLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'badge' | 'horizontal' | 'compact';
  showSubtext?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  animated?: boolean;
}

export const PoloLogo: React.FC<PoloLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showSubtext = true,
  theme = 'auto',
  animated = true,
}) => {
  // Configuração de dimensões
  const sizeStyles = {
    xs: { h: 'h-6', w: 'w-auto' },
    sm: { h: 'h-8', w: 'w-auto' },
    md: { h: 'h-11', w: 'w-auto' },
    lg: { h: 'h-14', w: 'w-auto' },
    xl: { h: 'h-20', w: 'w-auto' },
  };

  const selectedSize = sizeStyles[size] || sizeStyles.md;

  // 1. Badge Puro (apenas o ícone POLO em badge inclinado)
  const renderBadgeSvg = (extraClass = '') => (
    <svg
      viewBox="0 0 460 115"
      className={`${selectedSize.h} ${selectedSize.w} shrink-0 select-none overflow-visible ${extraClass}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="poloOrangeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC107" />
          <stop offset="42%" stopColor="#FF9100" />
          <stop offset="78%" stopColor="#FF6D00" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>

        <linearGradient id="badgeGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.26" />
          <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </linearGradient>

        <filter id="badgeShadow" x="-5%" y="-5%" width="115%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Badge Preto Inclinado */}
      <g transform="skewX(-14) translate(30, 0)" filter="url(#badgeShadow)">
        {/* Fundo preto com cantos arredondados */}
        <rect
          x="20"
          y="6"
          width="366"
          height="96"
          rx="20"
          ry="20"
          fill="#050505"
          stroke="#262626"
          strokeWidth="1.5"
        />

        {/* Brilho Superior Curvo do Badge */}
        <rect
          x="22"
          y="8"
          width="362"
          height="46"
          rx="18"
          ry="18"
          fill="url(#badgeGloss)"
        />
      </g>

      {/* Marca Registrada ® no Canto Superior Direito */}
      <g transform="translate(436, 16)">
        <circle
          cx="6"
          cy="6"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-slate-900 dark:text-white"
        />
        <text
          x="6"
          y="8.8"
          textAnchor="middle"
          fontSize="7"
          fontWeight="bold"
          fill="currentColor"
          className="text-slate-900 dark:text-white font-sans"
        >
          R
        </text>
      </g>

      {/* Tipografia Vetorial POLO em Laranja com Brilho */}
      <g transform="skewX(-14) translate(30, 0)">
        {/* P */}
        <path
          d="M 54 26 L 106 26 C 132 26 138 41 138 52 C 138 65 128 76 106 76 L 82 76 L 82 92 L 54 92 Z M 82 43 L 82 59 L 102 59 C 111 59 114 55 114 51 C 114 47 111 43 102 43 Z"
          fill="url(#poloOrangeGrad)"
          fillRule="evenodd"
        />

        {/* O (primeiro) */}
        <path
          d="M 172 26 C 144 26 138 46 138 60 C 138 74 145 92 173 92 L 198 92 C 226 92 233 74 233 60 C 233 46 225 26 197 26 Z M 172 43 L 199 43 C 208 43 210 49 210 59 C 210 69 207 75 198 75 L 173 75 C 163 75 161 69 161 59 C 161 49 164 43 172 43 Z"
          fill="url(#poloOrangeGrad)"
          fillRule="evenodd"
        />

        {/* L */}
        <path
          d="M 239 26 L 267 26 L 267 74 L 302 74 L 302 92 L 239 92 Z"
          fill="url(#poloOrangeGrad)"
        />

        {/* O (segundo) */}
        <path
          d="M 338 26 C 310 26 304 46 304 60 C 304 74 311 92 339 92 L 364 92 C 392 92 399 74 399 60 C 399 46 391 26 363 26 Z M 338 43 L 365 43 C 374 43 376 49 376 59 C 376 69 373 75 364 75 L 339 75 C 329 75 327 69 327 59 C 327 49 330 43 338 43 Z"
          fill="url(#poloOrangeGrad)"
          fillRule="evenodd"
        />

        {/* Brilho Reflexo Branco Sutil sobre a Metade Superior das Letras */}
        <path
          d="M 54 26 L 106 26 C 132 26 138 41 138 52 C 138 56 135 60 130 63 C 105 50 75 52 54 48 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />
        <path
          d="M 172 26 C 144 26 138 46 138 60 C 142 55 152 48 172 48 L 198 48 C 218 48 228 55 233 60 C 233 46 225 26 197 26 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />
        <path
          d="M 239 26 L 267 26 L 267 52 C 255 52 245 50 239 48 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />
        <path
          d="M 338 26 C 310 26 304 46 304 60 C 308 55 318 48 338 48 L 364 48 C 384 48 394 55 399 60 C 399 46 391 26 363 26 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />
      </g>
    </svg>
  );

  // Variante: Badge apenas
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {renderBadgeSvg()}
      </div>
    );
  }

  // Variante: Horizontal (Ideal para Barra Superior, Sidebar e Cabeçalhos)
  if (variant === 'horizontal') {
    return (
      <motion.div
        whileHover={animated ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.2 }}
        className={`inline-flex items-center gap-2.5 ${className}`}
      >
        {renderBadgeSvg()}

        {showSubtext && (
          <div className="flex flex-col justify-center select-none leading-none">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs md:text-sm font-black tracking-[0.24em] uppercase ${
                  theme === 'light'
                    ? 'text-slate-900'
                    : theme === 'dark'
                    ? 'text-white'
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                MÓVEIS
              </span>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 uppercase tracking-wider">
                ERP
              </span>
            </div>
            <span className="text-[8px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-0.5">
              Gestão 360°
            </span>
          </div>
        )}
      </motion.div>
    );
  }

  // Variante Compacta (Polo + Móveis em linha simples)
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {renderBadgeSvg('h-6')}
        <span
          className={`text-xs font-black tracking-widest uppercase ${
            theme === 'light'
              ? 'text-slate-900'
              : theme === 'dark'
              ? 'text-white'
              : 'text-slate-900 dark:text-white'
          }`}
        >
          MÓVEIS
        </span>
      </div>
    );
  }

  // Variant Full (Padrão): Badge POLO com 'm ó v e i s' abaixo
  return (
    <motion.div
      whileHover={animated ? { scale: 1.03 } : undefined}
      transition={{ duration: 0.2 }}
      className={`inline-flex flex-col items-center justify-center ${className}`}
    >
      <svg
        viewBox="0 0 460 156"
        className={`${selectedSize.h} ${selectedSize.w} select-none overflow-visible`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="poloOrangeGradFull" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="38%" stopColor="#FFA000" />
            <stop offset="72%" stopColor="#FF6D00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          <linearGradient id="badgeGlossFull" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="46%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="48%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
          </linearGradient>

          <filter id="badgeShadowFull" x="-5%" y="-5%" width="115%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 1. Badge Preto Inclinado */}
        <g transform="skewX(-14) translate(30, 0)" filter="url(#badgeShadowFull)">
          <rect
            x="20"
            y="6"
            width="366"
            height="96"
            rx="20"
            ry="20"
            fill="#050505"
            stroke="#222222"
            strokeWidth="1.5"
          />
          <rect
            x="22"
            y="8"
            width="362"
            height="46"
            rx="18"
            ry="18"
            fill="url(#badgeGlossFull)"
          />
        </g>

        {/* 2. Marca Registrada ® */}
        <g transform="translate(436, 16)">
          <circle
            cx="6"
            cy="6"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className={
              theme === 'light'
                ? 'text-slate-900'
                : theme === 'dark'
                ? 'text-white'
                : 'text-slate-900 dark:text-white'
            }
          />
          <text
            x="6"
            y="8.8"
            textAnchor="middle"
            fontSize="7"
            fontWeight="bold"
            fill="currentColor"
            className={
              theme === 'light'
                ? 'text-slate-900 font-sans'
                : theme === 'dark'
                ? 'text-white font-sans'
                : 'text-slate-900 dark:text-white font-sans'
            }
          >
            R
          </text>
        </g>

        {/* 3. Letras POLO */}
        <g transform="skewX(-14) translate(30, 0)">
          {/* P */}
          <path
            d="M 54 26 L 106 26 C 132 26 138 41 138 52 C 138 65 128 76 106 76 L 82 76 L 82 92 L 54 92 Z M 82 43 L 82 59 L 102 59 C 111 59 114 55 114 51 C 114 47 111 43 102 43 Z"
            fill="url(#poloOrangeGradFull)"
            fillRule="evenodd"
          />

          {/* O */}
          <path
            d="M 172 26 C 144 26 138 46 138 60 C 138 74 145 92 173 92 L 198 92 C 226 92 233 74 233 60 C 233 46 225 26 197 26 Z M 172 43 L 199 43 C 208 43 210 49 210 59 C 210 69 207 75 198 75 L 173 75 C 163 75 161 69 161 59 C 161 49 164 43 172 43 Z"
            fill="url(#poloOrangeGradFull)"
            fillRule="evenodd"
          />

          {/* L */}
          <path
            d="M 239 26 L 267 26 L 267 74 L 302 74 L 302 92 L 239 92 Z"
            fill="url(#poloOrangeGradFull)"
          />

          {/* O */}
          <path
            d="M 338 26 C 310 26 304 46 304 60 C 304 74 311 92 339 92 L 364 92 C 392 92 399 74 399 60 C 399 46 391 26 363 26 Z M 338 43 L 365 43 C 374 43 376 49 376 59 C 376 69 373 75 364 75 L 339 75 C 329 75 327 69 327 59 C 327 49 330 43 338 43 Z"
            fill="url(#poloOrangeGradFull)"
            fillRule="evenodd"
          />

          {/* Brilho Gloss nas Letras */}
          <path
            d="M 54 26 L 106 26 C 132 26 138 41 138 52 C 138 56 135 60 130 63 C 105 50 75 52 54 48 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />
          <path
            d="M 172 26 C 144 26 138 46 138 60 C 142 55 152 48 172 48 L 198 48 C 218 48 228 55 233 60 C 233 46 225 26 197 26 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />
          <path
            d="M 239 26 L 267 26 L 267 52 C 255 52 245 50 239 48 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />
          <path
            d="M 338 26 C 310 26 304 46 304 60 C 308 55 318 48 338 48 L 364 48 C 384 48 394 55 399 60 C 399 46 391 26 363 26 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />
        </g>

        {/* 4. Subtítulo 'm ó v e i s' em Tipografia Geométrica Estendida com Acento */}
        {showSubtext && (
          <g
            className={
              theme === 'light'
                ? 'fill-slate-950'
                : theme === 'dark'
                ? 'fill-white'
                : 'fill-slate-900 dark:fill-white'
            }
          >
            {/* m */}
            <path
              d="M 36 142 L 36 122 L 49 122 L 49 127 C 52 123 57 121 63 121 C 69 121 73 124 76 128 C 80 123 85 121 92 121 C 101 121 106 126 106 134 L 106 142 L 94 142 L 94 135 C 94 131 92 129 88 129 C 84 129 82 131 82 135 L 82 142 L 70 142 L 70 135 C 70 131 68 129 64 129 C 60 129 58 131 58 135 L 58 142 Z"
            />

            {/* ó com acento agudo */}
            <g>
              {/* acento agudo */}
              <polygon points="170,111 178,111 184,117 176,117" />
              {/* corpo da letra o */}
              <path
                d="M 166 121 C 180 121 190 127 190 132 C 190 137 180 143 166 143 C 152 143 142 137 142 132 C 142 127 152 121 166 121 Z M 166 128 C 158 128 154 130 154 132 C 154 134 158 136 166 136 C 174 136 178 134 178 132 C 178 130 174 128 166 128 Z"
                fillRule="evenodd"
              />
            </g>

            {/* v */}
            <polygon points="228,122 241,122 250,137 259,122 272,122 258,142 242,142" />

            {/* e */}
            <path
              d="M 308 121 C 322 121 332 127 332 133 L 332 135 L 298 135 C 299 138 304 140 310 140 C 316 140 320 139 324 137 L 328 141 C 323 143 317 144 309 144 C 295 144 286 137 286 132 C 286 127 295 121 308 121 Z M 308 126 C 303 126 299 128 298 131 L 320 131 C 319 128 314 126 308 126 Z"
              fillRule="evenodd"
            />

            {/* i com pingo */}
            <g>
              <rect x="364" y="112" width="11" height="5" />
              <rect x="364" y="122" width="11" height="20" />
            </g>

            {/* s */}
            <path
              d="M 406 143 C 398 143 392 140 391 137 L 401 135 C 402 137 405 138 409 138 C 413 138 416 137 416 135 C 416 132 412 131 405 130 C 395 128 392 126 392 123 C 392 120 397 117 406 117 C 413 117 418 119 420 122 L 411 124 C 410 122 408 121 405 121 C 401 121 399 122 399 123 C 399 125 402 126 409 127 C 420 128 424 131 424 134 C 424 139 417 143 406 143 Z"
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

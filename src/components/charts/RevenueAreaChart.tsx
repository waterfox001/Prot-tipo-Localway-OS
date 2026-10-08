import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, DollarSign, Calendar, Filter } from 'lucide-react';

interface DataPoint {
  label: string;
  revenue: number;
  cost: number;
  orders: number;
}

const mockDataSets: Record<'7d' | '30d' | 'semestral', DataPoint[]> = {
  '7d': [
    { label: '30/09', revenue: 68000, cost: 32500, orders: 14 },
    { label: '01/10', revenue: 84000, cost: 39800, orders: 19 },
    { label: '02/10', revenue: 76500, cost: 36200, orders: 16 },
    { label: '03/10', revenue: 99400, cost: 47100, orders: 22 },
    { label: '04/10', revenue: 112000, cost: 53200, orders: 25 },
    { label: '05/10', revenue: 128500, cost: 60900, orders: 28 },
    { label: '06/10 (Hoje)', revenue: 116100, cost: 55400, orders: 18 },
  ],
  '30d': [
    { label: 'Semana 1', revenue: 142000, cost: 68000, orders: 32 },
    { label: 'Semana 2', revenue: 168500, cost: 81200, orders: 38 },
    { label: 'Semana 3', revenue: 195000, cost: 93800, orders: 42 },
    { label: 'Semana 4', revenue: 179000, cost: 86400, orders: 30 },
  ],
  'semestral': [
    { label: 'Mai', revenue: 495000, cost: 238000, orders: 110 },
    { label: 'Jun', revenue: 532000, cost: 257000, orders: 118 },
    { label: 'Jul', revenue: 588000, cost: 284000, orders: 126 },
    { label: 'Ago', revenue: 615000, cost: 298000, orders: 135 },
    { label: 'Set', revenue: 642000, cost: 310000, orders: 139 },
    { label: 'Out (Atual)', revenue: 684500, cost: 332600, orders: 142 },
  ],
};

export const RevenueAreaChart: React.FC<{ title?: string; subtitle?: string }> = ({
  title = 'Evolução do Faturamento & Margem Bruta',
  subtitle = 'Acompanhamento financeiro diário e rentabilidade consolidada da Polo Móveis',
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'semestral'>('7d');
  const [activeSeries, setActiveSeries] = useState<'revenue' | 'profit' | 'both'>('both');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = mockDataSets[timeRange];

  // Coordenadas SVG
  const width = 760;
  const height = 220;
  const paddingX = 45;
  const paddingY = 30;

  const maxVal = Math.max(...data.map((d) => d.revenue)) * 1.15;
  const minVal = 0;

  const getX = (index: number) => {
    return paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
  };

  const getY = (val: number) => {
    return height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
  };

  // Construção do caminho SVG suave (Curva Bezier)
  const createSmoothPath = (values: number[]) => {
    const points = values.map((val, idx) => ({ x: getX(idx), y: getY(val) }));
    if (points.length === 0) return '';

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const revenueValues = data.map((d) => d.revenue);
  const profitValues = data.map((d) => d.revenue - d.cost);

  const revenuePath = createSmoothPath(revenueValues);
  const profitPath = createSmoothPath(profitValues);

  const lastPointX = getX(data.length - 1);
  const firstPointX = getX(0);
  const baselineY = height - paddingY;

  const revenueArea = `${revenuePath} L ${lastPointX} ${baselineY} L ${firstPointX} ${baselineY} Z`;
  const profitArea = `${profitPath} L ${lastPointX} ${baselineY} L ${firstPointX} ${baselineY} Z`;

  const defaultFallbackItem = { day: 'Hoje', label: 'Hoje', revenue: 0, cost: 0, orders: 0 };
  const hoveredData = (hoverIndex !== null ? data[hoverIndex] : data[data.length - 1]) || defaultFallbackItem;
  const hoveredProfit = (hoveredData.revenue || 0) - (hoveredData.cost || 0);
  const hoveredMargin = hoveredData.revenue > 0 ? ((hoveredProfit / hoveredData.revenue) * 100).toFixed(1) : '50.0';

  return (
    <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
      {/* Header do Gráfico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {title}
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Filtros de Série e Período */}
        <div className="flex items-center gap-2">
          {/* Seletor de Série */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setActiveSeries('both')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeSeries === 'both'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Geral
            </button>
            <button
              onClick={() => setActiveSeries('revenue')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeSeries === 'revenue'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Faturamento
            </button>
            <button
              onClick={() => setActiveSeries('profit')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeSeries === 'profit'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Lucro
            </button>
          </div>

          {/* Seletor de Período */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700 text-xs">
            {(['7d', '30d', 'semestral'] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setTimeRange(r);
                  setHoverIndex(null);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  timeRange === r
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {r === '7d' ? '7 Dias' : r === '30d' ? '30 Dias' : '6 Meses'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destaque Numérico em Tempo Real com Transição Suave */}
      <div className="flex flex-wrap items-center gap-6 px-1 mb-2 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
            {hoverIndex !== null ? `Data: ${hoveredData?.label || ''}` : 'Último Registro'}
          </span>
          <div className="text-base font-bold text-slate-900 dark:text-white font-mono flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-orange-600" />
            R$ {(hoveredData?.revenue || 0).toLocaleString('pt-BR')}
          </div>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
            Lucro Bruto Estimado
          </span>
          <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            R$ {(hoveredProfit || 0).toLocaleString('pt-BR')}
            <span className="text-[10px] font-normal px-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              {hoveredMargin}%
            </span>
          </div>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
            Volume de Pedidos
          </span>
          <div className="text-base font-bold text-slate-700 dark:text-slate-300 font-mono">
            {hoveredData?.orders || 0} pedidos
          </div>
        </div>
      </div>

      {/* SVG Canvas com Animação Motion */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 md:h-56 overflow-visible"
        >
          <defs>
            {/* Gradiente Laranja para Faturamento */}
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.28" />
              <stop offset="85%" stopColor="#EA580C" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </linearGradient>

            {/* Gradiente Verde para Lucro */}
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
              <stop offset="85%" stopColor="#10B981" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Linhas de Grade de Fundo Sutis */}
          {[0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = height - paddingY - pct * (height - paddingY * 2);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="currentColor"
                strokeDasharray="3 3"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Área Animada: Faturamento */}
          {(activeSeries === 'revenue' || activeSeries === 'both') && (
            <motion.path
              key={`rev-area-${timeRange}`}
              d={revenueArea}
              fill="url(#revenueGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}

          {/* Área Animada: Lucro */}
          {(activeSeries === 'profit' || activeSeries === 'both') && (
            <motion.path
              key={`profit-area-${timeRange}`}
              d={profitArea}
              fill="url(#profitGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            />
          )}

          {/* Linha Curva Animada: Faturamento */}
          {(activeSeries === 'revenue' || activeSeries === 'both') && (
            <motion.path
              key={`rev-line-${timeRange}`}
              d={revenuePath}
              fill="none"
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Linha Curva Animada: Lucro */}
          {(activeSeries === 'profit' || activeSeries === 'both') && (
            <motion.path
              key={`profit-line-${timeRange}`}
              d={profitPath}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Pontos Interativos e Cursor Hover */}
          {data.map((pt, idx) => {
            const x = getX(idx);
            const yRev = getY(pt.revenue);
            const yProf = getY(pt.revenue - pt.cost);
            const isHovered = hoverIndex === idx;

            return (
              <g key={idx}>
                {/* Linha Vertical no Ponto Ativo */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={baselineY}
                    stroke="#EA580C"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    opacity="0.7"
                  />
                )}

                {/* Marcador Faturamento */}
                {(activeSeries === 'revenue' || activeSeries === 'both') && (
                  <circle
                    cx={x}
                    cy={yRev}
                    r={isHovered ? 5 : 3}
                    fill="#EA580C"
                    className="transition-all duration-150"
                  />
                )}

                {/* Marcador Lucro */}
                {(activeSeries === 'profit' || activeSeries === 'both') && (
                  <circle
                    cx={x}
                    cy={yProf}
                    r={isHovered ? 4.5 : 2.5}
                    fill="#10B981"
                    className="transition-all duration-150"
                  />
                )}

                {/* Rótulo do Eixo X */}
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  className={`text-[10px] font-medium transition-colors ${
                    isHovered
                      ? 'fill-orange-600 font-bold'
                      : 'fill-slate-400 dark:fill-slate-500'
                  }`}
                >
                  {pt.label}
                </text>

                {/* Área invisível clicável/hoverável para facilitar interação */}
                <rect
                  x={x - (width / data.length) / 2}
                  y={0}
                  width={width / data.length}
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(idx)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

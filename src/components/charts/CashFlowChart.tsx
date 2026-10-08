import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DayFlow {
  day: string;
  inflow: number;
  outflow: number;
  balance: number;
}

const flowData: DayFlow[] = [
  { day: '06/10 (Hoje)', inflow: 42000, outflow: 18500, balance: 312450 },
  { day: '07/10', inflow: 28000, outflow: 35000, balance: 305450 },
  { day: '08/10', inflow: 65000, outflow: 22000, balance: 348450 },
  { day: '09/10', inflow: 38000, outflow: 14000, balance: 372450 },
  { day: '10/10', inflow: 89000, outflow: 48000, balance: 413450 },
  { day: '11/10', inflow: 22000, outflow: 12000, balance: 423450 },
  { day: '12/10', inflow: 74000, outflow: 31000, balance: 466450 },
];

export const CashFlowChart: React.FC<{ title?: string }> = ({
  title = 'Projeção de Fluxo Diário de Caixa (Entradas vs. Saídas)',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxDaily = Math.max(...flowData.map((d) => Math.max(d.inflow, d.outflow))) * 1.2;

  const width = 680;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const getX = (idx: number) => {
    return paddingX + (idx / (flowData.length - 1)) * (width - paddingX * 2);
  };

  const getBarHeight = (val: number) => {
    return (val / maxDaily) * (height - paddingY * 2);
  };

  const defaultFlow = { day: 'Hoje', inflow: 0, outflow: 0, balance: 0 };
  const hoveredData = (hoveredIdx !== null ? flowData[hoveredIdx] : flowData[0]) || defaultFlow;

  return (
    <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-300">Recebimentos (Entradas)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
            <span className="text-slate-600 dark:text-slate-300">Pagamentos (Saídas)</span>
          </div>
        </div>
      </div>

      {/* Destaque Interativo */}
      <div className="flex items-center justify-between text-xs px-1 mb-2 font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Data: <strong className="text-slate-800 dark:text-slate-200">{hoveredData?.day || 'Hoje'}</strong></span>
          <span className="text-emerald-600 font-bold">+R$ {(hoveredData?.inflow || 0).toLocaleString('pt-BR')}</span>
          <span className="text-rose-600 font-bold">-R$ {(hoveredData?.outflow || 0).toLocaleString('pt-BR')}</span>
        </div>
        <div className="text-slate-500">
          Saldo Projetado: <strong className="text-slate-900 dark:text-white">R$ {(hoveredData?.balance || 0).toLocaleString('pt-BR')}</strong>
        </div>
      </div>

      <div className="relative w-full overflow-hidden select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          {/* Linha de base */}
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeWidth="1"
          />

          {flowData.map((d, idx) => {
            const x = getX(idx);
            const inH = getBarHeight(d.inflow);
            const outH = getBarHeight(d.outflow);
            const isHovered = hoveredIdx === idx;

            const barW = 14;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="cursor-pointer"
              >
                {/* Barra Entrada (Verde) */}
                <motion.rect
                  x={x - barW - 1.5}
                  y={height - paddingY - inH}
                  width={barW}
                  height={inH}
                  rx="2"
                  fill="#10B981"
                  initial={{ height: 0, y: height - paddingY }}
                  animate={{ height: inH, y: height - paddingY - inH }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: 'easeOut' }}
                  opacity={isHovered ? 1 : 0.85}
                />

                {/* Barra Saída (Vermelho/Rosa) */}
                <motion.rect
                  x={x + 1.5}
                  y={height - paddingY - outH}
                  width={barW}
                  height={outH}
                  rx="2"
                  fill="#F43F5E"
                  initial={{ height: 0, y: height - paddingY }}
                  animate={{ height: outH, y: height - paddingY - outH }}
                  transition={{ duration: 0.8, delay: idx * 0.08 + 0.05, ease: 'easeOut' }}
                  opacity={isHovered ? 1 : 0.85}
                />

                {/* Label do Dia */}
                <text
                  x={x}
                  y={height - 6}
                  textAnchor="middle"
                  className={`text-[10px] font-medium transition-colors ${
                    isHovered
                      ? 'fill-slate-900 dark:fill-white font-bold'
                      : 'fill-slate-400 dark:fill-slate-500'
                  }`}
                >
                  {d.day.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

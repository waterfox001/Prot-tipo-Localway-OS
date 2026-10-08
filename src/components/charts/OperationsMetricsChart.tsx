import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, Wrench, CheckCircle2, Clock, AlertTriangle, Boxes } from 'lucide-react';

interface DayMetric {
  day: string;
  deliveries: number;
  assemblies: number;
  onTimeRate: number;
}

const weekData: DayMetric[] = [
  { day: 'Seg 30/09', deliveries: 12, assemblies: 9, onTimeRate: 100 },
  { day: 'Ter 01/10', deliveries: 16, assemblies: 14, onTimeRate: 98 },
  { day: 'Qua 02/10', deliveries: 14, assemblies: 11, onTimeRate: 96 },
  { day: 'Qui 03/10', deliveries: 19, assemblies: 16, onTimeRate: 100 },
  { day: 'Sex 04/10', deliveries: 22, assemblies: 18, onTimeRate: 97 },
  { day: 'Sáb 05/10', deliveries: 15, assemblies: 12, onTimeRate: 100 },
  { day: 'Hoje 06/10', deliveries: 18, assemblies: 15, onTimeRate: 99 },
];

export const OperationsMetricsChart: React.FC<{ title?: string }> = ({
  title = 'Ritmo Operacional de Entregas & Montagens',
}) => {
  const [activeTab, setActiveTab] = useState<'deliveries' | 'assemblies'>('deliveries');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxVal = 25;

  return (
    <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          {activeTab === 'deliveries' ? (
            <Truck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          ) : (
            <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          )}
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        </div>

        {/* Toggle Entregas / Montagens */}
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('deliveries')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'deliveries'
                ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            Entregas da Frota
          </button>
          <button
            onClick={() => setActiveTab('assemblies')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              activeTab === 'assemblies'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            Ordens de Montagem
          </button>
        </div>
      </div>

      {/* Métricas do Período */}
      <div className="grid grid-cols-3 gap-3 mb-4 text-xs font-mono">
        <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
            Total da Semana
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white">
            {weekData.reduce((acc, d) => acc + (activeTab === 'deliveries' ? d.deliveries : d.assemblies), 0)} serviços
          </span>
        </div>
        <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
            Pontualidade SLA
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            98.6%
          </span>
        </div>
        <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans">
            Tempo Médio
          </span>
          <span className="text-base font-bold text-slate-700 dark:text-slate-300">
            {activeTab === 'deliveries' ? '4.2h / rota' : '2.8h / montagem'}
          </span>
        </div>
      </div>

      {/* Gráfico de Barras Verticais Animadas */}
      <div className="pt-2">
        <div className="h-40 flex items-end justify-between gap-2 px-2 pb-1 border-b border-slate-200 dark:border-slate-800">
          {weekData.map((d, idx) => {
            const val = activeTab === 'deliveries' ? d.deliveries : d.assemblies;
            const heightPct = Math.round((val / maxVal) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group relative"
              >
                {/* Tooltip no Hover */}
                {isHovered && (
                  <div className="absolute -top-10 z-20 px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-mono shadow-md whitespace-nowrap">
                    {val} concluídos · {d.onTimeRate}% SLA
                  </div>
                )}

                {/* Valor no Topo da Barra */}
                <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 group-hover:text-orange-600">
                  {val}
                </span>

                {/* Barra Animada com Motion */}
                <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-t-sm overflow-hidden flex flex-col justify-end h-full">
                  <motion.div
                    className={`w-full rounded-t-sm transition-colors ${
                      activeTab === 'deliveries'
                        ? isHovered
                          ? 'bg-orange-600'
                          : 'bg-orange-500/80 dark:bg-orange-500'
                        : isHovered
                        ? 'bg-blue-600'
                        : 'bg-blue-500/80 dark:bg-blue-500'
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Eixo X com Dias */}
        <div className="flex justify-between gap-2 px-2 pt-2">
          {weekData.map((d, idx) => (
            <div
              key={idx}
              className={`flex-1 text-center text-[10px] truncate ${
                hoveredIdx === idx
                  ? 'font-bold text-orange-600 dark:text-orange-400'
                  : 'text-slate-400 dark:text-slate-500 font-medium'
              }`}
            >
              {d.day.split(' ')[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

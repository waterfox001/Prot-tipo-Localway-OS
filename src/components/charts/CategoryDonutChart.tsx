import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Armchair, PieChart } from 'lucide-react';

interface CategorySlice {
  id: string;
  label: string;
  value: number;
  sharePercent: number;
  color: string;
  darkColor: string;
}

const categoryData: CategorySlice[] = [
  { id: 'cadeiras', label: 'Cadeiras Ergonômicas NR-17', value: 260110, sharePercent: 38.0, color: '#EA580C', darkColor: '#F97316' },
  { id: 'mesas', label: 'Mesas & Plataformas de Trabalho', value: 191660, sharePercent: 28.0, color: '#3B82F6', darkColor: '#60A5FA' },
  { id: 'armarios', label: 'Armários & Gaveteiros Corporativos', value: 109520, sharePercent: 16.0, color: '#10B981', darkColor: '#34D399' },
  { id: 'aco', label: 'Móveis de Aço & Roupeiros', value: 68450, sharePercent: 10.0, color: '#8B5CF6', darkColor: '#A78BFA' },
  { id: 'outros', label: 'Longarinas, Biombos & Kits', value: 54760, sharePercent: 8.0, color: '#64748B', darkColor: '#94A3B8' },
];

export const CategoryDonutChart: React.FC<{ title?: string }> = ({
  title = 'Composição por Categoria de Mobiliário',
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<CategorySlice | null>(null);

  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);

  // Parâmetros do SVG Donut
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  const currentDisplay = hoveredSlice || {
    label: 'Faturamento Total',
    value: totalValue,
    sharePercent: 100,
    color: '#EA580C',
  };

  return (
    <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">100% Auditado</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut SVG Central */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90 overflow-visible"
          >
            {/* Círculo de fundo */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-slate-100 dark:text-slate-800/80"
            />

            {/* Segmentos Animados com Stroke Dash */}
            {categoryData.map((slice, idx) => {
              const strokeDasharray = `${(slice.sharePercent / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += slice.sharePercent;

              const isHovered = hoveredSlice?.id === slice.id;

              return (
                <motion.circle
                  key={slice.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-200"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredSlice(slice)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            })}
          </svg>

          {/* Conteúdo Central do Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
            <span className="text-[10px] uppercase font-semibold text-slate-400 truncate max-w-[110px]">
              {hoveredSlice ? hoveredSlice.label.split(' ')[0] : 'Total Vendas'}
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">
              R$ {Math.round(currentDisplay.value / 1000)}k
            </div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">
              {currentDisplay.sharePercent}%
            </span>
          </div>
        </div>

        {/* Legenda Interativa com Barras de Progresso */}
        <div className="flex-1 w-full space-y-2 text-xs">
          {categoryData.map((slice) => {
            const isHovered = hoveredSlice?.id === slice.id;
            return (
              <div
                key={slice.id}
                onMouseEnter={() => setHoveredSlice(slice)}
                onMouseLeave={() => setHoveredSlice(null)}
                className={`cursor-pointer p-1.5 rounded transition-colors ${
                  isHovered ? 'bg-slate-50 dark:bg-slate-800' : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-xs shrink-0"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {slice.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono">
                    <span className="text-slate-500">R$ {slice.value.toLocaleString('pt-BR')}</span>
                    <span className="font-bold text-slate-900 dark:text-white w-10 text-right">
                      {slice.sharePercent}%
                    </span>
                  </div>
                </div>

                {/* Micro barra animada */}
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: slice.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${slice.sharePercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, Target, Users, DollarSign, CheckCircle2 } from 'lucide-react';

interface SellerStat {
  id: string;
  name: string;
  role: string;
  category: string;
  salesCount: number;
  totalRevenue: number;
  monthlyGoal: number;
  conversionRate: number;
  commission: number;
  avatar: string;
}

const sellersData: SellerStat[] = [
  {
    id: 's-1',
    name: 'Carlos Mendes',
    role: 'Consultor Corporativo Sênior',
    category: 'Key Accounts',
    salesCount: 62,
    totalRevenue: 248900,
    monthlyGoal: 250000,
    conversionRate: 74.2,
    commission: 12445,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  },
  {
    id: 's-2',
    name: 'Juliana Matos',
    role: 'Especialista em Ergonomia NR-17',
    category: 'Ergonomia NR-17',
    salesCount: 48,
    totalRevenue: 196400,
    monthlyGoal: 200000,
    conversionRate: 68.5,
    commission: 9820,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
  },
  {
    id: 's-3',
    name: 'Roberto Albuquerque',
    role: 'Executivo Key Accounts',
    category: 'Key Accounts',
    salesCount: 32,
    totalRevenue: 142200,
    monthlyGoal: 180000,
    conversionRate: 62.0,
    commission: 7110,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: 's-4',
    name: 'Fernanda Lima',
    role: 'Consultora de Showroom',
    category: 'Showroom',
    salesCount: 26,
    totalRevenue: 97000,
    monthlyGoal: 120000,
    conversionRate: 59.4,
    commission: 4850,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
];

export const SellerPerformanceChart: React.FC<{ title?: string }> = ({
  title = 'Ranking da Equipe Comercial — Metas vs. Realizado',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [hoveredSeller, setHoveredSeller] = useState<string | null>(null);

  const filteredSellers = sellersData.filter((s) => {
    if (selectedCategory === 'todos') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        </div>

        {/* Filtro por Especialidade */}
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700 text-xs">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'Key Accounts', label: 'Grandes Contas' },
            { id: 'Ergonomia NR-17', label: 'Ergonomia' },
            { id: 'Showroom', label: 'Showroom' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Vendedores com Barras Animadas */}
      <div className="space-y-3 pt-1">
        {filteredSellers.map((seller, idx) => {
          const percent = Math.min(100, Math.round((seller.totalRevenue / seller.monthlyGoal) * 100));
          const isGoalReached = percent >= 95;
          const isHovered = hoveredSeller === seller.id;

          return (
            <div
              key={seller.id}
              onMouseEnter={() => setHoveredSeller(seller.id)}
              onMouseLeave={() => setHoveredSeller(null)}
              className={`p-2 rounded border transition-all duration-150 ${
                isHovered
                  ? 'border-orange-300 dark:border-orange-800/80 bg-orange-50/20 dark:bg-orange-950/10'
                  : 'border-slate-100 dark:border-slate-800/60 bg-transparent'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-1.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}º
                  </span>
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white truncate">
                        {seller.name}
                      </span>
                      {isGoalReached && (
                        <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Meta Atingida
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {seller.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0 pl-7 sm:pl-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Faturado</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      R$ {seller.totalRevenue.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-slate-400 block">Alvo Mensal</span>
                    <span className="text-slate-500">
                      R$ {seller.monthlyGoal.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Conversão</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {seller.conversionRate}%
                    </span>
                  </div>
                  <div className="text-right min-w-[50px]">
                    <span className="text-[10px] text-slate-400 block">% Atingido</span>
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        isGoalReached
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {percent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Barra de Progresso Animada */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    isGoalReached
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{
                    duration: 0.9,
                    delay: idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertTriangle, CheckCircle2, Clock, Calendar, DollarSign } from 'lucide-react';
import { Receivable } from '../../types';

interface FinancialReceivablesAgingChartProps {
  receivables?: Receivable[];
  title?: string;
  subtitle?: string;
}

export const FinancialReceivablesAgingChart: React.FC<FinancialReceivablesAgingChartProps> = ({
  receivables = [],
  title = 'Cronograma de Vencimentos & Aging de Recebíveis Polo Móveis',
  subtitle = 'Análise de liquidez futura vs inadimplência histórica por faixa de dias',
}) => {
  const [activeBucket, setActiveBucket] = useState<string | null>(null);

  // Group into aging buckets
  const now = new Date();
  const totalReceivables = receivables.reduce((acc, r) => acc + r.amount, 0) || 1;

  const buckets = [
    {
      id: 'overdue',
      label: 'Vencidos (> 1d)',
      color: '#EF4444',
      items: receivables.filter((r) => r.status === 'Atrasado'),
      badge: 'Cobrança Ativa',
    },
    {
      id: '7days',
      label: 'Vence em 7 dias',
      color: '#F59E0B',
      items: receivables.filter((r) => r.status === 'Pendente'),
      badge: 'Curto Prazo',
    },
    {
      id: '30days',
      label: 'Vence em 30 dias',
      color: '#3B82F6',
      items: receivables.filter((r) => r.status === 'Pendente'),
      badge: 'Médio Prazo',
    },
    {
      id: 'paid',
      label: 'Liquidado / Pago',
      color: '#10B981',
      items: receivables.filter((r) => r.status === 'Pago'),
      badge: 'Conciliado',
    },
  ];

  const bucketCalculations = buckets.map((b) => {
    const totalAmount = b.items.reduce((acc, it) => acc + it.amount, 0);
    const count = b.items.length;
    const share = Math.round((totalAmount / totalReceivables) * 100);
    return {
      ...b,
      totalAmount,
      count,
      share,
    };
  });

  const maxAmount = Math.max(...bucketCalculations.map((b) => b.totalAmount), 1);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Total Carteira: R$ {totalReceivables.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* Grid de Faixas Financeiras com animação suave */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {bucketCalculations.map((bucket, idx) => {
          const widthPct = Math.max((bucket.totalAmount / maxAmount) * 100, 10);
          const isSelected = activeBucket === bucket.id;

          return (
            <motion.div
              key={bucket.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
              onClick={() => setActiveBucket(isSelected ? null : bucket.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-slate-100 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">{bucket.label}</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                  style={{ backgroundColor: `${bucket.color}15`, color: bucket.color }}
                >
                  {bucket.badge}
                </span>
              </div>

              {/* Barra de Progresso Horizontal Animada */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden my-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: bucket.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="flex items-baseline justify-between mt-2">
                <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                  R$ {bucket.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </div>
                <div className="text-xs font-semibold text-slate-400 font-mono">
                  {bucket.count} títulos
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

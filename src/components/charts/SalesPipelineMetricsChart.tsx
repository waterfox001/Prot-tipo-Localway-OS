import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, TrendingUp, CheckCircle2, Clock, Truck, Wrench, AlertCircle, DollarSign } from 'lucide-react';
import { Sale } from '../../types';

interface SalesPipelineMetricsChartProps {
  sales?: Sale[];
  title?: string;
  subtitle?: string;
}

export const SalesPipelineMetricsChart: React.FC<SalesPipelineMetricsChartProps> = ({
  sales = [],
  title = 'Fluxo de Vendas & Esteira Operacional Polo Móveis',
  subtitle = 'Status dos pedidos em tempo real: do fechamento comercial até a montagem final',
}) => {
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  // Status mapping and aggregates
  const stageDefinitions = [
    { key: 'Pago', label: 'Pago / Liberado', color: '#10B981', icon: DollarSign },
    { key: 'Em preparação', label: 'Em Separação', color: '#F59E0B', icon: Clock },
    { key: 'Pronto para entrega', label: 'Pronto p/ Entrega', color: '#3B82F6', icon: CheckCircle2 },
    { key: 'Em rota', label: 'Em Rota de Entrega', color: '#8B5CF6', icon: Truck },
    { key: 'Entregue', label: 'Entregue no Cliente', color: '#06B6D4', icon: CheckCircle2 },
    { key: 'Concluído', label: 'Montagem Concluída', color: '#059669', icon: Wrench },
  ];

  const stageData = stageDefinitions.map((stage) => {
    const matching = sales.filter((s) => s.operationalStatus === stage.key);
    const count = matching.length;
    const totalValue = matching.reduce((acc, s) => acc + s.total, 0);
    return {
      ...stage,
      count,
      totalValue,
    };
  });

  const maxCount = Math.max(...stageData.map((d) => d.count), 1);
  const totalOrders = sales.length || 1;
  const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Global counters */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 text-[10px] uppercase block">Total Pedidos</span>
            <span className="font-bold text-slate-900 dark:text-white">{sales.length} ordens</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300">
            <span className="text-[10px] uppercase block opacity-80">Volume Faturado</span>
            <span className="font-bold">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>

      {/* Grid de Barras Interativas com Animação */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stageData.map((stage, idx) => {
          const heightPct = Math.max((stage.count / maxCount) * 100, 15);
          const Icon = stage.icon;
          const isSelected = selectedBar === stage.key;

          return (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              onClick={() => setSelectedBar(isSelected ? null : stage.key)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/20 dark:bg-orange-950/20 shadow-md'
                  : 'border-slate-100 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold truncate text-[11px]">{stage.label}</span>
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: stage.color }} />
              </div>

              {/* Graphic Bar */}
              <div className="h-24 w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex items-end p-1.5 overflow-hidden relative">
                <motion.div
                  className="w-full rounded-md shadow-xs"
                  style={{ backgroundColor: stage.color }}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 font-bold">
                  {Math.round((stage.count / totalOrders) * 100)}%
                </span>
              </div>

              {/* Data Value */}
              <div className="mt-2.5 space-y-0.5">
                <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono leading-none">
                  {stage.count} <span className="text-[10px] font-normal text-slate-400 font-sans">un</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 font-mono truncate">
                  R$ {stage.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

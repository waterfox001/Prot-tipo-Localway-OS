import React from 'react';
import { motion } from 'motion/react';
import { Target, ArrowRight } from 'lucide-react';

interface FunnelStep {
  label: string;
  count: number;
  value: string;
  rate: string;
  color: string;
  percentWidth: number;
}

const funnelSteps: FunnelStep[] = [
  { label: '1. Oportunidades & Contatos Qualificados', count: 85, value: 'R$ 1.450.000', rate: '100%', color: '#64748B', percentWidth: 100 },
  { label: '2. Propostas & Orçamentos Apresentados', count: 65, value: 'R$ 1.102.000', rate: '76.4%', color: '#3B82F6', percentWidth: 76 },
  { label: '3. Em Negociação / Fechamento Técnico', count: 41, value: 'R$ 720.000', rate: '48.2%', color: '#8B5CF6', percentWidth: 48 },
  { label: '4. Vendas Fechadas & Pedidos Faturados', count: 29, value: 'R$ 684.500', rate: '34.1%', color: '#EA580C', percentWidth: 34 },
  { label: '5. Entregues & Aprovadas com Sucesso', count: 28, value: 'R$ 662.000', rate: '96.5%', color: '#10B981', percentWidth: 32 },
];

export const FunnelConversionChart: React.FC<{ title?: string }> = ({
  title = 'Funil de Conversão Comercial (End-to-End)',
}) => {
  return (
    <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        </div>
        <span className="text-[10px] text-slate-500 font-medium">Ciclo Médio: 12 dias</span>
      </div>

      <div className="space-y-3 pt-1">
        {funnelSteps.map((step, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                  {step.label}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono">
                <span className="text-slate-500">{step.count} negociações</span>
                <span className="font-bold text-slate-900 dark:text-white">{step.value}</span>
                <span
                  className="text-[11px] font-bold px-1.5 py-0.2 rounded"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}
                >
                  {step.rate}
                </span>
              </div>
            </div>

            {/* Barra Animada com Motion */}
            <div className="w-full h-3 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded"
                style={{ backgroundColor: step.color }}
                initial={{ width: 0 }}
                animate={{ width: `${step.percentWidth}%` }}
                transition={{
                  duration: 0.9,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

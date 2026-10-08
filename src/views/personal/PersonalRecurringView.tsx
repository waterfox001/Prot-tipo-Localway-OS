import React from 'react';
import { Repeat, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalRecurringView: React.FC = () => {
  const { personalRecurring } = useApp();

  const totalMensal = personalRecurring
    .filter((r) => r.status === 'Ativo')
    .reduce((acc, r) => acc + r.amount, 0);

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Repeat className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Assinaturas & Contas Fixas
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Recorrências & Despesas Fixas
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Compromissos periódicos e débitos automáticos programados.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:text-right">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total Recorrente Mensal
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            R$ {totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
          Despesas Automáticas Ativas ({personalRecurring.length})
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {personalRecurring.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-4 hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                  <Repeat className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{rec.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {rec.category} · Todo dia {rec.dueDay} ({rec.frequency}) · {rec.account}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  R$ {rec.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  ✓ {rec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

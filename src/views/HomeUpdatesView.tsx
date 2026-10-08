import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeUpdatesView: React.FC = () => {
  const { updates, setActiveView } = useApp();

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Header */}
      <div className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            Central de Novidades & Versões
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          O que há de novo na Polo Móveis Gestão 360°
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
          Acompanhe melhorias contínuas, novas ferramentas e atualizações da plataforma.
        </p>
      </div>

      <div className="space-y-4">
        {updates.map((upd) => (
          <div
            key={upd.id}
            className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all"
          >
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 text-slate-800 px-3 py-1 text-xs font-bold dark:bg-slate-800 dark:text-slate-200">
                  {upd.tag}
                </span>
                {upd.badge && (
                  <span className="rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-xs font-bold dark:bg-blue-950/60 dark:text-blue-300">
                    {upd.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 font-medium">{upd.date}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {upd.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {upd.description}
            </p>
          </div>
        ))}

        {/* Banner de atalho para o novo módulo de Patrimônio */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Quer ver seu patrimônio líquido consolidado?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Acesse a área "Meu Financeiro" para visualizar dinheiro em contas, investimentos e imóveis pessoais.
            </p>
          </div>
          <button
            onClick={() => setActiveView('personal_networth')}
            className="rounded-lg bg-slate-900 text-white px-4 py-2.5 text-xs font-semibold hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shrink-0 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Ver Meu Patrimônio</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

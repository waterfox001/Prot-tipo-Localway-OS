import React, { useState } from 'react';
import { Target, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StrategyOKRsView: React.FC = () => {
  const { okrs } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 - 2026');

  return (
    <div className="space-y-4 pb-10">
      {/* Header Compacto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Metas Estratégicas & OKRs
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Acompanhamento de objetivos e resultados-chave do ciclo trimestral.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Ciclo:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-medium cursor-pointer"
          >
            <option value="Q4 - 2026">Q4 - 2026 (Outubro a Dezembro)</option>
            <option value="Q3 - 2026">Q3 - 2026 (Encerrado)</option>
            <option value="Ano 2026">Consolidado Anual 2026</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Progresso Geral
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            83.0%
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            6 de 7 Key Results no prazo
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Meta Faturamento Mensal
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ 850.000 / mês
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            +25% expansão vs 2025
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Margem Bruta Mínima
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            50.0%
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            Realizado atual: 51.4%
          </div>
        </div>
      </div>

      {/* OKRs em Formato Compacto Executivo */}
      <div className="space-y-3">
        {okrs.map((okr) => (
          <div
            key={okr.id}
            className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Header do Objetivo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
              <div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  OBJETIVO
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {okr.objective}
                </h3>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {okr.department} · {okr.period} · Marcus Glauber
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                  {okr.progress}%
                </span>
                <div className="w-24 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-orange-600 rounded-full"
                    style={{ width: `${okr.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Key Results Compactos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {okr.keyResults.map((kr) => (
                <div
                  key={kr.id}
                  className="rounded border border-slate-100 bg-slate-50/60 p-2.5 dark:border-slate-800 dark:bg-slate-800/40 flex items-center justify-between text-xs"
                >
                  <div className="pr-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">KR</div>
                    <div className="font-semibold text-slate-900 dark:text-white leading-tight">
                      {kr.description}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {kr.current} / {kr.target}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {kr.progressPercent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

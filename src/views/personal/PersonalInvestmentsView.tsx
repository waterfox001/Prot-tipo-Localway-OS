import React from 'react';
import { TrendingUp, Plus, PieChart, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalInvestmentsView: React.FC = () => {
  const { personalInvestments, openQuickAction } = useApp();

  const totalInvestido = personalInvestments.reduce((acc, i) => acc + i.investedAmount, 0);
  const totalAtual = personalInvestments.reduce((acc, i) => acc + i.currentAmount, 0);
  const lucroTotal = totalAtual - totalInvestido;
  const rentabilidadeGeral = totalInvestido > 0 ? (lucroTotal / totalInvestido) * 100 : 0;

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <TrendingUp className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Carteira & Alocação de Capital
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Investimentos Pessoais
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Acompanhe a alocação em Renda Fixa (CDBs), Fundos Imobiliários e Ações.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('investimento')}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo Aporte / Ativo
        </button>
      </div>

      {/* KPI Cards de Investimentos */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Patrimônio Investido</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            R$ {totalAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Valor a mercado hoje</span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Total Aportado</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            R$ {totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Custo total de aquisição</span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Lucro Acumulado</span>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">
            + R$ {lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1 block">Ganho de capital líquido</span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Rentabilidade Média</span>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">
            +{rentabilidadeGeral.toFixed(1)}%
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1 block">Superando o CDI (105%)</span>
        </div>
      </div>

      {/* Tabela de Ativos da Carteira */}
      <div className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
          Posição Detalhada por Ativo ({personalInvestments.length})
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {personalInvestments.map((inv) => (
            <div
              key={inv.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors text-xs sm:text-sm"
            >
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{inv.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {inv.category} · {inv.institution} · <strong className="text-slate-700 dark:text-slate-300 font-semibold">{inv.allocationPercent}% da carteira</strong>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <span className="text-xs text-slate-500 block">Aportado</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    R$ {inv.investedAmount.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Valor Atual</span>
                  <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                    R$ {inv.currentAmount.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="min-w-[70px]">
                  <span className="text-xs text-slate-500 block">Retorno</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    +R$ {(inv.currentAmount - inv.investedAmount).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

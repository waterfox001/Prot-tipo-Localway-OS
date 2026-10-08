import React, { useState } from 'react';
import {
  FileBarChart,
  TrendingUp,
  Download,
  Calendar,
  Wallet,
  Building,
  CreditCard,
  CheckCircle2,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalReportsView: React.FC = () => {
  const {
    personalAccounts,
    personalTransactions,
    personalInvestments,
    personalAssets,
    personalDebts,
    user,
  } = useApp();

  const [period, setPeriod] = useState<'30d' | '90d' | 'ano'>('30d');

  const totalBalance = personalAccounts.reduce((acc, a) => acc + a.balance, 0);
  const totalReceitas = personalTransactions
    .filter((t) => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalDespesas = personalTransactions
    .filter((t) => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);
  const poupanca = totalReceitas - totalDespesas;
  const taxaPoupanca = totalReceitas > 0 ? (poupanca / totalReceitas) * 100 : 0;

  const totalInvestimentos = personalInvestments.reduce((acc, i) => acc + i.currentAmount, 0);
  const totalBens = personalAssets.reduce((acc, a) => acc + a.value, 0);
  const totalDividas = personalDebts.reduce((acc, d) => acc + d.remainingAmount, 0);
  const patrimonioLiquido = totalBens - totalDividas;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <FileBarChart className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Relatório Financeiro Consolidado
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Relatório de Finanças Pessoais
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Visão contábil, índice de poupança e mapa patrimonial de {user.name}.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex rounded-lg border border-slate-200/90 bg-white p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <button
              onClick={() => setPeriod('30d')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                period === '30d'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              30 dias
            </button>
            <button
              onClick={() => setPeriod('90d')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                period === '90d'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Trimestre
            </button>
            <button
              onClick={() => setPeriod('ano')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                period === 'ano'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Ano Atual
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Exportar
          </button>
        </div>
      </div>

      {/* 4 KPIs de Alto Nível */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Patrimônio Líquido</span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {patrimonioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 inline-flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> +14.2% em 12 meses
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Taxa de Poupança Pessoal</span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400 mt-2">
            {taxaPoupanca.toFixed(1)}%
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Meta recomendada: 30%+
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Total Investido</span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-indigo-700 dark:text-indigo-400 mt-2">
            R$ {totalInvestimentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 block">
            Rendimento médio: 10.4% a.a.
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Liquidez Imediata (Contas)</span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Cobre ~8 meses de despesas fixas
          </span>
        </div>
      </div>

      {/* Grid de 2 Colunas: Alocação & Fluxo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Alocação Patrimonial */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Distribuição do Patrimônio Bruto (R$ {totalBens.toLocaleString('pt-BR')})
            </h2>
            <PieChart className="h-4 w-4 text-slate-400" />
          </div>

          <div className="space-y-4">
            {personalAssets.map((asset) => {
              const perc = totalBens > 0 ? (asset.value / totalBens) * 100 : 0;
              return (
                <div key={asset.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{asset.name}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      R$ {asset.value.toLocaleString('pt-BR')} ({perc.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-900 dark:bg-blue-500 transition-all duration-500"
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evolução Histórica de Entradas x Saídas */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Histórico Comparativo (Últimos 4 Meses)
            </h2>
            <span className="text-xs text-slate-500 font-medium">Valores em R$ mil</span>
          </div>

          <div className="space-y-3">
            {[
              { mes: 'Julho', rec: 52, des: 22 },
              { mes: 'Agosto', rec: 54, des: 25 },
              { mes: 'Setembro', rec: 52, des: 21 },
              { mes: 'Outubro (Atual)', rec: 52, des: 16.5 },
            ].map((item) => (
              <div key={item.mes} className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/70 dark:bg-slate-800/40 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">{item.mes}</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    Sobra: R$ {((item.rec - item.des) * 1000).toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between rounded-md bg-white px-3 py-1.5 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                    <span className="text-slate-500">Entradas</span>
                    <span className="font-bold text-slate-900 dark:text-white">R$ {item.rec}.000</span>
                  </div>
                  <div className="flex items-center justify-between rounded-md bg-white px-3 py-1.5 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                    <span className="text-slate-500">Saídas</span>
                    <span className="font-bold text-rose-700 dark:text-rose-400">R$ {item.des}.000</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

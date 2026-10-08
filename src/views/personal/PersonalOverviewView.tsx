import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Building,
  Landmark,
  Plus,
  ArrowRight,
  PieChart,
  Repeat,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalOverviewView: React.FC = () => {
  const {
    personalAccounts,
    personalCards,
    personalTransactions,
    personalInvestments,
    personalAssets,
    personalDebts,
    setActiveView,
    openQuickAction,
  } = useApp();

  const totalBalance = personalAccounts.reduce((acc, a) => acc + a.balance, 0);
  const totalReceitas = personalTransactions
    .filter((t) => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalDespesas = personalTransactions
    .filter((t) => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);
  const saldoDisponivel = totalReceitas - totalDespesas;
  const totalInvestimentos = personalInvestments.reduce((acc, i) => acc + i.currentAmount, 0);
  const totalBens = personalAssets.reduce((acc, a) => acc + a.value, 0);
  const totalDividas = personalDebts.reduce((acc, d) => acc + d.remainingAmount, 0);
  const patrimonioLiquido = totalBens - totalDividas;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Wallet className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Finanças Pessoais · Marcus Glauber
            </span>
            <span className="text-xs text-slate-500 font-medium hidden md:inline">
              Ambiente Pessoal Isolado do PJ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Meu Financeiro Pessoal
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Acompanhe contas privadas, cartões, investimentos e evolução patrimonial.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openQuickAction('receita')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            Nova Receita
          </button>
          <button
            onClick={() => openQuickAction('despesa')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            Nova Despesa
          </button>
        </div>
      </div>

      {/* KPI Cards: Finanças Pessoais */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Saldo em Contas
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            4 contas conectadas
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Receitas do Mês
            </span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2 tracking-tight">
              R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
            Pró-labore + Lucros
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Despesas do Mês
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Gastos fixos e cartão
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Saldo Disponível
            </span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2 tracking-tight">
              R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Sobra líquida no mês
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Investimentos
            </span>
            <div className="text-xl sm:text-2xl font-bold text-indigo-700 dark:text-indigo-400 mt-2 tracking-tight">
              R$ {totalInvestimentos.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </div>
          </div>
          <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
            +8.4% rend. anual
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Patrimônio Líquido
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
              R$ {patrimonioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Bens - Dívidas
          </div>
        </div>
      </div>

      {/* Gráficos Pessoais: Receitas x Despesas e Despesas por Categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Receitas x Despesas comparativo */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Receitas x Despesas Mensais (2026)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evolução mensal do fluxo de caixa pessoal
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Receitas
              </span>
              <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Despesas
              </span>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-4 pt-4 px-2">
            {[
              { mes: 'Jun', rec: 35000, desp: 16200 },
              { mes: 'Jul', rec: 36000, desp: 15400 },
              { mes: 'Ago', rec: 37500, desp: 14900 },
              { mes: 'Set', rec: 38000, desp: 16800 },
              { mes: 'Out (Atual)', rec: 38500, desp: 14820 },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-2 h-40">
                  {/* Barra Receita */}
                  <div
                    className="w-7 bg-emerald-500 rounded-t-md transition-all hover:opacity-90"
                    style={{ height: `${(d.rec / 42000) * 100}%` }}
                    title={`Receita: R$ ${d.rec.toLocaleString('pt-BR')}`}
                  />
                  {/* Barra Despesa */}
                  <div
                    className="w-7 bg-rose-400 rounded-t-md transition-all hover:opacity-90"
                    style={{ height: `${(d.desp / 42000) * 100}%` }}
                    title={`Despesa: R$ ${d.desp.toLocaleString('pt-BR')}`}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {d.mes}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Despesas por Categoria */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Despesas por Categoria
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Distribuição no mês corrente
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { cat: 'Moradia (Condomínio & Taxas)', val: 2850, pct: 32, cor: 'bg-slate-900 dark:bg-slate-100' },
                { cat: 'Educação (Colégio)', val: 4200, pct: 47, cor: 'bg-slate-700 dark:bg-slate-300' },
                { cat: 'Saúde (Plano Bradesco Top)', val: 2450, pct: 27, cor: 'bg-slate-500 dark:bg-slate-500' },
                { cat: 'Alimentação & Lazer', val: 1950, pct: 22, cor: 'bg-slate-400 dark:bg-slate-600' },
                { cat: 'Transporte & Seguro Auto', val: 680, pct: 8, cor: 'bg-blue-600' },
              ].map((it, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{it.cat}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      R$ {it.val.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                    <div className={`h-full ${it.cor} rounded-full`} style={{ width: `${it.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveView('personal_transactions')}
            className="mt-5 text-xs font-semibold text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 transition-colors"
          >
            <span>Ver Todos os Lançamentos</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Seção Rápida: Contas Bancárias & Cartões do Marcus Glauber */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Contas Pessoais */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Landmark className="h-4 w-4 text-slate-700 dark:text-slate-300" />
              Minhas Contas Bancárias
            </h2>
            <button
              onClick={() => setActiveView('personal_accounts')}
              className="text-xs font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-200"
            >
              Gerenciar →
            </button>
          </div>

          <div className="space-y-2.5">
            {personalAccounts.map((acc) => (
              <div
                key={acc.id}
                className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50/60 border border-slate-200/70 dark:bg-slate-800/40 dark:border-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">{acc.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{acc.type}</div>
                </div>
                <div className="text-right font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cartões de Crédito */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-slate-700 dark:text-slate-300" />
              Cartões de Crédito Pessoais
            </h2>
            <button
              onClick={() => setActiveView('personal_cards')}
              className="text-xs font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-200"
            >
              Ver Detalhes →
            </button>
          </div>

          <div className="space-y-2.5">
            {personalCards.map((card) => (
              <div
                key={card.id}
                className="p-3.5 rounded-lg border border-slate-200/70 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">{card.name}</div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Vencimento dia {card.dueDay}
                  </span>
                </div>

                <div className="flex justify-between items-end pt-1">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Fatura Atual</span>
                    <div className="text-sm sm:text-base font-bold text-rose-700 dark:text-rose-400">
                      R$ {card.currentInvoice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Limite Disponível</span>
                    <div className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-400">
                      R$ {card.availableLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
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

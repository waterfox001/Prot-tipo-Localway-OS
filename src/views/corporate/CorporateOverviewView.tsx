import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building2,
  Landmark,
  CreditCard,
  FileText,
  FileBarChart,
  ArrowRight,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileSignature,
  Building,
  ShieldCheck,
  ChevronRight,
  Wallet,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateOverviewView: React.FC = () => {
  const {
    corporateAccounts,
    corporateTransactions,
    corporateContracts,
    corporateFixedCosts,
    company,
    setActiveView,
    openQuickAction,
  } = useApp();

  const totalSaldosPJ = corporateAccounts.reduce((acc, a) => acc + a.balance, 0);

  const totalReceitasPJ = corporateTransactions
    .filter((t) => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDespesasPJ = corporateTransactions
    .filter((t) => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalCustosFixos = corporateFixedCosts.reduce((acc, c) => acc + c.monthlyAmount, 0);

  // Alerta de contratos com menos de 30 dias para vencer
  const contratosAlerta = corporateContracts.filter((c) => c.daysToRenew <= 30);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Corporativo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Building2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Finanças Empresariais (PJ) · {company.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Financeiro Corporativo
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Fluxo de caixa, saldos bancários PJ, custos fixos e saúde financeira da empresa.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openQuickAction('receita')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            Entrada PJ
          </button>
          <button
            onClick={() => openQuickAction('despesa')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            Despesa PJ
          </button>
        </div>
      </div>

      {/* Alerta de Contrato a Renovar (se houver) */}
      {contratosAlerta.length > 0 && (
        <div className="rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {contratosAlerta.length} Contrato Corporativo próximo do vencimento
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Contrato <span className="font-semibold text-slate-900 dark:text-slate-200">{contratosAlerta[0].contractCode}</span> com {contratosAlerta[0].customerName} vence em {contratosAlerta[0].daysToRenew} dias.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveView('corp_contracts')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors shrink-0"
          >
            Ver Contratos →
          </button>
        </div>
      )}

      {/* 4 Cards Principais de Indicadores Corporativos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saldo Total PJ */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Saldo em Contas PJ
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <Landmark className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              R$ {totalSaldosPJ.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Itaú, Bradesco & BTG</span>
            <button
              onClick={() => setActiveView('corp_accounts')}
              className="font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
            >
              Ver contas →
            </button>
          </div>
        </div>

        {/* Faturamento do Mês */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Faturamento Realizado
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              R$ 684.500,00
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
            <TrendingUp className="h-3.5 w-3.5" /> +18.4% vs mês anterior
          </div>
        </div>

        {/* Custos Fixos Mensais */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Custos Fixos Mensais
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <TrendingDown className="h-4 w-4 text-rose-500" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              R$ {totalCustosFixos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Galpão, Folha & Operação</span>
            <button
              onClick={() => setActiveView('corp_fixed_costs')}
              className="font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
            >
              Detalhar →
            </button>
          </div>
        </div>

        {/* Lucro Operacional Estimado */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Lucro Operacional Líquido
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <FileBarChart className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              R$ 195.300,00
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Margem: 31.0%</span>
            <button
              onClick={() => setActiveView('corp_dre')}
              className="font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
            >
              Abrir DRE →
            </button>
          </div>
        </div>
      </div>

      {/* Grid Central: Lançamentos Recentes PJ + Resumo das Contas Bancárias */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Tabela de Lançamentos Recentes PJ */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Últimos Lançamentos Financeiros PJ
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Entradas e saídas registradas na operação
              </p>
            </div>
            <button
              onClick={() => setActiveView('corp_transactions')}
              className="text-xs font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors"
            >
              Ver todos →
            </button>
          </div>

          <div className="space-y-2.5">
            {corporateTransactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                      tx.type === 'receita'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}
                  >
                    {tx.type === 'receita' ? '+' : '-'}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {tx.description}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{tx.date}</span>
                      <span>·</span>
                      <span>{tx.category}</span>
                      {tx.entityName && (
                        <>
                          <span>·</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{tx.entityName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs sm:text-sm font-bold ${
                      tx.type === 'receita'
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {tx.type === 'receita' ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold mt-0.5 ${
                      tx.status === 'Pago'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Direita: Contas Bancárias & Acesso Rápido */}
        <div className="space-y-5">
          {/* Contas PJ */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Saldos em Contas PJ
              </h2>
              <button
                onClick={() => setActiveView('corp_accounts')}
                className="text-xs text-slate-900 hover:text-blue-600 font-semibold dark:text-slate-200"
              >
                Gerenciar
              </button>
            </div>

            <div className="space-y-2.5">
              {corporateAccounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-lg border border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">{acc.name}</span>
                    <span className="text-xs text-slate-500">{acc.type}</span>
                  </div>
                  <div className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
                    R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  {acc.yieldInfo && (
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {acc.yieldInfo}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Atalhos Rápidos */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Acesso Rápido Corporativo
            </h3>
            <button
              onClick={() => setActiveView('corp_dre')}
              className="w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileBarChart className="h-4 w-4 text-blue-600" />
                <span>Demonstração de Resultados (DRE)</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
            <button
              onClick={() => setActiveView('corp_contracts')}
              className="w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileSignature className="h-4 w-4 text-emerald-600" />
                <span>Clientes & Contratos Recorrentes</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
            <button
              onClick={() => setActiveView('corp_properties')}
              className="w-full flex items-center justify-between p-3 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 text-indigo-600" />
                <span>Imóveis & Galpão Cajamar</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

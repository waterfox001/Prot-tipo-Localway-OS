import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  CreditCard,
  Building,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CashFlowChart } from '../../components/charts/CashFlowChart';

export const FinancialCashFlowView: React.FC = () => {
  const { receivables, payables, corporateAccounts, openQuickAction } = useApp();
  const [period, setPeriod] = useState<'30d' | '60d' | '90d'>('30d');

  // Saldos bancários atuais
  const totalBankBalance = corporateAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  // Totais previstos nos próximos 30 dias
  const expectedInflows = receivables
    .filter((r) => r.status === 'Pendente')
    .reduce((sum, r) => sum + r.amount, 0);

  const expectedOutflows = payables
    .filter((p) => p.status === 'Pendente')
    .reduce((sum, p) => sum + p.amount, 0);

  const projectedBalance = totalBankBalance + expectedInflows - expectedOutflows;

  // Projeção diária mockada conectada com os dados reais
  const cashFlowTimeline = [
    { date: '05/10 (Hoje)', inflows: 28400, outflows: 12500, balance: totalBankBalance, status: 'Consolidado' },
    { date: '06/10', inflows: 14500, outflows: 8200, balance: totalBankBalance + 6300, status: 'Previsto' },
    { date: '07/10', inflows: 32000, outflows: 45000, balance: totalBankBalance - 6700, status: 'Previsto (Folha Parcial)' },
    { date: '08/10', inflows: 19800, outflows: 5400, balance: totalBankBalance + 7700, status: 'Previsto' },
    { date: '09/10', inflows: 42100, outflows: 18000, balance: totalBankBalance + 31800, status: 'Previsto' },
    { date: '10/10', inflows: 55000, outflows: 38000, balance: totalBankBalance + 48800, status: 'Previsto (Lote Fornecedores)' },
    { date: '15/10', inflows: 68000, outflows: 22000, balance: totalBankBalance + 94800, status: 'Previsto (Recebimento Grandes Contratos)' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Fluxo de Caixa & Projeção Financeira
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Liquidez diária, conciliação de saldos em conta e projeção de entradas vs saídas da Polo Móveis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openQuickAction('receita')}
            className="inline-flex items-center gap-1.5 rounded bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            Lançar Movimento
          </button>
        </div>
      </div>

      {/* Cards de Liquidez e Projeção */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Saldo Atual em Contas
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {totalBankBalance.toLocaleString('pt-BR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Disponível para liquidez imediata
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Recebimentos Previstos (30d)
          </div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
            +R$ {expectedInflows.toLocaleString('pt-BR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Cartões faturados, boletos e parcelas
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pagamentos Previstos (30d)
          </div>
          <div className="text-lg font-bold text-rose-600 dark:text-rose-400 mt-1 font-mono">
            -R$ {expectedOutflows.toLocaleString('pt-BR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Fornecedores e custos operacionais
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Saldo Projetado (+30d)
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {projectedBalance.toLocaleString('pt-BR')}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Saúde financeira positiva
          </div>
        </div>
      </div>

      {/* Gráfico Interativo de Fluxo de Caixa */}
      <CashFlowChart title="Projeção Diária de Liquidez & Saldos Acumulados" />

      {/* Contas Bancárias da Loja */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Contas Correntes & Aplicações da Empresa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {corporateAccounts.map((acc) => (
            <div
              key={acc.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {acc.name}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {acc.bank}
                </span>
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                R$ {acc.balance.toLocaleString('pt-BR')}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {acc.type} • {acc.yieldInfo || 'Conta com conciliação automática'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de Projeção Diária de Caixa */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Linha do Tempo de Caixa (Dia a Dia)
            </h3>
            <p className="text-xs text-slate-500">
              Cronograma diário consolidando recebíveis de clientes e duplicatas a pagar
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Entradas Previstas</th>
                <th className="py-3 px-4">Saídas Previstas</th>
                <th className="py-3 px-4">Resultado do Dia</th>
                <th className="py-3 px-4">Saldo Final Projetado</th>
                <th className="py-3 px-4 text-right">Status do Dia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {cashFlowTimeline.map((item, idx) => {
                const dayDiff = item.inflows - item.outflows;
                return (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-mono">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      +R$ {item.inflows.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-rose-600 dark:text-rose-400 font-mono">
                      -R$ {item.outflows.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={dayDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                        {dayDiff >= 0 ? `+R$ ${dayDiff.toLocaleString('pt-BR')}` : `-R$ ${Math.abs(dayDiff).toLocaleString('pt-BR')}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-black text-slate-900 dark:text-white">
                      R$ {item.balance.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

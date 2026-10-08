import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FinancialTransaction } from '../types';
import { SectionHeader, StatCard } from '../components/common/UIComponents';

export const FinanceView: React.FC = () => {
  const { transactions, openQuickAction } = useApp();
  const [filterType, setFilterType] = useState<'todos' | 'receita' | 'despesa'>('todos');

  const totalReceitas = transactions
    .filter((t) => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDespesas = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldoOperacional = totalReceitas - totalDespesas;

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'todos') return true;
    return t.type === filterType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Controladoria & Gestão Financeira"
        subtitle="Contas a receber, contas a pagar, conciliação bancária, inadimplência e fluxo de caixa consolidado"
        actions={
          <button
            onClick={() => openQuickAction('payment')}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            + Registrar Lançamento
          </button>
        }
      />

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Saldo Líquido em Caixa"
          value={`R$ ${saldoOperacional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          subtitle="Contas bancárias Polo Móveis"
          change="+18.4% vs mês ant."
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Total Contas a Receber"
          value={`R$ ${totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          subtitle="Boletos faturados corporativos"
          change="96% adimplência"
          trend="up"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Contas a Pagar"
          value={`R$ ${totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          subtitle="Fornecedores e folha técnica"
          change="Provisão equilibrada"
          trend="neutral"
          icon={TrendingDown}
        />
        <StatCard
          title="Inadimplência Carteira"
          value="1.2%"
          subtitle="R$ 8.400 em atraso (Clínica Morumbi)"
          change="Cobrança ativa"
          trend="down"
          icon={AlertTriangle}
        />
      </div>

      {/* Transactions Ledger Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Livro Razão & Lançamentos Financeiros ({filteredTransactions.length})
            </h3>
            <p className="text-xs text-slate-400">
              Extrato consolidado de entradas e saídas operacionais
            </p>
          </div>

          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-1">
            <button
              onClick={() => setFilterType('todos')}
              className={`rounded px-2.5 py-1 text-xs font-semibold ${
                filterType === 'todos' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('receita')}
              className={`rounded px-2.5 py-1 text-xs font-semibold ${
                filterType === 'receita' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Receitas (Entradas)
            </button>
            <button
              onClick={() => setFilterType('despesa')}
              className={`rounded px-2.5 py-1 text-xs font-semibold ${
                filterType === 'despesa' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Despesas (Saídas)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/60">
                <th className="py-3 px-3">Tipo</th>
                <th className="py-3 px-3">Descrição / Documento</th>
                <th className="py-3 px-3">Favorecido / Cliente</th>
                <th className="py-3 px-3">Centro de Custo</th>
                <th className="py-3 px-3">Vencimento</th>
                <th className="py-3 px-3 text-right">Valor (R$)</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3 px-3 font-sans">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        tx.type === 'receita'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {tx.type === 'receita' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <div className="font-bold text-slate-200">{tx.description}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{tx.documentRef}</div>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-300">{tx.entityName}</td>
                  <td className="py-3 px-3 font-sans text-slate-400">{tx.costCenter}</td>
                  <td className="py-3 px-3 text-slate-300 tabular-nums">{tx.dueDate}</td>
                  <td
                    className={`py-3 px-3 text-right font-black tabular-nums ${
                      tx.type === 'receita' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {tx.type === 'receita' ? '+' : '-'} R${' '}
                    {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                        tx.status === 'Pago'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : tx.status === 'Atrasado'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

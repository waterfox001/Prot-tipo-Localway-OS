import React, { useState } from 'react';
import {
  TrendingUp,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  CreditCard,
  Building,
  User,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FinancialReceivablesAgingChart } from '../../components/charts/FinancialReceivablesAgingChart';

export const FinancialReceivablesView: React.FC = () => {
  const { receivables, registerReceivablePayment, openQuickAction } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const filteredReceivables = receivables.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.saleCode.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPending = receivables
    .filter((r) => r.status === 'Pendente')
    .reduce((acc, r) => acc + r.amount, 0);

  const totalOverdue = receivables
    .filter((r) => r.status === 'Atrasado')
    .reduce((acc, r) => acc + r.amount, 0);

  const totalReceived = receivables
    .filter((r) => r.status === 'Pago')
    .reduce((acc, r) => acc + (r.receivedAmount || r.amount), 0);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              <TrendingUp className="w-3.5 h-3.5" />
              Contas a Receber da Loja
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Títulos & Contas a Receber
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Parcelas geradas pelas vendas de móveis, conciliação e baixas com alimentação do fluxo de caixa.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('receita')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Registrar Recebimento
        </button>
      </div>

      {/* Gráfico Animado de Aging e Vencimentos */}
      <FinancialReceivablesAgingChart receivables={receivables} />

      {/* Grid de 3 Cards com Totais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total a Receber (Em Aberto)</span>
          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-blue-600 font-semibold mt-1">
            Boletos e parcelas futuras
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Títulos em Atraso</span>
          <div className="text-xl font-extrabold font-mono text-rose-700 dark:text-rose-400 mt-1">
            R$ {totalOverdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-rose-600 font-semibold mt-1">
            {receivables.filter((r) => r.status === 'Atrasado').length} parcela requer cobrança
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Recebido no Mês</span>
          <div className="text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 mt-1">
            R$ {totalReceived.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            Conciliado no caixa
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente ou código da venda (ex: VD-2026-148)..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          {['Todos', 'Pendente', 'Atrasado', 'Pago'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Contas a Receber */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Venda Vinculada</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Parcela</th>
                <th className="py-3 px-4">Vencimento</th>
                <th className="py-3 px-4">Forma de Pagamento</th>
                <th className="py-3 px-4">Valor da Parcela</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredReceivables.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {rec.saleCode}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {rec.customerName}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-600 dark:text-slate-400">
                    {rec.installment}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{rec.dueDate}</td>
                  <td className="py-3 px-4 text-slate-500">{rec.paymentMethod}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    R$ {rec.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rec.status === 'Pago'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : rec.status === 'Atrasado'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {rec.status !== 'Pago' ? (
                      <button
                        onClick={() => registerReceivablePayment(rec.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 shadow-2xs"
                      >
                        Dar Baixa / Receber
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Liquidado ({rec.paidDate})
                      </span>
                    )}
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

import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  Building2,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FinancialPayablesView: React.FC = () => {
  const { payables, registerPayablePayment, openQuickAction } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const filteredPayables = payables.filter((p) => {
    const matchesSearch =
      p.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPending = payables
    .filter((p) => p.status === 'Pendente')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalOverdue = payables
    .filter((p) => p.status === 'Atrasado')
    .reduce((acc, p) => acc + p.amount, 0);

  const totalPaid = payables
    .filter((p) => p.status === 'Pago')
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800">
              <Receipt className="w-3.5 h-3.5" />
              Contas a Pagar & Despesas
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Obrigações & Contas a Pagar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Pagamentos a fornecedores de mobiliário, matéria-prima, fretes e custos operacionais fixos.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('despesa')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Nova Despesa / Conta
        </button>
      </div>

      {/* Grid de 3 Cards com Totais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total a Pagar (Em Aberto)</span>
          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-blue-600 font-semibold mt-1">
            Fornecedores e aluguel do showroom
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Contas em Atraso</span>
          <div className="text-xl font-extrabold font-mono text-rose-700 dark:text-rose-400 mt-1">
            R$ {totalOverdue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-rose-600 font-semibold mt-1">
            {payables.filter((p) => p.status === 'Atrasado').length} conta requer liquidação
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pago no Mês</span>
          <div className="text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 mt-1">
            R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            Contas quitadas
          </div>
        </div>
      </div>

      {/* Tabela de Contas a Pagar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Fornecedor / Favorecido</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Descrição</th>
                <th className="py-3 px-4">Vencimento</th>
                <th className="py-3 px-4">Valor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredPayables.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {pay.supplierName}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{pay.category}</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                    {pay.description}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{pay.dueDate}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    R$ {pay.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        pay.status === 'Pago'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : pay.status === 'Atrasado'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {pay.status !== 'Pago' ? (
                      <button
                        onClick={() => registerPayablePayment(pay.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-[11px] hover:bg-slate-800 shadow-2xs dark:bg-white dark:text-slate-900"
                      >
                        Registrar Pagamento
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pago ({pay.paidDate})
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

import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Trash2,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalTransactionsView: React.FC = () => {
  const {
    personalTransactions,
    deletePersonalTransaction,
    openQuickAction,
  } = useApp();

  const [filterType, setFilterType] = useState<'todos' | 'receita' | 'despesa'>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = personalTransactions.filter((tx) => {
    const matchesType = filterType === 'todos' || tx.type === filterType;
    const matchesCategory = filterCategory === 'todos' || tx.category === filterCategory;
    return matchesType && matchesCategory;
  });

  const categories = [
    'todos',
    'Pró-Labore',
    'Dividendos',
    'Moradia',
    'Educação',
    'Alimentação',
    'Saúde',
    'Investimentos',
    'Outros',
  ];

  const handleDelete = (id: string, desc: string) => {
    deletePersonalTransaction(id);
    setToastMsg(`Lançamento "${desc}" movido para a lixeira pessoal.`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Extrato Financeiro Pessoal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Lançamentos Pessoais
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Histórico completo de entradas, saídas e movimentações de Marcus Glauber.
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

      {toastMsg && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-900 flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-amber-700 hover:text-amber-900">
            Dispensar
          </button>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Tipo */}
        <div className="flex items-center rounded-lg border border-slate-200/90 bg-white p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          {(['todos', 'receita', 'despesa'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                filterType === type
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              {type === 'todos' ? 'Todos' : type === 'receita' ? 'Receitas' : 'Despesas'}
            </button>
          ))}
        </div>

        {/* Categoria */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Categoria:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'todos' ? 'Todas as Categorias' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Lançamentos */}
      <div className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
          <span>Lançamentos Encontrados ({filtered.length})</span>
          <span className="text-slate-500 font-normal">Mês Corrente</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {filtered.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    tx.type === 'receita'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}
                >
                  {tx.type === 'receita' ? '+' : '-'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {tx.description}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{tx.category}</span>
                    <span>·</span>
                    <span>{tx.account}</span>
                    {tx.card && (
                      <>
                        <span>·</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{tx.card}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-right">
                  <div
                    className={`font-bold text-sm sm:text-base ${
                      tx.type === 'receita'
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {tx.type === 'receita' ? '+' : '-'} R${' '}
                    {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{tx.date}</div>
                </div>

                <button
                  onClick={() => handleDelete(tx.id, tx.description)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Mover para lixeira"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">
              Nenhum lançamento pessoal encontrado com os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

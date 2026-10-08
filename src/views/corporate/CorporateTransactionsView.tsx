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
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateTransactionsView: React.FC = () => {
  const {
    corporateTransactions,
    deleteCorporateTransaction,
    openQuickAction,
  } = useApp();

  const [filterType, setFilterType] = useState<'todos' | 'receita' | 'despesa'>('todos');
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletedToast, setDeletedToast] = useState<string | null>(null);

  const filtered = corporateTransactions.filter((tx) => {
    const matchesType = filterType === 'todos' || tx.type === filterType;
    const matchesCategory = filterCategory === 'todos' || tx.category === filterCategory;
    const matchesSearch =
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.entityName && tx.entityName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesCategory && matchesSearch;
  });

  const totalReceitas = filtered
    .filter((t) => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDespesas = filtered
    .filter((t) => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);

  const resultadoLiquido = totalReceitas - totalDespesas;

  const categories = [
    'todos',
    'Venda Mobiliário',
    'Fornecedores Matéria-Prima',
    'Folha Montagem & Salários',
    'Logística & Frete',
    'Infraestrutura',
    'Serviços',
    'Outros',
  ];

  const handleDelete = (id: string, desc: string) => {
    deleteCorporateTransaction(id);
    setDeletedToast(`Lançamento "${desc}" movido para a Lixeira da Empresa.`);
    setTimeout(() => setDeletedToast(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Livro Caixa & Conciliação PJ
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Lançamentos Financeiros da Empresa
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Registro de contas a pagar, contas a receber e movimentações bancárias da empresa.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openQuickAction('receita')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            Nova Entrada PJ
          </button>
          <button
            onClick={() => openQuickAction('despesa')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            Nova Despesa PJ
          </button>
        </div>
      </div>

      {deletedToast && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-900 flex items-center justify-between animate-fade-in">
          <span>{deletedToast}</span>
          <button onClick={() => setDeletedToast(null)} className="text-amber-700 hover:text-amber-900">
            Dispensar
          </button>
        </div>
      )}

      {/* Resumo do Filtro */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Entradas Filtradas</span>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">
            + R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Saídas Filtradas</span>
          <div className="text-2xl font-bold text-rose-700 dark:text-rose-400 mt-2">
            - R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Resultado Líquido</span>
          <div
            className={`text-2xl font-bold mt-2 ${
              resultadoLiquido >= 0
                ? 'text-slate-900 dark:text-white'
                : 'text-rose-700 dark:text-rose-400'
            }`}
          >
            R$ {resultadoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por descrição, cliente ou NF..."
            className="w-full rounded-lg border border-slate-200/90 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <div className="flex rounded-lg border border-slate-200/90 bg-white p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <button
              onClick={() => setFilterType('todos')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                filterType === 'todos'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('receita')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                filterType === 'receita'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Entradas
            </button>
            <button
              onClick={() => setFilterType('despesa')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                filterType === 'despesa'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Saídas
            </button>
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-slate-200/90 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'todos' ? 'Todas as Categorias' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="space-y-2.5">
        {filtered.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold shrink-0 ${
                  tx.type === 'receita'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                {tx.type === 'receita' ? '+' : '-'}
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {tx.description}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="h-3.5 w-3.5" /> {tx.date}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{tx.category}</span>
                  {tx.entityName && (
                    <>
                      <span>·</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{tx.entityName}</span>
                    </>
                  )}
                  {tx.documentRef && (
                    <>
                      <span>·</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]">
                        {tx.documentRef}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="text-right">
                <div
                  className={`text-sm sm:text-base font-bold ${
                    tx.type === 'receita'
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {tx.type === 'receita' ? '+' : '-'} R$ {tx.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{tx.account}</div>
              </div>

              <button
                onClick={() => handleDelete(tx.id, tx.description)}
                className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Mover para lixeira"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-sm font-medium text-slate-500">Nenhum lançamento financeiro encontrado com os filtros atuais.</span>
          </div>
        )}
      </div>
    </div>
  );
};

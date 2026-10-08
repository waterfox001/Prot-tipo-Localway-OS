import React, { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Filter,
  Plus,
  Boxes,
  Calendar,
  User,
  FileText,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StockMovement } from '../../types';

export const CatalogMovementsView: React.FC = () => {
  const { stockMovements, products } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('Todos');
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Form de ajuste manual
  const [selectedProdId, setSelectedProdId] = useState(products[0]?.id || '');
  const [adjustQty, setAdjustQty] = useState(1);
  const [adjustType, setAdjustType] = useState<'Entrada Compra' | 'Saída Venda' | 'Ajuste Inventário'>('Ajuste Inventário');
  const [adjustReason, setAdjustReason] = useState('Conferência física de contagem cíclica');

  const filteredMovements = stockMovements.filter((m) => {
    const matchesSearch =
      m.productName.toLowerCase().includes(search.toLowerCase()) ||
      m.sku.toLowerCase().includes(search.toLowerCase()) ||
      m.reference.toLowerCase().includes(search.toLowerCase()) ||
      m.responsible.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'Todos' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalEntries = stockMovements
    .filter((m) => m.type === 'Entrada Compra')
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalExits = stockMovements
    .filter((m) => m.type === 'Saída Venda')
    .reduce((sum, m) => sum + m.quantity, 0);

  const totalAdjustments = stockMovements
    .filter((m) => m.type === 'Ajuste Inventário')
    .reduce((sum, m) => sum + m.quantity, 0);

  const getTypeBadge = (type: StockMovement['type']) => {
    switch (type) {
      case 'Entrada Compra':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Saída Venda':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Reserva Venda':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Ajuste Inventário':
        return 'bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Devolução':
        return 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Rastreabilidade & Kardex
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Movimentações de Estoque
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Histórico auditável de entradas de pedidos de compra, baixas de vendas e contagens físicas.
          </p>
        </div>

        <button
          onClick={() => setShowAdjustModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          Lançar Ajuste Manual
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Entradas de Compras
            </span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            +{totalEntries} un.
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Recebidas de fornecedores parceiros
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Saídas por Vendas
            </span>
            <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            -{totalExits} un.
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Faturadas e despachadas para entrega
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Ajustes de Inventário
            </span>
            <Boxes className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {totalAdjustments} registros
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Correções físicas e conferências
          </div>
        </div>
      </div>

      {/* Tabela de Movimentações */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por produto, SKU, responsável ou documento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['Todos', 'Entrada Compra', 'Saída Venda', 'Reserva Venda', 'Ajuste Inventário'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  typeFilter === t
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Tipo Movimentação</th>
                <th className="py-3 px-4">Produto & SKU</th>
                <th className="py-3 px-4">Qtd</th>
                <th className="py-3 px-4">Estoque Resultante</th>
                <th className="py-3 px-4">Documento / Venda</th>
                <th className="py-3 px-4 text-right">Responsável</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {m.date}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getTypeBadge(m.type)}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {m.productName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {m.sku}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-black font-mono text-sm ${
                      m.type === 'Entrada Compra' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {m.type === 'Entrada Compra' ? `+${m.quantity}` : `-${m.quantity}`} un.
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                    {m.stockAfter} un.
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300 font-mono">
                    {m.reference}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500 font-medium">
                    {m.responsible}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajuste Manual */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 animate-scale-up">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Lançar Ajuste Manual de Estoque
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Realize correções de balanço, conferência de gaveta ou avarias de showroom.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAdjustModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Produto
                </label>
                <select
                  value={selectedProdId}
                  onChange={(e) => setSelectedProdId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Atual: {p.stockCurrent} un.)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tipo de Ajuste
                  </label>
                  <select
                    value={adjustType}
                    onChange={(e) => setAdjustType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Ajuste Inventário">Ajuste de Inventário</option>
                    <option value="Entrada Compra">Entrada Extra</option>
                    <option value="Saída Venda">Baixa por Descarte/Avaria</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={adjustQty}
                    onChange={(e) => setAdjustQty(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Justificativa / Observação
                </label>
                <textarea
                  rows={3}
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-xl"
                >
                  Confirmar Movimentação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

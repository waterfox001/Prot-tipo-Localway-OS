import React, { useState } from 'react';
import {
  PackageCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Wrench,
  Eye,
  ArrowRight,
  Boxes,
  Barcode,
  Printer,
  AlertTriangle,
  User,
  Calendar,
  CheckSquare,
  Square,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Sale, SaleOperationalStatus } from '../../types';

export const OperationsOrdersView: React.FC = () => {
  const {
    sales,
    updateSaleOperationalStatus,
    setSelectedSaleDetail,
    setActiveView,
  } = useApp();

  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('Todos');
  const [selectedOrderForCheck, setSelectedOrderForCheck] = useState<Sale | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const filteredOrders = sales.filter((s) => {
    const matchesSearch =
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.customerName.toLowerCase().includes(search.toLowerCase()) ||
      s.salesperson.toLowerCase().includes(search.toLowerCase());

    const matchesStage =
      stageFilter === 'Todos' ||
      (stageFilter === 'Aguardando' && (s.operationalStatus === 'Novo' || s.operationalStatus === 'Aguardando estoque')) ||
      (stageFilter === 'Em separação' && s.operationalStatus === 'Em preparação') ||
      (stageFilter === 'Pronto' && s.operationalStatus === 'Pronto para entrega') ||
      (stageFilter === 'Expedido' && (s.operationalStatus === 'Em rota' || s.operationalStatus === 'Entregue'));

    return matchesSearch && matchesStage;
  });

  const countAguardando = sales.filter((s) => s.operationalStatus === 'Novo' || s.operationalStatus === 'Aguardando estoque').length;
  const countPreparando = sales.filter((s) => s.operationalStatus === 'Em preparação').length;
  const countProntos = sales.filter((s) => s.operationalStatus === 'Pronto para entrega').length;
  const countExpedidos = sales.filter((s) => s.operationalStatus === 'Em rota' || s.operationalStatus === 'Entregue').length;

  const handleOpenChecklist = (order: Sale) => {
    setSelectedOrderForCheck(order);
    const initial: Record<string, boolean> = {};
    order.items.forEach((it, idx) => {
      initial[`${order.id}-${idx}`] = order.operationalStatus === 'Pronto para entrega' || order.operationalStatus === 'Em rota';
    });
    setCheckedItems(initial);
  };

  const handleAdvanceStatus = (orderId: string, currentStatus: SaleOperationalStatus) => {
    let nextStatus: SaleOperationalStatus = 'Em preparação';
    if (currentStatus === 'Novo' || currentStatus === 'Aguardando estoque') {
      nextStatus = 'Em preparação';
    } else if (currentStatus === 'Em preparação') {
      nextStatus = 'Pronto para entrega';
    } else if (currentStatus === 'Pronto para entrega') {
      nextStatus = 'Em rota';
    }
    updateSaleOperationalStatus(orderId, nextStatus);
    if (selectedOrderForCheck && selectedOrderForCheck.id === orderId) {
      setSelectedOrderForCheck(null);
    }
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Separação & Conferência de Pedidos (Picking)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Esteira de separação, conferência de volumes e liberação para expedição.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('operations_deliveries')}
            className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-2xs transition-colors"
          >
            <Truck className="w-3.5 h-3.5 text-slate-500" />
            Rotas de Entrega
          </button>
        </div>
      </div>

      {/* KPI Pipeline Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => setStageFilter('Aguardando')}
          className={`cursor-pointer rounded-2xl border p-4 shadow-2xs transition-all ${
            stageFilter === 'Aguardando'
              ? 'border-amber-500 bg-amber-50/30 dark:bg-amber-950/20'
              : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              1. Aguardando Separação
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {countAguardando} pedidos
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Aguardando início de separação
          </div>
        </div>

        <div
          onClick={() => setStageFilter('Em separação')}
          className={`cursor-pointer rounded-2xl border p-4 shadow-2xs transition-all ${
            stageFilter === 'Em separação'
              ? 'border-purple-500 bg-purple-50/30 dark:bg-purple-950/20'
              : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              2. Em Separação / Bipagem
            </span>
            <Boxes className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {countPreparando} pedidos
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Sendo conferidos no galpão
          </div>
        </div>

        <div
          onClick={() => setStageFilter('Pronto')}
          className={`cursor-pointer rounded-2xl border p-4 shadow-2xs transition-all ${
            stageFilter === 'Pronto'
              ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20'
              : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              3. Pronto p/ Expedição
            </span>
            <PackageCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {countProntos} pedidos
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Volumes etiquetados na doca
          </div>
        </div>

        <div
          onClick={() => setStageFilter('Expedido')}
          className={`cursor-pointer rounded-2xl border p-4 shadow-2xs transition-all ${
            stageFilter === 'Expedido'
              ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
              : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              4. Expedidos / Em Rota
            </span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {countExpedidos} pedidos
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Carregados nos caminhões
          </div>
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por pedido, cliente ou vendedor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['Todos', 'Aguardando', 'Em separação', 'Pronto', 'Expedido'].map((st) => (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  stageFilter === st
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Pedido</th>
                <th className="py-3 px-4">Cliente & Destino</th>
                <th className="py-3 px-4">Volumes & Itens</th>
                <th className="py-3 px-4">Data Prevista</th>
                <th className="py-3 px-4">Status Esteira</th>
                <th className="py-3 px-4 text-right">Ação Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredOrders.map((ord) => {
                const totalUnits = ord.items.reduce((sum, it) => sum + it.quantity, 0);
                return (
                  <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white font-mono">
                        {ord.code}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {ord.date} • {ord.salesperson.split(' ')[0]}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 dark:text-white truncate">
                        {ord.customerName}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {ord.customerAddress}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {totalUnits} volumes ({ord.items.length} SKUs)
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">
                        {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {ord.deliveryScheduledDate || '08/10/2026'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {ord.deliveryPeriod || 'Manhã (08h-12h)'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        {ord.operationalStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenChecklist(ord)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1"
                        >
                          <Barcode className="w-3.5 h-3.5" />
                          Conferir
                        </button>

                        {ord.operationalStatus !== 'Entregue' && ord.operationalStatus !== 'Concluído' && (
                          <button
                            onClick={() => handleAdvanceStatus(ord.id, ord.operationalStatus)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                          >
                            {ord.operationalStatus === 'Novo' || ord.operationalStatus === 'Aguardando estoque'
                              ? 'Iniciar Separação'
                              : ord.operationalStatus === 'Em preparação'
                              ? 'Concluir & Doca'
                              : 'Liberar Rota'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Checklist de Conferência de Volumes */}
      {selectedOrderForCheck && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Conferência de Volumes • {selectedOrderForCheck.code}
                </h3>
                <p className="text-xs text-slate-500">
                  Cliente: {selectedOrderForCheck.customerName}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderForCheck(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Bipe ou marque cada volume antes de liberar para o caminhão:
              </p>
              {selectedOrderForCheck.items.map((it, idx) => {
                const key = `${selectedOrderForCheck.id}-${idx}`;
                const isChecked = Boolean(checkedItems[key]);
                return (
                  <div
                    key={idx}
                    onClick={() => setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isChecked
                        ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {it.quantity}x {it.productName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          SKU: {it.sku} • Conferido pelo operador
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold font-mono text-slate-400">
                      Volume #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Romaneio
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForCheck(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => handleAdvanceStatus(selectedOrderForCheck.id, selectedOrderForCheck.operationalStatus)}
                  className="px-4 py-2 text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-xl"
                >
                  Concluir Conferência
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

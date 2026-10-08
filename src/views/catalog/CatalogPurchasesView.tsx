import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Building2,
  ArrowRight,
  Boxes,
  DollarSign,
  Package,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PurchaseOrder } from '../../types';

export const CatalogPurchasesView: React.FC = () => {
  const {
    purchaseOrders,
    suppliers,
    products,
    createPurchaseOrder,
    receivePurchaseOrder,
    openQuickAction,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [isNewPOOpen, setIsNewPOOpen] = useState(false);

  // Formulário de nova compra
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || 'sup-1');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'prod-01');
  const [poQty, setPoQty] = useState(20);

  const filteredPOs = purchaseOrders.filter((po) => {
    return (
      po.code.toLowerCase().includes(search.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStatusBadge = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'Recebido':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Em trânsito':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 animate-pulse';
      case 'Aguardando':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Pedido ao fornecedor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'Necessidade':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find((s) => s.id === selectedSupplierId) || suppliers[0];
    const prod = products.find((p) => p.id === selectedProductId) || products[0];
    const cost = prod.costPrice * poQty;

    createPurchaseOrder({
      supplierId: sup.id,
      supplierName: sup.name,
      items: [
        {
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          quantity: poQty,
          unitCost: prod.costPrice,
          total: cost,
        },
      ],
      totalValue: cost,
      expectedDate: '7 dias úteis',
      status: 'Pedido ao fornecedor',
      notes: `Ordem de compra criada para reposição de ${prod.name}.`,
    });

    setIsNewPOOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
              <Receipt className="w-3.5 h-3.5" />
              Gestão de Compras & Suprimentos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Ordens de Compra aos Fornecedores
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Fluxo: Necessidade de Compra → Pedido ao Fornecedor → Em Trânsito → Recebimento no Estoque.
          </p>
        </div>

        <button
          onClick={() => setIsNewPOOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Nova Ordem de Compra
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Em Aberto / Trânsito</span>
          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            {purchaseOrders.filter((p) => p.status !== 'Recebido').length} pedidos
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
            Reposições ativas da fábrica
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Valor Total Comprado</span>
          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            R$ {purchaseOrders.reduce((acc, p) => acc + p.totalValue, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            Preço de custo industrial
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Fornecedores Parceiros</span>
          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            {suppliers.length} indústrias
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            100% homologados NR-17
          </div>
        </div>
      </div>

      {/* Tabela de Ordens de Compra */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Fornecedor</th>
                <th className="py-3 px-4">Itens Solicitados</th>
                <th className="py-3 px-4">Data Pedido</th>
                <th className="py-3 px-4">Previsão Entrega</th>
                <th className="py-3 px-4">Valor Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredPOs.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {po.code}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {po.supplierName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {po.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{po.orderDate}</td>
                  <td className="py-3 px-4 text-slate-500">{po.expectedDate}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    R$ {po.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {po.status !== 'Recebido' ? (
                      <button
                        onClick={() => receivePurchaseOrder(po.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 shadow-2xs transition-colors"
                        title="Dar entrada no estoque e gerar conta a pagar"
                      >
                        <Boxes className="w-3 h-3" />
                        Receber no Estoque
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400">Entrada concluída</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nova Ordem de Compra */}
      {isNewPOOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Nova Ordem de Compra de Móveis
              </h3>
              <button
                onClick={() => setIsNewPOOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePO} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fornecedor / Indústria
                </label>
                <select
                  value={selectedSupplierId}
                  onChange={(e) => setSelectedSupplierId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Produto para Reposição
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - Custo: R$ {p.costPrice.toLocaleString('pt-BR')} (Estoque atual: {p.stockAvailable} un)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Quantidade a Pedir
                </label>
                <input
                  type="number"
                  min="1"
                  value={poQty}
                  onChange={(e) => setPoQty(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewPOOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-xs"
                >
                  Criar Pedido de Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

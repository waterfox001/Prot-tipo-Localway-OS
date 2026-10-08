import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Wrench,
  DollarSign,
  Boxes,
  Percent,
  Calendar,
  Eye,
  AlertTriangle,
  X,
  User,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Sale, SaleOperationalStatus } from '../../types';
import { SalesPipelineMetricsChart } from '../../components/charts/SalesPipelineMetricsChart';

export const CommercialSalesView: React.FC = () => {
  const {
    sales,
    receivables,
    deliveries,
    assemblies,
    openQuickAction,
    selectedSaleDetail,
    setSelectedSaleDetail,
    updateSaleOperationalStatus,
    registerReceivablePayment,
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const filteredSales = sales.filter((s) => {
    const matchesSearch =
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.customerName.toLowerCase().includes(search.toLowerCase()) ||
      s.salesperson.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || s.operationalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: SaleOperationalStatus) => {
    switch (status) {
      case 'Pago':
      case 'Entregue':
      case 'Concluído':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      case 'Em preparação':
      case 'Pronto para entrega':
      case 'Em rota':
        return 'bg-orange-50 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border border-orange-200 dark:border-orange-800';
      case 'Pagamento pendente':
      case 'Aguardando estoque':
      case 'Montagem pendente':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
      case 'Cancelado':
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700';
    }
  };

  const operationalStatusOptions: SaleOperationalStatus[] = [
    'Novo',
    'Pagamento pendente',
    'Pago',
    'Em preparação',
    'Aguardando estoque',
    'Pronto para entrega',
    'Em rota',
    'Entregue',
    'Montagem pendente',
    'Concluído',
    'Cancelado',
  ];

  // Dados conectados da venda selecionada
  const activeSaleReceivables = selectedSaleDetail
    ? receivables.filter((r) => r.saleCode === selectedSaleDetail.code)
    : [];

  const activeSaleDelivery = selectedSaleDetail
    ? deliveries.find((d) => d.orderCode === selectedSaleDetail.code)
    : null;

  const activeSaleAssembly = selectedSaleDetail
    ? assemblies.find((a) => a.saleCode === selectedSaleDetail.code)
    : null;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              <ShoppingBag className="w-3.5 h-3.5" />
              Gestão de Vendas & Pedidos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Vendas & Pedidos Operacionais
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Acompanhe o ciclo completo de cada venda: cliente, pagamento, estoque, rota e montagem.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('venda')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Nova Venda
        </button>
      </div>

      {/* Gráfico Animado da Esteira de Vendas */}
      <SalesPipelineMetricsChart sales={sales} />

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código da venda, cliente ou vendedor..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['Todos', 'Pronto para entrega', 'Em rota', 'Entregue', 'Concluído'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
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

      {/* Tabela de Vendas */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Número</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Vendedor</th>
                <th className="py-3 px-4">Valor Total</th>
                <th className="py-3 px-4">Pagamento</th>
                <th className="py-3 px-4">Status Operacional</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredSales.map((sale) => (
                <tr
                  key={sale.id}
                  onClick={() => setSelectedSaleDetail(sale)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {sale.code}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {sale.customerName}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{sale.date}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{sale.salesperson}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    R$ {sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sale.paymentStatus === 'Pago'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : sale.paymentStatus === 'Parcial'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${getStatusBadge(sale.operationalStatus)}`}>
                      {sale.operationalStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSaleDetail(sale);
                      }}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-bold dark:text-slate-400 dark:hover:text-white"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWER / MODAL DE DETALHES 360 DA VENDA */}
      {selectedSaleDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-5">
            {/* Topo do Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ordem de Venda
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(selectedSaleDetail.operationalStatus)}`}>
                    {selectedSaleDetail.operationalStatus}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-0.5">
                  {selectedSaleDetail.code}
                </h2>
              </div>
              <button
                onClick={() => setSelectedSaleDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mudança de Status Operacional em 1 Clique */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-slate-950/50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Avançar Status Operacional:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {operationalStatusOptions.slice(3, 10).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateSaleOperationalStatus(selectedSaleDetail.id, st);
                      setSelectedSaleDetail({ ...selectedSaleDetail, operationalStatus: st });
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                      selectedSaleDetail.operationalStatus === st
                        ? 'bg-slate-900 text-white font-bold dark:bg-white dark:text-slate-900'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Dados do Cliente e Venda */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/30">
              <div>
                <span className="text-slate-400 font-medium">Cliente</span>
                <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedSaleDetail.customerName}
                </div>
                <div className="text-[11px] text-slate-500">{selectedSaleDetail.customerPhone}</div>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Vendedor & Comissão</span>
                <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedSaleDetail.salesperson}
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
                  {selectedSaleDetail.commissionPercent}% = R$ {selectedSaleDetail.commissionAmount.toLocaleString('pt-BR')}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Endereço de Entrega</span>
                <div className="font-medium text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">
                  {selectedSaleDetail.customerAddress}
                </div>
              </div>
            </div>

            {/* Produtos / Itens da Venda */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Itens da Venda & Margem
              </span>
              <div className="rounded-xl border border-slate-200/80 overflow-hidden dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="py-2 px-3">Produto</th>
                      <th className="py-2 px-3">SKU</th>
                      <th className="py-2 px-3 text-center">Qtd</th>
                      <th className="py-2 px-3 text-right">Unitário</th>
                      <th className="py-2 px-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {selectedSaleDetail.items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">
                          {it.productName}
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-500">{it.sku}</td>
                        <td className="py-2 px-3 text-center font-bold">{it.quantity}</td>
                        <td className="py-2 px-3 text-right font-mono">
                          R$ {it.unitPrice.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                          R$ {it.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conexão Financeira: Parcelas a Receber */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Financeiro Conectado (Contas a Receber)
              </span>
              <div className="space-y-1.5">
                {activeSaleReceivables.length > 0 ? (
                  activeSaleReceivables.map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">
                            Parcela {rec.installment}
                          </span>
                          <span className="text-slate-400 ml-2">Vencimento: {rec.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          R$ {rec.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rec.status === 'Pago'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rec.status}
                        </span>
                        {rec.status !== 'Pago' && (
                          <button
                            onClick={() => registerReceivablePayment(rec.id)}
                            className="px-2 py-1 rounded-md bg-emerald-600 text-white font-bold hover:bg-emerald-700 text-[10px]"
                          >
                            Dar Baixa
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-xs text-slate-500 rounded-xl bg-slate-50 dark:bg-slate-800">
                    Venda liquidada à vista no ato do faturamento.
                  </div>
                )}
              </div>
            </div>

            {/* Conexão Operacional: Entrega & Montagem */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Entrega */}
              <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Logística de Entrega</span>
                </div>
                {activeSaleDelivery ? (
                  <div className="space-y-1 text-slate-600 dark:text-slate-400">
                    <div>Status: <span className="font-semibold text-slate-900 dark:text-white">{activeSaleDelivery.status}</span></div>
                    <div>Motorista: {activeSaleDelivery.driver}</div>
                    <div>Veículo: {activeSaleDelivery.vehicle} ({activeSaleDelivery.plate})</div>
                  </div>
                ) : (
                  <div className="text-slate-500">Agendada para {selectedSaleDetail.deliveryScheduledDate || 'Definição de Rota'}.</div>
                )}
              </div>

              {/* Montagem */}
              <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1.5">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  <span>Montagem Técnica NR-17</span>
                </div>
                {activeSaleAssembly ? (
                  <div className="space-y-1 text-slate-600 dark:text-slate-400">
                    <div>Status: <span className="font-semibold text-slate-900 dark:text-white">{activeSaleAssembly.status}</span></div>
                    <div>Montador: {activeSaleAssembly.assemblerName}</div>
                    <div>Data: {activeSaleAssembly.scheduledDate} ({activeSaleAssembly.period})</div>
                  </div>
                ) : (
                  <div className="text-slate-500">
                    {selectedSaleDetail.needsAssembly
                      ? `Agendada para ${selectedSaleDetail.assemblyScheduledDate || 'Próximos dias'}`
                      : 'Não requer montagem (produto entregue montado).'}
                  </div>
                )}
              </div>
            </div>

            {/* Totalizador */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">
              <span className="font-bold text-xs uppercase tracking-wider">Valor Total da Venda:</span>
              <span className="text-xl font-black font-mono">
                R$ {selectedSaleDetail.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

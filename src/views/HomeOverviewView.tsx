import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Boxes,
  Truck,
  Wrench,
  AlertTriangle,
  ArrowRight,
  Target,
  Clock,
  CheckCircle2,
  Users,
  FileText,
  Plus,
  Package,
  Layers,
  ShieldCheck,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RevenueAreaChart } from '../components/charts/RevenueAreaChart';
import { CategoryDonutChart } from '../components/charts/CategoryDonutChart';
import { OperationsMetricsChart } from '../components/charts/OperationsMetricsChart';
import { PoloLogo } from '../components/common/PoloLogo';

export const HomeOverviewView: React.FC = () => {
  const {
    user,
    setActiveView,
    openQuickAction,
    sales,
    quotes,
    deliveries,
    assemblies,
    occurrences,
    receivables,
    payables,
    products,
    followUps,
    setSelectedSaleDetail,
  } = useApp();

  const [period, setPeriod] = useState<'hoje' | '7d' | '30d' | 'mes'>('30d');

  // Cálculos dinâmicos consolidados
  const totalSalesMonth = sales.reduce((acc, s) => acc + s.total, 0);
  const salesCount = sales.length;
  const avgTicket = salesCount > 0 ? Math.round(totalSalesMonth / salesCount) : 0;
  const estimatedProfit = Math.round(totalSalesMonth * 0.514);

  const totalReceivables = receivables
    .filter((r) => r.status === 'Pendente' || r.status === 'Atrasado')
    .reduce((acc, r) => acc + r.amount, 0);

  const totalPayables = payables
    .filter((p) => p.status === 'Pendente' || p.status === 'Atrasado')
    .reduce((acc, p) => acc + p.amount, 0);

  // Operação de hoje
  const deliveriesPending = deliveries.filter((d) => d.status !== 'Entregue');
  const assembliesPending = assemblies.filter((a) => a.status !== 'Concluída');
  const ordersSeparation = sales.filter((s) => s.operationalStatus === 'Em preparação' || s.operationalStatus === 'Aguardando estoque');
  const openOccurrencesList = occurrences.filter((o) => o.status !== 'Resolvido' && o.status !== 'Encerrado');

  const openQuotesCount = quotes.filter((q) => q.status === 'Enviado' || q.status === 'Rascunho').length;
  const overdueReceivables = receivables.filter((r) => r.status === 'Atrasado');

  // Ranking resumido
  const salespersonRanking = [
    { name: 'Carlos Mendes', sales: 62, total: 248900, goalPercent: 99.5 },
    { name: 'Juliana Matos', sales: 48, total: 196400, goalPercent: 98.2 },
    { name: 'Roberto Albuquerque', sales: 32, total: 142200, goalPercent: 79.0 },
  ];

  const lowStockProducts = products.filter((p) => p.stockAvailable <= p.stockMin);

  return (
    <div className="space-y-4 pb-10">
      {/* 1. Header Operacional Enterprise */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-start gap-4">
          <div className="hidden md:flex p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <PoloLogo size="sm" variant="badge" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Operação em Tempo Real
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-500 font-medium">
                14 operadores conectados • Estoque sincronizado
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Bom dia, Marcus 👋
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Painel de comando operacional e visão financeira consolidada da Polo Móveis.
            </p>
          </div>
        </div>

        {/* Ações Rápidas em botões compactos */}
        <div className="flex items-center flex-wrap gap-1.5">
          <button
            onClick={() => openQuickAction('venda')}
            className="inline-flex items-center gap-1.5 rounded bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            Nova Venda
          </button>
          <button
            onClick={() => openQuickAction('quote')}
            className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            Orçamento
          </button>
          <button
            onClick={() => openQuickAction('cliente')}
            className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-slate-500" />
            Cliente
          </button>
          <button
            onClick={() => openQuickAction('receita')}
            className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-slate-500" />
            Pagamento
          </button>
          <button
            onClick={() => openQuickAction('produto')}
            className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Package className="w-3.5 h-3.5 text-slate-500" />
            Produto
          </button>
        </div>
      </div>

      {/* 2. KPIs Primários (Grid Compacto Enterprise) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Faturamento Mês
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {totalSalesMonth.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            +18.4% vs mês ant.
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Pedidos Fechados
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            {salesCount} pedidos
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Meta: 150 (94.6%)
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Ticket Médio
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {avgTicket.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Média por pedido
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Lucro Bruto Est.
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {estimatedProfit.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            51.4% margem média
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Contas a Receber
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {totalReceivables.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {overdueReceivables.length > 0 ? (
              <span className="text-rose-600 font-semibold">{overdueReceivables.length} em atraso</span>
            ) : (
              '100% em dia'
            )}
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Contas a Pagar
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {totalPayables.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            5 títulos a vencer
          </div>
        </div>
      </div>

      {/* Gráficos Estratégicos & Rentabilidade em Tempo Real */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <RevenueAreaChart
            title="Evolução do Faturamento & Rentabilidade Líquida"
            subtitle="Acompanhamento financeiro diário e margem bruta consolidada da Polo Móveis"
          />
        </div>
        <div>
          <CategoryDonutChart title="Mix de Vendas por Categoria" />
        </div>
      </div>

      {/* 3. Faixa de Operação do Dia & Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveView('operations_deliveries')}
          className="text-left rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Entregas Hoje</span>
            <Truck className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white mt-1 font-mono">
            {deliveriesPending.length} rotas programadas
          </div>
          <div className="text-[11px] text-orange-600 dark:text-orange-400 mt-0.5 font-medium flex items-center gap-1">
            <span>Acessar expedição</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </button>

        <button
          onClick={() => setActiveView('operations_assemblies')}
          className="text-left rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Montagens Agendadas</span>
            <Wrench className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white mt-1 font-mono">
            {assembliesPending.length} ordens de serviço
          </div>
          <div className="text-[11px] text-orange-600 dark:text-orange-400 mt-0.5 font-medium flex items-center gap-1">
            <span>Acessar montadores</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </button>

        <button
          onClick={() => setActiveView('operations_orders')}
          className="text-left rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Pedidos em Separação</span>
            <Boxes className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white mt-1 font-mono">
            {ordersSeparation.length} pedidos em picking
          </div>
          <div className="text-[11px] text-orange-600 dark:text-orange-400 mt-0.5 font-medium flex items-center gap-1">
            <span>Conferência de volumes</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </button>

        <button
          onClick={() => setActiveView('operations_occurrences')}
          className="text-left rounded border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Ocorrências Abertas</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white mt-1 font-mono">
            {openOccurrencesList.length} chamados em aberto
          </div>
          <div className="text-[11px] text-rose-600 dark:text-rose-400 mt-0.5 font-medium flex items-center gap-1">
            <span>Gerenciar SAC</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </button>
      </div>

      {/* Ritmo Operacional da Frota e Equipe de Montagem */}
      <OperationsMetricsChart title="Capacidade & Pontualidade: Entregas da Frota e Ordens de Montagem" />

      {/* 4. Painel Central: Alertas Prioritários e Vendas Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Coluna 1: Alertas e Pendências Operacionais */}
        <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Alertas & Ações Críticas
            </div>
            <span className="text-[10px] font-semibold text-slate-400">Tempo Real</span>
          </div>

          <div className="space-y-2 text-xs">
            {lowStockProducts.length > 0 && (
              <div
                onClick={() => setActiveView('catalog_inventory')}
                className="cursor-pointer p-2.5 rounded border border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-950/20 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between font-semibold text-amber-900 dark:text-amber-300">
                  <span>Estoque no ponto de reposição</span>
                  <span className="font-mono">{lowStockProducts.length} itens</span>
                </div>
                <div className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                  Itens com quantidade disponível abaixo do mínimo.
                </div>
              </div>
            )}

            {overdueReceivables.length > 0 && (
              <div
                onClick={() => setActiveView('financial_receivables')}
                className="cursor-pointer p-2.5 rounded border border-rose-200 bg-rose-50/50 dark:border-rose-900/50 dark:bg-rose-950/20 hover:border-rose-300 transition-colors"
              >
                <div className="flex items-center justify-between font-semibold text-rose-900 dark:text-rose-300">
                  <span>Cobrança pendente vencida</span>
                  <span className="font-mono">{overdueReceivables.length} fatura</span>
                </div>
                <div className="text-[11px] text-rose-700 dark:text-rose-400 mt-0.5">
                  Boleto vencido aguardando liquidação ou prorrogação.
                </div>
              </div>
            )}

            {openQuotesCount > 0 && (
              <div
                onClick={() => setActiveView('commercial_quotes')}
                className="cursor-pointer p-2.5 rounded border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>Propostas aguardando retorno</span>
                  <span className="font-mono">{openQuotesCount} orçamentos</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Clientes em fase de decisão de compra.
                </div>
              </div>
            )}

            <div
              onClick={() => setActiveView('commercial_crm')}
              className="cursor-pointer p-2.5 rounded border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                <span>Follow-ups agendados</span>
                <span className="font-mono">{followUps.filter((f) => f.status === 'Pendente').length} contatos</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Retornos programados com clientes hoje.
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2 e 3: Tabela Enterprise de Vendas Recentes */}
        <div className="lg:col-span-2 rounded border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Últimos Pedidos & Vendas Faturadas
              </h2>
            </div>
            <button
              onClick={() => setActiveView('commercial_sales')}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              Ver todas as vendas
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Valor</th>
                  <th className="py-2.5 px-3">Status Operacional</th>
                  <th className="py-2.5 px-3">Vendedor</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sales.slice(0, 5).map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      {sale.code}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {sale.customerName}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      R$ {sale.total.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {sale.operationalStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 truncate">
                      {sale.salesperson.split(' ')[0]}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedSaleDetail(sale);
                          setActiveView('commercial_sales');
                        }}
                        className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Ver detalhes"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. Linha Inferior: Desempenho Comercial & Produtos mais vendidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Desempenho por Consultor */}
        <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Desempenho da Equipe Comercial
            </span>
            <button
              onClick={() => setActiveView('commercial_dashboard')}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
            >
              Dashboard Comercial
            </button>
          </div>

          <div className="space-y-3">
            {salespersonRanking.map((sp) => (
              <div key={sp.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white">{sp.name}</span>
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                    R$ {sp.total.toLocaleString('pt-BR')} ({sp.goalPercent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      sp.goalPercent >= 90 ? 'bg-orange-600' : 'bg-slate-400'
                    }`}
                    style={{ width: `${Math.min(sp.goalPercent, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Produtos mais vendidos */}
        <div className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Produtos com Maior Giro
            </span>
            <button
              onClick={() => setActiveView('catalog_products')}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
            >
              Catálogo Geral
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {products.slice(0, 3).map((prod) => (
              <div key={prod.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">{prod.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    SKU: {prod.sku} • {prod.category}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900 dark:text-white">
                    R$ {prod.salePrice.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Estoque: <span className="font-bold text-slate-800 dark:text-slate-200">{prod.stockAvailable} un.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

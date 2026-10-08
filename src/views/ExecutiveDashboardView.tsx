import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Users,
  Boxes,
  Truck,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatCard, CompanyHealthCard, SectionHeader } from '../components/common/UIComponents';
import { RevenueAreaChart } from '../components/charts/RevenueAreaChart';
import { CategoryDonutChart } from '../components/charts/CategoryDonutChart';

export const ExecutiveDashboardView: React.FC = () => {
  const {
    user,
    company,
    products,
    customers,
    orders,
    deals,
    transactions,
    setActiveView,
    openQuickAction,
  } = useApp();

  const [period, setPeriod] = useState<'mes' | 'ano' | 'hoje'>('mes');

  // Realistic calculated metrics
  const totalStockValue = products.reduce((acc, p) => acc + p.stockCurrent * p.costPrice, 0);
  const totalStockUnits = products.reduce((acc, p) => acc + p.stockCurrent, 0);
  const criticalStockCount = products.filter((p) => p.stockAvailable <= p.stockMin).length;
  const activeOrders = orders.filter((o) => o.operationalStatus !== 'finalizado');
  const totalReceivables = transactions
    .filter((t) => t.type === 'receita' && t.status !== 'Pago')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalPayables = transactions
    .filter((t) => t.type === 'despesa' && t.status !== 'Pago')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Executive Greeting */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              Centro de Comando Empresarial 360°
            </div>
            <h1 className="mt-1 text-2xl font-black text-slate-100 tracking-tight">
              Bom dia, {user.name.split(' ')[0]}. Aqui está a visão da {company.name}.
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Operações sincronizadas em tempo real · Vendas corporativas, estoque e logística sob controle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Period Segmented Control */}
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-1">
              <button
                onClick={() => setPeriod('hoje')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  period === 'hoje'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hoje
              </button>
              <button
                onClick={() => setPeriod('mes')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  period === 'mes'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Este Mês
              </button>
              <button
                onClick={() => setPeriod('ano')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  period === 'ano'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Ano 2026
              </button>
            </div>

            <button
              onClick={() => openQuickAction('sale')}
              className="rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              + Nova Venda
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Faturamento do Mês"
          value="R$ 684.500"
          change="+18.4%"
          trend="up"
          timeframeComparison="vs. mês anterior (R$ 578k)"
          icon={DollarSign}
        />
        <StatCard
          title="Lucro Operacional Líquido"
          value="R$ 352.000"
          change="51.4% margem"
          trend="up"
          timeframeComparison="+4.2% acima da meta"
          icon={TrendingUp}
        />
        <StatCard
          title="Ticket Médio Corporativo"
          value="R$ 29.800"
          change="+12.0%"
          trend="up"
          timeframeComparison="Meta: R$ 28.500"
          icon={ShoppingBag}
        />
        <StatCard
          title="Novos Clientes Atendidos"
          value="64 empresas"
          change="+8 no mês"
          trend="up"
          timeframeComparison="80% da meta Q4"
          icon={Users}
        />
      </div>

      {/* Secondary KPI Bar: Contas, Estoque, Logística e Metas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Contas a Receber (15dd)"
          value={`R$ ${totalReceivables.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          subtitle="96% em dia · 1 título em atraso"
          change="+R$ 56k Zenith"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Contas a Pagar (Fornecedores)"
          value={`R$ ${totalPayables.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          subtitle="ErgoTech & WoodTech"
          change="Fluxo provisionado"
          trend="neutral"
          icon={Clock}
        />
        <StatCard
          title="Valor em Estoque Ativo"
          value={`R$ ${totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          subtitle={`${totalStockUnits} un. físicas (${criticalStockCount} itens críticos)`}
          change="Giro 3.4x / ano"
          trend="up"
          icon={Boxes}
        />
        <StatCard
          title="Entregas & Montagens Hoje"
          value="3 em transporte"
          subtitle="100% de pontualidade no mês"
          change="SLA 96.4%"
          trend="up"
          icon={Truck}
        />
      </div>

      {/* HEALTH OF THE COMPANY SECTION */}
      <CompanyHealthCard />

      {/* Charts & Analytical Breakdown Row with Real Animations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueAreaChart
            title="Evolução do Faturamento & Rentabilidade Líquida (2026)"
            subtitle="Curva dinâmica de vendas com projeção de margem e faturamento consolidado"
          />
        </div>
        <div>
          <CategoryDonutChart title="Mix por Categoria de Mobiliário" />
        </div>
      </div>

      {/* Operações & Alertas Rápidos do Dia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos em Andamento */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-500" />
                Entregas & Pedidos Críticos Hoje
              </h2>
              <p className="text-[11px] text-slate-400">
                Acompanhamento em tempo real da expedição e montagem
              </p>
            </div>
            <button
              onClick={() => setActiveView('operational')}
              className="text-xs text-amber-400 font-semibold hover:underline"
            >
              Ver Todos
            </button>
          </div>

          <div className="space-y-3">
            {activeOrders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-xs text-slate-100 flex items-center gap-2">
                    <span>Pedido {ord.code}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300 truncate max-w-[180px]">{ord.customerName}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
                    R$ {ord.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between mb-2">
                  <span>Veículo: {ord.vehicle || 'A designar'}</span>
                  <span className="font-mono text-amber-400 capitalize">{ord.operationalStatus.replace('_', ' ')}</span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${ord.progressPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clientes Corporativos */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Users className="h-4 w-4 text-sky-400" />
                Maiores Clientes Corporativos (LTV)
              </h2>
              <p className="text-[11px] text-slate-400">
                Empresas com maior faturamento histórico na Polo Móveis
              </p>
            </div>
            <button
              onClick={() => setActiveView('customers')}
              className="text-xs text-sky-400 font-semibold hover:underline"
            >
              Base 360°
            </button>
          </div>

          <div className="space-y-3">
            {customers.slice(0, 4).map((c, i) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-950/40 p-2.5 hover:bg-slate-950/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-md bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400 font-mono">
                    #{i + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{c.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {c.ordersCount} pedidos · Ticket: R$ {c.averageTicket.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-100 tabular-nums">
                    R$ {c.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">CSAT {c.csatRating}.0★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

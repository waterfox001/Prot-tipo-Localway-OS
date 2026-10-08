import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  FileText,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Percent,
  Plus,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RevenueAreaChart } from '../../components/charts/RevenueAreaChart';
import { FunnelConversionChart } from '../../components/charts/FunnelConversionChart';
import { SellerPerformanceChart } from '../../components/charts/SellerPerformanceChart';

export const CommercialDashboardView: React.FC = () => {
  const {
    sales,
    quotes,
    customers,
    products,
    setActiveView,
    openQuickAction,
    setSelectedSaleDetail,
  } = useApp();

  const [period, setPeriod] = useState<'hoje' | '7d' | '30d' | 'mes'>('mes');

  // Cálculos comerciais
  const totalRevenue = sales.reduce((acc, s) => acc + s.total, 0);
  const totalSalesCount = sales.length;
  const avgTicket = totalSalesCount > 0 ? Math.round(totalRevenue / totalSalesCount) : 0;
  
  const openQuotes = quotes.filter((q) => q.status === 'Enviado' || q.status === 'Rascunho' || q.status === 'Aguardando retorno');
  const openQuotesTotal = openQuotes.reduce((acc, q) => acc + (q.total || 0), 0);

  const approvedQuotes = quotes.filter((q) => q.status === 'Aprovado' || q.status === 'Aprovada');
  const conversionRate = quotes.length > 0 ? ((approvedQuotes.length / quotes.length) * 100).toFixed(1) : '68.4';

  const monthlyGoal = 800000;
  const goalProgress = ((totalRevenue / monthlyGoal) * 100).toFixed(1);

  // Vendas por Vendedor
  const salespersonRanking = [
    { name: 'Carlos Mendes', role: 'Consultor Corporativo Sênior', sales: 62, total: 248900, goal: 250000, conversion: 74.2, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { name: 'Juliana Matos', role: 'Especialista em Ergonomia NR-17', sales: 48, total: 196400, goal: 200000, conversion: 68.5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100' },
    { name: 'Roberto Albuquerque', role: 'Executivo Key Accounts', sales: 32, total: 142200, goal: 180000, conversion: 62.0, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { name: 'Fernanda Lima', role: 'Consultora de Showroom', sales: 26, total: 97000, goal: 120000, conversion: 59.4, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  ];

  // Funil comercial
  const funnelStages = [
    { stage: 'Leads / Contatos', count: 85, value: 'R$ 1.450.000', drop: '100%' },
    { stage: 'Propostas & Orçamentos', count: quotes.length, value: `R$ ${openQuotesTotal.toLocaleString('pt-BR')}`, drop: '76%' },
    { stage: 'Negociação Ativa', count: 24, value: 'R$ 412.000', drop: '48%' },
    { stage: 'Vendas Fechadas', count: sales.length, value: `R$ ${totalRevenue.toLocaleString('pt-BR')}`, drop: `${conversionRate}%` },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard Comercial
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Funil de propostas, metas de vendas e acompanhamento de cotas por consultor.
          </p>
        </div>

        {/* Período e Ação */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
            {(['hoje', '7d', '30d', 'mes'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  period === p
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                {p === 'hoje' ? 'Hoje' : p === '7d' ? '7d' : p === '30d' ? '30d' : 'Mês'}
              </button>
            ))}
          </div>

          <button
            onClick={() => openQuickAction('venda')}
            className="inline-flex items-center gap-1.5 rounded bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            Nova Venda
          </button>
        </div>
      </div>

      {/* Cards de Indicadores Comerciais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Receita em Vendas
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {goalProgress}% da meta mensal
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ticket Médio
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {avgTicket.toLocaleString('pt-BR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            Média por pedido concluído
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Taxa de Conversão
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            {conversionRate}%
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {approvedQuotes.length} de {quotes.length} orçamentos
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pipeline Aberto
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-mono">
            R$ {openQuotesTotal.toLocaleString('pt-BR')}
          </div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            {openQuotes.length} propostas ativas
          </div>
        </div>
      </div>

      {/* Gráfico Curva de Vendas e Rentabilidade Comercial */}
      <RevenueAreaChart
        title="Curva de Metas & Faturamento Comercial"
        subtitle="Acompanhamento diário da equipe de vendas corporativas · Polo Móveis"
      />

      {/* Funil de Conversão e Ranking de Vendedores com Animações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FunnelConversionChart title="Funil de Conversão Comercial Polo Móveis" />
        <SellerPerformanceChart title="Ranking & Cotas por Consultor de Vendas" />
      </div>

      {/* Vendas por Vendedor & Ranking Comercial */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Desempenho da Equipe de Consultores
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Vendas registradas, atingimento de cotas e comissões do período
            </p>
          </div>
          <button
            onClick={() => setActiveView('financial_commissions')}
            className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700"
          >
            Ver Extrato de Comissões
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Consultor</th>
                <th className="py-3 px-4">Pedidos Fechados</th>
                <th className="py-3 px-4">Volume Faturado</th>
                <th className="py-3 px-4">Cota do Mês</th>
                <th className="py-3 px-4">Atingimento</th>
                <th className="py-3 px-4">Taxa de Conversão</th>
                <th className="py-3 px-4 text-right">Comissão Estimada (3%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {salespersonRanking.map((rep, idx) => {
                const percent = ((rep.total / rep.goal) * 100).toFixed(1);
                const comm = rep.total * 0.03;
                return (
                  <tr key={rep.name} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-400 w-4">{idx + 1}º</span>
                        <img
                          src={rep.avatar}
                          alt={rep.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {rep.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {rep.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {rep.sales} pedidos
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-mono">
                      R$ {rep.total.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-500 font-mono">
                      R$ {rep.goal.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              Number(percent) >= 90 ? 'bg-emerald-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(Number(percent), 100)}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {percent}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {rep.conversion}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white font-mono">
                      R$ {comm.toLocaleString('pt-BR')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

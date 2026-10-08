import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  ShoppingBag,
  Wrench,
  Calendar,
  Sparkles,
  Star,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OperationsWarrantiesView: React.FC = () => {
  const { sales, setActiveView, openQuickAction } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('Todas');

  // Termos de garantia mockados e calculados a partir das vendas
  const warrantyRecords = sales.map((s, idx) => {
    const isVip = s.total > 50000;
    return {
      id: `war-${s.id}`,
      saleCode: s.code,
      customerName: s.customerName,
      customerPhone: s.customerPhone,
      deliveryDate: s.deliveryScheduledDate || '01/09/2026',
      warrantyPeriodMonths: isVip ? 60 : 36, // 5 anos ou 3 anos
      validUntil: '01/09/2029',
      status: idx % 4 === 0 ? 'Revisão Preventiva Agendada' : 'Garantia Ativa',
      npsScore: idx % 3 === 0 ? 10 : 9,
      npsFeedback: idx % 3 === 0 ? 'Excelente qualidade do mobiliário e montadores muito educados.' : 'Entregue dentro do prazo combinado.',
      coveredItems: (s.items || []).map((i) => `${i.productName || 'Item'} (${i.quantity || 1} un.)`).join(', '),
      terms: 'Garantia estrutural total, pistões a gás, espumas injetadas e ferragens conforme norma ABNT.',
    };
  });

  const filteredWarranties = warrantyRecords.filter((w) => {
    const matchesSearch =
      w.customerName.toLowerCase().includes(search.toLowerCase()) ||
      w.saleCode.toLowerCase().includes(search.toLowerCase()) ||
      w.coveredItems.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterType === 'Todas' || w.status === filterType;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              Retenção & Pós-Venda
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pós-Venda, Garantias & NPS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Gestão de termos de garantia de fábrica (até 5 anos), revisões ergonômicas preventivas e índice de satisfação.
          </p>
        </div>

        <button
          onClick={() => setActiveView('operations_occurrences')}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-all shadow-2xs"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          Ver Chamados de Assistência / SAC
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Garantias Ativas
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            {warrantyRecords.length} contratos
          </div>
          <div className="mt-2 text-xs text-slate-500">
            100% com cobertura Polo Móveis
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              NPS Médio (Satisfação)
            </span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            9.7 / 10
          </div>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            Excelente • Zona de Encantamento
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Revisões Preventivas
            </span>
            <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            6 agendadas
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Ajustes e reaperto de parafusos
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Índice de Retenção / LTV
            </span>
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2 font-mono">
            44.2%
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Clientes que voltam a comprar
          </div>
        </div>
      </div>

      {/* Tabela de Garantias */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por cliente, pedido ou produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['Todas', 'Garantia Ativa', 'Revisão Preventiva Agendada'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === t
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
                <th className="py-3 px-4">Pedido / Venda</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Produtos Cobertos</th>
                <th className="py-3 px-4">Prazo Garantia</th>
                <th className="py-3 px-4">Validade Até</th>
                <th className="py-3 px-4">NPS / Avaliação</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredWarranties.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold font-mono text-slate-900 dark:text-white">
                    {w.saleCode}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {w.customerName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {w.customerPhone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-700 dark:text-slate-300">
                    {w.coveredItems}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    {w.warrantyPeriodMonths / 12} anos ({w.warrantyPeriodMonths} meses)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {w.validUntil}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{w.npsScore}/10</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs">
                      "{w.npsFeedback}"
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      {w.status}
                    </span>
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

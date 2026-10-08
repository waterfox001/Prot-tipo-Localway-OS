import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Printer,
  ShoppingBag,
  Building,
  User,
  Calendar,
  DollarSign,
  AlertCircle,
  Eye,
  Send,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FunnelConversionChart } from '../../components/charts/FunnelConversionChart';

export const CommercialQuotesView: React.FC = () => {
  const {
    quotes,
    convertQuoteToSale,
    openQuickAction,
    selectedQuoteDetail,
    setSelectedQuoteDetail,
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      (q.code || '').toLowerCase().includes(search.toLowerCase()) ||
      (q.customerName || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
      case 'Aprovada':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Enviado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'Aguardando retorno':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Recusado':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      case 'Expirado':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
              <FileText className="w-3.5 h-3.5" />
              Gestão de Orçamentos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Orçamentos & Propostas Comerciais
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Crie, envie e transforme orçamentos aprovados em pedidos de venda com 1 clique.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('quote')}
          className="inline-flex items-center gap-1.5 rounded bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          Novo Orçamento
        </button>
      </div>

      {/* Gráfico Animado de Conversão do Funil de Propostas */}
      <FunnelConversionChart title="Funil de Conversão e Aprovação de Orçamentos Polo Móveis" />

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código (ex: PROP-2026-088) ou cliente..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['Todos', 'Enviado', 'Aguardando retorno', 'Aprovado', 'Rascunho'].map((st) => (
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

      {/* Tabela de Orçamentos */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Data Emissão</th>
                <th className="py-3 px-4">Produtos / Posições</th>
                <th className="py-3 px-4">Valor Total</th>
                <th className="py-3 px-4">Validade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredQuotes.map((q) => (
                <tr
                  key={q.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {q.code || 'PROP-2026-000'}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {q.customerName}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{q.date}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {q.items && q.items.length > 0
                      ? `${q.items[0].quantity}x ${q.items[0].productName}${q.items.length > 1 ? ` +${q.items.length - 1}` : ''}`
                      : 'Mobiliário corporativo'}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    R$ {(q.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-slate-500">15 dias úteis</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(q.status)}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedQuoteDetail(q)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        title="Ver Detalhes do Orçamento"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {q.status !== 'Aprovado' && (
                        <button
                          onClick={() => convertQuoteToSale(q.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-2xs text-[11px]"
                          title="Aprovar e Gerar Venda Imediata"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Gerar Venda
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Drawer de Detalhes do Orçamento */}
      {selectedQuoteDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Proposta Comercial
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {selectedQuoteDetail.code}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuoteDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400">Cliente / Empresa</span>
                <div className="font-bold text-slate-900 dark:text-white mt-0.5 text-sm">
                  {selectedQuoteDetail.customerName}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Data de Emissão</span>
                <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedQuoteDetail.date} (Validade: 15 dias)
                </div>
              </div>
            </div>

            {/* Itens do Orçamento */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Itens Orçados
              </span>
              <div className="rounded-xl border border-slate-200/80 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40 space-y-2 text-xs">
                {(selectedQuoteDetail.items || []).map((it: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800 last:border-none">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{it.productName}</div>
                      <div className="text-[11px] text-slate-400">{it.quantity} un x R$ {Number(it.unitPrice).toLocaleString('pt-BR')}</div>
                    </div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white">
                      R$ {Number(it.totalPrice || it.total || (it.unitPrice * it.quantity)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo Financeiro */}
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Proposta:</span>
              <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                R$ {Number(selectedQuoteDetail.total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Ações do Modal */}
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSelectedQuoteDetail(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Fechar
              </button>
              {selectedQuoteDetail.status !== 'Aprovado' && (
                <button
                  onClick={() => {
                    convertQuoteToSale(selectedQuoteDetail.id);
                    setSelectedQuoteDetail(null);
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Aprovar & Gerar Venda
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

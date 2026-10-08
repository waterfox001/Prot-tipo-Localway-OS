import React, { useState } from 'react';
import {
  AlertTriangle,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  Wrench,
  X,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Occurrence } from '../../types';

export const OperationsOccurrencesView: React.FC = () => {
  const { occurrences, createOccurrence, resolveOccurrence, openQuickAction } = useApp();

  const [search, setSearch] = useState('');
  const [selectedOcc, setSelectedOcc] = useState<Occurrence | null>(occurrences[0] || null);
  const [resolutionText, setResolutionText] = useState('');

  const filteredOccurrences = occurrences.filter((o) => {
    return (
      o.protocol.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.saleCode.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getPriorityBadge = (p: Occurrence['priority']) => {
    switch (p) {
      case 'Crítica':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-extrabold';
      case 'Alta':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold';
      case 'Média':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'Baixa':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getStatusBadge = (s: Occurrence['status']) => {
    switch (s) {
      case 'Resolvido':
      case 'Encerrado':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Em atendimento':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'Aguardando fornecedor':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800">
              <AlertTriangle className="w-3.5 h-3.5" />
              Central de Ocorrências & SAC
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pós-Venda, Assistências & Garantias
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Registro de avarias, reposição de peças, suporte técnico e garantias de fábrica de até 5 anos.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('ocorrencia')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Nova Ocorrência
        </button>
      </div>

      {/* Grid: Tabela de Ocorrências + Drawer Lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4">Protocolo</th>
                    <th className="py-3 px-4">Cliente</th>
                    <th className="py-3 px-4">Venda / Produto</th>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Prioridade</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredOccurrences.map((occ) => (
                    <tr
                      key={occ.id}
                      onClick={() => setSelectedOcc(occ)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {occ.protocol}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {occ.customerName}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        <span className="font-mono text-[11px] block">{occ.saleCode}</span>
                        <span className="truncate block max-w-xs">{occ.productName}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{occ.type}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${getPriorityBadge(occ.priority)}`}>
                          {occ.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(occ.status)}`}>
                          {occ.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detalhe do Chamado Selecionado */}
        <div>
          {selectedOcc ? (
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-400 text-[11px]">{selectedOcc.protocol}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(selectedOcc.status)}`}>
                    {selectedOcc.status}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  {selectedOcc.customerName}
                </h3>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Pedido: {selectedOcc.saleCode} • {selectedOcc.createdAt}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Produto / Linha</span>
                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{selectedOcc.productName}</div>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Relato da Ocorrência</span>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {selectedOcc.description}
                </div>
              </div>

              {selectedOcc.resolution && (
                <div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Resolução Homologada:
                  </span>
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300 mt-1">
                    {selectedOcc.resolution}
                  </div>
                </div>
              )}

              {selectedOcc.status !== 'Resolvido' && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="block font-bold text-slate-700 dark:text-slate-300">
                    Registrar Resolução Técnica:
                  </label>
                  <textarea
                    rows={2}
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    placeholder="Descreva a solução aplicada (ex: peça substituída, regulagem finalizada)..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                  <button
                    onClick={() => {
                      if (!resolutionText) return;
                      resolveOccurrence(selectedOcc.id, resolutionText);
                      setSelectedOcc({ ...selectedOcc, status: 'Resolvido', resolution: resolutionText });
                      setResolutionText('');
                    }}
                    className="w-full py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-2xs"
                  >
                    Concluir & Baixar Chamado
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
              Selecione uma ocorrência ao lado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

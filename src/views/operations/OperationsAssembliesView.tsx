import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Camera,
  CheckSquare,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssemblyOrder } from '../../types';
import { OperationsMetricsChart } from '../../components/charts/OperationsMetricsChart';

export const OperationsAssembliesView: React.FC = () => {
  const { assemblies, updateAssemblyStatus, toggleAssemblyChecklist } = useApp();

  const [selectedAssembly, setSelectedAssembly] = useState<AssemblyOrder | null>(assemblies[0] || null);

  const getStatusBadge = (status: AssemblyOrder['status']) => {
    switch (status) {
      case 'Concluída':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 animate-pulse';
      case 'Agendada':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Pendente de peças':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              <Wrench className="w-3.5 h-3.5" />
              Equipe Técnica de Montagem NR-17
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Ordens de Montagem & Instalação
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Agendamentos, checklist ergonômico, montadores designados e aceite do cliente.
          </p>
        </div>
      </div>

      {/* Gráfico Animado de Capacidade e Montagens */}
      <OperationsMetricsChart title="Capacidade & Cumprimento de Ordens de Montagem em Campo" />

      {/* Grid Principal: Lista de Ordens de Montagem + Painel de Detalhes / Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Coluna 1 e 2: Ordens de Montagem */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Montagens Programadas ({assemblies.length})
            </h2>
          </div>

          <div className="space-y-3">
            {assemblies.map((asm) => (
              <div
                key={asm.id}
                onClick={() => setSelectedAssembly(asm)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedAssembly?.id === asm.id
                    ? 'border-slate-900 bg-white shadow-md dark:border-white dark:bg-slate-900'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                        {asm.saleCode}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(asm.status)}`}>
                        {asm.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                      {asm.customerName}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{asm.address}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      {asm.scheduledDate}
                    </span>
                    <span className="text-[11px] text-slate-400">{asm.period}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Montador: <strong className="text-slate-800 dark:text-slate-200">{asm.assemblerName}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {asm.status === 'Agendada' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateAssemblyStatus(asm.id, 'Em andamento');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-700 shadow-2xs"
                      >
                        Iniciar Montagem
                      </button>
                    )}
                    {asm.status === 'Em andamento' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateAssemblyStatus(asm.id, 'Concluída');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 shadow-2xs"
                      >
                        Concluir & Assinar
                      </button>
                    )}
                    {asm.status === 'Concluída' && (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Termo Concluído
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna 3: Painel do Montador & Checklist */}
        <div>
          {selectedAssembly ? (
            <div className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Ordem de Serviço
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">
                  {selectedAssembly.saleCode} • {selectedAssembly.customerName}
                </h3>
              </div>

              {/* Informações da Instalação */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Técnico Responsável</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{selectedAssembly.assemblerName}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Instruções de Montagem</span>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">{selectedAssembly.notes}</div>
                </div>
              </div>

              {/* Checklist de Montagem NR-17 */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Checklist de Qualidade</span>
                  <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="space-y-1.5">
                  {selectedAssembly.checklist.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs cursor-pointer hover:bg-slate-100/70"
                    >
                      <input
                        type="checkbox"
                        checked={c.checked}
                        onChange={() => toggleAssemblyChecklist(selectedAssembly.id, c.id)}
                        className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className={`text-slate-800 dark:text-slate-200 ${c.checked ? 'line-through opacity-70' : ''}`}>
                        {c.item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Aceite do Cliente */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900 text-xs space-y-1.5">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Garantia & Aceite Digital
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400 leading-snug">
                  Mobiliário em perfeito funcionamento e em conformidade ergonômica com a NR-17.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
              Selecione uma ordem de montagem ao lado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

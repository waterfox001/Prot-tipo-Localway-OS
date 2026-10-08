import React, { useState } from 'react';
import {
  Kanban as KanbanIcon,
  Plus,
  DollarSign,
  TrendingUp,
  Percent,
  User,
  Calendar,
  Building,
  ArrowRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PipelineStage, Deal } from '../types';
import { SectionHeader, StatCard } from '../components/common/UIComponents';

const stagesConfig: Array<{ id: PipelineStage; label: string; prob: number }> = [
  { id: 'lead', label: '1. Novo Lead', prob: 10 },
  { id: 'qualificacao', label: '2. Qualificação', prob: 20 },
  { id: 'contato', label: '3. Contato Feito', prob: 30 },
  { id: 'necessidade', label: '4. Necessidade', prob: 50 },
  { id: 'orcamento', label: '5. Orçamento', prob: 60 },
  { id: 'proposta', label: '6. Proposta Enviada', prob: 80 },
  { id: 'negociacao', label: '7. Negociação', prob: 90 },
  { id: 'fechado', label: '8. Fechado (Ganho)', prob: 100 },
  { id: 'perdido', label: '9. Perdido', prob: 0 },
];

export const CrmPipelineView: React.FC = () => {
  const { deals, updateDealStage, openQuickAction } = useApp();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const totalPipeline = deals
    .filter((d) => d.stage !== 'fechado' && d.stage !== 'perdido')
    .reduce((acc, d) => acc + d.value, 0);

  const weightedPipeline = deals
    .filter((d) => d.stage !== 'fechado' && d.stage !== 'perdido')
    .reduce((acc, d) => acc + d.weightedValue, 0);

  const wonDealsTotal = deals
    .filter((d) => d.stage === 'fechado')
    .reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SectionHeader
        title="CRM & Funil de Vendas Corporativas"
        subtitle="Pipeline integrado em 9 etapas desde a captura do lead até o fechamento contratual"
        actions={
          <button
            onClick={() => openQuickAction('venda')}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors shadow-2xs"
          >
            <Plus className="h-4 w-4" />
            Nova Oportunidade
          </button>
        }
      />

      {/* CRM Metric Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pipeline Total Ativo"
          value={`R$ ${totalPipeline.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          subtitle={`${deals.filter((d) => d.stage !== 'fechado' && d.stage !== 'perdido').length} oportunidades abertas`}
          change="+15.2% no mês"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          title="Pipeline Ponderado (Probabilidade)"
          value={`R$ ${weightedPipeline.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          subtitle="Valor ponderado por probabilidade real"
          change="Previsão segura"
          trend="up"
          icon={TrendingUp}
        />
        <StatCard
          title="Taxa de Conversão da Equipe"
          value="38.4%"
          subtitle="Média benchmark do segmento: 28%"
          change="+10.4% acima da média"
          trend="up"
          icon={Percent}
        />
        <StatCard
          title="Vendas Ganhas (Fechado)"
          value={`R$ ${wonDealsTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          subtitle="Contratos assinados e em produção"
          change="Meta no alvo"
          trend="up"
          icon={CheckCircle2}
        />
      </div>

      {/* Funnel Pipeline Visual Columns */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3.5 min-w-[1400px]">
          {stagesConfig.map((stage) => {
            const stageDeals = deals.filter((d) => d.stage === stage.id);
            const stageTotal = stageDeals.reduce((acc, d) => acc + d.value, 0);

            return (
              <div
                key={stage.id}
                className="w-72 shrink-0 rounded-2xl border border-slate-200/90 bg-slate-100/60 p-3.5 flex flex-col max-h-[720px] dark:border-slate-800 dark:bg-slate-900/60 shadow-2xs"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800 mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{stage.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      {stage.prob}% prob. · {stageDeals.length} itens
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      R$ {(stageTotal / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>

                {/* Stage Deals List */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => setSelectedDeal(deal)}
                      className="cursor-pointer rounded-xl border border-slate-200/80 bg-white p-3.5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 transition-all shadow-2xs group"
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {deal.title}
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <Building className="h-3 w-3 shrink-0 text-slate-400" />
                        <span className="truncate">{deal.customerName}</span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-xs">
                        <span className="font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                          R$ {deal.value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {deal.salesperson.split(' ')[0]}
                        </span>
                      </div>

                      {/* Quick stage mover controls */}
                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">{deal.source}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = stagesConfig.findIndex((s) => s.id === deal.stage);
                            if (currentIndex < stagesConfig.length - 2) {
                              updateDealStage(deal.id, stagesConfig[currentIndex + 1].id);
                            }
                          }}
                          className="rounded-md px-2 py-0.5 font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors"
                          title="Avançar etapa"
                        >
                          Avançar →
                        </button>
                      </div>
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-400 italic">
                      Nenhuma oportunidade
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Deal Detail Drawer / Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200/90 bg-white shadow-xl p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-bold font-mono dark:bg-slate-800 dark:text-slate-300">
                  Oportunidade #{selectedDeal.id}
                </span>
                <h3 className="mt-1.5 text-lg font-bold text-slate-900 dark:text-slate-100">{selectedDeal.title}</h3>
                <p className="text-xs text-slate-500">{selectedDeal.customerName}</p>
              </div>
              <button
                onClick={() => setSelectedDeal(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Valor Bruto</span>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
                  R$ {selectedDeal.value.toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Probabilidade</span>
                <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  {selectedDeal.probability}%
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Ponderado</span>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
                  R$ {selectedDeal.weightedValue.toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Fechamento</span>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                  {selectedDeal.expectedCloseDate}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 pt-2">
              <div>
                <strong className="text-slate-900 dark:text-slate-100">Produtos de Interesse:</strong>{' '}
                {selectedDeal.productsOfInterest.join(', ')}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-slate-100">Vendedor Responsável:</strong> {selectedDeal.salesperson}
              </div>
              {selectedDeal.notes && (
                <div className="rounded-xl bg-slate-50 p-3 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                  {selectedDeal.notes}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedDeal(null)}
                className="rounded-lg border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

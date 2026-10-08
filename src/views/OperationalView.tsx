import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderOperationalStatus, Order } from '../types';
import { SectionHeader } from '../components/common/UIComponents';

const operationalSteps: Array<{ id: OrderOperationalStatus; label: string; icon: any }> = [
  { id: 'venda_aprovada', label: '1. Venda Aprovada', icon: CheckCircle2 },
  { id: 'reserva_estoque', label: '2. Reserva Estoque', icon: Package },
  { id: 'separacao', label: '3. Separação', icon: Layers },
  { id: 'conferencia', label: '4. Conferência', icon: ShieldCheck },
  { id: 'expedicao', label: '5. Expedição', icon: Clock },
  { id: 'transporte', label: '6. Em Transporte', icon: Truck },
  { id: 'entrega', label: '7. Entrega Realizada', icon: CheckCircle2 },
  { id: 'montagem', label: '8. Montagem Técnica', icon: Wrench },
  { id: 'instalacao', label: '9. Instalação NR-17', icon: Wrench },
  { id: 'finalizado', label: '10. Finalização & SLA', icon: CheckCircle2 },
];

export const OperationalView: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0]);

  const activeOrders = orders.filter((o) => o.operationalStatus !== 'finalizado');

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Ordens de Serviço, Montagem & Engenharia de Operações"
        subtitle="Fluxo operacional ponta a ponta: da reserva de estoque até a vistoria de ergonomia no cliente"
      />

      {/* 10-Step Interactive Visual Flow Tracker */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500/10 text-amber-400 font-mono text-xs px-2 py-0.5 font-bold">
                OS: {selectedOrder.code}
              </span>
              <h3 className="text-base font-bold text-slate-100">{selectedOrder.customerName}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Local: {selectedOrder.customerAddress} · Previsão: {selectedOrder.deliveryEstimate}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Progresso:</span>
            <span className="text-base font-black text-amber-400 font-mono tabular-nums">
              {selectedOrder.progressPercent}%
            </span>
          </div>
        </div>

        {/* 10 Step Progress Bar */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center gap-2 min-w-[950px]">
            {operationalSteps.map((step, idx) => {
              const currentStepIdx = operationalSteps.findIndex(
                (s) => s.id === selectedOrder.operationalStatus
              );
              const isPast = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <button
                  key={step.id}
                  onClick={() => updateOrderStatus(selectedOrder.id, step.id)}
                  className={`flex-1 rounded-xl p-3 border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/10'
                      : isPast
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-800 bg-slate-950/60 text-slate-500 hover:border-slate-700'
                  }`}
                  title="Clique para avançar/retroceder status"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold">Passo {idx + 1}</span>
                    {isPast && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                  </div>
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isCurrent ? 'text-amber-400' : isPast ? 'text-slate-200' : 'text-slate-500'
                    }`}
                  >
                    {step.label.split('. ')[1]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Details & Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-300">Equipes & Recursos Alocados</div>
            <div className="text-slate-400">Motorista: <strong className="text-slate-200">{selectedOrder.driver || 'Claudio Silveira'}</strong></div>
            <div className="text-slate-400">Veículo: <strong className="text-slate-200">{selectedOrder.vehicle || 'Mercedes Accelo 1016'}</strong></div>
            <div className="text-slate-400">Montagem: <strong className="text-slate-200">{selectedOrder.assemblyTeam || 'Equipe Alpha (Líder: Rogério)'}</strong></div>
            <div className="text-slate-400 font-mono">Rastreio: <strong className="text-amber-400">{selectedOrder.trackingCode}</strong></div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-300">Checklist Operacional de Qualidade</div>
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 text-amber-500" />
              <span>Conferência de lote de parafusos e chaves Allen</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 text-amber-500" />
              <span>Proteção de cantoneiras nas estações de trabalho</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 text-amber-500" />
              <span>Vistoria e teste ergonômico de pistões das cadeiras</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="rounded border-slate-700 text-amber-500" />
              <span>Termo de Entrega e Canhoto assinado pelo cliente</span>
            </label>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-300">Itens Desta Carga ({selectedOrder.itemsCount} un.)</div>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-300">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="truncate max-w-[160px]">{it.productName}</span>
                    <span className="text-amber-400 font-bold">{it.quantity} un.</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400 font-mono text-sm">
              <span>Total da OS:</span>
              <span>R$ {selectedOrder.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Todas as Ordens Operacionais em Fila ({orders.length})
        </div>

        <div className="space-y-2">
          {orders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => setSelectedOrder(ord)}
              className={`cursor-pointer rounded-lg border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
                selectedOrder.id === ord.id
                  ? 'border-amber-500 bg-slate-900'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="font-bold text-slate-100 flex items-center gap-2">
                  <span>Pedido {ord.code}</span>
                  <span className="text-slate-500">·</span>
                  <span>{ord.customerName}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Previsão: {ord.deliveryEstimate} · {ord.itemsCount} itens
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
                  R$ {ord.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="rounded px-2 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono capitalize">
                  {ord.operationalStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  FileCheck,
  Navigation,
  AlertCircle,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Delivery } from '../../types';
import { OperationsMetricsChart } from '../../components/charts/OperationsMetricsChart';

export const OperationsDeliveriesView: React.FC = () => {
  const { deliveries, updateDeliveryStatus, openQuickAction } = useApp();

  const [search, setSearch] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(deliveries[0] || null);

  const filteredDeliveries = deliveries.filter((d) => {
    return (
      d.customerName.toLowerCase().includes(search.toLowerCase()) ||
      d.orderCode.toLowerCase().includes(search.toLowerCase()) ||
      d.driver.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStatusBadge = (status: Delivery['status']) => {
    switch (status) {
      case 'Entregue':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Em rota':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 animate-pulse';
      case 'Separando':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Preparando':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
              <Truck className="w-3.5 h-3.5" />
              Central de Entregas & Logística
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Rotas & Despacho de Mercadorias
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Monitoramento de veículos, horários programados (manhã/tarde) e comprovante de entrega digital.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('entrega')}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Agendar Entrega
        </button>
      </div>

      {/* Grid de 3 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Rotas em Andamento Hoje</span>
          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            {deliveries.filter((d) => d.status === 'Em rota').length} veículos em rota
          </div>
          <div className="text-xs text-cyan-700 dark:text-cyan-400 font-semibold mt-1">
            Frota Polo Móveis rastreada
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Entregas Finalizadas</span>
          <div className="text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 mt-1">
            {deliveries.filter((d) => d.status === 'Entregue').length} finalizadas com sucesso
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            100% comprovantes assinados
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Índice de Pontualidade</span>
          <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            98.5% no prazo
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            SLA de entrega atendido
          </div>
        </div>
      </div>

      {/* Gráfico Operacional de Despacho & SLA de Entregas */}
      <OperationsMetricsChart title="Capacidade & Cumprimento de Entregas da Frota" />

      {/* Tabela de Entregas & Ações de Rota */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Pedido</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Endereço de Destino</th>
                <th className="py-3 px-4">Motorista & Veículo</th>
                <th className="py-3 px-4">Horário Estimado</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredDeliveries.map((del) => (
                <tr key={del.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {del.orderCode}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {del.customerName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {del.address}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    <span className="font-semibold">{del.driver}</span>
                    <span className="text-[11px] text-slate-400 block">{del.vehicle} ({del.plate})</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {del.departureTime} → {del.estimatedArrival}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(del.status)}`}>
                      {del.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {del.status === 'Preparando' && (
                        <button
                          onClick={() => updateDeliveryStatus(del.id, 'Em rota')}
                          className="px-2 py-1 rounded-lg bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-700 shadow-2xs"
                        >
                          Iniciar Rota
                        </button>
                      )}
                      {del.status === 'Em rota' && (
                        <button
                          onClick={() => updateDeliveryStatus(del.id, 'Entregue')}
                          className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 shadow-2xs"
                        >
                          Confirmar Entrega
                        </button>
                      )}
                      {del.status === 'Entregue' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Comprovante OK
                        </span>
                      )}
                    </div>
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

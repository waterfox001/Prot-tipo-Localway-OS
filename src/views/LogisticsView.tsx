import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  FileCheck,
  ShieldCheck,
  Phone,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Delivery } from '../types';
import { SectionHeader, StatCard } from '../components/common/UIComponents';

export const LogisticsView: React.FC = () => {
  const { deliveries } = useApp();
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery>(deliveries[0]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SectionHeader
        title="Logística, Frota & Rastreamento em Tempo Real"
        subtitle="Monitoramento geolocalizado de veículos, status de despacho, roteirização e comprovante digital de entrega"
      />

      {/* Logistics KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Frotas em Rota Hoje"
          value="3 veículos"
          subtitle="São Paulo & Região Metropolitana"
          change="100% frota ativa"
          trend="up"
          icon={Truck}
        />
        <StatCard
          title="Entregas Concluídas"
          value="1 finalizada"
          subtitle="Comprovante digital anexado"
          change="No prazo (11h15)"
          trend="up"
          icon={CheckCircle2}
        />
        <StatCard
          title="SLA de Pontualidade"
          value="98.5%"
          subtitle="Janelas de descarga respeitadas"
          change="+1.5% no mês"
          trend="up"
          icon={Clock}
        />
        <StatCard
          title="Carga em Trânsito"
          value="R$ 112.650"
          subtitle="Valor assegurado pela apólice Polo"
          change="Rastreio GPS Ativo"
          trend="up"
          icon={ShieldCheck}
        />
      </div>

      {/* Live Map & Active Route Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Deliveries Queue */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Cargas & Romaneios do Dia ({deliveries.length})
          </div>

          <div className="space-y-3">
            {deliveries.map((del) => {
              const isSelected = selectedDelivery.id === del.id;

              return (
                <div
                  key={del.id}
                  onClick={() => setSelectedDelivery(del)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all shadow-2xs ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900/10 dark:border-amber-500 dark:bg-slate-800'
                      : 'border-slate-200/90 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
                      Carga {del.orderCode}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        del.status === 'Entregue'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-800 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}
                    >
                      {del.status}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{del.customerName}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{del.address}</div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-xs">
                    <span className="text-slate-500">Motorista: {del.driver.split(' ')[0]}</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">Previsão: {del.estimatedArrival}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* GPS Map Display & Delivery Sheet */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 space-y-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-slate-700 dark:text-amber-400" />
                  Rastreamento Satelital — Pedido {selectedDelivery.orderCode}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Veículo: {selectedDelivery.vehicle} · Placa: {selectedDelivery.plate}
                </p>
              </div>

              <div className="text-right">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  {selectedDelivery.status}
                </span>
              </div>
            </div>

            {/* Stylized Modern Vector Map */}
            <div className="relative h-64 w-full rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center dark:bg-slate-950 dark:border-slate-800">
              {/* Map grid lines simulation */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Vector Highway Roads */}
              <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 40 180 Q 150 90, 280 140 T 480 80"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="8"
                />
                <path
                  d="M 40 180 Q 150 90, 280 140 T 480 80"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                />
              </svg>

              {/* Origin Point: Centro de Distribuição Cajamar */}
              <div className="absolute left-8 bottom-12 flex items-center gap-2 bg-white/95 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] shadow-sm dark:bg-slate-900 dark:border-slate-700">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">CD Polo Móveis (Origem)</span>
              </div>

              {/* Moving Truck GPS Marker */}
              <div className="absolute left-[54%] top-[45%] flex flex-col items-center animate-bounce">
                <div className="rounded-full bg-slate-900 p-2 shadow-lg text-white dark:bg-amber-500 dark:text-slate-950">
                  <Truck className="h-4 w-4" />
                </div>
                <div className="mt-1 rounded bg-white/95 border border-slate-300 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-800 whitespace-nowrap shadow-sm dark:bg-slate-900 dark:border-amber-500/50 dark:text-amber-400">
                  Em rota (Av. Rebouças)
                </div>
              </div>

              {/* Destination Point: Faria Lima */}
              <div className="absolute right-8 top-12 flex items-center gap-2 bg-white/95 border border-emerald-200 rounded-lg px-2.5 py-1 text-[11px] shadow-sm dark:bg-slate-900 dark:border-emerald-800">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">{selectedDelivery.customerName}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Montagem Proof Details */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">Motorista Responsável</div>
              <div className="text-slate-700 dark:text-slate-300">{selectedDelivery.driver}</div>
              <div className="text-[11px] text-slate-500">Saída da doca: {selectedDelivery.departureTime}</div>
            </div>

            <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 dark:bg-slate-800/40 dark:border-slate-800 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">Comprovante Digital (POD)</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <FileCheck className="h-4 w-4" />
                {selectedDelivery.podReceived ? 'Canhoto Assinado Digitalmente' : 'Aguardando Assinatura na Entrega'}
              </div>
              <div className="text-[11px] text-slate-500">Montagem: {selectedDelivery.assemblyRequired ? 'Sim (Inclusa)' : 'Não'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

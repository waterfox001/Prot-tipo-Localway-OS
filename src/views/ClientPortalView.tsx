import React from 'react';
import {
  ExternalLink,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  FileText,
  Phone,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';

export const ClientPortalView: React.FC = () => {
  const { orders, setActiveView } = useApp();
  const currentOrder = orders[0]; // Pedido #1048 (Studio Alpha)

  const portalSteps = [
    { label: 'Pedido Confirmado', date: '02/10 09:15', done: true },
    { label: 'Pagamento Faturado Aprovado', date: '02/10 10:30', done: true },
    { label: 'Separação no Centro de Distribuição', date: '03/10 14:00', done: true },
    { label: 'Conferência de Qualidade & Embalagem', date: '04/10 11:20', done: true },
    { label: 'Em Transporte com Frota Dedicada', date: 'Hoje às 13:15', active: true, done: false },
    { label: 'Entrega & Montagem no Local', date: 'Previsão: Hoje às 14:20', done: false },
    { label: 'Vistoria Ergonômica NR-17 & Finalização', date: 'Aguardando', done: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-sky-500/20 p-2 text-sky-400">
            <ExternalLink className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">
              Ambiente de Simulação do Portal do Cliente B2B
            </h2>
            <p className="text-xs text-slate-400">
              Esta é a tela exatamente como seu cliente corporativo (ex: Studio Alpha Arquitetura) visualiza seus pedidos e documentos.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-sky-400 font-mono bg-sky-500/20 px-2.5 py-1 rounded">
          Visão Cliente Ativa
        </span>
      </div>

      {/* Main Order Tracker Panel */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                Pedido {currentOrder.code}
              </span>
              <span className="text-xs font-mono text-slate-400">Rastreio: {currentOrder.trackingCode}</span>
            </div>
            <h3 className="text-lg font-black text-slate-100 mt-1">
              Acompanhamento de Fabricação, Entrega & Montagem
            </h3>
            <p className="text-xs text-slate-400">
              Destino: {currentOrder.customerAddress}
            </p>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-bold uppercase text-slate-400">Previsão de Conclusão</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">{currentOrder.deliveryEstimate}</div>
          </div>
        </div>

        {/* Live Step Tracker Flow */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Status Geral do Pedido:</span>
            <span className="font-mono font-bold text-amber-400">{currentOrder.progressPercent}% Concluído</span>
          </div>

          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${currentOrder.progressPercent}%` }}
            />
          </div>

          {/* Timeline Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
            {portalSteps.map((step, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-3 border text-center transition-all ${
                  step.active
                    ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/10 animate-pulse'
                    : step.done
                    ? 'border-emerald-500/30 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-950 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-center mb-1.5">
                  {step.done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : step.active ? (
                    <Truck className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-slate-600" />
                  )}
                </div>
                <div
                  className={`text-[11px] font-bold leading-tight ${
                    step.active ? 'text-amber-300' : step.done ? 'text-slate-200' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </div>
                <div className="mt-1 text-[9px] text-slate-400 font-mono">{step.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Items List in Order */}
        <div className="border-t border-slate-800 pt-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Mobiliário Incluído neste Pedido ({currentOrder.itemsCount} volumes)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentOrder.items.map((it, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200">{it.productName}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Garantia Polo 5 anos ativa</div>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{it.quantity} un.</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions bar for Client */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Download da 2ª via da Nota Fiscal Eletrônica e Boleto realizado com sucesso!')}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              <FileText className="h-3.5 w-3.5" />
              Baixar 2ª Via Danfe NF-e & Boleto
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('ecommerce')}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              Comprar Novamente / Novos Ambientes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

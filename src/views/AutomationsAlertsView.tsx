import React, { useState } from 'react';
import {
  Cpu,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sliders,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';

export const AutomationsAlertsView: React.FC = () => {
  const { alerts, resolveAlert, setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<'alertas' | 'regras'>('alertas');

  const automationRules = [
    {
      id: 'reg-01',
      name: 'Fluxo 360: Venda Aprovada → Operações',
      trigger: 'Venda Formalizada no CRM ou E-commerce',
      actions: [
        'Reserva imediata de estoque das peças físicas',
        'Geração da Ordem de Serviço de Separação',
        'Criação dos títulos no Contas a Receber (30/60DD)',
        'Geração do código de rastreamento com envio de SMS/WhatsApp ao cliente',
      ],
      active: true,
    },
    {
      id: 'reg-02',
      name: 'Sentinela de Ponto de Pedido (Estoque Baixo)',
      trigger: 'Estoque disponível <= Estoque mínimo de segurança',
      actions: [
        'Disparo de alerta crítico na Central de Comando',
        'Sugestão automática de cotação com os 3 fornecedores homologados',
        'Criação de tarefa no Kanban de Compras',
      ],
      active: true,
    },
    {
      id: 'reg-03',
      name: 'Reativação de Contas Corporativas (>120 dias)',
      trigger: 'Cliente sem nova compra há mais de 120 dias corridos',
      actions: [
        'Mudança de status da conta para "Oportunidade Reativação"',
        'Criação de tarefa para o consultor de vendas responsável',
        'Envio de catálogo com novidades de ergonomia',
      ],
      active: true,
    },
    {
      id: 'reg-04',
      name: 'Régua de Cobrança Amigável de Inadimplência',
      trigger: 'Boleto faturado com 5 dias de atraso',
      actions: [
        'Disparo de notificação via WhatsApp com chave PIX e 2ª via atualizada',
        'Alerta no painel do Controller Financeiro',
      ],
      active: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Central de Alertas & Motor de Automações"
        subtitle="Regras de negócios ativas, disparos de eventos 360° e monitoramento de anomalias operacionais"
        actions={
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-1">
            <button
              onClick={() => setActiveTab('alertas')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                activeTab === 'alertas' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Alertas Ativos ({alerts.filter((a: any) => !a.resolved).length})
            </button>
            <button
              onClick={() => setActiveTab('regras')}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                activeTab === 'regras' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Regras de Automação (4 Ativas)
            </button>
          </div>
        }
      />

      {activeTab === 'alertas' && (
        <div className="space-y-3">
          {alerts.map((alt: any) => (
            <div
              key={alt.id}
              className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                alt.resolved
                  ? 'border-slate-800 bg-slate-950/40 opacity-50'
                  : alt.priority === 'Crítico'
                  ? 'border-rose-500/40 bg-rose-500/5'
                  : alt.priority === 'Alto'
                  ? 'border-amber-500/40 bg-amber-500/5'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg mt-0.5 ${
                    alt.priority === 'Crítico'
                      ? 'bg-rose-500/20 text-rose-400'
                      : alt.priority === 'Alto'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-slate-400">
                      {alt.category} · {alt.priority}
                    </span>
                    <span className="text-[10px] text-slate-500">({alt.createdAt})</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 mt-0.5">{alt.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-2xl">{alt.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {!alt.resolved ? (
                  <>
                    <button
                      onClick={() => resolveAlert(alt.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                    >
                      Marcar Resolvido
                    </button>
                    <button
                      onClick={() => setActiveView(alt.actionView)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-xs font-bold text-slate-950 hover:bg-amber-400"
                    >
                      <span>{alt.actionLabel}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Resolvido
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'regras' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {automationRules.map((rule) => (
            <div
              key={rule.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 shadow-md"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <h4 className="text-xs font-bold text-slate-100">{rule.name}</h4>
                </div>
                <span className="rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 font-bold">
                  Ativo
                </span>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Gatilho (Trigger)</div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono">
                  {rule.trigger}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Ações Encadeadas (Pipeline 360°)</div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {rule.actions.map((act, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

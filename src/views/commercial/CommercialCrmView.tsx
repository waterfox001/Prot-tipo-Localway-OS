import React, { useState } from 'react';
import {
  Target,
  Plus,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Building,
  User,
  DollarSign,
  Calendar,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FunnelConversionChart } from '../../components/charts/FunnelConversionChart';

type CrmStage =
  | 'novo_lead'
  | 'em_atendimento'
  | 'orcamento_enviado'
  | 'negociacao'
  | 'venda_realizada'
  | 'pos_venda';

interface CrmCard {
  id: string;
  customerName: string;
  companyName: string;
  phone: string;
  estimatedValue: number;
  stage: CrmStage;
  responsible: string;
  productInterest: string;
  lastContact: string;
}

export const CommercialCrmView: React.FC = () => {
  const { followUps, toggleFollowUp, addFollowUp, openQuickAction } = useApp();

  const [cards, setCards] = useState<CrmCard[]>([
    {
      id: 'crm-1',
      customerName: 'Maria Silva',
      companyName: 'Grupo Alpha Tech',
      phone: '(11) 99123-4455',
      estimatedValue: 48000,
      stage: 'negociacao',
      responsible: 'Carlos Mendes',
      productInterest: '25 Estações de Trabalho Prime',
      lastContact: 'Hoje 09:30',
    },
    {
      id: 'crm-2',
      customerName: 'Eduardo Fontes',
      companyName: 'Banco Horizon Capital',
      phone: '(11) 98777-2233',
      estimatedValue: 120000,
      stage: 'orcamento_enviado',
      responsible: 'Juliana Matos',
      productInterest: 'Auditório 80 Cadeiras + Sala Diretoria',
      lastContact: 'Ontem',
    },
    {
      id: 'crm-3',
      customerName: 'Carla Vasconcelos',
      companyName: 'Clínica Odonto Prime',
      phone: '(11) 97111-8899',
      estimatedValue: 18500,
      stage: 'em_atendimento',
      responsible: 'Roberto Albuquerque',
      productInterest: 'Recepção e Cadeiras de Espera',
      lastContact: 'Há 2 dias',
    },
    {
      id: 'crm-4',
      customerName: 'Lucas Bernardes',
      companyName: 'Startup Nexo Hub',
      phone: '(11) 99888-0011',
      estimatedValue: 65000,
      stage: 'novo_lead',
      responsible: 'Carlos Mendes',
      productInterest: 'Mobiliário Completo Andar Corporativo',
      lastContact: 'Hoje 11:00',
    },
    {
      id: 'crm-5',
      customerName: 'Banco Zenith de Investimentos',
      companyName: 'Banco Zenith',
      phone: '(11) 3290-8800',
      estimatedValue: 67640,
      stage: 'venda_realizada',
      responsible: 'Carlos Mendes',
      productInterest: '40 Cadeiras Presidente Vertex',
      lastContact: 'Venda Concluída',
    },
    {
      id: 'crm-6',
      customerName: 'Studio Alpha Arquitetura',
      companyName: 'Studio Alpha',
      phone: '(11) 98844-1200',
      estimatedValue: 38454,
      stage: 'pos_venda',
      responsible: 'Juliana Matos',
      productInterest: 'Garantia e montagem em rota',
      lastContact: 'Acompanhamento',
    },
  ]);

  const [newFollowUpTitle, setNewFollowUpTitle] = useState('');
  const [newFollowUpTime, setNewFollowUpTime] = useState('10:00');

  const stages: Array<{ id: CrmStage; title: string; color: string }> = [
    { id: 'novo_lead', title: '1. Novo Lead', color: 'border-slate-300 dark:border-slate-700' },
    { id: 'em_atendimento', title: '2. Em Atendimento', color: 'border-blue-400' },
    { id: 'orcamento_enviado', title: '3. Orçamento Enviado', color: 'border-indigo-400' },
    { id: 'negociacao', title: '4. Negociação', color: 'border-amber-400' },
    { id: 'venda_realizada', title: '5. Venda Realizada', color: 'border-emerald-400' },
    { id: 'pos_venda', title: '6. Pós-Venda', color: 'border-purple-400' },
  ];

  const moveCard = (cardId: string, direction: 'next' | 'prev') => {
    const stageOrder: CrmStage[] = [
      'novo_lead',
      'em_atendimento',
      'orcamento_enviado',
      'negociacao',
      'venda_realizada',
      'pos_venda',
    ];

    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const currentIdx = stageOrder.indexOf(c.stage);
          const nextIdx = direction === 'next' ? currentIdx + 1 : currentIdx - 1;
          if (nextIdx >= 0 && nextIdx < stageOrder.length) {
            return { ...c, stage: stageOrder[nextIdx] };
          }
        }
        return c;
      })
    );
  };

  const handleAddFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowUpTitle) return;
    addFollowUp({
      title: newFollowUpTitle,
      dueTime: newFollowUpTime,
      dueDate: 'Amanhã',
      customerName: 'Cliente Follow-up',
    });
    setNewFollowUpTitle('');
  };

  const cleanPhone = (p: string) => p.replace(/\D/g, '');

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
              <Target className="w-3.5 h-3.5" />
              Pipeline & Follow-ups
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            CRM & Follow-up de Vendas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Acompanhe o avanço dos negócios e nunca perca um retorno comercial importante.
          </p>
        </div>

        <button
          onClick={() => openQuickAction('venda')}
          className="inline-flex items-center gap-1.5 rounded bg-orange-600 hover:bg-orange-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          Nova Negociação
        </button>
      </div>

      {/* SEÇÃO DE TAREFAS / FOLLOW-UPS DO DIA */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Tarefas de Follow-up Agendadas
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Retornos comerciais e confirmações operacionais
            </span>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 px-2.5 py-0.5 rounded-full">
            {followUps.filter((f) => f.status === 'Pendente').length} pendentes
          </span>
        </div>

        {/* Lista de Follow-ups */}
        <div className="space-y-2">
          {followUps.map((fup) => (
            <div
              key={fup.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl border transition-all ${
                fup.status === 'Concluído'
                  ? 'bg-slate-50 border-slate-200/60 opacity-60 dark:bg-slate-900 dark:border-slate-800'
                  : 'bg-white border-slate-200/90 shadow-2xs dark:bg-slate-800/40 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={fup.status === 'Concluído'}
                  onChange={() => toggleFollowUp(fup.id)}
                  className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                />
                <div>
                  <div className={`text-xs font-bold text-slate-900 dark:text-white ${fup.status === 'Concluído' ? 'line-through' : ''}`}>
                    {fup.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {fup.customerName} • Responsável: <span className="font-semibold text-slate-700 dark:text-slate-300">{fup.assignedTo}</span>
                    {fup.notes && ` • "${fup.notes}"`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                  {fup.dueDate} às {fup.dueTime}
                </span>
                {fup.customerPhone && (
                  <a
                    href={`https://wa.me/55${cleanPhone(fup.customerPhone)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                    title="Chamar no WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Adicionar Follow-up Rápido */}
        <form onSubmit={handleAddFollowUp} className="flex gap-2 pt-1">
          <input
            type="text"
            value={newFollowUpTitle}
            onChange={(e) => setNewFollowUpTitle(e.target.value)}
            placeholder="Ex: Retornar para Maria amanhã às 10:00 sobre amostras de tecido..."
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
          />
          <input
            type="time"
            value={newFollowUpTime}
            onChange={(e) => setNewFollowUpTime(e.target.value)}
            className="px-2 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800"
          >
            Agendar
          </button>
        </form>
      </div>

      {/* Gráfico Animado de Conversão do Funil */}
      <FunnelConversionChart title="Taxa de Conversão & Passagem de Fases do Pipeline" />

      {/* QUADRO KANBAN COM OS 6 ESTÁGIOS */}
      <div className="space-y-2">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
          Funil de Atendimento da Loja
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {stages.map((stage) => {
            const stageCards = cards.filter((c) => c.stage === stage.id);
            const totalStageValue = stageCards.reduce((acc, c) => acc + c.estimatedValue, 0);

            return (
              <div
                key={stage.id}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-950/30 flex flex-col justify-between min-h-[400px]"
              >
                <div>
                  {/* Cabeçalho da Coluna */}
                  <div className={`border-t-2 pt-2 pb-2 mb-2 ${stage.color}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {stage.title}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        {stageCards.length}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 font-semibold mt-0.5">
                      R$ {(totalStageValue / 1000).toFixed(0)}k total
                    </div>
                  </div>

                  {/* Cards na Coluna */}
                  <div className="space-y-2.5">
                    {stageCards.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 transition-all text-xs space-y-2"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white leading-tight">
                            {c.customerName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">{c.companyName}</div>
                        </div>

                        <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                          {c.productInterest}
                        </div>

                        <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-800">
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            R$ {(c.estimatedValue / 1000).toFixed(1)}k
                          </span>
                          <span className="text-[10px] text-slate-400">{c.responsible}</span>
                        </div>

                        {/* Botões de Mover Estágio */}
                        <div className="flex justify-between items-center pt-1">
                          <button
                            onClick={() => moveCard(c.id, 'prev')}
                            disabled={c.stage === 'novo_lead'}
                            className="text-[10px] font-semibold text-slate-400 hover:text-slate-700 disabled:opacity-20"
                          >
                            ← Voltar
                          </button>
                          <button
                            onClick={() => moveCard(c.id, 'next')}
                            disabled={c.stage === 'pos_venda'}
                            className="text-[10px] font-bold text-slate-900 hover:underline dark:text-white disabled:opacity-20"
                          >
                            Avançar →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openQuickAction('venda')}
                  className="w-full mt-3 py-1.5 rounded-xl border border-dashed border-slate-300 text-[11px] font-semibold text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900 transition-colors"
                >
                  + Adicionar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

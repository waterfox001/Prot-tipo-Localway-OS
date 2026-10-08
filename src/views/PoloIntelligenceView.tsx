import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Boxes,
  Users,
  DollarSign,
  Truck,
  ArrowRight,
  BrainCircuit,
  Lightbulb,
  FileSpreadsheet,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';
import { RevenueAreaChart } from '../components/charts/RevenueAreaChart';
import { CashFlowChart } from '../components/charts/CashFlowChart';

export const PoloIntelligenceView: React.FC = () => {
  const { setActiveView } = useApp();
  const [activeTab, setActiveTab] = useState<'insights' | 'dre' | 'forecast'>('insights');

  const intelligenceCards = [
    {
      type: 'Oportunidade',
      category: 'Comercial & Demanda',
      title: '12 produtos corporativos apresentam aumento de 32% na demanda',
      description: 'A procura por Cadeiras Presidente Vertex e Estações Prime cresceu consideravelmente no segmento de Startups e Coworking neste trimestre.',
      impact: 'Potencial de +R$ 95.000 em vendas adicionais se mantido estoque adequado.',
      actionText: 'Ver Linha em Alta',
      actionView: 'products' as const,
      color: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
    },
    {
      type: 'Estoque Crítico',
      category: 'Suprimentos & Logística',
      title: '8 produtos estão no ponto de pedido ou próximos do estoque mínimo',
      description: 'Cadeira Aero Pro e Gaveteiro Volante possuem menos de 10 dias de cobertura com os pedidos em negociação no pipeline.',
      impact: 'Risco de perda de pedidos por prazo de entrega prolongado.',
      actionText: 'Emitir Pedido de Compra',
      actionView: 'inventory' as const,
      color: 'border-red-500/30 bg-red-500/5 text-red-400',
    },
    {
      type: 'Financeiro',
      category: 'Fluxo de Caixa',
      title: 'Contas a receber dos próximos 15 dias totalizam R$ 184.225,00',
      description: 'Entradas concentradas com pontualidade média de 98%. Apenas 1 cliente corporativo em atraso (Clínica Morumbi R$ 8.400).',
      impact: 'Liquidez operacional suficiente para antecipar compras de matéria-prima com 6% de desconto.',
      actionText: 'Ver Contas a Receber',
      actionView: 'finance' as const,
      color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
    },
    {
      type: 'Performance Comercial',
      category: 'Equipe de Vendas',
      title: 'Seu consultor João Pedro está 18% acima da média da equipe',
      description: 'Com taxa de conversão de 44% e foco em vendas corporativas de alto ticket para escritórios de arquitetura e fundos de investimento.',
      impact: 'R$ 268.900 faturados no mês. Modelo de abordagem pronto para replicação.',
      actionText: 'Ver Ranking Vendedores',
      actionView: 'rankings' as const,
      color: 'border-sky-500/30 bg-sky-500/5 text-sky-400',
    },
    {
      type: 'Capital Imobilizado',
      category: 'Estoque Parado',
      title: '23 produtos estão parados há mais de 90 dias no armazém',
      description: 'Maior concentração em arquivos de aço pesados e estantes tradicionais. Capital parado estimado em R$ 41.800,00.',
      impact: 'Recomendação: Aplicar combo promocional de 15% de desconto em kits corporativos.',
      actionText: 'Analisar Estoque Parado',
      actionView: 'inventory' as const,
      color: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
    },
    {
      type: 'Reativação de Carteira',
      category: 'Base de Clientes',
      title: '14 clientes corporativos não compram há mais de 120 dias',
      description: 'Empresas como Clínica Morumbi e TechHub já concluíram obras anteriores e podem necessitar de expansão ou manutenção.',
      impact: 'Geração de até R$ 80.000 em propostas de recompra com campanha de relacionamento.',
      actionText: 'Abrir Lista de Clientes',
      actionView: 'customers' as const,
      color: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
    },
    {
      type: 'Risco Operacional',
      category: 'Logística de Entregas',
      title: '3 entregas apresentam risco de atraso por restrição de janela predial',
      description: 'Edifícios corporativos na Av. Brigadeiro Faria Lima fecham docas de carga e descarga às 17h00.',
      impact: 'Equipe Alpha já notificada para priorizar descarga imediata com rota otimizada.',
      actionText: 'Rastrear Frota Agora',
      actionView: 'logistics' as const,
      color: 'border-orange-500/30 bg-orange-500/5 text-orange-400',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Polo Intelligence & DRE Gerencial"
        subtitle="Módulo de Inteligência Artificial e BI Empresarial: transformando dados em decisões assertivas"
        actions={
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-1">
            <button
              onClick={() => setActiveTab('insights')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'insights'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Insights & Oportunidades
            </button>
            <button
              onClick={() => setActiveTab('dre')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'dre'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              DRE Gerencial Cascata
            </button>
          </div>
        }
      />

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Header Alert Prompt */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-500/20 p-2 text-amber-400">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  O que merece sua atenção hoje na Polo Móveis?
                </h3>
                <p className="text-xs text-slate-400">
                  Algoritmo de inteligência empresarial cruzando dados de CRM, Estoque, Financeiro e Entregas.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/20 px-2.5 py-1 rounded">
              7 Ações Prioritárias
            </span>
          </div>

          {/* Intelligence Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {intelligenceCards.map((card, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-5 flex flex-col justify-between transition-all hover:bg-slate-900/90 ${card.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider font-mono">
                      {card.type} · {card.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 leading-snug">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300">
                    <strong className="text-amber-400">Impacto Estimado:</strong> {card.impact}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end">
                  <button
                    onClick={() => setActiveView(card.actionView)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-100 hover:text-amber-400 transition-colors"
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'dre' && (
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              DRE Gerencial Consolidado (Demonstrativo de Resultado do Exercício)
            </h3>
            <p className="text-xs text-slate-400">
              Visão contábil e de controladoria da Polo Móveis — Mês Atual (Outubro / 2026)
            </p>
          </div>

          {/* DRE Waterfall Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs">
            <div className="grid grid-cols-12 bg-slate-900/80 p-3 font-semibold text-slate-300 border-b border-slate-800">
              <div className="col-span-7">Estrutura de Contas Gerenciais</div>
              <div className="col-span-3 text-right">Valor Realizado (R$)</div>
              <div className="col-span-2 text-right">% Receita</div>
            </div>

            <div className="divide-y divide-slate-800/60">
              {/* Receita Bruta */}
              <div className="grid grid-cols-12 p-3 font-bold text-slate-100 bg-slate-900/30">
                <div className="col-span-7">(+) Receita Bruta de Vendas (Mobiliário Corporativo)</div>
                <div className="col-span-3 text-right font-mono tabular-nums text-emerald-400">R$ 684.500,00</div>
                <div className="col-span-2 text-right font-mono text-slate-400">100.0%</div>
              </div>

              {/* Deduções */}
              <div className="grid grid-cols-12 p-3 text-slate-400">
                <div className="col-span-7 pl-4">(-) Impostos sobre Vendas (ICMS/PIS/COFINS) & Devoluções</div>
                <div className="col-span-3 text-right font-mono tabular-nums text-rose-400">- R$ 68.450,00</div>
                <div className="col-span-2 text-right font-mono text-slate-400">10.0%</div>
              </div>

              {/* Receita Líquida */}
              <div className="grid grid-cols-12 p-3 font-bold text-slate-200 bg-slate-900/40">
                <div className="col-span-7">(=) Receita Operacional Líquida</div>
                <div className="col-span-3 text-right font-mono tabular-nums text-slate-100">R$ 616.050,00</div>
                <div className="col-span-2 text-right font-mono text-slate-400">90.0%</div>
              </div>

              {/* CMV */}
              <div className="grid grid-cols-12 p-3 text-slate-400">
                <div className="col-span-7 pl-4">(-) Custo das Mercadorias Vendidas (CMV Fornecedores & Matéria-Prima)</div>
                <div className="col-span-3 text-right font-mono tabular-nums text-rose-400">- R$ 298.500,00</div>
                <div className="col-span-2 text-right font-mono text-slate-400">43.6%</div>
              </div>

              {/* Margem Contribuição */}
              <div className="grid grid-cols-12 p-3 font-bold text-amber-400 bg-amber-500/10">
                <div className="col-span-7">(=) Margem de Contribuição Bruta</div>
                <div className="col-span-3 text-right font-mono tabular-nums">R$ 317.550,00</div>
                <div className="col-span-2 text-right font-mono">51.5%</div>
              </div>

              {/* Despesas Operacionais */}
              <div className="grid grid-cols-12 p-3 text-slate-400">
                <div className="col-span-7 pl-4">(-) Despesas Comerciais, Comissões e Marketing</div>
                <div className="col-span-3 text-right font-mono tabular-nums text-rose-400">- R$ 54.760,00</div>
                <div className="col-span-2 text-right font-mono text-slate-400">8.0%</div>
              </div>

              <div className="grid grid-cols-12 p-3 text-slate-400">
                <div className="col-span-7 pl-4">(-) Despesas Administrativas & Folha Geral</div>
                <div className="col-span-3 text-right font-mono tabular-nums text-rose-400">- R$ 48.000,00</div>
                <div className="col-span-2 text-right font-mono text-slate-400">7.0%</div>
              </div>

              <div className="grid grid-cols-12 p-3 text-slate-400">
                <div className="col-span-7 pl-4">(-) Despesas Logísticas e Frotas (Combustível, Pedágios, Manutenção)</div>
                <div className="col-span-3 text-right font-mono tabular-nums text-rose-400">- R$ 29.240,00</div>
                <div className="col-span-2 text-right font-mono text-slate-400">4.3%</div>
              </div>

              {/* EBITDA / Resultado Operacional */}
              <div className="grid grid-cols-12 p-3 font-black text-emerald-400 bg-emerald-500/15 text-sm">
                <div className="col-span-7">(=) Resultado Operacional Líquido (EBITDA Polo Móveis)</div>
                <div className="col-span-3 text-right font-mono tabular-nums">R$ 185.550,00</div>
                <div className="col-span-2 text-right font-mono">30.1%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'forecast' && (
        <div className="space-y-6">
          <RevenueAreaChart
            title="Projeção & Forecast de Faturamento Polo Móveis (Q4 / 2026)"
            subtitle="Modelo preditivo baseado no pipeline de negociações e ciclo médio de compras corporativas"
          />
          <CashFlowChart
            title="Previsão de Liquidez & Ponto de Equilíbrio (Break-Even)"
          />
        </div>
      )}
    </div>
  );
};

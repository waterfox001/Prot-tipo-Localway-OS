import React, { useState } from 'react';
import {
  BarChart3,
  Printer,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Boxes,
  Truck,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader } from '../components/common/UIComponents';
import { PoloLogo } from '../components/common/PoloLogo';

export const ReportsView: React.FC = () => {
  const { company, user } = useApp();
  const [selectedReport, setSelectedReport] = useState<'executivo' | 'comercial' | 'financeiro' | 'estoque'>('executivo');

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Central de Inteligência & Relatórios Corporativos"
        subtitle="Exportação de relatórios gerenciais consolidados, auditoria de balancetes e dossiê executivo"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              Imprimir Dossiê
            </button>
            <button
              onClick={() => alert('Download do relatório em formato PDF/Excel iniciado.')}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              Exportar XLS / PDF
            </button>
          </div>
        }
      />

      {/* Report Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'executivo', label: 'Relatório Executivo 1-Page (Conselho)' },
          { id: 'comercial', label: 'Relatório de Desempenho Comercial' },
          { id: 'financeiro', label: 'Relatório Contábil & DRE' },
          { id: 'estoque', label: 'Relatório de Acuracidade de Estoque' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedReport(tab.id as any)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedReport === tab.id
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RELATÓRIO EXECUTIVO 1-PAGE */}
      {selectedReport === 'executivo' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 space-y-6 shadow-2xl">
          {/* Header Dossiê com PoloLogo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <PoloLogo size="md" variant="horizontal" theme="dark" />
              <div>
                <h2 className="text-lg font-black text-slate-100 tracking-tight">
                  Relatório Executivo 360° — {company.tradeName}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Período: Outubro / 2026 · Emitido por: {user.name} ({user.roleLabel})
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs font-bold font-mono">
                Saúde Global: 87/100 (Excelente)
              </span>
            </div>
          </div>

          {/* Grid Executive Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-500">Faturamento Mês</div>
              <div className="text-xl font-black text-slate-100 font-mono tabular-nums">R$ 684.500</div>
              <div className="text-[11px] text-emerald-400">+18.4% vs mês anterior</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-500">Resultado Líquido EBITDA</div>
              <div className="text-xl font-black text-emerald-400 font-mono tabular-nums">R$ 185.550</div>
              <div className="text-[11px] text-emerald-400">30.1% sobre a receita</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-500">Capital em Estoque Ativo</div>
              <div className="text-xl font-black text-amber-400 font-mono tabular-nums">R$ 384.920</div>
              <div className="text-[11px] text-slate-400">245 unidades físicas</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-500">SLA Operação & Montagem</div>
              <div className="text-xl font-black text-sky-400 font-mono tabular-nums">96.4%</div>
              <div className="text-[11px] text-emerald-400">Zero devoluções no mês</div>
            </div>
          </div>

          {/* Executive Executive Summary Commentary */}
          <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
              Parecer da Diretoria Executiva
            </h3>
            <p>
              A <strong>Polo Móveis</strong> atinge seu melhor mês operacional do ano em 2026, impulsionada pela expansão
              de contas corporativas chave (Setor de Arquitetura Corporativa e Instituições Financeiras). O ticket médio
              atingiu R$ 29.800,00, superando a meta trimestral em 12%.
            </p>
            <p>
              O estoque da linha ergonômica (Cadeira Vertex e Ergomax) manteve giro anual de 3.4x, sem rupturas críticas.
              Recomenda-se a aceleração da desmobilização de 23 itens parados de móveis de aço via combos promocionais.
            </p>
          </div>

          {/* Signatures Footer */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-2 gap-8 text-center text-xs text-slate-400">
            <div>
              <div className="h-0.5 w-48 bg-slate-700 mx-auto mb-2" />
              <div className="font-bold text-slate-200">Marcus Glauber</div>
              <div>Diretor Geral / CEO — Polo Móveis</div>
            </div>
            <div>
              <div className="h-0.5 w-48 bg-slate-700 mx-auto mb-2" />
              <div className="font-bold text-slate-200">Carlos Eduardo Mendes</div>
              <div>Controller Geral & Finanças</div>
            </div>
          </div>
        </div>
      )}

      {selectedReport !== 'executivo' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center text-xs text-slate-400">
          Relatório detalhado pronto para geração e download automático. Clique em <strong>"Exportar XLS / PDF"</strong> acima para baixar o arquivo completo consolidado com filtros de auditoria.
        </div>
      )}
    </div>
  );
};

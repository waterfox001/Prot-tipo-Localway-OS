import React, { useState } from 'react';
import {
  FileBarChart,
  TrendingUp,
  Download,
  Calendar,
  Building2,
  DollarSign,
  ArrowRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RevenueAreaChart } from '../../components/charts/RevenueAreaChart';

export const CorporateDREView: React.FC = () => {
  const { company } = useApp();
  const [selectedMonth, setSelectedMonth] = useState('Outubro / 2026');

  // Estrutura contábil da DRE
  const dreData = [
    {
      tipo: 'receita_bruta',
      label: '(+) Receita Bruta de Vendas (Mobiliário Corporativo)',
      valor: 684500,
      perc: 108.7,
      destaque: true,
      cor: 'text-slate-900 dark:text-white font-bold',
    },
    {
      tipo: 'deducao',
      label: '(-) Deduções da Receita Bruta & Impostos (Simples/ICMS)',
      valor: -54760,
      perc: -8.7,
      cor: 'text-rose-600 dark:text-rose-400 font-medium',
    },
    {
      tipo: 'receita_liquida',
      label: '(=) Receita Operacional Líquida (ROL)',
      valor: 629740,
      perc: 100.0,
      subtotal: true,
      cor: 'text-slate-900 dark:text-white font-bold text-sm',
    },
    {
      tipo: 'cmv',
      label: '(-) Custo das Mercadorias Vendidas (CMV / Matéria-Prima)',
      valor: -277740,
      perc: -44.1,
      cor: 'text-rose-600 dark:text-rose-400 font-medium',
    },
    {
      tipo: 'lucro_bruto',
      label: '(=) Lucro Bruto Operacional (Margem de Contribuição)',
      valor: 352000,
      perc: 55.9,
      subtotal: true,
      cor: 'text-emerald-700 dark:text-emerald-400 font-bold text-sm',
    },
    {
      tipo: 'despesa_comercial',
      label: '(-) Despesas Comerciais (Comissões & Logística Própria)',
      valor: -84500,
      perc: -13.4,
      cor: 'text-rose-600 dark:text-rose-400 font-medium',
    },
    {
      tipo: 'despesa_adm',
      label: '(-) Despesas Administrativas & Custos Fixos (Galpão Cajamar, TI)',
      valor: -53700,
      perc: -8.5,
      cor: 'text-rose-600 dark:text-rose-400 font-medium',
    },
    {
      tipo: 'ebitda',
      label: '(=) EBITDA / LAJIDA (Geração Operacional de Caixa)',
      valor: 213800,
      perc: 33.9,
      subtotal: true,
      cor: 'text-blue-700 dark:text-blue-400 font-bold text-sm',
    },
    {
      tipo: 'despesa_fin',
      label: '(-) Despesas Financeiras & Depreciação de Frota/Maquinário',
      valor: -18500,
      perc: -2.9,
      cor: 'text-rose-600 dark:text-rose-400 font-medium',
    },
    {
      tipo: 'lucro_liquido',
      label: '(=) Lucro Líquido do Exercício (Disponível para Sócios)',
      valor: 195300,
      perc: 31.0,
      totalFinal: true,
      cor: 'text-emerald-700 dark:text-emerald-400 font-extrabold text-base',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <FileBarChart className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Demonstração Contábil & Gerencial
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            DRE Visual · {company.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Demonstração do Resultado do Exercício com margens percentuais e apuração de lucro líquido.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-xs"
          >
            <option>Outubro / 2026 (Atual)</option>
            <option>Setembro / 2026</option>
            <option>Agosto / 2026</option>
            <option>Acumulado 2026</option>
          </select>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* 3 Grandes Números de Síntese */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Receita Operacional Líquida
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ 629.740,00
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Base 100% da DRE (descontado Simples Nacional)
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Lucro Bruto (Margem Bruta)
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ 352.000,00
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 block">
            Margem Bruta de Contribuição: 55.9%
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Lucro Líquido Final
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400 mt-2">
            R$ 195.300,00
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 block">
            Margem Líquida Final: 31.0% do faturamento
          </span>
        </div>
      </div>

      {/* Gráfico Analítico de Rentabilidade e Margens */}
      <RevenueAreaChart
        title="Evolução da Receita Líquida & Lucro Bruto Operacional"
        subtitle="Acompanhamento contábil e apuração de margens da Polo Móveis"
      />

      {/* Tabela Estruturada da DRE */}
      <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 dark:bg-slate-800/60 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
          <span>Linha da Demonstração de Resultado</span>
          <div className="flex gap-10">
            <span className="w-32 text-right">Valor Nominal</span>
            <span className="w-20 text-right">% Rec. Líq.</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/70 text-xs sm:text-sm">
          {dreData.map((row, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 transition-colors ${
                row.totalFinal
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 font-bold'
                  : row.subtotal
                  ? 'bg-slate-50/50 dark:bg-slate-800/30 font-semibold'
                  : 'hover:bg-slate-50/30 dark:hover:bg-slate-800/20'
              }`}
            >
              <span className={`${row.cor} flex items-center gap-2`}>
                {row.totalFinal && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                {row.label}
              </span>

              <div className="flex gap-10">
                <span className={`w-32 text-right font-bold ${row.cor}`}>
                  {row.valor < 0 ? `- ` : ''}R$ {Math.abs(row.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className={`w-20 text-right font-medium text-slate-600 dark:text-slate-400`}>
                  {row.perc > 0 ? `${row.perc.toFixed(1)}%` : `${row.perc.toFixed(1)}%`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

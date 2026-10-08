import React, { useState } from 'react';
import {
  FileBarChart,
  Download,
  Calendar,
  Building2,
  TrendingUp,
  Percent,
  CheckCircle2,
  Armchair,
  Truck,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateReportsView: React.FC = () => {
  const { products, company } = useApp();
  const [reportType, setReportType] = useState<'categorias' | 'margem' | 'logistica'>('categorias');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <FileBarChart className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Inteligência de Gestão & BI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Relatórios Gerenciais da Empresa
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Análises estratégicas de rentabilidade, faturamento por categoria e custos operacionais da Polo Móveis.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex rounded-lg border border-slate-200/90 bg-white p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <button
              onClick={() => setReportType('categorias')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                reportType === 'categorias'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Por Categoria
            </button>
            <button
              onClick={() => setReportType('margem')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                reportType === 'margem'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Margem de Lucro
            </button>
            <button
              onClick={() => setReportType('logistica')}
              className={`rounded-md px-3.5 py-1.5 transition-all ${
                reportType === 'logistica'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Custos Logísticos
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Exportar
          </button>
        </div>
      </div>

      {reportType === 'categorias' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Cadeiras & Poltronas</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                R$ 314.800
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1 block">46% do faturamento</span>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Estações de Trabalho</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                R$ 218.400
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1 block">32% do faturamento</span>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Mesas de Reunião</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                R$ 96.500
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1 block">14% do faturamento</span>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Armários & Gaveteiros</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                R$ 54.800
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1 block">8% do faturamento</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Participação Percentual por Família de Produtos
            </h2>
            {[
              { cat: 'Cadeiras Ergonômicas NR-17', val: 314800, perc: 46 },
              { cat: 'Estações de Trabalho Modulares Prime', val: 218400, perc: 32 },
              { cat: 'Mesas de Reunião Diretor & Conferência', val: 96500, perc: 14 },
              { cat: 'Arquivamento, Lockers e Acessórios', val: 54800, perc: 8 },
            ].map((item) => (
              <div key={item.cat} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.cat}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    R$ {item.val.toLocaleString('pt-BR')} ({item.perc}%)
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-slate-900 dark:bg-blue-500"
                    style={{ width: `${item.perc}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reportType === 'margem' && (
        <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Margem de Lucro por Produto do Catálogo
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {products.map((prod) => (
              <div key={prod.id} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{prod.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">SKU: {prod.sku}</div>
                </div>

                <div className="flex items-center gap-8 text-right">
                  <div>
                    <span className="text-xs text-slate-500 block">Custo</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">R$ {prod.costPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Venda</span>
                    <span className="font-bold text-slate-900 dark:text-white">R$ {prod.salePrice.toFixed(2)}</span>
                  </div>
                  <div className="min-w-[80px]">
                    <span className="text-xs text-slate-500 block">Margem Líq.</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {prod.marginPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reportType === 'logistica' && (
        <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Custo Médio de Frete e Montagem por Pedido
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg bg-slate-50/70 p-4.5 border border-slate-200/70 dark:bg-slate-800/40 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Custo Médio Rota SP</span>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1.5">
                R$ 215,00 / entrega
              </div>
            </div>
            <div className="rounded-lg bg-slate-50/70 p-4.5 border border-slate-200/70 dark:bg-slate-800/40 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Diária Montador Especialista</span>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1.5">
                R$ 280,00 / montador
              </div>
            </div>
            <div className="rounded-lg bg-slate-50/70 p-4.5 border border-slate-200/70 dark:bg-slate-800/40 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Índice de Pontualidade</span>
              <div className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1.5">
                98.4%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

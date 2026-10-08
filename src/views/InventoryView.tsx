import React, { useState } from 'react';
import {
  Boxes,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  History,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SectionHeader, StatCard } from '../components/common/UIComponents';
import { CategoryDonutChart } from '../components/charts/CategoryDonutChart';

export const InventoryView: React.FC = () => {
  const { products, inventoryMovements, openQuickAction } = useApp();
  const [activeTab, setActiveTab] = useState<'posicao' | 'abc' | 'parados' | 'movimentacoes'>('posicao');
  const [filterClass, setFilterClass] = useState<'Todos' | 'A' | 'B' | 'C'>('Todos');

  const totalStockUnits = products.reduce((acc, p) => acc + p.stockCurrent, 0);
  const totalStockValue = products.reduce((acc, p) => acc + p.stockCurrent * p.costPrice, 0);
  const criticalItems = products.filter((p) => p.stockAvailable <= p.stockMin);
  const dormantItems = products.filter((p) => p.lastSoldDaysAgo >= 7);

  const filteredProducts = products.filter((p) => {
    if (filterClass === 'Todos') return true;
    return p.abcClass === filterClass;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SectionHeader
        title="Gestão de Estoque & Ativos Corporativos"
        subtitle="Monitoramento de inventário físico, reservas para ordens de montagem, curva ABC e giro"
        actions={
          <button
            onClick={() => openQuickAction('inventory')}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors shadow-2xs"
          >
            <Plus className="h-4 w-4" />
            Dar Entrada no Estoque
          </button>
        }
      />

      {/* Golden KPI Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Unidades Físicas"
          value={`${totalStockUnits} un.`}
          subtitle="Itens catalogados Polo"
          change="+8% no mês"
          trend="up"
          icon={Boxes}
        />
        <StatCard
          title="Capital Imobilizado"
          value={`R$ ${totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`}
          subtitle="Custo de reposição ativo"
          change="Liquidez protegida"
          trend="neutral"
          icon={Boxes}
        />
        <StatCard
          title="Estoque Crítico / Mínimo"
          value={`${criticalItems.length} produtos`}
          subtitle="Gatilho de reposição acionado"
          change="Requer compras"
          trend="down"
          icon={AlertTriangle}
        />
        <StatCard
          title="Produtos Parados"
          value={`${dormantItems.length} modelos`}
          subtitle="Sem giro recente"
          change="Sugerido combo"
          trend="down"
          icon={Archive}
        />
        <StatCard
          title="Giro Médio de Estoque"
          value="3.4x / ano"
          subtitle="Tempo médio no CD: 24 dias"
          change="Giro saudável"
          trend="up"
          icon={History}
        />
      </div>

      {/* Gráfico Animado de Distribuição de Estoque por Categoria */}
      <CategoryDonutChart title="Composição do Estoque & Giro por Categoria de Mobiliário" />

      {/* Tabs Filter Bar */}
      <div className="flex rounded-xl border border-slate-200/90 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 w-full sm:w-fit shadow-2xs overflow-x-auto">
        {[
          { id: 'posicao', label: 'Posição Geral de Estoque' },
          { id: 'abc', label: 'Curva ABC (Estratégico)' },
          { id: 'parados', label: 'Estoque Crítico' },
          { id: 'movimentacoes', label: 'Histórico de Movimentações' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* POSIÇÃO GERAL TABLE */}
      {activeTab === 'posicao' && (
        <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Tabela de Estoque ({filteredProducts.length} itens)
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">Curva ABC:</span>
              {(['Todos', 'A', 'B', 'C'] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  className={`rounded-md px-2.5 py-0.5 text-xs font-bold font-mono transition-colors ${
                    filterClass === cls
                      ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/70 dark:bg-slate-800/40 dark:border-slate-800">
                  <th className="py-3 px-4">SKU / Produto</th>
                  <th className="py-3 px-2">Localização</th>
                  <th className="py-3 px-2 text-center">Curva</th>
                  <th className="py-3 px-2 text-right">Físico</th>
                  <th className="py-3 px-2 text-right">Reservado</th>
                  <th className="py-3 px-2 text-right">Disponível</th>
                  <th className="py-3 px-2 text-right">Mínimo</th>
                  <th className="py-3 px-2 text-right">Custo Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {filteredProducts.map((p) => {
                  const isCritical = p.stockAvailable <= p.stockMin;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{p.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{p.sku} · {p.category}</div>
                      </td>
                      <td className="py-3.5 px-2 text-slate-500 font-sans">{p.location}</td>
                      <td className="py-3.5 px-2 text-center">
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            p.abcClass === 'A'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                              : p.abcClass === 'B'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                        >
                          Classe {p.abcClass}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                        {p.stockCurrent}
                      </td>
                      <td className="py-3.5 px-2 text-right text-amber-600 dark:text-amber-400 tabular-nums">
                        {p.stockReserved}
                      </td>
                      <td className="py-3.5 px-2 text-right font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        {p.stockAvailable}
                      </td>
                      <td className="py-3.5 px-2 text-right text-slate-400 tabular-nums">
                        {p.stockMin}
                      </td>
                      <td className="py-3.5 px-2 text-right font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                        R$ {(p.stockCurrent * p.costPrice).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                      </td>
                      <td className="py-3.5 px-4 text-center font-sans">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isCritical
                              ? 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}
                        >
                          {isCritical ? 'Crítico (Repor)' : 'Normal'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CURVA ABC SECTION */}
      {activeTab === 'abc' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 space-y-4 dark:border-amber-900/40 dark:bg-amber-950/20 shadow-2xs">
            <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-amber-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 font-mono">Classe A</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Produtos Estratégicos</h3>
              </div>
              <span className="text-lg font-bold text-amber-700 dark:text-amber-400 font-mono">70% Receita</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Produtos de alto giro e grande representatividade no faturamento corporativo. Tolerância zero para falta de estoque.
            </p>
            <div className="space-y-2 text-xs">
              {products
                .filter((p) => p.abcClass === 'A')
                .slice(0, 5)
                .map((p) => (
                  <div key={p.id} className="flex justify-between p-2.5 rounded-xl bg-white border border-amber-100 dark:bg-slate-900 dark:border-amber-900/40">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{p.stockAvailable} disp.</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 space-y-4 dark:border-blue-900/40 dark:bg-blue-950/20 shadow-2xs">
            <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-blue-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 font-mono">Classe B</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Produtos Importantes</h3>
              </div>
              <span className="text-lg font-bold text-blue-700 dark:text-blue-400 font-mono">20% Receita</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Produtos complementares com demanda estável e média margem de contribuição.
            </p>
            <div className="space-y-2 text-xs">
              {products
                .filter((p) => p.abcClass === 'B')
                .slice(0, 5)
                .map((p) => (
                  <div key={p.id} className="flex justify-between p-2.5 rounded-xl bg-white border border-blue-100 dark:bg-slate-900 dark:border-blue-900/40">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{p.stockAvailable} disp.</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900/40 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Classe C</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Cauda Longa</h3>
              </div>
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300 font-mono">10% Receita</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Produtos de menor giro ou sob encomenda especial. Manter estoque reduzido para evitar imobilização.
            </p>
            <div className="space-y-2 text-xs">
              {products
                .filter((p) => p.abcClass === 'C')
                .map((p) => (
                  <div key={p.id} className="flex justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                    <span className="font-mono text-slate-500">{p.stockAvailable} disp.</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ESTOQUE CRÍTICO / PARADOS */}
      {activeTab === 'parados' && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2">
            Produtos em Nível Crítico ou Próximos do Mínimo ({criticalItems.length})
          </div>
          {criticalItems.map((p) => (
            <div key={p.id} className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 flex items-center justify-between text-xs dark:border-rose-950 dark:bg-rose-950/20">
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100">{p.name}</div>
                <div className="text-[11px] text-slate-500">Mínimo cadastrado: {p.stockMin} un. | Fornecedor: {p.supplier}</div>
              </div>
              <div className="text-right">
                <span className="text-rose-600 font-mono font-bold">{p.stockAvailable} un. disponíveis</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MOVIMENTAÇÕES SECTION */}
      {activeTab === 'movimentacoes' && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Auditoria de Entradas, Saídas e Reservas ({inventoryMovements.length})
          </div>
          <div className="space-y-2">
            {inventoryMovements.map((mov) => (
              <div
                key={mov.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        mov.type === 'Entrada'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-700 border border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300'
                      }`}
                    >
                      {mov.type}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{mov.productName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Motivo: {mov.reason}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 tabular-nums">
                    {mov.type === 'Entrada' ? '+' : '-'}{mov.quantity} un.
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{mov.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  Download,
  FileText,
  ShoppingBag,
  DollarSign,
  Boxes,
  Truck,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ManagementReportsView: React.FC = () => {
  const { sales, receivables, payables, products, deliveries, customers } = useApp();
  const [selectedReport, setSelectedReport] = useState<string>('vendas');
  const [isExporting, setIsExporting] = useState(false);

  const reports = [
    { id: 'vendas', title: 'Relatório de Vendas Detalhado', desc: 'Vendas por período, cliente, vendedor, itens e margens', icon: ShoppingBag },
    { id: 'financeiro', title: 'Relatório Financeiro & DRE', desc: 'Contas a receber, pagar, fluxo de caixa e inadimplência', icon: DollarSign },
    { id: 'estoque', title: 'Relatório de Posição de Estoque', desc: 'Curva ABC, saldo físico, custo imobilizado e giro', icon: Boxes },
    { id: 'entregas', title: 'Relatório Operacional de Logística', desc: 'Rotas realizadas, SLA de pontualidade e comprovantes', icon: Truck },
    { id: 'clientes', title: 'Relatório de Carteira de Clientes', desc: 'LTV, ticket médio, histórico de compras e segmentação', icon: Users },
  ];

  const handlePrint = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Central de Relatórios Executivos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Relatórios Operacionais & Financeiros
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Gere demonstrativos prontos para diretoria, contabilidade e auditoria externa.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            Imprimir Relatório
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 shadow-xs"
          >
            <Download className="w-4 h-4" />
            Exportar PDF / Excel
          </button>
        </div>
      </div>

      {/* Seletor de Tipo de Relatório */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {reports.map((r) => {
          const Icon = r.icon;
          const isSel = selectedReport === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedReport(r.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSel
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md dark:border-white dark:bg-white dark:text-slate-950'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${isSel ? 'text-white dark:text-slate-950' : 'text-slate-500'}`} />
              <div className="font-bold text-xs">{r.title}</div>
              <div className={`text-[11px] mt-0.5 leading-snug line-clamp-2 ${isSel ? 'text-white/80 dark:text-slate-700' : 'text-slate-500'}`}>
                {r.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Prévia Elegante do Relatório Selecionado */}
      <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800 gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Polo Móveis • Demonstrativo Gerencial
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
              {reports.find((r) => r.id === selectedReport)?.title}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Período: Outubro/2026 • Gerado em 05/10/2026
          </span>
        </div>

        {/* Tabela do Relatório */}
        {selectedReport === 'vendas' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2 px-3">Código</th>
                  <th className="py-2 px-3">Cliente</th>
                  <th className="py-2 px-3">Vendedor</th>
                  <th className="py-2 px-3">Data</th>
                  <th className="py-2 px-3">Forma Pagto</th>
                  <th className="py-2 px-3 text-right">Valor Total</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sales.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 px-3 font-mono font-bold">{s.code}</td>
                    <td className="py-2 px-3 font-semibold">{s.customerName}</td>
                    <td className="py-2 px-3">{s.salesperson}</td>
                    <td className="py-2 px-3 text-slate-500">{s.date}</td>
                    <td className="py-2 px-3">{s.paymentMethod}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold">
                      R$ {s.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 font-semibold text-emerald-700">{s.operationalStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedReport === 'financeiro' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3 text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div>
                <span className="text-slate-400">Total Faturado</span>
                <div className="font-bold font-mono text-slate-900 dark:text-white mt-0.5">R$ 684.500,00</div>
              </div>
              <div>
                <span className="text-slate-400">Custos & Despesas</span>
                <div className="font-bold font-mono text-slate-900 dark:text-white mt-0.5">R$ 332.500,00</div>
              </div>
              <div>
                <span className="text-slate-400">Resultado Líquido</span>
                <div className="font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">R$ 352.000,00 (51.4%)</div>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Demonstrativo consolidado compatível com emissão contábil e auditoria financeira.
            </p>
          </div>
        )}

        {selectedReport === 'estoque' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2 px-3">SKU</th>
                  <th className="py-2 px-3">Produto</th>
                  <th className="py-2 px-3">Físico</th>
                  <th className="py-2 px-3">Disponível</th>
                  <th className="py-2 px-3">Reservado</th>
                  <th className="py-2 px-3">Custo Unitário</th>
                  <th className="py-2 px-3 text-right">Total Imobilizado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2 px-3 font-mono">{p.sku}</td>
                    <td className="py-2 px-3 font-semibold">{p.name}</td>
                    <td className="py-2 px-3 font-bold">{p.stockCurrent}</td>
                    <td className="py-2 px-3 text-emerald-700 font-bold">{p.stockAvailable}</td>
                    <td className="py-2 px-3 text-amber-700 font-bold">{p.stockReserved}</td>
                    <td className="py-2 px-3 font-mono">R$ {p.costPrice.toLocaleString('pt-BR')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold">
                      R$ {(p.stockCurrent * p.costPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(selectedReport === 'entregas' || selectedReport === 'clientes') && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
            Relatório completo indexado com {customers.length} clientes e {deliveries.length} rotas operacionais.
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  CreditCard,
  Percent,
  Clock,
  CheckCircle2,
  Settings,
  DollarSign,
  Landmark,
  ShieldCheck,
  Save,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FinancialMethodsView: React.FC = () => {
  const [methods, setMethods] = useState([
    {
      id: 'pix',
      name: 'Pix Instantâneo',
      type: 'À Vista',
      feePercent: 0.0,
      settlementDays: 0,
      discountPercent: 5.0,
      status: 'Ativo',
      description: 'Recebimento instantâneo em conta com incentivo comercial de 5% de desconto.',
    },
    {
      id: 'credito-1x',
      name: 'Cartão de Crédito 1x (Débito/Vencimento)',
      type: 'Cartão',
      feePercent: 2.19,
      settlementDays: 30,
      discountPercent: 0.0,
      status: 'Ativo',
      description: 'Tarifa padrão adquirente Cielo/Stone para vendas em rotativo 30 dias.',
    },
    {
      id: 'credito-3x',
      name: 'Cartão de Crédito 2x a 3x',
      type: 'Cartão',
      feePercent: 3.49,
      settlementDays: 30,
      discountPercent: 0.0,
      status: 'Ativo',
      description: 'Parcelamento sem juros na maquininha para orçamentos até R$ 15.000.',
    },
    {
      id: 'credito-6x',
      name: 'Cartão de Crédito 4x a 6x',
      type: 'Cartão',
      feePercent: 5.29,
      settlementDays: 30,
      discountPercent: 0.0,
      status: 'Ativo',
      description: 'Condição padrão para projetos corporativos médios.',
    },
    {
      id: 'credito-10x',
      name: 'Cartão de Crédito 7x a 12x',
      type: 'Cartão',
      feePercent: 8.99,
      settlementDays: 30,
      discountPercent: 0.0,
      status: 'Ativo',
      description: 'Parcelamento longo com taxa de MDR negociada para grandes composições.',
    },
    {
      id: 'boleto-faturado',
      name: 'Boleto Faturado PJ (30 / 60 / 90 DD)',
      type: 'Faturamento PJ',
      feePercent: 1.85,
      settlementDays: 60,
      discountPercent: 0.0,
      status: 'Ativo',
      description: 'Emissão de duplicata mercantil com análise prévia de Serasa/limite de crédito.',
    },
    {
      id: 'dinheiro',
      name: 'Dinheiro Espécie',
      type: 'À Vista',
      feePercent: 0.0,
      settlementDays: 0,
      discountPercent: 5.0,
      status: 'Ativo',
      description: 'Entrada direta no caixa físico da loja com recibo assinado.',
    },
  ]);

  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              <CreditCard className="w-3.5 h-3.5" />
              Condições Comerciais
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Formas de Pagamento & Taxas de Cartão
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Configure taxas de MDR das maquininhas, prazos de compensação e regras de parcelamento de vendas.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Salvar Regras de Pagamento
        </button>
      </div>

      {savedNotification && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Taxas e condições de pagamento salvas e sincronizadas com o construtor de orçamentos e vendas!
        </div>
      )}

      {/* Tabela de Métodos */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Método de Cobrança</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Taxa MDR (%)</th>
                <th className="py-3 px-4">Desconto à Vista (%)</th>
                <th className="py-3 px-4">Prazo Repasse (Dias)</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {methods.map((m, idx) => (
                <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {m.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {m.description}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    {m.type}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-900 dark:text-white">
                      <input
                        type="number"
                        step="0.01"
                        value={m.feePercent}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setMethods((prev) => prev.map((item, i) => i === idx ? { ...item, feePercent: val } : item));
                        }}
                        className="w-16 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                      <span>%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      <input
                        type="number"
                        step="0.5"
                        value={m.discountPercent}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setMethods((prev) => prev.map((item, i) => i === idx ? { ...item, discountPercent: val } : item));
                        }}
                        className="w-16 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                      <span>%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                    {m.settlementDays === 0 ? 'Imediato (D+0)' : `D+${m.settlementDays}`}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Repeat,
  Plus,
  Calendar,
  DollarSign,
  TrendingDown,
  Building,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateFixedCostsView: React.FC = () => {
  const { corporateFixedCosts } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const totalFixedCosts = corporateFixedCosts.reduce((acc, c) => acc + c.monthlyAmount, 0);

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Repeat className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Estrutura & Custo de Existência
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Custos Fixos Mensais da Empresa
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Despesas mensais fixas necessárias para a operação da Polo Móveis.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo Custo Fixo
        </button>
      </div>

      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Custo fixo registrado com sucesso na planilha de previsão orçamentária.</span>
          </div>
          <button onClick={() => setSuccessMsg(false)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Total */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Total Fixo Comprometido / Mês
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalFixedCosts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            {corporateFixedCosts.length} despesas fixas recorrentes
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Impacto no Faturamento Bruto
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400 mt-2">
            12.9%
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 block">
            Saudável (Benchmark do segmento: até 20%)
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Ponto de Equilíbrio Operacional
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ 158.600,00
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Receita mínima mensal para zerar custos
          </span>
        </div>
      </div>

      {/* Tabela de Custos Fixos */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          Detalhamento de Custos Fixos Recorrentes
        </h2>

        <div className="space-y-3">
          {corporateFixedCosts.map((cost) => {
            const perc = (cost.monthlyAmount / totalFixedCosts) * 100;

            return (
              <div
                key={cost.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40 gap-3 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                      {cost.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                      <Calendar className="h-3.5 w-3.5" /> Vence todo dia {cost.dueDay}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {cost.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Responsável: {cost.responsible}
                  </div>
                </div>

                <div className="text-right sm:min-w-[160px]">
                  <div className="text-base font-bold text-slate-900 dark:text-white">
                    R$ {cost.monthlyAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Representa {perc.toFixed(1)}% do fixo total
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cadastrar Novo Custo Fixo
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Descrição do Custo</label>
                <input
                  type="text"
                  placeholder="Ex: Licença de Software CAD/3D"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Categoria</label>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option>Tecnologia</option>
                  <option>Infraestrutura</option>
                  <option>Pessoal</option>
                  <option>Utilidades</option>
                  <option>Serviços</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Valor Mensal (R$)</label>
                  <input
                    type="number"
                    placeholder="1500.00"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Dia Vencimento</label>
                  <input
                    type="number"
                    placeholder="10"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setSuccessMsg(true);
                  setShowAddModal(false);
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
              >
                Salvar Custo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

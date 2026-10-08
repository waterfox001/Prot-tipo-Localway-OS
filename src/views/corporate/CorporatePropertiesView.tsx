import React, { useState } from 'react';
import {
  Building2,
  Plus,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileText,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporatePropertiesView: React.FC = () => {
  const { corporateProperties } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const totalPatrimonioImoveis = corporateProperties.reduce((acc, p) => acc + p.marketValue, 0);
  const totalDespesasImoveis = corporateProperties.reduce((acc, p) => acc + p.monthlyExpenses, 0);

  return (
    <div className="space-y-6 pb-12 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Building2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Patrimônio Imobiliário da Empresa
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Imóveis & Instalações
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Gestão de sedes, showrooms comerciais e galpões operacionais da Polo Móveis.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo Imóvel
        </button>
      </div>

      {feedbackMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedbackMsg}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Valor de Mercado dos Imóveis
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalPatrimonioImoveis.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 block">
            2 imóveis ativos no portfólio
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Despesas Mensais de Manutenção
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalDespesasImoveis.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            IPTU, condomínio e conservação geral
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Cap Rate / Retorno Médio
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-700 dark:text-blue-400 mt-2">
            11.85% a.a.
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            Valorização patrimonial e uso logístico
          </span>
        </div>
      </div>

      {/* Cards de Imóveis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {corporateProperties.map((prop) => (
          <div
            key={prop.id}
            className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  {prop.type}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    prop.occupancyStatus === 'Próprio'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}
                >
                  {prop.occupancyStatus}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-3">
                {prop.name}
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{prop.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="rounded-lg bg-slate-50/80 p-3.5 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Valor Estimado</span>
                <span className="font-bold text-slate-900 dark:text-white text-base mt-1 block">
                  R$ {prop.marketValue.toLocaleString('pt-BR')}
                </span>
              </div>

              <div className="rounded-lg bg-slate-50/80 p-3.5 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {prop.rentAmount > 0 ? 'Aluguel Mensal' : 'Custo Operacional'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-base mt-1 block">
                  R$ {(prop.rentAmount > 0 ? prop.rentAmount : prop.monthlyExpenses).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5 text-slate-400" /> Contrato até {prop.contractDue}
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                ROI: {prop.roiPercent}% a.a.
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cadastrar Novo Imóvel Corporativo
            </h3>
            <p className="text-xs text-slate-500">
              Cadastre showroom, galpão de estoque ou filial comercial da Polo Móveis.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nome do Imóvel</label>
                <input
                  type="text"
                  placeholder="Ex: Showroom Alphaville"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Endereço Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Alameda Rio Negro, 500 - Barueri, SP"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Valor de Mercado (R$)</label>
                  <input
                    type="number"
                    placeholder="2500000"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Tipo</label>
                  <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                    <option>Showroom Comercial</option>
                    <option>Galpão Logístico</option>
                    <option>Escritório Administrativo</option>
                  </select>
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
                  setFeedbackMsg('Imóvel corporativo cadastrado com sucesso no portfólio.');
                  setShowAddModal(false);
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
              >
                Salvar Imóvel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

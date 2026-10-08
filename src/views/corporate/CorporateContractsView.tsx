import React, { useState } from 'react';
import {
  FileSignature,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building,
  DollarSign,
  Clock,
  Search,
  ArrowRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateContractsView: React.FC = () => {
  const { corporateContracts } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'ativo' | 'renovacao'>('todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const totalMonthlyMRR = corporateContracts.reduce((acc, c) => acc + c.monthlyValue, 0);
  const totalContractValue = corporateContracts.reduce((acc, c) => acc + c.totalValue, 0);

  const filteredContracts = corporateContracts.filter((c) => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contractCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'ativo') return matchesSearch && c.status === 'Ativo';
    if (filterStatus === 'renovacao') return matchesSearch && c.daysToRenew <= 30;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <FileSignature className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Receita Recorrente & Acordos Corporativos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Clientes & Contratos Corporativos
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Gestão de fornecimento contínuo, manutenção preventiva NR-17 e acordos anuais da Polo Móveis.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo Contrato
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

      {/* KPIs de Contratos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            MRR Corporativo (Mensal)
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalMonthlyMRR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 block">
            Receita garantida contratualmente
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Volume Total em Contratos
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalContractValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            {corporateContracts.length} acordos B2B vigentes
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Alertas de Renovação (≤ 30 dias)
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-700 dark:text-amber-400 mt-2">
            {corporateContracts.filter((c) => c.daysToRenew <= 30).length} Contrato(s)
          </div>
          <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-2 block">
            Prioridade para renegociação comercial
          </span>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente ou código..."
            className="w-full rounded-lg border border-slate-200/90 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex rounded-lg border border-slate-200/90 bg-white p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 w-full sm:w-auto shadow-xs">
          <button
            onClick={() => setFilterStatus('todos')}
            className={`flex-1 sm:flex-none rounded-md px-3.5 py-1.5 transition-all ${
              filterStatus === 'todos'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            Todos ({corporateContracts.length})
          </button>
          <button
            onClick={() => setFilterStatus('ativo')}
            className={`flex-1 sm:flex-none rounded-md px-3.5 py-1.5 transition-all ${
              filterStatus === 'ativo'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            Ativos
          </button>
          <button
            onClick={() => setFilterStatus('renovacao')}
            className={`flex-1 sm:flex-none rounded-md px-3.5 py-1.5 transition-all ${
              filterStatus === 'renovacao'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            A Renovar (≤ 30d)
          </button>
        </div>
      </div>

      {/* Lista de Contratos */}
      <div className="space-y-3.5">
        {filteredContracts.map((cnt) => {
          const isUrgent = cnt.daysToRenew <= 30;

          return (
            <div
              key={cnt.id}
              className={`rounded-xl border p-5 shadow-xs transition-all bg-white dark:bg-slate-900 ${
                isUrgent
                  ? 'border-amber-300 dark:border-amber-700/60'
                  : 'border-slate-200/80 hover:border-slate-300 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {cnt.contractCode}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isUrgent
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-1'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      }`}
                    >
                      {isUrgent && <AlertTriangle className="h-3.5 w-3.5" />}
                      {isUrgent ? `Vence em ${cnt.daysToRenew} dias` : cnt.status}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {cnt.customerName}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {cnt.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cláusula operacional: {cnt.terms}
                  </p>
                </div>

                <div className="flex items-center gap-6 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Mensalidade</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      R$ {cnt.monthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Valor Global</span>
                    <span className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-400">
                      R$ {cnt.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-slate-500 uppercase font-semibold block">Vigência</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {cnt.startDate} até {cnt.endDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Novo Contrato Corporativo
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Cliente Corporativo</label>
                <input
                  type="text"
                  placeholder="Ex: Nubrill Fintech S.A."
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Objeto do Contrato</label>
                <input
                  type="text"
                  placeholder="Ex: Fornecimento Contínuo & Manutenção Ergonômica"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Mensalidade (R$)</label>
                  <input
                    type="number"
                    placeholder="12000.00"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Duração (Meses)</label>
                  <input
                    type="number"
                    placeholder="12"
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
                  setFeedbackMsg('Novo contrato corporativo cadastrado com sucesso.');
                  setShowAddModal(false);
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
              >
                Cadastrar Contrato
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

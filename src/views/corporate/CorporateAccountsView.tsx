import React, { useState } from 'react';
import {
  Landmark,
  Plus,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Building2,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateAccountsView: React.FC = () => {
  const { corporateAccounts } = useApp();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const totalSaldos = corporateAccounts.reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Landmark className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Bancos & Liquidez
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contas Bancárias PJ & Reservas
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Gestão de contas correntes empresariais e reserva de liquidez para contingências.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowTransferModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Transferência Interna
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Nova Conta PJ
          </button>
        </div>
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

      {/* Card de Saldo Consolidado */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Saldo Consolidado em Caixa & Aplicações PJ
          </span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            100% Conciliado Hoje
          </span>
        </div>
        <div className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          R$ {totalSaldos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Distribuído em {corporateAccounts.length} contas bancárias e reservas remuneradas.
        </p>
      </div>

      {/* Lista de Contas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {corporateAccounts.map((acc) => (
          <div
            key={acc.id}
            className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  {acc.bank}
                </span>
                <span className="text-xs text-slate-500 font-medium">{acc.type}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white mt-3">
                {acc.name}
              </h2>
            </div>

            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Saldo Disponível</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              {acc.yieldInfo && (
                <div className="mt-2 flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {acc.yieldInfo}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500">Agência 0184 / CC 29402</span>
              <button
                onClick={() => setFeedbackMsg(`Exibindo extrato detalhado de ${acc.name}. Todos os lançamentos conferidos.`)}
                className="font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
              >
                Extrato →
              </button>
            </div>
          </div>
        ))}
      </div>

      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Transferência entre Contas PJ
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Conta Origem</label>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option>Itaú Empresas - Matriz SP</option>
                  <option>Bradesco Corporate - Vendas</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Conta Destino</label>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option>Reserva de Emergência PJ (100% CDI)</option>
                  <option>Bradesco Corporate - Vendas</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Valor (R$)</label>
                <input
                  type="number"
                  placeholder="10000.00"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowTransferModal(false)}
                className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setFeedbackMsg('Transferência interna realizada e conciliada com sucesso.');
                  setShowTransferModal(false);
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Nova Conta Bancária PJ
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nome da Conta / Finalidade</label>
                <input
                  type="text"
                  placeholder="Ex: Santander Corporate - Folha"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Instituição Financeira</label>
                <input
                  type="text"
                  placeholder="Ex: Banco Santander"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Saldo Inicial (R$)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
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
                  setFeedbackMsg('Nova conta bancária PJ cadastrada com sucesso.');
                  setShowAddModal(false);
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
              >
                Cadastrar Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Calendar,
  AlertCircle,
  User,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorporateCardsView: React.FC = () => {
  const { corporateCards } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const totalLimit = corporateCards.reduce((acc, c) => acc + c.limit, 0);
  const totalInvoices = corporateCards.reduce((acc, c) => acc + c.currentInvoice, 0);
  const totalAvailable = corporateCards.reduce((acc, c) => acc + c.availableLimit, 0);

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <CreditCard className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Crédito Empresarial
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Cartões Corporativos
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Cartões corporativos distribuídos para a diretoria executiva e gestão de frota.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          Novo Cartão Corporativo
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
            Faturas Atuais Consolidadas
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalInvoices.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            A vencer nos dias 10 e 20 deste mês
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Limite Total Disponível
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400 mt-2">
            R$ {totalAvailable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2 block">
            {((totalAvailable / totalLimit) * 100).toFixed(0)}% do limite global livre
          </span>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Limite Global Contratado
          </span>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
            R$ {totalLimit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">
            {corporateCards.length} cartões corporativos ativos
          </span>
        </div>
      </div>

      {/* Cards de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {corporateCards.map((card) => {
          const usedPercent = (card.currentInvoice / card.limit) * 100;

          return (
            <div
              key={card.id}
              className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 space-y-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {card.bank}
                  </span>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                    {card.name}
                  </h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <User className="h-4 w-4 text-slate-400" />
                <span>Titular: <strong className="text-slate-900 dark:text-white">{card.holder}</strong></span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Fatura Atual: R$ {card.currentInvoice.toLocaleString('pt-BR')}</span>
                  <span className="text-slate-900 dark:text-white">
                    Limite: R$ {card.limit.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      usedPercent > 80 ? 'bg-rose-500' : 'bg-slate-900 dark:bg-blue-500'
                    }`}
                    style={{ width: `${usedPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="h-3.5 w-3.5" /> Vencimento dia {card.dueDay}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  Disponível: R$ {card.availableLimit.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Solicitar Cartão Corporativo
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Titular Responsável</label>
                <input
                  type="text"
                  placeholder="Nome do colaborador ou sócio"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Banco Emissor</label>
                <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <option>Itaú Corporate Platinum</option>
                  <option>Bradesco Empresas Visa Infinite</option>
                  <option>BTG Pactual Corporate</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Limite Solicitado (R$)</label>
                <input
                  type="number"
                  placeholder="20000.00"
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
                  setFeedbackMsg('Solicitação de novo cartão corporativo enviada para o banco parceiro.');
                  setShowAddModal(false);
                }}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 transition-colors"
              >
                Solicitar Cartão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

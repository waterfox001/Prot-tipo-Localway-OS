import React from 'react';
import { Landmark, Plus, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalAccountsView: React.FC = () => {
  const { personalAccounts } = useApp();
  const totalBalance = personalAccounts.reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Landmark className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Contas & Liquidez Pessoal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contas Bancárias Pessoais
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Gerenciamento de contas correntes, contas digitais e poupanças de Marcus Glauber.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:text-right">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Saldo Total Consolidado
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {personalAccounts.map((acc) => (
          <div
            key={acc.id}
            className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 space-y-4 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{acc.name}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{acc.bank} · {acc.type}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Saldo Atual</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                R$ {acc.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30">
                <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">Entradas do Mês</span>
                <span className="font-bold text-sm">+ R$ {acc.incomeMonth.toLocaleString('pt-BR')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700">
                <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">Saídas do Mês</span>
                <span className="font-bold text-sm text-rose-700 dark:text-rose-400">- R$ {acc.expenseMonth.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

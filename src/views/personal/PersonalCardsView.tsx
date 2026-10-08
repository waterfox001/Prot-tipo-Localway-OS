import React from 'react';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalCardsView: React.FC = () => {
  const { personalCards } = useApp();

  const totalFaturas = personalCards.reduce((acc, c) => acc + c.currentInvoice, 0);
  const totalLimites = personalCards.reduce((acc, c) => acc + c.limit, 0);

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <CreditCard className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Gestão de Cartões
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Cartões de Crédito Pessoais
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Acompanhe faturas atuais, próximas parcelas e limites disponíveis.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:text-right">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Faturas em Aberto
          </div>
          <div className="text-2xl font-bold text-rose-700 dark:text-rose-400 mt-1">
            R$ {totalFaturas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {personalCards.map((card) => {
          const percentUsed = Math.round((card.currentInvoice / card.limit) * 100);

          return (
            <div
              key={card.id}
              className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 space-y-5 transition-all"
            >
              {/* Card Header & Brand */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{card.name}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{card.bank} · {card.brand}</div>
                </div>
                <div className="h-9 w-14 rounded-lg bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white text-xs font-bold">
                  ••••
                </div>
              </div>

              {/* Faturas em Aberto */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-850/60 border border-slate-200/70 dark:border-slate-800">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fatura Atual</div>
                  <div className="text-xl font-bold text-rose-700 dark:text-rose-400 mt-1">
                    R$ {card.currentInvoice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Vencimento dia {card.dueDay}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Próxima Fatura</div>
                  <div className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                    R$ {card.nextInvoice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Fechamento dia {card.closingDay}
                  </div>
                </div>
              </div>

              {/* Barra de Limite */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">Limite Utilizado: {percentUsed}%</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    R$ {card.availableLimit.toLocaleString('pt-BR')} livre
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 dark:bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${percentUsed}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-0.5">
                  <span>R$ 0</span>
                  <span>Limite Total: R$ {card.limit.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

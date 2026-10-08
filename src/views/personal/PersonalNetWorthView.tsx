import React from 'react';
import { Building, Car, DollarSign, TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalNetWorthView: React.FC = () => {
  const { personalAssets, personalDebts } = useApp();

  const totalBens = personalAssets.reduce((acc, a) => acc + a.value, 0);
  const totalDividas = personalDebts.reduce((acc, d) => acc + d.remainingAmount, 0);
  const patrimonioLiquido = totalBens - totalDividas;

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Building className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Balanço Patrimonial Pessoal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Patrimônio & Dívidas Consolidadas
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Balanço patrimonial pessoal de Marcus Glauber: Imóveis, veículos, investimentos e obrigações.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:text-right">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Patrimônio Líquido Total
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            R$ {patrimonioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Visão de Balanço: Bens vs Dívidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Ativos / Bens */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Ativos & Bens Patrimoniais
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total de bens tangíveis e líquidos</p>
            </div>
            <div className="text-base font-bold text-emerald-700 dark:text-emerald-400">
              R$ {totalBens.toLocaleString('pt-BR')}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            {personalAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50/70 border border-slate-200/70 dark:bg-slate-800/50 dark:border-slate-800"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{asset.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{asset.category}</div>
                </div>
                <div className="font-bold text-slate-900 dark:text-white">
                  R$ {asset.value.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passivos / Dívidas e Obrigações */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Dívidas & Obrigações Futuras
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Quanto ainda devo no total</p>
              </div>
              <div className="text-base font-bold text-rose-700 dark:text-rose-400">
                - R$ {totalDividas.toLocaleString('pt-BR')}
              </div>
            </div>

            <div className="space-y-3 pt-1 text-xs sm:text-sm">
              {personalDebts.map((debt) => (
                <div
                  key={debt.id}
                  className="p-3.5 rounded-lg border border-slate-200/70 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{debt.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{debt.category}</div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-850 dark:bg-rose-950/60 dark:text-rose-300">
                      {debt.installmentsRemaining} parcelas restantes
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-1">
                    <div>
                      <span className="text-xs text-slate-500">Parcela Mensal</span>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        R$ {debt.nextAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500">Saldo Devedor</span>
                      <div className="font-bold text-rose-700 dark:text-rose-400 text-sm">
                        R$ {debt.remainingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

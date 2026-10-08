import React, { useState } from 'react';
import {
  Percent,
  DollarSign,
  User,
  ShoppingBag,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FinancialCommissionsView: React.FC = () => {
  const { commissionEntries, paySalespersonCommissions, sales } = useApp();

  // Agrupamento por vendedor
  const salespeople = ['Carlos Mendes', 'Juliana Matos', 'Roberto Albuquerque'];

  const statsBySalesperson = salespeople.map((sp) => {
    const entries = commissionEntries.filter((c) => c.salesperson === sp);
    const spSales = sales.filter((s) => s.salesperson === sp);
    const totalSalesAmount = spSales.reduce((acc, s) => acc + s.total, 0);
    const totalCommission = entries.reduce((acc, c) => acc + c.amount, 0);
    const paidCommission = entries
      .filter((c) => c.status === 'Pago')
      .reduce((acc, c) => acc + c.amount, 0);
    const pendingCommission = entries
      .filter((c) => c.status === 'Pendente')
      .reduce((acc, c) => acc + c.amount, 0);

    return {
      name: sp,
      salesCount: spSales.length,
      revenue: totalSalesAmount,
      totalCommission,
      paidCommission,
      pendingCommission,
      rate: sp === 'Juliana Matos' ? 5.0 : 4.0,
      entries,
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
              <Percent className="w-3.5 h-3.5" />
              Gestão de Remuneração Variável
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Comissões de Vendedores
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Cálculo automatizado sobre faturamento por vendedor, comissões pendentes e quitação.
          </p>
        </div>
      </div>

      {/* Cards de Resumo por Vendedor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsBySalesperson.map((sp) => (
          <div
            key={sp.name}
            className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {sp.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  Taxa Padrão: {sp.rate}%
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {sp.salesCount} vendas
              </span>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Faturamento Gerado:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  R$ {sp.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Comissão Já Paga:</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  R$ {sp.paidCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-300">Comissão Pendente:</span>
                <span className="font-mono font-bold text-amber-800 dark:text-amber-400">
                  R$ {sp.pendingCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {sp.pendingCommission > 0 ? (
              <button
                onClick={() => paySalespersonCommissions(sp.name)}
                className="w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 shadow-2xs dark:bg-white dark:text-slate-900"
              >
                Pagar Comissões Pendentes
              </button>
            ) : (
              <div className="text-center text-xs text-emerald-700 font-semibold py-1">
                ✓ Todas as comissões pagas
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Histórico Detalhado de Lançamentos de Comissão */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Extrato de Comissões por Venda
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Vendedor</th>
                <th className="py-3 px-4">Venda Vinculada</th>
                <th className="py-3 px-4">Data Venda</th>
                <th className="py-3 px-4">Valor da Venda</th>
                <th className="py-3 px-4">Alíquota</th>
                <th className="py-3 px-4">Valor Comissão</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {commissionEntries.map((com) => (
                <tr key={com.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{com.salesperson}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">{com.saleCode}</td>
                  <td className="py-3 px-4 text-slate-500">{com.saleDate}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                    R$ {com.saleAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{com.ratePercent}%</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    R$ {com.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        com.status === 'Pago'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {com.status} {com.paidDate ? `(${com.paidDate})` : ''}
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

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  timeframeComparison?: string;
  icon?: React.ElementType;
  accentColor?: string;
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend = 'up',
  timeframeComparison,
  icon: Icon,
  badge,
}) => {
  return (
    <div className="relative rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {title}
          </span>
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors">
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </div>
          {badge && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-xs pt-1">
        {change && (
          <span
            className={`flex items-center gap-1 font-semibold ${
              trend === 'up'
                ? 'text-emerald-700 dark:text-emerald-400'
                : trend === 'down'
                ? 'text-rose-700 dark:text-rose-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
            {trend === 'down' && <TrendingDown className="h-3.5 w-3.5" />}
            {trend === 'neutral' && <Minus className="h-3.5 w-3.5" />}
            {change}
          </span>
        )}
        {timeframeComparison && (
          <span className="text-slate-500 dark:text-slate-400 truncate text-xs">{timeframeComparison}</span>
        )}
        {subtitle && !timeframeComparison && (
          <span className="text-slate-500 dark:text-slate-400 truncate text-xs">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

export const CompanyHealthCard: React.FC = () => {
  const pillars = [
    { name: 'Financeiro', score: 92, status: 'Excelente', color: 'bg-emerald-500' },
    { name: 'Comercial', score: 88, status: 'Forte', color: 'bg-emerald-500' },
    { name: 'Estoque', score: 79, status: '8 em Reposição', color: 'bg-amber-500' },
    { name: 'Operação', score: 91, status: 'SLA 96%', color: 'bg-emerald-500' },
    { name: 'Logística', score: 84, status: '3 em Rota', color: 'bg-emerald-500' },
    { name: 'Clientes', score: 95, status: 'CSAT 4.8★', color: 'bg-emerald-500' },
    { name: 'Equipe', score: 89, status: 'Produtividade Alta', color: 'bg-emerald-500' },
  ];

  const overallScore = Math.round(
    pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length
  );

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Diagnóstico Operacional Integrado
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
            Saúde Corporativa da Polo Móveis
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Avaliação multidimensional de performance integrada dos 7 departamentos
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 dark:bg-slate-800 dark:border-slate-700">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Índice Global
            </div>
            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Operação Saudável</div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {overallScore}<span className="text-xs font-normal text-slate-400">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.name}
            className="rounded-lg border border-slate-200/70 bg-slate-50/70 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40"
          >
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">{pillar.name}</div>
            <div className="mt-1 text-base font-bold text-slate-900 dark:text-white">
              {pillar.score}%
            </div>
            <div className="mt-1.5 h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${pillar.color} rounded-full`}
                style={{ width: `${pillar.score}%` }}
              />
            </div>
            <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              {pillar.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}> = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
};

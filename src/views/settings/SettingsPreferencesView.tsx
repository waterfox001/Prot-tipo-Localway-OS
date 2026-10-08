import React from 'react';
import { Sliders, Sun, Moon, Laptop, Bell, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThemeMode } from '../../types';

export const SettingsPreferencesView: React.FC = () => {
  const { theme, setTheme } = useApp();

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl pb-12">
      <div className="border-b border-slate-200/80 pb-5 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Preferências do Sistema
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Personalize tema visual, modo escuro e comportamento da interface executiva
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Aparência e Tema Visual
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Escolha como prefere visualizar o sistema operacional da Polo Móveis.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Modo Claro (Padrão)', desc: 'Design limpo e corporativo', icon: Sun },
              { id: 'dark', label: 'Modo Escuro', desc: 'Alto contraste para ambientes com pouca luz', icon: Moon },
              { id: 'auto', label: 'Automático', desc: 'Sincroniza com as configurações do sistema', icon: Laptop },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id as ThemeMode)}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 dark:border-amber-500 dark:bg-slate-800 ring-2 ring-slate-900/10 dark:ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-slate-900 dark:text-amber-400' : 'text-slate-400'}`} />
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                  </div>
                  <div className="mt-3 font-bold text-xs text-slate-900 dark:text-slate-100">
                    {option.label}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {option.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Formato de Moeda e Números
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500 block">Moeda Oficial</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                Real Brasileiro (BRL · R$)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500 block">Tipografia Numérica</span>
              <span className="font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5 block">
                Tabular / Proporcional (NR-17 / Vertex)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

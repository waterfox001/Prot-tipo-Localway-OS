import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PersonalTrashView: React.FC = () => {
  const { personalTrash, restorePersonalTrashItem, emptyPersonalTrash } = useApp();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleRestore = (id: string, title: string) => {
    restorePersonalTrashItem(id);
    setToastMsg(`Item "${title}" restaurado com sucesso.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleEmpty = () => {
    emptyPersonalTrash();
    setToastMsg('Lixeira pessoal esvaziada permanentemente.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
              <Trash2 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              Recuperação de Dados Pessoais
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Lixeira Pessoal
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Itens excluídos permanecem aqui e podem ser restaurados a qualquer momento.
          </p>
        </div>

        {personalTrash.length > 0 && (
          <button
            onClick={handleEmpty}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400 transition-colors shadow-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Esvaziar Lixeira
          </button>
        )}
      </div>

      {toastMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            Dispensar
          </button>
        </div>
      )}

      {personalTrash.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
            <Trash2 className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            A lixeira está vazia
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Nenhum lançamento ou dado pessoal foi excluído recentemente.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {personalTrash.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {item.originalType.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">Excluído em {item.deletedAt}</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </div>
                {item.amount !== undefined && (
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Valor: R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleRestore(item.id, item.title)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors shadow-xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restaurar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

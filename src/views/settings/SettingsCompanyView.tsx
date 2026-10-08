import React, { useState } from 'react';
import { Building2, Save, CheckCircle2, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsCompanyView: React.FC = () => {
  const { company, setCompany } = useApp();
  const [formData, setFormData] = useState(company);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompany(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl pb-12">
      <div className="border-b border-slate-200/80 pb-5 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Dados da Empresa
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configurações cadastrais da Polo Móveis para emissão de orçamentos, contratos e notas
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="h-4 w-4" /> Informações empresariais atualizadas!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs dark:border-slate-800 dark:bg-slate-900 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">Nome Fantasia</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">CNPJ</label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-medium text-slate-700 dark:text-slate-300">Razão Social Completa</label>
            <input
              type="text"
              value={formData.tradeName}
              onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-medium text-slate-700 dark:text-slate-300">Endereço da Sede Principal</label>
            <input
              type="text"
              value={formData.headquarters}
              onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">Telefone Comercial</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">E-mail Comercial</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition-colors"
          >
            <Save className="h-4 w-4" />
            Salvar Dados da Empresa
          </button>
        </div>
      </form>
    </div>
  );
};

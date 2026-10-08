import React, { useState } from 'react';
import {
  FolderTree,
  Plus,
  Search,
  Armchair,
  Boxes,
  TrendingUp,
  Percent,
  DollarSign,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryDonutChart } from '../../components/charts/CategoryDonutChart';

export const CatalogCategoriesView: React.FC = () => {
  const { products, setActiveView } = useApp();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatMargin, setNewCatMargin] = useState(55);

  const predefinedCategories = [
    {
      name: 'Cadeiras',
      slug: 'cadeiras',
      icon: Armchair,
      description: 'Cadeiras ergonômicas operacionais, diretoria, presidente e interlocutor com laudo NR-17.',
      targetMargin: 52,
    },
    {
      name: 'Mesas',
      slug: 'mesas',
      icon: Layers,
      description: 'Plataformas de trabalho compartilhadas, mesas executivas em L e mesas de reunião modulares.',
      targetMargin: 48,
    },
    {
      name: 'Armários',
      slug: 'armarios',
      icon: Package,
      description: 'Armários altos, médios e baixos com fechamento suave, gaveteiros integrados e portas de correr.',
      targetMargin: 50,
    },
    {
      name: 'Estantes',
      slug: 'estantes',
      icon: FolderTree,
      description: 'Estantes de arquivo, nichos organizadores e estantes industriais reforçadas para CPD e almoxarifado.',
      targetMargin: 55,
    },
    {
      name: 'Móveis de Aço',
      slug: 'moveis-de-aco',
      icon: Boxes,
      description: 'Roupeiros de vestiário insalubre, arquivos de pasta suspensa e armários corta-fogo.',
      targetMargin: 45,
    },
    {
      name: 'Longarinas',
      slug: 'longarinas',
      icon: Armchair,
      description: 'Longarinas para recepção e salas de espera com 2 a 5 lugares, assentos em polipropileno ou couro ecológico.',
      targetMargin: 54,
    },
    {
      name: 'Gaveteiros',
      slug: 'gaveteiros',
      icon: Package,
      description: 'Gaveteiros volantes com rodízios de PU, trava central e pasta suspensa.',
      targetMargin: 58,
    },
    {
      name: 'Kits',
      slug: 'kits',
      icon: Layers,
      description: 'Combos completos para home office e estações de teleatendimento com biombo acústico.',
      targetMargin: 49,
    },
  ];

  const categoryStats = predefinedCategories.map((cat) => {
    const catProducts = products.filter((p) => p.category === cat.name);
    const skuCount = catProducts.length;
    const totalStock = catProducts.reduce((sum, p) => sum + p.stockCurrent, 0);
    const stockValue = catProducts.reduce((sum, p) => sum + (p.stockCurrent * p.costPrice), 0);
    const avgMargin = catProducts.length > 0 
      ? Math.round(catProducts.reduce((sum, p) => sum + p.marginPercent, 0) / catProducts.length)
      : cat.targetMargin;

    return {
      ...cat,
      skuCount,
      totalStock,
      stockValue,
      avgMargin,
    };
  });

  const filteredCategories = categoryStats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
              <FolderTree className="w-3.5 h-3.5" />
              Gestão de Catálogo
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Categorias & Linhas de Produtos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Estruture o portfólio da loja, configure margens mínimas de lucro e acompanhe o giro por categoria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white w-52"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            Nova Categoria
          </button>
        </div>
      </div>

      {/* Gráfico Donut Animado de Mix por Categoria */}
      <CategoryDonutChart title="Distribuição do Portfólio & Mix de Faturamento por Categoria" />

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.name}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-950 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {cat.avgMargin}% margem
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                <div className="space-y-2 py-3 border-y border-slate-100 dark:border-slate-800/80 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Modelos cadastrados:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {cat.skuCount > 0 ? `${cat.skuCount} SKUs` : '2 SKUs'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unidades em estoque:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {cat.totalStock > 0 ? `${cat.totalStock} un.` : '34 un.'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Capital imobilizado:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      R$ {(cat.stockValue > 0 ? cat.stockValue : 28400).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveView('catalog_products')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Ver produtos
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Nova Categoria */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 animate-scale-up">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Nova Categoria de Móveis
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Adicione uma nova classificação ao catálogo da loja.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAddModal(false);
                setNewCatName('');
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Poltronas e Sofás de Recepção"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Margem Alvo Padrão (%)
                </label>
                <input
                  type="number"
                  required
                  value={newCatMargin}
                  onChange={(e) => setNewCatMargin(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Descrição Técnica
                </label>
                <textarea
                  rows={3}
                  placeholder="Especificações padrão e aplicação na linha de móveis..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-xl"
                >
                  Salvar Categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

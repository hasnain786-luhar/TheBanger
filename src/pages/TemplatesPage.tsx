import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Star, Copy, Tag } from 'lucide-react';
import type { Page } from '../App';

const templates = [
  { id: 't1', name: 'Living Room Makeover',     category: 'Residential', items: 8,  avgValue: '₹2.5L',  starred: true,  desc: 'Full living room transformation.', tags: ['living room','furniture'], uses: 24 },
  { id: 't2', name: 'Modular Kitchen',          category: 'Residential', items: 6,  avgValue: '₹3.8L',  starred: true,  desc: 'Modular kitchen with appliances.', tags: ['kitchen','modular'],       uses: 18 },
  { id: 't3', name: 'Office Interior',          category: 'Commercial',  items: 10, avgValue: '₹8.5L',  starred: false, desc: 'Corporate workspace fit-out.',     tags: ['office','commercial'],      uses: 12 },
  { id: 't4', name: 'Master Bedroom Suite',     category: 'Residential', items: 7,  avgValue: '₹1.85L', starred: false, desc: 'Bed, wardrobe, dressing area.',    tags: ['bedroom','wardrobe'],       uses: 31 },
  { id: 't5', name: 'Retail Store Fit-out',     category: 'Commercial',  items: 12, avgValue: '₹12L',   starred: false, desc: 'Display units, POS, branding.',   tags: ['retail','branding'],        uses: 7  },
  { id: 't6', name: 'Consultation Package',     category: 'Services',    items: 3,  avgValue: '₹45K',   starred: true,  desc: 'Space planning & 3D vis.',        tags: ['consultation'],              uses: 45 },
  { id: 't7', name: 'Kids Room Design',         category: 'Residential', items: 9,  avgValue: '₹95K',   starred: false, desc: 'Fun functional kids room.',       tags: ['kids','storage'],            uses: 15 },
  { id: 't8', name: 'Restaurant Interior',      category: 'Hospitality', items: 14, avgValue: '₹18L',   starred: false, desc: 'Seating, bar, kitchen pass.',     tags: ['restaurant','lighting'],     uses: 5  },
];

const cats = ['All', 'Residential', 'Commercial', 'Hospitality', 'Services'];

const catStyle: Record<string, string> = {
  Residential: 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400',
  Commercial:  'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  Hospitality: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  Services:    'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400',
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.28 } } };

export function TemplatesPage({ onNavigate }: { onNavigate: (p: any) => void }) {
  const [search, setSearch]   = useState('');
  const [cat, setCat]         = useState('All');
  const [starred, setStarred] = useState<Record<string, boolean>>(Object.fromEntries(templates.map(t => [t.id, t.starred])));

  const filtered = templates.filter(t =>
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()))
    && (cat === 'All' || t.category === cat)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-white">Templates</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">{templates.length} ready-to-use</p>
        </div>
        <button className="btn-primary h-10 px-4 text-sm gap-1.5 min-h-0"><Plus size={14}/>New</button>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none" />
        <input type="text" placeholder="Search templates..." value={search} onChange={e => setSearch(e.target.value)} className="field pl-11" />
      </div>

      {/* Category filter — scrollable */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
        {cats.map(c => (
          <motion.button key={c} whileTap={{ scale: 0.94 }} onClick={() => setCat(c)}
            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${cat===c ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'bg-white dark:bg-slate-900 text-ink-secondary border border-surface-3 dark:border-slate-700'}`}>
            {c}{c!=='All' && <span className={`ml-1 ${cat===c?'text-brand-200':'text-ink-tertiary'}`}>({templates.filter(t=>t.category===c).length})</span>}
          </motion.button>
        ))}
      </div>

      {/* Grid: 1-col mobile → 2-col sm → 3-col lg → 4-col xl */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map(template => (
          <motion.div key={template.id} variants={item}
            whileTap={{ scale: 0.98 }}
            className="card p-4 sm:p-5 group cursor-pointer relative"
          >
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
              onClick={e => { e.stopPropagation(); setStarred(p => ({...p, [template.id]: !p[template.id]})); }}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-xl hover:bg-surface-2 transition-colors">
              <Star size={13} className={starred[template.id] ? 'text-amber-500 fill-amber-500' : 'text-ink-tertiary'} />
            </motion.button>

            <span className={`badge text-[10px] mb-3 ${catStyle[template.category]||''}`}>{template.category}</span>
            <h3 className="text-sm font-bold text-ink dark:text-white mb-1.5 pr-8 leading-snug">{template.name}</h3>
            <p className="text-xs text-ink-tertiary leading-relaxed mb-3">{template.desc}</p>

            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {template.tags.slice(0,2).map(tag => (
                <span key={tag} className="flex items-center gap-1 text-[10px] bg-surface-2 dark:bg-slate-800 text-ink-secondary dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">
                  <Tag size={8}/>{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-ink-tertiary border-t border-surface-3 dark:border-slate-800 pt-3">
              <span>{template.items} items · {template.avgValue}</span>
              <span>{template.uses}× used</span>
            </div>

            {/* Use template button — always visible on mobile, hover on desktop */}
            <div className="mt-3 sm:mt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity sm:absolute sm:inset-x-4 sm:bottom-4">
              <button onClick={() => onNavigate('quote-editor')}
                className="w-full py-2.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/20 dark:hover:bg-brand-900/30 rounded-xl transition-colors sm:shadow-sm sm:border sm:border-brand-200 sm:dark:border-brand-800">
                Use Template →
              </button>
            </div>
            {/* Spacer for desktop hover actions */}
            <div className="hidden sm:block h-10 opacity-0 group-hover:hidden" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

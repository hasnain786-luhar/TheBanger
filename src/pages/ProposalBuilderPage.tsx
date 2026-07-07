import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, Send, ArrowRight, Check, Loader } from 'lucide-react';
import { Card } from '../components/ui/Card';
import type { Page } from '../App';

interface ProposalBuilderPageProps { onNavigate: (page: Page) => void; }
type Step = 1 | 2 | 3 | 4;

const proposalTypes = [
  { id: 'interior',   label: 'Interior Design', desc: 'Full residential or commercial project', icon: '🏠' },
  { id: 'renovation', label: 'Renovation',      desc: 'Space renovation & materials',           icon: '🔨' },
  { id: 'furniture',  label: 'Furniture & Decor',desc: 'Custom furniture sourcing',              icon: '🛋️' },
  { id: 'commercial', label: 'Commercial',       desc: 'Office, retail or hospitality',          icon: '🏢' },
];

const aiSections = ['Executive Summary','Project Scope','Design Concept','Proposed Solutions','Materials','Project Timeline','Investment Summary','Terms & Next Steps'];

export function ProposalBuilderPage({ onNavigate }: ProposalBuilderPageProps) {
  const [step, setStep]         = useState<Step>(1);
  const [type, setType]         = useState('interior');
  const [gen, setGen]           = useState(false);
  const [generated, setGenerated] = useState(false);
  const [form, setForm]         = useState({ client: 'Kavya Nair', project: 'Indiranagar Office Interiors', brief: 'Modern minimal workspace for 30 people. Collaborative zones, phone booths, premium lounge.', budget: '₹15,00,000', timeline: '8 weeks' });

  const handleGenerate = () => {
    setGen(true);
    setTimeout(() => { setGen(false); setGenerated(true); setStep(3); }, 2800);
  };

  const steps = [
    { n: 1, label: 'Type'     },
    { n: 2, label: 'Brief'    },
    { n: 3, label: 'Preview'  },
    { n: 4, label: 'Customize'},
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-white">Proposal Builder</h2>
          <p className="text-xs text-ink-tertiary mt-0.5">AI-powered in minutes</p>
        </div>
        {generated && (
          <div className="flex gap-2">
            <button className="btn-secondary text-xs h-9 px-3 gap-1.5 min-h-0"><Download size={13}/>PDF</button>
            <button className="btn-primary text-xs h-9 px-3 gap-1.5 min-h-0"><Send size={13}/>Send</button>
          </div>
        )}
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1 bg-surface-2 dark:bg-slate-800/50 rounded-3xl p-1.5">
        {steps.map((s, i) => {
          const done = s.n < step, active = s.n === step;
          return (
            <React.Fragment key={s.n}>
              <motion.button onClick={() => s.n <= (generated ? 4 : step) && setStep(s.n as Step)}
                whileTap={{ scale: 0.96 }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${active ? 'bg-white dark:bg-slate-900 shadow-sm text-ink dark:text-white' : done ? 'text-emerald-600' : 'text-ink-tertiary'}`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0 ${active ? 'bg-brand-600 text-white' : done ? 'bg-emerald-500 text-white' : 'bg-surface-3 dark:bg-slate-700 text-ink-tertiary'}`}>
                  {done ? <Check size={8}/> : s.n}
                </div>
                <span className="hidden sm:block">{s.label}</span>
              </motion.button>
              {i < 3 && <div className="w-1" />}
            </React.Fragment>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1 */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity:0,x:16 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-16 }} className="space-y-4">
            <p className="text-sm font-semibold text-ink-secondary">What type of proposal?</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {proposalTypes.map(t => (
                <motion.button key={t.id} onClick={() => setType(t.id)} whileTap={{ scale: 0.97 }}
                  className={`text-left p-4 rounded-3xl border-2 transition-all ${type===t.id ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-900/10' : 'border-surface-3 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <p className="text-xs font-bold text-ink dark:text-white mb-0.5">{t.label}</p>
                  <p className="text-[10px] text-ink-tertiary leading-tight">{t.desc}</p>
                  {type===t.id && <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-brand-600"><Check size={10}/>Selected</div>}
                </motion.button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary w-full gap-2">Continue <ArrowRight size={15}/></button>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity:0,x:16 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-16 }} className="space-y-4">
            <Card>
              <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Project Brief</h3>
              <div className="space-y-4">
                {[{l:'Client Name',k:'client'},{l:'Project Name',k:'project'},{l:'Budget',k:'budget',p:'₹15,00,000'},{l:'Timeline',k:'timeline',p:'8 weeks'}].map(f=>(
                  <div key={f.k}><label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.l}</label><input value={(form as any)[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} placeholder={(f as any).p||''} className="field" /></div>
                ))}
                <div><label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Project Brief</label><textarea value={form.brief} onChange={e=>setForm({...form,brief:e.target.value})} rows={3} className="field resize-none" /></div>
              </div>
            </Card>
            <div className="card p-4 border-brand-100 dark:border-brand-800/40 bg-brand-50/30 dark:bg-brand-900/10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0"><Sparkles size={14} className="text-white"/></div>
                <div>
                  <p className="text-sm font-bold text-ink dark:text-white mb-2">AI will generate {aiSections.length} sections</p>
                  <div className="flex flex-wrap gap-1.5">{aiSections.map(s=><span key={s} className="text-[10px] bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 px-2 py-0.5 rounded-full font-semibold">{s}</span>)}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary flex-shrink-0 h-12 px-5 min-h-0">Back</button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleGenerate} disabled={gen} className="btn-primary flex-1 h-12 gap-2 min-h-0">
                {gen ? <><Loader size={15} className="animate-spin"/>Generating...</> : <><Sparkles size={15}/>Generate with AI</>}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && generated && (
          <motion.div key="s3" initial={{ opacity:0,x:16 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-16 }} className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-200 dark:border-emerald-800/40">
              <div className="w-9 h-9 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"><Check size={16} className="text-white"/></div>
              <div className="flex-1"><p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Generated!</p><p className="text-xs text-emerald-600">8 sections · 2,400 words</p></div>
              <button onClick={() => setStep(4)} className="btn-primary text-xs h-9 px-3 min-h-0 gap-1">Edit <ArrowRight size={12}/></button>
            </div>
            <Card className="shadow-lg">
              <div className="flex items-start justify-between pb-5 mb-5 border-b border-surface-3 dark:border-slate-800">
                <div><h2 className="text-lg font-black text-ink dark:text-white mb-0.5">{form.project}</h2><p className="text-sm text-ink-secondary">For {form.client}</p></div>
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md"><Sparkles size={14} className="text-white"/></div>
              </div>
              {[
                { t:'Executive Summary', c:`We are delighted to present this comprehensive proposal for ${form.project}. Our vision seamlessly blends functionality with aesthetic excellence.` },
                { t:'Design Concept', c:'Drawing from Japanese "Ma" — the art of negative space — we propose clean lines, natural textures, and biophilic elements to inspire creativity.' },
              ].map(s=>(
                <div key={s.t} className="mb-5">
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-1.5">{s.t}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{s.c}</p>
                </div>
              ))}
              <div className="bg-surface-1 dark:bg-slate-800 rounded-2xl p-4">
                <p className="section-label mb-3">Investment Summary</p>
                {[['Design & Consultation','₹2,50,000'],['Furniture & Fixtures','₹7,80,000'],['Materials & Finishes','₹3,20,000'],['Installation','₹1,50,000']].map(r=>(
                  <div key={r[0]} className="flex justify-between text-sm py-1.5"><span className="text-ink-secondary">{r[0]}</span><span className="font-bold text-ink dark:text-slate-200">{r[1]}</span></div>
                ))}
                <div className="flex justify-between text-sm font-black pt-2.5 mt-1 border-t border-surface-3 dark:border-slate-700"><span>Total</span><span className="text-brand-600">{form.budget}</span></div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity:0,x:16 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-16 }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-3">
                {aiSections.map(s => (
                  <Card key={s} padding="sm">
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-sm font-bold text-ink dark:text-white">{s}</h3>
                      <button className="flex items-center gap-1 text-xs font-bold text-brand-600"><Sparkles size={11}/>AI Rewrite</button>
                    </div>
                    <textarea rows={3} className="field resize-none" placeholder="Edit or rewrite with AI..." />
                  </Card>
                ))}
              </div>
              <div className="space-y-4">
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-3">Sections</h3>
                  <div className="space-y-2">{aiSections.map(s=><label key={s} className="flex items-center gap-2.5 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-brand-600"/><span className="text-sm text-ink-secondary">{s}</span></label>)}</div>
                </Card>
                <button className="btn-primary w-full gap-2"><Download size={14}/>Export PDF</button>
                <button className="btn-secondary w-full gap-2" onClick={() => onNavigate('clients')}><Send size={14}/>Send to Client</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

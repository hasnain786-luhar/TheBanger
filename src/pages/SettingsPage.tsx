import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, CreditCard, Palette, FileSignature, Globe,
  Shield, Upload, Check, Trash2, ChevronRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';

type Tab = 'company' | 'billing' | 'brand' | 'signature' | 'integrations' | 'security';

const tabs: { id: Tab; label: string; icon: typeof Building2; desc: string }[] = [
  { id: 'company',      label: 'Company',       icon: Building2,     desc: 'Studio details' },
  { id: 'billing',      label: 'GST & Billing', icon: CreditCard,    desc: 'Tax & bank info' },
  { id: 'brand',        label: 'Brand',         icon: Palette,       desc: 'Colors & fonts' },
  { id: 'signature',    label: 'Signature',     icon: FileSignature, desc: 'Digital sign' },
  { id: 'integrations', label: 'Integrations',  icon: Globe,         desc: 'Apps' },
  { id: 'security',     label: 'Security',      icon: Shield,        desc: 'Account safety' },
];

function SaveBtn() {
  const [saved, setSaved] = useState(false);
  return (
    <motion.button whileTap={{ scale: 0.97 }}
      onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2200); }}
      className={`btn-primary w-full sm:w-auto gap-2 ${saved ? '!from-emerald-500 !to-emerald-600' : ''}`}>
      {saved ? <><Check size={14}/>Saved!</> : 'Save Changes'}
    </motion.button>
  );
}

export function SettingsPage() {
  const [activeTab, setTab] = useState<Tab>('company');
  const [company, setCompany] = useState({ name: 'Riya Desai Interiors', email: 'riya@desaiinteriors.com', phone: '+91 98765 43210', website: 'www.desaiinteriors.com', address: '42 Design Hub, Bandra West, Mumbai 400050', city: 'Mumbai', state: 'Maharashtra', pincode: '400050' });
  const [billing, setBilling] = useState({ gstin: '27AABCU9603R1ZX', pan: 'AABCU9603R', bankName: 'HDFC Bank', accountName: 'Riya Desai Interiors', accountNumber: '50100412345678', ifsc: 'HDFC0001234', upiId: 'riya@hdfc', defaultGst: '18' });
  const [brand, setBrand]     = useState({ primary: '#2563EB', accent: '#059669', font: 'Plus Jakarta Sans' });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-ink dark:text-white">Settings</h2>
        <p className="text-xs text-ink-tertiary mt-0.5">Workspace preferences</p>
      </div>

      {/* Mobile: horizontal scroll tabs. Desktop: sidebar grid */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-6">
        {/* Tab list */}
        <div className="lg:col-span-1">
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 mb-4 lg:hidden">
            {tabs.map(tab => (
              <motion.button key={tab.id} onClick={() => setTab(tab.id)} whileTap={{ scale: 0.94 }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${activeTab===tab.id ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'bg-white dark:bg-slate-900 text-ink-secondary border border-surface-3 dark:border-slate-700'}`}>
                <tab.icon size={13} />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Desktop: vertical nav */}
          <Card padding="sm" className="hidden lg:block h-fit">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <motion.button key={tab.id} onClick={() => setTab(tab.id)} whileTap={{ scale: 0.97 }}
                  className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-left transition-all ${activeTab===tab.id ? 'text-brand-700 dark:text-brand-400' : 'text-ink-secondary hover:bg-surface-2 dark:hover:bg-slate-800'}`}>
                  {activeTab===tab.id && <motion.div layoutId="settingsTab" className="absolute inset-0 bg-brand-50 dark:bg-brand-900/20 rounded-2xl" transition={{ type:'spring', bounce:0.2 }} />}
                  <div className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${activeTab===tab.id ? 'bg-brand-100 dark:bg-brand-900/30' : 'bg-surface-2 dark:bg-slate-800'}`}>
                    <tab.icon size={14} className={activeTab===tab.id ? 'text-brand-600' : 'text-ink-tertiary'} />
                  </div>
                  <div className="relative z-10 min-w-0">
                    <p className="text-sm font-semibold truncate">{tab.label}</p>
                    <p className="text-xs text-ink-tertiary truncate">{tab.desc}</p>
                  </div>
                </motion.button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'company' && (
              <motion.div key="company" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }} className="space-y-4">
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Logo</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-2xl font-black shadow-lg flex-shrink-0">R</div>
                    <div>
                      <button className="btn-secondary text-sm gap-2 mb-1.5"><Upload size={13}/>Upload Logo</button>
                      <p className="text-xs text-ink-tertiary">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Company Info</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Studio Name', key: 'name' },
                      { label: 'Email', key: 'email', type: 'email' },
                      { label: 'Phone', key: 'phone' },
                      { label: 'Website', key: 'website' },
                      { label: 'City', key: 'city' },
                      { label: 'State', key: 'state' },
                      { label: 'PIN Code', key: 'pincode' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.label}</label>
                        <input type={f.type||'text'} value={(company as any)[f.key]} onChange={e => setCompany({...company,[f.key]:e.target.value})} className="field" />
                      </div>
                    ))}
                    <div>
                      <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Address</label>
                      <textarea value={company.address} onChange={e => setCompany({...company,address:e.target.value})} rows={2} className="field resize-none" />
                    </div>
                  </div>
                  <div className="mt-5"><SaveBtn /></div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div key="billing" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }} className="space-y-4">
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">GST Details</h3>
                  <div className="space-y-4">
                    {[{label:'GSTIN',key:'gstin'},{label:'PAN',key:'pan'}].map(f=>(
                      <div key={f.key}><label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.label}</label><input value={(billing as any)[f.key]} onChange={e=>setBilling({...billing,[f.key]:e.target.value})} className="field font-mono" /></div>
                    ))}
                    <div>
                      <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">Default GST Rate</label>
                      <select value={billing.defaultGst} onChange={e=>setBilling({...billing,defaultGst:e.target.value})} className="field">{['0','5','12','18','28'].map(r=><option key={r} value={r}>{r}%</option>)}</select>
                    </div>
                  </div>
                </Card>
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Bank Details</h3>
                  <div className="space-y-4">
                    {[{l:'Bank Name',k:'bankName'},{l:'Account Name',k:'accountName'},{l:'Account Number',k:'accountNumber'},{l:'IFSC',k:'ifsc'},{l:'UPI ID',k:'upiId'}].map(f=>(
                      <div key={f.k}><label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{f.l}</label><input value={(billing as any)[f.k]} onChange={e=>setBilling({...billing,[f.k]:e.target.value})} className="field" /></div>
                    ))}
                  </div>
                  <div className="mt-5"><SaveBtn /></div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'brand' && (
              <motion.div key="brand" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }} className="space-y-4">
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Brand Colors</h3>
                  <div className="space-y-4 mb-5">
                    {[{label:'Primary',key:'primary',val:brand.primary},{label:'Accent',key:'accent',val:brand.accent}].map(f=>(
                      <div key={f.key}>
                        <label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-2">{f.label}</label>
                        <div className="flex items-center gap-3">
                          <input type="color" value={f.val} onChange={e=>setBrand({...brand,[f.key]:e.target.value})} className="w-12 h-12 rounded-2xl border border-surface-3 cursor-pointer p-1 flex-shrink-0" />
                          <input value={f.val} onChange={e=>setBrand({...brand,[f.key]:e.target.value})} className="field font-mono flex-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {['#2563EB','#059669','#DC2626','#D97706','#0891B2','#7C3AED','#BE185D','#1D4ED8','#374151','#0F172A'].map(c=>(
                      <motion.button key={c} whileTap={{ scale:0.9 }} onClick={()=>setBrand({...brand,primary:c})} className={`h-10 rounded-2xl border-2 ${brand.primary===c?'border-ink dark:border-white ring-2 ring-offset-2 ring-slate-400':'border-transparent'}`} style={{backgroundColor:c}} />
                    ))}
                  </div>
                  <div className="mt-5"><SaveBtn /></div>
                </Card>
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Font</h3>
                  <div className="space-y-2.5">
                    {[{n:'Plus Jakarta Sans',d:'Modern & Geometric'},{n:'Playfair Display',d:'Elegant & Classic'},{n:'DM Sans',d:'Friendly & Minimal'}].map(f=>(
                      <motion.button key={f.n} whileTap={{scale:0.97}} onClick={()=>setBrand({...brand,font:f.n})}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${brand.font===f.n?'border-brand-600 bg-brand-50/50 dark:bg-brand-900/10':'border-surface-3 dark:border-slate-700'}`}>
                        <div className="text-left"><p className="text-sm font-bold text-ink dark:text-white">{f.n}</p><p className="text-xs text-ink-tertiary">{f.d}</p></div>
                        {brand.font===f.n && <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center"><Check size={11} className="text-white"/></div>}
                      </motion.button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'signature' && (
              <motion.div key="sig" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }}>
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-1">Digital Signature</h3>
                  <p className="text-xs text-ink-tertiary mb-5">Appears on all quotes and proposals.</p>
                  <div className="border-2 border-dashed border-surface-3 dark:border-slate-700 rounded-3xl h-40 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-300 transition-colors mb-5">
                    <div className="w-12 h-12 rounded-3xl bg-surface-2 dark:bg-slate-800 flex items-center justify-center"><FileSignature size={22} className="text-ink-tertiary" /></div>
                    <div className="text-center"><p className="text-sm font-semibold text-ink-secondary">Draw or upload signature</p><p className="text-xs text-ink-tertiary mt-0.5">PNG transparent background</p></div>
                    <button className="btn-secondary text-sm gap-2 min-h-0 h-10"><Upload size={13}/>Upload</button>
                  </div>
                  <SaveBtn />
                </Card>
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div key="int" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }} className="space-y-3">
                {[{n:'Gmail',d:'Send quotes via Gmail',c:true,i:'📧'},{n:'WhatsApp Business',d:'Share via WhatsApp',c:false,i:'💬'},{n:'Google Drive',d:'Auto-save PDFs',c:true,i:'📁'},{n:'Notion',d:'Sync clients to Notion',c:false,i:'📝'}].map(int=>(
                  <Card key={int.n} className="flex items-center justify-between p-4 sm:p-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-surface-2 dark:bg-slate-800 flex items-center justify-center text-xl flex-shrink-0">{int.i}</div>
                      <div><p className="text-sm font-bold text-ink dark:text-white">{int.n}</p><p className="text-xs text-ink-tertiary">{int.d}</p></div>
                    </div>
                    <button className={`px-3 sm:px-4 py-2 rounded-2xl text-xs font-bold transition-all min-h-0 flex-shrink-0 ${int.c?'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20':'btn-secondary min-h-0 h-9'}`}>
                      {int.c?'✓ Connected':'Connect'}
                    </button>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div key="sec" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }} className="space-y-4">
                <Card>
                  <h3 className="text-sm font-bold text-ink dark:text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    {['Current Password','New Password','Confirm Password'].map(l=>(
                      <div key={l}><label className="text-sm font-semibold text-ink dark:text-slate-200 block mb-1.5">{l}</label><input type="password" placeholder="••••••••" className="field" /></div>
                    ))}
                  </div>
                  <div className="mt-5"><SaveBtn /></div>
                </Card>
                <Card>
                  <div className="flex items-center justify-between">
                    <div><h3 className="text-sm font-bold text-ink dark:text-white">Two-Factor Auth</h3><p className="text-xs text-ink-tertiary mt-0.5">Extra security layer</p></div>
                    <button className="btn-secondary text-sm min-h-0 h-10 px-4">Enable 2FA</button>
                  </div>
                </Card>
                <Card className="border-danger/20">
                  <h3 className="text-sm font-bold text-danger mb-2">Danger Zone</h3>
                  <p className="text-xs text-ink-tertiary mb-4">Permanent and irreversible.</p>
                  <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-danger border border-danger/30 rounded-2xl hover:bg-danger/5 transition-colors"><Trash2 size={14}/>Delete Account</button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import sys

def main():
    with open('src/App.tsx', 'r') as f:
        content = f.read()

    insertion = """
                  {/* ── CONDITIONAL RENDER: CARTÕES DE BENEFÍCIOS FIELDS ── */}
                  {state.modelo === 'cartoesBeneficios' && (
                    <div className="space-y-3.5 border-t border-slate-150 pt-3">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs mb-1">
                        <FileText className="w-4 h-4 text-[#f37021]" />
                        <span>Termo de Cartões de Benefícios</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Número do Cartão Vale Transporte</label>
                        <input
                          type="text"
                          value={state.numCartaoVt}
                          onChange={(e) => updateField('numCartaoVt', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50 focus:border-[#f37021] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Recebeu Vale Transporte?</label>
                        <select
                          value={state.recebeuVt}
                          onChange={(e) => updateField('recebeuVt', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50 focus:border-[#f37021] transition-all"
                        >
                          <option value="SIM">SIM</option>
                          <option value="NÃO">NÃO</option>
                          <option value="">-</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Recebeu Mobilidade?</label>
                        <select
                          value={state.recebeuMobilidade}
                          onChange={(e) => updateField('recebeuMobilidade', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50 focus:border-[#f37021] transition-all"
                        >
                          <option value="SIM">SIM</option>
                          <option value="NÃO">NÃO</option>
                          <option value="">-</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Recebeu Alimentação/Desjejum?</label>
                        <select
                          value={state.recebeuAlimentacao}
                          onChange={(e) => updateField('recebeuAlimentacao', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#f37021]/50 focus:border-[#f37021] transition-all"
                        >
                          <option value="SIM">SIM</option>
                          <option value="NÃO">NÃO</option>
                          <option value="">-</option>
                        </select>
                      </div>
                    </div>
                  )}
"""

    if "state.modelo === 'cartoesBeneficios'" not in content:
        content = content.replace("                  {/* ── ACTION BUTTONS ── */}", insertion + "\n                  {/* ── ACTION BUTTONS ── */}")

    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("App patched")

if __name__ == '__main__':
    main()

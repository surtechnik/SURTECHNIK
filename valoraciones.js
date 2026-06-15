const VT_CATALOG = [
  { id:'diagnostico', title:'Diagnostico y actuacion urgente', icon:'fa-stethoscope', items:[
    ['Revision inicial de averia y prueba de maniobra', 35], ['Apertura manual y desbloqueo de emergencia', 45], ['Puerta bloqueada por obstaculo o descarrilamiento', 65], ['Localizacion de fallo electrico intermitente', 60], ['Reprogramacion basica tras corte electrico', 35], ['Retirada temporal de puerta fuera de servicio', 80], ['Informe fotografico de danos para cliente/seguro', 45]
  ]},
  { id:'instalacion', title:'Instalacion nueva y puesta en marcha', icon:'fa-trowel-bricks', items:[
    ['Medicion tecnica de hueco y replanteo', 35], ['Instalacion de puerta seccional residencial', 420], ['Instalacion de puerta corredera metalica', 360], ['Instalacion de puerta batiente de una hoja', 320], ['Instalacion de puerta batiente de dos hojas', 480], ['Instalacion de cierre enrollable', 390], ['Instalacion de puerta rapida de lona', 780], ['Instalacion de barrera automatica', 360], ['Motorizacion de puerta manual existente', 280], ['Acometida electrica y canalizacion basica', 120], ['Puesta en marcha, programacion y pruebas finales', 90], ['Entrega de instrucciones, seguridad y registro', 45]
  ]},
  { id:'mecanica', title:'Mecanica, estructura y movimiento', icon:'fa-gears', items:[
    ['Ajuste de guias laterales', 55], ['Sustitucion de ruedas / rodamientos', 75], ['Sustitucion de bisagras', 60], ['Alineacion de hoja corredera', 85], ['Reparacion de descuadre o roce', 75], ['Sustitucion de cables de acero', 95], ['Sustitucion o ajuste de muelles de torsion', 140], ['Sustitucion de poleas', 80], ['Sustitucion de eje', 180], ['Sustitucion de panel seccional', 150], ['Sustitucion de lama de cierre enrollable', 65], ['Sustitucion de cerradura o desbloqueo', 55], ['Soldadura de soporte, anclaje o pletina', 70], ['Instalacion de topes mecanicos', 45], ['Engrase y lubricacion tecnica', 35]
  ]},
  { id:'motor', title:'Motor y transmision', icon:'fa-bolt', items:[
    ['Sustitucion de motor de techo', 220], ['Sustitucion de motor corredera', 260], ['Sustitucion de motor batiente', 240], ['Sustitucion de motor eje/enrollable', 230], ['Sustitucion de condensador', 45], ['Reparacion de final de carrera', 60], ['Ajuste de finales de carrera', 45], ['Sustitucion de encoder / sensor de giro', 85], ['Sustitucion de pinon o corona', 75], ['Sustitucion de cremallera', 95], ['Ajuste de fuerza, par y paro suave', 55], ['Instalacion de bateria de respaldo', 115], ['Revision de desbloqueo manual del motor', 35]
  ]},
  { id:'cuadro', title:'Cuadro electrico, cableado y control', icon:'fa-microchip', items:[
    ['Sustitucion de cuadro de maniobras', 180], ['Reparacion de placa electronica', 120], ['Sustitucion de receptor radio', 75], ['Programacion de cuadro', 55], ['Sustitucion de transformador/fuente', 85], ['Sustitucion de rele, fusible o bornero', 45], ['Revision de cableado y continuidad', 65], ['Canalizacion y saneado de cableado', 90], ['Proteccion electrica y magnetotermico', 85], ['Instalacion de pulsador interior', 45], ['Instalacion de selector de llave', 65], ['Configuracion de cierre automatico', 35]
  ]},
  { id:'seguridad', title:'Seguridad y normativa', icon:'fa-shield-halved', items:[
    ['Instalacion de fotocelulas', 85], ['Sustitucion de fotocelulas', 75], ['Alineacion y prueba de fotocelulas', 35], ['Instalacion de banda sensible', 140], ['Sustitucion de goma conductiva en banda', 95], ['Instalacion de luz intermitente', 55], ['Instalacion de seta de emergencia', 65], ['Instalacion de lazo magnetico', 180], ['Comprobacion de inversion por obstaculo', 35], ['Prueba de limitacion de fuerza', 45], ['Contacto de seguridad en portillo peatonal', 75], ['Paracaidas / sistema anticaida', 160], ['Senalizacion adhesiva de seguridad', 25], ['Informe de mejora de seguridad', 60]
  ]},
  { id:'accesos', title:'Mandos, radio y control de accesos', icon:'fa-walkie-talkie', items:[
    ['Alta y programacion de mando', 20], ['Copia de mando compatible', 35], ['Sustitucion de receptor exterior', 85], ['Instalacion de teclado numerico', 75], ['Instalacion de control GSM / apertura por llamada', 160], ['Instalacion de modulo WiFi/app', 95], ['Programacion de tarjetas o tags', 25], ['Baja de mandos perdidos', 35], ['Revision de alcance de antena', 35], ['Instalacion de antena exterior', 45], ['Integracion con portero automatico', 110]
  ]},
  { id:'mantenimiento', title:'Mantenimiento preventivo', icon:'fa-calendar-check', items:[
    ['Mantenimiento periodico basico', 75], ['Mantenimiento completo comunidad', 120], ['Limpieza de guias y zona de rodadura', 30], ['Reapriete de tornilleria y soportes', 35], ['Equilibrado de puerta seccional/basculante', 75], ['Revision de holguras y desgaste', 45], ['Prueba de maniobra manual', 30], ['Prueba de seguridades instaladas', 45], ['Registro de actuacion en libro de mantenimiento', 25], ['Plan de mantenimiento anual', 0]
  ]},
  { id:'acabados', title:'Acabados, cerrajeria y obra auxiliar', icon:'fa-brush', items:[
    ['Reparacion de oxido y saneado basico', 90], ['Pintura parcial de hoja o bastidor', 120], ['Remates de chapa o tapajuntas', 70], ['Sellado perimetral', 45], ['Sustitucion de burletes', 55], ['Reposicion de tornilleria inoxidable', 35], ['Retirada de material antiguo', 60], ['Uso de plataforma/elevador', 120], ['Trabajo de cerrajeria a medida', 150]
  ]}
];

let vtSelected = [];
let vtCurrentClientId = '';

function vtMoney(value) {
  return `${(Number(value) || 0).toFixed(2).replace('.', ',')} EUR`;
}

function vtEscape(value) {
  return String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
}

function vtPopulateClientList() {
  const list = document.getElementById('vt-client-list');
  if (!list || !window.state && typeof state === 'undefined') return;
  list.innerHTML = (state.clients || []).map(c => `<option value="${vtEscape(c.name)} (${vtEscape(c.cif || '')})"></option>`).join('');
}

function vtSelectClientFromInput() {
  const value = document.getElementById('vt-client-search').value.toLowerCase();
  const client = (state.clients || []).find(c => `${c.name || ''} (${c.cif || ''})`.toLowerCase() === value);
  if (client) {
    vtCurrentClientId = client.id;
    if (!document.getElementById('vt-site-address').value) document.getElementById('vt-site-address').value = client.address || '';
  }
}

function vtRenderBlocks() {
  const container = document.getElementById('vt-blocks-container');
  if (!container) return;
  container.innerHTML = VT_CATALOG.map(block => `
    <details class="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <summary class="cursor-pointer px-5 py-4 font-bold flex items-center gap-3 bg-white hover:bg-slate-50">
        <i class="fa-solid ${block.icon} text-cyan-600"></i>${block.title}
        <span class="ml-auto text-xs text-slate-400">${block.items.length} trabajos</span>
      </summary>
      <div class="divide-y divide-slate-100">
        ${block.items.map((item, idx) => `
          <div class="px-5 py-3 flex flex-col md:flex-row md:items-center gap-3">
            <div class="flex-1">
              <p class="font-medium text-sm">${vtEscape(item[0])}</p>
              <p class="text-xs text-slate-500">Precio base orientativo: ${vtMoney(item[1])}</p>
            </div>
            <button onclick="vtAddItem('${block.id}', ${idx})" class="bg-cyan-50 hover:bg-cyan-100 text-cyan-800 px-3 py-2 rounded-lg text-sm font-semibold">
              <i class="fa-solid fa-plus mr-2"></i>Anadir
            </button>
          </div>`).join('')}
      </div>
    </details>`).join('');
}

function vtCloseBlocks() {
  document.querySelectorAll('#vt-blocks-container details').forEach(block => {
    block.open = false;
  });
}

function vtAddItem(blockId, index) {
  const block = VT_CATALOG.find(b => b.id === blockId);
  const item = block.items[index];
  vtSelected.push({
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    block: block.title,
    desc: item[0],
    qty: 1,
    price: item[1],
    status: document.getElementById('vt-mode').value === 'presupuesto' ? 'Presupuestado' : 'Realizado',
    note: ''
  });
  vtRenderSelection();
}

function vtTotals() {
  const subtotal = vtSelected.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);
  const labor = Number(document.getElementById('vt-labor-cost')?.value) || 0;
  const travel = Number(document.getElementById('vt-travel-cost')?.value) || 0;
  const taxRate = Number(document.getElementById('vt-tax-rate')?.value) || 0;
  const base = subtotal + labor + travel;
  const tax = base * taxRate / 100;
  return { subtotal, labor, travel, taxRate, base, tax, total: base + tax };
}

function vtRenderSelection() {
  const list = document.getElementById('vt-selected-list');
  if (!list) return;
  if (!vtSelected.length) {
    list.innerHTML = '<p class="text-sm text-slate-500 bg-white rounded-lg p-4 border border-slate-200">Selecciona trabajos desde los bloques tecnicos.</p>';
  } else {
    list.innerHTML = vtSelected.map((it, idx) => `
      <div class="border border-slate-200 bg-white rounded-lg p-3">
        <div class="flex justify-between gap-2">
          <div><p class="font-semibold text-sm">${vtEscape(it.desc)}</p><p class="text-xs text-slate-500">${vtEscape(it.block)}</p></div>
          <button onclick="vtSelected.splice(${idx},1); vtRenderSelection()" class="text-rose-500"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-3">
          <input type="number" min="0" step="0.01" value="${it.qty}" onchange="vtSelected[${idx}].qty=this.value; vtRenderSelection()" class="border border-slate-200 rounded px-2 py-1 text-sm" title="Cantidad">
          <input type="number" step="0.01" value="${it.price}" onchange="vtSelected[${idx}].price=this.value; vtRenderSelection()" class="border border-slate-200 rounded px-2 py-1 text-sm" title="Precio">
          <select onchange="vtSelected[${idx}].status=this.value; vtRenderSelection()" class="border border-slate-200 rounded px-2 py-1 text-sm bg-white">
            ${['Realizado','Pendiente','Presupuestado','Recomendado','No procede','Requiere material'].map(s => `<option ${it.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
        <input value="${vtEscape(it.note)}" onchange="vtSelected[${idx}].note=this.value" class="mt-2 w-full border border-slate-200 rounded px-2 py-1 text-sm" placeholder="Notas, material, medidas, referencia...">
      </div>`).join('');
  }
  const totals = vtTotals();
  document.getElementById('vt-subtotal').textContent = vtMoney(totals.subtotal);
  document.getElementById('vt-total').textContent = vtMoney(totals.total);
}

function vtClient() {
  const found = (state.clients || []).find(c => c.id === vtCurrentClientId);
  if (found) return found;
  const name = (document.getElementById('vt-client-search').value || '').replace(/\s*\([^)]*\)\s*$/, '');
  return { id:'', name, cif:'', email:'', phone:'', address:'' };
}

function vtBuildRecord(modeOverride) {
  const totals = vtTotals();
  return {
    id: `vt_${Date.now()}`,
    date: document.getElementById('vt-date').value,
    mode: modeOverride || document.getElementById('vt-mode').value,
    client: vtClient(),
    siteAddress: document.getElementById('vt-site-address').value,
    doorType: document.getElementById('vt-door-type').value,
    priority: document.getElementById('vt-priority').value,
    issue: document.getElementById('vt-issue').value,
    items: vtSelected.map(x => ({...x})),
    ...totals
  };
}

function vtSaveRecord() {
  const rec = vtBuildRecord();
  if (!rec.client.name) return showToast('Selecciona o crea un cliente', 'warning');
  if (!rec.items.length) return showToast('Anade al menos un trabajo', 'warning');
  if (!state.valoraciones) state.valoraciones = [];
  state.valoraciones.unshift(rec);
  saveToLocalStorage();
  vtRenderHistory();
  showToast('Registro tecnico guardado', 'success');
}

function vtDocTitle(mode) {
  if (mode === 'presupuesto') return 'Presupuesto de reparacion / mantenimiento';
  if (mode === 'valoracion') return 'Valoracion tecnica de instalacion';
  return 'Parte de actuacion tecnica';
}

function vtDocumentHTML(mode) {
  const rec = vtBuildRecord(mode);
  const rows = rec.items.map(it => `
    <tr>
      <td>${vtEscape(it.block)}</td>
      <td><strong>${vtEscape(it.desc)}</strong>${it.note ? `<br><small>${vtEscape(it.note)}</small>` : ''}</td>
      <td>${vtEscape(it.status)}</td>
      <td style="text-align:right">${it.qty}</td>
      <td style="text-align:right">${vtMoney(it.price)}</td>
      <td style="text-align:right">${vtMoney((Number(it.qty)||0)*(Number(it.price)||0))}</td>
    </tr>`).join('');
  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;padding:28px;background:white;">
      <div style="display:flex;justify-content:space-between;gap:24px;border-bottom:3px solid #0891b2;padding-bottom:16px;">
        <div><h1 style="margin:0;font-size:26px;">${vtEscape(state.config.name || 'SURTECHNIK')}</h1><p style="margin:6px 0 0;color:#475569;">${vtEscape(state.config.cif || '')} - ${vtEscape(state.config.phone || '')} - ${vtEscape(state.config.email || '')}</p></div>
        <div style="text-align:right;"><h2 style="margin:0;font-size:20px;color:#0891b2;">${vtDocTitle(rec.mode)}</h2><p style="margin:6px 0 0;">Fecha: ${vtEscape(rec.date || '')}</p></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px;">
        <div style="background:#f8fafc;padding:14px;border:1px solid #e2e8f0;"><h3 style="margin:0 0 8px;">Cliente</h3><p style="margin:0;"><strong>${vtEscape(rec.client.name || '')}</strong><br>${vtEscape(rec.client.cif || '')}<br>${vtEscape(rec.client.address || '')}<br>${vtEscape(rec.client.phone || '')} ${vtEscape(rec.client.email || '')}</p></div>
        <div style="background:#f8fafc;padding:14px;border:1px solid #e2e8f0;"><h3 style="margin:0 0 8px;">Instalacion</h3><p style="margin:0;"><strong>${vtEscape(rec.doorType)}</strong><br>${vtEscape(rec.siteAddress || '')}<br>Prioridad: ${vtEscape(rec.priority)}</p></div>
      </div>
      <h3 style="margin:20px 0 8px;">Incidencia / necesidad</h3><p style="border:1px solid #e2e8f0;padding:12px;background:#fff;">${vtEscape(rec.issue || '')}</p>
      <h3 style="margin:20px 0 8px;">Trabajos y materiales</h3>
      <table style="width:100%;border-collapse:collapse;font-size:12px;"><thead><tr style="background:#0f172a;color:white;"><th style="text-align:left;padding:8px;">Bloque</th><th style="text-align:left;padding:8px;">Concepto</th><th style="text-align:left;padding:8px;">Estado</th><th style="text-align:right;padding:8px;">Cant.</th><th style="text-align:right;padding:8px;">Precio</th><th style="text-align:right;padding:8px;">Importe</th></tr></thead><tbody>${rows || '<tr><td colspan="6" style="padding:8px;">Sin trabajos seleccionados</td></tr>'}</tbody></table>
      <div style="margin-left:auto;margin-top:16px;width:280px;border:1px solid #e2e8f0;padding:12px;">
        <p style="display:flex;justify-content:space-between;margin:4px 0;"><span>Trabajos/materiales</span><strong>${vtMoney(rec.subtotal)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:4px 0;"><span>Mano de obra</span><strong>${vtMoney(rec.labor)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:4px 0;"><span>Desplazamiento</span><strong>${vtMoney(rec.travel)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:4px 0;"><span>IVA ${rec.taxRate}%</span><strong>${vtMoney(rec.tax)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:10px 0 0;font-size:18px;color:#0891b2;"><span>Total</span><strong>${vtMoney(rec.total)}</strong></p>
      </div>
      <div style="margin-top:28px;display:grid;grid-template-columns:1fr 1fr;gap:36px;"><div><p style="border-top:1px solid #94a3b8;padding-top:8px;">Firma tecnico</p></div><div><p style="border-top:1px solid #94a3b8;padding-top:8px;">Firma cliente / aceptacion</p></div></div>
      <p style="margin-top:18px;color:#64748b;font-size:11px;">Documento generado para valoracion, parte de reparacion/mantenimiento o presupuesto. Las actuaciones deben registrarse segun proceda en el libro de mantenimiento de la instalacion.</p>
    </div>`;
}

async function vtExportPDF(mode) {
  const filename = vtPdfFilename(mode);
  try {
    if (window.html2pdf) {
      const blob = await vtBuildPdfBlob(mode);
      vtDownloadBlob(blob, filename);
      showToast('PDF tecnico generado', 'success');
    } else {
      document.getElementById('print-area').innerHTML = vtDocumentHTML(mode);
      window.print();
    }
  } catch(err) {
    console.error(err);
    showToast('No se pudo generar el PDF tecnico', 'danger');
  }
}

function vtPdfFilename(mode) {
  return `SURTECHNIK_${mode}_${(vtClient().name || 'cliente').replace(/[^a-z0-9]/gi,'_')}_${new Date().toISOString().slice(0,10)}.pdf`;
}

async function vtBuildPdfBlob(mode) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = vtDocumentHTML(mode);
  document.body.appendChild(wrapper);
  try {
    return await html2pdf()
      .set({ margin: 6, image: { type:'jpeg', quality:0.98 }, html2canvas:{ scale:2 }, jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' } })
      .from(wrapper)
      .outputPdf('blob');
  } finally {
    wrapper.remove();
  }
}

function vtDownloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function vtExportExcel() {
  const rec = vtBuildRecord();
  const rows = rec.items.map(it => ({
    Fecha: rec.date, Cliente: rec.client.name, CIF: rec.client.cif, Instalacion: rec.doorType,
    Direccion: rec.siteAddress, Bloque: it.block, Concepto: it.desc, Estado: it.status,
    Cantidad: Number(it.qty)||0, Precio: Number(it.price)||0, Importe: (Number(it.qty)||0)*(Number(it.price)||0), Notas: it.note
  }));
  rows.push({ Concepto:'Mano de obra', Importe: rec.labor });
  rows.push({ Concepto:'Desplazamiento', Importe: rec.travel });
  rows.push({ Concepto:`IVA ${rec.taxRate}%`, Importe: rec.tax });
  rows.push({ Concepto:'TOTAL', Importe: rec.total });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'Valoracion');
  XLSX.writeFile(wb, `SURTECHNIK_Valoracion_${new Date().toISOString().slice(0,10)}.xlsx`);
  showToast('Excel tecnico generado', 'success');
}

async function vtSendEmail() {
  const rec = vtBuildRecord();
  const subject = `${vtDocTitle(rec.mode)} - ${rec.client.name || 'cliente'}`;
  
  // AQUÍ ESTÁ EL CAMBIO DE "LE ENVÍO" Y LOS ESPACIOS:
  const text = `Le envio el documento de SURTECHNIK para ${rec.doorType} en ${rec.siteAddress || 'su instalacion'}.\nTotal estimado: ${vtMoney(rec.total)}.\n\nUn saludo.`;
  
  // 1. FORZAR LA DESCARGA DIRECTA DEL PDF (Saltándonos el menú Compartir)
  if (typeof vtBuildPdfBlob === 'function') {
    try {
      const blob = await vtBuildPdfBlob(rec);
      const filename = `${vtDocTitle(rec.mode)}_${rec.client.name || 'cliente'}.pdf`.replace(/\s+/g, '_');
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch(e) {
      console.log("Error en descarga directa de PDF:", e);
    }
  }

  // 2. ABRIR EL GESTOR DE CORREO DIRECTAMENTE
  const shared = false; 
  if(!shared) {
    // AQUÍ TAMBIÉN AGREGAMOS UN SALTO DE LÍNEA PARA QUE NO SE PEGUE AL "UN SALUDO"
    const body = `${text}\n\n`;
    window.location.href = `mailto:${encodeURIComponent(rec.client.email || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

async function vtSendWhatsApp() {
  const rec = vtBuildRecord();
  
  // 1. Buscamos el teléfono en el campo de texto
  const el1 = document.getElementById('vt-client-phone');
  const el2 = document.getElementById('client-phone');
  const el3 = document.getElementById('vt-phone');
  
  let telefonoDetectado = "";
  if (el1) telefonoDetectado = el1.value;
  else if (el2) telefonoDetectado = el2.value;
  else if (el3) telefonoDetectado = el3.value;
  else if (rec.client && rec.client.phone) telefonoDetectado = rec.client.phone;

  // 2. Limpieza estricta del número para WhatsApp
  let phone = String(telefonoDetectado).replace(/[^0-9]/g, '');
  if (phone.length === 9 && (phone.startsWith('6') || phone.startsWith('7') || phone.startsWith('9'))) {
    phone = '34' + phone;
  }

  const subject = `${vtDocTitle(rec.mode)} - ${rec.client.name || 'cliente'}`;
  const text = `Hola ${rec.client.name || ''}, le envio el documento de SURTECHNIK para ${rec.doorType}. Total: ${vtMoney(rec.total)}.`;

  // 3. DESCARGA DIRECTA DEL PDF (Evitamos que se abra la ventana de compartir de Windows)
  if (typeof vtBuildPdfBlob === 'function') {
    try {
      const blob = await vtBuildPdfBlob(rec);
      const filename = `${vtDocTitle(rec.mode)}_${rec.client.name || 'cliente'}.pdf`.replace(/\s+/g, '_');
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch(e) {
      console.log("Error en descarga directa de PDF para WhatsApp:", e);
    }
  }

  // 4. ABRIMOS WHATSAPP DIRECTAMENTE CON EL TELÉFONO Y TEXTO
  const shared = false;
  if(!shared) {
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, '_blank');
  }
}

async function vtSharePdfFile(channel, title, text) {
  const mode = document.getElementById('vt-mode').value || 'parte';
  const filename = vtPdfFilename(mode);

  if(!window.html2pdf) {
    showToast('El generador PDF no esta disponible', 'danger');
    return false;
  }

  try {
    showToast('Generando PDF para enviar...', 'info');
    const blob = await vtBuildPdfBlob(mode);
    if(typeof File === 'function') {
      const file = new File([blob], filename, { type: 'application/pdf' });
      if(navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({ title, text, files: [file] });
        showToast('PDF compartido correctamente', 'success');
        return true;
      }
    }

    vtDownloadBlob(blob, filename);
    showToast('PDF descargado. Adjuntalo en el correo o WhatsApp.', 'warning');
    return false;
  } catch(err) {
    console.error(err);
    showToast(`No se pudo preparar el PDF para ${channel}`, 'danger');
    return false;
  }
}

function vtPrint() {
  document.getElementById('print-area').innerHTML = vtDocumentHTML(document.getElementById('vt-mode').value);
  window.print();
}

function vtRenderHistory() {
  const body = document.getElementById('vt-history-body');
  if (!body) return;
  const q = (document.getElementById('vt-history-search')?.value || '').toLowerCase();
  const records = (state.valoraciones || []).filter(r => JSON.stringify(r).toLowerCase().includes(q));
  body.innerHTML = records.map(r => `
    <tr>
      <td class="p-3">${r.date || ''}</td>
      <td class="p-3 font-semibold">${vtEscape(r.client?.name || '')}</td>
      <td class="p-3">${vtEscape(r.doorType || '')}</td>
      <td class="p-3">${vtEscape(r.mode || '')}</td>
      <td class="p-3 text-right font-bold">${vtMoney(r.total)}</td>
      <td class="p-3 text-right">
        <button onclick="vtLoadRecord('${r.id}')" class="text-cyan-700 mr-3" title="Cargar"><i class="fa-solid fa-pen"></i></button>
        <button onclick="vtDeleteRecord('${r.id}')" class="text-rose-600" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`).join('') || '<tr><td colspan="6" class="p-6 text-center text-slate-500">Sin registros todavia</td></tr>';
}

function vtLoadRecord(id) {
  const r = (state.valoraciones || []).find(x => x.id === id);
  if (!r) return;
  document.getElementById('vt-date').value = r.date || '';
  document.getElementById('vt-mode').value = r.mode || 'parte';
  vtCurrentClientId = r.client?.id || '';
  document.getElementById('vt-client-search').value = `${r.client?.name || ''} (${r.client?.cif || ''})`;
  document.getElementById('vt-site-address').value = r.siteAddress || '';
  document.getElementById('vt-door-type').value = r.doorType || 'Puerta seccional';
  document.getElementById('vt-priority').value = r.priority || 'Normal';
  document.getElementById('vt-issue').value = r.issue || '';
  document.getElementById('vt-labor-cost').value = r.labor || 0;
  document.getElementById('vt-travel-cost').value = r.travel || 0;
  document.getElementById('vt-tax-rate').value = r.taxRate ?? 21;
  vtSelected = (r.items || []).map(x => ({...x}));
  switchTab('valoraciones');
  vtRenderSelection();
}

function vtDeleteRecord(id) {
  if (!confirm('Eliminar este registro tecnico?')) return;
  state.valoraciones = (state.valoraciones || []).filter(r => r.id !== id);
  saveToLocalStorage();
  vtRenderHistory();
  showToast('Registro eliminado', 'info');
}

function vtClearForm() {
  if (!confirm('Limpiar la valoracion actual?')) return;
  vtSelected = [];
  vtCurrentClientId = '';
  ['vt-client-search','vt-site-address','vt-issue'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('vt-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('vt-labor-cost').value = 0;
  document.getElementById('vt-travel-cost').value = 0;
  vtRenderSelection();
}

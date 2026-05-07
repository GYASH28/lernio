/* Upload Notes Module */
const UploadNotes = {
  notes: [], currentFilter: 'all', currentSort: 'newest', searchQuery: '',
  _selectedFile: null, _pdfDoc: null,

  _uid() { return Auth.user ? Auth.user.id : null; },
  _db() { return window.firestoreDb; },
  _storage() { return window.firebaseStorage; },
  _genId() { return crypto.randomUUID ? crypto.randomUUID() : 'n' + Date.now() + Math.random().toString(36).slice(2,9); },
  _sanitize(s) { const d=document.createElement('div'); d.textContent=(s||'').slice(0,200); return d.innerHTML; },
  _fmtSize(b) { if(b<1024)return b+'B'; if(b<1048576)return (b/1024).toFixed(1)+'KB'; return (b/1048576).toFixed(1)+'MB'; },
  _fmtDate(ts) { if(!ts)return ''; const d=ts.toDate?ts.toDate():new Date(ts); return d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); },
  _typeIcon(t) { return t==='pdf'?'📄':t==='docx'?'📝':'🖼️'; },
  _subjects() { return SubjectRegistry.getAll().map(s=>({code:s.code,name:s.name})); },

  ALLOWED_MIME: {
    'application/pdf':'pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document':'docx',
    'image/jpeg':'image','image/png':'image','image/webp':'image'
  },

  renderSection() {
    const page = document.getElementById('page-notes');
    if(!page) return;
    let sec = document.getElementById('upload-notes-section');
    if(!sec) { sec = document.createElement('div'); sec.id='upload-notes-section'; sec.className='upload-notes-section'; page.appendChild(sec); }
    sec.innerHTML = `
      <div class="upload-notes-header">
        <h3>📂 My Uploaded Notes</h3>
        <button class="btn-add-notes" onclick="UploadNotes.openUploadModal()" aria-label="Add your notes">+ Add Your Notes</button>
      </div>
      <div class="upload-notes-controls">
        <div class="un-search-wrap"><span class="un-search-icon">🔍</span>
          <input class="un-search-input" placeholder="Search your notes by title or subject..." oninput="UploadNotes.handleSearch(this.value)" aria-label="Search notes"></div>
        <div class="un-filter-chips">
          <button class="un-chip active" onclick="UploadNotes.handleFilter('all',this)" aria-label="Show all">All</button>
          <button class="un-chip" onclick="UploadNotes.handleFilter('pdf',this)" aria-label="Filter PDF">PDF</button>
          <button class="un-chip" onclick="UploadNotes.handleFilter('docx',this)" aria-label="Filter Word">Word</button>
          <button class="un-chip" onclick="UploadNotes.handleFilter('image',this)" aria-label="Filter Images">Images</button>
        </div>
        <select class="un-sort-select" onchange="UploadNotes.handleSort(this.value)" aria-label="Sort notes">
          <option value="newest">Newest First</option><option value="oldest">Oldest First</option>
          <option value="az">A–Z</option><option value="size">Largest File</option>
        </select>
      </div>
      <div class="un-grid" id="un-grid"></div>`;
    this.fetchNotes();
  },

  renderSkeletons() {
    const g=document.getElementById('un-grid'); if(!g)return;
    g.innerHTML = Array(3).fill(`<div class="un-skeleton-card"><div class="un-skeleton-thumb"></div>
      <div class="un-skeleton-body"><div class="un-skeleton-line wide"></div><div class="un-skeleton-line narrow"></div></div></div>`).join('');
  },

  renderNotes() {
    const g=document.getElementById('un-grid'); if(!g)return;
    const list = this.getFilteredSorted();
    if(!list.length) {
      g.innerHTML = `<div class="un-empty-state"><div class="un-empty-icon">📂</div>
        <h4>${this.notes.length ? 'No notes match your filters' : "You haven't added any notes yet."}</h4>
        <p>${this.notes.length?'Try a different search or filter.':'Upload your first one!'}</p>
        ${!this.notes.length?'<button class="btn-add-notes" onclick="UploadNotes.openUploadModal()" aria-label="Upload notes">+ Upload Notes</button>':''}</div>`;
      return;
    }
    g.innerHTML = list.map((n,i) => `
      <div class="un-card" tabindex="0" data-id="${n.noteId}" style="animation-delay:${i*60}ms"
        onkeydown="UploadNotes.cardKey(event,'${n.noteId}')" aria-label="${this._sanitize(n.title)}">
        <div class="un-card-thumb">${n.fileType==='image'?`<img src="${n.fileUrl}" alt="${this._sanitize(n.title)}" loading="lazy">`
          :`<span class="un-type-icon">${this._typeIcon(n.fileType)}</span>`}</div>
        <div class="un-card-body">
          <div class="un-card-title" id="un-title-${n.noteId}">${this._sanitize(n.title)}</div>
          <div class="un-card-meta">
            <span class="un-subject-badge">${this._sanitize(n.subject)}</span>
            <span class="un-card-date">${this._fmtDate(n.uploadedAt)}</span>
            <span class="un-card-size">${this._fmtSize(n.fileSize)}</span>
          </div>
        </div>
        <div class="un-card-actions">
          <button class="un-action-btn" onclick="UploadNotes.openPreview('${n.noteId}')" aria-label="View">👁️ View</button>
          <button class="un-action-btn" onclick="UploadNotes.startRename('${n.noteId}')" aria-label="Rename">✏️ Rename</button>
          <button class="un-action-btn danger" onclick="UploadNotes.confirmDelete('${n.noteId}')" aria-label="Delete">🗑️ Delete</button>
        </div>
      </div>`).join('');
  },

  getFilteredSorted() {
    let r = [...this.notes];
    if(this.searchQuery) { const q=this.searchQuery.toLowerCase(); r=r.filter(n=>(n.title||'').toLowerCase().includes(q)||(n.subject||'').toLowerCase().includes(q)); }
    if(this.currentFilter!=='all') r=r.filter(n=>n.fileType===this.currentFilter);
    switch(this.currentSort) {
      case 'oldest': r.sort((a,b)=>(a.uploadedAt?.toMillis?.()||0)-(b.uploadedAt?.toMillis?.()||0)); break;
      case 'az': r.sort((a,b)=>(a.title||'').localeCompare(b.title||'')); break;
      case 'size': r.sort((a,b)=>(b.fileSize||0)-(a.fileSize||0)); break;
      default: r.sort((a,b)=>(b.uploadedAt?.toMillis?.()||0)-(a.uploadedAt?.toMillis?.()||0));
    }
    return r;
  },

  handleSearch(q) { this.searchQuery=q; this.renderNotes(); },
  handleFilter(f,btn) { this.currentFilter=f; document.querySelectorAll('.un-chip').forEach(c=>c.classList.remove('active')); if(btn)btn.classList.add('active'); this.renderNotes(); },
  handleSort(s) { this.currentSort=s; this.renderNotes(); },
  cardKey(e,id) { if(e.key==='Enter')this.openPreview(id); if(e.key==='Delete')this.confirmDelete(id); },

  async fetchNotes() {
    const uid=this._uid(); if(!uid){this.notes=[];this.renderNotes();return;}
    const db=this._db(); if(!db){this.notes=[];this.renderNotes();return;}
    this.renderSkeletons();
    try {
      const snap=await db.collection('userNotes').where('userId','==',uid).get();
      this.notes=snap.docs.map(d=>({...d.data(),_docId:d.id}));
      this.renderNotes();
    } catch(e) { console.error('Fetch notes error:',e); this.notes=[]; this.renderNotes(); }
  },

  /* === UPLOAD MODAL === */
  openUploadModal() {
    if(!Auth.user){Auth.showAuthOverlay();Utils.showToast('Please log in to upload notes','info');return;}
    if(!this._db()||!this._storage()){Utils.showToast('Storage not configured','error');return;}
    this._selectedFile=null;
    const subs=this._subjects();
    const html=`<div class="un-modal-backdrop" id="un-upload-backdrop" onclick="if(event.target===this)UploadNotes.closeUploadModal()">
      <div class="un-upload-modal" role="dialog" aria-modal="true" aria-label="Upload notes">
        <div class="un-modal-header"><h3>📤 Add Your Notes</h3>
          <button class="un-modal-close" onclick="UploadNotes.closeUploadModal()" aria-label="Close">✕</button></div>
        <div class="un-modal-body">
          <div class="un-drop-zone" id="un-drop-zone">
            <input type="file" accept=".pdf,.docx,.jpg,.jpeg,.png,.webp" onchange="UploadNotes.onFileInput(event)" aria-label="Choose file">
            <div class="un-drop-icon">📁</div><p>Drag & drop your notes here, or click to browse</p>
            <span class="un-drop-hint">PDF, DOCX, JPG, PNG, WEBP • Max 10MB per file</span>
          </div>
          <div class="un-selected-file" id="un-selected-file">
            <span class="un-file-icon">📄</span><span class="un-file-name" id="un-file-name"></span>
            <span class="un-file-size" id="un-file-size-label"></span>
            <button class="un-clear-file" onclick="UploadNotes.clearFile()" aria-label="Remove file">✕</button>
          </div>
          <div class="un-form-field"><label class="un-form-label">Note Title</label>
            <input class="un-form-input" id="un-title-input" maxlength="100" placeholder="Enter note title" aria-label="Note title"></div>
          <div class="un-form-field"><label class="un-form-label">Subject</label>
            <select class="un-form-select" id="un-subject-select" aria-label="Subject">
              ${subs.map(s=>`<option value="${s.name}">${s.name}</option>`).join('')}
              <option value="Other">Other</option></select></div>
          <div class="un-form-field"><label class="un-form-label">Type</label>
            <select class="un-form-select" id="un-type-select" aria-label="File type">
              <option value="pdf">PDF</option><option value="docx">Word Doc</option><option value="image">Image</option></select></div>
          <div class="un-form-field"><label class="un-form-label">Description (optional)</label>
            <textarea class="un-form-textarea" id="un-desc-input" maxlength="200" placeholder="Brief description..." aria-label="Description"
              oninput="document.getElementById('un-char-ct').textContent=this.value.length+'/200'"></textarea>
            <span class="un-char-count" id="un-char-ct">0/200</span></div>
          <div class="un-progress-wrap" id="un-progress-wrap">
            <div class="un-progress-label"><span>Uploading...</span><span id="un-progress-pct">0%</span></div>
            <div class="un-progress-bar"><div class="un-progress-fill" id="un-progress-fill"></div></div></div>
          <button class="un-upload-btn" id="un-upload-btn" disabled onclick="UploadNotes.uploadFile()" aria-label="Upload">📤 Upload</button>
        </div></div></div>`;
    document.body.insertAdjacentHTML('beforeend',html);
    const zone=document.getElementById('un-drop-zone');
    zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('drag-over');});
    zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
    zone.addEventListener('drop',e=>{e.preventDefault();zone.classList.remove('drag-over');if(e.dataTransfer.files[0])this.handleFileSelect(e.dataTransfer.files[0]);});
    this._trapFocus(document.querySelector('.un-upload-modal'));
    document.addEventListener('keydown',this._escHandler=e=>{if(e.key==='Escape')this.closeUploadModal();});
  },

  closeUploadModal() {
    const b=document.getElementById('un-upload-backdrop'); if(b)b.remove();
    this._selectedFile=null;
    document.removeEventListener('keydown',this._escHandler);
  },

  onFileInput(e) { if(e.target.files[0])this.handleFileSelect(e.target.files[0]); },

  handleFileSelect(file) {
    const mime=file.type; const fType=this.ALLOWED_MIME[mime];
    if(!fType){Utils.showToast('Unsupported file type. Use PDF, DOCX, JPG, PNG, or WEBP.','error');return;}
    if(file.size>10*1024*1024){Utils.showToast('File exceeds 10MB limit','error');return;}
    this._selectedFile=file;
    const zone=document.getElementById('un-drop-zone'); if(zone)zone.classList.add('has-file');
    const sel=document.getElementById('un-selected-file'); if(sel)sel.classList.add('visible');
    const fn=document.getElementById('un-file-name'); if(fn)fn.textContent=file.name;
    const fs=document.getElementById('un-file-size-label'); if(fs)fs.textContent=this._fmtSize(file.size);
    const ti=document.getElementById('un-title-input'); if(ti&&!ti.value)ti.value=file.name.replace(/\.[^.]+$/,'');
    const ts=document.getElementById('un-type-select'); if(ts)ts.value=fType;
    const btn=document.getElementById('un-upload-btn'); if(btn)btn.disabled=false;
  },

  clearFile() {
    this._selectedFile=null;
    const zone=document.getElementById('un-drop-zone'); if(zone){zone.classList.remove('has-file');zone.querySelector('input').value='';}
    const sel=document.getElementById('un-selected-file'); if(sel)sel.classList.remove('visible');
    const btn=document.getElementById('un-upload-btn'); if(btn)btn.disabled=true;
  },

  async uploadFile() {
    if(!this._selectedFile||!Auth.user)return;
    const file=this._selectedFile, uid=this._uid(), noteId=this._genId();
    const title=this._sanitize(document.getElementById('un-title-input')?.value||file.name);
    const subject=document.getElementById('un-subject-select')?.value||'Other';
    const fileType=document.getElementById('un-type-select')?.value||'pdf';
    const desc=this._sanitize(document.getElementById('un-desc-input')?.value||'');
    const btn=document.getElementById('un-upload-btn'); if(btn){btn.disabled=true;btn.textContent='Uploading...';}
    const pw=document.getElementById('un-progress-wrap'); if(pw)pw.classList.add('visible');
    try {
      const path=`user-notes/${uid}/${noteId}/${file.name}`;
      const ref=this._storage().ref(path);
      const task=ref.put(file);
      task.on('state_changed',snap=>{
        const pct=Math.round((snap.bytesTransferred/snap.totalBytes)*100);
        const pf=document.getElementById('un-progress-fill'); if(pf)pf.style.width=pct+'%';
        const pp=document.getElementById('un-progress-pct'); if(pp)pp.textContent=pct+'%';
      });
      await task;
      const url=await ref.getDownloadURL();
      const meta={userId:uid,noteId,title,subject,fileType,fileSize:file.size,fileUrl:url,uploadedAt:firebase.firestore.FieldValue.serverTimestamp(),description:desc};
      await this._db().collection('userNotes').doc(noteId).set(meta);
      Utils.showToast('Note uploaded successfully!','success');
      this.closeUploadModal();
      this.fetchNotes();
    } catch(e) {
      console.error('Upload error:',e);
      Utils.showToast('Upload failed: '+e.message,'error');
      if(btn){btn.disabled=false;btn.textContent='📤 Upload';}
      if(pw)pw.classList.remove('visible');
    }
  },

  /* === PREVIEW === */
  openPreview(noteId) {
    const n=this.notes.find(x=>x.noteId===noteId); if(!n)return;
    if(n.fileType==='pdf')this.openPdfPreview(n);
    else if(n.fileType==='image')this.openImagePreview(n);
    else if(n.fileType==='docx')this.openDocxPreview(n);
  },

  _previewShell(title,controls,bodyContent) {
    return `<div class="un-modal-backdrop" id="un-preview-backdrop" onclick="if(event.target===this)UploadNotes.closePreview()">
      <div class="un-preview-modal" role="dialog" aria-modal="true" aria-label="Preview ${this._sanitize(title)}">
        <div class="un-preview-header"><span class="un-preview-title">${this._sanitize(title)}</span>
          <div class="un-preview-controls">${controls}
            <button class="un-preview-btn" onclick="UploadNotes.closePreview()" aria-label="Close">✕</button></div></div>
        <div class="un-preview-body" id="un-preview-body">${bodyContent}</div></div></div>`;
  },

  openPdfPreview(n) {
    const ctrl=`<button class="un-preview-btn" id="un-pdf-prev" onclick="UploadNotes.pdfPage(-1)" aria-label="Previous page">◀</button>
      <span class="un-preview-page-info" id="un-pdf-info">Loading...</span>
      <button class="un-preview-btn" id="un-pdf-next" onclick="UploadNotes.pdfPage(1)" aria-label="Next page">▶</button>
      <button class="un-preview-btn" onclick="UploadNotes.pdfZoom(-0.25)" aria-label="Zoom out">−</button>
      <button class="un-preview-btn" onclick="UploadNotes.pdfZoom(0.25)" aria-label="Zoom in">+</button>
      <a class="un-preview-btn" href="${n.fileUrl}" target="_blank" download aria-label="Download">⬇️</a>`;
    document.body.insertAdjacentHTML('beforeend',this._previewShell(n.title,ctrl,'<div class="un-preview-loading"><div class="un-spinner"></div>Loading PDF...</div>'));
    document.addEventListener('keydown',this._escHandler=e=>{if(e.key==='Escape')this.closePreview();});
    this._pdfPage=1; this._pdfScale=1.2;
    if(window.pdfjsLib){
      pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      pdfjsLib.getDocument(n.fileUrl).promise.then(doc=>{this._pdfDoc=doc;this._renderPdfPage();}).catch(()=>{ document.getElementById('un-preview-body').innerHTML='<p style="color:var(--danger)">Failed to load PDF</p>';});
    } else { document.getElementById('un-preview-body').innerHTML='<p>PDF.js not loaded</p>'; }
  },

  async _renderPdfPage() {
    if(!this._pdfDoc)return;
    const page=await this._pdfDoc.getPage(this._pdfPage);
    const vp=page.getViewport({scale:this._pdfScale});
    const body=document.getElementById('un-preview-body'); if(!body)return;
    body.innerHTML=`<canvas id="un-pdf-canvas"></canvas>`;
    const canvas=document.getElementById('un-pdf-canvas');
    canvas.width=vp.width; canvas.height=vp.height;
    await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
    const info=document.getElementById('un-pdf-info'); if(info)info.textContent=`${this._pdfPage} / ${this._pdfDoc.numPages}`;
  },

  pdfPage(dir) { if(!this._pdfDoc)return; const p=this._pdfPage+dir; if(p>=1&&p<=this._pdfDoc.numPages){this._pdfPage=p;this._renderPdfPage();} },
  pdfZoom(d) { this._pdfScale=Math.max(0.5,Math.min(3,this._pdfScale+d)); if(this._pdfDoc)this._renderPdfPage(); },

  openImagePreview(n) {
    const ctrl=`<a class="un-preview-btn" href="${n.fileUrl}" target="_blank" download aria-label="Download">⬇️</a>`;
    const body=`<img class="un-img-preview" src="${n.fileUrl}" alt="${this._sanitize(n.title)}" onclick="this.classList.toggle('zoomed');this.style.transform=this.classList.contains('zoomed')?'scale(2)':''">`;
    document.body.insertAdjacentHTML('beforeend',this._previewShell(n.title,ctrl,body));
    document.addEventListener('keydown',this._escHandler=e=>{if(e.key==='Escape')this.closePreview();});
  },

  async openDocxPreview(n) {
    const ctrl=`<a class="un-preview-btn" href="${n.fileUrl}" target="_blank" download aria-label="Download">⬇️</a>`;
    document.body.insertAdjacentHTML('beforeend',this._previewShell(n.title,ctrl,'<div class="un-preview-loading"><div class="un-spinner"></div>Converting document...</div>'));
    document.addEventListener('keydown',this._escHandler=e=>{if(e.key==='Escape')this.closePreview();});
    try {
      if(!window.mammoth){document.getElementById('un-preview-body').innerHTML='<p>mammoth.js not loaded</p>';return;}
      const resp=await fetch(n.fileUrl); const buf=await resp.arrayBuffer();
      const result=await mammoth.convertToHtml({arrayBuffer:buf});
      const body=document.getElementById('un-preview-body');
      if(body)body.innerHTML=`<div class="un-docx-content">${result.value}</div>`;
    } catch(e) { const b=document.getElementById('un-preview-body'); if(b)b.innerHTML='<p style="color:var(--danger)">Failed to convert document</p>'; }
  },

  closePreview() {
    const b=document.getElementById('un-preview-backdrop'); if(b)b.remove();
    this._pdfDoc=null; document.removeEventListener('keydown',this._escHandler);
  },

  /* === RENAME === */
  startRename(noteId) {
    const el=document.getElementById('un-title-'+noteId); if(!el)return;
    const cur=el.textContent;
    el.innerHTML=`<input class="un-rename-input" value="${cur}" onblur="UploadNotes.finishRename('${noteId}',this.value)"
      onkeydown="if(event.key==='Enter')this.blur();if(event.key==='Escape'){this.value='';this.blur();}" aria-label="Rename note">`;
    el.querySelector('input').focus();
  },

  async finishRename(noteId,val) {
    const title=this._sanitize(val); const el=document.getElementById('un-title-'+noteId);
    if(!title){if(el){const n=this.notes.find(x=>x.noteId===noteId);el.textContent=n?n.title:'';} return;}
    try {
      await this._db().collection('userNotes').doc(noteId).update({title});
      const n=this.notes.find(x=>x.noteId===noteId); if(n)n.title=title;
      if(el)el.textContent=title;
      Utils.showToast('Renamed!','success');
    } catch(e) { Utils.showToast('Rename failed','error'); this.renderNotes(); }
  },

  /* === DELETE === */
  confirmDelete(noteId) {
    const n=this.notes.find(x=>x.noteId===noteId); if(!n)return;
    const html=`<div class="un-modal-backdrop" id="un-confirm-backdrop" onclick="if(event.target===this)this.remove()">
      <div class="un-confirm-dialog"><div class="un-confirm-icon">⚠️</div>
        <h4>Delete Note?</h4><p>Are you sure you want to delete "${this._sanitize(n.title)}"? This cannot be undone.</p>
        <div class="un-confirm-actions">
          <button class="un-confirm-cancel" onclick="document.getElementById('un-confirm-backdrop').remove()">Cancel</button>
          <button class="un-confirm-delete" onclick="UploadNotes.deleteNote('${noteId}')">Delete</button>
        </div></div></div>`;
    document.body.insertAdjacentHTML('beforeend',html);
  },

  async deleteNote(noteId) {
    const cb=document.getElementById('un-confirm-backdrop'); if(cb)cb.remove();
    const n=this.notes.find(x=>x.noteId===noteId); if(!n)return;
    try {
      const uid=this._uid();
      // Delete from storage (list all files in the noteId folder)
      const folderRef=this._storage().ref(`user-notes/${uid}/${noteId}`);
      try { const list=await folderRef.listAll(); await Promise.all(list.items.map(i=>i.delete())); } catch(e){}
      await this._db().collection('userNotes').doc(noteId).delete();
      this.notes=this.notes.filter(x=>x.noteId!==noteId);
      this.renderNotes();
      Utils.showToast('Note deleted','success');
    } catch(e) { console.error(e); Utils.showToast('Delete failed','error'); }
  },

  /* === FOCUS TRAP === */
  _trapFocus(modal) {
    if(!modal)return;
    const focusable=modal.querySelectorAll('button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
    if(!focusable.length)return;
    const first=focusable[0],last=focusable[focusable.length-1];
    first.focus();
    modal.addEventListener('keydown',e=>{
      if(e.key!=='Tab')return;
      if(e.shiftKey){if(document.activeElement===first){e.preventDefault();last.focus();}}
      else{if(document.activeElement===last){e.preventDefault();first.focus();}}
    });
  }
};
window.UploadNotes=UploadNotes;

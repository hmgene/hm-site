---
title: "Bioinformatics Services"
---

### 🔍 Search Services

<input id="service-filter" placeholder="Type to filter services…" style="padding:6px; margin-bottom:10px; width:100%; max-width:400px;" />

<ul id="services-list">
  <li class="service-item">RNA-seq differential expression</li>
  <li class="service-item">Single-cell clustering</li>
  <li class="service-item">Epigenomic integration (ATAC/ChIP-seq)</li>
  <li class="service-item">Copy number variation analysis</li>
  <li class="service-item">Reproducible pipeline development (Nextflow/Snakemake)</li>
  <li class="service-item">Grant methods writing</li>
</ul>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('service-filter');
  const items = document.querySelectorAll('.service-item');
  input.addEventListener('input', () => {
    const term = input.value.toLowerCase();
    items.forEach(it => {
      it.style.display = it.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
  });
});
</script>


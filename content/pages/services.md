---
title: "Bioinformatics Services"
---
**Business Plan:**
The core would operate on a <u>value-based service model</u>, focusing on delivering meaningful results rather than billing strictly by the hour. Users would have flexible options:
- Hourly: Junior or senior bioinformatics level processing.
- Project-based: Flat fees per project (e.g., bulk RNA-seq $1,000, single-cell RNA-seq $3,000, GWAS $2,000, etc.).
- Subscription models: Comprehensive support from data generation to publication and grant submission, billed as a percentage of effort over 6 or 12 months.

**Pricing:**
For typical projects, costs are calculated per sample based on QC, value, and anticipated impact, 
generally ranging from $1,000 to $5,000 per project. 
More complex or large-scale projects would be priced proportionally, e.g., based on the percentage of effort over a year.

**Sustainability:**
Based on current research activity and anticipated demand, I have already secured a 15% effort contract for a year. I expect at least two such long-term contracts soon, with the remaining 55% of my effort available for additional projects. 
This would generate sufficient revenue to cover operational costs, including personnel, computational resources, and software licenses.

**My value**
By prioritizing high-impact projects and maintaining flexible pricing models, the core would remain financially sustainable while providing maximum value to the research community.
I would be happy to provide a more detailed financial projection or usage estimate if needed.

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



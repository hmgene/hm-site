---
title: "Bioinformatics Services"
---
###
I offer two service models:
- Project-based model: Charges 10–20% of my effort per project, covering services from data analysis to the final publication.
- Hourly model: Flat-rate service with up-to-date or custom solutions (starting around $100/hour, adjustable).

Pricing is explained transparently based on three factors:
- Gain: Value of the data or insights generated.
- Cost Savings: Efficiency improvements via software or workflow optimization.
- Risk Reduction: Quality control of the data, considering our current infrastructure conditions.

I have already applied this model to a 15% effort contract per PI/project this year, and I anticipate several similar contracts will be available in the near future.

I expect that revenue could increase to cover up to 100% of my effort next year, and I am confident in identifying what is most valuable and attractive for each PI’s project.

I would be happy to discuss the details further at your convenience. Thank you.

Hyunmin


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



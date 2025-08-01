<!-- Include this in your Hugo page or template -->
<div id="umap-container" style="width:100%;height:600px;"></div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
// config: path to CSV
const CSV_PATH = '/data/umap.csv'; // relative to site root

// helper to assign color per label
function makeColorMap(labels) {
  const palette = [
    '#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd',
    '#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'
  ];
  const uniq = [...new Set(labels)];
  const map = {};
  uniq.forEach((l,i) => { map[l] = palette[i % palette.length]; });
  return map;
}

async function drawUMAP() {
  const resp = await fetch(CSV_PATH);
  if (!resp.ok) {
    document.getElementById('umap-container').innerText = 'Failed to load data.';
    return;
  }
  const text = await resp.text();
  // parse CSV manually (simple)
  const lines = text.trim().split('\n');
  const header = lines[0].split(',');
  const idx = {};
  header.forEach((h,i) => { idx[h.trim()] = i; });

  const rows = lines.slice(1).map(line => line.split(','));
  const labels = rows.map(r => r[idx['label']]);
  const colorMap = makeColorMap(labels);

  // group by label for separate traces
  const grouped = {};
  rows.forEach(r => {
    const lab = r[idx['label']];
    if (!grouped[lab]) grouped[lab] = { x: [], y: [], text: [] };
    grouped[lab].x.push(parseFloat(r[idx['UMAP1']]));
    grouped[lab].y.push(parseFloat(r[idx['UMAP2']]));
    grouped[lab].text.push(lab);
  });

  const traces = Object.entries(grouped).map(([lab, d]) => ({
    x: d.x,
    y: d.y,
    mode: 'markers',
    type: 'scattergl', // faster for many points
    name: lab,
    text: d.text,
    marker: { size: 6, color: colorMap[lab], opacity: 0.7 },
    hovertemplate: `${lab}<br>UMAP1: %{x:.3f}<br>UMAP2: %{y:.3f}<extra></extra>`
  }));

  const layout = {
    title: 'UMAP',
    xaxis: { title: 'UMAP1' },
    yaxis: { title: 'UMAP2' },
    legend: { orientation: 'h', y: -0.1 },
    margin: { t: 40, l: 50, r: 30, b: 50 }
  };

  Plotly.newPlot('umap-container', traces, layout, { responsive: true });
}

document.addEventListener('DOMContentLoaded', drawUMAP);
</script>


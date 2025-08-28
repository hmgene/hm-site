### 📈 Expression Comparison

<div>
  <label for="gene-input">Filter by gene: </label>
  <input id="gene-input" placeholder="e.g., GeneA" style="padding:4px; margin:4px 0;" />
</div>
<div id="vl-chart"></div>

<!-- Vega-Lite dependencies -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const defaultSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "RNA-seq expression per gene and condition",
    "data": {
      "url": "/data/expression.csv"
    },
    "transform": [
      {
        "filter": {
          "field": "gene",
          "oneOf": []  // will be set dynamically
        }
      }
    ],
    "mark": "bar",
    "encoding": {
      "x": {"field": "condition", "type": "nominal", "axis": {"labelAngle": 0}},
      "y": {"field": "expression", "type": "quantitative"},
      "color": {"field": "condition", "type": "nominal"},
      "tooltip": [
        {"field": "gene", "type": "nominal"},
        {"field": "condition", "type": "nominal"},
        {"field": "expression", "type": "quantitative"}
      ]
    }
  };

  const geneInput = document.getElementById('gene-input');
  let viewSpec = JSON.parse(JSON.stringify(defaultSpec));
  // initialize with first gene
  viewSpec.transform[0].filter.oneOf = ["GeneA"];
  vegaEmbed('#vl-chart', viewSpec, {actions: false});

  geneInput.addEventListener('input', () => {
    const gene = geneInput.value.trim();
    const spec = JSON.parse(JSON.stringify(defaultSpec));
    if (gene) {
      spec.transform[0].filter.oneOf = [gene];
    } else {
      // show all genes by removing the filter
      spec.transform = [];
    }
    vegaEmbed('#vl-chart', spec, {actions: false});
  });
});
</script>


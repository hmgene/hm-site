async function drawUMAPPlot(divId, csvUrl, color) {
    const response = await fetch(csvUrl);
    const csvText = await response.text();

    const rows = csvText.trim().split("\n").slice(1);
    const points = rows.map(r => {
        const [x, y, label] = r.split(",");
        return { x: parseFloat(x), y: parseFloat(y), label: label };
    });

    const trace = {
        x: points.map(p => p.x),
        y: points.map(p => p.y),
        text: points.map(p => p.label),
        mode: 'markers',
        type: 'scattergl',
        marker: { size: 8, color: color },
    };

    Plotly.newPlot(divId, [trace], {
        margin: { t: 20 },
        hovermode: "closest"
    });

    return points;
}
function linkPlots(div1, div2) {
  // Track selected point indices as a Set
  const selectedIndices = new Set();

  // Helper to reset all points to grey
  const resetColors = () => {
    div1.data.forEach((trace, i) => {
      const greyColors = Array(trace.x.length).fill('grey');
      Plotly.restyle(div1, { 'marker.color': [greyColors] }, [i]);
    });
    div2.data.forEach((trace, i) => {
      const greyColors = Array(trace.x.length).fill('grey');
      Plotly.restyle(div2, { 'marker.color': [greyColors] }, [i]);
    });
  };

  // Helper to update colors of selected points
  const updateColors = () => {
    div1.data.forEach((trace, i) => {
      const colors = trace.x.map((_, idx) => selectedIndices.has(idx) ? 'blue' : 'grey');
      Plotly.restyle(div1, { 'marker.color': [colors] }, [i]);
    });
    div2.data.forEach((trace, i) => {
      const colors = trace.x.map((_, idx) => selectedIndices.has(idx) ? 'red' : 'grey');
      Plotly.restyle(div2, { 'marker.color': [colors] }, [i]);
    });
  };

  // Handle clicks to toggle single points (optional)
  const onClick = (sourceDiv, targetDiv) => {
    sourceDiv.on('plotly_click', (data) => {
      const ptIndex = data.points[0].pointIndex;
      if (selectedIndices.has(ptIndex)) {
        selectedIndices.delete(ptIndex);
      } else {
        selectedIndices.add(ptIndex);
      }
      updateColors();
    });
  };

  // Handle lasso or box select events
  const onSelect = (sourceDiv, targetDiv) => {
    sourceDiv.on('plotly_selected', (eventData) => {
      if (!eventData) return;

      // Get the indices of selected points
      const pts = eventData.points.map(p => p.pointIndex);

      // Add selected points to the set
      pts.forEach(idx => selectedIndices.add(idx));

      updateColors();
    });

    // Optionally clear selection on double-click or button click
    sourceDiv.on('plotly_deselect', () => {
      selectedIndices.clear();
      updateColors();
    });
  };

  onClick(div1, div2);
  onClick(div2, div1);

  onSelect(div1, div2);
  onSelect(div2, div1);

  // Initialize with grey colors
  resetColors();
}


window.addEventListener('DOMContentLoaded', async () => {
    await drawUMAPPlot('umap1-container', "{{ .Site.BaseURL }}data/umap1.csv", 'blue');
    await drawUMAPPlot('umap2-container', "{{ .Site.BaseURL }}data/umap2.csv", 'red');

    const div1 = document.getElementById('umap1-container');
    const div2 = document.getElementById('umap2-container');
    linkPlots(div1, div2);
});


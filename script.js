document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([-2.5, 118], 5);

  // Tile asli bawaan Leaflet
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  const marketingList = document.getElementById("marketing-list");
  const tableBody = document.querySelector("tbody");

  function renderMarkers(marketing) {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    const filtered = marketing === "all"
      ? pelanggan
      : pelanggan.filter(p => p.marketing === marketing);

    filtered.forEach(p => {
      L.marker([p.lat, p.lon])
        .addTo(map)
        .bindPopup(`${p.nama} (${p.marketing})`);
    });

    renderTable(filtered);
  }

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${p.nama}</td><td>${p.marketing}</td>`;
      tableBody.appendChild(row);
    });
  }

  marketingList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const marketing = e.target.getAttribute("data-marketing");
      renderMarkers(marketing);
    }
  });

  renderMarkers("all");
});

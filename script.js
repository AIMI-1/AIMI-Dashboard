document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([-2.5, 118], 5);

  // Tile hijau (OpenStreetMap HOT style)
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors, HOT',
    maxZoom: 19
  }).addTo(map);

  // Marker merah
  const redIcon = new L.Icon({
    iconUrl: 'https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=home|FF0000',
    iconSize: [21, 34],
    iconAnchor: [10, 34],
    popupAnchor: [0, -30]
  });

  const marketingList = document.getElementById("marketing-list");
  const tableBody = document.querySelector("tbody");

  function renderMarkers(marketing) {
    // Hapus semua marker sebelumnya
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    const filtered = marketing === "all"
      ? pelanggan
      : pelanggan.filter(p => p.marketing === marketing);

    filtered.forEach(p => {
      L.marker([p.lat, p.lon], { icon: redIcon })
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

  // Load awal
  renderMarkers("all");
});

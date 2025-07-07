document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([-2.5, 118], 5);

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
  initProvinsiMenu(); // Jalankan menu provinsi saat peta siap
});

// ===========================
// Menu Provinsi & Daftar Kota
// ===========================

const kotaDenganPelanggan = [
  "Jakarta Selatan", "Surabaya", "Bandung", "Bekasi"
  // Tambahkan kota yang SUDAH ada pelanggan
];

function initProvinsiMenu() {
  const provinsiSelect = document.getElementById("provinsi-select");
  if (!provinsiSelect) return;

  for (const provinsi in wilayahIndonesia) {
    const option = document.createElement("option");
    option.value = provinsi;
    option.textContent = provinsi;
    provinsiSelect.appendChild(option);
  }

  provinsiSelect.addEventListener("change", () => {
    const kotaList = wilayahIndonesia[provinsiSelect.value];
    const ul = document.getElementById("daftar-kota");
    ul.innerHTML = "";

    kotaList.forEach(kota => {
      const li = document.createElement("li");
      const sudahAda = kotaDenganPelanggan.includes(kota);
      li.textContent = `${kota} ${sudahAda ? '✅' : '❌ belum ada pelanggan'}`;
      ul.appendChild(li);
    });
  });
}

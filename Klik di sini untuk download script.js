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

document.addEventListener("DOMContentLoaded", function () {
  initProvinsiMenu();

  const marketingList = document.getElementById("marketing-list");
  const tableBody = document.querySelector("#data-table");

  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${p.nama}</td><td>${p.marketing}</td>`;
      tableBody.appendChild(row);
    });
  }

  function renderMarketing(marketing) {
    const filtered = marketing === "all"
      ? pelanggan
      : pelanggan.filter(p => p.marketing === marketing);
    renderTable(filtered);
  }

  marketingList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const marketing = e.target.getAttribute("data-marketing");
      renderMarketing(marketing);
    }
  });

  renderMarketing("all");
});

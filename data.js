const pelanggan = [
  { nama: "Toko A", marketing: "Lusi", lat: -6.2, lon: 106.8, kota: "Jakarta Selatan" },
  { nama: "Toko B", marketing: "Mita", lat: -7.25, lon: 112.75, kota: "Surabaya" },
  { nama: "Toko C", marketing: "Ferdy", lat: -6.9, lon: 107.6, kota: "Bandung" },
  { nama: "Toko D", marketing: "Erika", lat: -6.3, lon: 106.9, kota: "Bekasi" }
];

const wilayahIndonesia = {
  "DKI Jakarta": ["Jakarta Selatan", "Jakarta Barat", "Jakarta Timur"],
  "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok"],
  "Jawa Timur": ["Surabaya", "Malang", "Sidoarjo"],
  "Jawa Tengah": ["Semarang", "Solo", "Magelang"]
};

const kotaDenganPelanggan = pelanggan.map(p => p.kota);

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

// Toggle sidebar
menuButton.addEventListener("click", function () {
  sidebar.classList.toggle("-translate-x-full");
  sidebarOverlay.classList.toggle("hidden");
});

// Close sidebar when overlay is clicked
sidebarOverlay.addEventListener("click", function () {
  sidebar.classList.add("-translate-x-full");
  sidebarOverlay.classList.add("hidden");
});

function formatRupiah(input) {
  let value = input.value;

  // Hapus semua karakter selain angka
  value = value.replace(/[^\d]/g, "");

  // Format nilai input menjadi Rupiah
  const formattedValue = formatAsRupiah(value);

  // Set nilai input yang sudah diformat kembali ke dalam input
  input.value = formattedValue;
}

// Fungsi untuk mengubah angka menjadi format Rupiah
function formatAsRupiah(angka) {
  if (!angka) return "";
  // Gunakan Intl.NumberFormat untuk format Rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(angka).replace(/,00$/, "");
}

function previewImage(event) {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function () {
    const img = document.getElementById("imagePreview");
    img.src = reader.result;
  };
  reader.readAsDataURL(input.files[0]);
}


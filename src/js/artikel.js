const exampleArticles = [
  {
    id: 1,
    title: "Gempa Terkini Malam Ini Minggu 19 Mei 2024, Info BMKG Terjadi di Jawa Barat",
    content:
      "Diketahui gempa bumi tepatnya melanda wilayah di Jawa Barat malam ini. Berdasarkan info Badan Meteorologi, Klimatologi, dan Geofisika (BMKG). Gempa tersebut berkekuatan magnitudo 2,7 berpusat di laut. Tepatnya melanda wilayah Jawa Barat pukul 18.39 WIB.",
    image: "img/gempaa.jpg",
    details: "Gempa bumi terkini malam ini, 19 Mei 2024",
  },
  {
    id: 2,
    title: "Gempa Hari Ini Sabtu 18 Mei 2024 di Indonesia Bermagnitudo 3,5 Getarkan Sumedang, Jabar",
    content:
      "Berdasarkan laporan Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) melalui laman resminya www.bmkg.go.id, lindu tersebut menggetarkan dini hari tadi pukul 02:54:53 WIB di Kabupaten Sumedang, Provinsi Jawa Barat (Jabar).",
    image: "img/sumedang.jpg",
    details: "Gempa bumi terkini malam ini, 18 Mei 2024",
  },
  {
    id: 3,
    title: "BMKG Persiapkan Penyelidikan Fenomena Gempa Bumi di Zona Megatrust",
    content: "Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) sedang mempersiapkan ekspedisi untuk menyelidiki fenomena kegempaan yang terjadi di zona megatrust di Indonesia.",
    image: "img/megatrust.jpg",
    details: "Gempa bumi terkini malam ini, 19 Mei 2024",
  },
];
localStorage.setItem("articles", JSON.stringify(exampleArticles));

async function displayArticles() {
  const baseURL = 'http://localhost:3000'
  const response = await fetch(baseURL + '/api/blogs/get-all', {
    method: "GET"
  })
  const articles = await response.json()
  // const articles = JSON.parse(localStorage.getItem("articles")) || [];

  const artikelContainer = document.querySelector("#articleList");

  if (!artikelContainer) {
    return;
  }

  if (articles.length === 0) {
    artikelContainer.innerHTML = '<p class="text-center text-xl font-semibold mt-5">Belum ada artikel yang ditambahkan.</p>';
  } else {
    artikelContainer.innerHTML = "";
    articles.data.forEach((article) => {
      const articleHTML = `
        <div class="flex justify-center overflow-hidden lg:w-96 w-80 shadow-xl mx-auto rounded-xl transform transition-transform duration-300 hover:scale-105">
          <div class="card w-full">
            <figure><img src="${baseURL + '/uploads/'}${article.image}" alt="${article.title}" /></figure>
            <div class="card-body">
              <h2 class="card-title font-extrabold">${article.title}</h2>
              <p class="py-3 text-justify">${article.description.slice(0, 100)}...</p>
              <div class="card-actions justify-end">
                <a href="read.html?id=${article.blogid}" class="bg-blue-900 w-full py-2 rounded-lg text-white font-bold text-center">Baca Selengkapnya</a>
              </div>
            </div>
          </div>
        </div>
                `;
      artikelContainer.innerHTML += articleHTML;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayArticles();
});

// Fungsi untuk menampilkan artikel pada read.html
async function displayArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = parseInt(urlParams.get("id")); // Konversi ke integer

  const baseURL = 'http://localhost:3000'
  const response = await fetch(baseURL + '/api/blogs/get-by-id?blogid=' + articleId, {
    method: "GET"
  })
  const articles = await response.json()
  // const articles = JSON.parse(localStorage.getItem("articles")) || [];
  // const article = articles.data.find((article) => article.id === articleId);

  if (articles) {
    document.getElementById("articleTitle").textContent = articles.data.title;
    document.getElementById("articleImage").src = baseURL + '/uploads/' + articles.data.image;
    document.getElementById("articleImage").alt = articles.data.title;
    document.getElementById("articleContent").textContent = articles.data.description;
  } else {
  }
}

// Memanggil fungsi displayArticle saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  displayArticle();
});

// Fungsi untuk menampilkan pratinjau gambar yang diunggah
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("imagePreview");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Fungsi untuk menyimpan artikel yang diedit atau baru
function simpanArtikel() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  const title = document.getElementById("articleTitle").value;
  const content = document.getElementById("articleContent").value;
  const image = document.getElementById("imagePreview").src;

  let articles = JSON.parse(localStorage.getItem("articles")) || [];

  const articleIndex = articles.findIndex((article) => article.id === articleId);

  if (articleIndex !== -1) {
    // Update artikel yang sudah ada
    articles[articleIndex].title = title;
    articles[articleIndex].content = content;
    articles[articleIndex].image = image;
  } else {
    // Tambah artikel baru
    articles.push({
      id: Date.now().toString(), // Menggunakan timestamp sebagai id baru
      title: title,
      content: content,
      image: image,
      details: `Publikasi: ${new Date().toLocaleString()} | BMKG`,
    });
  }

  // Simpan kembali data artikel ke localStorage
  localStorage.setItem("articles", JSON.stringify(articles));

  // Redirect kembali ke halaman utama setelah menyimpan
  window.location.href = "index.html";
}

// Fungsi untuk memuat data artikel yang akan diedit
function loadEditArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  const article = articles.find((article) => article.id === articleId);

  if (article) {
    document.getElementById("articleTitle").value = article.title;
    document.getElementById("articleContent").value = article.content;
    document.getElementById("imagePreview").src = article.image;
  }
}

// Event listener untuk memanggil fungsi yang tepat pada masing-masing halaman
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#artikel #articleList")) {
    displayArticles();
  }
  if (document.getElementById("articleTitle")) {
    displayArticle();
  }
  if (document.getElementById("imageUpload")) {
    loadEditArticle();
  }
});

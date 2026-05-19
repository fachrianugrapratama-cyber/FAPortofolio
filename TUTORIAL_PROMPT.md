# Panduan Lengkap & Panduan Prompting: Fachri Ultra Premium Portfolio

Dokumen ini berisi tutorial cara membangun website portofolio ini dari awal serta strategi/teknik menulis prompt (Prompt Engineering) untuk mengembangkan fitur-fitur baru dengan bantuan AI secara mudah dan konsisten.

---

## Daftar Isi
1. [Tentang Portofolio Ini](#1-tentang-portofolio-ini)
2. [Struktur File Proyek](#2-struktur-file-proyek)
3. [Tutorial Langkah demi Langkah](#3-tutorial-langkah-demi-langkah)
   - [Langkah 1: Struktur HTML (`index.html`)](#langkah-1-struktur-html-indexhtml)
   - [Langkah 2: Desain Glassmorphism (`style.css`)](#langkah-2-desain-glassmorphism-stylecss)
   - [Langkah 3: Logika & Interaktivitas (`script.js`)](#langkah-3-logika-interaktivitas-scriptjs)
   - [Langkah 4: Integrasi Formulir Kontak (EmailJS)](#langkah-4-integrasi-formulir-kontak-emailjs)
4. [Panduan & Teknik Prompting AI](#4-panduan--teknik-prompting-ai)
   - [Prinsip Utama Prompting Portofolio Premium](#prinsip-utama-prompting-portofolio-premium)
   - [Template Prompt Siap Pakai](#template-prompt-siap-pakai)

---

## 1. Tentang Portofolio Ini
Portofolio ini menggunakan gaya **Glassmorphism modern** dengan animasi mikro yang kaya dan interaktif. 

**Fitur Utama:**
* **Premium Glassmorphism Style:** Transparansi, blur latar belakang super halus, serta garis pembatas tipis bercahaya (*glow border*).
* **Smooth Custom Cursor:** Kursor custom berwarna cyan yang mengikuti arah mouse dengan efek glow.
* **Canvas-free Particles:** Partikel melayang di latar belakang menggunakan elemen HTML dinamis tanpa membebani performa *canvas*.
* **Responsive Layout:** Grid adaptif untuk mobile, tablet, dan desktop.
* **Typing Effect:** Efek ketikan teks dinamis pada sub-judul Hero.
* **Magnetic Buttons:** Tombol yang secara fisik tertarik sedikit ke arah kursor saat didekati (efek magnetik).
* **Parallax Background:** Latar belakang gradasi yang bergerak halus saat mouse digerakkan.
* **Integrated EmailJS:** Formulir kontak fungsional yang mengirim pesan langsung ke email Anda tanpa membutuhkan backend terpisah.

---

## 2. Struktur File Proyek
Proyek ini memiliki struktur yang sangat sederhana tetapi terorganisasi dengan baik:
```bash
portofolio baru/
├── index.html        # Kerangka konten website & integrasi EmailJS
├── style.css         # Variabel warna, gaya Glassmorphism, animasi & responsivitas
├── script.js         # Logika JavaScript untuk interaktivitas & efek mikro
└── ytta.jpg.jpeg     # Foto profil Anda untuk bagian Hero
```

---

## 3. Tutorial Langkah demi Langkah

### Langkah 1: Struktur HTML (`index.html`)
Kerangka HTML dibagi menjadi beberapa bagian semantik. 
* Hubungkan file CSS dan FontAwesome di dalam `<head>`.
* Masukkan elemen global di awal `<body>`:
  * **Loader:** Halaman loading pembuka sebelum seluruh aset selesai dimuat.
  * **Cursor:** Lingkaran cyan berpendar untuk kursor kustom.
  * **Particles Container:** `<div id="particles">` tempat partikel dinamis dibuat oleh JavaScript.
  * **Background Blurs:** Tiga elemen `.bg` dengan filter blur besar untuk gradasi latar belakang.
* Struktur navbar memiliki logo di kiri, menu navigasi utama di tengah, tombol ganti tema (*theme toggle*), dan jam digital *real-time* di kanan.
* Bagian konten dibagi menjadi beberapa `<section>` ber-ID agar dapat ditargetkan oleh menu navigasi (scroll halus):
  * `#home` (Hero) - Menampilkan nama, badge, efek mengetik, tombol aksi, link sosial media berbentuk kartu, dan foto profil dengan animasi orbit.
  * `.stats` - Statistik singkat (jumlah proyek, klien, dll.).
  * `#about` - Deskripsi diri.
  * `#services` - Layanan yang ditawarkan dengan icon FontAwesome.
  * `#skills` - Bar presentase tingkat keahlian.
  * `#projects` - Portofolio proyek berbentuk kartu visual.
  * `#certificate` - Sertifikasi dan pencapaian.
  * `#testimonials` - Ulasan dari klien.
  * `#contact` - Informasi kontak langsung dan formulir kontak terintegrasi EmailJS.
  * `footer` - Informasi copyright dan media sosial di bagian bawah.

### Langkah 2: Desain Glassmorphism (`style.css`)
Gaya premium ini dibangun menggunakan variabel CSS agar mudah dalam kustomisasi warna dan mendukung **Dark/Light Mode**:

```css
:root {
    --bg: #050816;
    --card: rgba(255, 255, 255, .08);
    --border: rgba(255, 255, 255, .12);
    --text: #ffffff;
    --secondary: #94a3b8;
    --cyan: #00ffff;
    --purple: #8b5cf6;
    --pink: #ec4899;
}

body.light {
    --bg: #f5f7ff;
    --card: rgba(255, 255, 255, .7);
    --border: rgba(0, 0, 0, .08);
    --text: #111827;
    --secondary: #374151;
}
```

Kunci utama efek **Glassmorphism** adalah kombinasi `backdrop-filter`, warna background semi-transparan (`--card`), dan border tipis (`--border`):
```css
.glass {
    background: var(--card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    box-shadow: 0 8px 32px rgba(0, 0, 0, .35),
                0 0 25px rgba(0, 255, 255, .05);
}
```

### Langkah 3: Logika & Interaktivitas (`script.js`)
JavaScript digunakan untuk menghidupkan portofolio dengan performa tinggi:

1. **Loader:** Menghilangkan layar pemuatan setelah 2 detik halaman selesai dimuat.
2. **Real-time Clock:** Memperbarui jam di pojok kanan atas setiap 1 detik menggunakan `setInterval` dan `toLocaleTimeString()`.
3. **Custom Cursor:** Memosisikan elemen `.cursor` tepat pada koordinat X dan Y pointer mouse.
4. **HTML Particles Generator:** Membuat 120 elemen `span` secara dinamis di dalam kontainer `#particles`. Masing-masing partikel diberi posisi horizontal acak (`Math.random()`), durasi animasi acak, dan opacity acak.
5. **Typing Effect:** Loop rekursif menggunakan fungsi `type()` dan `erase()` untuk mengetik dan menghapus daftar teks keahlian secara berkala.
6. **Scroll Reveal:** Memantau posisi scroll pengguna. Jika elemen dengan kelas `.reveal` berada kurang dari 100px di bawah batas layar, kelas `.active` ditambahkan untuk memicu transisi kemunculan (fade-in & slide-up).
7. **Dark/Light Mode Toggle:** Mengubah kelas `.light` pada `body` ketika tombol matahari/bulan diklik.
8. **Magnetic Button Physics:** Menghitung jarak mouse dari pusat tombol. Jika mendekat, tombol ditarik sebesar 15% dari jarak mouse untuk memberikan sensasi elastisitas magnetik.
9. **Parallax Background:** Menggeser koordinat elemen blur latar belakang secara halus berdasarkan koordinat pergerakan kursor pengguna.
10. **Smooth Nav Active:** Menyorot menu navigasi di header sesuai dengan bagian halaman yang sedang aktif dibaca.

### Langkah 4: Integrasi Formulir Kontak (EmailJS)
Di bagian akhir `index.html`, EmailJS diinisialisasi menggunakan Public Key Anda:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```
Event listener pada `#contact-form` menangkap aksi kirim data, mencegah refresh halaman (`event.preventDefault()`), lalu mengirimkannya menggunakan API EmailJS:
```javascript
emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => { alert("Message sent successfully!"); })
    .catch((error) => { alert("Failed to send message"); });
```

---

## 4. Panduan & Teknik Prompting AI

Ketika meminta AI untuk memodifikasi atau menambah fitur pada portofolio Anda, kualitas hasil sangat bergantung pada prompt yang Anda berikan. Gunakan panduan berikut agar AI memahami struktur yang sudah ada tanpa merusak desain aslinya.

### Prinsip Utama Prompting Portofolio Premium
1. **Sebutkan Teknologi yang Digunakan:** Tegaskan bahwa proyek ini menggunakan **HTML5 murni, Vanilla CSS dengan CSS Variables, dan JavaScript Vanilla (tanpa framework)**.
2. **Pertahankan Tema Desain:** Minta AI untuk selalu mengimplementasikan kelas `.glass` pada elemen baru agar menyatu dengan gaya Glassmorphism.
3. **Minta Kode Contiguous (Utuh) atau Diff:** Minta AI untuk menunjukkan bagian kode mana yang harus diubah atau ditambahkan agar tidak perlu menulis ulang seluruh file yang panjang.
4. **Berikan Context Variabel CSS:** Beri tahu AI tentang warna dasar yang telah diset di CSS (`--cyan`, `--purple`, `--pink`, dsb.) agar AI menggunakan warna tersebut alih-alih warna standar yang acak.

---

### Template Prompt Siap Pakai

Berikut adalah beberapa contoh prompt yang bisa langsung Anda salin dan sesuaikan saat meminta bantuan AI:

#### A. Prompt untuk Menambahkan Section Baru (Contoh: Riwayat Pengalaman / Timeline)
> *"Saya memiliki website portofolio HTML/CSS/JS bertema Glassmorphism premium. Tolong buatkan kode untuk bagian section baru, yaitu 'Timeline Pengalaman Kerja dan Pendidikan'. Gunakan struktur HTML semantik dengan kelas `.glass` dan `.reveal` agar sesuai dengan gaya portofolio saya saat ini. Untuk CSS-nya, silakan gunakan CSS Variables yang sudah ada seperti `--cyan`, `--border`, dan `--card`. Tuliskan kode HTML dan CSS-nya secara terpisah dan rapi."*

#### B. Prompt untuk Menambah Filter Kategori pada Projects
> *"Saya ingin menambahkan fitur filter kategori pada section Projects saya (misal: Semua, Web Dev, UI/UX, AI). Tolong buatkan kode HTML untuk tombol-tombol filter di atas grid projek, berikan tag atribut data (misal: `data-filter`) pada masing-masing projek card, dan berikan kode JavaScript vanilla sederhana untuk menyembunyikan/menampilkan kartu projek berdasarkan kategori yang diklik dengan transisi animasi halus (fade-in)."*

#### C. Prompt untuk Membuat Animasi Hover 3D Tilt pada Kartu
> *"Saya ingin menambahkan efek interaktif 3D tilt pada kartu-kartu projek saya saat disorot mouse (hover) menggunakan JavaScript vanilla. Ketika mouse bergerak di atas `.project-card`, kartu harus sedikit miring mengikuti posisi kursor (seperti efek hover 3D). Ketika mouse pergi, posisinya harus kembali normal secara mulus. Mohon berikan kode JavaScript baru yang bisa saya tambahkan langsung ke file `script.js` saya."*

#### D. Prompt untuk Memperbaiki Responsivitas Mobile
> *"Di layar handphone berukuran di bawah 480px, layout navbar dan beberapa grid projek saya terlihat agak berantakan. Tolong analisis dan buatkan media queries CSS tambahan untuk layar `@media (max-width: 480px)` agar ukuran teks, padding, dan struktur grid tombol sosial media muat dengan sempurna tanpa overflow horizontal."*

#### E. Prompt untuk Integrasi API GitHub secara Dinamis
> *"Saya ingin agar grid projek di portofolio saya tidak ditulis secara manual (hardcoded) di HTML, melainkan diambil secara dinamis dari API repositori GitHub saya menggunakan JavaScript. Tolong buatkan fungsi `fetchGitHubRepos()` yang memanggil API GitHub, lalu membuat elemen kartu projek dengan gaya `.project-card` `.glass` secara dinamis untuk 6 repositori terpopuler saya. Tunjukkan modifikasi yang perlu saya lakukan pada HTML dan JavaScript."*

---

Dengan mengikuti tutorial dan mempraktikkan cara menulis prompt di atas, Anda dapat mengembangkan website portofolio ini menjadi lebih canggih, fungsional, dan tetap memiliki performa visual kelas atas. Selamat berkarya!

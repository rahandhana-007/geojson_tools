# Tutorial: Membuat Peta GeoJSON dari Koordinat Google Maps (Metode Polygon)

Panduan bertahap menggunakan aplikasi **GeoJson Tools** untuk menggambar wilayah (polygon) dari koordinat yang diambil di Google Maps, lalu menyimpannya sebagai file `.geojson`.

---

## 1. Yang perlu disiapkan
- Aplikasi `index.html` (buka di browser, cukup klik dua kali).
- Koneksi internet (untuk menampilkan peta & mengambil koordinat dari Google Maps).
- Daftar koordinat batas wilayah (minimal **3 titik**, idealnya **4 titik atau lebih** agar bentuknya jelas).

> 💡 Polygon akan **otomatis tertutup** — titik terakhir akan disambung kembali ke titik pertama. Jadi Anda **tidak perlu** mengulang titik pertama di akhir.

---

## 2. Ambil koordinat dari Google Maps

Buka [Google Maps](https://maps.google.com) dan cari lokasi wilayah Anda.

**Cara A — Salin koordinat (paling mudah):**
1. Klik kanan pada titik sudut (pojok) wilayah → pilih **Salin koordinat**.
2. Hasilnya kira-kira: `-6.208763, 106.845630` (format **latitude, longitude**).
3. Ulangi untuk setiap sudut wilayah.

**Cara B — Dari URL:**
- Di baris alamat, formatnya `.../@-6.208763,106.845630,15z`. Angka setelah `@` adalah `lat, lng`.

📋 **Saran:** Catat tiap sudut di Notepad, satu pasang per baris.

---

## 3. Siapkan daftar koordinat

Susun menjadi satu blok, **satu pasang koordinat per baris**. Pemisah boleh koma (`,`), spasi, atau titik koma — aplikasi otomatis membacanya.

Contoh wilayah (sekitar Medan):
```
3.595200, 98.672200
3.600000, 98.680000
3.590000, 98.685000
3.588000, 98.675000
```

> 🔄 Aplikasi otomatis mendeteksi urutan. Jika angka pertama di luar rentang garis lintang (−90…90), aplikasi menganggap urutannya kebalik (`lng, lat`) dan menukarnya. Jadi `98.67, 3.59` pun tetap benar.

---

## 4. Buka aplikasi & tempel koordinat

1. Buka `index.html`.
2. Di panel kiri, cari bagian **Buat GeoJSON (Maker)**.
3. Pada bagian **Input Koordinat**, klik kotak **"Banyak koordinat (1 pasang per baris)"**.
4. Tempel (Ctrl+V) daftar koordinat dari Langkah 3.

---

## 5. Buat polygon (wilayah)

Di bawah kotak tersebut terdapat 3 tombol:
- 📍 **Titik** → setiap baris jadi satu titik
- 📏 **Garis** → disambung jadi satu garis
- ▱ **Polygon** → disambung jadi **satu wilayah terisi**

👉 Klik **▱ Polygon**.

Seketika:
- Peta men-zoom ke wilayah tersebut.
- Muncul **polygon hijau berisi** (filled area) sesuai koordinat Anda.
- Di panel **Daftar & Properti** muncul nama polygon + **luas dalam hektar (ha)**.

---

## 6. Cek luas wilayah (hektar)

Luas dihitung otomatis dengan rumus geodesic bumi (akurat mengikuti kelengkungan bumi), lalu ditampilkan dalam **hektar**:

- Pada tiap baris polygon di **Daftar & Properti**: `12.45 ha`
- Di bawah daftar: **Total luas** (jika lebih dari satu polygon)
- Pada **popup** saat Anda klik polygon di peta: properti `luas_ha`
- Jika membuka file geojson: di panel **Informasi** → baris *Total luas polygon*

---

## 7. Beri nama & kelola

- Klik kolom nama pada **Daftar & Properti**, ketik nama wilayah (mis. *Kebun A*), lalu tekan Enter.
- Untuk hapus satu polygon: tombol **✕** di barisnya.
- Untuk hapus semua gambaran: tombol **🗑️ Bersihkan** (di bagian Maker).
- Untuk batalkan yang terakhir digambar: **↩️ Hapus Terakhir**.

---

## 8. Unduh / ekspor GeoJSON

1. Klik **⬇️ Unduh GeoJSON** (di bagian Maker).
2. File `hasil.geojson` otomatis terunduh.

Isi file sudah berbentuk **FeatureCollection** standar, misalnya:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Kebun A", "luas_ha": 145.32 },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[98.6722,3.5952],[98.68,3.6],[98.685,3.59],[98.675,3.588],[98.6722,3.5952]]]
      }
    }
  ]
}
```

---

## 9. Verifikasi (buka kembali)

1. Seret file `hasil.geojson` ke kotak **"Seret & lepas file GeoJSON ke sini"** (atau klik kotak untuk memilih file).
2. Peta akan memuat ulang polygon Anda **sebagai wilayah terisi** (bukan hanya titik).
3. Klik polygon → popup menampilkan nama & `luas_ha`.

---

## 💡 Tips & Troubleshooting

| Masalah | Solusi |
|---|---|
| Polygon tidak muncul, hanya titik | Pastikan menekan **▱ Polygon**, bukan 📍 Titik. Butuh minimal 3 koordinat. |
| Pesan "Butuh minimal 3 koordinat" | Tiap baris harus berisi 2 angka (lat & lng). Cek tidak ada baris kosong/terpisah. |
| Posisi tampak meleset | Pastikan tidak ada angka terbalik. Aplikasi menangani otomatis, tapi periksa tanda negatif (Selatan = lat negatif, Barat = lng negatif). |
| Ingin titik dari GPS | Klik **📍 Lokasi Saya** untuk mengambil koordinat perangkat otomatis. |
| Polygon dari gambar tangan | Pilih alat **▱ Polygon** di Maker, klik tiap sudut di peta, lalu **klik dua kali** untuk menutup. |

---

## 📘 Contoh lengkap (copy-paste siap pakai)

```
3.595200, 98.672200
3.600000, 98.680000
3.590000, 98.685000
3.588000, 98.675000
```

Tempel ke kotak "Banyak koordinat" → klik **▱ Polygon** →Polygon siap dengan luas otomatis dalam hektar.

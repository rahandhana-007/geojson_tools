# Cara Deploy ke GitHub Pages (agar bisa di-install di HP)

Panduan singkat agar aplikasi `GeoJson Tools` bisa diakses via **HTTPS** dan **di-install ke home screen Android/iOS**.

---

## Opsi A — Upload langsung (paling mudah, ~3 menit)

1. Buka [github.com](https://github.com) → **Sign up / Log in**.
2. Buat **New repository** (mis. `geojson-tools`). Centang **Public**.
3. Di repository, klik **Add file → Upload files**.
4. Unggah **semua** isi `geojson-tools.zip` (ekstrak dulu di komputer Anda), yaitu:
   - `geojson-viewer.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`
   - (opsional) `tutorial-polygon.md`, `contoh.geojson`
5. Klik **Commit changes**.
6. Buka **Settings → Pages** → di "Build and deployment", pilih **Deploy from a branch**, branch = `main` (atau `master`), folder = `/ (root)`. Lalu **Save**.
7. Tunggu ±1 menit. URL aplikasi Anda:
   ```
   https://<username>.github.io/geojson-tools/geojson-viewer.html
   ```
8. Buka URL tersebut di **Chrome Android** → menu (⋮) → **Add to Home screen**.

> 💡 Agar URL lebih pendek (`https://<username>.github.io/geojson-tools/`), ganti nama file utama menjadi **`index.html`** dan sesuaikan `start_url` di `manifest.json` menjadi `./`.

---

## Opsi B — Via GitHub Desktop (jika sudah terbiasa Git)

1. Clone repository, salin semua file aplikasi ke dalamnya.
2. Commit & Push.
3. Aktifkan Pages seperti langkah 6–7 di Opsi A.

---

## Uji sudah jadi PWA / bisa di-install

- Buka di Chrome Desktop → klik ikon **install** (ⁿ) di address bar, atau menu → *Install app*.
- Buka di Chrome Android → menu → *Add to Home screen*.
- Di iOS: buka di Safari → Share → *Add to Home Screen*.

Kalau muncul prompt instal otomatis, berarti manifest + ikon + service worker sudah terbaca dengan benar.

---

## ⚠️ Catatan
- Wajib **HTTPS** (GitHub Pages otomatis HTTPS). Di `file://` instal PWA tidak akan muncul.
- Semua file harus **sefolder** dengan `geojson-viewer.html` (manifest & sw.js mereferensikannya relatif).
- Untuk offline total, buka aplikasi **sekali saat online** dulu (service worker akan cache Leaflet dari CDN).
- Domain `github.io` bisa di-ganti dengan domain sendiri nanti jika diperlukan.

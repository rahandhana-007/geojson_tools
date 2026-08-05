# Cara Deploy ke Vercel (agar bisa di-install di HP)

Panduan singkat deploy `GeoJson Tools` ke **Vercel** — otomatis **HTTPS**, CDN cepat, dan mendukung PWA (install ke home screen).

---

## Opsi A — Import dari GitHub (recommended, auto-update)

1. Unggah semua file aplikasi ke repo GitHub (lihat `cara-deploy-github-pages.md` jika perlu).
2. Buka [vercel.com](https://vercel.com) → **Log in** (bisa pakai akun GitHub).
3. Klik **Add New → Project** → pilih repository Anda → **Import**.
4. Di halaman konfigurasi:
   - **Framework Preset**: pilih **Other** (atau biarkan terdeteksi statis).
   - **Root Directory**: `/` (default).
   - Build Command & Output: biarkan default (file statis).
5. Klik **Deploy**.
6. Selesai! URL aplikasi:
   ```
   https://<nama-project>.vercel.app/
   ```
7. Buka di **Chrome Android** → menu (⋮) → **Add to Home screen**.

> Setiap kali Anda `git push` perubahan ke repo, Vercel otomatis **redeploy**.

---

## Opsi B — Vercel CLI (drag folder via terminal)

1. Install Node.js, lalu:
   ```bash
   npm install -g vercel
   ```
2. Di folder berisi file aplikasi:
   ```bash
   vercel login
   vercel
   ```
3. Ikuti pertanyaan (pilih project baru, default settings).
4. Setelah deploy, jalankan `vercel --prod` untuk produksi, atau cukup buka URL yang diberikan.

---

## Opsi C — Upload folder (tanpa Git)

1. Buka [vercel.com/new](https://vercel.com/new).
2. Pilih **Upload** → pilih folder berisi file aplikasi (pastikan `index.html`, `manifest.json`, `sw.js`, `icon-*.png` ada di dalamnya).
3. Klik **Deploy**.

---

## 🔧 Url rapi
Aplikasi sudah menggunakan `index.html`, sehingga cukup buka:
```
https://<nama-project>.vercel.app/
```
Tidak perlu mengubah apa pun — `start_url` di `manifest.json` sudah `"./"`.

---

## ✅ Verifikasi PWA
- Chrome Desktop: ikon install (ⁿ) di address bar → *Install app*.
- Chrome Android: menu → *Add to Home screen*.
- iOS Safari: Share → *Add to Home Screen*.

Jika prompt install muncul, manifest + ikon + service worker sudah benar terbaca.

---

## ⚠️ Catatan
- Wajib **HTTPS** (Vercel otomatis). Di `file://` instal PWA tidak muncul.
- Semua file harus **sefolder** (manifest & sw.js mereferensikannya relatif).
- Untuk mode **offline**, buka aplikasi **sekali saat online** dulu (service worker cache Leaflet dari CDN).
- `vercel.json` disediakan agar `sw.js` & `manifest.json` tidak ikut ke-cache browser (update selalu terambil).

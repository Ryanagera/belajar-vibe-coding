# Belajar Vibe Coding - Backend API

Proyek ini dibuat menggunakan runtime JavaScript [Bun](https://bun.sh/), framework backend berperforma tinggi [ElysiaJS](https://elysiajs.com/), [Drizzle ORM](https://orm.drizzle.team/), dan interaksi pangkalan data [MySQL](https://www.mysql.com/).

## Persyaratan Sistem (Prerequisites)

Untuk menjalankan proyek ini, mesin Anda perlu memiliki instalasi beberapa alat utama:
- **Bun**: Kunjungi situs resmi Bun untuk instruksi instalasi, atau instal melalui command ini (Mac/Linux):
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- **MySQL Database**: Server SQL yang dikonfigurasi berjalan secara lokal maupun di dalam cloud/remote system.

## Instalasi Ke Dalam Lingkungan Lokal

Ikuti langkah-langkah di bawah ini untuk mengatur dan menjalankan web service secara lokal:

1. **Unduh (Clone) Repository**
   Buka terminal pengoperasian perangkat lunak lalu laksanakan clone git di *folder development*:
   ```bash
   git clone <alamat_repository>
   cd belajar-vibe-coding
   ```

2. **Pemasangan Dependencies**
   Gunakan Bun Package Manager untuk menginstal pustaka-pustaka terkait:
   ```bash
   bun install
   ```

3. **Konfigurasi Environment Database (`.env`)**
   Aplikasi menaruh rahasianya di *environment variable location file* berformat `.env`. Terdapat contoh file (`.env.example`) yang dapat Anda modifikasi:
   ```bash
   cp .env.example .env
   ```
   Buka di text-editor kemudian sesuaikan alamat `DATABASE_URL` ke instalasi database MySQL yang Anda jalankan sendiri. (Sintaks: `mysql://USER:PASSWORD@HOST:PORT/DB_NAME`)

4. **Inisiasi Skema Database (Database Push)**
   Anda perlu membuat arsitektur struktur tabel-tabel secara definitif berdasarkan framework `Drizzle`. Jalankan:
   ```bash
   bun run db:push
   ```
   *Note: Tool ini akan menghubung secara aktif ke DB MySQL milik Anda, pastikan ia dihidupkan sebelum script diklik (ataupun dieksekusi).*

## Menjalankan Server Aplikasi Web

Kami menggunakan NPM script bernama `bun run dev`. Baris perintah ini memutar engine server berbasis *watchmode*, artinya setiap modifikasi pada source file dengan seketika memicu kompilasi perbaikan dan restarting program.

Laksanakan:
```bash
bun run dev
```

Secara *default*, *Localhost service URL* akan memetakan *request target* ke port HTTP standar, yakni `http://localhost:3000`.

## Scripts Utama
Dalam file `package.json`, proyek memliki serangkaian instruksi singkat antara lain:
- `bun run dev` : Memutar server dengan metode *auto-reload / hot refressing*.
- `bun run db:generate` : Memaksa Drizzle melakukan verifikasi dan penulisan hasil *migrate* script baru ke `.sql`.
- `bun run db:push` : Menanamkan model definisi SQL Schema terbaru ke live MySQL instansi.

## Struktur Direktori Standar Pembangunan
- `src/` : Pintu gerbang serta file penunjang inti program.
  - `src/index.ts` : File masuk / App instance registry
  - `src/db/` : Pengaturan koneksi engine database dan definisi blueprint `schema.ts`.
  - `src/routes/` : (*Coming Soon*) Kumpulan pemetaan API HTTP Request ke Endpoint Elysia JS.
  - `src/services/` : (*Coming Soon*) File yang difokuskan khusus ke penyelesaian komputasi _logic program / database parsing_.

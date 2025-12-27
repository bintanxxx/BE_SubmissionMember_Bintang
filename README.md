# 🎟️ Backend Event Ticketing System (Submission)

Project ini dibangun sebagai solusi Backend untuk platform tiket event online. Sistem ini dirancang untuk menangani integritas data transaksi (**The Gatekeeper Logic**) dan keamanan sistem (**Secure the Crowd**).

Dibangun menggunakan: **Node.js, Express, TypeScript, Prisma ORM, dan PostgreSQL**.

---

## 📋 Cakupan Studi Kasus

Project ini menggabungkan solusi untuk dua studi kasus dalam satu repositori:

### 1. Studi Kasus I: "The Gatekeeper Logic" (Soal 2)

Fokus pada integritas data dan pencegahan _overselling_.

- **Database Design:** Menggunakan relasi `Users` -> `Events` -> `Transactions` (ERD Terlampir).
- **Atomic Transaction:** Menggunakan `prisma.$transaction` untuk memastikan pengecekan stok, pengurangan kuota, dan pencatatan transaksi terjadi secara atomik. Jika stok habis saat bersamaan, transaksi dibatalkan.
- **Logic Location:** `src/services/transactionService.ts`

### 2. Studi Kasus II: "Secure the Crowd!" (Soal 3)

Fokus pada keamanan, autentikasi, dan penggunaan Framework.

- **Framework:** Migrasi ke Express.js dengan struktur MVC + Service Layer.
- **Authentication:** Menggunakan JWT (JSON Web Token) untuk memproteksi endpoint transaksi.
- **Authorization:** Middleware khusus untuk membedakan hak akses `ADMIN` (buat event) dan `CUSTOMER` (beli tiket).
- **Security:** Password user di-hash menggunakan `bcrypt`.

---

## 🛠️ Tech Stack & Tools

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Auth:** JSON Web Token (JWT) & Bcrypt
- **Docs:** Swagger UI Express

---

## 🚀 Cara Menjalankan (Installation)

Pastikan Anda sudah menginstall Node.js dan memiliki koneksi PostgreSQL (Supabase).

1.  **Clone Repository**

    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Konfigurasi Environment**
    Buat file `.env` di root folder dan isi sesuai kredensial Anda:

    ```env
    PORT=3000
    DATABASE_URL="postgresql://postgres.[username]:[password]@aws-0-[region][.pooler.supabase.com:6543/postgres](https://.pooler.supabase.com:6543/postgres)"
    JWT_SECRET="rahasia_super_aman"
    ```

4.  **Database Setup (Prisma)**
    Generate Prisma Client untuk sinkronisasi dengan database:

    ```bash
    npx prisma generate
    ```

5.  **Jalankan Server**
    Mode Development:
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3000`.

---

## 📚 Dokumentasi API

Dokumentasi lengkap endpoint (Request/Response) tersedia secara interaktif melalui Swagger UI.

- **URL Dokumentasi:** `http://localhost:3000/api-docs`

### Endpoint Utama

| Method | Endpoint                | Akses     | Deskripsi                            |
| :----- | :---------------------- | :-------- | :----------------------------------- |
| `POST` | `/api/v1/auth/register` | Public    | Mendaftar user baru (Admin/Customer) |
| `POST` | `/api/v1/auth/login`    | Public    | Login untuk mendapatkan Bearer Token |
| `GET`  | `/api/v1/events`        | Public    | Melihat daftar event                 |
| `POST` | `/api/v1/events`        | **Admin** | Membuat event baru                   |
| `POST` | `/api/v1/transactions`  | **User**  | Membeli tiket (Gatekeeper Logic)     |

---

## 📂 Struktur Folder

Struktur project menggunakan pola MVC + Service Layer untuk _Separation of Concerns_.

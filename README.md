# SiapSuruh

## 📌 Tentang Proyek
SiapSuruh adalah platform layanan **on-demand** yang memudahkan masyarakat dalam mencari dan memesan berbagai layanan secara **terjadwal**.
Aplikasi ini juga membantu penyedia jasa memperluas cakupan pelanggan mereka dengan cara yang **fleksibel** dan **terpercaya**.

## 🔧 Instalasi  
Berikut langkah-langkah untuk menjalankan proyek:  

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/Ruumaa/SiapSuruh.git
```

2️⃣ Menjalankan Frontend
```bash
# Pindah folder
cd SiapSuruhReact/

# Install dependencies
npm install

# Jalankan proyek
npm run dev
```

3️⃣ Menjalankan Backend
```bash
# Pindah folder
cd SiapSuruhExpress/

# Buat file .env dan isi dengan konfigurasi berikut
DATABASE_URL="mysql://root:@localhost:3306/db_name"
JWT_SECRET_KEY=secret

# Install dependencies
npm install

# Sinkronisasi database
npx prisma migrate dev

# (Optional) Jalankan seed untuk data awal
npx prisma db seed

# Jalankan backend
npm run dev
```

🚀 Cara Menggunakan
Jalankan backend dengan npm run dev pada folder SiapSuruhExpress/
Jalankan frontend dengan npm run dev pada folder SiapSuruhReact/
🛠 Teknologi yang Digunakan
Frontend: React.js, TailwindCSS
Backend: Express.js, Prisma, MySQL
Authentication: JSON Web Token (JWT)

---

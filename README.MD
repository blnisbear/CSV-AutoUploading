# ระบบจัดการคลังคอมพิวเตอร์

## คำอธิบาย

แอปพลิเคชันสำหรับจัดการและแสดงรายการคอมพิวเตอร์ รองรับการอัปโหลดไฟล์ CSV และบันทึกลงฐานข้อมูล

- **Backend**: Go, Gin, GORM, PostgreSQL
- **Frontend**: React, TypeScript, MUI

### ตั้งค่า `.env` (Backend)

สร้างไฟล์ `.env` ในโฟลเดอร์ `backend` ด้วยเนื้อหาดังนี้:
```ini
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=<ชื่อผู้ใช้ฐานข้อมูล>
DB_PASS=<รหัสผ่านฐานข้อมูล>
DB_NAME=<ชื่อฐานข้อมูล>
JWT_SECRET=<รหัสลับสำหรับ JWT>
```

### ตั้งค่า `.env` (Frontend)

## สิ่งที่ต้องทำ Backend 

1. ติดตั้ง dependencies:
   ```bash
   cd backend
   go mod tidy
   ```
2. สร้างฐานข้อมูล:
   ```sql
   CREATE DATABASE <ชื่อฐานข้อมูล>;
   ```
3. รัน migration:
   ```bash
   go run main.go
   ```
4. สตาร์ทเซิร์ฟเวอร์:
   ```bash
   go run main.go
   ```
5. เปิด API ที่: `http://localhost:8080`

## สิ่งที่ต้องทำ Frontend

1. ติดตั้ง dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. สตาร์ท dev server:
   ```bash
   npm run dev
   ```
3. เปิดในเบราว์เซอร์ที่: `http://localhost:5173`



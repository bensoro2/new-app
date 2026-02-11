# 📱 To-Do List App

> แอพมือถือจัดการรายการสิ่งที่ต้องทำ สร้างด้วย React Native + Expo

---

## 📖 เกี่ยวกับโปรเจค

แอพ To-Do List สำหรับจัดการงานประจำวัน พัฒนาเป็นงานนักศึกษา มีฟีเจอร์:

- ✅ เพิ่ม/ลบ/แก้ไขงาน
- ✅ เช็คงานที่ทำเสร็จแล้ว
- ✅ กรองงาน (ทั้งหมด/ทำแล้ว/ยังไม่ทำ)
- ✅ บันทึกข้อมูลถาวร (ไม่หายเมื่อปิดแอพ)
- ✅ UI ใช้งานง่าย สวยงาม

---

## 🛠️ เทคโนโลยีที่ใช้

- **React Native** - Framework สำหรับสร้างแอพมือถือ
- **Expo** - เครื่องมือช่วยพัฒนา
- **AsyncStorage** - บันทึกข้อมูลในเครื่อง
- **JavaScript/JSX** - ภาษาที่ใช้พัฒนา

---

## 📋 Requirements

- Node.js >= 14.x
- npm >= 6.x
- Expo Go App (ติดตั้งบนมือถือ)

---

## 🚀 วิธีรันโปรเจค

### 1. ติดตั้ง Dependencies

```bash
cd todo-app
npm install
```

### 2. รัน Development Server

```bash
npm start
```

หรือ

```bash
npx expo start
```

### 3. เปิดแอพบนมือถือ

**Android:**
1. เปิดแอพ Expo Go
2. สแกน QR code จาก Terminal
3. รอให้แอพโหลด

**iOS:**
1. เปิด Camera app
2. สแกน QR code
3. กด notification เพื่อเปิดใน Expo Go

---

## 📱 วิธีติดตั้งแอพ (APK)

### สำหรับ Android

1. **Build APK:**
```bash
eas build -p android --profile preview
```

2. **ดาวน์โหลด APK** จาก URL ที่ได้

3. **ติดตั้งบนมือถือ:**
   - คัดลอกไฟล์ APK ไปมือถือ
   - เปิดไฟล์และติดตั้ง
   - (อนุญาต "Install from Unknown Sources")

---

## 📁 โครงสร้างโปรเจค

```
todo-app/
├── App.js              # ไฟล์หลักของแอพ
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── assets/             # Images และ Icons
├── PLAN.md             # แผนการพัฒนาแบบละเอียด
└── README.md           # คู่มือนี้
```

---

## 🎯 Features (ฟีเจอร์)

### 1. จัดการงาน
- เพิ่มงานใหม่ผ่าน TextInput
- ลบงานด้วยปุ่มลบ
- แก้ไขสถานะงาน (เสร็จ/ยังไม่เสร็จ)

### 2. กรองงาน
- แสดงงานทั้งหมด
- แสดงเฉพาะงานที่ทำเสร็จ
- แสดงเฉพาะงานที่ยังไม่ทำ

### 3. บันทึกข้อมูล
- ใช้ AsyncStorage บันทึกข้อมูล
- ข้อมูลไม่หายเมื่อปิดแอพ
- โหลดข้อมูลอัตโนมัติเมื่อเปิดแอพ

---

## 📸 Screenshots

(เพิ่ม screenshots ตอน demo)

---

## 🧪 การทดสอบ

### ทดสอบบนมือถือจริง
```bash
npm start
# สแกน QR code ด้วย Expo Go
```

### ทดสอบบน Web (สำหรับ debug)
```bash
npm run web
```

---

## 🐛 แก้ปัญหาที่พบบ่อย

### แอพไม่อัพเดท
```bash
npx expo start -c  # Clear cache
```

### ติดตั้ง Dependencies ใหม่
```bash
rm -rf node_modules
npm install
```

### Port ถูกใช้งานอยู่
```bash
npx expo start --port 8082
```

---

## 📚 เอกสารเพิ่มเติม

- [PLAN.md](./PLAN.md) - แผนการพัฒนาแบบละเอียดทุกขั้นตอน
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)

---

## 👨‍🎓 ข้อมูลโปรเจค

- **ประเภท:** งานนักศึกษา (Student Project)
- **ระดับ:** Beginner-Friendly
- **เวลาที่ใช้พัฒนา:** ~1 สัปดาห์
- **สามารถใช้งานได้จริง:** ✅ Yes

---

## 📞 ติดต่อ / สอบถาม

หากมีปัญหาหรือข้อสงสัย สามารถ:
- เปิด Issue ใน GitHub
- ถามผู้พัฒนา
- อ่านเอกสารใน [PLAN.md](./PLAN.md)

---

## 📝 License

MIT License - ใช้งานได้ฟรี สำหรับการศึกษา

---

**สร้างด้วย ❤️ และ Claude Code**

# Prompt Log

ไฟล์นี้ใช้เก็บเฉพาะคำสั่งจากผู้ใช้ในลักษณะ captain log

## กติกา

- บันทึกเฉพาะข้อความคำสั่งหรือคำขอจากผู้ใช้เท่านั้น
- ไม่บันทึกคำตอบของระบบ
- ไม่บันทึก reasoning, notes, หรือ implementation details
- เพิ่มรายการใหม่ไว้ด้านบนสุดเสมอ
- ถ้ามีบริบทสั้น ๆ ที่ผู้ใช้พิมพ์มาพร้อมคำสั่ง ให้เก็บรวมในรายการเดียวกันได้
- ทุกครั้งที่มี user prompt ใหม่ ต้องบันทึกลงไฟล์นี้ก่อนทำการแก้โค้ดหรือแก้เอกสารที่เป็นสาระสำคัญ
- ใช้เวลาเขต `Asia/Bangkok` และ format `YYYY-MM-DD HH:mm`
- ห้ามข้ามการบันทึก แม้งานนั้นจะเป็นงานเอกสาร งาน config หรืองาน instruction file

## Template

```md
## YYYY-MM-DD HH:mm

[ใส่คำสั่งของผู้ใช้ที่นี่]
```

## Entries

## 2026-04-26 13:41

ผมเจอว่า prompt ล่าสุดไม่ถูกบันึกใน prompt.md ตามที่เราตกลงกันไว้ว่าทุก prompt จะถูก record ไว้
แก้ไขและอัพเดทเอกสารต่างๆ เพื่อให้การทำงานครั้งต่อไปทำงานได้ถูกต้อง

## 2026-04-26 13:30

ผมต้องการเพิ่ม agnet rule สำหรับ project นี้เพื่อรองรับการทำงานจาก model agent อื่นๆ เช่น codex claude code qwen gemini glm และอื่นๆ ให้ใช้ file ที่ model agent ดังกล่าวสามารถเข้าถึงได้

## 2026-04-26 13:00

ผมอยากเพิ่ม Engeering Practice เรื่อง Automate e2e โดยใช้
- playwright
- เขียนแบบ page object
- ต้องมี feature file ด้วยสำหรับเก็บ test case

## 2026-04-26 12:08

ผมเจอ error บน github action deploy เกี่ยวกับการ setup github page
Error: Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions, or consider exploring the `enablement` parameter for this action. Error: Not Found - https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site
Error: HttpError: Not Found - https://docs.github.com/rest/pages/pages#get-a-apiname-pages-site

## 2026-04-26 12:06

ผมเจอ error บน github action state Setup Node
Error: Unable to locate executable file: pnpm. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.

## 2026-04-26 12:01

ใช้งาน pnpm เป็นหลักในการรันคำสั่งต่างๆ setup .nvmrc พร้อมกับระบุ node version ที่ใช้งานใน project เบื้องต้น
ให้ใช้งาน v24.14.0

## 2026-04-26 11:46

ผมต้องการสร้าง Application todo-list feature พื้นฐาน ควรมีอย่างน้อย เพิ่มงาน / แสดงรายการ / แก้ไข / ทำเสร็จ / ลบ / filter ครับ
requirement
- ใช้ภาษา Typescript เป็นหลัก
- สามารถใช้งานผ่าน mobile ได้ เบื้องต้นอาจจะเป็น responsive website support mobile ipad website
- เป็น stateless ไม่จำเป็นต้องมีการเก็บข้อมูล (No Need DB)
โดยอยากให้ใช้งาน engineering practice ดังนี้
- TDD
- Code Smell
- 12 Factor
- CI/CD
และจะต้องให้ทำให้่ support ในกรณีที่ใช้งาน  model อื่นๆ ในกรณีที่มีการเปลี่ยนแปลงการใช้่งานในอนาคต

## 2026-04-26 11:37

สร้างไฟล์ markdown สำหรับ prompt.md เพื่อเอาไว้เก็บ prompt ที่ผมสั่งงานคุณ concept จะคล้ายๆ captain log โดยเก็บเฉพาะคำสั่งของผมเท่านั้น

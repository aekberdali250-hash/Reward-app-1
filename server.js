const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// لوحة الإدارة
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

// API الشركات
let companies = [
  {
    id: 1,
    name: "AdGem",
    type: "Offerwall",
    status: true
  }
];

app.get("/api/companies", (req, res) => {
  res.json(companies);
});

app.post("/api/companies", (req, res) => {
  const { name, type } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "اسم الشركة مطلوب"
    });
  }

  const company = {
    id: Date.now(),
    name: name,
    type: type || "Offerwall",
    status: true
  };

  companies.push(company);

  res.json({
    success: true,
    company: company
  });
});

// فحص السيرفر
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Reward App server is running"
  });
});

// تشغيل السيرفر
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

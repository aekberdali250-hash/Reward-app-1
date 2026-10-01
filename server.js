const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let companies = [
  { id: 1, name: "AdGem", type: "Offerwall", status: true }
];

app.get("/api/companies", (req, res) => res.json(companies));

app.post("/api/companies", (req, res) => {
  const { name, type } = req.body;
  if (!name) return res.status(400).json({ error: "اسم الشركة مطلوب" });

  const company = {
    id: Date.now(),
    name,
    type: type || "Offerwall",
    status: true
  };
  companies.push(company);
  res.json({ success: true, company });
});app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

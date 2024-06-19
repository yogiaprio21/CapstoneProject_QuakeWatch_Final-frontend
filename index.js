const express = require("express");
const path = require("path");

const app = express();
const PORT = 9000;

// Melayani file statis dari folder 'dist'
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    const r = await pool.query("select now() as now");
    res.json({ ok: true, dbTime: r.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: (err as Error).message });
  }
});


app.get("/api/test-items", async (_req, res) => {
  const r = await pool.query("select * from public.test_items order by id desc");
  res.json(r.rows);
});


app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);

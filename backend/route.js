import { NextResponse } from "next/server";
import Database from "better-sqlite3";

// Connect to the SQLite database
const db = new Database("demographics.db");

// Create the demographics table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS demographics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL
  );
`);

export async function POST(request) {
  try {
    const { age, gender } = await request.json();

    // Insert data into the database
    const stmt = db.prepare(
      "INSERT INTO demographics (age, gender) VALUES (?, ?)"
    );
    const result = stmt.run(age, gender);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit form" },
      { status: 500 }
    );
  }
}

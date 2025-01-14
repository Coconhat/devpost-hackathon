import Database from "better-sqlite3";

// Initialize the database
const db = new Database("form-data.db");

// Create a table to store form submissions
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    gender TEXT,
    height INTEGER,
    weight INTEGER,
    bloodPressure INTEGER,
    familyHistory TEXT,
    historyofHypertension TEXT,
    historyofHighCholesterol TEXT,
    physicalActivityLevel TEXT,
    smokingStatus TEXT,
    alcoholConsumption TEXT,
    dietAndNutrition TEXT,
    fastingBloodGlucoseLevel INTEGER,
    hbA1cLevel INTEGER,
    triglycerideLevels INTEGER,
    HDLCholestero INTEGER,
    LDLCholesterol INTEGER,
    frequentUrination TEXT,
    increasedThirst TEXT,
    blurredVision TEXT,
    slowHealing TEXT,
    fatigue TEXT,
    tinglingOrNumbnessInHandsOrFeet TEXT,
    unexplainedWeightLoss TEXT,
    other TEXT
  )
`);

export default db;

import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors';
import multer from 'multer';
import crypto from 'crypto';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Set up file storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ash#sql@2025',
  database: 'amc_portal'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

// Get users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const table = role === 'admin' ? 'admin' : 'user';
  db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ error: 'Hash comparison error' });
      }

      if (!isMatch) {
        console.log('Invalid credentials for:', email);
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful' });
    });
  });
});

// Add user endpoint
app.post("/api/register", (req, res) => {
  const { email, password, department } = req.body;
  if (!email || !password || !department) {
    return res.status(400).json({ error: 'Email, password, and department are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Hashing error" });

    db.query(
      "INSERT INTO user (email, password, department) VALUES (?, ?, ?)",
      [email, hashedPassword, department],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

// Delete user endpoint
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM user WHERE  UserID = ?", [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
});

//get the emails
app.get('/api/users/emails', (req, res) => {
  const query = "SELECT Email FROM User";
  db.query(query, (err, results) => {
      if (err) {
          console.error("Error fetching user emails:", err);
          return res.status(500).json({ error: "Database error" });
      }
      res.json({ emails: results.map(user => user.Email) });
  });
});


// API Endpoint to handle form submission
app.post("/api/submitRequest", upload.single("signature"), (req, res) => {
  const {
    name,
    department,
    email,
    contact,
    deviceType,
    problemDescription,
    reportingDate,
    reportingTime,
  } = req.body;

  // Generate a random 4-character RequestID (e.g., 'A1B2')
  const requestID = crypto.randomBytes(2).toString("hex").toUpperCase();

  const query = `
    INSERT INTO Service_requests (
      RequestID, Name, Email, Department, Contact_no, DeviceType, 
      ProblemDescription, Status, AssignedEngineer, Reporting_Date, 
      Reporting_Time, DateResolved
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Open', NULL, ?, ?, NULL)`;

  db.query(
    query,
    [
      requestID, // Auto-generated ID
      name,
      email,
      department,
      contact,
      deviceType,
      problemDescription,
      reportingDate,
      reportingTime,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Request submitted successfully!", requestID });
    }
  );
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

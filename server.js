import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS for cross-origin requests

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

// // Register user endpoint
// app.post('/api/register', (req, res) => {
//   const { email, password } = req.body;

//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) return res.status(500).json({ error: 'Hashing error' });

//     db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
//       if (err) return res.status(500).json({ error: 'Database error' });

//       res.status(201).json({ message: 'User registered successfully' });
//     });
//   });
// });

//login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
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
  
//add user endpoint
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  } else {
      // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Hashing error" });

    // Insert the user into the database
    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
  }
  
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

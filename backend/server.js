const express = require('express');
const session = require('express-session');
const CryptoJS = require('crypto-js');
const path = require('path');
const app = express();
const port = 3000;

// Hashed password (SHA-256 hash of "OurLove123")
const hashedPassword = "59e7ba8cd7fd760706192f680069edc2b1c364ce7af707f7376ec5598260f9ef";

// Middleware to parse JSON and handle sessions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: '9a0e8b304853ef0bbf33d822fca39daee3d127a14c73757de38e770df3a9a9d9', // Change this to a secure key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Login endpoint
app.post('/login', (req, res) => {
    const { password } = req.body;

    // Hash the user input
    const hashedInput = CryptoJS.SHA256(password).toString();

    // Compare the hashed input with the stored hash
    if (hashedInput === hashedPassword) {
        req.session.authenticated = true; // Set session as authenticated
        res.json({ success: true, message: "Authentication successful!" });
    } else {
        res.status(401).json({ success: false, message: "Incorrect password." });
    }
});

// Endpoint to check authentication status
app.get('/check-auth', (req, res) => {
    if (req.session.authenticated) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

// Middleware to check authentication
function checkAuth(req, res, next) {
    if (req.session.authenticated) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.redirect('/auth.html'); // Redirect to the login page
    }
}

// Protect all routes except auth.html
app.get(['/', '/index.html', '/gallery.html'], checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', req.path));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
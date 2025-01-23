const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require(path.join(__dirname, 'Firebase', 'siteportofoliu-firebase-adminsdk-fbsvc-b0db63a5c6.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com',
});

const db = admin.firestore();

// Seteaza portul pentru server
const app = express();
const port = 3000;

// Middleware pentru a prelucra datele din formular
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serveste fisierele statice (CSS, JS, imagini) din directoarele corespunzatoare
app.use(express.static(__dirname));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/Imagini', express.static(path.join(__dirname, 'Imagini')));


// Rute pentru a servi fisierele HTML
app.get('/index-ro', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-ro.html'));
});

// Rute pentru pagina principala
app.get('/', (req, res) => {
    res.redirect('/index-ro');  
});

app.get('/index-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-en.html'));
});

// Rute pentru a prelucra si salva datele din formular in Firebase
app.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Adauga datele in Firestore
    await db.collection('contact-form').add({
      name: name,
      email: email,
      message: message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.send('Datele au fost trimise cu succes!');
  } catch (error) {
    console.error('Eroare la salvarea datelor:', error);
    res.status(500).send('A aparut o eroare la salvarea datelor.');
  }
});

app.listen(port, () => {
    console.log(`Serverul ruleaza pe http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const firebaseAdmin = require('firebase-admin');
require('dotenv').config();


const serviceAccount = require('./firebase.json');
const storageBucket = require('./firebaseConfig.json')
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: storageBucket.storageBucket
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-pdf', (req, res) => {
  const userData = req.body;
  
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    const bucket = firebaseAdmin.storage().bucket();
    const fileName = `profile_${Date.now()}.pdf`;
    const file = bucket.file(fileName);

    file.save(pdfData, {
      metadata: { contentType: 'application/pdf' },
    }, async (error) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      const downloadURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      return res.status(200).json({ downloadURL });
    });
  });

  doc.text(`Nome: ${userData.nome}`, 100, 100);
  doc.end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Microserviço rodando na porta ${PORT}`));

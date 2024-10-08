const express=require('express')
const QrCode=require('qrcode')
const app=express();



const myList=["baran"
    ,"baran2"
    ,"baran3"
    ,"baran4"
]
const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My List</title>
  </head>
  <body>
      <h1>My List</h1>
      <ul>
          ${myList.map(item => `<li>${item}</li>`).join('')}
      </ul>
  </body>
  </html>
`;

app.get('/list', (req, res) => {
    res.send(htmlContent);
  });
  const url = 'http://localhost:3010/list';

const base64Html = Buffer.from(htmlContent).toString('base64');

const dataUrl = `data:text/html;base64,${base64Html}`;
QrCode.toDataURL(url, (err, src) => {
    if (err) {
      console.error('Error generating QR Code', err);
      return;
    }
  
    // QR kodun çıktısını konsola bas
    console.log('QR Code Data URL:', src);
  
    // QR kodu bir PNG dosyasına kaydet
    const fs = require('fs');
    const base64Data = src.replace(/^data:image\/png;base64,/, '');
    fs.writeFile('qrcode.png', base64Data, 'base64', (err) => {
      if (err) console.error('Error writing file', err);
      else console.log('QR code saved as qrcode.png');
    });
  });
  



app.listen(3010,()=>{
    console.log("server is running on port 3010")
})
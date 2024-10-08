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
  const url = 'https://baturqr.onrender.com/list';

const base64Html = Buffer.from(htmlContent).toString('base64');

const dataUrl = `data:text/html;base64,${base64Html}`;

app.get('/show-qr', (req, res) => {
    // targetUrl URL'sinden QR kod oluştur
    QrCode.toDataURL(url, (err, src) => {
      if (err) {
        console.error('Error generating QR Code', err);
        res.send('Error generating QR Code');
        return;
      }
  
      // QR kodu gösteren HTML sayfasını döndür
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Scan QR Code</title>
        </head>
        <body>
            <h1>Scan this QR Code</h1>
            <img src="${src}" alt="QR Code" />
            <p>Bu QR kodu taradığınızda listeyi göreceksiniz.</p>
        </body>
        </html>
      `);
    });
  });
  



app.listen(3010,()=>{
    console.log("server is running on port 3010")
})
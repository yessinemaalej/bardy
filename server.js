const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let receivedData = [];

app.post('/api/collect', (req, res) => {
  console.log('DATA RECEIVED:', req.body.type);
  receivedData.push({
    ...req.body,
    timestamp: new Date().toISOString(),
    id: receivedData.length + 1
  });
  
  res.json({ 
    status: 'success', 
    message: 'Data collected',
    totalRecords: receivedData.length
  });
});

app.get('/api/received-data', (req, res) => {
  res.json({
    totalRecords: receivedData.length,
    data: receivedData
  });
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Collector</h1>
    <p>Bardy demo - Total records: ${receivedData.length}</p>
    <a href="/api/received-data">View Data</a>
  `);
});

app.listen(PORT, () => {
  console.log(' Server running on port', PORT);
});
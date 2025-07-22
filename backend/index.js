const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'logs.json');

app.use(cors());
app.use(express.json());

const generateMockLogs = (count) => {
  const logs = [];
  for (let i = 1; i <= count; i++) {
    const now = new Date();
    logs.push({
      id: i.toString(),
      owner: `User ${i}`,
      createdAt: new Date(now.getTime() - i * 1000000).toISOString(),
      updatedAt: new Date(now.getTime() - i * 500000).toISOString(),
      text: `This is a mock log entry number ${i}`,
    });
  }
  return logs;
};

let logs = [];

const loadLogs = () => {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');

      if (fileContent.trim() === '') {
        logs = generateMockLogs(35);
        fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
      } else {
        logs = JSON.parse(fileContent);
      }
    } catch (err) {
      console.error("Failed to load logs.json, using mock data:", err.message);
      logs = generateMockLogs(35);
      fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
    }
  } else {
    logs = generateMockLogs(35);
    fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
  }
};

loadLogs();

const saveLogs = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
};

app.get('/logs', (req, res) => res.json(logs));

app.post('/logs', (req, res) => {
  const { owner, text } = req.body;
  const newLog = {
    id: (Date.now() + Math.random()).toString(36), // Unique ID
    owner,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    text,
  };
  logs.push(newLog);
  saveLogs();
  res.status(201).json(newLog);
});

app.put('/logs/:id', (req, res) => {
  const log = logs.find(l => l.id === req.params.id);
  if (!log) return res.status(404).json({ error: 'Not found' });
  log.owner = req.body.owner;
  log.text = req.body.text;
  log.updatedAt = new Date().toISOString();
  saveLogs();
  res.json(log);
});

app.delete('/logs/:id', (req, res) => {
  const index = logs.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  logs.splice(index, 1);
  saveLogs();
  res.status(204).end();
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
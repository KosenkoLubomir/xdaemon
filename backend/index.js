const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

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

let logs = generateMockLogs(35);

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
  res.status(201).json(newLog);
});

app.put('/logs/:id', (req, res) => {
  const log = logs.find(l => l.id === req.params.id);
  if (!log) return res.status(404).json({ error: 'Not found' });
  log.owner = req.body.owner;
  log.text = req.body.text;
  log.updatedAt = new Date().toISOString();
  res.json(log);
});

app.delete('/logs/:id', (req, res) => {
  const index = logs.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  logs.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
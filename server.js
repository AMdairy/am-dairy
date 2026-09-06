const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
let orders = [];
app.post('/api/order', (req, res) => {
    const order = { id: Date.now(), ...req.body, status: 'Pending', time: new Date().toLocaleString('en-IN') };
    orders.push(order);
    console.log('Order ID:', order.id);
    res.json({ id: order.id, success: true });
});
app.get('/api/orders', (req, res) => { res.json(orders); });
app.post('/api/update-status', (req, res) => {
    const { id, status } = req.body;
    const o = orders.find(x => x.id == id);
    if(o) o.status = status;
    res.json({ success: true });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('AM DAIRY Backend Running on ' + PORT));
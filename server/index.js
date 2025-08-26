const express = require('express');
const connectDB = require('./db.js');
const UserModel = require('./models/User');
const ProductModel = require('./models/Products');
const LoadCellModel = require('./models/LoadCell');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/itemsRoutes');
const detailsRoutes = require('./routes/detailsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

connectDB();  // Establish a single connection to the database

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.status(401).json("Incorrect password");
            }
        } else {
            res.status(404).json("No record exists");
        }
    } catch (err) {
        res.status(500).json("Server error");
    }
});

app.post('/sendData', async (req, res) => {
    try {
        const { cartId, weight, status = 'stable' } = req.body;

        // Basic validation to check required fields
        if (!cartId || typeof weight !== 'number') {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const loadCellData = new LoadCellModel({
            cartId,
            weight,
            status
        });

        await loadCellData.save();
        res.status(200).json('Data inserted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Error inserting data');
    }
});

app.get('/getLatestWeight', async (req, res) => {
    try {
        const latestWeight = await LoadCellModel.findOne().sort({ timestamp: -1 }); // Get the latest entry
        if (!latestWeight) {
            return res.status(404).json({ message: 'No weight data found' });
        }
        res.json(latestWeight);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error retrieving data');
    }
});


app.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await ProductModel.findOne({ pid: pid });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.use('/api', itemsRoutes);
app.use('/api', detailsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

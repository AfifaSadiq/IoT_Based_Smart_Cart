const Items = require("../models/Items.js");


const create = async (req, res) => {
    try {
        const { pid, title, weight, price } = req.body;

        // Check if the item already exists in the cart
        let existingItem = await Items.findOne({ pid });
        
        if (existingItem) {
            // Update the existing item
            existingItem.quantity += 1;
            existingItem.totalWeight = existingItem.quantity * weight;
            existingItem.totalPrice = existingItem.quantity * price;

            await existingItem.save();
            return res.status(200).json({ message: "Quantity increased for existing item", item: existingItem });
        } else {
            // Create a new item with initial quantity, totalWeight, and totalPrice
            const newItem = new Items({
                pid,
                title,
                weight,
                price,
                quantity: 1,
                totalWeight: weight,
                totalPrice: price
            });

            await newItem.save();
            return res.status(201).json({ message: "Item added to cart successfully", item: newItem });
        }
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

const getItems = async(req, res) => {
    try {
        const itemsData = await Items.find();
        if(!itemsData || itemsData.length === 0){
            return res.status(404).json({message: " items data not found"})
        }
        res.status(200).json(itemsData);
    } catch (error) {
        res.status(500).json({errorMessage:error.Message})
    }
}
const decrementItem = async (req, res) => {
    const { pid } = req.params; // Get pid from request parameters

    try {
        const item = await Items.findOne({ pid });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check if the quantity is greater than 1 before decrementing
        if (item.quantity > 1) {
            item.quantity -= 1;
            item.totalWeight = item.quantity * item.weight;
            item.totalPrice = item.quantity * item.price;
            await item.save();
        } else {
            // If quantity is 1, remove the item from the database
            await Items.deleteOne({ pid });
            
        }

        // Fetch and return the updated cart
        const updatedCart = await Items.find();
        return res.status(200).json(updatedCart); // Sending updated cart as response
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


const deleteItem = async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedItem = await Items.findOneAndDelete({ pid });
        
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        
        res.status(200).json({ message: "Item deleted successfully", item: deletedItem });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

const getCartItems = async (req, res) => {
    try {
        const cartItems = await Items.find(); // Adjust this query if you need to filter for cart items.
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: "No items found in cart" });
        }
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};



const addItemToCart = async (req, res) => {
    const { pid, title, weight, price, actualWeight } = req.body;

    try {
        // Step 1: Get the current total weight of all items in the cart
        const currentTotalWeight = await getCartTotalWeight();

        // Step 2: Get the weight of the new item
        const newItemWeight = weight;

        // Step 3: Calculate the total weight (current total weight + new item's weight)
        const newTotalWeight = currentTotalWeight + newItemWeight;

        // Step 4: Compare it with the actual weight (from the load cell)
        if (Math.abs(newTotalWeight - actualWeight) > 0.01) {  // Tolerance of 0.01
            console.log('The weight does not match! Cannot add item to cart.');
            return res.status(400).json({ errorMessage: 'The weight does not match! Cannot add item to cart.' });
        }

        // Step 5: Proceed to add the item to the cart if the weights match
        const newItem = new Items({
            pid,
            title,
            weight: newItemWeight,
            price,
            quantity: 1,
            totalWeight: newItemWeight,
            totalPrice: price  // Assuming the price is for 1 unit
        });

        await newItem.save();
        console.log('Item added to cart:', newItem);
        return res.status(200).json({ message: 'Item added to cart successfully.' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ errorMessage: 'Error adding item to cart.' });
    }
};

const clearItems = async (req, res) => {
    try {
        await Items.deleteMany({});
        res.status(200).json({ message: "All items cleared successfully!" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

module.exports = { create, getItems, decrementItem, deleteItem, getCartItems, addItemToCart, clearItems }; 
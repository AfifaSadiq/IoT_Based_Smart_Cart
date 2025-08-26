const Details = require("../models/Details.js");

const addItemToDetails = async (req, res) => {
    try {
        const { weight, price } = req.body; // Destructure the values sent by the request
        
        let details = await Details.findOne({});
        
        if (details) {
            details.finalQuantity += 1; 
            details.finalWeight += weight;
            details.finalPrice += price; 
            await details.save(); 
            return res.status(200).json({ message: "Details updated", details });
        } else {
            const newDetails = new Details({
                finalQuantity: 1,
                finalWeight: weight, 
                finalPrice: price, 
            });
            
            await newDetails.save();
            return res.status(201).json({ message: "Details created", details: newDetails });
        }
    } catch (error) {
        console.error('Error updating details:', error);
        res.status(500).json({ errorMessage: 'Error updating details' });
    }
};

const clearDetails = async (req, res) => {
    try {
        await Details.deleteOne({});
        res.status(200).json({message: "Details cleared!"});
    }catch {
        res.status(500).json({ errorMessage: error.message });
    }
};

const reduceQuantity = async (req, res) => {
    try {
        const { weight, price } = req.body; // Get weight and price from the request body
        
        let details = await Details.findOne({});
        if (!details) {
            return res.status(404).json({ message: 'Details record not found' });
        }
        
        // Decrement the values
        details.finalQuantity -= 1;
        details.finalWeight -= weight;
        details.finalPrice -= price;
        
        // Ensure values do not go below zero
        if (details.finalWeight < 0) details.finalWeight = 0;
        if (details.finalPrice < 0) details.finalPrice = 0;
        
        if (details.finalQuantity <= 0) {
            // If finalQuantity is 0 or less, delete the record
            await Details.deleteOne({});
            return res.status(200).json({ message: 'Details record deleted as quantity reached 0' });
        }
        
        // Save the updated details if finalQuantity is still greater than 0
        await details.save();
        res.status(200).json({ message: 'Details updated successfully', details });
    } catch (error) {
        console.error('Error decrementing details:', error);
        res.status(500).json({ errorMessage: 'Error decrementing details' });
    }
}

const getFinalDetails = async (req, res) => {
    try {
        let details = await Details.findOne({});
        if (!details) {
            return res.status(404).json({ message: 'Details record not found' });
        }

        // Send the required details as a response
        return res.status(200).json({
            totalQuantity: details.finalQuantity,
            finalWeight: details.finalWeight,
            totalPrice: details.finalPrice
        });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ errorMessage: 'Error fetching details' });
    } 
};

const deleteFromDetails = async (req, res) => {
    try {
        const { weight, price, quantity } = req.body; // Get weight, price, and quantity from the request body

        let details = await Details.findOne({});
        if (!details) {
            return res.status(404).json({ message: 'Details record not found' });
        }

        // Decrement the values in the Details collection
        details.finalQuantity -= quantity;
        details.finalWeight -= weight * quantity;
        details.finalPrice -= price * quantity;

        // Ensure values do not go below zero
        if (details.finalWeight < 0) details.finalWeight = 0;
        if (details.finalPrice < 0) details.finalPrice = 0;

        if (details.finalQuantity <= 0) {
            // If quantity is zero, delete the Details record
            await Details.deleteOne({});
            return res.status(200).json({ message: 'Details record deleted as quantity reached 0' });
        }

        // Save the updated details
        await details.save();
        res.status(200).json({ message: 'Details updated successfully after product deletion', details });
    } catch (error) {
        console.error('Error deleting from details:', error);
        res.status(500).json({ errorMessage: 'Error deleting from details' });
    }
};




module.exports = { addItemToDetails, clearDetails, reduceQuantity, getFinalDetails, deleteFromDetails }; 
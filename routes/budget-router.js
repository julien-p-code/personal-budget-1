const express = require('express');
const budgetRouter = express.Router();
const budgetControllers = require('../controllers/budget-controller');

const {
    getEnvelopes,
    getAvailableBudget,
    getTotalBudget,
    setTotalBudget,
    createEnvelope,
    modifyEnvelope,
    deleteEnvelope,
} = budgetControllers;

// Route to initialize total budget.
budgetRouter.post('/init', (req, res, next) => {
    try {
        const { totalBudget: initBudget } = req.body;
        const totalBudgetNum = Number(initBudget);

        setTotalBudget(totalBudgetNum);

        res.status(200).json({
            success: true,
            message: 'Budget initialized successfully',
            totalBudget: getTotalBudget(),
            availableBudget: getAvailableBudget(),
        });
    } catch (error) {
        next(error);
    }
});

// Route to get all envelopes.
budgetRouter.get('/status', (req, res, next) => {
    try {
        res.status(200).json({
            envelopes: getEnvelopes(),
            availableBudget: getAvailableBudget(),
            totalBudget: getTotalBudget(),
        });
    } catch (error) {
        next(error);
    }
});

module.exports = budgetRouter;
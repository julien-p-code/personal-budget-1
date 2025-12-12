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
    const { totalBudget: initBudget } = req.body;
    const totalBudgetNum = Number(initBudget);

    if (!Number.isFinite(totalBudgetNum) || totalBudgetNum < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid total budget value'
        });
    }

    setTotalBudget(totalBudgetNum);

    res.status(200).json({
        success: true,
        message: 'Budget initialized successfully',
        totalBudget: getTotalBudget(),
        availableBudget: getAvailableBudget(),
    });
});

// Route to create a new envelope.
budgetRouter.post('/envelopes', (req, res, next) => {
    const { name, allocatedAmount } = req.body;
    const allocatedAmountNum = Number(allocatedAmount);

    if (typeof name !== 'string' || name.trim() === '' ||
        !Number.isFinite(allocatedAmountNum) || allocatedAmountNum < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid envelope data'
        });
    }

    const newEnvelope = createEnvelope(name.trim(), allocatedAmountNum);

    res.status(201).json({
        success: true,
        message: 'Envelope created successfully',
        envelope: newEnvelope,
        availableBudget: getAvailableBudget(),
    });
});

// Route to modify an existing envelope.
budgetRouter.put('/envelopes/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const { name, allocatedAmount } = req.body;
    const allocatedAmountNum = Number(allocatedAmount);

    if (!Number.isFinite(id) || id < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid envelope id'
        });
    }

    if (typeof name !== 'string' || name.trim() === '' ||
        !Number.isFinite(allocatedAmountNum) || allocatedAmountNum < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid envelope data'
        });
    }

    const updatedEnvelope = modifyEnvelope(id, name.trim(), allocatedAmountNum);

    res.status(200).json({
        success: true,
        message: 'Envelope updated successfully',
        envelope: updatedEnvelope,
        availableBudget: getAvailableBudget(),
    });
});

budgetRouter.delete('/envelopes/:id', (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isFinite(id) || id < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid envelope id'
        });
    }

    deleteEnvelope(id);

    res.status(204).send();
});

// Route to get all envelopes.
budgetRouter.get('/status', (req, res, next) => {
    res.status(200).json({
        envelopes: getEnvelopes(),
        availableBudget: getAvailableBudget(),
        totalBudget: getTotalBudget(),
    });
});

budgetRouter.get('/envelopes', (req, res, next) => {
    res.status(200).json({
        success: true,
        envelopes: getEnvelopes(),
    });
});

// Route to get an envelope by ID.
budgetRouter.get('/envelopes/:id', (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isFinite(id) || id < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid envelope id'
        });
    }

    const envelope = getEnvelopes().find(env => env.id === id);

    if (!envelope) {
        return res.status(404).json({
            success: false,
            message: 'Envelope not found'
        });
    }

    res.status(200).json({
        success: true,
        envelope
    });
});

module.exports = budgetRouter;
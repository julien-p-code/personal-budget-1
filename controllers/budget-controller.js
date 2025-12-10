let envelopeIdCounter = 1;

let totalBudget = 0;

// Function to validate and return total budget.
const totalBudgetSafeGuardFunction = (num) =>{
    if (typeof num !== 'number') {
        throw new Error('Invalid input: expected a number');
    } else {
        return totalBudget = num;
    }
};

// Function to create a new budget envelope.
function createEnvelope(name, budget) {
    if (typeof name !== 'string' || typeof budget !== 'number') {
        throw new Error('Invalid input: expected a string for name and a number for budget');
    };

    if (budget < 0) {
        throw new Error('Invalid budget: budget cannot be negative');
    };

    if (budget > totalBudget) {
        throw new Error('Invalid budget: budget exceeds total available budget');
    };

    totalBudget -= budget;

    return {
        id: `${envelopeIdCounter++}`,
        name: name,
        budget: budget
    }
};



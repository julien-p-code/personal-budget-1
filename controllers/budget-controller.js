let envelopes = [];

let envelopeIdCounter = 1;

let totalBudget = 0;
let availableBudget = 0;

// Function to validate and return total and available budget.
const totalBudgetSafeGuardFunction = (num) => {
    if (typeof num !== 'number' || isNaN(num) || num < 0) {
        throw new Error('Invalid budget: budget must be a non-negative number');
    } else {
        totalBudget = num;
        availableBudget = num;
    }
};

// Function to create a new budget envelope.
function createEnvelope(name, budget) {
    if (typeof name !== 'string' || typeof budget !== 'number' || budget < 0) {
        throw new Error('Invalid input: expected a string for name and a non-negative number for budget');
    };

    if (budget > availableBudget) {
        throw new Error('Invalid budget: budget exceeds total available budget');
    };

    // Update available budget.
    availableBudget -= budget;

    // Create a new envelope object.
    const envelope = {
        id: `${envelopeIdCounter++}`,
        name: name,
        budget: budget
    };

    // Add the new envelope to the envelopes array.
    envelopes.push(envelope);

    return envelope;
};

function modifyEnvelope(id, newName, newBudget) {
  if (!id) {
    throw new Error('Invalid input: envelope ID is required');
  }

  if (typeof newName !== 'string' || typeof newBudget !== 'number' || newBudget < 0) {
    throw new Error('Invalid input: expected a string for name and a non-negative number for budget');
  }

  // Find the existing envelope once
  const envelope = envelopes.find(env => env.id === id);
  if (!envelope) {
    throw new Error('Envelope not found');
  }

  // Money available for THIS envelope = availableBudget + current envelope budget
  const deltaBudget = availableBudget + envelope.budget;

  if (newBudget > deltaBudget) {
    throw new Error('Invalid budget: budget exceeds total available budget');
  }

  // Update available budget after reallocating
  availableBudget = deltaBudget - newBudget;

  // Mutate the existing envelope instead of pushing a new one
  envelope.name = newName;
  envelope.budget = newBudget;

  return envelope;
};

function deleteEnvelope(id) {
    if (!id) {
        throw new Error('Invalid input: envelope ID is required');
    }

    const envelopeIndex = envelopes.findIndex(env => env.id === id);
    if (envelopeIndex === -1) {
        throw new Error('Envelope not found');
    }

    const deletedEnvelope = envelopes[envelopeIndex];

    // Restore its budget
    availableBudget += deletedEnvelope.budget;

    // Remove it
    envelopes.splice(envelopeIndex, 1);

    return deletedEnvelope;
};

module.exports = {
    totalBudgetSafeGuardFunction,
    createEnvelope,
    modifyEnvelope,
    deleteEnvelope,
};


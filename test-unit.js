// Unit Tests for 2048 Game
// Testing core game logic functions

// Mock the Game2048 class for testing
class TestGame2048 {
    constructor() {
        this.grid = Array(4).fill().map(() => Array(4).fill(0));
        this.score = 0;
        this.size = 4;
    }

    slideAndMerge(row) {
        // Remove zeros
        let newRow = row.filter(val => val !== 0);
        
        // Merge adjacent equal values
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                this.score += newRow[i];
                newRow[i + 1] = 0;
            }
        }
        
        // Remove zeros again after merging
        newRow = newRow.filter(val => val !== 0);
        
        // Pad with zeros to maintain size
        while (newRow.length < this.size) {
            newRow.push(0);
        }
        
        return newRow;
    }

    isGameOver() {
        // Check for empty cells
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    return false;
                }
            }
        }

        // Check for possible merges
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const current = this.grid[row][col];
                // Check right neighbor
                if (col < this.size - 1 && this.grid[row][col + 1] === current) {
                    return false;
                }
                // Check bottom neighbor
                if (row < this.size - 1 && this.grid[row + 1][col] === current) {
                    return false;
                }
            }
        }

        return true;
    }
}

// Test Results
const testResults = [];

function runTest(testName, testFunction) {
    try {
        const result = testFunction();
        testResults.push({
            name: testName,
            status: result.passed ? 'PASS' : 'FAIL',
            expected: result.expected,
            actual: result.actual,
            details: result.details
        });
        console.log(`${testName}: ${result.passed ? 'PASS' : 'FAIL'}`);
        if (!result.passed) {
            console.log(`  Expected: ${result.expected}`);
            console.log(`  Actual: ${result.actual}`);
        }
    } catch (error) {
        testResults.push({
            name: testName,
            status: 'ERROR',
            error: error.message
        });
        console.log(`${testName}: ERROR - ${error.message}`);
    }
}

// Unit Test Cases
console.log('=== UNIT TESTING ===');

// Test 8.1.1: slideAndMerge Algorithm Tests
runTest('slideAndMerge([2,2,4,4])', () => {
    const game = new TestGame2048();
    const initialScore = game.score;
    const result = game.slideAndMerge([2,2,4,4]);
    const scoreIncrease = game.score - initialScore;
    
    return {
        passed: JSON.stringify(result) === JSON.stringify([4,8,0,0]) && scoreIncrease === 12,
        expected: '[4,8,0,0] with score increase of 12',
        actual: `${JSON.stringify(result)} with score increase of ${scoreIncrease}`,
        details: 'Testing merge of adjacent identical tiles'
    };
});

runTest('slideAndMerge([2,0,2,4])', () => {
    const game = new TestGame2048();
    const initialScore = game.score;
    const result = game.slideAndMerge([2,0,2,4]);
    const scoreIncrease = game.score - initialScore;
    
    return {
        passed: JSON.stringify(result) === JSON.stringify([4,4,0,0]) && scoreIncrease === 4,
        expected: '[4,4,0,0] with score increase of 4',
        actual: `${JSON.stringify(result)} with score increase of ${scoreIncrease}`,
        details: 'Testing merge with gaps between tiles'
    };
});

runTest('slideAndMerge([0,0,0,0])', () => {
    const game = new TestGame2048();
    const initialScore = game.score;
    const result = game.slideAndMerge([0,0,0,0]);
    const scoreIncrease = game.score - initialScore;
    
    return {
        passed: JSON.stringify(result) === JSON.stringify([0,0,0,0]) && scoreIncrease === 0,
        expected: '[0,0,0,0] with no score change',
        actual: `${JSON.stringify(result)} with score change of ${scoreIncrease}`,
        details: 'Testing empty row handling'
    };
});

// Test 8.1.3: Game Over Detection Tests
runTest('isGameOver() with full board, no merges', () => {
    const game = new TestGame2048();
    // Create a full board with no possible merges
    game.grid = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
    ];
    
    const result = game.isGameOver();
    
    return {
        passed: result === true,
        expected: 'true',
        actual: result.toString(),
        details: 'Testing game over detection with no possible moves'
    };
});

runTest('isGameOver() with full board, merges available', () => {
    const game = new TestGame2048();
    // Create a full board with possible merges
    game.grid = [
        [2, 2, 4, 8],
        [4, 8, 2, 4],
        [8, 4, 8, 2],
        [2, 8, 4, 8]
    ];
    
    const result = game.isGameOver();
    
    return {
        passed: result === false,
        expected: 'false',
        actual: result.toString(),
        details: 'Testing game over detection with possible merges available'
    };
});

// Display results
console.log('\n=== UNIT TEST RESULTS ===');
testResults.forEach(test => {
    console.log(`${test.name}: ${test.status}`);
    if (test.status === 'FAIL') {
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Actual: ${test.actual}`);
    }
});

const passedTests = testResults.filter(t => t.status === 'PASS').length;
const totalTests = testResults.length;
console.log(`\nUnit Test Summary: ${passedTests}/${totalTests} tests passed (${Math.round(passedTests/totalTests*100)}%)`);
class Game2048 {
    constructor() {
        this.grid = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('best2048') || 0;
        this.size = 4;
        this.tileContainer = document.querySelector('.tile-container');
        this.scoreElement = document.getElementById('score');
        this.bestElement = document.getElementById('best');
        this.gameMessage = document.getElementById('game-message');
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.score = 0;
        this.updateScore();
        this.updateBestScore();
        this.hideGameMessage();
        this.clearTiles();
        this.addRandomTile();
        this.addRandomTile();
        this.updateDisplay();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.handleKeyPress(e.key);
            }
        });
    }

    handleKeyPress(key) {
        if (this.isGameOver()) return;

        let moved = false;
        const previousGrid = this.grid.map(row => [...row]);

        switch (key) {
            case 'ArrowUp':
                moved = this.moveUp();
                break;
            case 'ArrowDown':
                moved = this.moveDown();
                break;
            case 'ArrowLeft':
                moved = this.moveLeft();
                break;
            case 'ArrowRight':
                moved = this.moveRight();
                break;
        }

        if (moved) {
            this.addRandomTile();
            this.updateDisplay();
            this.updateScore();
            
            if (this.isGameOver()) {
                this.showGameOver();
            }
        }
    }

    moveLeft() {
        let moved = false;
        for (let row = 0; row < this.size; row++) {
            const newRow = this.slideAndMerge(this.grid[row]);
            if (JSON.stringify(newRow) !== JSON.stringify(this.grid[row])) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        return moved;
    }

    moveRight() {
        let moved = false;
        for (let row = 0; row < this.size; row++) {
            const reversed = [...this.grid[row]].reverse();
            const newRow = this.slideAndMerge(reversed).reverse();
            if (JSON.stringify(newRow) !== JSON.stringify(this.grid[row])) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        return moved;
    }

    moveUp() {
        let moved = false;
        for (let col = 0; col < this.size; col++) {
            const column = [];
            for (let row = 0; row < this.size; row++) {
                column.push(this.grid[row][col]);
            }
            const newColumn = this.slideAndMerge(column);
            if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
                moved = true;
                for (let row = 0; row < this.size; row++) {
                    this.grid[row][col] = newColumn[row];
                }
            }
        }
        return moved;
    }

    moveDown() {
        let moved = false;
        for (let col = 0; col < this.size; col++) {
            const column = [];
            for (let row = 0; row < this.size; row++) {
                column.push(this.grid[row][col]);
            }
            const reversed = [...column].reverse();
            const newColumn = this.slideAndMerge(reversed).reverse();
            if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
                moved = true;
                for (let row = 0; row < this.size; row++) {
                    this.grid[row][col] = newColumn[row];
                }
            }
        }
        return moved;
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

    addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    updateDisplay() {
        this.clearTiles();
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] !== 0) {
                    this.createTile(this.grid[row][col], row, col);
                }
            }
        }
    }

    createTile(value, row, col) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${value}`;
        tile.textContent = value;
        tile.style.left = `${col * 115}px`;
        tile.style.top = `${row * 115}px`;
        this.tileContainer.appendChild(tile);
    }

    clearTiles() {
        this.tileContainer.innerHTML = '';
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('best2048', this.bestScore);
            this.updateBestScore();
        }
    }

    updateBestScore() {
        this.bestElement.textContent = this.bestScore;
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

    showGameOver() {
        const messageText = document.querySelector('.message-text');
        messageText.textContent = `Game Over! Final Score: ${this.score}`;
        this.gameMessage.classList.add('game-over');
    }

    hideGameMessage() {
        this.gameMessage.classList.remove('game-over');
    }

    restart() {
        this.init();
    }
}

// Initialize the game when the page loads
const game = new Game2048();
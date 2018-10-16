class Solver {
    static solve({ origin, end, scrambledPath }) {
        const solutions = Solver.findAllPaths(scrambledPath, origin, 0, []);
        const matchingSolutions = solutions
            .filter(s => s !== null)
            .filter(s => s.end.row === end.row && s.end.col === end.col);
        return matchingSolutions[0].solvedPath;
    }

    static findAllPaths(scrambledPath, currentOrigin, step, currentSolution) {
        const nextMove = scrambledPath[step];
        if (!nextMove) {
            return { end: currentOrigin, solvedPath: currentSolution.join('') };
        }
        else {
            const validMoves = Solver.getValidMoves(currentOrigin);

            if (nextMove === '?') {
                return validMoves.map(move => {
                    return Solver.findAllPaths(
                        scrambledPath,
                        Solver.move(currentOrigin, move),
                        step + 1,
                        [...currentSolution, move]
                    );
                }).reduce((acc, val) => acc.concat(val), []);
            }
            else {
                if (!validMoves.includes(nextMove))
                    return null;

                return Solver.findAllPaths(
                    scrambledPath,
                    Solver.move(currentOrigin, nextMove),
                    step + 1,
                    [...currentSolution, nextMove]
                );
            }
        }
    }

    static getValidMoves({ row, col }) {
        const validMoves = [];
        if (row > 0)
            validMoves.push('u');
        if (row < 4)
            validMoves.push('d');
        if (col > 0)
            validMoves.push('l');
        if (col < 4)
            validMoves.push('r');
        return validMoves;
    }

    static move({ row, col }, move) {
        switch (move) {
            case 'u':
                return { row: row - 1, col };
            case 'd':
                return { row: row + 1, col };
            case 'l':
                return { row, col: col - 1 };
            case 'r':
                return { row, col: col + 1 };
        }
    }
}

module.exports = Solver;
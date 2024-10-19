const fs = require('fs');


function parseInput(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
}


function decodeValue(value, base) {
    return parseInt(value, base);
}


function lagrangeInterpolation(points) {
    const n = points.length;
    let constantTerm = 0;

    
    for (let i = 0; i < n; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= -points[j].x / (xi - points[j].x);
            }
        }

        
        constantTerm += yi * li;
    }

    return Math.round(constantTerm);
}


function findSecret(filename) {
    const input = parseInput(filename);
    const { n, k } = input.keys;

    if (n < k) {
        console.log('Insufficient number of roots provided.');
        return;
    }

    const points = [];

    
    for (let i = 1; i <= n; i++) {
        if (input[i]) {
            const x = parseInt(i);
            const base = parseInt(input[i].base);
            const y = decodeValue(input[i].value, base);
            points.push({ x, y });
        }
    }

    
    const secret = lagrangeInterpolation(points.slice(0, k));
    return secret;
}

// Run the code for both test cases
const secret1 = findSecret('testcase1.json');
const secret2 = findSecret('testcase2.json');

console.log(`Secret for Test Case 1: ${secret1}`);
console.log(`Secret for Test Case 2: ${secret2}`);

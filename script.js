// script.js

function distance(point1, point2) {
    const [x1, y1, z1] = point1.coordinates;
    const [x2, y2, z2] = point2.coordinates;

    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2 + (z2 - z1)**2);
}

function parsePoint(line) {
    const parts = line.split(':');
    const name = parts[1].trim();
    const coordinates = parts.slice(2, 5).map(parseFloat);
    return { name, coordinates };
}

// GPS list input
const inputText = `GPS:ast_z01 Me Ice :7153.08:170161.39:-79976.91:#FF75C9F1:
GPS:ast_z02 Ag:12471.67:172579.13:-80453.65:#FF75C9F1:
GPS:ast_z03 Ice:16866.28:174120.09:-73666.82:#FF75C9F1:`;

// Split input into lines
const inputLines = inputText.trim().split('\n');

// Parse points
const points = inputLines.map(parsePoint);

// Calculate distances between each pair of points
function calculateDistances(refPoint) {
    if (refPoint !== null && refPoint !== undefined) {
        const sortedList = points.map(point => {
            const dist = Math.round(distance(refPoint, point) / 1000, 3);
            return [point.name, dist];
        }).sort((a, b) => a[1] - b[1]);

        for (const point of sortedList) {
            console.log(`${point[0]} ${point[1]}km`);
        }
    } else {
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const point1 = points[i];
                const point2 = points[j];
                const dist = distance(point1, point2);
                if (dist < 5000) {
                    console.log(`Distance between ${point1.name} and ${point2.name}: ${dist}`);
                }
            }
        }
    }
}

// Example: Uncomment this line and provide input for testing
// calculateDistances(parsePoint("GPS:ast_z01 Me Ice :7153.08:170161.39:-79976.91:#FF75C9F1:"));

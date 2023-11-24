function distance(point1, point2) {
    const [x1, y1, z1] = point1.coordinates;
    const [x2, y2, z2] = point2.coordinates;

    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}

function parseGPSString(gpsString) {
    const parts = gpsString.split(':');
    const name = parts[1].trim();
    const coordinates = parts.slice(2, 5).map(parseFloat);
    return { name, coordinates };
}

function calculateDistances() {
    const refPointStringInput = document.getElementById('refPointString');
    const pointStringsInput = document.getElementById('pointStrings');
    const distancesTableBody = document.querySelector('#distancesTable tbody');
    const outputDiv = document.getElementById('output');

    const refPointString = refPointStringInput.value.trim();
    const pointStrings = pointStringsInput.value.trim().split('\n');

    const refPoint = parseGPSString(refPointString);
    const points = pointStrings.map(parseGPSString);

    distancesTableBody.innerHTML = ''; // Clear previous rows

    /*onst outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous output
    outputDiv.innerHTML += `<p>Distance from ${refPoint.name} to each points</p>`;

    points.forEach(point => {
        const dist = Math.round(distance(refPoint, point) / 1000, 3);
        outputDiv.innerHTML += `${point.name}: ${dist}km</p>`;
    });*/
    points.forEach(point => {
        const dist = Math.round(distance(refPoint, point) / 1000, 3);
        const row = `<tr><td>${point.name}</td><td>${dist}</td></tr>`;
        distancesTableBody.innerHTML += row;
    });
    outputDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('test1')
    const headers = document.querySelectorAll('#distancesTable th');

    headers.forEach(header => {
        header.addEventListener('click', () => sortTable(header.cellIndex));
    });
});
function sortTable(columnIndex) {
    console.log('test')
    const table = document.getElementById('distancesTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const sortType = columnIndex === 0 ? 'alpha' : 'numeric';

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();

        return sortType === 'alpha' ? aValue.localeCompare(bValue) : parseFloat(aValue) - parseFloat(bValue);
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}




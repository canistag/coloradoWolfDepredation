// talking to back door
fetch('/api/db') // sends request to db
    .then(response => response.json()) // when recieved do this (parse JSON into JS array of objects)
    .then(data => { // hand the data along to each function
        renderTable(data);
        renderBarAnimalsByCounty(data);
        renderBarAmountByCounty(data);
        renderLineClaimsOverTime(data);
        renderHeatmapByCounty(data);
    })
    .catch(error => console.error('Error fetching data:', error));


// Raw table 

function renderTable(data) {
    const tableBody = document.getElementById('table-body'); // find the spot where it goes
    data.forEach(row => { //for each row, build a tr element
        const tr = document.createElement('tr');
        // insert into table row
        // line 23: discard time if not found
        // line 26: ensure currency format
        tr.innerHTML = `
            <td>${row.event_date ? row.event_date.split(' ')[0] : ''}</td>
            <td>${row.county}</td>
            <td>${row.fips_code}</td>
            <td>$${parseFloat(row.amount).toFixed(2)}</td>
            <td>${row.animalstotal}</td>
            <td>${row.animaltypeclean}</td>
        `;
        tableBody.appendChild(tr);
    });
}


// Helpers 
// Groups rows by county, summing whatever field 
function sumByCounty(data, field) {
    const totals = {};
    data.forEach(row => {
        const county = row.county; 
        const value = parseFloat(row[field]) || 0; // if null return Nan
        totals[county] = (totals[county] || 0) + value; // if new county, start at zero
    });
    return totals;
}

// Force FIPS Codes string so zeroes stay and match up against the county geojson
function normalizeFips(fips) {
    return String(fips).padStart(5, '0');
}


// Bar: Animals Total by County
// take tally and split it into 2 arrays (county name and total) for plotly to use as x and y
function renderBarAnimalsByCounty(data) {
    const totals = sumByCounty(data, 'animalstotal');
    const counties = Object.keys(totals);
    const values = counties.map(c => totals[c]);

    Plotly.newPlot('bar-animals', [{
        x: counties,
        y: values,
        type: 'bar',
        marker: { color: '#322213' }
    }], {
        xaxis: { title: 'County' },
        yaxis: { title: 'Total Animals Affected' },
        margin: { t: 20 }
    });
}


// Bar: Claims Paid by County 
// take tally and split it into 2 arrays (county name and amount) for plotly to use as x and y
function renderBarAmountByCounty(data) {
    const totals = sumByCounty(data, 'amount');
    const counties = Object.keys(totals);
    const values = counties.map(c => totals[c]);

    Plotly.newPlot('bar-amount', [{
        x: counties,
        y: values,
        type: 'bar',
        marker: { color: '#2f6b3a' }
    }], {
        xaxis: { title: 'County' },
        yaxis: { title: 'Total Claims Paid ($)' },
        margin: { t: 20 }
    });
}


// Line: Claims Paid Over Time 
// take tally and split it into 2 arrays (month and amount) for plotly to use as x and y
function renderLineClaimsOverTime(data) {
    const monthlyTotals = {};

    data.forEach(row => {
        if (!row.event_date) return; // if no date
        const yearMonth = row.event_date.substring(0, 7); 
        const value = parseFloat(row.amount) || 0;
        monthlyTotals[yearMonth] = (monthlyTotals[yearMonth] || 0) + value;
    });

    const months = Object.keys(monthlyTotals).sort(); // sort to keep things neat
    const values = months.map(m => monthlyTotals[m]);

    Plotly.newPlot('line-claims', [{
        x: months,
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: '#a33' }
    }], {
        xaxis: { title: 'Month' },
        yaxis: { title: 'Total Claims Paid ($)' },
        margin: { t: 20 }
    });
}


//  Choropleth heatmap by County 
function renderHeatmapByCounty(data) {
    // Aggregate amount paid per FIPS code
    const totals = {};
    data.forEach(row => {
        // aggregate by fips code
        const fips = normalizeFips(row.fips_code);
        const value = parseFloat(row.amount) || 0;
        totals[fips] = (totals[fips] || 0) + value;
    });

    const fipsCodes = Object.keys(totals);
    const values = fipsCodes.map(f => totals[f]);

    // goes to internet. reference geojson covering every US county.
    // plotly matches county polygon with fips code
    fetch('https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json')
        .then(res => res.json())
        .then(counties => {
            Plotly.newPlot('heatmap-county', [{

                //draw map 
                type: 'choropleth',
                geojson: counties,
                //counties
                locations: fipsCodes,
                // opacity
                z: values,
                colorscale: 'Reds',
                marker: { line: { width: 0.5, color: '#fff' } },
                colorbar: { title: 'Claims Paid ($)' }
            }], {
                geo: {
                    scope: 'usa',
                    fitbounds: 'locations' // auto-zooms to just the CO counties in the data
                },
                margin: { t: 20 }
            });
        })
        .catch(error => console.error('Error loading county geojson:', error));
}
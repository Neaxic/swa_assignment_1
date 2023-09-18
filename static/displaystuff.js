export function displayForecasts(tempratures, precipitation, windSpeeds, cloudCoverage) {
    let table = document.getElementById("tempTable");
    table.innerHTML = "";
    table.innerHTML = "<tr><th>Date</th><th>Temprature</th></tr>";

    tempratures.forEach((temp) => {
        let row = document.createElement("tr");

        let cell = document.createElement("td");
        let date = new Date(temp.getTime());
        cell.textContent = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;


        let cellTemp = document.createElement("td");
        cellTemp.textContent = `${temp.getMin()} to ${temp.getMax()} ${temp.getUnit()}`;

        row.appendChild(cell);
        row.appendChild(cellTemp);

        table.appendChild(row);
    });

    let precipitationTable = document.getElementById("precipitationTable");
    precipitationTable.innerHTML = "";
    precipitationTable.innerHTML = "<tr><th>Date</th><th>Precipitation</th></tr>";

    precipitation.map((precip) => {
        let row = document.createElement("tr");

        let cell = document.createElement("td");
        let date = new Date(precip.getTime());
        cell.textContent = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

        let cellData = document.createElement("td");
        cellData.textContent = `${precip.getMin()} to ${precip.getMax()} ${precip.getUnit()} ${precip.getType()}`;

        row.appendChild(cell);
        row.appendChild(cellData);

        precipitationTable.appendChild(row);
    })

    let windtable = document.getElementById("windTable");
    windtable.innerHTML = "";
    windtable.innerHTML = "<tr><th>Date</th><th>Wind Speeds</th></tr>";

    windSpeeds.map((wind) => {
        let row = document.createElement("tr");

        let cell = document.createElement("td");
        let date = new Date(wind.getTime());
        cell.textContent = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

        let cellData = document.createElement("td");
        cellData.textContent = `${wind.getMin()} to ${wind.getMax()} ${wind.getUnit()} ${wind.getType()}`;

        row.appendChild(cell);
        row.appendChild(cellData);

        windtable.appendChild(row);
    })

    let cloudTable = document.getElementById("cloudTable");
    cloudTable.innerHTML = "";
    cloudTable.innerHTML = "<tr><th>Date</th><th>Cloud coverage</th></tr>";

    cloudCoverage.map((cloud) => {
        let row = document.createElement("tr");

        let cell = document.createElement("td");
        let date = new Date(cloud.getTime());
        cell.textContent = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;

        let cellData = document.createElement("td");
        cellData.textContent = `${cloud.getMin()} to ${cloud.getMax()} ${cloud.getUnit()} ${cloud.getType()}`;

        row.appendChild(cell);
        row.appendChild(cellData);

        cloudTable.appendChild(row);
    })
}

export function displayMaxTemp(temp) {
    let div = document.getElementById("maxTemp");
    div.innerHTML = "";

    let title = document.createElement("h4");
    title.innerHTML = "Max Temp";
    let table = document.createElement("table");

    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.innerHTML = temp;

    row.appendChild(cell);
    table.appendChild(row);

    div.appendChild(title);
    div.appendChild(table);
}

export function displayMinTemp(temp) {
    let div = document.getElementById("minTemp");
    div.innerHTML = "";

    let title = document.createElement("h4");
    title.innerHTML = "Min Temp";
    let table = document.createElement("table");

    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.innerHTML = temp;

    row.appendChild(cell);
    table.appendChild(row);

    div.appendChild(title);
    div.appendChild(table);
}

export function displayTotalPrecipitation(TotalPrecipitation) {
    let div = document.getElementById("TotalPrecipitation");
    div.innerHTML = "";

    let title = document.createElement("h4");
    title.innerHTML = "Down Bør";

    let table = document.createElement("table");
    let row = document.createElement("tr");
    let cell = document.createElement("td");

    cell.innerHTML = `${TotalPrecipitation} mm`;
    row.appendChild(cell);
    table.appendChild(row);

    div.appendChild(title);
    div.appendChild(table);
}




export function displayAverageWindSpeed(averageSpeed) {
    let div = document.getElementById("avgWind");
    div.innerHTML = "";

    let title = document.createElement("h4");
    title.innerHTML = "Average Wind Speed today";

    let table = document.createElement("table");
    let row = document.createElement("tr");
    let cell = document.createElement("td");

    cell.innerHTML = `${averageSpeed} mph`; //average speed
    row.appendChild(cell);
    table.appendChild(row);

    div.appendChild(title);
    div.appendChild(table);
}
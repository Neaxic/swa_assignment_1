export function displayForecasts(tempratures, precipitation, windSpeeds) {
    let temptitle = document.createElement("h4");
    temptitle.innerHTML = "tempratures";
    let table = document.getElementById("temperatureTableBody");

    tempratures.forEach((temp) => {
        let row = document.createElement("tr");

        let cell = document.createElement("td");
        let date = new Date(temp.getTime());
        cell.textContent = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        row.appendChild(cell);
        table.appendChild(row);


        let rowTemp = document.createElement("tr");
        let cellTemp = document.createElement("td");
        cellTemp.textContent = `${temp.getMin()} to ${temp.getMax()} ${temp.getUnit()}`;
        rowTemp.appendChild(cellTemp);

        table.appendChild(rowTemp);
    });

    let precipiationtitle = document.createElement("h4");
    precipiationtitle.innerHTML = "Precipitation";
    let precipitationtable = document.createElement("table");

    precipitation.map((temp) => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.innerHTML = temp;

        row.appendChild(cell);
        precipitationtable.appendChild(row);
    })

    let windtitle = document.createElement("h4");
    windtitle.innerHTML = "wind speeds";
    let windtable = document.createElement("table");

    windSpeeds.map((temp) => {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.innerHTML = temp;

        row.appendChild(cell);
        windtable.appendChild(row);
    })

    div.appendChild(temptitle);
    div.appendChild(table);

    div.appendChild(precipiationtitle);
    div.appendChild(precipitationtable);

    div.appendChild(windtitle);
    div.appendChild(windtable);
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

export function displayAverageWindSpeed(windSpeed) { }
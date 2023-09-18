import getForecast from "./fetchController.js";

var btnValue = "fetch";

$('.networkBtn').click(async function () {
    var thebuttonclicked = $(this).attr("value");
    console.log(thebuttonclicked);




    if (thebuttonclicked == "fetc") {
        var city = document.getElementById("city").value;
        var maxTemp = await getMaxTemp(city);
        document.getElementById("maxTemp").innerHTML = maxTemp;
    }
});

export async function proxyGetForecast(city) {
    if (btnValue === "fetch") {
        getForecast(city);
    }
}
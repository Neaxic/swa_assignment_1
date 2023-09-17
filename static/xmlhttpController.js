function getForecast(cb) {
  xmlRequest.open('GET', `${baseUrl}/forecast`, true);

  xmlRequest.onreadystatechange = function () {
    if (xmlRequest.readyState === 4) {
      if (xmlRequest.status === 200) {
        cb(null, JSON.parse(xmlRequest.responseText));
      } else {
        cb(`Error callback, forecast: ${xmlRequest.status}`);
      }
    }
  };
  xmlRequest.send();
}

function getData(cb) {
  xmlRequest.open('GET', `${baseUrl}/data`, true);
  
  xmlRequest.onreadystatechange = function () {
    if (xmlRequest.readyState === 4) {
      if (xmlRequest.status === 200) {
        const response = JSON.parse(xmlRequest.responseText);
        cb(null, response);
      } else {
        cb(`Error callback, data: ${xmlRequest.status}`);
      }
    }
  };
  xmlRequest.send();
}
function jsonToTable(json) {
  // Create the table element
  var table = document.createElement("table");

  // Get the keys from the first object in the JSON array
  var keys = Object.keys(json[0]);

  // Create the table header row
  var thead = document.createElement("thead");
  var row = document.createElement("tr");
  keys.forEach(function(key) {
    var cell = document.createElement("th");
    cell.textContent = key;
    row.appendChild(cell);
  });
  thead.appendChild(row);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement("tbody");
  json.forEach(function(object) {
    var row = document.createElement("tr");
    keys.forEach(function(key) {
      var cell = document.createElement("td");
      cell.textContent = object[key];
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Add the table to the document
  document.body.appendChild(table);
}

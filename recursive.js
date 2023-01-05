function flattenJSON(data) {
  var result = {};
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop + "[" + i + "]");
      if (l == 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}

function jsonToTable(json) {
  var flattened = flattenJSON(json);

  // Create the table element
  var table = document.createElement("table");

  // Get the keys from the flattened JSON object
  var keys = Object.keys(flattened);

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
  var row = document.createElement("tr");
  keys.forEach(function(key) {
    var cell = document.createElement("td");
    cell.textContent = flattened[key];
    row.appendChild(cell);
  });
  tbody.appendChild(row);
  table.appendChild(tbody);

  // Add the table to the document
  document.body.appendChild(table);
}

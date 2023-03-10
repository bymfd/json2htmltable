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

function unflattenJSON(data) {
  "use strict";
  if (Object(data) !== data || Array.isArray(data)) return data;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {};
  for (var p in data) {
    var cur = resultholder,
      prop = "",
      m;
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[""] || resultholder;
}

function jsonToTable(json) {
  var flattened = flattenJSON(json);

  // Create the table element
  var table = document.createElement("table");
  table.setAttribute("border", "1");

  // Get the keys from the flattened JSON object
  var keys = Object.keys(flattened);

  // Create the table header row
  var thead = document.createElement("thead");
  var row = document.createElement("tr");
  var cell = document.createElement("th");
  cell.textContent = "Key";
  row.appendChild(cell);
  cell = document.createElement("th");
  cell.textContent = "Value";
  row.appendChild(cell);
  thead.appendChild(row);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement("tbody");
  keys.forEach(function(

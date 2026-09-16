const fs = require('fs');
let code = fs.readFileSync('c:/Users/Veronica/Desktop/Axion/app.js', 'utf8');
code = code.replace(/document\.getElementById\((['"])([^'"]+)\1\)\.(textContent|innerHTML|value)\s*=\s*(.*?);/g, 
  (match, quote, id, prop, val) => `{ const _el = document.getElementById('${id}'); if (_el) _el.${prop} = ${val}; }`
);
fs.writeFileSync('c:/Users/Veronica/Desktop/Axion/app.js', code);
console.log('Replaced dangerous direct assignments!');

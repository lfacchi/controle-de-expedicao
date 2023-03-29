
function readCsv(file){
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const result = [];
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i].split(';');
                // result.push(row);
                console.log(row);
            }
        })
        .catch(error => console.error(error));
}

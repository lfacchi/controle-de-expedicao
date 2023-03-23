class Item {
    constructor(sku, descricao, barcode, qtd) {
        this.sku = sku;
        this.descricao = descricao;
        this.barcode = barcode;
        this.qtd = qtd;
    }

    decrementar() {
        if (this.qtd > 0)
            this.qtd -= 1;
        if (this.qtd === 0) {
            let line = document.getElementById(this.sku);
            line.classList.add("table-success");
            alert(`Você ja dicionou todas as unidades necessarias do ${this.sku}\n\nContinue a separando de outro item`);
        }
    }
}

class PedidoDeVenda {
    constructor(cliente, numero_pedido, itens) {
        this.cliente = cliente;
        this.numero_pedido = numero_pedido;
        this.itens = itens;
    }

    showInfo() {
        let title = document.getElementById("header");
        title.innerHTML = `<h4>Pedido: ${this.numero_pedido}<br></br>Cliente: ${this.cliente}<br></br></h4>`;
        const tbody = document.querySelector("table tbody");
        for (let item of this.itens) {
            let row = document.createElement("tr");
            row.setAttribute("id", item.sku);
            row.innerHTML = `
            <td>${item.sku}</td>
            <td>${item.descricao}</td>
            <td id="qtd-${item.sku}">${item.qtd}</td>
        `;
            tbody.appendChild(row);
        }
    }
}

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

function checkBarcode() {
    let barcodeInput = document.getElementById("barcode-input");
    let barcode = barcodeInput.value;
    if (barcode.length === 13) {
        barcodeInput.value = "";
        let itemEncontrado = null;
        for (let item of pedido.itens) {
            if (barcode === item.barcode) {
                itemEncontrado = item;
                break;
            }
        }
        if (itemEncontrado !== null) {
            itemEncontrado.decrementar();
            let qtdCell = document.getElementById(`qtd-${itemEncontrado.sku}`);
            qtdCell.innerHTML = itemEncontrado.qtd;
            let resultDiv = document.getElementById("result");
            resultDiv.classList.add("alert-success");
            resultDiv.innerHTML = `Código de barras do item ${itemEncontrado.sku} lido com sucesso!`;
        } else {
            let resultDiv = document.getElementById("result");
            resultDiv.classList.add("alert-danger");
            resultDiv.innerHTML = "Código de barras não encontrado.";
        }
    }
}


let item1 = new Item("FMF-024", "cabo tampa traseira saveiro", "7891201501150", 5);
let item2 = new Item("FMF-023", "cabo tampa traseira ka", "7891201501167", 2);
let item3 = new Item("FMF-1047", "cabo abertura de capo s10", "7891201500443", 5);

let itens = [item1, item2, item3];

let pedido = new PedidoDeVenda("Stormshop", "112", itens);

let input = document.getElementById("barcode-input");


window.addEventListener("load", function () {
    pedido.showInfo();
});

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        checkBarcode();
    }
});

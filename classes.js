export class Item {
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

export class PedidoDeVenda {
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

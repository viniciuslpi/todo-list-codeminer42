var arr = new Array();

function adicionarItem() {
    var item = document.getElementById("item").value;
    var deadline = document.getElementById("deadline").value;
    
    if(item === '' || deadline.value == ''){
        alert('Error message.');
    }else{
        var lista  = document.getElementById("lista");
        
        var row = lista.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = "<input type='checkbox'>";
        cell2.innerHTML = item;
        cell3.innerHTML = deadline;
        cell4.innerHTML = mostraData();
        cell5.innerHTML = "<input type='button' value='X' onclick='deletarItem(item)'></input>";
        
        adicionarBanco();
        mostraLista();
        limpaLista();
    }  
}


function adicionarBanco(){
    console.log("Adicionar itens ao banco local")
}

function mostraLista(){
    console.log("Mostrar itens da lista");
}

function limpaLista(){
    document.getElementById('item').value='';
    document.getElementById('deadline').value='';

}

function mostraData(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();   
    return anoF+"-"+mesF+"-"+diaF;
}

function deletarItem(item){
    document.getElementById("lista").deleteRow(item.row)
}

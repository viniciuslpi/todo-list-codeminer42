const arrayTags = []

function adicionarItem() {
    let item        = document.getElementById("item").value;
    let deadline    = document.getElementById("deadline").value;
    let data        = geradorData();
    let tags        = document.getElementById('tag').value;
    tagsFormatadas            = tratamentoTags(tags);
    let status      = '';

    if(item === '' || deadline.value == ''){
        alert('Fill in all fields that are blank');
    }else{       
        salvarDadosLocalStorage(status, item, deadline, data, tagsFormatadas);
        limpaLista();
    }  
}

function tratamentoTags(tags){
    let temp = tags.split(/\s*,\s*/).map(function(a){return a.trim()});
    return temp;
}

function limpaLista(){
    document.getElementById('item').value='';
    document.getElementById('deadline').value='';
    document.getElementById('tag').value='';
    location.reload();

}

function geradorData(){
    let data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();   
    return `${anoF}-${mesF}-${diaF}`;
}

function atualizarStatus(item){
    let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));
    arrayTasks[item].status = arrayTasks[item].status === '' ? 'checked' : '';
    storage('tasks', arrayTasks);
    
}

function deletarItem(item){
	let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));
   
    if(confirm("Do you really want to delete this task?")){
        for(let i=0; i<arrayTasks.length;i++){
            if(arrayTasks[i].description == item){
                arrayTasks.splice(i, 1); 
            }
        }
        location.reload();
        storage('tasks', arrayTasks);
    }    
}

function storage(key, value){
    window.localStorage.setItem(key, JSON.stringify(value));
}

function deletarTodos(){
    let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));

    if(confirm("Do you really want to delete all tasks?")){
        arrayTasks.splice(0, arrayTasks.length);         
    }
    location.reload();
    storage('tasks', arrayTasks);
}    

function salvarDadosLocalStorage(status, description, deadline, data, tags){
	let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));

	if(!arrayTasks) arrayTasks = []; //Inicializando o vetor se ele vier vazio do local Storage

	let objTask = {
        status,
        description,
        deadline,
        data, 
        tags
    };
    
    arrayTasks.push(objTask);
    storage('tasks', arrayTasks);
}

function recuperarDadosLocalStorage(){
	let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));
        for(i in arrayTasks){
            let temp = atualizarTags(arrayTasks[i].tags)
            
            let lista = document.getElementById("lista");
            let row   = lista.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);

            cell1.innerHTML = `<input type='checkbox' ${arrayTasks[i].status} onclick="atualizarStatus(${i})">`;
            cell2.innerHTML = arrayTasks[i].description;
            cell3.innerHTML = temp;
            cell4.innerHTML = arrayTasks[i].deadline;
            cell5.innerHTML = arrayTasks[i].data;
            cell6.innerHTML = '<input type="button" value="×" class="btn-delete" onclick="deletarItem(\'' + arrayTasks[i].description + '\')"/>';
        }
}

function atualizarTags(tags){
    soma = tags.map((e) => {
        return `<i class='tag'>${e}</i>`
    });
    return soma.join(' ');
}

recuperarDadosLocalStorage();


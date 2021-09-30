function adicionarItem() {
    let item        = document.getElementById("item").value;
    let deadline    = document.getElementById("deadline").value;
    let data        = geradorData();

    if(item === '' || deadline.value == ''){
        alert('Fill in all fields that are blank');
    }else{       
        salvarDadosLocalStorage(item, deadline, data);
        limpaLista();
        location.reload();
    }  
}

function limpaLista(){
    document.getElementById('item').value='';
    document.getElementById('deadline').value='';
}

function geradorData(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();   
    return `${anoF}-${mesF}-${diaF}`;
}

function deletarItem(item){
	let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));
   
    if(confirm("Do you really want to delete this task?")){
        for(var i=0; i<arrayTasks.length;i++){
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

function salvarDadosLocalStorage(description, deadline, data){
	let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));

	if(!arrayTasks) arrayTasks = []; //Inicializando o vetor se ele vier vazio do local Storage

	let objTask = {
        description,
        deadline,
        data
    };

	arrayTasks.push(objTask);
    storage('tasks', arrayTasks);
}

function recuperarDadosLocalStorage(){
	let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));
        for(task of arrayTasks){
            var lista = document.getElementById("lista");
            var row   = lista.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
    
            cell1.innerHTML = "<input type='checkbox'>";
            cell2.innerHTML = task.description;
            cell3.innerHTML = task.deadline;
            cell4.innerHTML = task.data;
            cell5.innerHTML = '<input type="button" value="X" onclick="deletarItem(\'' + task.description + '\')"/>';
        }
}

recuperarDadosLocalStorage();


const arrayTags = []

function adicionarItem() {
    let item        = document.getElementById("item").value;
    let deadline    = document.getElementById("deadline").value;
    let data        = geradorData();
    let tags        = document.getElementById('tag').value;
    tags            = tratamentoTags(tags);


    if(item === '' || deadline.value == ''){
        alert('Fill in all fields that are blank');
    }else{       
        salvarDadosLocalStorage(item, deadline, data, tags);
        limpaLista();
        location.reload();
    }  
}

function tratamentoTags(tags){
    tags.split(/\s*,\s*/);
	arrayTags.push(tags.trim());
    return arrayTags;
}

function limpaLista(){
    document.getElementById('item').value='';
    document.getElementById('deadline').value='';
    document.getElementById('tag').value='';
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

function salvarDadosLocalStorage(description, deadline, data, tags){
	let arrayTasks = JSON.parse(window.localStorage.getItem('tasks'));

	if(!arrayTasks) arrayTasks = []; //Inicializando o vetor se ele vier vazio do local Storage

	let objTask = {
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
        for(task of arrayTasks){
            let lista = document.getElementById("lista");
            let row   = lista.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            let cell6 = row.insertCell(5);

    
            cell1.innerHTML = "<input type='checkbox'>";
            cell2.innerHTML = task.description;
            cell3.innerHTML = task.tags;
            cell4.innerHTML = task.deadline;
            cell5.innerHTML = task.data;
            cell6.innerHTML = '<input type="button" value="X" onclick="deletarItem(\'' + task.description + '\')"/>';
        }
}

recuperarDadosLocalStorage();



/*
let tags = [];
let tagContainer = document.querySelector('.tag-container');
let input = tagContainer.querySelector('input');

input.addEventListener('keyup', addTags);



function addTags(event){
   
    const keyPressedIsEnter = event.key == 'Enter'
    if(keyPressedIsEnter){
        input.value.split(',').forEach( tag => {
            if(tag){
                tags.push(tag.trim())
            }
        })

        updateTags();
        input.value = '';
    }
}


function updateTags(){
    clearTags();
    tags.slice().reverse().forEach( tag => {
        tagContainer.prepend(createTag(tag))
    })
}

function createTag(tag){
    const div = document.createElement('div')
    div.classList.add('tag')

    const span = document.createElement('span')
    span.innerHTML = tag
    div.append(span)

    const i = document.createElement('i');
    i.classList.add('close');
    i.setAttribute('data-id', tag);
    i.onclick = removeTag
    span.append(i)
    return div;
}

function removeTag(event){
    const buttonX  = event.currentTarget
    const id = buttonX.dataset.id
    const index = tags.indexOf(id)
    tags.splice(index, 1)

    updateTags();
}

function clearTags(){
    tagContainer.querySelectorAll('.tag').forEach( tagElement => tagElement.remove())
}
*/



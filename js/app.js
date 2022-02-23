// Sélectionner le formulaire des entrées
const taskForm = document.querySelector('.taskForm');
// Séléctionner les entrées du formulaire
const inputForm = document.querySelector('.inputForm');
// Séléctionner la liste des tâches
const tasksList = document.querySelector('#taskList');

// Tableau qui va stocker les tâches en localStorage
let tasks = [];

// Ajouter d'un eventListener sur le formulaire des entrées
taskForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addTask(inputForm.value);
});

// Création d'une tâche sous forme de liste
function addTask(task) {
  var inputText = document.getElementById("inputAddingText").value;
  if (inputText === '') {
    alert("Vous devez écrire une tâche pour l'ajouter à vote liste !");
    console.log('Une tâche vide ne peut pas être ajoutée.')
  } else {
    const task = {
      id: Date.now(),
      name: inputText,
      completed: false
    };
    // Ajout de la tâche au tableau des tâches
    tasks.push(task);
    // Sauvegarder le tableau des tâches dans le localStorage
    addToLocalStorage(tasks);
  }
  inputForm.value = '';
}

function renderTasks(tasks) {
  // Nettoyage de la liste des tâches (#taskList)
  tasksList.innerHTML = '';
  // Parcourir toutes les tâches du tableau des tâches
  tasks.forEach(function (task) {
    //Vérifier si la tâche est marquée comme faite
    const checked = task.completed ? 'checked' : null;
    // Créer une tâche avec la balise html liste
    const li = document.createElement('li');
    li.className = "list-group-item task d-flex flex-row align-items-center justify-content-center w-50";
    // Ajouter un id
    li.setAttribute('data-key', task.id);
    // Si la tâche est marquée comme faite : Ajouter la classe "checked"
    if (task.completed === true) {
      li.classList.add('checked');
      console.log('Tâche marquée comme faite.');
    }
    li.innerHTML = `<input type="checkbox" title="Marquer la tâche comme faite" class="checkbox form-check-input position-absolute start-0 mt-0" ${checked}>
    <p class="mb-0 item">${task.name}</p> 
    <button title="Supprimer définitivement la tâche" class="deleteTask btn btn-outline-danger position-absolute top-0 end-0 h-100">×</button>`;
    // Ajout de la tâche à la liste
    tasksList.append(li);
  });
}

// Fonction permettant de sauvegarder le tableau des tâches dans le localStorage de l'utilisateur
function addToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks);
}

// Fonction pour récupérer tout ce qu'il y a dans le localStorage
function getFromLocalStorage() {
  const reference = localStorage.getItem('tasks');
  if (reference) {
    tasks = JSON.parse(reference);
    renderTasks(tasks);
  }
}

// Vérification tâche faite ou pas
function toggle(id) {
  tasks.forEach(function (task) {
    if (task.id == id) {
      task.completed = !task.completed;
    }
  });
  addToLocalStorage(tasks);
}

// Fonction de suppression d'une tâche
function deleteTask(id) {

  let deleteConfirm = window.confirm('Confirmer ?');
  if (deleteConfirm) {
    tasks = tasks.filter(function (task) {
      return task.id != id;
    });
    addToLocalStorage(tasks);
  }
}

// Récupérer les tâches stockées dans le localStorage
getFromLocalStorage();

// Vérification des évennements "tâche faite" & "supprimer tâche"
tasksList.addEventListener('click', function (event) {
  // Vérifier si la tâche est faite
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  // Vérifier si la tâche est supprimé
  if (event.target.classList.contains('deleteTask')) {
    deleteTask(event.target.parentElement.getAttribute('data-key'));
  }
});
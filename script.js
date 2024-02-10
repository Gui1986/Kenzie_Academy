document.addEventListener('DOMContentLoaded', function () {
    const tasks = [
      { title: "Comprar comida para o gato", type: "Urgente" },
      { title: "Consertar Computador", type: "Importante" },
      { title: "Beber água", type: "Normal" },
      { title: "Enviar relatório trimestral", type: "Importante" },
      { title: "Fazer exercícios físicos", type: "Normal" },
      { title: "Agendar consulta médica", type: "Urgente" },
      { title: "Ler pelo menos um capítulo de um livro", type: "Normal" },
      { title: "Limpar a despensa", type: "Importante" },
      { title: "Pagar a conta de energia", type: "Urgente" },
      { title: "Assistir a um documentário interessante", type: "Normal" },
    ];
  
    // Função para renderizar os elementos no DOM
    function renderElements(tasks) {
      const tasksList = document.querySelector('.tasks__list');
      tasksList.innerHTML = '';
      tasks.forEach(task => {
        const taskItem = createTaskItem(task);
        tasksList.appendChild(taskItem);
      });
    }
  
    // Função para criar um novo item de tarefa (li) com base no objeto de tarefa fornecido
    function createTaskItem(task) {
      const taskListItem = document.createElement('li');
      taskListItem.classList.add('task__item');
  
      const taskInfoContainer = document.createElement('div');
      taskInfoContainer.classList.add('task-info__container');
  
      const taskTypeSpan = document.createElement('span');
      taskTypeSpan.classList.add('task-type');
      if (task.type.toLowerCase() === 'urgente') {
        taskTypeSpan.classList.add('span-urgent');
      } else if (task.type.toLowerCase() === 'importante') {
        taskTypeSpan.classList.add('span-important');
      } else {
        taskTypeSpan.classList.add('span-normal');
      }
  
      const taskTitleParagraph = document.createElement('p');
      taskTitleParagraph.textContent = task.title;
  
      const removeTaskButton = document.createElement('button');
      removeTaskButton.classList.add('task__button--remove-task');
      removeTaskButton.innerHTML = '&#128465;'; // Ícone de lixeira
  
      removeTaskButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Impedir que a tarefa seja selecionada ao clicar na lixeira
        const index = tasks.indexOf(task);
        if (index > -1) {
          tasks.splice(index, 1);
          renderElements(tasks);
        }
      });
  
      taskInfoContainer.appendChild(taskTypeSpan);
      taskInfoContainer.appendChild(taskTitleParagraph);
      taskListItem.appendChild(taskInfoContainer);
      taskListItem.appendChild(removeTaskButton);
  
      return taskListItem;
    }
  
    // Chamando a função para renderizar os elementos no carregamento da página
    renderElements(tasks);
  
    // Adicionando evento de clique ao botão de adicionar tarefa
    const addTaskButton = document.querySelector('.form__button--add-task');
    addTaskButton.addEventListener('click', function (event) {
      event.preventDefault();
      const titleInput = document.getElementById('input_title').value;
      const typeSelect = document.querySelector('.form__input--priority');
      const typeValue = typeSelect.options[typeSelect.selectedIndex].value;
      if (titleInput.trim() !== '' && typeValue !== '') {
        const newTask = {
          title: titleInput,
          type: typeValue
        };
        tasks.push(newTask);
        renderElements(tasks);
        document.getElementById('input_title').value = '';
        typeSelect.selectedIndex = 0;
      } else {
        alert('Por favor, preencha o título e selecione o tipo da tarefa.');
      }
    });
  
    // Adicionando evento de entrada ao campo de pesquisa
    const searchInput = document.querySelector('.header__input--search');
    searchInput.addEventListener('input', function () {
      const searchText = searchInput.value.trim().toLowerCase();
      const taskItems = document.querySelectorAll('.task__item');
  
      // Iterar sobre todos os itens da lista de tarefas
      taskItems.forEach(taskItem => {
        const taskTitle = taskItem.querySelector('p').textContent.toLowerCase();
        const taskType = taskItem.querySelector('.task-type').textContent.toLowerCase();
  
        // Verificar se o título ou o tipo da tarefa incluem o texto de pesquisa
        if (taskTitle.includes(searchText) || taskType.includes(searchText)) {
          // Mostrar o item da tarefa se corresponder à pesquisa
          taskItem.style.display = 'block';
        } else {
          // Ocultar o item da tarefa se não corresponder à pesquisa
          taskItem.style.display = 'none';
        }
      });
    });
  });
  
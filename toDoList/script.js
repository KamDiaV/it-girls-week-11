// Получаем основные DOM-элементы
const taskInput = document.getElementById('task-input'); // Поле ввода задачи
const taskList = document.getElementById('task-list'); // Список задач
const categoryList = document.getElementById('category-list'); // Список категорий
const categoryTitle = document.getElementById('category-title'); // Заголовок текущей категории
const addButton = document.getElementById('add-button'); // Кнопка "Add"
const sidebar = document.querySelector('.sidebar'); // Боковая панель

// Переменная для хранения текущей выбранной категории
let currentCategory = 'All';

// Создаем объект, который хранит цвета для каждой категории
const categoryColors = {
  All: '#d46b6b',
  Tasks: '#7a7a7a',
  Gryffindor: '#9c1f1f',
  Slytherin: '#2a623d',
  Hufflepuff: '#f0c75e',
  Ravenclaw: '#0e1a40',
};

// Функция для добавления новой задачи
function addTask(taskText, category = 'Tasks') {
  const task = document.createElement('li');
  task.dataset.category = category; // Сохраняем категорию задачи

  // Создаём круглый цветной индикатор категории
  const indicator = document.createElement('span');
  indicator.classList.add('category-indicator');
  indicator.style.backgroundColor = categoryColors[category]; // Устанавливаем цвет

  // Создаём чекбокс для выполнения задачи
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');

  // Создаём текст задачи
  const taskTextElement = document.createElement('span');
  taskTextElement.classList.add('task-text');
  taskTextElement.textContent = taskText;

  // Создаём кнопку удаления
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerHTML = `<img src="./icons/broom.svg" alt="Remove Task" class="delete-icon">`;

  // Добавляем обработчик для удаления задачи с анимацией
  deleteBtn.addEventListener('click', () => {
    task.classList.add('task-removing'); // Добавляем класс анимации
    setTimeout(() => task.remove(), 100); // Удаляем элемент после завершения анимации
  });

  // Добавляем зачёркивание выполненных задач
  checkbox.addEventListener('change', (e) => {
    taskTextElement.style.textDecoration = e.target.checked ? 'line-through' : 'none';
  });

  // Добавляем все элементы в задачу
  task.appendChild(indicator); // Индикатор категории
  task.appendChild(checkbox); // Чекбокс
  task.appendChild(taskTextElement); // Текст задачи
  task.appendChild(deleteBtn); // Кнопка удаления

  // Добавляем задачу в список задач
  taskList.appendChild(task);
}

// Фильтрация задач по категориям + плавное изменение цвета боковой панели
categoryList.addEventListener('click', (e) => {
  if (e.target.classList.contains('category')) {
    // Снимаем выделение с предыдущей активной категории
    document.querySelectorAll('.category').forEach((el) => el.classList.remove('active'));

    // Добавляем активный стиль выбранной категории
    e.target.classList.add('active');

    // Обновляем текущую категорию
    currentCategory = e.target.dataset.category;
    categoryTitle.textContent = currentCategory;

    // Плавно меняем цвет фона боковой панели
    sidebar.style.transition = 'background-color 0.3s ease-in-out';
    sidebar.style.backgroundColor = categoryColors[currentCategory];

    // Показываем задачи только выбранной категории
    document.querySelectorAll('#task-list li').forEach((task) => {
      task.style.display = (currentCategory === 'All' || task.dataset.category === currentCategory) ? 'flex' : 'none';
    });
  }
});

// Добавление задачи через кнопку "Add"
addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim(); // Убираем пробелы по краям
  if (taskText) {
    addTask(taskText, currentCategory); // Добавляем задачу в текущую категорию
    taskInput.value = ''; // Очищаем поле ввода
  }
});

// Добавление задачи по нажатию Enter
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addButton.click();
});
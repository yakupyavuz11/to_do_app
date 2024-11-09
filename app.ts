// burda görevlerin yapısını belirliyoruz. Task arayüzü oluşturdum.
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// html den aldığımız elementlerle işlem yapabilmek için bunları seçiyoruz.
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskButton = document.getElementById(
  "addTaskButton"
) as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

let tasks: Task[] = []; // burda gelen tasklarımızı tutacak bir dizi olusturdum.

// task eklemek icin fonksiyon olusturalim.

function addTask(title: string): void {
  const newTask: Task = {
    id: Date.now(),
    title,
    completed: false,
  };

  tasks.push(newTask); // yeni taski diziye ekledim.

  renderTasks(); // taskList'e yeni taski ekleyince güncellemeyi yapacak fonksiyonu çağırıyorum.
}

function removeTask(id: number): void {
  tasks = tasks.filter((task) => task.id !== id); // taski id'sine göre silmek için filter metodunu kullanarak yeni bir dizi olusturdum.)

  renderTasks(); // taskList'e silinen taski silince güncellemeyi yapacak fonksiyonu cagirdim.
}

function toogleTaskCompletion(id: number): void {
  const task = tasks.find((task) => task.id === id); // taski id'sine göre bulmak için find metodunu kullanarak taski buldum.

  if (task) {
    task.completed = !task.completed; // taskin completed durumunu toggle ediyorum.
  }
}

// tasks dizisini html içinde görüntülemek için gerekli elemanları oluşuturdum
function renderTasks() {
  taskList.innerHTML = ""; // listeyi temizleme
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed); // task'in completed durumuna göre listeye class ekliyorum.

    const title = document.createElement("span");
    title.textContent = task.title;

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.onclick = () => toogleTaskCompletion(task.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.onclick = () => removeTask(task.id);

    li.appendChild(title);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

addTaskButton.onclick = () => {
  const taskTitle = taskInput.value.trim();
  if (taskTitle) {
    addTask(taskTitle);
    taskInput.value = "";
  }
};

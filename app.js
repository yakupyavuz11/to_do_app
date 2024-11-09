// html den aldığımız elementlerle işlem yapabilmek için bunları seçiyoruz.
var taskInput = document.getElementById("taskInput");
var addTaskButton = document.getElementById("addTaskButton");
var taskList = document.getElementById("taskList");
var tasks = []; // burda gelen tasklarımızı tutacak bir dizi olusturdum.
// task eklemek icin fonksiyon olusturalim.
function addTask(title) {
    var newTask = {
        id: Date.now(),
        title: title,
        completed: false,
    };
    tasks.push(newTask); // yeni taski diziye ekledim.
    renderTasks(); // taskList'e yeni taski ekleyince güncellemeyi yapacak fonksiyonu çağırıyorum.
}
function removeTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; }); // taski id'sine göre silmek için filter metodunu kullanarak yeni bir dizi olusturdum.)
    renderTasks(); // taskList'e silinen taski silince güncellemeyi yapacak fonksiyonu cagirdim.
}
function toogleTaskCompletion(id) {
    var task = tasks.find(function (task) { return task.id === id; }); // taski id'sine göre bulmak için find metodunu kullanarak taski buldum.
    if (task) {
        task.completed = !task.completed; // taskin completed durumunu toggle ediyorum.
    }
}
// tasks dizisini html içinde görüntülemek için gerekli elemanları oluşuturdum
function renderTasks() {
    taskList.innerHTML = ""; // listeyi temizleme
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.classList.toggle("completed", task.completed); // task'in completed durumuna göre listeye class ekliyorum.
        var title = document.createElement("span");
        title.textContent = task.title;
        var completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.onclick = function () { return toogleTaskCompletion(task.id); };
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.onclick = function () { return removeTask(task.id); };
        li.appendChild(title);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
addTaskButton.onclick = function () {
    var taskTitle = taskInput.value.trim();
    if (taskTitle) {
        addTask(taskTitle);
        taskInput.value = "";
    }
};

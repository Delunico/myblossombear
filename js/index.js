function toggleNav() {
    var e = document.getElementById("myTopnav");
    e.classList.contains("responsive")
        ? e.classList.remove("responsive")
        : (e.className += " responsive");
}

const API_URL = 'http://24.150.69.11:5001/api'; // Replace with your Netlify Functions API URL

// Function to add a new task
const addTask = async (task) => {
    try {
        const response = await fetch(`${API_URL}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add task: ${response.statusText}`);
        }

        const newTask = await response.json();
        return newTask;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
};

// Function to update an existing task
const updateTask = async (old_task, checked) => {
    let task = {
        ...old_task,
        "is_completed": checked
    }
    console.log("task to update", task)
    try {
        const response = await fetch(`${API_URL}/task`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update task: ${response.statusText}`);
        }

        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Function to get all tasks
const getTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);

        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }

        const tasks = response.json()
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};


window.addEventListener("DOMContentLoaded", (e) => {
    // var o = !1;
    // $(".container").on("scroll", function () {
    //     1e3 <= document.getElementsByClassName("container")[0].scrollTop &&
    //         !o &&
    //         ((o = !0), $("#myTopnav").addClass("scroll-nav")),
    //         document.getElementsByClassName("container")[0].scrollTop < 1e3 &&
    //         o &&
    //         ((o = !1), console.log("ey"), $("#myTopnav").removeClass("scroll-nav"));
    // })
    // var t = $("#plug").detach(),
    //     n = document.getElementById("myTopnav"),
    //     a = document.getElementsByClassName("scroll");
    // for (i = 0; i < a.length; i++) {
    //     var l = a[i];
    //     l.classList.contains("cta") &&
    //         $("#logo").on("click", function () {
    //             document
    //                 .querySelector(".landing")
    //                 .scrollIntoView({ behavior: "smooth" });
    //         }),
    //         l.addEventListener("click", function (e) {
    //             document
    //                 .querySelector("." + e.target.id)
    //                 .scrollIntoView({ behavior: "smooth" }),
    //                 n.classList.remove("responsive");
    //         });
    // }

    // getTasks().then(tasks => {
    //     const taskList = document.getElementById("task-list");
    //     console.log("tasklist", document.getElementById("task-list"))
    //     console.log("tasks", tasks)
    //     tasks.forEach(task => {
    //         taskList.innerHTML += `<li>${task.title}

    //         <input id="${'checked-' + task.task_id}" type="checkbox" ${task.is_completed == 1 ? 'checked' : ''}/>

    //         </li>`
    //         document.getElementById("checked-" + task.task_id).addEventListener('change', () => {
    //             updateTask(task, document.getElementById("checked-" + task.task_id).checked);
    //         });
    //     });
    // });

    getTasks().then(tasks => {
        const taskList = document.getElementById("task-list");
        console.log("tasklist", document.getElementById("task-list"))
        console.log("tasks", tasks)

        tasks.forEach(task => {
            const taskCheckBox = document.createElement('input');
            taskCheckBox.id = 'checked-' + task.task_id;
            taskCheckBox.type = 'checkbox';
            taskCheckBox.checked = task.is_completed == 1;

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${task.title}
            `;
            listItem.appendChild(taskCheckBox);

            taskList.appendChild(listItem);

            // Add event listener to each checkbox
            taskCheckBox.addEventListener('change', () => {
                updateTask(task, document.getElementById("checked-" + task.task_id).checked);
            });
        });
    });




})

import React, { useEffect } from "react";
import "./App.css";
import "./Appplus.css";

let reminderTimer = null;
let audioContext = null;


// =====================================================
// HELPERS
// =====================================================

function todoBox() {
    return document.querySelector(".todo");
}

function starBox() {
    return document.querySelector(".pop1");
}

function savingBox() {
    return document.querySelector(".saving");
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function closeForm() {
    document.querySelector(".con1").innerHTML = "";
    document.querySelector(".con1").classList.remove("style1");
    document.querySelector(".overlay").classList.remove("overlay1");
}

function saveTasks() {
    localStorage.setItem(
        "todotasks",
        todoBox().innerHTML
    );

    localStorage.setItem(
        "startask",
        starBox().innerHTML
    );
}

function showEmpty(icon, text) {
    const box = savingBox();

    box.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <h3 class="default">${escapeHTML(text)}</h3>
    `;

    box.classList.add("savingStyle");
}

function hideEmpty() {
    const box = savingBox();

    box.innerHTML = "";
    box.classList.remove("savingStyle");
}


// =====================================================
// AUDIO
// =====================================================

function audio() {
    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) return null;

    if (!audioContext) {
        audioContext = new AudioContext();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}

function tone(
    frequency,
    start,
    duration,
    volume = 0.1,
    type = "sine"
) {
    const ctx = audio();

    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;

    oscillator.frequency.setValueAtTime(
        frequency,
        start
    );

    gain.gain.setValueAtTime(
        0.001,
        start
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        start + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        start + duration
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(start);
    oscillator.stop(start + duration);
}

function sound(type) {
    const ctx = audio();

    if (!ctx) return;

    const n = ctx.currentTime;

    if (type === "click") {
        tone(700, n, 0.06, 0.05);
    }

    if (type === "add") {
        tone(650, n, 0.08, 0.09);
        tone(900, n + 0.09, 0.10, 0.10);
    }

    if (type === "save") {
        tone(600, n, 0.10, 0.09);
        tone(800, n + 0.10, 0.10, 0.10);
        tone(1000, n + 0.20, 0.14, 0.12);
    }

    if (type === "star") {
        tone(900, n, 0.08, 0.10);
        tone(1200, n + 0.08, 0.12, 0.12);
    }

    if (type === "unstar") {
        tone(850, n, 0.08, 0.08);
        tone(600, n + 0.08, 0.12, 0.08);
    }

    if (type === "edit") {
        tone(700, n, 0.07, 0.08);
        tone(850, n + 0.09, 0.07, 0.08);
    }

    if (type === "update") {
        tone(700, n, 0.08, 0.10);
        tone(950, n + 0.10, 0.12, 0.12);
    }

    if (type === "complete") {
        tone(1000, n, 0.10, 0.12);
        tone(800, n + 0.10, 0.10, 0.10);
        tone(600, n + 0.20, 0.14, 0.08);
    }

    if (type === "restore") {
        tone(600, n, 0.10, 0.09);
        tone(800, n + 0.10, 0.10, 0.10);
        tone(1000, n + 0.20, 0.14, 0.12);
    }

    if (type === "delete") {
        tone(500, n, 0.12, 0.10, "triangle");
        tone(300, n + 0.13, 0.18, 0.08, "triangle");
    }

    if (type === "cancel") {
        tone(450, n, 0.08, 0.06);
    }

    if (type === "reminder") {
        tone(880, n, 0.18, 0.18);
        tone(660, n + 0.22, 0.18, 0.16);
        tone(880, n + 0.44, 0.18, 0.18);
        tone(660, n + 0.66, 0.18, 0.16);
        tone(880, n + 0.88, 0.25, 0.20);
    }
}


// =====================================================
// NOTIFICATION
// =====================================================

function askNotification() {
    if (
        "Notification" in window &&
        Notification.permission === "default"
    ) {
        Notification.requestPermission();
    }
}

function browserNotification(text, date, time) {
    if (
        !("Notification" in window) ||
        Notification.permission !== "granted"
    ) {
        return;
    }

    new Notification(
        "Regular Task Reminder",
        {
            body: `${text}\n${date} ${time}`,
            icon: `${window.location.origin}/ico.png`
        }
    );
}

function notify(title, message) {
    let box =
        document.querySelector(".taskNotification");

    if (!box) {
        box = document.createElement("div");
        box.className = "taskNotification";
        document.body.appendChild(box);
    }

    box.innerHTML = `
        <div class="notificationIcon">
            <i class="fa-solid fa-bell"></i>
        </div>

        <div class="notificationContent">
            <strong>${escapeHTML(title)}</strong>
            <span>${escapeHTML(message)}</span>
        </div>

        <button
            type="button"
            class="notificationClose"
        >
            ×
        </button>
    `;

    box.classList.add("notificationShow");

    box.querySelector(
        ".notificationClose"
    ).onclick = () => {
        box.classList.remove("notificationShow");
    };

    clearTimeout(box.timer);

    box.timer = setTimeout(() => {
        box.classList.remove("notificationShow");
    }, 8000);
}


// =====================================================
// TASK DATE
// =====================================================

function taskDate(task) {
    const date =
        task.querySelector(".l3")
            ?.innerText
            .replace("Date:", "")
            .trim() || "";

    const time =
        task.querySelector(".l4")
            ?.innerText
            .replace("Time:", "")
            .trim() || "";

    return new Date(`${date}T${time}`);
}

function reminderId(task) {
    const text =
        task.querySelector(".l1")
            ?.innerText || "";

    const date =
        task.querySelector(".l3")
            ?.innerText
            .replace("Date:", "")
            .trim() || "";

    const time =
        task.querySelector(".l4")
            ?.innerText
            .replace("Time:", "")
            .trim() || "";

    return `${text}|${date}|${time}`;
}

function taskDay(date) {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days[
        new Date(`${date}T00:00:00`).getDay()
    ];
}


// =====================================================
// ADD TASK
// =====================================================

function addTask() {
    askNotification();

    const form =
        document.querySelector(".con1");

    document.querySelector(".overlay")
        .classList.add("overlay1");

    form.classList.add("style1");

    form.innerHTML = `
        <form class="form1">

            <div class="ip1">
                <a>What is your task?</a>

                <textarea
                    class="ip20"
                    placeholder="Enter task here"
                ></textarea>
            </div>

            <div class="ip1">
                <a>Pick remainder date and time</a>

                <input
                    type="datetime-local"
                    class="ip21"
                />
            </div>

            <div class="ip1">
                <a>Enter task type</a>

                <input
                    type="text"
                    class="ip22"
                    placeholder="Enter here"
                />
            </div>

            <div class="buttons">

                <button
                    type="button"
                    class="btn btn-danger cancelTask"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="btn btn-primary saveTask"
                >
                    Save Task
                </button>

            </div>

        </form>
    `;

    form.querySelector(
        ".cancelTask"
    ).onclick = () => {
        sound("cancel");
        closeForm();
    };

    form.querySelector(
        ".saveTask"
    ).onclick = () => {

        const text =
            form.querySelector(".ip20")
                .value.trim();

        const datetime =
            form.querySelector(".ip21")
                .value;

        const type =
            form.querySelector(".ip22")
                .value.trim();

        if (!text || !datetime || !type) {
            alert("Please fill all the fields.");
            return;
        }

        const parts = datetime.split("T");

        const date = parts[0];
        const time = parts[1];

        todoBox().insertAdjacentHTML(
            "beforeend",
            `
            <div class="form-check">

                <input
                    class="form-check-input tasks"
                    type="checkbox"
                >

                <div class="taskContent">

                    <label
                        class="form-check-label l1 colaps"
                    >
                        ${escapeHTML(text)}
                    </label>

                    <hr>

                    <label class="form-check-label l2">
                        Day:${taskDay(date)}
                    </label>

                    <br>

                    <label class="form-check-label l3">
                        Date:${date}
                    </label>

                    <br>

                    <label class="form-check-label l4">
                        Time:${time}
                    </label>

                    <div class="extra">

                        <button
                            type="button"
                            class="feature"
                        >
                            ${escapeHTML(type)}
                        </button>

                        <div class="extra1">
                            <i class="fa-regular fa-star"></i>
                        </div>

                        <div class="extra2">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </div>

                    </div>

                </div>

            </div>
            `
        );

        saveTasks();

        closeForm();
        hideEmpty();

        sound("save");

        bindTasks();

        notify(
            "Task Added",
            "Your task has been saved."
        );
    };
}


// =====================================================
// EDIT TASK
// =====================================================

function editTask(task) {
    sound("edit");

    const form =
        document.querySelector(".con1");

    document.querySelector(".overlay")
        .classList.add("overlay1");

    form.classList.add("style1");

    const oldText =
        task.querySelector(".l1")
            ?.innerText || "";

    const oldDate =
        task.querySelector(".l3")
            ?.innerText
            .replace("Date:", "")
            .trim() || "";

    const oldTime =
        task.querySelector(".l4")
            ?.innerText
            .replace("Time:", "")
            .trim() || "";

    const oldType =
        task.querySelector(".feature")
            ?.innerText || "";

    const oldReminder =
        reminderId(task);

    form.innerHTML = `
        <form class="form1">

            <div class="ip1">
                <a>What is your task?</a>

                <textarea class="ip20">${escapeHTML(
                    oldText
                )}</textarea>
            </div>

            <div class="ip1">
                <a>Pick remainder date and time</a>

                <input
                    type="datetime-local"
                    class="ip21"
                    value="${oldDate}T${oldTime}"
                />
            </div>

            <div class="ip1">
                <a>Enter task type</a>

                <input
                    type="text"
                    class="ip22"
                    value="${escapeHTML(oldType)}"
                />
            </div>

            <div class="buttons">

                <button
                    type="button"
                    class="btn btn-danger cancelEdit"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="btn btn-primary updateEdit"
                >
                    Update Task
                </button>

            </div>

        </form>
    `;

    form.querySelector(
        ".cancelEdit"
    ).onclick = () => {
        sound("cancel");
        closeForm();
    };

    form.querySelector(
        ".updateEdit"
    ).onclick = () => {

        const text =
            form.querySelector(".ip20")
                .value.trim();

        const datetime =
            form.querySelector(".ip21")
                .value;

        const type =
            form.querySelector(".ip22")
                .value.trim();

        if (!text || !datetime || !type) {
            alert("Please fill all the fields.");
            return;
        }

        const parts = datetime.split("T");

        const date = parts[0];
        const time = parts[1];

        task.querySelector(".l1").innerText =
            text;

        task.querySelector(".l2").innerText =
            `Day:${taskDay(date)}`;

        task.querySelector(".l3").innerText =
            `Date:${date}`;

        task.querySelector(".l4").innerText =
            `Time:${time}`;

        task.querySelector(".feature").innerText =
            type;

        let notified =
            JSON.parse(
                localStorage.getItem(
                    "notifiedReminders"
                ) || "[]"
            );

        notified = notified.filter(
            id => id !== oldReminder
        );

        localStorage.setItem(
            "notifiedReminders",
            JSON.stringify(notified)
        );

        saveTasks();

        closeForm();

        sound("update");

        bindTasks();

        notify(
            "Task Updated",
            "Your task was updated successfully."
        );
    };
}


// =====================================================
// STAR
// =====================================================

function bindStars() {
    document.querySelectorAll(
        ".fa-star"
    ).forEach(star => {

        if (star.dataset.bound === "true") {
            return;
        }

        star.dataset.bound = "true";

        star.onclick = event => {
            event.stopPropagation();

            const task =
                star.closest(".form-check");

            if (!task) return;

            if (
                star.classList.contains(
                    "starStyle"
                )
            ) {
                sound("unstar");

                star.classList.remove(
                    "fa-solid",
                    "starStyle"
                );

                star.classList.add(
                    "fa-regular"
                );

                todoBox().appendChild(task);

            } else {
                sound("star");

                star.classList.remove(
                    "fa-regular"
                );

                star.classList.add(
                    "fa-solid",
                    "starStyle"
                );

                starBox().appendChild(task);
            }

            saveTasks();
            bindTasks();
        };
    });
}


// =====================================================
// COMPLETE TASK
// =====================================================

function completeTask(task) {
    if (!task) return;

    sound("complete");

    const container =
        document.createElement("div");

    container.innerHTML =
        localStorage.getItem(
            "trashtasks"
        ) || "";

    const copy =
        task.cloneNode(true);

    const checkbox =
        copy.querySelector(".tasks");

    if (checkbox) {
        checkbox.checked = true;
        checkbox.disabled = true;
    }

    copy.querySelectorAll(
        "[data-bound]"
    ).forEach(element => {
        delete element.dataset.bound;
    });

    container.appendChild(copy);

    localStorage.setItem(
        "trashtasks",
        container.innerHTML
    );

    task.remove();

    saveTasks();

    const message =
        document.querySelector(".Message1");

    message.classList.add("show");

    const undo =
        message.querySelector(".btn-link");

    clearTimeout(message.undoTimer);

    undo.onclick = () => {

        const trash =
            document.createElement("div");

        trash.innerHTML =
            localStorage.getItem(
                "trashtasks"
            ) || "";

        const text =
            task.querySelector(".l1")
                ?.innerText || "";

        trash.querySelectorAll(
            ".form-check"
        ).forEach(item => {

            if (
                item.querySelector(".l1")
                    ?.innerText === text
            ) {
                item.remove();
            }
        });

        localStorage.setItem(
            "trashtasks",
            trash.innerHTML
        );

        const box =
            task.querySelector(".tasks");

        if (box) {
            box.checked = false;
            box.disabled = false;
        }

        task.querySelectorAll(
            "[data-bound]"
        ).forEach(element => {
            delete element.dataset.bound;
        });

        todoBox().appendChild(task);

        saveTasks();

        bindTasks();

        message.classList.remove("show");

        hideEmpty();
    };

    message.undoTimer =
        setTimeout(() => {
            message.classList.remove("show");
        }, 5000);

    if (
        todoBox().children.length === 0 &&
        starBox().children.length === 0
    ) {
        showEmpty(
            "fa-book-open",
            "No Tasks Added"
        );
    }
}


// =====================================================
// CHECKBOX
// =====================================================

function bindCheckboxes() {
    document.querySelectorAll(
        ".tasks"
    ).forEach(box => {

        if (box.dataset.bound === "true") {
            return;
        }

        box.dataset.bound = "true";

        box.onchange = event => {

            if (!event.target.checked) {
                return;
            }

            completeTask(
                event.target.closest(
                    ".form-check"
                )
            );
        };
    });
}


// =====================================================
// EDIT ICON
// =====================================================

function bindEdit() {
    document.querySelectorAll(
        ".fa-pen-to-square"
    ).forEach(icon => {

        if (icon.dataset.bound === "true") {
            return;
        }

        icon.dataset.bound = "true";

        icon.onclick = event => {
            event.stopPropagation();

            const task =
                icon.closest(".form-check");

            if (task) {
                editTask(task);
            }
        };
    });
}

function bindTasks() {
    bindStars();
    bindCheckboxes();
    bindEdit();
}


// =====================================================
// HOME
// =====================================================

function home() {
    todoBox().style.display = "flex";
    starBox().style.display = "none";

    todoBox().querySelectorAll(
        ".form-check"
    ).forEach(task => {
        task.style.display = "block";
    });

    hideEmpty();

    if (
        todoBox().children.length === 0
    ) {
        showEmpty(
            "fa-book-open",
            "No Tasks Added"
        );
    }

    bindTasks();
}


// =====================================================
// STARRED
// =====================================================

function starred() {
    todoBox().style.display = "none";
    starBox().style.display = "flex";

    hideEmpty();

    if (
        starBox().children.length === 0
    ) {
        showEmpty(
            "fa-star",
            "No Starred Tasks"
        );
    }

    bindTasks();
}


// =====================================================
// TODAY
// =====================================================

function todayTasks() {
    todoBox().style.display = "flex";
    starBox().style.display = "none";

    const now = new Date();

    const today =
        `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}-${String(
            now.getDate()
        ).padStart(2, "0")}`;

    let found = false;

    todoBox().querySelectorAll(
        ".form-check"
    ).forEach(task => {

        const date =
            task.querySelector(".l3")
                ?.innerText
                .replace("Date:", "")
                .trim();

        if (date === today) {
            task.style.display = "block";
            found = true;
        } else {
            task.style.display = "none";
        }
    });

    if (found) {
        hideEmpty();
    } else {
        showEmpty(
            "fa-list-check",
            "No Today's Tasks"
        );
    }

    bindTasks();
}


// =====================================================
// REMINDERS VIEW
// =====================================================

function reminders() {
    todoBox().style.display = "flex";
    starBox().style.display = "none";

    const now = new Date();
    let found = false;

    todoBox().querySelectorAll(
        ".form-check"
    ).forEach(task => {

        const date =
            taskDate(task);

        if (
            !Number.isNaN(date.getTime()) &&
            date >= now
        ) {
            task.style.display = "block";
            found = true;
        } else {
            task.style.display = "none";
        }
    });

    if (found) {
        hideEmpty();
    } else {
        showEmpty(
            "fa-calendar-days",
            "No Upcoming Reminders"
        );
    }

    bindTasks();
}


// =====================================================
// SORT
// =====================================================

function sortTasks() {
    todoBox().style.display = "flex";
    starBox().style.display = "none";

    const tasks =
        Array.from(
            todoBox().querySelectorAll(
                ".form-check"
            )
        );

    tasks.sort(
        (a, b) =>
            taskDate(a) - taskDate(b)
    );

    tasks.forEach(task => {
        task.style.display = "block";
        todoBox().appendChild(task);
    });

    saveTasks();

    if (tasks.length) {
        hideEmpty();
    } else {
        showEmpty(
            "fa-book-open",
            "No Tasks Added"
        );
    }

    bindTasks();
}


// =====================================================
// ABOUT
// =====================================================

function about() {
    todoBox().style.display = "none";
    starBox().style.display = "none";

    savingBox().innerHTML = `
        <div class="aboutBox">

            <i class="fa-solid fa-circle-info"></i>

            <h2>Regular Task</h2>

            <p>
                A simple task management application.
            </p>

            <p>
                Add tasks, set reminders,
                star important tasks,
                edit tasks and manage completed tasks.
            </p>

            <p>
                Your tasks are stored locally
                in your browser.
            </p>

        </div>
    `;

    savingBox().classList.add("savingStyle");
}


// =====================================================
// TRASH
// =====================================================

function prepareTrash() {
    const old =
        localStorage.getItem(
            "trashtasks"
        );

    if (!old) return;

    const container =
        document.createElement("div");

    container.innerHTML = old;

    container.querySelectorAll(
        ".form-check"
    ).forEach(task => {

        if (
            task.querySelector(
                ".trashButtons"
            )
        ) {
            return;
        }

        task.insertAdjacentHTML(
            "beforeend",
            `
            <div class="trashButtons">

                <button
                    type="button"
                    class="restoreTask btn btn-success btn-sm"
                >
                    <i class="fa-solid fa-rotate-left"></i>
                    Restore
                </button>

                <button
                    type="button"
                    class="deleteTask btn btn-danger btn-sm"
                >
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>

            </div>
            `
        );
    });

    localStorage.setItem(
        "trashtasks",
        container.innerHTML
    );
}

function trash() {
    todoBox().style.display = "flex";
    starBox().style.display = "none";

    const old =
        localStorage.getItem(
            "trashtasks"
        );

    todoBox().innerHTML = "";

    if (!old) {
        showEmpty(
            "fa-trash",
            "Trash is Empty"
        );
        return;
    }

    todoBox().innerHTML = old;

    prepareTrash();

    bindTrash();

    hideEmpty();
}

function bindTrash() {

    document.querySelectorAll(
        ".restoreTask"
    ).forEach(button => {

        if (button.dataset.bound === "true") {
            return;
        }

        button.dataset.bound = "true";

        button.onclick = () => {

            const task =
                button.closest(
                    ".form-check"
                );

            if (!task) return;

            sound("restore");

            const text =
                task.querySelector(".l1")
                    ?.innerText || "";

            const container =
                document.createElement("div");

            container.innerHTML =
                localStorage.getItem(
                    "trashtasks"
                ) || "";

            container.querySelectorAll(
                ".form-check"
            ).forEach(item => {

                if (
                    item.querySelector(".l1")
                        ?.innerText === text
                ) {
                    item.remove();
                }
            });

            localStorage.setItem(
                "trashtasks",
                container.innerHTML
            );

            const checkbox =
                task.querySelector(".tasks");

            if (checkbox) {
                checkbox.checked = false;
                checkbox.disabled = false;
            }

            task.querySelector(
                ".trashButtons"
            )?.remove();

            task.querySelectorAll(
                "[data-bound]"
            ).forEach(element => {
                delete element.dataset.bound;
            });

            todoBox().appendChild(task);

            saveTasks();

            bindTasks();

            notify(
                "Task Restored",
                "The task has been restored."
            );

            if (
                todoBox().children.length === 0
            ) {
                showEmpty(
                    "fa-trash",
                    "Trash is Empty"
                );
            }
        };
    });


    document.querySelectorAll(
        ".deleteTask"
    ).forEach(button => {

        if (button.dataset.bound === "true") {
            return;
        }

        button.dataset.bound = "true";

        button.onclick = () => {

            const task =
                button.closest(
                    ".form-check"
                );

            if (!task) return;

            sound("delete");

            task.remove();

            localStorage.setItem(
                "trashtasks",
                todoBox().innerHTML
            );

            notify(
                "Task Deleted",
                "The task was permanently deleted."
            );

            if (
                todoBox().children.length === 0
            ) {
                showEmpty(
                    "fa-trash",
                    "Trash is Empty"
                );
            }
        };
    });
}


// =====================================================
// LOAD TASKS
// =====================================================

function loadTasks() {

    const saved =
        localStorage.getItem(
            "todotasks"
        );

    const savedStar =
        localStorage.getItem(
            "startask"
        );

    todoBox().innerHTML =
        saved || "";

    starBox().innerHTML =
        savedStar || "";

    bindTasks();

    if (
        todoBox().children.length === 0 &&
        starBox().children.length === 0
    ) {
        todoBox().style.display = "none";

        showEmpty(
            "fa-book-open",
            "No Tasks Added"
        );
    } else {
        hideEmpty();
    }
}


// =====================================================
// NAVIGATION EVENTS
// =====================================================

function navigation() {

    const plus =
        document.querySelector(".disl");

    document.querySelector(".btn1").onclick =
        () => {
            sound("click");
            home();

            plus.style.pointerEvents = "auto";
            plus.style.opacity = "1";
        };

    document.querySelector(".btn2").onclick =
        () => {
            sound("click");
            starred();

            plus.style.pointerEvents = "none";
            plus.style.opacity = "0.5";
        };

    document.querySelector(".btn3").onclick =
        () => {
            sound("add");
            addTask();
        };

    document.querySelector(".btn4").onclick =
        () => {
            sound("click");
            trash();

            plus.style.pointerEvents = "none";
            plus.style.opacity = "0.5";
        };

    document.querySelector(".btn5").onclick =
        () => {
            sound("click");
            about();

            plus.style.pointerEvents = "none";
            plus.style.opacity = "0.5";
        };

    document.querySelector(".btn6").onclick =
        () => {
            sound("click");
            todayTasks();

            plus.style.pointerEvents = "none";
            plus.style.opacity = "0.5";
        };

    document.querySelector(".btn7").onclick =
        () => {
            sound("click");
            sortTasks();

            plus.style.pointerEvents = "auto";
            plus.style.opacity = "1";
        };

    document.querySelector(".btn8").onclick =
        () => {
            sound("click");
            reminders();

            plus.style.pointerEvents = "none";
            plus.style.opacity = "0.5";
        };

    plus.onclick = () => {
        sound("add");
        addTask();
    };
}


// =====================================================
// REMINDER CHECKER
// =====================================================

function checkReminders() {

    const now = new Date();

    const tasks =
        document.querySelectorAll(
            ".todo .form-check, .pop1 .form-check"
        );

    let notified =
        JSON.parse(
            localStorage.getItem(
                "notifiedReminders"
            ) || "[]"
        );

    tasks.forEach(task => {

        const date =
            taskDate(task);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return;
        }

        const id =
            reminderId(task);

        if (
            now >= date &&
            !notified.includes(id)
        ) {

            notified.push(id);

            localStorage.setItem(
                "notifiedReminders",
                JSON.stringify(notified)
            );

            const text =
                task.querySelector(".l1")
                    ?.innerText || "Task";

            const dateText =
                task.querySelector(".l3")
                    ?.innerText
                    .replace("Date:", "")
                    .trim() || "";

            const timeText =
                task.querySelector(".l4")
                    ?.innerText
                    .replace("Time:", "")
                    .trim() || "";

            sound("reminder");

            notify(
                "Task Reminder",
                `${text} — ${timeText}`
            );

            browserNotification(
                text,
                dateText,
                timeText
            );
        }
    });
}


// =====================================================
// APP
// =====================================================

function App() {

    useEffect(() => {

        loadTasks();
        prepareTrash();
        navigation();

        askNotification();

        reminderTimer =
            setInterval(
                checkReminders,
                1000
            );

        return () => {
            if (reminderTimer) {
                clearInterval(
                    reminderTimer
                );
            }
        };

    }, []);

    return (
        <>

            <nav
                className="navbar navbar-dark bg-primary fixed-top"
            >

                <div className="container-fluid">

                    <label className="navbar-brand">
                        Regular Tasks
                    </label>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar"
                        aria-controls="offcanvasDarkNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div
                        className="offcanvas offcanvas-end text-bg-dark"
                        tabIndex="-1"
                        id="offcanvasDarkNavbar"
                    >

                        <div className="offcanvas-header">

                            <h5 className="offcanvas-title">
                                Menu List
                            </h5>

                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="offcanvas"
                            ></button>

                        </div>


                        <div className="offcanvas-body">

                            <ul className="navbar-nav">

                                <li className="nav-item">

                                    <div className="navh">

                                        <i className="fa-solid fa-house"></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn1"
                                        >
                                            Home
                                        </button>

                                    </div>

                                </li>


                                <li className="nav-item">

                                    <div className="navb">

                                        <i
                                            className="fa-regular fa-star"
                                            style={{
                                                color: "white"
                                            }}
                                        ></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn2"
                                        >
                                            Starred
                                        </button>

                                    </div>

                                </li>


                                <li className="nav-item">

                                    <div className="navb">

                                        <i className="fa-solid fa-plus"></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn3"
                                        >
                                            Add Task
                                        </button>

                                    </div>

                                </li>


                                <li className="nav-item">

                                    <div className="navb">

                                        <i className="fa-solid fa-recycle"></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn4"
                                        >
                                            Trash
                                        </button>

                                    </div>

                                </li>


                                <li className="nav-item">

                                    <div className="navb">

                                        <i className="fa-solid fa-circle-info"></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn5"
                                        >
                                            About
                                        </button>

                                    </div>

                                </li>


                                <li className="nav-item">

                                    <div className="navb">

                                        <i className="fa-solid fa-list-check"></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn6"
                                        >
                                            Today's Task
                                        </button>

                                    </div>

                                </li>


                                <li className="nav-item">

                                    <div className="navb">

                                        <i className="fa-solid fa-arrow-up-wide-short"></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn7"
                                        >
                                            Sort
                                        </button>

                                    </div>

                                </li>


                                <li className="nav-item">

                                    <div className="navb">

                                        <i className="fa-solid fa-calendar-days"></i>

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn8"
                                        >
                                            Remainders
                                        </button>

                                    </div>

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </nav>


            <div className="a1">

                <i
                    className="fa-solid fa-circle-plus disl"
                ></i>

            </div>


            <div className="saving savingStyle">

                <i
                    className="fa-solid fa-book-open"
                ></i>

                <h3 className="default">
                    No Tasks Added
                </h3>

            </div>


            <div className="todo"></div>


            <div className="con1"></div>


            <div className="overlay"></div>


            <div className="Message1">

                <div className="text1">
                    Task is finished
                </div>

                <div className="textbt">

                    <button
                        type="button"
                        className="btn btn-link"
                    >
                        Undo
                    </button>

                </div>

            </div>


            <div className="pop1"></div>

        </>
    );
}

export default App;
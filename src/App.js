import React, { useEffect } from 'react';
import './App.css';
import './Appplus.css';

let currentView = "home";
let reminderTimer = null;
let audioContext = null;


// =====================================================
// BASIC HELPERS
// =====================================================

function getTodo() {
    return document.querySelector(".todo");
}

function getStarred() {
    return document.querySelector(".pop1");
}

function getSaving() {
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


// =====================================================
// AUDIO
// =====================================================

function getAudioContext() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) {
        return null;
    }

    if (!audioContext) {
        audioContext = new AudioContext();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}


function makeTone(
    frequency,
    startTime,
    duration,
    volume = 0.1,
    type = "sine"
) {

    const ctx = getAudioContext();

    if (!ctx) {
        return;
    }

    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    oscillator.type = type;

    oscillator.frequency.setValueAtTime(
        frequency,
        startTime
    );

    gain.gain.setValueAtTime(
        0.001,
        startTime
    );

    gain.gain.exponentialRampToValueAtTime(
        volume,
        startTime + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + duration
    );

    oscillator.connect(gain);

    gain.connect(
        ctx.destination
    );

    oscillator.start(
        startTime
    );

    oscillator.stop(
        startTime + duration
    );
}


function playSound(type) {

    const ctx =
        getAudioContext();

    if (!ctx) {
        return;
    }

    const now =
        ctx.currentTime;


    if (type === "navigation") {

        makeTone(
            700,
            now,
            0.06,
            0.05
        );
    }


    else if (type === "add") {

        makeTone(
            650,
            now,
            0.08,
            0.09
        );

        makeTone(
            900,
            now + 0.09,
            0.10,
            0.10
        );
    }


    else if (type === "save") {

        makeTone(
            600,
            now,
            0.10,
            0.09
        );

        makeTone(
            800,
            now + 0.10,
            0.10,
            0.10
        );

        makeTone(
            1000,
            now + 0.20,
            0.14,
            0.12
        );
    }


    else if (type === "star") {

        makeTone(
            900,
            now,
            0.08,
            0.10
        );

        makeTone(
            1200,
            now + 0.08,
            0.12,
            0.12
        );
    }


    else if (type === "unstar") {

        makeTone(
            850,
            now,
            0.08,
            0.08
        );

        makeTone(
            600,
            now + 0.08,
            0.12,
            0.08
        );
    }


    else if (type === "edit") {

        makeTone(
            700,
            now,
            0.07,
            0.08
        );

        makeTone(
            850,
            now + 0.09,
            0.07,
            0.08
        );
    }


    else if (type === "update") {

        makeTone(
            700,
            now,
            0.08,
            0.10
        );

        makeTone(
            950,
            now + 0.10,
            0.12,
            0.12
        );
    }


    else if (type === "complete") {

        makeTone(
            1000,
            now,
            0.10,
            0.12
        );

        makeTone(
            800,
            now + 0.10,
            0.10,
            0.10
        );

        makeTone(
            600,
            now + 0.20,
            0.14,
            0.08
        );
    }


    else if (type === "restore") {

        makeTone(
            600,
            now,
            0.10,
            0.09
        );

        makeTone(
            800,
            now + 0.10,
            0.10,
            0.10
        );

        makeTone(
            1000,
            now + 0.20,
            0.14,
            0.12
        );
    }


    else if (type === "delete") {

        makeTone(
            500,
            now,
            0.12,
            0.10,
            "triangle"
        );

        makeTone(
            300,
            now + 0.13,
            0.18,
            0.08,
            "triangle"
        );
    }


    else if (type === "cancel") {

        makeTone(
            450,
            now,
            0.08,
            0.06
        );
    }


    else if (type === "reminder") {

        makeTone(
            880,
            now,
            0.18,
            0.18
        );

        makeTone(
            660,
            now + 0.22,
            0.18,
            0.16
        );

        makeTone(
            880,
            now + 0.44,
            0.18,
            0.18
        );

        makeTone(
            660,
            now + 0.66,
            0.18,
            0.16
        );

        makeTone(
            880,
            now + 0.88,
            0.25,
            0.20
        );
    }
}


// =====================================================
// CLOSE FORM
// =====================================================

function closeForm() {

    document.querySelector(".con1").innerHTML = "";

    document.querySelector(".con1")
        .classList.remove("style1");

    document.querySelector(".overlay")
        .classList.remove("overlay1");
}


// =====================================================
// SAVE
// =====================================================

function savetask() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    localStorage.setItem(
        "todotasks",
        todo.innerHTML
    );

    localStorage.setItem(
        "startask",
        starred.innerHTML
    );
}


// =====================================================
// EMPTY MESSAGE
// =====================================================

function showEmptyMessage(
    icon,
    message
) {

    const saving =
        getSaving();

    saving.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <h3 class="default">
            ${escapeHTML(message)}
        </h3>
    `;

    saving.classList.add(
        "savingStyle"
    );
}


function hideEmptyMessage() {

    const saving =
        getSaving();

    saving.innerHTML = "";

    saving.classList.remove(
        "savingStyle"
    );
}


// =====================================================
// IN-APP NOTIFICATION
// =====================================================

function showNotification(
    title,
    message
) {

    let box =
        document.querySelector(
            ".taskNotification"
        );

    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.className =
            "taskNotification";

        document.body.appendChild(
            box
        );
    }

    box.innerHTML = `

        <div class="notificationIcon">
            <i class="fa-solid fa-bell"></i>
        </div>

        <div class="notificationContent">

            <strong>
                ${escapeHTML(title)}
            </strong>

            <span>
                ${escapeHTML(message)}
            </span>

        </div>

        <button
            class="notificationClose"
            type="button"
        >
            ×
        </button>
    `;

    box.classList.add(
        "notificationShow"
    );

    box.querySelector(
        ".notificationClose"
    ).onclick = function () {

        box.classList.remove(
            "notificationShow"
        );
    };

    setTimeout(() => {

        box.classList.remove(
            "notificationShow"
        );

    }, 8000);
}


// =====================================================
// BROWSER NOTIFICATION
// =====================================================

function requestNotificationPermission() {

    if (
        !("Notification" in window)
    ) {
        return;
    }

    if (
        Notification.permission ===
        "default"
    ) {

        Notification.requestPermission();
    }
}


function sendBrowserNotification(
    taskText,
    date,
    time
) {

    if (
        !("Notification" in window)
    ) {
        return;
    }

    if (
        Notification.permission !==
        "granted"
    ) {
        return;
    }

    new Notification(
        "Regular Task Reminder",
        {
            body:
                `${taskText}\nReminder: ${date} ${time}`,

            icon:
                `${window.location.origin}/ico.png`
        }
    );
}


// =====================================================
// REMINDER ID
// =====================================================

function getReminderId(task) {

    const text =
        task.querySelector(".l1")
            ?.innerText || "";

    const date =
        task.querySelector(".l3")
            ?.innerText
            .replace(
                "Date:",
                ""
            )
            .trim() || "";

    const time =
        task.querySelector(".l4")
            ?.innerText
            .replace(
                "Time:",
                ""
            )
            .trim() || "";

    return `${text}|${date}|${time}`;
}


// =====================================================
// REMINDER CHECKER
// =====================================================

function checkReminders() {

    const now =
        new Date();

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

        const dateElement =
            task.querySelector(".l3");

        const timeElement =
            task.querySelector(".l4");

        if (
            !dateElement ||
            !timeElement
        ) {
            return;
        }

        const date =
            dateElement.innerText
                .replace(
                    "Date:",
                    ""
                )
                .trim();

        const time =
            timeElement.innerText
                .replace(
                    "Time:",
                    ""
                )
                .trim();

        const taskText =
            task.querySelector(".l1")
                ?.innerText ||
            "Task";

        const reminderTime =
            new Date(
                `${date}T${time}`
            );

        if (
            Number.isNaN(
                reminderTime.getTime()
            )
        ) {
            return;
        }

        const reminderId =
            getReminderId(task);

        if (
            now.getTime() >=
            reminderTime.getTime()
            &&
            !notified.includes(
                reminderId
            )
        ) {

            notified.push(
                reminderId
            );

            localStorage.setItem(
                "notifiedReminders",
                JSON.stringify(
                    notified
                )
            );

            playSound(
                "reminder"
            );

            showNotification(
                "Task Reminder",
                `${taskText} — ${time}`
            );

            sendBrowserNotification(
                taskText,
                date,
                time
            );
        }
    });
}


function startReminderChecker() {

    if (reminderTimer) {

        clearInterval(
            reminderTimer
        );
    }

    checkReminders();

    reminderTimer =
        setInterval(
            checkReminders,
            1000
        );
}


// =====================================================
// NAVIGATION
// =====================================================

function addNavigationEvents() {

    const home =
        document.querySelector(".btn1");

    const starred =
        document.querySelector(".btn2");

    const add =
        document.querySelector(".btn3");

    const trash =
        document.querySelector(".btn4");

    const about =
        document.querySelector(".btn5");

    const today =
        document.querySelector(".btn6");

    const sort =
        document.querySelector(".btn7");

    const reminders =
        document.querySelector(".btn8");

    const plus =
        document.querySelector(".disl");


    home.onclick = function () {

        playSound(
            "navigation"
        );

        showHome();

        plus.style.pointerEvents =
            "auto";

        plus.style.opacity =
            "1";
    };


    starred.onclick = function () {

        playSound(
            "navigation"
        );

        showStarred();

        plus.style.pointerEvents =
            "none";

        plus.style.opacity =
            "0.5";
    };


    add.onclick = function () {

        playSound(
            "add"
        );

        requestNotificationPermission();

        addchecks();
    };


    trash.onclick = function () {

        playSound(
            "navigation"
        );

        showTrash();

        plus.style.pointerEvents =
            "none";

        plus.style.opacity =
            "0.5";
    };


    about.onclick = function () {

        playSound(
            "navigation"
        );

        showAbout();

        plus.style.pointerEvents =
            "none";

        plus.style.opacity =
            "0.5";
    };


    today.onclick = function () {

        playSound(
            "navigation"
        );

        showToday();

        plus.style.pointerEvents =
            "none";

        plus.style.opacity =
            "0.5";
    };


    sort.onclick = function () {

        playSound(
            "navigation"
        );

        sortTasks();

        plus.style.pointerEvents =
            "auto";

        plus.style.opacity =
            "1";
    };


    reminders.onclick = function () {

        playSound(
            "navigation"
        );

        showReminders();

        plus.style.pointerEvents =
            "none";

        plus.style.opacity =
            "0.5";
    };
}


// =====================================================
// HOME
// =====================================================

function showHome() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    currentView =
        "home";

    todo.style.display =
        "flex";

    starred.style.display =
        "none";

    todo.querySelectorAll(
        ".form-check"
    ).forEach(task => {

        task.style.display =
            "block";
    });

    hideEmptyMessage();

    if (
        todo.children.length ===
        0
    ) {

        showEmptyMessage(
            "fa-book-open",
            "No Tasks Added"
        );
    }

    addStarEvents();
    addCheckBoxEvent();
    addEditEvents();
}


// =====================================================
// STARRED
// =====================================================

function showStarred() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    currentView =
        "starred";

    todo.style.display =
        "none";

    starred.style.display =
        "flex";

    hideEmptyMessage();

    if (
        starred.children.length ===
        0
    ) {

        showEmptyMessage(
            "fa-star",
            "No Starred Tasks"
        );
    }

    addStarEvents();
    addCheckBoxEvent();
    addEditEvents();
}


// =====================================================
// TRASH
// =====================================================

function showTrash() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    todo.style.display =
        "flex";

    starred.style.display =
        "none";

    currentView =
        "trash";

    const trash =
        localStorage.getItem(
            "trashtasks"
        );

    todo.innerHTML =
        "";

    if (!trash) {

        showEmptyMessage(
            "fa-trash",
            "Trash is Empty"
        );

        return;
    }

    todo.innerHTML =
        trash;

    hideEmptyMessage();

    prepareTrashTasks();

    addTrashEvents();
}


// =====================================================
// ABOUT
// =====================================================

function showAbout() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    const saving =
        getSaving();

    todo.style.display =
        "none";

    starred.style.display =
        "none";

    currentView =
        "about";

    saving.innerHTML = `

        <div class="aboutBox">

            <i
                class="fa-solid fa-circle-info"
            ></i>

            <h2>
                Regular Task
            </h2>

            <p>
                A simple task management
                application.
            </p>

            <p>
                Add tasks, set reminders,
                star important tasks,
                edit tasks and manage
                completed tasks.
            </p>

            <p>
                Your tasks are stored locally
                in your browser.
            </p>

        </div>
    `;

    saving.classList.add(
        "savingStyle"
    );
}


// =====================================================
// TODAY'S TASK
// =====================================================

function showToday() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    todo.style.display =
        "flex";

    starred.style.display =
        "none";

    currentView =
        "today";

    const today =
        new Date();

    const currentDate =
        today.getFullYear() +
        "-" +
        String(
            today.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            today.getDate()
        ).padStart(2, "0");

    let found =
        false;

    todo.querySelectorAll(
        ".form-check"
    ).forEach(task => {

        const dateElement =
            task.querySelector(
                ".l3"
            );

        if (!dateElement) {

            task.style.display =
                "none";

            return;
        }

        const taskDate =
            dateElement.innerText
                .replace(
                    "Date:",
                    ""
                )
                .trim();

        if (
            taskDate ===
            currentDate
        ) {

            task.style.display =
                "block";

            found =
                true;

        } else {

            task.style.display =
                "none";
        }
    });

    if (found) {

        hideEmptyMessage();

    } else {

        showEmptyMessage(
            "fa-list-check",
            "No Today's Tasks"
        );
    }
}


// =====================================================
// SORT
// =====================================================

function sortTasks() {

    const todo =
        getTodo();

    todo.style.display =
        "flex";

    getStarred().style.display =
        "none";

    currentView =
        "home";

    const tasks =
        Array.from(
            todo.querySelectorAll(
                ".form-check"
            )
        );

    tasks.sort((a, b) => {

        const dateA =
            a.querySelector(".l3")
                ?.innerText
                .replace(
                    "Date:",
                    ""
                )
                .trim() || "";

        const timeA =
            a.querySelector(".l4")
                ?.innerText
                .replace(
                    "Time:",
                    ""
                )
                .trim() || "";

        const dateB =
            b.querySelector(".l3")
                ?.innerText
                .replace(
                    "Date:",
                    ""
                )
                .trim() || "";

        const timeB =
            b.querySelector(".l4")
                ?.innerText
                .replace(
                    "Time:",
                    ""
                )
                .trim() || "";

        return (
            new Date(
                `${dateA}T${timeA}`
            ) -
            new Date(
                `${dateB}T${timeB}`
            )
        );
    });

    tasks.forEach(task => {

        task.style.display =
            "block";

        todo.appendChild(
            task
        );
    });

    savetask();

    hideEmptyMessage();

    addStarEvents();
    addCheckBoxEvent();
    addEditEvents();
}


// =====================================================
// REMINDERS VIEW
// =====================================================

function showReminders() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    todo.style.display =
        "flex";

    starred.style.display =
        "none";

    currentView =
        "reminders";

    const now =
        new Date();

    let found =
        false;

    todo.querySelectorAll(
        ".form-check"
    ).forEach(task => {

        const dateElement =
            task.querySelector(
                ".l3"
            );

        const timeElement =
            task.querySelector(
                ".l4"
            );

        if (
            !dateElement ||
            !timeElement
        ) {

            task.style.display =
                "none";

            return;
        }

        const date =
            dateElement.innerText
                .replace(
                    "Date:",
                    ""
                )
                .trim();

        const time =
            timeElement.innerText
                .replace(
                    "Time:",
                    ""
                )
                .trim();

        const reminder =
            new Date(
                `${date}T${time}`
            );

        if (
            reminder >= now
        ) {

            task.style.display =
                "block";

            found =
                true;

        } else {

            task.style.display =
                "none";
        }
    });

    if (found) {

        hideEmptyMessage();

    } else {

        showEmptyMessage(
            "fa-calendar-days",
            "No Upcoming Reminders"
        );
    }
}


// =====================================================
// LOAD TASKS
// =====================================================

function loadtask() {

    const todo =
        getTodo();

    const starred =
        getStarred();

    const saved =
        localStorage.getItem(
            "todotasks"
        );

    const savedStar =
        localStorage.getItem(
            "startask"
        );

    if (saved) {

        todo.innerHTML =
            saved;
    }

    if (savedStar) {

        starred.innerHTML =
            savedStar;
    }

    document.querySelectorAll(
        ".fa-star"
    ).forEach(star => {

        star.removeAttribute(
            "data-star-added"
        );
    });

    document.querySelectorAll(
        ".tasks"
    ).forEach(checkbox => {

        checkbox.removeAttribute(
            "data-added"
        );
    });

    document.querySelectorAll(
        ".fa-pen-to-square"
    ).forEach(edit => {

        edit.removeAttribute(
            "data-edit-added"
        );
    });

    addStarEvents();
    addCheckBoxEvent();
    addEditEvents();

    if (
        !saved &&
        !savedStar
    ) {

        todo.innerHTML =
            "";

        todo.style.display =
            "none";

        showEmptyMessage(
            "fa-book-open",
            "No Tasks Added"
        );

    } else {

        hideEmptyMessage();
    }

    showHome();
}


// =====================================================
// STAR EVENTS
// =====================================================

function addStarEvents() {

    const todo =
        getTodo();

    const starredContainer =
        getStarred();

    const stars =
        document.querySelectorAll(
            ".form-check .fa-star"
        );

    stars.forEach(star => {

        if (
            star.hasAttribute(
                "data-star-added"
            )
        ) {

            return;
        }

        star.setAttribute(
            "data-star-added",
            "true"
        );

        star.addEventListener(
            "click",
            function () {

                const task =
                    star.closest(
                        ".form-check"
                    );

                if (!task) {
                    return;
                }

                if (
                    !star.classList.contains(
                        "starStyle"
                    )
                ) {

                    playSound(
                        "star"
                    );

                    star.classList.remove(
                        "fa-regular"
                    );

                    star.classList.add(
                        "fa-solid"
                    );

                    star.classList.add(
                        "starStyle"
                    );

                    starredContainer.appendChild(
                        task
                    );

                } else {

                    playSound(
                        "unstar"
                    );

                    star.classList.remove(
                        "fa-solid"
                    );

                    star.classList.remove(
                        "starStyle"
                    );

                    star.classList.add(
                        "fa-regular"
                    );

                    todo.appendChild(
                        task
                    );
                }

                savetask();

                addStarEvents();
                addCheckBoxEvent();
                addEditEvents();
            }
        );
    });
}


// =====================================================
// CHECKBOX / COMPLETE
// =====================================================

function addCheckBoxEvent() {

    const checkboxes =
        document.querySelectorAll(
            ".tasks"
        );

    checkboxes.forEach(checkbox => {

        if (
            checkbox.hasAttribute(
                "data-added"
            )
        ) {

            return;
        }

        checkbox.setAttribute(
            "data-added",
            "true"
        );

        checkbox.addEventListener(
            "change",
            function (e) {

                if (
                    !e.target.checked
                ) {
                    return;
                }

                playSound(
                    "complete"
                );

                const task =
                    e.target.closest(
                        ".form-check"
                    );

                if (!task) {
                    return;
                }

                const trash =
                    localStorage.getItem(
                        "trashtasks"
                    ) || "";

                const container =
                    document.createElement(
                        "div"
                    );

                container.innerHTML =
                    trash;

                const trashTask =
                    task.cloneNode(
                        true
                    );

                const trashCheckbox =
                    trashTask.querySelector(
                        ".tasks"
                    );

                if (trashCheckbox) {

                    trashCheckbox.checked =
                        true;

                    trashCheckbox.disabled =
                        true;
                }

                trashTask
                    .querySelectorAll(
                        ".fa-star"
                    )
                    .forEach(star => {

                        star.removeAttribute(
                            "data-star-added"
                        );
                    });

                trashTask
                    .querySelectorAll(
                        ".tasks"
                    )
                    .forEach(box => {

                        box.removeAttribute(
                            "data-added"
                        );
                    });

                trashTask
                    .querySelectorAll(
                        ".fa-pen-to-square"
                    )
                    .forEach(edit => {

                        edit.removeAttribute(
                            "data-edit-added"
                        );
                    });

                container.appendChild(
                    trashTask
                );

                localStorage.setItem(
                    "trashtasks",
                    container.innerHTML
                );

                task.remove();

                savetask();

                const message =
                    document.querySelector(
                        ".Message1"
                    );

                const undo =
                    document.querySelector(
                        ".btn-link"
                    );

                message.classList.add(
                    "show"
                );

                undo.onclick =
                    function () {

                        const currentTrash =
                            localStorage.getItem(
                                "trashtasks"
                            ) || "";

                        const trashContainer =
                            document.createElement(
                                "div"
                            );

                        trashContainer.innerHTML =
                            currentTrash;

                        const originalText =
                            task.querySelector(
                                ".l1"
                            )?.innerText;

                        trashContainer
                            .querySelectorAll(
                                ".form-check"
                            )
                            .forEach(item => {

                                if (
                                    item.querySelector(
                                        ".l1"
                                    )?.innerText ===
                                    originalText
                                ) {

                                    item.remove();
                                }
                            });

                        localStorage.setItem(
                            "trashtasks",
                            trashContainer.innerHTML
                        );

                        const originalCheckbox =
                            task.querySelector(
                                ".tasks"
                            );

                        if (
                            originalCheckbox
                        ) {

                            originalCheckbox.checked =
                                false;

                            originalCheckbox.disabled =
                                false;
                        }

                        getTodo().prepend(
                            task
                        );

                        hideEmptyMessage();

                        savetask();

                        addStarEvents();
                        addCheckBoxEvent();
                        addEditEvents();

                        message.classList.remove(
                            "show"
                        );
                    };

                setTimeout(
                    function () {

                        message.classList.remove(
                            "show"
                        );

                    },
                    5000
                );

                if (
                    getTodo().children.length ===
                    0
                ) {

                    showEmptyMessage(
                        "fa-book-open",
                        "No Tasks Added"
                    );
                }
            }
        );
    });
}


// =====================================================
// EDIT EVENTS
// =====================================================

function addEditEvents() {

    const editButtons =
        document.querySelectorAll(
            ".fa-pen-to-square"
        );

    editButtons.forEach(edit => {

        if (
            edit.hasAttribute(
                "data-edit-added"
            )
        ) {

            return;
        }

        edit.setAttribute(
            "data-edit-added",
            "true"
        );

        edit.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                playSound(
                    "edit"
                );

                const task =
                    edit.closest(
                        ".form-check"
                    );

                if (!task) {
                    return;
                }

                openEditForm(
                    task
                );
            }
        );
    });
}


// =====================================================
// EDIT FORM
// =====================================================

function openEditForm(
    taskElement
) {

    const form =
        document.querySelector(
            ".con1"
        );

    const overlay =
        document.querySelector(
            ".overlay"
        );

    const oldTask =
        taskElement.querySelector(
            ".l1"
        )?.innerText || "";

    const oldDate =
        taskElement.querySelector(
            ".l3"
        )?.innerText
            .replace(
                "Date:",
                ""
            )
            .trim() || "";

    const oldTime =
        taskElement.querySelector(
            ".l4"
        )?.innerText
            .replace(
                "Time:",
                ""
            )
            .trim() || "";

    const oldType =
        taskElement.querySelector(
            ".feature"
        )?.innerText || "";

    const oldReminderId =
        getReminderId(
            taskElement
        );

    overlay.classList.add(
        "overlay1"
    );

    form.classList.add(
        "style1"
    );

    form.innerHTML = `

        <form class="form1">

            <div class="ip1">

                <a>
                    What is your task?
                </a>

                <textarea
                    class="ip20"
                >${escapeHTML(
                    oldTask
                )}</textarea>

            </div>


            <div class="ip1">

                <a>
                    Pick remainder date
                    and time
                </a>

                <input
                    type="datetime-local"
                    class="ip21"
                    value="${oldDate}T${oldTime}"
                />

            </div>


            <div class="ip1">

                <a>
                    Enter task type
                </a>

                <input
                    type="text"
                    class="ip22"
                    value="${escapeHTML(
                        oldType
                    )}"
                />

            </div>


            <div class="buttons">

                <button
                    type="button"
                    class="btn btn-danger editCancel"
                >
                    Cancel
                </button>


                <button
                    type="button"
                    class="btn btn-primary editUpdate"
                >
                    Update Task
                </button>

            </div>

        </form>
    `;

    form.querySelector(
        ".editCancel"
    ).onclick =
        function () {

            playSound(
                "cancel"
            );

            closeForm();
        };


    form.querySelector(
        ".editUpdate"
    ).onclick =
        function () {

            const newTask =
                form.querySelector(
                    ".ip20"
                ).value.trim();

            const newDate =
                form.querySelector(
                    ".ip21"
                ).value;

            const newType =
                form.querySelector(
                    ".ip22"
                ).value.trim();

            if (
                newTask === "" ||
                newDate === "" ||
                newType === ""
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;
            }

            const datetime =
                newDate.split(
                    "T"
                );

            const dateObject =
                new Date(
                    datetime[0]
                );

            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];

            const day =
                days[
                    dateObject.getDay()
                ];

            taskElement.querySelector(
                ".l1"
            ).innerText =
                newTask;

            taskElement.querySelector(
                ".l2"
            ).innerText =
                `Day:${day}`;

            taskElement.querySelector(
                ".l3"
            ).innerText =
                `Date:${datetime[0]}`;

            taskElement.querySelector(
                ".l4"
            ).innerText =
                `Time:${datetime[1]}`;

            taskElement.querySelector(
                ".feature"
            ).innerText =
                newType;

            let notified =
                JSON.parse(
                    localStorage.getItem(
                        "notifiedReminders"
                    ) || "[]"
                );

            notified =
                notified.filter(
                    id =>
                        id !==
                        oldReminderId
                );

            localStorage.setItem(
                "notifiedReminders",
                JSON.stringify(
                    notified
                )
            );

            savetask();

            playSound(
                "update"
            );

            closeForm();

            addStarEvents();
            addCheckBoxEvent();
            addEditEvents();

            showNotification(
                "Task Updated",
                "Your task was successfully updated."
            );
        };
}


// =====================================================
// ADD TASK
// =====================================================

function addchecks() {

    requestNotificationPermission();

    const data =
        getTodo();

    const form =
        document.querySelector(
            ".con1"
        );

    const overlay =
        document.querySelector(
            ".overlay"
        );

    overlay.classList.add(
        "overlay1"
    );

    form.classList.add(
        "style1"
    );

    form.innerHTML = `

        <form class="form1">

            <div class="ip1">

                <a>
                    What is your task?
                </a>

                <textarea
                    placeholder="Enter task here"
                    class="ip20"
                ></textarea>

            </div>


            <div class="ip1">

                <a>
                    Pick remainder date
                    and time
                </a>

                <input
                    type="datetime-local"
                    class="ip21"
                />

            </div>


            <div class="ip1">

                <a>
                    Enter task type
                </a>

                <input
                    type="text"
                    placeholder="Enter here"
                    class="ip22"
                />

            </div>


            <div class="buttons">

                <button
                    type="button"
                    class="btn btn-danger"
                    id="cancelTask"
                >
                    Cancel
                </button>


                <button
                    type="button"
                    class="btn btn-primary"
                    id="saveTask"
                >
                    Save Task
                </button>

            </div>

        </form>
    `;

    form.querySelector(
        "#cancelTask"
    ).onclick =
        function () {

            playSound(
                "cancel"
            );

            closeForm();
        };


    form.querySelector(
        "#saveTask"
    ).onclick =
        function () {

            const task =
                form.querySelector(
                    ".ip20"
                ).value.trim();

            const date =
                form.querySelector(
                    ".ip21"
                ).value;

            const type =
                form.querySelector(
                    ".ip22"
                ).value.trim();

            if (
                task === "" ||
                date === "" ||
                type === ""
            ) {

                alert(
                    "Please fill all the fields."
                );

                return;
            }

            const datetime =
                date.split(
                    "T"
                );

            const dateObject =
                new Date(
                    datetime[0]
                );

            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];

            const day =
                days[
                    dateObject.getDay()
                ];

            data.insertAdjacentHTML(
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
                            ${escapeHTML(task)}
                        </label>


                        <hr>


                        <label
                            class="form-check-label l2"
                        >
                            Day:${day}
                        </label>


                        <br>


                        <label
                            class="form-check-label l3"
                        >
                            Date:${datetime[0]}
                        </label>


                        <br>


                        <label
                            class="form-check-label l4"
                        >
                            Time:${datetime[1]}
                        </label>


                        <div class="extra">

                            <button
                                type="button"
                                class="feature"
                            >
                                ${escapeHTML(type)}
                            </button>


                            <div class="extra1">

                                <i
                                    class="fa-regular fa-star"
                                ></i>

                            </div>


                            <div class="extra2">

                                <i
                                    class="fa-regular fa-pen-to-square"
                                ></i>

                            </div>

                        </div>

                    </div>

                </div>
                `
            );

            savetask();

            hideEmptyMessage();

            closeForm();

            playSound(
                "save"
            );

            addStarEvents();
            addCheckBoxEvent();
            addEditEvents();

            showHome();

            showNotification(
                "Task Added",
                "Your new task has been saved."
            );
        };
}


// =====================================================
// TRASH PREPARATION
// =====================================================

function prepareTrashTasks() {

    const trash =
        localStorage.getItem(
            "trashtasks"
        );

    if (!trash) {
        return;
    }

    const container =
        document.createElement(
            "div"
        );

    container.innerHTML =
        trash;

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

        const buttons =
            document.createElement(
                "div"
            );

        buttons.className =
            "trashButtons";

        buttons.innerHTML = `

            <button
                type="button"
                class="restoreTask btn btn-success btn-sm"
            >
                <i
                    class="fa-solid fa-rotate-left"
                ></i>

                Restore
            </button>


            <button
                type="button"
                class="deleteTask btn btn-danger btn-sm"
            >
                <i
                    class="fa-solid fa-trash"
                ></i>

                Delete
            </button>

        `;

        task.appendChild(
            buttons
        );
    });

    localStorage.setItem(
        "trashtasks",
        container.innerHTML
    );
}


// =====================================================
// TRASH EVENTS
// =====================================================

function addTrashEvents() {

    const todo =
        getTodo();


    todo.querySelectorAll(
        ".restoreTask"
    ).forEach(button => {

        if (
            button.hasAttribute(
                "data-added"
            )
        ) {
            return;
        }

        button.setAttribute(
            "data-added",
            "true"
        );

        button.onclick =
            function () {

                playSound(
                    "restore"
                );

                const task =
                    button.closest(
                        ".form-check"
                    );

                if (!task) {
                    return;
                }

                const trash =
                    localStorage.getItem(
                        "trashtasks"
                    ) || "";

                const container =
                    document.createElement(
                        "div"
                    );

                container.innerHTML =
                    trash;

                const taskText =
                    task.querySelector(
                        ".l1"
                    )?.innerText;

                container.querySelectorAll(
                    ".form-check"
                ).forEach(item => {

                    if (
                        item.querySelector(
                            ".l1"
                        )?.innerText ===
                        taskText
                    ) {

                        item.remove();
                    }
                });

                localStorage.setItem(
                    "trashtasks",
                    container.innerHTML
                );

                const checkbox =
                    task.querySelector(
                        ".tasks"
                    );

                if (checkbox) {

                    checkbox.checked =
                        false;

                    checkbox.disabled =
                        false;
                }

                task.querySelector(
                    ".trashButtons"
                )?.remove();

                getTodo().appendChild(
                    task
                );

                savetask();

                hideEmptyMessage();

                addStarEvents();
                addCheckBoxEvent();
                addEditEvents();

                showNotification(
                    "Task Restored",
                    "The task has been restored."
                );

                if (
                    getTodo().children.length ===
                    0
                ) {

                    showEmptyMessage(
                        "fa-trash",
                        "Trash is Empty"
                    );
                }
            };
    });


    todo.querySelectorAll(
        ".deleteTask"
    ).forEach(button => {

        if (
            button.hasAttribute(
                "data-added"
            )
        ) {
            return;
        }

        button.setAttribute(
            "data-added",
            "true"
        );

        button.onclick =
            function () {

                playSound(
                    "delete"
                );

                const task =
                    button.closest(
                        ".form-check"
                    );

                if (!task) {
                    return;
                }

                task.remove();

                localStorage.setItem(
                    "trashtasks",
                    todo.innerHTML
                );

                showNotification(
                    "Task Deleted",
                    "The task was permanently deleted."
                );

                if (
                    todo.children.length ===
                    0
                ) {

                    showEmptyMessage(
                        "fa-trash",
                        "Trash is Empty"
                    );
                }
            };
    });
}


// =====================================================
// APP
// =====================================================

function App() {

    useEffect(() => {

        loadtask();

        prepareTrashTasks();

        addNavigationEvents();

        startReminderChecker();

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
                        Regular Task
                    </label>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar"
                        aria-controls="offcanvasDarkNavbar"
                    >

                        <span
                            className="navbar-toggler-icon"
                        ></span>

                    </button>


                    <div
                        className="offcanvas offcanvas-end text-bg-dark"
                        tabIndex="-1"
                        id="offcanvasDarkNavbar"
                    >

                        <div
                            className="offcanvas-header"
                        >

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

                                        <i
                                            className="fa-solid fa-plus"
                                        ></i>

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

                                        <i
                                            className="fa-solid fa-recycle"
                                        ></i>

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

                                        <i
                                            className="fa-solid fa-circle-info"
                                        ></i>

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

                                        <i
                                            className="fa-solid fa-list-check"
                                        ></i>

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

                                        <i
                                            className="fa-solid fa-arrow-up-wide-short"
                                        ></i>

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

                                        <i
                                            className="fa-solid fa-calendar-days"
                                        ></i>

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
                    onClick={() => {

                        playSound(
                            "add"
                        );

                        requestNotificationPermission();

                        addchecks();
                    }}
                ></i>

            </div>


            <div
                className="saving savingStyle"
            >

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
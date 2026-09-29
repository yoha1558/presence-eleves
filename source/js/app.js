import {
    initDB,
    saveAttendance,
    getAllAttendances
}
from "./db.js";

import {
    exportAttendance
}
from "./excel.js";

let students = [];
let sessions = [];

const STATUS = [
    "P",
    "A",
    "R",
    "E"
];

const LABELS = {

    P: "✅ Présent",
    A: "❌ Absent",
    R: "⏰ Retard",
    E: "📝 Excusé"

};

async function loadData() {

    students =
        await fetch(
            "./data/students.json"
        ).then(r => r.json());

    sessions =
        await fetch(
            "./data/sessions.json"
        ).then(r => r.json());
}

function buildDates() {

    const select =
        document.getElementById(
            "sessionDate"
        );

    select.innerHTML = "";

    sessions.forEach(date => {

        const option =
            document.createElement(
                "option"
            );

        option.value = date;
        option.textContent = date;

        select.appendChild(
            option
        );

    });
}

function createStudentCard(
    student
) {

    const div =
        document.createElement(
            "div"
        );

    div.className = "student";

    const label =
        document.createElement(
            "span"
        );

    label.textContent =
        `${student.nom} ${student.prenom}`;

    const button =
        document.createElement(
            "button"
        );

    button.dataset.status = "P";

    button.textContent =
        LABELS.P;

    button.addEventListener(
        "click",
        () => {

            let index =
                STATUS.indexOf(
                    button.dataset.status
                );

            index =
                (index + 1)
                %
                STATUS.length;

            const value =
                STATUS[index];

            button.dataset.status =
                value;

            button.textContent =
                LABELS[value];

        }
    );

    div.appendChild(label);

    div.appendChild(button);

    return div;
}

function renderStudents() {

    const container =
        document.getElementById(
            "students"
        );

    container.innerHTML = "";

    students.forEach(student => {

        container.appendChild(
            createStudentCard(
                student
            )
        );

    });
}

async function saveCurrentSession() {

    const date =
        document.getElementById(
            "sessionDate"
        ).value;

    const rows =
        document.querySelectorAll(
            ".student"
        );

    for (
        let i = 0;
        i < rows.length;
        i++
    ) {

        const student =
            students[i];

        const status =
            rows[i]
            .querySelector(
                "button"
            )
            .dataset.status;

        await saveAttendance({

            date,

            studentId:
                student.id,

            studentName:
                `${student.nom} ${student.prenom}`,

            status

        });

    }

    alert(
        "Présences enregistrées"
    );
}

async function exportCurrent() {

    const data =
        await getAllAttendances();

    exportAttendance(
        data
    );
}

async function start() {

    await initDB();

    await loadData();

    buildDates();

    renderStudents();

    document
        .getElementById(
            "saveBtn"
        )
        .addEventListener(
            "click",
            saveCurrentSession
        );

    const exportBtn =
        document.getElementById(
            "exportBtn"
        );

    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            exportCurrent
        );

    }

}

start();
// AMBIL ELEMEN DOM
const inputTask = document.querySelector('.input-text');
const inputDate = document.querySelector('.input-date');
const addBtn = document.querySelector('.add-btn');
const filterBtn = document.querySelector('.filter-btn');
const deleteBtn = document.querySelector('.delete-btn');
const mainCard = document.querySelector('.main-card');

// CONTAINER TASK
let taskList = document.querySelector('.task-list');
if (!taskList) {
    taskList = document.createElement('div');
    taskList.className = 'task-list';
    mainCard.appendChild(taskList);
}

// DATA HISTORY
let taskHistory = [];

// ==========================
// TAMBAH TASK
// ==========================
function addTask() {
    const taskValue = inputTask.value.trim();
    const dateValue = inputDate.value;

    // VALIDASI
    if (taskValue === "" || dateValue === "") {
        alert("Task dan tanggal wajib diisi");
        return;
    }

    // SIMPAN KE HISTORY
    const taskData = {
        task: taskValue,
        dueDate: dateValue,
        status: "Pending",
        createdAt: new Date().toLocaleString()
    };
    taskHistory.push(taskData);

    console.log("Data todo saat ini:");
    console.table(taskHistory);

    // BUAT ROW
    const row = document.createElement('div');
    row.className = 'task-row';
    row.innerHTML = `
        <span class="col-task">${taskValue}</span>
        <span class="col-date">${dateValue}</span>
        <span class="col-status">Pending</span>
        <div class="col-action">
            <button class="btn-delete">X</button>
        </div>
    `;
    taskList.appendChild(row);

    // RESET INPUT
    inputTask.value = "";
    inputDate.value = "";

    // HAPUS PER ITEM
    row.querySelector('.btn-delete').onclick = () => {
        taskHistory = taskHistory.filter(
            item => !(item.task === taskValue && item.dueDate === dateValue)
        );
        row.remove();
        console.table(taskHistory);
    };

    // TOGGLE STATUS
    const statusSpan = row.querySelector('.col-status');
    statusSpan.style.cursor = "pointer";

    statusSpan.onclick = () => {
        const item = taskHistory.find(
            t => t.task === taskValue && t.dueDate === dateValue
        );

        if (statusSpan.innerText === "Pending") {
            statusSpan.innerText = "Completed";
            statusSpan.style.color = "#00ffa2";
            if (item) item.status = "Completed";
        } else {
            statusSpan.innerText = "Pending";
            statusSpan.style.color = "";
            if (item) item.status = "Pending";
        }

        console.table(taskHistory);
    };
}

// ==========================
// DELETE ALL
// ==========================
deleteBtn.addEventListener('click', () => {
    if (taskList.children.length === 0) {
        alert("Daftar sudah kosong");
        return;
    }

    if (confirm("Hapus semua tugas?")) {
        taskList.innerHTML = "";
        taskHistory = [];
        console.clear();
    }
});

// ==========================
// FILTER DATA
// ==========================
let currentFilter = "all";

filterBtn.addEventListener('click', () => {
    const rows = document.querySelectorAll('.task-row');

    if (currentFilter === "all") currentFilter = "pending";
    else if (currentFilter === "pending") currentFilter = "completed";
    else currentFilter = "all";

    filterBtn.innerText = `FILTER: ${currentFilter.toUpperCase()}`;

    rows.forEach(row => {
        const status = row.querySelector('.col-status').innerText.toLowerCase();
        row.style.display =
            currentFilter === "all" || status === currentFilter
                ? "flex"
                : "none";
    });
});

// ==========================
// EVENT
// ==========================
addBtn.addEventListener('click', addTask);
inputTask.addEventListener('keypress', e => {
    if (e.key === "Enter") addTask();
});

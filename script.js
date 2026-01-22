const inputTask = document.querySelector('.input-text');
const inputDate = document.querySelector('.input-date');
const addBtn = document.querySelector('.add-btn');
const filterBtn = document.querySelector('.filter-btn'); // Ambil tombol filter
const deleteBtn = document.querySelector('.delete-btn'); // Ambil tombol delete all
const mainCard = document.querySelector('.main-card');

let taskList = document.querySelector('.task-list');
if (!taskList) {
    taskList = document.createElement('div');
    taskList.className = 'task-list';
    mainCard.appendChild(taskList);
}

// 1. FUNGSI TAMBAH TUGAS
function addTask() {
    const taskValue = inputTask.value;
    const dateValue = inputDate.value;

    if (taskValue.trim() === "") {
        alert("Isi tugasnya dulu!");
        return;
    }

    const row = document.createElement('div');
    row.className = 'task-row'; 

    row.innerHTML = `
        <span class="col-task">${taskValue}</span>
        <span class="col-date">${dateValue || '-'}</span>
        <span class="col-status">Pending</span>
        <div class="col-action">
            <button class="btn-delete">X</button>
        </div>
    `;

    taskList.appendChild(row);

    // Reset Input
    inputTask.value = "";
    inputDate.value = "";

    // Fungsi Hapus per baris
    row.querySelector('.btn-delete').onclick = () => row.remove();

    // Fungsi agar status bisa diklik (Pending -> Completed)
    const statusSpan = row.querySelector('.col-status');
    statusSpan.style.cursor = "pointer";
    statusSpan.onclick = function() {
        if (this.innerText === "Pending") {
            this.innerText = "Completed";
            this.style.color = "#00ffa2"; // Warna hijau neon
        } else {
            this.innerText = "Pending";
            this.style.color = ""; // Kembali ke warna semula
        }
    };
}

// 2. FUNGSI DELETE ALL
deleteBtn.addEventListener('click', () => {
    if (taskList.children.length === 0) {
        alert("Daftar sudah kosong!");
        return;
    }
    if (confirm("Hapus semua tugas?")) {
        taskList.innerHTML = "";
    }
});

// 3. FUNGSI FILTER (Siklus: Tampilkan Semua -> Pending -> Completed)
let currentFilter = "all";
filterBtn.addEventListener('click', () => {
    const rows = document.querySelectorAll('.task-row');
    
    // Ganti status filter
    if (currentFilter === "all") currentFilter = "pending";
    else if (currentFilter === "pending") currentFilter = "completed";
    else currentFilter = "all";

    filterBtn.innerText = `FILTER: ${currentFilter.toUpperCase()}`;

    rows.forEach(row => {
        const status = row.querySelector('.col-status').innerText.toLowerCase();
        if (currentFilter === "all") {
            row.style.display = "flex";
        } else if (status === currentFilter) {
            row.style.display = "flex";
        } else {
            row.style.display = "none";
        }
    });
});

// 4. EVENT LISTENER UTAMA
addBtn.addEventListener('click', addTask);
inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

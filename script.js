const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");

// Load saved jobs when page opens
document.addEventListener("DOMContentLoaded", loadJobs);

jobForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const company = document.getElementById("company").value;
    const position = document.getElementById("position").value;
    const status = document.getElementById("status").value;

    const job = {
        company,
        position,
        status
    };

    saveJob(job);
    addJobToTable(job);

    jobForm.reset();
});

function addJobToTable(job) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${job.company}</td>
        <td>${job.position}</td>
        <td>${job.status}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function () {
        row.remove();
        removeJob(job);
    });

    jobList.appendChild(row);
}

function saveJob(job) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

function loadJobs() {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.forEach(addJobToTable);
}

function removeJob(jobToDelete) {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs = jobs.filter(job =>
        job.company !== jobToDelete.company ||
        job.position !== jobToDelete.position
    );
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

let tickets = [];

let editId = null;

function addTicket() {

    let subject =
        document.getElementById("subject").value;

    let description =
        document.getElementById("description").value;

    let status =
        document.getElementById("status").value;

    let priority =
        document.getElementById("priority").value;

    let assignee =
        document.getElementById("assignee").value;

    // Validation

    if(subject.trim() === "") {

        alert("Subject is required");
        return;
    }

    if(assignee.trim() === "") {

        alert("Assignee is required");
        return;
    }

    if(editId === null) {

        let ticket = {

            id: Date.now(),

            subject,

            description,

            status,

            priority,

            assignee
        };

        tickets.push(ticket);

    } else {

        let ticket =
            tickets.find(
                t => t.id === editId
            );

        ticket.subject = subject;
        ticket.description = description;
        ticket.status = status;
        ticket.priority = priority;
        ticket.assignee = assignee;

        editId = null;
    }

    clearForm();

    displayTickets();
}

function displayTickets() {

    let table =
        document.getElementById("ticketTable");

    table.innerHTML = "";

    tickets.forEach(ticket => {

        table.innerHTML += `

        <tr>

            <td>${ticket.id}</td>

            <td>${ticket.subject}</td>

            <td>${ticket.status}</td>

            <td>${ticket.priority}</td>

            <td>${ticket.assignee}</td>

            <td>

                <button
                    class="view-btn"
                    onclick="viewTicket(${ticket.id})">

                    View

                </button>

                <button
                    class="edit-btn"
                    onclick="editTicket(${ticket.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTicket(${ticket.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;
    });
}

function viewTicket(id) {

    let ticket =
        tickets.find(
            t => t.id === id
        );

    document.getElementById(
        "ticketDetails"
    ).innerHTML = `

    <h2>Ticket Details</h2>

    <p><b>ID:</b> ${ticket.id}</p>

    <p><b>Subject:</b>
    ${ticket.subject}</p>

    <p><b>Description:</b>
    ${ticket.description}</p>

    <p><b>Status:</b>
    ${ticket.status}</p>

    <p><b>Priority:</b>
    ${ticket.priority}</p>

    <p><b>Assignee:</b>
    ${ticket.assignee}</p>

    `;
}

function editTicket(id) {

    let ticket =
        tickets.find(
            t => t.id === id
        );

    document.getElementById("subject")
        .value = ticket.subject;

    document.getElementById("description")
        .value = ticket.description;

    document.getElementById("status")
        .value = ticket.status;

    document.getElementById("priority")
        .value = ticket.priority;

    document.getElementById("assignee")
        .value = ticket.assignee;

    editId = id;
}

function deleteTicket(id) {

    if(confirm("Delete Ticket?")) {

        tickets =
            tickets.filter(
                ticket => ticket.id !== id
            );

        displayTickets();

        document.getElementById(
            "ticketDetails"
        ).innerHTML =
        "<h2>Ticket Details</h2>";
    }
}

function clearForm() {

    document.getElementById("subject")
        .value = "";

    document.getElementById("description")
        .value = "";

    document.getElementById("status")
        .value = "Open";

    document.getElementById("priority")
        .value = "High";

    document.getElementById("assignee")
        .value = "";
}
/* ========================================
   COLLEGE EVENT REGISTRATION SYSTEM
======================================== */


/* ========================================
   EVENT DATA
======================================== */

const events = [

    {
        id: 1,

        title: "AI & Machine Learning Workshop",

        category: "workshop",

        description:
            "Learn the fundamentals of Artificial Intelligence and Machine Learning through practical activities.",

        date: "10 October 2026",

        time: "10:00 AM - 1:00 PM",

        venue: "Computer Lab - Block A",

        capacity: 60,

        registered: 0
    },


    {
        id: 2,

        title: "College Hackathon 2026",

        category: "competition",

        description:
            "Build innovative solutions for real-world problems and showcase your technical skills.",

        date: "15 October 2026",

        time: "9:00 AM - 6:00 PM",

        venue: "Innovation Lab",

        capacity: 100,

        registered: 0
    },


    {
        id: 3,

        title: "Web Development Bootcamp",

        category: "technical",

        description:
            "Master HTML, CSS, JavaScript and modern responsive web development.",

        date: "18 October 2026",

        time: "11:00 AM - 3:00 PM",

        venue: "Seminar Hall",

        capacity: 70,

        registered: 0
    },


    {
        id: 4,

        title: "Annual Cultural Fest",

        category: "cultural",

        description:
            "Celebrate creativity, music, dance and talent at the annual college cultural festival.",

        date: "22 October 2026",

        time: "4:00 PM - 8:00 PM",

        venue: "College Auditorium",

        capacity: 150,

        registered: 0
    },


    {
        id: 5,

        title: "Cyber Security Awareness",

        category: "technical",

        description:
            "Understand common cyber threats and learn essential digital safety practices.",

        date: "25 October 2026",

        time: "10:30 AM - 12:30 PM",

        venue: "Seminar Hall",

        capacity: 80,

        registered: 0
    },


    {
        id: 6,

        title: "Coding Competition",

        category: "competition",

        description:
            "Test your problem-solving and programming skills in an exciting coding challenge.",

        date: "28 October 2026",

        time: "2:00 PM - 5:00 PM",

        venue: "Programming Lab",

        capacity: 50,

        registered: 0
    }

];


/* ========================================
   LOAD DATA
======================================== */

let registrations =
    JSON.parse(
        localStorage.getItem("registrations")
    ) || [];


/* ========================================
   DOM ELEMENTS
======================================== */

const eventContainer =
    document.getElementById("eventContainer");

const eventSelect =
    document.getElementById("eventSelect");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const registrationForm =
    document.getElementById("registrationForm");


/* ========================================
   DISPLAY EVENTS
======================================== */

function displayEvents(list = events) {

    eventContainer.innerHTML = "";

    if (list.length === 0) {

        document
            .getElementById("noResult")
            .style.display = "block";

        return;

    }

    document
        .getElementById("noResult")
        .style.display = "none";


    list.forEach(event => {

        const registrationsForEvent =
            registrations.filter(
                r => r.eventId === event.id
            ).length;


        const remaining =
            event.capacity -
            registrationsForEvent;


        const percentage =
            (registrationsForEvent /
                event.capacity) * 100;


        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";


        card.innerHTML = `

            <div class="event-card">

                <div class="event-icon">

                    <i class="bi bi-calendar-event"></i>

                </div>

                <span class="event-category">
                    ${event.category}
                </span>

                <h4>
                    ${event.title}
                </h4>

                <p class="event-description">
                    ${event.description}
                </p>


                <div class="event-detail">
                    <i class="bi bi-calendar3"></i>
                    ${event.date}
                </div>


                <div class="event-detail">
                    <i class="bi bi-clock"></i>
                    ${event.time}
                </div>


                <div class="event-detail">
                    <i class="bi bi-geo-alt"></i>
                    ${event.venue}
                </div>


                <div class="event-detail">
                    <i class="bi bi-people"></i>
                    ${remaining} seats available
                </div>


                <div class="seat-bar">

                    <div
                        class="seat-progress"
                        style="width:${percentage}%">
                    </div>

                </div>


                <small class="text-muted">
                    ${registrationsForEvent}
                    / ${event.capacity}
                    seats filled
                </small>


                <button
                    class="register-event-btn mt-3"
                    onclick="selectEvent(${event.id})">

                    <i class="bi bi-person-plus"></i>

                    Register Now

                </button>

            </div>
        `;


        eventContainer.appendChild(card);

    });

}


/* ========================================
   EVENT SELECT DROPDOWN
======================================== */

function loadEventOptions() {

    eventSelect.innerHTML = `
        <option value="">
            Choose an event
        </option>
    `;


    events.forEach(event => {

        const option =
            document.createElement("option");

        option.value = event.id;

        option.textContent =
            event.title;

        eventSelect.appendChild(option);

    });

}


/* ========================================
   SELECT EVENT
======================================== */

function selectEvent(id) {

    eventSelect.value = id;

    document
        .getElementById("registration")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ========================================
   REGISTRATION
======================================== */

registrationForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const eventId =
            Number(eventSelect.value);

        const studentId =
            document
                .getElementById("studentId")
                .value.trim();

        const name =
            document
                .getElementById("studentName")
                .value.trim();

        const email =
            document
                .getElementById("studentEmail")
                .value.trim();

        const department =
            document
                .getElementById("department")
                .value;


        const selectedEvent =
            events.find(
                event => event.id === eventId
            );


        if (!selectedEvent) {

            alert(
                "Please select an event."
            );

            return;
        }


        /* Check duplicate student */

        const alreadyRegistered =
            registrations.some(
                r =>
                    r.studentId === studentId &&
                    r.eventId === eventId
            );


        if (alreadyRegistered) {

            alert(
                "You are already registered for this event."
            );

            return;
        }


        /* Check capacity */

        const currentRegistrations =
            registrations.filter(
                r => r.eventId === eventId
            ).length;


        if (
            currentRegistrations >=
            selectedEvent.capacity
        ) {

            alert(
                "Sorry! This event is full."
            );

            return;
        }


        /* Generate Registration ID */

        const registrationId =
            "REG-" +
            Date.now()
                .toString()
                .slice(-6);


        const newRegistration = {

            registrationId,

            eventId,

            eventName:
                selectedEvent.title,

            date:
                selectedEvent.date,

            venue:
                selectedEvent.venue,

            studentId,

            name,

            email,

            department,

            attendance: false

        };


        registrations.push(
            newRegistration
        );


        localStorage.setItem(
            "registrations",
            JSON.stringify(registrations)
        );


        /* Success */

        showSuccess(
            registrationId,
            selectedEvent.title
        );


        /* Ticket */

        showTicket(
            newRegistration
        );


        registrationForm.reset();


        displayEvents();

        updateDashboard();

    }
);


/* ========================================
   SUCCESS MESSAGE
======================================== */

function showSuccess(
    registrationId,
    eventName
) {

    const message =
        document.getElementById(
            "successMessage"
        );


    message.innerHTML = `

        <i class="bi bi-check-circle-fill"></i>

        <strong>
            Registration Successful!
        </strong>

        <br>

        Registration ID:
        <strong>${registrationId}</strong>

        <br>

        Event:
        ${eventName}

    `;


    message.classList.remove(
        "d-none"
    );

}


/* ========================================
   SHOW TICKET + QR
======================================== */

function showTicket(registration) {

    const ticketSection =
        document.getElementById(
            "ticketSection"
        );


    ticketSection.classList.remove(
        "d-none"
    );


    document.getElementById(
        "ticketId"
    ).textContent =
        registration.registrationId;


    document.getElementById(
        "ticketStudent"
    ).textContent =
        registration.name;


    document.getElementById(
        "ticketEvent"
    ).textContent =
        registration.eventName;


    document.getElementById(
        "ticketDate"
    ).textContent =
        registration.date;


    document.getElementById(
        "ticketVenue"
    ).textContent =
        registration.venue;


    const qr =
        document.getElementById(
            "qrcode"
        );


    qr.innerHTML = "";


    new QRCode(
        qr,
        {
            text:
                registration.registrationId,

            width: 150,

            height: 150
        }
    );


    ticketSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* ========================================
   SEARCH
======================================== */

function filterEvents() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const filtered =
        events.filter(event => {

            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(search) ||

                event.description
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                event.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayEvents(filtered);

}


searchInput.addEventListener(
    "input",
    filterEvents
);


categoryFilter.addEventListener(
    "change",
    filterEvents
);


/* ========================================
   DASHBOARD
======================================== */

function updateDashboard() {

    document.getElementById(
        "totalRegistrations"
    ).textContent =
        registrations.length;


    document.getElementById(
        "totalEvents"
    ).textContent =
        events.length;


    const attendance =
        registrations.filter(
            r => r.attendance
        ).length;


    document.getElementById(
        "totalAttendance"
    ).textContent =
        attendance;


    document.getElementById(
        "heroEventCount"
    ).textContent =
        events.length;


    document.getElementById(
        "heroRegistrationCount"
    ).textContent =
        registrations.length;


    updateParticipantTable();

}


/* ========================================
   PARTICIPANT TABLE
======================================== */

function updateParticipantTable() {

    const table =
        document.getElementById(
            "participantTable"
        );


    table.innerHTML = "";


    if (registrations.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-muted py-4">

                    No registrations yet.

                </td>

            </tr>

        `;

        return;
    }


    registrations.forEach(
        registration => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${registration.registrationId}
                    </strong>
                </td>

                <td>
                    ${registration.name}
                    <br>
                    <small class="text-muted">
                        ${registration.studentId}
                    </small>
                </td>

                <td>
                    ${registration.eventName}
                </td>

                <td>
                    ${registration.department}
                </td>

                <td>

                    ${
                        registration.attendance

                        ? `
                            <span
                                class="attendance-badge present">
                                Present
                            </span>
                          `

                        : `
                            <span
                                class="attendance-badge absent">
                                Pending
                            </span>
                          `
                    }

                </td>

            `;


            table.appendChild(row);

        }
    );

}


/* ========================================
   ATTENDANCE
======================================== */

function markAttendance() {

    const input =
        document.getElementById(
            "attendanceId"
        );


    const message =
        document.getElementById(
            "attendanceMessage"
        );


    const id =
        input.value
            .trim()
            .toUpperCase();


    if (!id) {

        message.innerHTML = `

            <div class="alert alert-warning">
                Please enter a Registration ID.
            </div>

        `;

        return;
    }


    const registration =
        registrations.find(
            r =>
                r.registrationId
                    .toUpperCase() === id
        );


    if (!registration) {

        message.innerHTML = `

            <div class="alert alert-danger">
                Registration ID not found.
            </div>

        `;

        return;
    }


    if (registration.attendance) {

        message.innerHTML = `

            <div class="alert alert-info">

                Attendance already marked for
                <strong>
                    ${registration.name}
                </strong>.

            </div>

        `;

        return;
    }


    registration.attendance = true;


    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    message.innerHTML = `

        <div class="alert alert-success">

            <i class="bi bi-check-circle-fill"></i>

            Attendance marked successfully for

            <strong>
                ${registration.name}
            </strong>.

        </div>

    `;


    input.value = "";


    updateDashboard();

}


/* ========================================
   PRINT TICKET
======================================== */

function printTicket() {

    window.print();

}


/* ========================================
   CLEAR DATA
======================================== */

function clearAllData() {

    const confirmDelete =
        confirm(
            "Are you sure you want to clear all registration data?"
        );


    if (!confirmDelete) {
        return;
    }


    registrations = [];


    localStorage.removeItem(
        "registrations"
    );


    displayEvents();

    updateDashboard();

}


/* ========================================
   INITIALIZE
======================================== */

loadEventOptions();

displayEvents();

updateDashboard();
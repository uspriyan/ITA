document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       SIDEBAR
       ========================================================= */

    const menuToggle =
        document.getElementById("menu-toggle");

    const sidebar =
        document.getElementById("sidebar");


    if (menuToggle && sidebar) {

        menuToggle.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

            }
        );

    }



    /* =========================================================
       ACTIVE NAVIGATION
       ========================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (href === currentPage) {

            link.classList.add("active");

        }

    });



    /* =========================================================
       HELPER
       ========================================================= */

    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }



    /* =========================================================
       RESOURCES PAGE
       ========================================================= */

    const resourcesGrid =
        document.getElementById(
            "resources-grid"
        );


    const resourceSearch =
        document.getElementById(
            "resource-search"
        );


    let allResources = [];


    async function loadResources() {

        if (!resourcesGrid) {
            return;
        }


        try {

            const response =
                await fetch("/api/resources");


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch resources"
                );

            }


            const data =
                await response.json();


            allResources = [];


            data.forEach(function (category) {

                const categoryName =
                    category.category_name ||
                    category.category ||
                    "Resources";


                const files =
                    Array.isArray(category.files)
                        ? category.files
                        : [];


                files.forEach(function (file) {

                    allResources.push({

                        title:
                            file.filename ||
                            file.name ||
                            "Untitled Resource",

                        description:
                            "Study resource for " +
                            categoryName,

                        type:
                            categoryName,

                        category:
                            categoryName,

                        file:
                            file.path
                                ? "/" + file.path
                                : "",

                        filename:
                            file.filename ||
                            file.name ||
                            "Resource"

                    });

                });

            });


            renderResources(
                allResources
            );

        }
        catch (error) {

            console.error(
                "Resource loading error:",
                error
            );


            resourcesGrid.innerHTML = `

                <div class="card">

                    <h2>
                        Unable to load resources
                    </h2>

                    <p>
                        Make sure the Crow backend is running
                        on port 18080.
                    </p>

                </div>

            `;

        }

    }



    function renderResources(resources) {

        if (!resourcesGrid) {
            return;
        }


        if (resources.length === 0) {

            resourcesGrid.innerHTML = `

                <div class="card">

                    <h2>
                        No resources found
                    </h2>

                    <p>
                        Try a different search.
                    </p>

                </div>

            `;

            return;

        }


        resourcesGrid.innerHTML =
            resources.map(function (resource) {

                return `

                    <article class="card resource-card">

                        <div class="resource-card-header">

                            <span class="eyebrow">
                                ${escapeHtml(
                                    resource.category ||
                                    "Resource"
                                )}
                            </span>

                        </div>


                        <h2>
                            ${escapeHtml(
                                resource.title
                            )}
                        </h2>


                        <p>
                            ${escapeHtml(
                                resource.description
                            )}
                        </p>


                        ${
                            resource.file
                            ?
                            `

                                <a
                                    href="${resource.file}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-ghost"
                                >
                                    Open PDF
                                </a>

                            `
                            :
                            ""
                        }

                    </article>

                `;

            }).join("");

    }



    if (resourceSearch) {

        resourceSearch.addEventListener(
            "input",
            function () {

                const searchText =
                    resourceSearch.value
                        .toLowerCase()
                        .trim();


                const filteredResources =
                    allResources.filter(
                        function (resource) {

                            const title =
                                (resource.title || "")
                                    .toLowerCase();


                            const description =
                                (resource.description || "")
                                    .toLowerCase();


                            const type =
                                (resource.type || "")
                                    .toLowerCase();


                            const category =
                                (resource.category || "")
                                    .toLowerCase();


                            const filename =
                                (resource.filename || "")
                                    .toLowerCase();


                            return (
                                title.includes(searchText) ||
                                description.includes(searchText) ||
                                type.includes(searchText) ||
                                category.includes(searchText) ||
                                filename.includes(searchText)
                            );

                        }
                    );


                renderResources(
                    filteredResources
                );

            }
        );

    }


    loadResources();



    /* =========================================================
       PLACEMENT RESOURCES PAGE
       ========================================================= */

    const placementResourcesGrid =
        document.getElementById(
            "placement-resources-grid"
        );


    const placementResourceSearch =
        document.getElementById(
            "placement-resource-search"
        );


    let allPlacementResources = [];


    async function loadPlacementResources() {

        if (!placementResourcesGrid) {
            return;
        }


        try {

            const response =
                await fetch(
                    "/api/placement-resources"
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch placement resources"
                );

            }


            allPlacementResources =
                await response.json();


            renderPlacementResources(
                allPlacementResources
            );

        }
        catch (error) {

            console.error(
                "Placement resource loading error:",
                error
            );


            placementResourcesGrid.innerHTML = `

                <div class="card">

                    <h2>
                        Unable to load placement resources
                    </h2>

                    <p>
                        Make sure the Crow backend is running
                        on port 18080.
                    </p>

                </div>

            `;

        }

    }



    function renderPlacementResources(resources) {

        if (!placementResourcesGrid) {
            return;
        }


        if (resources.length === 0) {

            placementResourcesGrid.innerHTML = `

                <div class="card">

                    <h2>
                        No placement resources found
                    </h2>

                    <p>
                        Try a different search.
                    </p>

                </div>

            `;

            return;

        }


        placementResourcesGrid.innerHTML =
            resources.map(function (resource) {

                const filePath =
                    resource.path
                    ? "/" + resource.path
                    : "";


                return `

                    <article class="card resource-card">

                        <div class="resource-card-header">

                            <span class="eyebrow">
                                ${
                                    escapeHtml(
                                        resource.category ||
                                        "Placement"
                                    )
                                }
                            </span>

                        </div>


                        <h2>
                            ${
                                escapeHtml(
                                    resource.title ||
                                    "Untitled Resource"
                                )
                            }
                        </h2>


                        <p>
                            ${
                                escapeHtml(
                                    resource.description ||
                                    "Placement preparation resource."
                                )
                            }
                        </p>


                        ${
                            filePath
                            ?
                            `

                                <a
                                    href="${filePath}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-ghost"
                                >
                                    Open PDF
                                </a>

                            `
                            :
                            ""
                        }

                    </article>

                `;

            }).join("");

    }



    if (placementResourceSearch) {

        placementResourceSearch.addEventListener(
            "input",
            function () {

                const searchText =
                    placementResourceSearch.value
                        .toLowerCase()
                        .trim();


                const filteredResources =
                    allPlacementResources.filter(
                        function (resource) {

                            const title =
                                (resource.title || "")
                                    .toLowerCase();


                            const description =
                                (resource.description || "")
                                    .toLowerCase();


                            const category =
                                (resource.category || "")
                                    .toLowerCase();


                            const company =
                                (resource.company || "")
                                    .toLowerCase();


                            const type =
                                (resource.type || "")
                                    .toLowerCase();


                            return (
                                title.includes(searchText) ||
                                description.includes(searchText) ||
                                category.includes(searchText) ||
                                company.includes(searchText) ||
                                type.includes(searchText)
                            );

                        }
                    );


                renderPlacementResources(
                    filteredResources
                );

            }
        );

    }


    loadPlacementResources();



    /* =========================================================
       EVENTS PAGE
       ========================================================= */

    const eventsGrid =
        document.getElementById(
            "events-grid"
        );


    const eventSearch =
        document.getElementById(
            "event-search"
        );


    const eventsCount =
        document.getElementById(
            "events-count"
        );


    let allEvents = [];


    async function loadEvents() {

        if (!eventsGrid) {
            return;
        }


        try {

            const response =
                await fetch(
                    "/api/events"
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch events"
                );

            }


            allEvents =
                await response.json();


            renderEvents(
                allEvents
            );

        }
        catch (error) {

            console.error(
                "Event loading error:",
                error
            );


            if (eventsCount) {

                eventsCount.textContent =
                    "Unable to load events";

            }


            eventsGrid.innerHTML = `

                <div class="card event-error">

                    <div class="event-empty-icon">
                        !
                    </div>

                    <h2>
                        Unable to load events
                    </h2>

                    <p>
                        Make sure the Crow backend is
                        running on port 18080.
                    </p>

                </div>

            `;

        }

    }



    function renderEvents(events) {

        if (!eventsGrid) {
            return;
        }


        if (eventsCount) {

            eventsCount.textContent =
                events.length +
                (
                    events.length === 1
                        ? " event"
                        : " events"
                );

        }


        if (events.length === 0) {

            eventsGrid.innerHTML = `

                <div class="card event-empty">

                    <div class="event-empty-icon">
                        ◇
                    </div>

                    <h2>
                        No events found
                    </h2>

                    <p>
                        Try searching for a different event.
                    </p>

                </div>

            `;

            return;

        }


        eventsGrid.innerHTML =
            events.map(function (event) {

                const posterPath =
                    event.poster ||
                    event.posterPath ||
                    event.path ||
                    "";


                const posterUrl =
                    posterPath
                        ? "/" + posterPath
                        : "";


                return `

                    <article class="event-card">

                        <div class="event-poster">

                            ${
                                posterUrl
                                ?
                                `

                                    <img
                                        src="${posterUrl}"
                                        alt="${escapeHtml(
                                            event.title ||
                                            "Event poster"
                                        )}"
                                        loading="lazy"
                                    />

                                `
                                :
                                `

                                    <div class="event-no-poster">
                                        No poster available
                                    </div>

                                `
                            }


                            <div class="event-poster-overlay">

                                ${
                                    posterUrl
                                    ?
                                    `

                                        <a
                                            href="${posterUrl}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="event-view-poster"
                                        >

                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >

                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/>
                                                <circle cx="12" cy="12" r="3"/>

                                            </svg>

                                            View Poster

                                        </a>

                                    `
                                    :
                                    ""
                                }

                            </div>

                        </div>



                        <div class="event-details">

                            <div class="event-type">
                                ITA · EVENT
                            </div>


                            <h3>
                                ${escapeHtml(
                                    event.title ||
                                    "Untitled Event"
                                )}
                            </h3>


                            <p class="event-description">
                                ${escapeHtml(
                                    event.description ||
                                    "No description available."
                                )}
                            </p>


                            <div class="event-meta">

                                <div class="event-meta-item">

                                    <span class="event-meta-icon">

                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.8"
                                        >

                                            <rect
                                                x="3"
                                                y="4"
                                                width="18"
                                                height="17"
                                                rx="2"
                                            />

                                            <path
                                                d="M16 2v4M8 2v4M3 9h18"
                                            />

                                        </svg>

                                    </span>


                                    <span>
                                        ${escapeHtml(
                                            event.date ||
                                            "Date to be announced"
                                        )}
                                    </span>

                                </div>


                                <div class="event-meta-item">

                                    <span class="event-meta-icon">

                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.8"
                                        >

                                            <path
                                                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                            />

                                            <circle
                                                cx="12"
                                                cy="10"
                                                r="2.5"
                                            />

                                        </svg>

                                    </span>


                                    <span>
                                        ${escapeHtml(
                                            event.venue ||
                                            "Campus"
                                        )}
                                    </span>

                                </div>

                            </div>


                            ${
                                posterUrl
                                ?
                                `

                                    <a
                                        href="${posterUrl}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="btn btn-ghost event-button"
                                    >

                                        Open Poster

                                    </a>

                                `
                                :
                                ""
                            }

                        </div>

                    </article>

                `;

            }).join("");

    }



    if (eventSearch) {

        eventSearch.addEventListener(
            "input",
            function () {

                const searchText =
                    eventSearch.value
                        .toLowerCase()
                        .trim();


                const filteredEvents =
                    allEvents.filter(
                        function (event) {

                            const title =
                                (event.title || "")
                                    .toLowerCase();


                            const description =
                                (event.description || "")
                                    .toLowerCase();


                            const date =
                                (event.date || "")
                                    .toLowerCase();


                            const venue =
                                (event.venue || "")
                                    .toLowerCase();


                            return (
                                title.includes(searchText) ||
                                description.includes(searchText) ||
                                date.includes(searchText) ||
                                venue.includes(searchText)
                            );

                        }
                    );


                renderEvents(
                    filteredEvents
                );

            }
        );

    }


    loadEvents();



    /* =========================================================
       PLACEMENT REPORT DASHBOARD
       ========================================================= */

    const domainSelect =
        document.getElementById(
            "domain-select"
        );


    if (domainSelect) {

        const totalStudents =
            document.getElementById(
                "total-students"
            );


        const companyCount =
            document.getElementById(
                "company-count"
            );


        const topCompany =
            document.getElementById(
                "top-company"
            );


        const topRole =
            document.getElementById(
                "top-role"
            );


        const companyTotalLabel =
            document.getElementById(
                "company-total-label"
            );


        const companyTableBody =
            document.getElementById(
                "company-table-body"
            );


        const errorBox =
            document.getElementById(
                "placement-error"
            );


        let companyChart = null;
        let roleChart = null;


        function loadDomains() {

            fetch("/api/placement-reports")

                .then(function (response) {

                    if (!response.ok) {

                        throw new Error(
                            "Unable to load placement domains"
                        );

                    }

                    return response.json();

                })

                .then(function (data) {

                    domainSelect.innerHTML = "";

                    const domains =
                        data.domains || [];


                    if (domains.length === 0) {

                        domainSelect.innerHTML =
                            `
                                <option value="">
                                    No domains available
                                </option>
                            `;

                        return;

                    }


                    domains.forEach(
                        function (domain) {

                            const option =
                                document.createElement(
                                    "option"
                                );


                            option.value =
                                domain;


                            option.textContent =
                                domain;


                            domainSelect.appendChild(
                                option
                            );

                        }
                    );


                    if (
                        data.selectedDomain &&
                        domains.includes(
                            data.selectedDomain
                        )
                    ) {

                        domainSelect.value =
                            data.selectedDomain;

                    }


                    loadPlacementData(
                        domainSelect.value
                    );

                })

                .catch(function (error) {

                    console.error(error);

                    showPlacementError(
                        "Unable to load placement domains."
                    );

                });

        }



        function loadPlacementData(domain) {

            if (!domain) {
                return;
            }


            hidePlacementError();


            const encodedDomain =
                encodeURIComponent(domain);


            fetch(
                "/api/placement-reports/" +
                encodedDomain
            )

                .then(function (response) {

                    if (!response.ok) {

                        throw new Error(
                            "Placement API failed"
                        );

                    }

                    return response.json();

                })

                .then(function (data) {

                    updateDashboard(data);

                })

                .catch(function (error) {

                    console.error(error);

                    showPlacementError(
                        "Unable to load placement data for " +
                        domain +
                        "."
                    );

                });

        }



        function updateDashboard(data) {

            const total =
                Number(
                    data.totalStudents || 0
                );


            const companies =
                Number(
                    data.companyCount || 0
                );


            if (totalStudents) {

                totalStudents.textContent =
                    total;

            }


            if (companyCount) {

                companyCount.textContent =
                    companies;

            }


            const companyData =
                data.companies || [];


            const roleData =
                data.roles || [];


            if (topCompany) {

                if (companyData.length > 0) {

                    const highestCompany =
                        companyData.reduce(
                            function (
                                best,
                                current
                            ) {

                                return Number(
                                    current.students
                                ) >
                                Number(
                                    best.students
                                )
                                    ? current
                                    : best;

                            }
                        );


                    topCompany.textContent =
                        highestCompany.company;

                }
                else {

                    topCompany.textContent =
                        "—";

                }

            }


            if (topRole) {

                if (roleData.length > 0) {

                    const highestRole =
                        roleData.reduce(
                            function (
                                best,
                                current
                            ) {

                                return Number(
                                    current.students
                                ) >
                                Number(
                                    best.students
                                )
                                    ? current
                                    : best;

                            }
                        );


                    topRole.textContent =
                        highestRole.role;

                }
                else {

                    topRole.textContent =
                        "—";

                }

            }


            if (companyTotalLabel) {

                companyTotalLabel.textContent =
                    total +
                    " students";

            }


            updateCompanyChart(
                companyData
            );


            updateRoleChart(
                roleData
            );


            updateCompanyTable(
                companyData,
                total
            );

        }



        function updateCompanyChart(companyData) {

            const canvas =
                document.getElementById(
                    "company-chart"
                );


            if (!canvas) {
                return;
            }


            if (
                typeof Chart ===
                "undefined"
            ) {

                console.error(
                    "Chart.js is not loaded."
                );

                return;

            }


            const labels =
                companyData.map(
                    function (item) {
                        return item.company;
                    }
                );


            const values =
                companyData.map(
                    function (item) {
                        return Number(
                            item.students
                        );
                    }
                );


            if (companyChart) {

                companyChart.destroy();

            }


            companyChart =
                new Chart(
                    canvas,
                    {

                        type: "doughnut",

                        data: {

                            labels: labels,

                            datasets: [{

                                data: values,

                                borderWidth: 2,

                                borderColor:
                                    "#FFFFFF"

                            }]

                        },


                        options: {

                            responsive: true,

                            maintainAspectRatio:
                                false,

                            cutout: "62%",


                            plugins: {

                                legend: {

                                    position: "right",

                                    labels: {

                                        usePointStyle:
                                            true,

                                        padding: 16,

                                        font: {
                                            family:
                                                "Inter"
                                        }

                                    }

                                },


                                tooltip: {

                                    callbacks: {

                                        label:
                                            function (
                                                context
                                            ) {

                                                const value =
                                                    context.raw;


                                                const total =
                                                    values.reduce(
                                                        function (
                                                            sum,
                                                            number
                                                        ) {

                                                            return (
                                                                sum +
                                                                number
                                                            );

                                                        },
                                                        0
                                                    );


                                                const percentage =
                                                    total > 0
                                                        ?
                                                        (
                                                            value /
                                                            total *
                                                            100
                                                        ).toFixed(1)
                                                        :
                                                        0;


                                                return (
                                                    " " +
                                                    context.label +
                                                    ": " +
                                                    value +
                                                    " students (" +
                                                    percentage +
                                                    "%)"
                                                );

                                            }

                                    }

                                }

                            }

                        }

                    }
                );

        }



        function updateRoleChart(roleData) {

            const canvas =
                document.getElementById(
                    "role-chart"
                );


            if (!canvas) {
                return;
            }


            if (
                typeof Chart ===
                "undefined"
            ) {

                console.error(
                    "Chart.js is not loaded."
                );

                return;

            }


            const labels =
                roleData.map(
                    function (item) {
                        return item.role;
                    }
                );


            const values =
                roleData.map(
                    function (item) {
                        return Number(
                            item.students
                        );
                    }
                );


            if (roleChart) {

                roleChart.destroy();

            }


            roleChart =
                new Chart(
                    canvas,
                    {

                        type: "bar",

                        data: {

                            labels: labels,

                            datasets: [{

                                label:
                                    "Students Placed",

                                data: values,

                                borderRadius: 6,

                                borderSkipped:
                                    false

                            }]

                        },


                        options: {

                            responsive: true,

                            maintainAspectRatio:
                                false,

                            indexAxis: "y",


                            scales: {

                                x: {

                                    beginAtZero:
                                        true,

                                    ticks: {

                                        precision: 0

                                    },

                                    grid: {

                                        color:
                                            "rgba(15, 27, 45, 0.07)"

                                    }

                                },


                                y: {

                                    grid: {

                                        display:
                                            false

                                    }

                                }

                            },


                            plugins: {

                                legend: {

                                    display:
                                        false

                                }

                            }

                        }

                    }
                );

        }



        function updateCompanyTable(
            companyData,
            total
        ) {

            if (!companyTableBody) {
                return;
            }


            companyTableBody.innerHTML =
                "";


            if (
                companyData.length ===
                0
            ) {

                companyTableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="3"
                            class="table-message"
                        >

                            No company data available.

                        </td>

                    </tr>

                `;

                return;

            }


            companyData.forEach(
                function (item) {

                    const students =
                        Number(
                            item.students ||
                            0
                        );


                    const percentage =
                        total > 0
                            ?
                            (
                                students /
                                total *
                                100
                            ).toFixed(1)
                            :
                            "0.0";


                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `

                        <td>

                            <div class="company-name">

                                <span class="company-avatar">
                                    ${getInitials(
                                        item.company
                                    )}
                                </span>

                                <strong>
                                    ${escapeHtml(
                                        item.company
                                    )}
                                </strong>

                            </div>

                        </td>


                        <td>

                            <span class="students-number">
                                ${students}
                            </span>

                        </td>


                        <td>

                            <div class="distribution-cell">

                                <div class="distribution-track">

                                    <div
                                        class="distribution-fill"
                                        style="width:${percentage}%"
                                    >
                                    </div>

                                </div>

                                <span>
                                    ${percentage}%
                                </span>

                            </div>

                        </td>

                    `;


                    companyTableBody.appendChild(
                        row
                    );

                }
            );

        }



        function getInitials(name) {

            if (!name) {
                return "?";
            }


            const words =
                name
                    .trim()
                    .split(/\s+/);


            if (words.length === 1) {

                return words[0]
                    .substring(0, 2)
                    .toUpperCase();

            }


            return (
                words[0][0] +
                words[words.length - 1][0]
            ).toUpperCase();

        }



        function showPlacementError(message) {

            if (!errorBox) {
                return;
            }


            errorBox.textContent =
                message;


            errorBox.hidden =
                false;

        }


        function hidePlacementError() {

            if (!errorBox) {
                return;
            }


            errorBox.hidden =
                true;

        }



        domainSelect.addEventListener(
            "change",
            function () {

                loadPlacementData(
                    domainSelect.value
                );

            }
        );



        const searchInput =
            document.getElementById(
                "placement-search"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    const query =
                        searchInput.value
                            .trim()
                            .toLowerCase();


                    const rows =
                        companyTableBody
                            ?
                            companyTableBody
                                .querySelectorAll("tr")
                            :
                            [];


                    rows.forEach(
                        function (row) {

                            const text =
                                row.textContent
                                    .toLowerCase();


                            if (!query) {

                                row.style.display =
                                    "";

                            }
                            else {

                                row.style.display =
                                    text.includes(query)
                                        ? ""
                                        : "none";

                            }

                        }
                    );

                }
            );

        }


        loadDomains();

    }



    /* =========================================================
       DASHBOARD
       ========================================================= */

    const dashboardResourceCount =
        document.getElementById(
            "dashboard-resource-count"
        );


    const dashboardReportCount =
        document.getElementById(
            "dashboard-report-count"
        );


    const dashboardEventCount =
        document.getElementById(
            "dashboard-event-count"
        );


    const dashboardResourceFiles =
        document.getElementById(
            "dashboard-resource-files"
        );


    const dashboardReportFiles =
        document.getElementById(
            "dashboard-report-files"
        );


    const dashboardPlacementResourceCount =
        document.getElementById(
            "dashboard-placement-resource-count"
        );


    const dashboardEventFiles =
        document.getElementById(
            "dashboard-event-files"
        );


    const dashboardRecentResources =
        document.getElementById(
            "dashboard-recent-resources"
        );


    const dashboardUpcomingEvents =
        document.getElementById(
            "dashboard-upcoming-events"
        );


    const dashboardSummary =
        document.getElementById(
            "dashboard-summary"
        );


    const dashboardSearch =
        document.getElementById(
            "dashboard-search"
        );



    /* ---------------------------------------------------------
       DASHBOARD RESOURCE DATA
       --------------------------------------------------------- */

    let dashboardResources = [];


    async function loadDashboardResources() {

        if (
            !dashboardResourceCount &&
            !dashboardRecentResources
        ) {
            return;
        }


        try {

            const response =
                await fetch(
                    "/api/resources"
                );


            if (!response.ok) {

                throw new Error(
                    "Dashboard resource API failed"
                );

            }


            const data =
                await response.json();


            dashboardResources = [];


            data.forEach(function (category) {

                const categoryName =
                    category.category_name ||
                    category.category ||
                    "Resources";


                const files =
                    Array.isArray(category.files)
                        ? category.files
                        : [];


                files.forEach(function (file) {

                    dashboardResources.push({

                        title:
                            file.filename ||
                            file.name ||
                            "Untitled Resource",

                        category:
                            categoryName,

                        path:
                            file.path ||
                            ""

                    });

                });

            });


            const count =
                dashboardResources.length;


            if (dashboardResourceCount) {

                dashboardResourceCount.textContent =
                    count;

            }


            if (dashboardResourceFiles) {

                dashboardResourceFiles.textContent =
                    count +
                    (
                        count === 1
                            ? " file"
                            : " files"
                    );

            }


            renderDashboardRecentResources(
                dashboardResources
            );


            updateDashboardSummary();

        }
        catch (error) {

            console.error(
                "Dashboard resources error:",
                error
            );


            if (dashboardResourceCount) {

                dashboardResourceCount.textContent =
                    "—";

            }


            if (dashboardResourceFiles) {

                dashboardResourceFiles.textContent =
                    "Unavailable";

            }


            if (dashboardRecentResources) {

                dashboardRecentResources.innerHTML = `

                    <div class="item-row">

                        <div class="item-body">

                            <div class="item-title">
                                Resources unavailable
                            </div>

                            <div class="item-sub">
                                Check that the Crow server is running.
                            </div>

                        </div>

                    </div>

                `;

            }

        }

    }



    function renderDashboardRecentResources(resources) {

        if (!dashboardRecentResources) {
            return;
        }


        if (resources.length === 0) {

            dashboardRecentResources.innerHTML = `

                <div class="item-row">

                    <div class="item-body">

                        <div class="item-title">
                            No resources available
                        </div>

                    </div>

                </div>

            `;

            return;

        }


        /*
         * The current backend does not expose upload timestamps,
         * so these are displayed as recently available resources
         * rather than pretending to know when they were uploaded.
         */

        const recent =
            resources.slice(0, 4);


        dashboardRecentResources.innerHTML =
            recent.map(function (resource) {

                const pdfPath =
                    resource.path
                        ? "/" + resource.path
                        : "";


                return `

                    <div class="item-row">

                        <div class="item-icon">

                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                
                            >

                                <path d="M4 19V5a1 1 0 0 1 1-1h10l5 5v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/>
                                <path d="M14 4v5h5"/>

                            </svg>

                        </div>


                        <div class="item-body">

                            <div class="item-title">

                                ${
                                    escapeHtml(
                                        resource.title
                                    )
                                }

                            </div>


                            <div class="item-sub">

                                ${
                                    escapeHtml(
                                        resource.category
                                    )
                                }
                                · PDF resource

                            </div>

                        </div>


                        ${
                            pdfPath
                            ?
                            `

                                <a
                                    href="${pdfPath}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="item-time"
                                    style="text-decoration:none;"
                                >
                                    Open
                                </a>

                            `
                            :
                            ""
                        }

                    </div>

                `;

            }).join("");

    }



    /* ---------------------------------------------------------
       DASHBOARD PLACEMENT REPORTS
       --------------------------------------------------------- */

    async function loadDashboardReports() {

        if (
            !dashboardReportCount &&
            !dashboardReportFiles
        ) {
            return;
        }


        try {

            const response =
                await fetch(
                    "/api/placement-reports"
                );


            if (!response.ok) {

                throw new Error(
                    "Dashboard report API failed"
                );

            }


            const data =
                await response.json();


            /*
             * The API returns domains.
             *
             * Each domain represents the available
             * placement report grouping.
             */

            const domains =
                data.domains || [];


            const count =
                domains.length;


            if (dashboardReportCount) {

                dashboardReportCount.textContent =
                    count;

            }


            if (dashboardReportFiles) {

                dashboardReportFiles.textContent =
                    count +
                    (
                        count === 1
                            ? " report"
                            : " reports"
                    );

            }


            updateDashboardSummary();

        }
        catch (error) {

            console.error(
                "Dashboard reports error:",
                error
            );


            if (dashboardReportCount) {

                dashboardReportCount.textContent =
                    "—";

            }


            if (dashboardReportFiles) {

                dashboardReportFiles.textContent =
                    "Unavailable";

            }

        }

    }



    /* ---------------------------------------------------------
       DASHBOARD PLACEMENT RESOURCES
       --------------------------------------------------------- */

    async function loadDashboardPlacementResources() {

        if (
            !dashboardPlacementResourceCount
        ) {
            return;
        }


        try {

            const response =
                await fetch(
                    "/api/placement-resources"
                );


            if (!response.ok) {

                throw new Error(
                    "Dashboard placement resource API failed"
                );

            }


            const data =
                await response.json();


            const count =
                Array.isArray(data)
                    ? data.length
                    : 0;


            dashboardPlacementResourceCount.textContent =
                count +
                (
                    count === 1
                        ? " resource"
                        : " resources"
                );


            updateDashboardSummary();

        }
        catch (error) {

            console.error(
                "Dashboard placement resources error:",
                error
            );


            dashboardPlacementResourceCount.textContent =
                "Unavailable";

        }

    }



    /* ---------------------------------------------------------
       DASHBOARD EVENTS
       --------------------------------------------------------- */

    let dashboardEvents = [];


    async function loadDashboardEvents() {

        if (
            !dashboardEventCount &&
            !dashboardUpcomingEvents
        ) {
            return;
        }


        try {

            const response =
                await fetch(
                    "/api/events"
                );


            if (!response.ok) {

                throw new Error(
                    "Dashboard event API failed"
                );

            }


            dashboardEvents =
                await response.json();


            const count =
                Array.isArray(
                    dashboardEvents
                )
                    ? dashboardEvents.length
                    : 0;


            if (dashboardEventCount) {

                dashboardEventCount.textContent =
                    count;

            }


            if (dashboardEventFiles) {

                dashboardEventFiles.textContent =
                    count +
                    (
                        count === 1
                            ? " upcoming"
                            : " available"
                    );

            }


            renderDashboardEvents(
                dashboardEvents
            );


            updateDashboardSummary();

        }
        catch (error) {

            console.error(
                "Dashboard events error:",
                error
            );


            if (dashboardEventCount) {

                dashboardEventCount.textContent =
                    "—";

            }


            if (dashboardEventFiles) {

                dashboardEventFiles.textContent =
                    "Unavailable";

            }


            if (dashboardUpcomingEvents) {

                dashboardUpcomingEvents.innerHTML = `

                    <div class="event-item">

                        <div>

                            <div class="event-title">
                                Events unavailable
                            </div>

                            <div class="event-sub">
                                Check that the Crow server is running.
                            </div>

                        </div>

                    </div>

                `;

            }

        }

    }



    function renderDashboardEvents(events) {

        if (!dashboardUpcomingEvents) {
            return;
        }


        if (!events || events.length === 0) {

            dashboardUpcomingEvents.innerHTML = `

                <div class="event-item">

                    <div>

                        <div class="event-title">
                            No events available
                        </div>

                        <div class="event-sub">
                            Check the Events page for updates.
                        </div>

                    </div>

                </div>

            `;

            return;

        }


        const selectedEvents =
            events.slice(0, 3);


        dashboardUpcomingEvents.innerHTML =
            selectedEvents.map(function (event) {

                const title =
                    event.title ||
                    "Untitled Event";


                const date =
                    event.date ||
                    "Date to be announced";


                const venue =
                    event.venue ||
                    "Campus";


                return `

                    <div class="event-item">

                        <div class="event-date">

                            <div class="day">
                                ${escapeHtml(
                                    getEventDay(date)
                                )}
                            </div>

                            <div class="mon">
                                ${escapeHtml(
                                    getEventMonth(date)
                                )}
                            </div>

                        </div>


                        <div>

                            <div class="event-title">

                                ${escapeHtml(
                                    title
                                )}

                            </div>


                            <div class="event-sub">

                                ${
                                    escapeHtml(
                                        venue
                                    )
                                }

                                ·

                                ${
                                    escapeHtml(
                                        date
                                    )
                                }

                            </div>

                        </div>

                    </div>

                `;

            }).join("");

    }



    /*
     * The current Event API stores date as text.
     * These helpers only format actual recognizable dates.
     * If the backend says "Date to be announced", we display
     * simple placeholders instead of inventing a date.
     */

    function getEventDay(dateText) {

        if (!dateText) {
            return "—";
        }


        const date =
            new Date(dateText);


        if (Number.isNaN(date.getTime())) {
            return "—";
        }


        return String(
            date.getDate()
        ).padStart(2, "0");

    }



    function getEventMonth(dateText) {

        if (!dateText) {
            return "TBA";
        }


        const date =
            new Date(dateText);


        if (Number.isNaN(date.getTime())) {
            return "TBA";
        }


        return date.toLocaleString(
            "en-US",
            {
                month: "short"
            }
        );

    }



    /* ---------------------------------------------------------
       DASHBOARD SUMMARY
       --------------------------------------------------------- */

    function updateDashboardSummary() {

        if (!dashboardSummary) {
            return;
        }


        const resourceCount =
            dashboardResources.length;


        const eventCount =
            dashboardEvents.length;


        const resourceText =
            resourceCount === 1
                ? "resource"
                : "resources";


        const eventText =
            eventCount === 1
                ? "event"
                : "events";


        dashboardSummary.textContent =
            resourceCount +
            " " +
            resourceText +
            ", " +
            eventCount +
            " " +
            eventText +
            " and your placement information are available in the portal.";

    }



    /* ---------------------------------------------------------
       DASHBOARD SEARCH
       --------------------------------------------------------- */

    if (dashboardSearch) {

        dashboardSearch.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Enter"
                ) {
                    return;
                }


                const query =
                    dashboardSearch.value
                        .trim()
                        .toLowerCase();


                if (!query) {
                    return;
                }


                const resourceMatch =
                    dashboardResources.find(
                        function (resource) {

                            return (
                                resource.title
                                    .toLowerCase()
                                    .includes(query) ||

                                resource.category
                                    .toLowerCase()
                                    .includes(query)
                            );

                        }
                    );


                if (resourceMatch) {

                    window.location.href =
                        "resources.html";

                    return;

                }


                const eventMatch =
                    dashboardEvents.find(
                        function (item) {

                            return (
                                (item.title || "")
                                    .toLowerCase()
                                    .includes(query) ||

                                (item.description || "")
                                    .toLowerCase()
                                    .includes(query) ||

                                (item.venue || "")
                                    .toLowerCase()
                                    .includes(query)
                            );

                        }
                    );


                if (eventMatch) {

                    window.location.href =
                        "events.html";

                    return;

                }


                if (
                    query.includes("placement") ||
                    query.includes("report") ||
                    query.includes("company")
                ) {

                    window.location.href =
                        "placement-reports.html";

                    return;

                }


                alert(
                    "No matching resource, event or placement section found."
                );

            }
        );

    }



    /* ---------------------------------------------------------
       START DASHBOARD DATA
       --------------------------------------------------------- */

    loadDashboardResources();

    loadDashboardReports();

    loadDashboardPlacementResources();

    loadDashboardEvents();

});
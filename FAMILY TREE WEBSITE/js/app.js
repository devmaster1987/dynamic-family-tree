// ==========================================
// FAMILY TREE APP
// ==========================================

const STORAGE_KEY = "familyTreeMembers";

let members = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let selectedMemberId = null;


// ==========================================
// DOM ELEMENTS
// ==========================================

const memberModal = document.getElementById("member-modal");
const detailsModal = document.getElementById("details-modal");

const memberForm = document.getElementById("member-form");

const memberIdInput = document.getElementById("member-id");
const memberNameInput = document.getElementById("member-name");
const memberDobInput = document.getElementById("member-dob");
const memberGenderInput = document.getElementById("member-gender");
const memberRelationshipInput =
    document.getElementById("member-relationship");

const relatedToInput = document.getElementById("related-to");
const memberBioInput = document.getElementById("member-bio");
const memberImageInput = document.getElementById("member-image");

const membersContainer =
    document.getElementById("members-container");

const memberSearch =
    document.getElementById("member-search");

const treeSearch =
    document.getElementById("tree-search");

const relationshipFilter =
    document.getElementById("relationship-filter");


// ==========================================
// DEFAULT PROFILE IMAGE
// ==========================================

const defaultImage =
    "https://ui-avatars.com/api/?background=e8f3ed&color=2f6b4f&name=Family+Member";


// ==========================================
// SAVE TO LOCAL STORAGE
// ==========================================

function saveMembers() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(members)
    );
}


// ==========================================
// GENERATE UNIQUE ID
// ==========================================

function generateId() {
    return Date.now().toString();
}


// ==========================================
// CALCULATE AGE
// ==========================================

function calculateAge(dateOfBirth) {

    if (!dateOfBirth) return "--";

    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() <
            birthDate.getDate()
        )
    ) {
        age--;
    }

    return age;
}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date) {

    if (!date) return "--";

    return new Date(
        date + "T00:00:00"
    ).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


// ==========================================
// FORMAT TEXT
// ==========================================

function formatText(text) {

    if (!text) return "";

    return text
        .replace(/-/g, " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );
}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ==========================================
// OPEN ADD MEMBER MODAL
// ==========================================

function openAddMemberModal() {

    memberForm.reset();

    memberIdInput.value = "";

    document.getElementById(
        "member-modal-title"
    ).textContent = "Add Family Member";

    updateRelatedToOptions();

    memberModal.classList.add("active");
}


// ==========================================
// CLOSE MEMBER MODAL
// ==========================================

function closeMemberModal() {

    memberModal.classList.remove("active");

    memberForm.reset();

    memberIdInput.value = "";
}


// ==========================================
// ADD MEMBER BUTTONS
// ==========================================

document.querySelectorAll(
    ".add-member-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        openAddMemberModal
    );

});


// Build My Tree Button

document.querySelector(
    ".build-tree-btn"
)?.addEventListener(
    "click",
    openAddMemberModal
);


// ==========================================
// CLOSE BUTTONS
// ==========================================

document.getElementById(
    "close-member-modal"
).addEventListener(
    "click",
    closeMemberModal
);


document.getElementById(
    "cancel-member"
).addEventListener(
    "click",
    closeMemberModal
);


// Modal Overlay

memberModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeMemberModal
    );


// ==========================================
// IMAGE TO BASE64
// ==========================================

function imageToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();

            reader.onload = () =>
                resolve(reader.result);

            reader.onerror =
                reject;

            reader.readAsDataURL(file);

        }
    );
}


// ==========================================
// MEMBER FORM SUBMIT
// ==========================================

memberForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const id =
            memberIdInput.value;

        const existingMember =
            members.find(
                member => member.id === id
            );

        let image =
            existingMember?.image ||
            defaultImage;

        const selectedImage =
            memberImageInput.files[0];

        if (selectedImage) {

            // Keep LocalStorage reasonably safe.
            if (
                selectedImage.size >
                2 * 1024 * 1024
            ) {
                alert(
                    "Please select an image smaller than 2MB."
                );

                return;
            }

            image =
                await imageToBase64(
                    selectedImage
                );
        }


        const memberData = {

            id:
                id ||
                generateId(),

            name:
                memberNameInput
                    .value
                    .trim(),

            dob:
                memberDobInput.value,

            gender:
                memberGenderInput.value,

            relationship:
                memberRelationshipInput.value,

            relatedTo:
                relatedToInput.value,

            bio:
                memberBioInput
                    .value
                    .trim(),

            image: image

        };


        if (id) {

            // EDIT MEMBER

            const index =
                members.findIndex(
                    member =>
                        member.id === id
                );

            if (index !== -1) {

                members[index] =
                    memberData;

            }

        } else {

            // ADD MEMBER

            members.push(
                memberData
            );

        }


        saveMembers();

        renderApp();

        closeMemberModal();

    }
);


// ==========================================
// UPDATE RELATED TO OPTIONS
// ==========================================

function updateRelatedToOptions(
    currentMemberId = null
) {

    relatedToInput.innerHTML =
        `<option value="">
            Select family member
        </option>`;


    members.forEach(member => {

        if (
            member.id ===
            currentMemberId
        ) {
            return;
        }


        const option =
            document.createElement(
                "option"
            );

        option.value =
            member.id;

        option.textContent =
            `${member.name} (${formatText(
                member.relationship
            )})`;

        relatedToInput.appendChild(
            option
        );

    });

}


// ==========================================
// RENDER MEMBERS
// ==========================================

function renderMembers(
    list = members
) {

    membersContainer.innerHTML = "";


    if (list.length === 0) {

        membersContainer.innerHTML = `

            <div class="empty-members-message">

                <h3>
                    No family members found
                </h3>

                <p>
                    Add your first family member
                    to start building your tree.
                </p>

                <button
                    class="btn btn-primary"
                    id="empty-add-member"
                >
                    + Add Member
                </button>

            </div>

        `;


        document.getElementById(
            "empty-add-member"
        )?.addEventListener(
            "click",
            openAddMemberModal
        );


        return;
    }


    list.forEach(member => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "member-card";


        card.innerHTML = `

            <div class="member-card-header">

                <img
                    src="${escapeHTML(
                        member.image ||
                        defaultImage
                    )}"
                    alt="${escapeHTML(
                        member.name
                    )}"
                >

                <div>

                    <h3>
                        ${escapeHTML(
                            member.name
                        )}
                    </h3>

                    <span class="relationship">
                        ${escapeHTML(
                            formatText(
                                member.relationship
                            )
                        )}
                    </span>

                </div>

            </div>


            <div class="member-meta">

                <p>
                    <strong>Age:</strong>
                    ${calculateAge(
                        member.dob
                    )}
                </p>

                <p>
                    <strong>DOB:</strong>
                    ${formatDate(
                        member.dob
                    )}
                </p>

            </div>


            <div class="member-card-actions">

                <button
                    data-action="view"
                    data-id="${member.id}"
                >
                    View
                </button>

                <button
                    data-action="edit"
                    data-id="${member.id}"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-action="delete"
                    data-id="${member.id}"
                >
                    Delete
                </button>

            </div>

        `;


        membersContainer.appendChild(
            card
        );

    });

}


// ==========================================
// MEMBER CARD ACTIONS
// ==========================================

membersContainer.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button[data-action]"
            );

        if (!button) return;


        const id =
            button.dataset.id;

        const action =
            button.dataset.action;


        if (action === "view") {

            viewMember(id);

        }


        if (action === "edit") {

            editMember(id);

        }


        if (action === "delete") {

            deleteMember(id);

        }

    }
);


// ==========================================
// VIEW MEMBER
// ==========================================

function viewMember(id) {

    const member =
        members.find(
            member =>
                member.id === id
        );

    if (!member) return;


    selectedMemberId = id;


    document.getElementById(
        "details-member-image"
    ).src =
        member.image ||
        defaultImage;


    document.getElementById(
        "details-member-name"
    ).textContent =
        member.name;


    document.getElementById(
        "details-member-relationship"
    ).textContent =
        formatText(
            member.relationship
        );


    document.getElementById(
        "details-member-dob"
    ).textContent =
        formatDate(
            member.dob
        );


    document.getElementById(
        "details-member-age"
    ).textContent =
        calculateAge(
            member.dob
        );


    document.getElementById(
        "details-member-gender"
    ).textContent =
        formatText(
            member.gender
        );


    document.getElementById(
        "details-member-bio"
    ).textContent =
        member.bio ||
        "No biography available.";


    detailsModal.classList.add(
        "active"
    );

}


// ==========================================
// CLOSE DETAILS MODAL
// ==========================================

function closeDetailsModal() {

    detailsModal.classList.remove(
        "active"
    );

    selectedMemberId = null;
}


document.getElementById(
    "close-details-modal"
).addEventListener(
    "click",
    closeDetailsModal
);


document.getElementById(
    "details-close-btn"
).addEventListener(
    "click",
    closeDetailsModal
);


detailsModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeDetailsModal
    );


// ==========================================
// DETAILS EDIT BUTTON
// ==========================================

document.getElementById(
    "details-edit-btn"
).addEventListener(
    "click",
    function () {

        if (!selectedMemberId) {
            return;
        }

        const id =
            selectedMemberId;

        closeDetailsModal();

        editMember(id);

    }
);


// ==========================================
// EDIT MEMBER
// ==========================================

function editMember(id) {

    const member =
        members.find(
            member =>
                member.id === id
        );

    if (!member) return;


    memberForm.reset();


    document.getElementById(
        "member-modal-title"
    ).textContent =
        "Edit Family Member";


    memberIdInput.value =
        member.id;

    memberNameInput.value =
        member.name;

    memberDobInput.value =
        member.dob;

    memberGenderInput.value =
        member.gender;

    memberRelationshipInput.value =
        member.relationship;

    memberBioInput.value =
        member.bio || "";


    updateRelatedToOptions(
        member.id
    );


    relatedToInput.value =
        member.relatedTo || "";


    memberModal.classList.add(
        "active"
    );

}


// ==========================================
// DELETE MEMBER
// ==========================================

function deleteMember(id) {

    const member =
        members.find(
            member =>
                member.id === id
        );

    if (!member) return;


    const confirmed =
        confirm(
            `Delete ${member.name} from your family tree?`
        );


    if (!confirmed) return;


    members =
        members.filter(
            member =>
                member.id !== id
        );


    // Remove broken relationships.

    members = members.map(
        member => {

            if (
                member.relatedTo === id
            ) {

                return {
                    ...member,
                    relatedTo: ""
                };

            }

            return member;

        }
    );


    saveMembers();

    renderApp();

}


// ==========================================
// RELATIONSHIP -> GENERATION
// ==========================================

function getGeneration(
    relationship
) {

    const grandparents = [
        "grandfather",
        "grandmother"
    ];


    const parents = [
        "father",
        "mother",
        "uncle",
        "aunt"
    ];


    if (
        grandparents.includes(
            relationship
        )
    ) {

        return "grandparents";

    }


    if (
        parents.includes(
            relationship
        )
    ) {

        return "parents";

    }


    return "children";

}


// ==========================================
// RENDER FAMILY TREE
// ==========================================

function renderTree(
    list = members
) {

    const generations = {
        grandparents: [],
        parents: [],
        children: []
    };


    list.forEach(member => {

        const generation =
            getGeneration(
                member.relationship
            );

        generations[
            generation
        ].push(member);

    });


    Object.keys(
        generations
    ).forEach(generation => {

        const container =
            document.querySelector(
                `.${generation} .generation-members`
            );

        if (!container) return;


        container.innerHTML = "";


        const generationMembers =
            generations[
                generation
            ];


        if (
            generationMembers.length === 0
        ) {

            container.innerHTML = `
                <p style="
                    color:#8a9690;
                    font-size:14px;
                ">
                    No members added
                </p>
            `;

            return;

        }


        generationMembers.forEach(
            member => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "tree-member";


                card.dataset.id =
                    member.id;


                card.innerHTML = `

                    <img
                        src="${escapeHTML(
                            member.image ||
                            defaultImage
                        )}"
                        alt="${escapeHTML(
                            member.name
                        )}"
                    >

                    <h4>
                        ${escapeHTML(
                            member.name
                        )}
                    </h4>

                    <span>
                        ${escapeHTML(
                            formatText(
                                member.relationship
                            )
                        )}
                    </span>

                `;


                card.addEventListener(
                    "click",
                    () =>
                        viewMember(
                            member.id
                        )
                );


                container.appendChild(
                    card
                );

            }
        );

    });

}


// ==========================================
// UPDATE STATS
// ==========================================

function updateStats() {

    document.getElementById(
        "total-members"
    ).textContent =
        members.length;


    const generations =
        new Set();


    members.forEach(member => {

        generations.add(
            getGeneration(
                member.relationship
            )
        );

    });


    document.getElementById(
        "total-generations"
    ).textContent =
        generations.size;


    // Approximate family branches
    // based on unique relationship links.

    const branches =
        new Set(
            members
                .filter(
                    member =>
                        member.relatedTo
                )
                .map(
                    member =>
                        member.relatedTo
                )
        );


    document.getElementById(
        "total-branches"
    ).textContent =
        branches.size;


    // Find oldest member.

    const validMembers =
        members.filter(
            member =>
                member.dob
        );


    if (
        validMembers.length === 0
    ) {

        document.getElementById(
            "oldest-generation"
        ).textContent = "--";

        return;

    }


    const oldestMember =
        [...validMembers].sort(
            (a, b) =>
                new Date(a.dob) -
                new Date(b.dob)
        )[0];


    document.getElementById(
        "oldest-generation"
    ).textContent =
        calculateAge(
            oldestMember.dob
        );

}


// ==========================================
// SEARCH & FILTER MEMBERS
// ==========================================

function filterMembers() {

    const searchValue =
        memberSearch.value
            .toLowerCase()
            .trim();


    const relationship =
        relationshipFilter.value;


    const filtered =
        members.filter(member => {

            const matchesSearch =
                member.name
                    .toLowerCase()
                    .includes(
                        searchValue
                    );


            const matchesRelationship =
                relationship === "all" ||
                member.relationship ===
                    relationship;


            return (
                matchesSearch &&
                matchesRelationship
            );

        });


    renderMembers(
        filtered
    );

}


memberSearch.addEventListener(
    "input",
    filterMembers
);


relationshipFilter.addEventListener(
    "change",
    filterMembers
);


// ==========================================
// SEARCH TREE
// ==========================================

treeSearch.addEventListener(
    "input",
    function () {

        const searchValue =
            treeSearch.value
                .toLowerCase()
                .trim();


        if (!searchValue) {

            renderTree(
                members
            );

            return;

        }


        const filtered =
            members.filter(
                member =>
                    member.name
                        .toLowerCase()
                        .includes(
                            searchValue
                        )
            );


        renderTree(
            filtered
        );

    }
);


// ==========================================
// ESC KEY CLOSE MODALS
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        if (
            memberModal.classList.contains(
                "active"
            )
        ) {

            closeMemberModal();

        }


        if (
            detailsModal.classList.contains(
                "active"
            )
        ) {

            closeDetailsModal();

        }

    }
);


// ==========================================
// CURRENT YEAR
// ==========================================

document.getElementById(
    "current-year"
).textContent =
    new Date().getFullYear();


// ==========================================
// RENDER COMPLETE APP
// ==========================================

function renderApp() {

    renderMembers();

    renderTree();

    updateStats();

    updateRelatedToOptions();

}


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

renderApp();
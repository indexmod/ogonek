const API_URL = "https://YOUR-BACKEND-URL";

const message = document.getElementById("message");
const status = document.getElementById("status");

let saveTimer = null;
let lastServerValue = "";
let isSaving = false;

async function loadMessage() {
    try {
        status.textContent = "loading...";

        const response = await fetch(`${API_URL}/message`, {
            method: "GET",
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        lastServerValue = data.message || "";

        if (document.activeElement !== message) {
            message.value = lastServerValue;
        }

        status.textContent = "online";
    } catch (error) {
        console.error(error);
        status.textContent = "offline";
    }
}

async function saveMessage() {
    if (isSaving) {
        return;
    }

    const value = message.value;

    if (value === lastServerValue) {
        return;
    }

    try {
        isSaving = true;
        status.textContent = "saving...";

        const response = await fetch(`${API_URL}/message`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: value
            })
        });

        if (!response.ok) {
            throw new Error("Save error");
        }

        lastServerValue = value;

        status.textContent = "online";
    } catch (error) {
        console.error(error);
        status.textContent = "offline";
    } finally {
        isSaving = false;
    }
}

message.addEventListener("input", () => {
    status.textContent = "editing...";

    clearTimeout(saveTimer);

    saveTimer = setTimeout(() => {
        saveMessage();
    }, 500);
});

setInterval(async () => {
    if (document.activeElement === message) {
        return;
    }

    await loadMessage();
}, 1500);

loadMessage();

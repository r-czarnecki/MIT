const errors : HTMLDivElement[] = Array.from(document.querySelectorAll("#error_types > div"));

function deselect() {
    for (const errorDiv of errors) {
        const img = errorDiv.querySelector("img");
        img.src = "images/icons/circle_not_selected.png";
    }
}

for (const errorDiv of errors) {
    errorDiv.onclick = (ev: MouseEvent) => {
        deselect();
        const img = errorDiv.querySelector("img");
        if (img.src.includes("images/icons/circle_not_selected.png")) {
            img.src = "images/icons/circle_selected.png"
        }
        else {
            img.src = "images/icons/circle_not_selected.png";
        }
    }
}


import { floors, pointers, rooms, pointerInterface } from "./config.js";

interface Window {
  showDetails: any;
}

let currentFloor: Number = 1;

function showPointers(pointerTypes: [string]) {
  const pointersDiv = document.querySelector("#pointers");
  pointersDiv.innerHTML = "";

  if (currentFloor === null) {
    return;
  }

  const visiblePointers: [string, pointerInterface][] = [];
  for (const pointerType of pointerTypes) {
    for(const pointer of pointers[pointerType]["pointers"]) {
      if (pointer.floor == currentFloor) {
        visiblePointers.push([pointers[pointerType]["pointer_photo"], pointer]);
      }
    }
  }

  console.log(visiblePointers)

  for (const [photo, pointer] of visiblePointers) {
    const newPointer = document.createElement("img");
    newPointer.src = photo;
    newPointer.classList.add("pin")
    console.log(pointer.x.toString())
    console.log(pointer.y.toString())
    newPointer.onclick = (ev: MouseEvent) => {
      (parent as any).showDetails(pointer.id);
    };
    newPointer.style.left = pointer.x.toString() + "%";
    newPointer.style.top = pointer.y.toString() + "%";
    pointersDiv.appendChild(newPointer)
  }
}

(window as any).showPointers = showPointers
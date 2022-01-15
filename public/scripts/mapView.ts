import { floors, pointers, rooms, pointerInterface, roomInterface } from "./config.js";

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

function showRoom(id: string) {
  const roomElement = document.querySelector("#room") as HTMLDivElement
  const roomImgElement = document.querySelector("#room img") as HTMLImageElement
  const roomPElement = document.querySelector("#room p") as HTMLParagraphElement
  roomImgElement.innerHTML = "";
  roomImgElement.src = "";
  roomImgElement.style.display = "none";
  roomPElement.innerText = "";

  let foundRoom : roomInterface = null;
  let foundRoomName : string = null;
  for (const roomName in rooms) {
    const room = rooms[roomName]
    if (room.floor === currentFloor && room.id === id) {
      foundRoom = room;
      foundRoomName = roomName;
      break;
    }
  }

  if (foundRoom === null) {
    return;
  }

  roomImgElement.style.display = "initial";
  roomImgElement.src = foundRoom.overlay_photo;
  roomElement.style.width = foundRoom.width.toString() + "%";
  roomElement.style.height = foundRoom.height.toString() + "%";
  roomElement.style.left = foundRoom.x.toString() + "%";
  roomElement.style.top = foundRoom.y.toString() + "%";
  roomPElement.innerText = foundRoomName;

  roomElement.onclick = (ev: MouseEvent) => {
    (parent as any).showDetails(foundRoom.id);
  }
}

function showFloor(floor: number) {}

(window as any).showPointers = showPointers;
(window as any).showRoom = showRoom;
(window as any).showFloor = showFloor;
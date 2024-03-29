import { floors, pointers, rooms, pointerInterface, roomInterface } from "./config.js";

interface Window {
  showDetails: any;
}

let currentFloor: Number = null;
let lastPointers: string[] = []

function clearPointers() {
  const pointersDiv = document.querySelector("#pointers");
  pointersDiv.innerHTML = "";
}

function clearRoom() {
  const roomImgElement = document.querySelector("#room img") as HTMLImageElement
  const roomPElement = document.querySelector("#room p") as HTMLParagraphElement
  roomImgElement.innerHTML = "";
  roomImgElement.src = "";
  roomImgElement.style.display = "none";
  roomPElement.innerText = "";
}

function showPointers(pointerTypes: string[]) {
  const pointersDiv = document.querySelector("#pointers");
  clearPointers();

  lastPointers = pointerTypes;
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
  clearRoom();

  if (currentFloor === null) {
    return;
  }

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

  const floor = floors[foundRoom.floor.toString()]
  roomPElement.style.fontSize = Math.min(floor.height, floor.width).toString() + "%";

  roomElement.onclick = (ev: MouseEvent) => {
    (parent as any).showDetails(foundRoom.id);
  }

  roomElement.scrollIntoView();
}

function showFloor(floor: number) {
  clearPointers();
  clearRoom();

  currentFloor = floor;
  const mainDiv = document.querySelector("body > div") as HTMLDivElement;
  const floorElement = document.querySelector("#floor") as HTMLImageElement;
  const floorInfo = floors[floor.toString()];

  floorElement.src = floorInfo.photo;
  // mainDiv.style.height = floorInfo.height + "%";
  mainDiv.style.width = floorInfo.width + "%";

  showPointers(lastPointers);
}

(window as any).showPointers = showPointers;
(window as any).showRoom = showRoom;
(window as any).showFloor = showFloor;
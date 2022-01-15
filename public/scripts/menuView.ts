import { floors } from "./config.js";

interface Window {
  test: any;
}
(() => {
  const mapIFrame = document.querySelector("iframe").contentWindow as any;

  // STATE
  let state: {
    currentFloor: number;
  };

  // INIT

  mapIFrame.onload = () => {
    state = {
      currentFloor: 1,
    };
    showFloor(state.currentFloor);
  };

  // FLOOR OPTIONS

  const showFloor = (floor: number) => {
    mapIFrame.showFloor(floor);
    document
      .getElementById(`floorButton-${state.currentFloor}`)
      .classList.remove("floorButton__active");
    document
      .getElementById(`floorButton-${floor}`)
      .classList.add("floorButton__active");
    state.currentFloor = floor;
  };

  const floorsOptions = document.getElementById("floorsOptions");

  const floorsMap = new Map(Object.entries(floors));
  floorsMap.forEach((_, floor) => {
    let FloorButton = document.createElement("button");
    FloorButton.innerHTML = floor;
    FloorButton.classList.add("floorButton");
    FloorButton.id = `floorButton-${floor}`;
    FloorButton.addEventListener("click", () => {
      showFloor(parseInt(floor));
    });
    floorsOptions.appendChild(FloorButton);
  });

  // POINTERS MENU

  const pointersMenuExpanded = document.getElementById("pointersMenuExpanded");
  const pointersMenuCollapsed = document.getElementById(
    "pointersMenuCollapsed"
  );
  const closePointersMenu = document.getElementById("closePointersMenu");

  const pointersMenuOpen = () => {
    pointersMenuCollapsed.style.display = "none";
    pointersMenuExpanded.style.display = "block";
  };

  const pointersMenuClose = () => {
    pointersMenuCollapsed.style.display = "flex";
    pointersMenuExpanded.style.display = "none";
  };

  closePointersMenu.addEventListener("click", pointersMenuClose);
  pointersMenuCollapsed.addEventListener("click", pointersMenuOpen);
})();

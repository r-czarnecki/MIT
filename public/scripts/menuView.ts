import { floors } from "./config.js";

interface Window {
  test: any;
}
(() => {
  const mapIFrame = document.querySelector("iframe").contentWindow as any;

  // INIT

  mapIFrame.onload = () => {
    mapIFrame.showFloor(1);
  };

  // FLOOR OPTIONS

  const floorsOptions = document.getElementById("floorsOptions");

  const floorsMap = new Map(Object.entries(floors));
  floorsMap.forEach((_, floor) => {
    let FloorButton = document.createElement("button");
    FloorButton.innerHTML = floor;
    FloorButton.classList.add("floorButton");
    FloorButton.addEventListener("click", () => {
      mapIFrame.showFloor(parseInt(floor));
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

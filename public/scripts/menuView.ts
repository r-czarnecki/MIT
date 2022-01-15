interface Window {
  test: any;
}

const pointersMenuExpanded = document.getElementById("pointersMenuExpanded");
const pointersMenuCollapsed = document.getElementById("pointersMenuCollapsed");

const pointersMenuOpen = () => {
  pointersMenuCollapsed.style.display = "none";
  pointersMenuExpanded.style.display = "block";
};

const pointersMenuClose = () => {
  pointersMenuCollapsed.style.display = "flex";
  pointersMenuExpanded.style.display = "none";
};

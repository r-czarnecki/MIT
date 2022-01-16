import { floors, pointers, rooms } from "./config.js";

interface Window {
  test: any;
}
(() => {
  const menuNode = document.getElementById("menuNode");
  menuNode.style.height = window.innerHeight + "px";

  const mapIFrame = document.querySelector("iframe").contentWindow as any;

  // STATE
  let state: {
    currentFloor: number;
    shownPointers: string[];
    searchValue: string;
  };

  // INIT

  mapIFrame.onload = () => {
    state = {
      currentFloor: 1,
      shownPointers: [],
      searchValue: "",
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

  const showPointer = (pointerName: string, pointerCheckboxNode: any) => {
    if (state.shownPointers.includes(pointerName)) {
      state.shownPointers = state.shownPointers.filter(
        (shownPointer) => shownPointer !== pointerName
      );
      pointerCheckboxNode.src = "../images/icons/checkbox_false.png";
    } else {
      state.shownPointers.push(pointerName);
      pointerCheckboxNode.src = "../images/icons/checkbox_true.png";
    }
    mapIFrame.showPointers(state.shownPointers);
  };

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

  const pointersMap = new Map(Object.entries(pointers));
  let pointersGroupedByCategory = new Map();
  pointersMap.forEach((pointer, pointerName) => {
    let category = pointer.category;
    if (!pointersGroupedByCategory.has(category)) {
      pointersGroupedByCategory.set(category, []);
    }
    pointersGroupedByCategory.get(category).push(pointerName);
  });

  const pointersOptions = document.getElementById("pointersMenuExpanded");
  pointersGroupedByCategory.forEach((pointers, category) => {
    let categoryNode = document.createElement("div");
    categoryNode.classList.add("pointersOptions__category");
    let categoryHeaderNode = document.createElement("div");
    categoryHeaderNode.classList.add("pointersOptions__category__header");
    categoryHeaderNode.innerHTML = category;
    categoryNode.appendChild(categoryHeaderNode);
    let categoryOptionsNode = document.createElement("div");
    categoryOptionsNode.classList.add("pointersOptions__category__options");
    pointers.forEach((pointerName: string) => {
      let pointerNode = document.createElement("div");
      pointerNode.classList.add("pointersOptions__category__option");
      let pointerCheckboxNode = document.createElement("img");
      pointerCheckboxNode.src = "../images/icons/checkbox_false.png";
      pointerCheckboxNode.classList.add("checkbox");
      pointerNode.appendChild(pointerCheckboxNode);
      let pointerNameNode = document.createElement("p");
      pointerNameNode.innerHTML = pointerName;
      pointerNode.appendChild(pointerNameNode);
      pointerNode.addEventListener("click", () => {
        showPointer(pointerName, pointerCheckboxNode);
      });

      categoryOptionsNode.appendChild(pointerNode);
    });
    categoryNode.appendChild(categoryOptionsNode);
    pointersOptions.appendChild(categoryNode);
  });

  // ROOMS

  const searchInput = document.getElementById(
    "searchInput"
  ) as HTMLInputElement;
  const searchButton = document.getElementById("searchButton");
  const searchDropdown = document.getElementById("searchDropdown");

  // detect focus
  document.addEventListener("click", (e) => {
    if (e.target == searchInput || e.target == searchDropdown) {
      searchDropdown.style.display = "block";
    } else {
      searchDropdown.style.display = "none";
    }
  });

  searchInput.addEventListener("input", (e: any) => {
    console.log(e.target.value);

    let searchValue = e.target.value;
    state.searchValue = searchValue;
    let searchDropdownItems = document.querySelectorAll(
      ".search__dropdown_item"
    );
    searchDropdownItems.forEach((item: HTMLElement) => {
      if (item.innerHTML.includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  const roomsMap = new Map(Object.entries(rooms));

  const showRoom = (roomName: string) => {
    const roomToFind = roomsMap.get(roomName);
    showFloor(roomToFind.floor);
    mapIFrame.showRoom(roomToFind.id);
  };

  roomsMap.forEach((room, roomName) => {
    let roomOption = document.createElement("div");
    roomOption.classList.add("search__dropdown_item");
    roomOption.innerHTML = roomName;
    roomOption.addEventListener("click", () => {
      searchInput.value = roomName;

      searchDropdown.style.display = "none";
      showRoom(roomName);
    });
    searchDropdown.appendChild(roomOption);
  });

  searchButton.addEventListener("click", () => {
    console.log(state.searchValue);

    const searchValue = searchInput.value;
    showRoom(searchValue);
  });

  // DETAILS

  const details = document.getElementById("details");
  const closeDetails = document.getElementById("closeDetails");
  closeDetails.addEventListener("click", () => {
    pointersMenuCollapsed.style.display = "flex";

    details.style.display = "none";
  });
})();

// DETAILS

const fillDetails = (details: { [title: string]: string }) => {
  const detailsContentNode = document.getElementById("detailsContent");
  detailsContentNode.innerHTML = "";
  const detailsMap = new Map(Object.entries(details));
  detailsMap.forEach((value, title) => {
    let detailNode = document.createElement("div");
    detailNode.classList.add("details__content__info");
    let detailTitleNode = document.createElement("div");
    detailTitleNode.classList.add("details__content__info__title");
    detailTitleNode.innerHTML = title;
    detailNode.appendChild(detailTitleNode);
    let detailValueNode = document.createElement("div");
    detailValueNode.classList.add("details__content__info__description");
    detailValueNode.innerHTML = value;
    detailNode.appendChild(detailValueNode);
    detailsContentNode.appendChild(detailNode);
  });
};

const showDetails = (id: string) => {
  const pointersMenuCollapsed = document.getElementById(
    "pointersMenuCollapsed"
  );
  pointersMenuCollapsed.style.display = "none";

  const details = document.getElementById("details");
  const detailsTitle = document.getElementById("detailsTitle");
  const detailsContent = document.getElementById("detailsContent");
  const detailsImage = document.getElementById(
    "detailsImage"
  ) as HTMLImageElement;

  const roomsMap = new Map(Object.entries(rooms));
  roomsMap.forEach((room, roomName) => {
    if (room.id == id) {
      detailsTitle.innerHTML = roomName;
      detailsImage.src = room.photo;
      fillDetails(room.details);
    }
  });

  const pointersMap = new Map(Object.entries(pointers));
  pointersMap.forEach(({ pointers }, pointerName) => {
    pointers.forEach((pointer) => {
      if (pointer.id == id) {
        detailsTitle.innerHTML = pointerName;
        detailsImage.src = pointer.photo;
        fillDetails(pointer.details);
      }
    });
  });

  details.style.display = "block";
};

(window as any).showDetails = showDetails;

interface floorsInterface {
    [floor: string]: {
        "photo": string,
        "width": number,
        "height": number
    }
}

export const floors : floorsInterface = {
  "1": {
    photo: "images/floor1.jpg",
    width: 100,
    height: 100,
  },
  "2": {
      photo: "images/floor2.jpg",
      width: 75,
      height: 75
  }
};

export interface pointerInterface {
  id: string;
  x: number;
  y: number;
  floor: number;
  photo: string;
  details: {
    [title: string]: string;
  };
}

interface pointersInterface {
  [name: string]: {
    category: string;
    pointer_photo: string;
    pointers: pointerInterface[];
  };
}

export const pointers: pointersInterface = {
  winda: {
    pointer_photo: "images/elevator_pin.png",
    category: "Poruszanie się",

    pointers: [
      {
        id: "ahsgdqb",
        x: 58.1,
        y: 54.4,
        floor: 1,
        photo: "images/elevator.jpg",
        details: {
          Oświetlenie: "Światło jest bardzo zimne, ale nie mocne.",
          Dostępność:
            "W windzie mieści się wózek elektryczny (szerokość 110 cm). Winda ma informację głosową.",
        },
      },
      {
        id: "uwerunvdx",
        x: 4.29,
        y: 85.9,
        floor: 2,
        photo: "images/elevator.jpg",
        details: {
          Tytuł1: "Opis1",
          Tytuł2: "Opis2",
          Tytuł3: "Opis3",
        },
      },
    ],
  },
  schody: {
    pointer_photo: "images/stairs_pin.png",
    category: "Poruszanie się",

    pointers: [
      {
        id: "weuiruuh",
        x: 9.4,
        y: 86.6,
        floor: 1,
        photo: "images/stairs1.png",
        details: {
          Materiał: "Drewno",
        },
      },
      {
        id: "hwieruhvd",
        x: 98.1,
        y: 60,
        floor: 1,
        photo: "images/stairs2.png",
        details: {
          Materiał: "Kamień",
        },
      },
      {
        id: "pmvbvcgffd",
        x: 19.97,
        y: 40.51,
        floor: 2,
        photo: "images/stairs2.png",
        details: {
          Tytuł1: "Opis1",
          Tytuł2: "Opis2",
          Tytuł3: "Opis3",
        },
      },
    ],
  },
};

export interface roomInterface {
  id: string;
  x: number;
  y: number;
  floor: number;
  overlay_photo: string;
  width: number;
  height: number;
  photo: string;
  details: {
    [title: string]: string;
  };
}
interface roomsInterface {
  [roomName: string]: roomInterface;
}

export const rooms: roomsInterface = {
  "Sala A": {
    id: "weijriunkf",
    x: 20.75,
    y: 83.1,
    floor: 1,
    overlay_photo: "images/square.jpg",
    width: 4.2,
    height: 13.4,
    photo: "images/salaA.jpg",
    details: {
      Hałas:
        "Sala znajduje się od strony ulicy. Przy otwartych oknach słychać przejeżdżające samochody.",
      Oświetlenie:
        "Dużo możliwości regulacji oświetlenia. Rząd lamp dających ciepłe światło przy ścianie. Na suficie jarzeniówki.",
      Dostępność: "Dwa miejsca dla wózków z przodu sali.",
      "Dodatkowe uwagi":
        "Okna są nieszczelne. Zimą radzimy siadać od strony drzwi.",
    },
  },
  "Łazienka 1. piętro": {
    id: "iewruuiwt",
    x: 87.7,
    y: 52,
    floor: 1,
    overlay_photo: "images/lazienka1p_shape.png",
    width: 5.2,
    height: 26,
    photo: "images/lazienka1p.jpg",
    details: {
      Tytuł1: "Opis1",
      Tytuł2: "Opis2",
    },
  },
  "Sala B": {
      id: "tczmnabd",
      x: 85.79,
      y: 74.84,
      floor: 2,
      overlay_photo: "images/square.jpg",
      width: 10.06,
      height: 20.19,
      photo: "images/salaA.jpg",
      details: {
        Tytuł1: "Opis1",
        Tytuł2: "Opis2",
        Tytuł3: "Opis3",
      }
  },
  "Sala C": {
      id: "ieowoiquwe",
      x: 73.63,
      y: 12.34,
      floor: 2,
      overlay_photo: "images/square.jpg",
      width: 17.51,
      height: 24.84,
      photo: "images/salaA.jpg",
      details: {
        Tytuł1: "Opis1",
        Tytuł2: "Opis2",
        Tytuł3: "Opis3",
      }
  },
  "Łazienka 2. piętro": {
      id: "lxcvnsbfsd",
      x: 61.15,
      y: 69.09,
      floor: 2,
      overlay_photo: "images/lazienka2p_shape.png",
      width: 15.66,
      height: 14.26,
      photo: "images/lazienka1p.jpg",
      details: {
        Tytuł1: "Opis1",
        Tytuł2: "Opis2",
      },
  }
};

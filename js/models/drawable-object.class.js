class DrawableObject {
  img;
  height;
  width;
  x;
  y;
  amount = 0;
  world;

  /** Setzt die wichtigsten Parameter, die alle Gegenstände in der Welt benötigen */
  constructor() {
  }

/** Erstellt ein neues Bild und üer gebt mit "path" die source des Bildes */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /** Funktion erhöht einen Zähler, durch den die Statusbars aktualisiert werden */
  collect() {
    this.amount += 20;
    if (this.amount === 100) {
      this.amount = 100;
    }
  }
}

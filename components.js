var loc = {
    name: "location",
    x: 0,
    y: 0,
    init: function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}

function Squere(p, x, y, width, height) {
    this.name = "squere";
    this.parent = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function DisplaySolid(p) {
    this.name = "displaySolid";
    this.parent = p;
    this.color = "#00A";
    this.squere = this.parent.model["squere"];
    this.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.squere.x, this.squere.y, this.squere.width, this.squere.height);
    }
}

function ArrowMove(p) {
    this.name = "arrowMove";
    this.category = "controller";
    this.parent = p;
    this.squere = this.parent.model["squere"];
    this.update = function () {
        if (Key.isDown(Key.UP)) this.squere.y--;
        if (Key.isDown(Key.LEFT)) this.squere.x--;
        if (Key.isDown(Key.DOWN)) this.squere.y++;
        if (Key.isDown(Key.RIGHT)) this.squere.x++;
    }
}

function ImageModel(p, path) {
    this.name = "imageModel";
    this.imageObj = new Image();
    this.imageObj.src = path;
    this.parent = p;
}

function DisplayImage(p){
    console.log(p.model["imageModel"]);
    this.draw = function () {
        canvas.drawImage(p.model["imageModel"].imageObj, p.model["squere"].x, p.model["squere"].y);
    }
}
// MODEL
function Square(p, x, y, width, height) {
    this.name = "square";
    this.parent = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function ImageModel(p, path) {
    this.name = "imageModel";
    this.imageObj = new Image();
    this.imageObj.src = path;
    this.parent = p;
}

// VIEW
function DisplaySolid(p) {
    this.name = "displaySolid";
    this.parent = p;
    this.color = "#00A";
    this.square = this.parent.model["square"];
    this.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.square.x, this.square.y, this.square.width, this.square.height);
    }
}

function DisplayImage(p) {
    this.name = "displayImage";
    this.draw = function () {
        canvas.drawImage(p.model["imageModel"].imageObj,
            p.model["square"].x,
            p.model["square"].y,
            p.model["square"].width,
            p.model["square"].height);
    }
}

function DisplaySelect(p) {
    this.name = "displaySelect";
    this.square = p.model['square'];
    this.draw = function () {
        if (p.controller['selectable'].selected) {
            canvas.beginPath();
            canvas.lineWidth = "1";
            canvas.strokeStyle = "red";
            canvas.rect(this.square.x, this.square.y, this.square.width, this.square.height);
            canvas.stroke();
        }
    }
}

// CONTROLLER
function ArrowMove(p) {
    this.name = "arrowMove";
    this.parent = p;
    this.square = this.parent.model["square"];
    this.update = function () {
        if (Key.isDown(Key.UP)) this.square.y--;
        if (Key.isDown(Key.LEFT)) this.square.x--;
        if (Key.isDown(Key.DOWN)) this.square.y++;
        if (Key.isDown(Key.RIGHT)) this.square.x++;
    }
}

function Selectable(p) {
    this.name = "selectable";
    this.selected = false;
    this.update = function () {
        if (!this.selected && !Mouse._used &&
            this.isPressed(p.model['square'], Mouse._clicked.x, Mouse._clicked.y)) {
            this.selected = true;
            Mouse._used = true;
        } else if (!Mouse._used && this.selected && !this.isPressed(p.model['square'], Mouse._clicked.x, Mouse._clicked.y)) {
            this.selected = false;
            Mouse._used = false;
        }
    };
    this.isPressed = function (square, x, y) {
        return x > square.x && x < square.x + square.width && y > square.y && y < square.y + square.height
    };
}
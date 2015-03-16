// MODEL
function Squere(p, x, y, width, height) {
    this.name = "squere";
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
    this.squere = this.parent.model["squere"];
    this.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.squere.x, this.squere.y, this.squere.width, this.squere.height);
    }
}

function DisplayImage(p) {
    this.name = "displayImage";
    this.draw = function () {
        canvas.drawImage(p.model["imageModel"].imageObj,
            p.model["squere"].x,
            p.model["squere"].y,
            p.model["squere"].width,
            p.model["squere"].height);
    }
}

function DisplaySelect(p) {
    this.name = "displaySelect";
    this.squere = p.model['squere'];
    this.draw = function () {
        if (p.controller['selectable'].selected) {
            canvas.beginPath();
            canvas.lineWidth = "1";
            canvas.strokeStyle = "red";
            canvas.rect(this.squere.x, this.squere.y, this.squere.width, this.squere.height);
            canvas.stroke();
        }
    }
}

// CONTROLLER
function ArrowMove(p) {
    this.name = "arrowMove";
    this.parent = p;
    this.squere = this.parent.model["squere"];
    this.update = function () {
        if (Key.isDown(Key.UP)) this.squere.y--;
        if (Key.isDown(Key.LEFT)) this.squere.x--;
        if (Key.isDown(Key.DOWN)) this.squere.y++;
        if (Key.isDown(Key.RIGHT)) this.squere.x++;
    }
}

function Selectable(p) {
    this.name = "selectable";
    this.selected = false;
    this.update = function () {
        if (!this.selected && !Mouse._used &&
            this.isPressed(p.model['squere'], Mouse._clicked.x, Mouse._clicked.y)) {
            this.selected = true;
            Mouse._used = true;
        } else if (!Mouse._used && this.selected && !this.isPressed(p.model['squere'], Mouse._clicked.x, Mouse._clicked.y)) {
            this.selected = false;
            Mouse._used = false;
        }
    };
    this.isPressed = function (squere, x, y) {
        return x > squere.x && x < squere.x + squere.width && y > squere.y && y < squere.y + squere.height
    };
}
// MODEL
function Square(p, x, y, width, height, autoAddView) {
    this.name = "square";
    this.parent = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if(autoAddView){
        p.addView(new DisplaySolid(p));
    }
}

function ImageModel(p, path, autoAddView) {
    var that = this;
    this.p = p;
    this.name = "imageModel";
    this.imageObj = new Image();

    this.imageObj.onload = function() {
        that.width = that.imageObj.naturalWidth;
        that.height = that.imageObj.naturalHeight;

        if (!that.p.model.hasOwnProperty("square")) {
            that.p.addModel(new Square(that.p, 0, 0, that.width, that.height));
        }
    };

    this.imageObj.src = path;
    if(autoAddView){
        this.p.addView(new DisplayImage(p));
    }
}

// VIEW
function DisplaySolid(p) {
    this.name = "displaySolid";
    if (!p.model.hasOwnProperty("square")) {
        p.addModel(new Square(p, 10, 10, 10, 10));
    }
    this.color = "#00A";
    this.square = p.model["square"];
    this.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.square.x, this.square.y, this.square.width, this.square.height);
    }
}

function DisplayImage(p) {
    this.name = "displayImage";
    if (!p.model.hasOwnProperty("imageModel")) {
        p.addModel(new ImageModel(p, "img/idiot.gif"));
    }
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
    if (!p.model.hasOwnProperty("square")) {
        p.addModel(new Square(p, 10, 10, 10, 10));
    }
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
    var that = this;
    this.name = "arrowMove";
    this.parent = p;
    this.square = this.parent.model["square"];
    this.update = function () {
        if (Key.isDown(Key.UP)) that.square.y--;
        if (Key.isDown(Key.LEFT)) that.square.x--;
        if (Key.isDown(Key.DOWN)) that.square.y++;
        if (Key.isDown(Key.RIGHT)) that.square.x++;
    }
}

function Selectable(p) {
    this.name = "selectable";
    p.addView(new DisplaySelect(p));
    if (!p.model.hasOwnProperty("square")) {
        p.addModel(new Square(p, 10, 10, 10, 10));
    }
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
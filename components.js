// MODEL
function Square(p, x, y, width, height, autoAddView, gridLocation) {
    this.name = "square";
    this.gridLocation = gridLocation;
    this.parent = p;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (this.gridLocation) {
        this.width = GRID_SIZE;
        this.height = GRID_SIZE;
    }
    if (autoAddView) {
        p.addView(new DisplaySolid(p));
    }
}

function ImageModel(p, image, autoAddView) {
    var that = this;
    this.image = image;
    that.p = p;
    that.name = "imageModel";

    this.image.onload = function() {
        that.width = that.image.naturalWidth;
        that.height = that.image.naturalHeight;

        if (that.p.model['square'].width == -1 || that.p.model['square'].height == -1) {
            that.p.model['square'].width = that.width;
            that.p.model['square'].height = that.height;
        }
    };

    if (autoAddView) {
        this.p.addView(new DisplayImage(p));
    }
}

// VIEW
function DisplaySolid(p) {
    this.name = "displaySolid";
    if (!p.model.hasOwnProperty("square")) {
        p.addModel(new Square(p, 10, 10, 10, 10, false));
    }
    this.color = "#00A";
    this.square = p.model["square"];
    this.draw = function (canvas) {
        canvas.fillStyle = this.color;
        if (this.square.gridLocation) {
            canvas.fillRect(this.square.x * GRID_SIZE, this.square.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        } else {
            canvas.fillRect(this.square.x, this.square.y, this.square.width, this.square.height);
        }
    }
}

function DisplayImage(p) {
    var that = this;
    this.name = "displayImage";
    this.p = p;
    this.draw = function (canvas) {
        if (that.p.model['square'].gridLocation) {
            canvas.drawImage(that.p.model["imageModel"].image,
                that.p.model["square"].x * GRID_SIZE,
                that.p.model["square"].y * GRID_SIZE,
                GRID_SIZE,
                GRID_SIZE);
        } else {
            canvas.drawImage(that.p.model["imageModel"].image,
                that.p.model["square"].x,
                that.p.model["square"].y,
                that.p.model["square"].width,
                that.p.model["square"].height);
        }
    }
}

function DisplaySelect(p) {
    this.name = "displaySelect";
    this.square = p.model['square'];
    this.draw = function (canvas) {
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
        p.addModel(new Square(p, 10, 10, 10, 10, false));
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
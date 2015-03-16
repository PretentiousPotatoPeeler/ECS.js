var Entity = function (name) {
    this.name = name;
    this.model = {};
    this.view = {};
    this.controller = {};

    this.addModel = function (component) {
        if (!this.model.hasOwnProperty(component.name))
            this.model[component.name] = component;
    };

    this.getModel = function (component) {
        return this.model[component];
    };

    this.addView = function (component) {
        if (!this.view.hasOwnProperty(component.name))
            this.view[component.name] = component;
    };

    this.getView = function (component) {
        return this.view[component];
    };

    this.addController = function (component) {
        if (!this.controller.hasOwnProperty(component.name))
            this.controller[component.name] = component;
    };

    this.getController = function (component) {
        return this.controller[component];
    };
}
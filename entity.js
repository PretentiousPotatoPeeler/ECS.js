var Entity = function(name) {
	this.name = name;
	this.model = {};
	this.view = {};
    this.controller = {};

	this.addModel = function(component){
		this.model[component.name] = component;
	};

	this.getModel = function(component){
		return this.model[component];
	};

	this.addView = function(component){
		this.view[component.name] = component;
	};

	this.getView = function(component){
		return this.view[component];
	};

    this.addController = function(component){
		this.controller[component.name] = component;
	};

	this.getController = function(component){
		return this.controller[component];
	};
}
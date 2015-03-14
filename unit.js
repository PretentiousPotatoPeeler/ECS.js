var Unit = function(name) {
	this.name = name;
	this.data = {};
	this.logic = {};
	this.addData = function(component){
		this.data[component.name] = component;
	}
	this.getData = function(component){
		return this.data[component];
	}
	this.addLogic = function(component){
		this.logic[component.name] = component;
	}
	this.getLogic = function(component){
		return this.logic[component	];
	}
}
/**
 * 
 * 虚拟dom节点对象
 * @ProjectName : GISMap
 * @Package     : js
 * @ClassName   : XuNiDom
 * @Description : 虚拟dom节点对象
 * @Author      : TimTsang
 * @CreateDate  : 2014年11月25日
 * @Version     : [v1.0]
 * 
 */

/**
 * 创建虚拟dom节点对象
 */
function XuNiDom(id,className,type,domType,style){
	this.id = id;
	this.className = className;
	this.type = type;
	this.domType = domType;
	this.style = style;
};
/**
 * 设置dom节点类型。
 * @param domTypeName string类型。
 */
XuNiDom.prototype.setDomType = function(domTypeName) {
	this.domType = document.createElement(domTypeName);// 动态生成dom节点;
};
/**
 * 获取dom节点。
 */
XuNiDom.prototype.getDomType = function() {
	return this.domType;
};
/**
 * 设置dom节点的id。
 * @param id string类型。
 */
XuNiDom.prototype.setId = function(id) {
	this.getDomType().id = id;
};
/**
 * 获取id。
 */
XuNiDom.prototype.getId = function() {
	return this.getDomType().id;
};
/**
 * 设置dom节点的className。
 * @param className string类型。
 */
XuNiDom.prototype.setClassName = function(className) {
	this.getDomType().className = className;
};
/**
 * 获取className。
 */
XuNiDom.prototype.getClassName = function() {
	return this.getDomType().className;
};
/**
 * 设置dom节点的type。
 * @param type string类型。
 */
XuNiDom.prototype.setType = function(type) {
	this.getDomType().type = type;
};
/**
 * 获取type。
 */
XuNiDom.prototype.getType = function() {
	return this.getDomType().type;
};
/**
 * 设置dom节点的style。
 * @param style string类型。
 */
XuNiDom.prototype.setStyle = function(style) {
	this.getDomType().style = style;
};
/**
 * 获取style。
 */
XuNiDom.prototype.getStyle = function() {
	return this.getDomType().style;
};
/**
 * 创建dom节点。
 * @param parentId，domType string类型。
 */
XuNiDom.prototype.creatDom = function(parentId,domType){
	document.getElementById(parentId).appendChild(domType);
};

/**
 * 删除dom节点。
 * @param parentId，domType string类型。
 *//*
XuNiDom.prototype.deleteDom = function(parentId,domType){
	document.getElementById(parentId).removeChild(domType);
};*/

var myCanvas = document.getElementById("myCanvas");
var bidDiv = document.getElementById("bigDiv");
var bigCanvas = document.getElementById("bigCanvas");
var fac = document.getElementById("fac");
var headerRooms = document.getElementById("headerRooms");
var roomList = document.getElementsByClassName("roomList");
//var roomListLabel = document.getElementsByClassName("roomListlabel");
var optList = document.getElementsByClassName("optList");
//var optListp = document.getElementsByClassName("optListp");
document.body.onload = load;
myCanvas.onclick = showCanvas;
bidDiv.onclick = closeCanvas;
function load() {
	setInterval(myCanvasFuc, 1000 / 20);
	initUnList(roomList);
	initUnList(optList);
}
function initUnList(list) {
	var length = list.length;
	var i = parseInt(length / 2);
	// console.log("length"+length+" i"+i);
	var limit = i + 2;
	for (; i < length; i++) {
		// console.log(room[i].id);
		list[i].onclick = changeList;
		if (i < limit)
			list[i - limit + 2].style.display = "block";
		else
			list[i].style.display = "block";
	}
}

function changeList(event) {
	// roomUnList//optUnList
	//console.log(event.srcElement.id);
	var temp = event.srcElement;
	var list;
	//console.log(temp.className);
	switch (temp.className) {
	case 'roomListlabel':
		list = roomList;
		temp=event.srcElement.parentNode;
		break;
	case 'roomList':
		list = roomList;
		break;
	case 'optList':
		list = optList;
		break;
	case 'optListp':
		list = optList;
		temp=event.srcElement.parentNode;
		break;
		
	// default:return;
	}
	var indexChange = nodeNum();
	for (var i = 0, j = list.length / 2; i < j; i++) {
		if (list[i].style.display == "block" && --indexChange < 0) {
			list[i].style.display = "none";
			list[i + j].style.display = "block";
			break;
		}
	}
	temp.style.display = "none";
	var regexp = /\d+/;
	console.log((temp.id));
	var optid = parseInt((temp.id).match(regexp));
	list[optid].style.display = "block";
}

var ctx ;
function myCanvasFuc() {
	ctx = bigCanvas.getContext("2d")
  clearAct(ctx); 
}
 

function nodeNum() {
	return parseInt(Math.random() * 2);
}

function clearAct(p) {
	p.fillStyle = "black";
	p.fillRect(0, 0, 888, 588);
}

function showCanvas() {
	fac.style.display = 'none';
	bidDiv.style.display = 'block';
}

function closeCanvas() {
	bidDiv.style.display = 'none';
	fac.style.display = 'block';
}

function changeCanvas(index) {
	switch (index) {

	}
}
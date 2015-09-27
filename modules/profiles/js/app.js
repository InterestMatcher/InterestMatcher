function init()
{
	document.getElementById("editBtn").addEventListener("click",function(e){
		document.getElementById("name").contentEditable=true;
		document.getElementById("location").contentEditable=true;
	},false)
}
init();
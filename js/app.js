//angular.module('IMapp', ['postsModule', 'profileModule']);
function init()
{
	document.getElementById("editBtn").addEventListener("click",function(e){
		document.getElementById("name").contentEditable=true;
	},false)
}
init();
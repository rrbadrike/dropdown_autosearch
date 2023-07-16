var result=[];
var valfromdropdown=0;
var tempval='';
var list=document.querySelector('.ash');
for(el of list){ 
result.push(el.innerHTML);
}
if(document.querySelector('.ash')==undefined){

}else{
document.querySelector('.ash').style.display="none";	
}

//add custom dynamic dropdown
var newdiv=document.createElement('div');
newdiv.classList.add('mymain');
var par=list.parentElement;
var txt=list.outerHTML;
var mystr=newdiv.innerHTML;
htmltext='<input type="text" name="myval" /><span class="mydropdown"><div class="triangle_down"></div></span>';
var mystr=txt+htmltext;
newdiv.innerHTML=mystr;
list.remove();
par.append(newdiv);

var list=document.querySelector('.ash');
var schtxt=document.querySelector('[name="myval"]');
schtxt.addEventListener('keyup',(e)=>{
	var searched=[];
	for(var val in result){
		if(result[val].toLowerCase().includes( e.target.value.toLowerCase() )){
			searched.push(result[val]);
		}
	}
	display_result(searched);
});

schtxt.addEventListener('click',function(){
    if(schtxt.value==''){
		valfromdropdown=1;
	  showall_list();
	}
});

document.querySelector('.mydropdown .triangle_down').addEventListener('click',function(){
   valfromdropdown=1;
   showall_list();
});

var has_display=0;
var flag=0;
var mydiv;
function display_result(filterval) {
	var li_arr=filterval.map(function(val){
		return "<li onclick='setdropdown(this)'>"+val+"</li>";
	});

	var final_result="";
	if(li_arr.length){
		final_result="<ul>"+li_arr.join("")+"</ul>";
	}

    //create div to show dynmic
	mydiv=document.createElement('div');
	mydiv.id="myresult";
	mydiv.innerHTML=final_result;

	for(i=0;i<list.parentElement.childNodes.length;i++){
		var cls=list.parentElement.childNodes[i].id;
		if(cls=='myresult'){
			has_display=1;
		}
	}
	if(flag==0){
		if(has_display==0){
			document.querySelector('.triangle_down').parentNode.insertAdjacentHTML("afterend", mydiv.outerHTML);
			//list.parentNode.insertBefore(mydiv,list);
			has_display=1;
		}else{
			flag=1;
		}
	}else{
		document.querySelector('#myresult').innerHTML=final_result;
	}

}

function setdropdown(el){
	droplist=list;
	for(var val in droplist){
		var dropval=(typeof droplist[val].innerHTML !='string')?'':droplist[val].innerHTML.trim();
		if(el.innerHTML.trim()==dropval){
			droplist[val].selected=true;
			schtxt.value=el.innerHTML.trim();
			document.querySelector('#myresult').innerHTML="";
			valfromdropdown=1;
		}
	}
}

document.querySelector('.mydropdown').addEventListener('click',showall_list);

function showall_list(){
	if(valfromdropdown==1){
		tempval=list.value;
		schtxt.setAttribute("placeholder",schtxt.value);
		schtxt.value='';
		var e =new Event('keyup');
        schtxt.dispatchEvent(e);

	}
}

schtxt.addEventListener('click',showall_list);

window.addEventListener('click',function(e){
	 if((e.target.outerHTML.includes('<li')==true || e.target.outerHTML.includes('triangle_down')) && e.target.outerHTML.includes('mymain')==false ){//inside
	 	
	 }else{
	 	if( document.activeElement.getAttribute('name')!='myval'){//outside click
	 	   if(list.value!=''){
	 	    	schtxt.value=list.value;
	 	    	if(document.querySelector('#myresult')!=null){
	 	    		document.querySelector('#myresult').innerHTML="";
	 	    	}
	 	    }
	 	}
	 }
});



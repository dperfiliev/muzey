// Garden Gnome Software - Skin
// Pano2VR 6.1.14/18105
// Filename: Interface.ggsk
// Generated 2024-02-15T16:18:26

function pano2vrSkin(player,base) {
	player.addVariable('text', 0, "");
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._container_1=document.createElement('div');
		el.ggId="Container 1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 22px;';
		hs+='height : 28px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 170px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._image_10=document.createElement('div');
		els=me._image_10__img=document.createElement('img');
		els.className='ggskin ggskin_image_10';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAAA9CAYAAADiUh0KAAADvklEQVR4nO3dLVMjWRhA4UPk4LOa1UQPGtxbBaN39aCHXzEaz+hdPVBcB5rRiQa98YnNitxkCATy1Un3zD1PVQSppnndqUt3394bjUZsU0rpT2AfOHz29eQ7SVLzDIDHZz/3gEFEPL5xfCX2qg5SSqkNHAGd/PlQ6R+QJNVlCHTz5yEi+lWevJIgpZT2GUfoDDjY+ISSpF/BE3DNOE6DTU+2UZByiM6AT7gSkqRSDYHvwPUmYVo7SCmlE+AcQyRJGhsCVxFxt84vrxykfI3ogtmbFCRJmugBl6teY1opSK6KJElLWnm1tHSQUkrnwOmag0mSynQTEVfLHLhUkFJKF8DxplNJkop0HxGXiw5qLTrAGEmSNnScW/Kud4NkjCRJFVkYpTeDlFI6wxhJkq'+
			'pznNsy19wgpZQ6wOetjSRJKtXn3JhXXgUp777wZesjSZJK9SW3Zsa8FdLfQHv780iSCtVm3JoZM0HKr4rwWSNJ0rad5uZMvVwhed1IkrQrM82ZBilfZHJ/OknSrhw+v8Hh+QrpzVvxJEnakml7WjDdwftjbeNIkkr1MTdoukI6qnEYSVLZjuBnkE5qHESSVLYTgL3b29t94N+ah5Ekle2vFjB3CwdJknao0wIO6p5CklS8A1dIkqQm6LRw3zpJUv3aBkmS1ATtha8wlyRpFwySJKkRDJIkqREMkiSpEQySJKkRDJIkqRFaQL/uISRJxesbJElSE/RbQLfuKSRJxeu2gKe6p5AkFe/JFZIkqQm6rYgY4CpJklSfp4gYTG77vqt1FElSye7g53NIDzUOIkkq2wPkIEVEH/hR6ziSpBL9yA2a2anhuqZhJEnlmrZnGqSI'+
			'6AK9WsaRJJWol9sDvN7L7tuOh5EklWumOTNBiohH4Gan40iSSnSTmzM1b7fvf3B/O0nS9vQZt2bGqyDlB2W/7mIiSVKRvubWzJj7PqS8jPJ6kiSpat9e/qtu4s0X9EXENXC/tZEkSaW5z22Z6903xkbEJUZJkrS5+9yUNy18hblRkiRtaGGMAPZGo9FSZ0spnQOnm04lSSrKTURcLXPg0kECSCkdARfAhzUHkySVYQhcRsTSm3evFCSAlFKbcZQOV5tNklSIHuMYrfRM68pBmkgpnQDnuFqSJI0NgauIWOsde2sHCSCltA+cAZ8wTJJUqiHwHbie98DrsjYK0nN5xXQGHFRyQklS0z0xjlAlbx2vLEgT+RrTEdDJH1dOkvR7GALd/HlY9RrRIpUH6aUcqD/wJghJ+lX1gP+qDtBL/wOxig3TQ5nWnQAAAABJRU5Erk'+
			'Jggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 28px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 170px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._image_10);
		el=me._button_1=document.createElement('div');
		els=me._button_1__img=document.createElement('img');
		els.className='ggskin ggskin_button_1';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAvElEQVRYhe2YwQ3CMAxFX1EHyCZlhGxOukFHKRN8LkgQqxZRFSAHPymHRNH3U32pM0lKwJXPlIY7R7Tk7/Pz0q0hcDop0pK/Xk6Gd2c2+zuwda6xA+vBeQIWT2QDcmcRLzPz1rJhWhMilhCxTJL+7QAM9EVCxBIilhCxhIglRCwhYpmp546d/j/PHnVdSVkviiR+tKq6w7QmRCzDiNhJL+FPeuVkDe81oDqzIgv+5P7N14CxWuNN671oyd8eL6eIPwwMNyYAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 1";
		el.ggDx=65;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_1.onclick=function (e) {
			player.enterFullscreen();
			me._button_1.style[domTransition]='none';
			me._button_1.style.visibility='hidden';
			me._button_1.ggVisible=false;
			me._button_2.ggVisible = !me._button_2.ggVisible;
			var flag=me._button_2.ggVisible;
			me._button_2.style[domTransition]='none';
			me._button_2.style.visibility=((flag)&&(Number(me._button_2.style.opacity)>0||!me._button_2.style.opacity))?'inherit':'hidden';
		}
		me._button_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_1);
		el=me._button_2=document.createElement('div');
		els=me._button_2__img=document.createElement('img');
		els.className='ggskin ggskin_button_2';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAhUlEQVRIie2VwQ2AIAxFX40DOIobiJOLGziKG9SDJl6ACJFwoD/5CYe2L78JIKpKRBMwP+cTOGKFxb2qGrPTVz5RV9w7ZKT5XQbvDz4CDtgqMhYgeJ/7XbskXrjq6nftBje4wQ1eHe64v7yUfebcLzO1efKmcA9IwOtPjD0yX5onN3hf8AsKEIMPuDpFZQAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 2";
		el.ggDx=65;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_2.onclick=function (e) {
			me._button_1.style[domTransition]='none';
			me._button_1.style.visibility=(Number(me._button_1.style.opacity)>0||!me._button_1.style.opacity)?'inherit':'hidden';
			me._button_1.ggVisible=true;
			player.exitFullscreen();
			me._button_2.style[domTransition]='none';
			me._button_2.style.visibility='hidden';
			me._button_2.ggVisible=false;
		}
		me._button_2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_2);
		el=me._button_3=document.createElement('div');
		els=me._button_3__img=document.createElement('img');
		els.className='ggskin ggskin_button_3';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAB80lEQVRYhcWY0bWiMBCGPz2+Lx1cSmAruGwFawdagiVYgiVwO7AE7AA7YCu4bAX/PiS4IQQhiDrn5CFjMvmSycwEV5J4QFLbykeMAGwix29ty4EPR796BUgCHGz78eiCc0G2QDECcFmERNJQK9SXRtJJ0lZScmdudAspE0lVAOC49OJjIGcPonwmwBDI0YMong0QAsneBeGDlA5E9Qp3hEBy7zTyV0JIYm2j+OBE9BcLpOxYWUlKgG9H9+sdIGsgc/p/3gHRguROPxZiD5wxZSC7O3JENpgy3kodMbcAdk5/B/wEqlkkXthOjZZUYTnPjZrY90gr6YA+ibBx4r87Dz7IVEMV8Jf+86COAMmAz3bdNV2fTr1wDd3cA3AN6MZAbvY2dHcRc/MLTJSltl'+
			'9GzE3pnma18QzkEcbAbKKOnOOvcwWTR1p/g6HczzAcK64Lz8Ct6J2cEKyfXOD8ApvKqb5+Xjg8EcR9hpat3h1QOAMamYfS0hBHb8O3NdxBiQVoZenH0d6DOLm/j/mvWuhkfIjeJqdMaqxuDkCi/ldBI3tBx0BCMJK5WNsIgKO6rpZMRAZPeCUN/hsw9LnZPp5K+sksx2Tn3wF7F2uzCa42YWeFHpNGE9LBVF9nM4BqCzAp8u65JiSJc/x54PcaUzJKIl9q/wBhfHyJ96lqfQAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 3";
		el.ggDx=35;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_3.onclick=function (e) {
			me._button_3.style[domTransition]='none';
			me._button_3.style.visibility='hidden';
			me._button_3.ggVisible=false;
			player.startAutorotate("0.1");
			me._button_9.style[domTransition]='none';
			me._button_9.style.visibility=(Number(me._button_9.style.opacity)>0||!me._button_9.style.opacity)?'inherit':'hidden';
			me._button_9.ggVisible=true;
		}
		me._button_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_3);
		el=me._button_6=document.createElement('div');
		els=me._button_6__img=document.createElement('img');
		els.className='ggskin ggskin_button_6';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAAlUlEQVRIie2XwQ2DMBAEJxEFUEI6CB1ASZSQElJCSjEdmA4ogQ6Wz0nhw8PnBxLcSiftw7cjrWRLfkjCqS/QmR+BXBrQeMkG7s23noBnBbxaAQ94wAN+XXgDvGxKtX/Pu8NTx1qR9NE5SqfXvgCTY/fNv/oZWAv3M5K8k3YVDp6M+161gAc84AG/Lrzmo/gDkvnFE7ABQ+DoRqz9lgYAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 6";
		el.ggDx=-65;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_6.onclick=function (e) {
			player.changeFovLog(-1,true);
		}
		me._button_6.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_6);
		el=me._button_7=document.createElement('div');
		els=me._button_7__img=document.createElement('img');
		els.className='ggskin ggskin_button_7';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAECAYAAAB2v+RhAAAALElEQVQYlWP8//+/AAMDgwHDAAAWqMX7B8JypoGwFAZYGBgYPjAwMBwcCMsBepQF6Y4j9ngAAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 7";
		el.ggDx=-35;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 3px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_7.onclick=function (e) {
			player.changeFovLog(1,true);
		}
		me._button_7.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_7);
		el=me._button_9=document.createElement('div');
		els=me._button_9__img=document.createElement('img');
		els.className='ggskin ggskin_button_9';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAB0UlEQVRYhcWX75GDIBDFX5z7fpZgB6GDcBUkJaQES7CElJAS0sFZgunA68Cr4N0HSLIiEDz/vZmdUUH9scDusiOJkSoAKGsA0AK4jv3IQCRTLCdZkmw4VJ34jah9JLBWAEoAn5NHHVEMRMG4fO9puwOoAXQwUzNdAVedSXbOFHQkK5LFHFPhWgjCVWXXyewAIRDl8YJeEsAHkpNsHQi1BoQLcnG8sRqEBCkciHJNCAkivdGuDSFB5FY9bwGyI6kBfNuw8gsgnyVAjVQGQIv72xYQgAFR4r5JfE8DoMfqKSByKlJBZldK9l1KCi8nNFuCXAAc7PVXtiHIQVy3Gfr1hF4Jwg0RbYb+AlVIUw1g5zGd+L7sdwfMrqnFwyPWCWgncW3+b0NsK0J8tXA4dx'+
			'OslrmmEg0dl63GruJfzwT7aMzZT3zXhSC0441ngpWdylCnmcwdbCPb3c71QjA5h4ezXgX4jpqcXq0p9jeDd4ChF12Y2h1BohcqDuX1cmwUvnPujeSJ8V2laEpPdzBBCNJUaKGgk8McOY+B9jteR87CPlPwn5F/bBALlxkJLtYcLuJUPY6pb/8zdtFdOFx4Pt1i0+Cz2NTElOOVILV1eWftX1XeHyz8Qq5ESVGRAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 9";
		el.ggDx=35;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_9.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_9.onclick=function (e) {
			player.stopAutorotate();
			me._button_9.style[domTransition]='none';
			me._button_9.style.visibility='hidden';
			me._button_9.ggVisible=false;
			me._button_3.style[domTransition]='none';
			me._button_3.style.visibility=(Number(me._button_3.style.opacity)>0||!me._button_3.style.opacity)?'inherit':'hidden';
			me._button_3.ggVisible=true;
		}
		me._button_9.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_9);
		el=me._button_10=document.createElement('div');
		els=me._button_10__img=document.createElement('img');
		els.className='ggskin ggskin_button_10';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAnCAYAAADtu3N3AAAAsklEQVRIicXWQQpDIQwE0LEX6dl6s3+03mS6+HwQSTSZBBpw4eYhMQ4OkuiqF4CrTeNdF0lU14O1gDNWBlesBFqYDHqYBFo9k8EVQwW0MBn0MAncYWnwhKXACBYGo1gIzGBHMIttQQVzwUFyzu2RyNUvgPe0/7Se7K89a7vNtjlrewEhKIKFoROWgnZYGvIwCbIwGbIwGdphacjDJMjCZGjFStCMlaEHa4HIO7Zb/sYA8AMh8qCcQh4LNAAAAABJRU5ErkJggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 10";
		el.ggDx=10;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 22px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 12px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_10.onclick=function (e) {
			player.changePanLog(-1,true);
		}
		me._button_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_10);
		el=me._button_11=document.createElement('div');
		els=me._button_11__img=document.createElement('img');
		els.className='ggskin ggskin_button_11';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAnCAYAAADtu3N3AAAA5ElEQVRIia3WwQ3CMAwF0F/EAN2AEViBTWCEjtIRYJOOUEZgg25gToE2dZr425Z6iFQ9OUrsuBMRRMUpyOkBjOcgaAKweDNL0BXwbXMDebAdxGIqxGBFyIpp0JvBNOgFYLBiJeiR/1jDmqEaZoKOMDNUwihIw2gox1zQGnNDCQuBEjZm0IeBEjZgW2MXAE8WWwDcMvDOgOkAQsD11XCD+aV1gVo50WCp0CnwqAWZwVpzNIEtbbsdFJHWrxeRWbaxXk+Wp07L0PWiayCNHYLs4KKCnpFqB3YBM23Y5Aj8M5wjMvvFF10Gk6Tr0RouAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 11";
		el.ggDx=-10;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 22px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 12px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_11.onclick=function (e) {
			player.changePanLog(1,true);
		}
		me._button_11.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_1.appendChild(me._button_11);
		me.divSkin.appendChild(me._container_1);
		el=me._container_3=document.createElement('div');
		el.ggId="Container 3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 22px;';
		hs+='height : 28px;';
		hs+='left : 20px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 190px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_3.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_3.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getViewerSize().width < 700))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._container_3.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._container_3.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._container_3.style[domTransition]='';
				if (me._container_3.ggCurrentLogicStateVisible == 0) {
					me._container_3.style.visibility="hidden";
					me._container_3.ggVisible=false;
				}
				else {
					me._container_3.style.visibility=(Number(me._container_3.style.opacity)>0||!me._container_3.style.opacity)?'inherit':'hidden';
					me._container_3.ggVisible=true;
				}
			}
		}
		me._container_3.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaQAAAA9CAYAAADiUh0KAAADvklEQVR4nO3dLVMjWRhA4UPk4LOa1UQPGtxbBaN39aCHXzEaz+hdPVBcB5rRiQa98YnNitxkCATy1Un3zD1PVQSppnndqUt3394bjUZsU0rpT2AfOHz29eQ7SVLzDIDHZz/3gEFEPL5xfCX2qg5SSqkNHAGd/PlQ6R+QJNVlCHTz5yEi+lWevJIgpZT2GUfoDDjY+ISSpF/BE3DNOE6DTU+2UZByiM6AT7gSkqRSDYHvwPUmYVo7SCmlE+AcQyRJGhsCVxFxt84vrxykfI3ogtmbFCRJmugBl6teY1opSK6KJElLWnm1tHSQUkrnwOmag0mSynQTEVfLHLhUkFJKF8DxplNJkop0HxGXiw5qLTrAGEmSNnScW/Kud4NkjCRJFVkYpTeDlFI6wxhJkq'+
			'pznNsy19wgpZQ6wOetjSRJKtXn3JhXXgUp777wZesjSZJK9SW3Zsa8FdLfQHv780iSCtVm3JoZM0HKr4rwWSNJ0rad5uZMvVwhed1IkrQrM82ZBilfZHJ/OknSrhw+v8Hh+QrpzVvxJEnakml7WjDdwftjbeNIkkr1MTdoukI6qnEYSVLZjuBnkE5qHESSVLYTgL3b29t94N+ah5Ekle2vFjB3CwdJknao0wIO6p5CklS8A1dIkqQm6LRw3zpJUv3aBkmS1ATtha8wlyRpFwySJKkRDJIkqREMkiSpEQySJKkRDJIkqRFaQL/uISRJxesbJElSE/RbQLfuKSRJxeu2gKe6p5AkFe/JFZIkqQm6rYgY4CpJklSfp4gYTG77vqt1FElSye7g53NIDzUOIkkq2wPkIEVEH/hR6ziSpBL9yA2a2anhuqZhJEnlmrZnGqSI'+
			'6AK9WsaRJJWol9sDvN7L7tuOh5EklWumOTNBiohH4Gan40iSSnSTmzM1b7fvf3B/O0nS9vQZt2bGqyDlB2W/7mIiSVKRvubWzJj7PqS8jPJ6kiSpat9e/qtu4s0X9EXENXC/tZEkSaW5z22Z6903xkbEJUZJkrS5+9yUNy18hblRkiRtaGGMAPZGo9FSZ0spnQOnm04lSSrKTURcLXPg0kECSCkdARfAhzUHkySVYQhcRsTSm3evFCSAlFKbcZQOV5tNklSIHuMYrfRM68pBmkgpnQDnuFqSJI0NgauIWOsde2sHCSCltA+cAZ8wTJJUqiHwHbie98DrsjYK0nN5xXQGHFRyQklS0z0xjlAlbx2vLEgT+RrTEdDJH1dOkvR7GALd/HlY9RrRIpUH6aUcqD/wJghJ+lX1gP+qDtBL/wOxig3TQ5nWnQAAAABJRU5Erk'+
			'Jggg==';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 28px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 190px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._text_1=document.createElement('div');
		els=me._text_1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="Text 1";
		el.ggDx=0;
		el.ggDy=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 180px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 182px;';
		hs+='height: 22px;';
		hs+='background: #ffffff;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		hs+="border: none; background-color: transparent; color: #fff; font-family: \'Montserrat\', sans-serif; font-size: 14px;";
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._text_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._text_1.logicBlock_text = function() {
			var newLogicStateText;
			if (
				((me.ggUserdata.tags.indexOf("1") != -1))
			)
			{
				newLogicStateText = 0;
			}
			else if (
				((me.ggUserdata.tags.indexOf("2") != -1))
			)
			{
				newLogicStateText = 1;
			}
			else if (
				((me.ggUserdata.tags.indexOf("3") != -1))
			)
			{
				newLogicStateText = 2;
			}
			else if (
				((me.ggUserdata.tags.indexOf("4") != -1))
			)
			{
				newLogicStateText = 3;
			}
			else if (
				((me.ggUserdata.tags.indexOf("5") != -1))
			)
			{
				newLogicStateText = 4;
			}
			else if (
				((me.ggUserdata.tags.indexOf("6") != -1))
			)
			{
				newLogicStateText = 5;
			}
			else if (
				((me.ggUserdata.tags.indexOf("7") != -1))
			)
			{
				newLogicStateText = 6;
			}
			else if (
				((me.ggUserdata.tags.indexOf("8") != -1))
			)
			{
				newLogicStateText = 7;
			}
			else if (
				((me.ggUserdata.tags.indexOf("9") != -1))
			)
			{
				newLogicStateText = 8;
			}
			else if (
				((me.ggUserdata.tags.indexOf("10") != -1))
			)
			{
				newLogicStateText = 9;
			}
			else if (
				((me.ggUserdata.tags.indexOf("11") != -1))
			)
			{
				newLogicStateText = 10;
			}
			else if (
				((me.ggUserdata.tags.indexOf("12") != -1))
			)
			{
				newLogicStateText = 11;
			}
			else if (
				((me.ggUserdata.tags.indexOf("13") != -1))
			)
			{
				newLogicStateText = 12;
			}
			else if (
				((me.ggUserdata.tags.indexOf("14") != -1))
			)
			{
				newLogicStateText = 13;
			}
			else if (
				((me.ggUserdata.tags.indexOf("15") != -1))
			)
			{
				newLogicStateText = 14;
			}
			else if (
				((me.ggUserdata.tags.indexOf("16") != -1))
			)
			{
				newLogicStateText = 15;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._text_1.ggCurrentLogicStateText != newLogicStateText) {
				me._text_1.ggCurrentLogicStateText = newLogicStateText;
				me._text_1.style[domTransition]='';
				if (me._text_1.ggCurrentLogicStateText == 0) {
					me._text_1.ggText="\u0425\u043e\u043b\u043b";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0425\u043e\u043b\u043b";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 1) {
					me._text_1.ggText="\u041a\u043e\u0440\u0438\u0434\u043e\u0440";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u041a\u043e\u0440\u0438\u0434\u043e\u0440";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 2) {
					me._text_1.ggText="\u041a\u0438\u043d\u043e-\u043b\u0435\u043a\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0437\u0430\u043b";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u041a\u0438\u043d\u043e-\u043b\u0435\u043a\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0437\u0430\u043b";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 3) {
					me._text_1.ggText="\u0411\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0411\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 4) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u041f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0441\u043a\u0438\u0439\xbb 1";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u041f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0441\u043a\u0438\u0439\xbb 1";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 5) {
					me._text_1.ggText="\u041a\u0443\u043f\u0435 \u0410\u043c\u043c\u0435\u043d\u0434\u043e\u0440\u0444 \u0421\u0412 ";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u041a\u0443\u043f\u0435 \u0410\u043c\u043c\u0435\u043d\u0434\u043e\u0440\u0444 \u0421\u0412 ";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 6) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u041f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0441\u043a\u0438\u0439\xbb 2";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u041f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0441\u043a\u0438\u0439\xbb 2";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 7) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u0435\xbb 1";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u0435\xbb 1";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 8) {
					me._text_1.ggText="\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a \u0441\u0442\u0430\u043d\u0446\u0438\u0438";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a \u0441\u0442\u0430\u043d\u0446\u0438\u0438";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 9) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u0435\xbb 2";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u0435\xbb 2";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 10) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\xbb 1";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\xbb 1";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 11) {
					me._text_1.ggText="\u041a\u0430\u0440\u0442\u0430";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u041a\u0430\u0440\u0442\u0430";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 12) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\xbb 2";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430\xbb 2";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 13) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u0421\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439\xbb 1";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u0421\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439\xbb 1";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 14) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u0421\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439\xbb 2";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u0421\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439\xbb 2";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else if (me._text_1.ggCurrentLogicStateText == 15) {
					me._text_1.ggText="\u0417\u0430\u043b \xab\u0421\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439\xbb 3";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="\u0417\u0430\u043b \xab\u0421\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439\xbb 3";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
				else {
					me._text_1.ggText="";
					me._text_1__text.innerHTML=me._text_1.ggText;
					if (me._text_1.ggUpdateText) {
					me._text_1.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._text_1.ggUpdatePosition) me._text_1.ggUpdatePosition();
					}
				}
			}
		}
		me._text_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 2;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_1.appendChild(me._text_1);
		me._container_3.appendChild(me._image_1);
		me.divSkin.appendChild(me._container_3);
		el=me._container_2=document.createElement('div');
		el.ggId="Container 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 22px;';
		hs+='height : 360px;';
		hs+='position : absolute;';
		hs+='right : 25px;';
		hs+='visibility : inherit;';
		hs+='width : 155px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_2.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getViewerSize().width < 700))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._container_2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._container_2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._container_2.style[domTransition]='';
				if (me._container_2.ggCurrentLogicStateVisible == 0) {
					me._container_2.style.visibility="hidden";
					me._container_2.ggVisible=false;
				}
				else {
					me._container_2.style.visibility=(Number(me._container_2.style.opacity)>0||!me._container_2.style.opacity)?'inherit':'hidden';
					me._container_2.ggVisible=true;
				}
			}
		}
		me._container_2.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_2=document.createElement('div');
		els=me._image_2__img=document.createElement('img');
		els.className='ggskin ggskin_image_2';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAJECAYAAAA/szkRAAAMPklEQVR4nO3dK3AcZ6KG4S9a5nAvdnBME2ObbHXVyeI1julmsQ9OcIITnOCTrWpmYxvbLFUWF4+oD5iWItu6zEjTc/uep0qVkMz85M1/6Z7uz96/f59DNY7j50m+2PY42AvvhmH4c9uDmMtn+xz6OI5fJHmQ5H4WQZ+FfW+b42LvnSZ5l+TP6Z8nSU6GYXiz1VHdwd6EPs3OD6e/B0m+3O6IKPU2yXGSN0ne7MsqYKdDH8fxfpJH05+w2UVvk7xK8moYhpNtD+YqOxf6NHM/SvIk4ma/vE3yIovod2qm35nQp9n7aRaR22Ozz06zmOV/3ZVZfuuhj+P4MMk3Sb7e6kBgHq+T/L7tg7ythT6dmH8by3M6vE3yyzAM77bx5RsPfdqDP0vyeKNfDLvhZZ'+
			'KfN72H32jo4zh+k8U+3B6cZqdZ7N9/39QXbiT0aZn+XRbXv4GF4yQ/bWI5P3vo0yz+7axfAvvtl7ln99lCn/bi/xuHbbCMt0m+n2vvPkvo01L9eRb3oAPLOUnywxxL+bWHPo7jkyxO1R24wepOsziVf7HOD11r6PbjsDZr3bevLfRxHP8T18ZhnV4Ow/DjOj7oaB0fInKYxeOprTu7c+gih1mtJfY7hS5y2Ig7x37r0KeDN5HDZjyemruVW4U+XUJzug6b9e3U3spWDn26GebZbb4MuLNnU4MrWSn06bbW53EzDGzLvSTPpxaXtuqM/p+4rRW27X4WLS5t6dCngwCPe4Ld8PUqh3NLhT7tCZ7eekjAHJ4uu19fdkb/NvblsGvuZcmrXzeGPi0P/KYcdtOXyyzhrw19OtmzZIfd9vSmU/ibZnS/K4fddy833NtyZejT'+
			'm1Pc4gr74fHU7KWum9Hd/Qb75cpmLw19OrJ3zRz2y9dXXW67aka/9a9kgK26tN1PQrc3h7126V79shn9nxsYDDCfTxq+LPRb/d4V2BmfNPxB6NOP2l03h/127+MHVHw8oz/a4GCA+XzQ8nno0y10LqnBYfj64m2xF2d0szkclvOmhQ6H69LQLdvhsJw3fZQk4zg+3N5YgLmctX02o3uwBBymL5O/Qjejw2Eyo0OBL5Pkb1999dUXSf6x5cEAM/njjz9eH8ULGeDQ3T9K8mDbowBm9eAoyd+3PQpgVn+3dIfDd/8oyUpvZQT2zuf26HD4Hqz62mRgDwkdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCg'+
			'gdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggd'+
			'CggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCg'+
			'gdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggd'+
			'CggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdCggdChwlOd32IIBZnR4lebftUQCzemfpDgWOkrzZ9iCAWb'+
			'05SnKy7VEAszoROhy+k6NhGCzd4YANw/Dm7DDueKsjAeZynPx1w4zQ4TB9ELrlOxymN4nQ4dD9FfowDCexfIdDczy1/cGPWt5uaTDAPM6bvhj6iy0MBJjPedPnoQ/D8C5unoFDcTI1neTT36Ob1eEwfNCy0OEwXR36dEL3eqPDAdbt9dlp+5nLfo9uVof99knDn4Q+DMOrOJSDfXUyNfyBq54w89vMgwHmcWm7l4Y+DMOLmNVh35xM7X7iumfGmdVhv1zZ7JWhT/9ncP877Ifjq2bz5OYXOPyy5sEA87i21WtDnx4z5bo67LbXNz0Sbpnnuv8Yb3OBXXWaRaPXujH0YRj+TPLrOkYErN2vU6PXWupNLcMw/B5LeNg1r6c2b7TKK5ks4WF3LLVkP7N06NPy4PvbjAhYu++XWbKfWekli9PJnhtpYLt+WfXFKyu/TXUY'+
			'ht+SvFz1vwPW4uWy+/KLbvva5J/jrjnYtOMs2lvZrUKf9gbPI3bYlOMkz1fZl1/02fv372/9zeM4fp7kpyT3b/0hwE1Oknx328iT2y/dk5zP7D/EZTeYy2mSH+4SeXLH0JPzx0T/O5bxsG7HSf598bHNt3WnpftF0zL+hyQP1vKB0O1Oe/KP3XlGP3PhgM6rneBu3maNkSdrnNEvGsfxWZL/WfsHw+H77zAMt7qEdp1ZQk+ScRyfJHmW5N4sXwCH5TTJz9c9JeYuZgs9ScZx/CLJd7Fvh+scJ/lpHYduV5k19DPjOP4ryb9m/yLYP79Nt5XPaiOhJ2Z3+Mjss/hFGwv9zDiO3yR5Gnt3Op1m8VSYlX+YchcbDz05v+b+NE7m6fLfLPnop3XbSuhnxnG8n0Xwj7c2CJjfyywC39rbj7Ya+pkp+H8meRJLeg7DaZL/S/'+
			'Jim4Gf2YnQz0xL+kdJvolDO/bTcZLfk7zaxhL9KjsV+kXTLP8ki/BFzy47zuKd5K92Yfa+zM6GftEU/aMkD6c/y3u26TTJm+lvZ+O+aC9C/9h0Tf5Bkov/FD9zOE3yLotZ+10WLzPcyLXvddrL0K8yjuPD6V/vx1NvuJ2T6S+rPml1l/0/hAkaiPQ4JK8AAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 2";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 360px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 155px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_2.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._container_2.appendChild(me._image_2);
		el=me._image_3=document.createElement('div');
		els=me._image_3__img=document.createElement('img');
		els.className='ggskin ggskin_image_3';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAH6CAYAAABS/U1QAAAP5ElEQVR4nO3dQW7bygHG8S9FgG6KPrXbLiygB7B6gjAnaHqCKCeos+4izgmqd4KnnOC9niDyCeqsuqwCFEVXhQN0U6CAuhgJGtGULVIUZ4bf/wcIkBVLHNl/MyOKFF9sNhvBykLSVNKNpHXSkSTyguitLCW9jb7+qPBH8JBkNIkQvY+lDoPf+SbpViF+C0TvYanm4GNfJc0lrS48luR+lnoAuKiJHgf/RdKvJL1XWMvvXEn6rBD9dJDRJUL04zVRCDgO/pOkmcIcfveC9vva/V5J+rvCH8vkwmNMgunNOO2Cv45u+6QwfWkyVYj8Ve32bwp/HLc9ji05oh+ftsHHKoXIr2u3f1XYxPnT2aPLANObcTkneG3vO5P0To/n+z9G/140oh+PmR4H/71ODz'+
			'62VJjyfKzd/krSX6N/LxLTm3HYBf9ddNs7hTjPNVWY09c3ee7m+8W9uUX05btk8LFKIf76i92v29v7Xt7FML0p21DBa7ucavv4X6PbryT9EP179ljTl2vI4OsmCltzbmrLl6S/KPOd2VJEP1W3F1eX8pOk+9SDaGmuMJfeBfdte9vQmxQn23E07eKQ7c5sKaKvFN7uzsU3hTGVEv5cYTqxk8P4ZwqBN725daPM5vvM6cPacqUytj/PlV/w2i6/kvQHHc73v1MY71oZzfdTr+m/Ku1aIJ6T5hLQMXPlGXyTWzXP9+8Unsd62OHUbDaboS/VZm+VYPnxZbbZbB6i8Txsb0s5pqbLfHMo13HGl8lms1lsmi22/55kbKnX9HdK/99efStIbmvQhaQ/Rl9/kfRGqdeWp5uqeWe2/0r6x/YypOXLgReYo918dKUQ/m6OXyl9'+
			'+Es93he+UoZbRJ6wVhhzpfB8rra3/1zSb7eXIa14IRvswt/tZJXDi9ulyg8+tlJY679LOwyJNf1eTmv8pcYVfGypwxfkrwdY5lzRz5PoD+UQ/lLjDb7JaoBlVPEXTG8eSzXVmWyXfezwPvSE6JsNHf65B3+gBaI/7l7hDZadS4VP8AMj+qctdbi1oe/wCT4Bon/eUpcJfyqCTyJ19FOV8dkqS/Ub/kxh+hQH/04EP4gU0cdbIq4U4nEKP+XBH1Ca6O91GM+1fMIn+Aykmt4s5Rc+wWci5Zx+KZ/w3+jxnpwEn0jqF7JLjT/8ucKng9V3XV5ecGx4QuropXGHP1c5RzvZyCF6qTn8tco4bnWp5vBvRfBZyiV66fLvfl7SUo/H/iH6muAzklP00rjC3/mbCD4ruUUvjSv8f0v6TZqh4Jgco5fGEf4/Jf1a0i9Vztgt5B'+
			'q9VH74f4q+Lmnso5dz9FL54TeNvUowFkRyj14qP/zXOjwC67PYmzKpEqKXyg5/pcNDD6Ww/X6eYCxQOdFLZYdfP+ZWIvxkSopeInz0oLTopfLDnyl8ls3OD2Lns0GVGL1UdvhrhTV+HP5bsVVnMKVGL5Ud/oNC5F+f+T5cQMnRS+WHv049CEelRy+VHT4SGEP0UvObQCsRPhqMJXrp8ZtAhI9GY4peyvPkCsjM2KKXCB/PGGP0UjnhV5JebC+rpCMZ1ovoMrixRi+VEz4GNuboJcJHg7FHLxE+ahyil46HX6UZDlJyiV5qDp+jmAw5RS+xTzvkF71E+PYco5cI35pr9BLh23KOXiJ8S+7RS4Rvh+gDwjdC9HuEP5wqugyO6A8NHf5K0mZ7qS60jBx9ji6DI/rHjoX/Jslo0Duib9YUPjuojQTRH3cvaZF6EOgf0cMO'+
			'0cMO0cMO0cMO0cMO0cPOy9QDGMhC3bazT89Y5lzPv5N7HV1fKHyScVe/0P73+R9J/zvjseqqjvc75ee+6vjYbUyj6zOX6GeSXg28zGnLZV4//y3FOeXnPvTvZcL0BnZc1vSx9wrvtra1PmOZn3T580ottP/foutz7NuNpEnD7TNJ/9pehhD/bCyjv9fwnxu5HmCZ8euBFM+xybE/vNWQg1DttRLTG9ghejhYx9eJHg7W8fWxRD9ReNEEPGsM0c8UXjDldmTTrfYnHrhNOhIcKD36ucKWgKu0w0BJSt5kuVQ4vTzQSonRTxTW7mN82x4DKG16Uym8Eid4dFZS9DcKn5PyXXTbXaKxoGAlTG8mCvP330e3fVP4I1gr0QcGoVy5r+lnCvP3OPgvCtOc5fDDwRjkHP0bPX7B+heF4HPYgxCFyjX6haQfdTh//6jwh3DO0U'+
			'VAdnP6iaSfdHg0zTft1/rA2XKKfjd/j9fuXxSCXycYD0Yql+nNXNJfdRj8J4U/hHWC8WDEUq/pJwrz9/ruBO9U/taZqfZH4a/FH282Uq7ppwrTmTj4r5J+p/KDl8L/XrsTD8yTjgQHUkX/RmGzY7w58k773YSBi0kR/a2aN0dWYnMkBjDknP7Y7gRzhc2UwCCGin6mEHZ8sMcXheCZzmBQQ0xv5np8dNMnsTsBErn0mn6px5sj34tzOSGhS0XfdHQTuxMgC5eY3lR6fHTTF+23ywNJ9R1909FN3yu8kGVzJLLQ1/SmaXeC3dFNy56W8ZzdDmvH/q0PVYvvndaut7lvF02fDowGfUQ/Uwg7ns581f5d16F8p8t/wH/XQxPfio8ryca505tjRzexOwGydc6afiHpj7XbPmrYj7C7l/S6w336kNsnMVyLKc5JukSf09FN'+
			'DwmWuVMlWu4xKw1//qYitZ3e7KYt8Q/3i55+EQlkpU30c4Wjm5p2J1j3NiLgwk6Z3oz56CYYei76qcL8PfXmSKA3T01vKnF0E0boWPS3at6doBK7E6Bw9ekNRzdh9OLoObqpbEvtNxuvk42iALvo5wpbaOoftnQjpjOlWKYeQCleKgT/Q+12jm7CaL3U4S6wHN2E0atvvVmI4DFyuXyAKzAYoocdoocdoocdoocdoocdoocdoocdoocdoocdoh+P3S4kK/X3MYajlPqUmujPTPuPZuFDn57Amh52iB52iB52iB52iB52iB52iB522E7f3Sb1ANANa3rYIXrYIfp2XmR8ye0cWNkietghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghet'+
			'ghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetghetgheth5Wft6Lqkafhit3Eu66XC/maRFz2PJyXV0fSHpYeDl5/x7mcZf1KO/2l7GaCLpVepBDOT6+W/JxuC/F6Y3sFNf03+StEwwjja6/rd9L+l1D8v/HF3v4/H6stB+Df9e4fkOKfXv5SlzSW93X9SjX0taXXgAqTyo/+fW9+OdI47uXnmN7SmX+L3UVfEXTG9gh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhp364IMp1o/DJAtLwx8cWhejHg9BPxPQGdogedogedogedogedogedogedogedogedogedogedogedoh+PFaSNttLlXQkmSN6'+
			'2CF62CF62CF62CF62CF62OEY2fOsUg8gMks9gFIQ/XlepR4A2mN6Azus6c/zOvUAjuDjQJ5A9OdZpR4A2mN6AztEDztEDztEDztEDztEDztEDztEDztEDztEDztEDzvse9PeXeoB4DxE316VegA4D9Mb2CF62CF62CF62CF62CF62CF62CF62CF62CF62CF62CF62GGHs/Zuj1xHIYi+vQ/R9dtUg0B3TG9gh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhh+hhp76XZaX89xxcS1p2uN9U0rzHcUj5/qyWCj8nNKhH/2p7ydmdukf/4blvaqnvx+vLSkR/FNMb2Kmv6e8U1hI5W59xv489LD9eu/fxeH2ZS7pKPYgS1KNfKd956rnW6ue55XrkVCWiPwnTG9ghetghetghetghetghetghetghetghet'+
			'jhsyzbe5F6ADgPa3rYIXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYYYez9qro+irRGHAGom/vc3SdPS4LxPQGdogedogedogedogedogedogedogedogedurvyM51+DY7nrY68fvuJd10ePyZpMWJ33sdXV9IeuiwvHMM8Ry7msZf1KO/EqdwaePSZ2KcdFzG9fPfko2uz7EzpjewU1/Tf1K3c7TiaV2nGveSXp/4vQvt1/Dvt/cd0hDPsau5pLe7L+rRr8Xusjl50Om/jzi6+xb3S63Nc+yqir9gegM7RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87RA87'+
			'RA879VNqzlU7/SCKUdJZwpOqR3+1vQCjxfQGdupr+k+Slh0eZybpz9vrXyTdnDGm3M21P+V615/XJSzEFOck9ejXOv+U5UOc9jylKrq+Vj7P9SH1AErB9AZ2iB52iB52iB52iB52iB52iB526tvp8by1pLvoei7uo+tss38C0be3VD7vwsbG/C54r5jewA7Rww7Rww7Rww7Rww7Rww7Rww7Rww7Rww7Rww7Rww7Rww47nLU33V6ksJflOtE46maSJtvr92JPy6NY07c3l/R5e5knHcmhhfbjmiUeS9aIHnaIHnaIHnaIHnaIHnaIHnaIHnaIHnaIHnaIHnaIHnbqO5xVkm47PM60dr3NY6zV7RPDpkqz70tVu37b8XFW6nbqnqo2hp1px3HYqUf/ans5x5WkDy2+/07do2+znEs49+e16nCfSumfd9GY3sBOfU1/p+'+
			'HPlrc+434f+xvGySrt1+7n/Lz6vt9cnPj6JPXoV+o+Rx3aWmnGeqt99KsEY1ipOfxKRH8SpjewQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwQ/SwUz/nFNqZq/mcrilcpx5AKYj+PFfi5GbFYXoDO6zp21tq+HPtnmIhpjgnIfr21up+wudLekg9gFIwvYEdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdoocdDhccjyr1AErBmh52iB52iB52iB52iB52iB52iB52iB52iB52iB52iB52iB52iB52iH48VpI220uVdCSZI3rYIXrYIXrY'+
			'IXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYIXrYqX+A64ftBWX7nHoAOWNNDztEDzv/BwPJCIvZg9FnAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 3";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 320px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 120px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_3.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._button_813=document.createElement('div');
		els=me._button_813__img=document.createElement('img');
		els.className='ggskin ggskin_button_813';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=37;
		el.ggDy=-87;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_813.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_813.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("5") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_813.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_813.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_813.style[domTransition]='width 0s, height 0s';
				if (me._button_813.ggCurrentLogicStateSize == 0) {
					me._button_813.style.width='15px';
					me._button_813.style.height='15px';
					skin.updateSize(me._button_813);
				}
				else {
					me._button_813.style.width='10px';
					me._button_813.style.height='10px';
					skin.updateSize(me._button_813);
				}
			}
		}
		me._button_813.onclick=function (e) {
			player.openNext("{node12}","");
		}
		me._button_813.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_813);
		el=me._button_812=document.createElement('div');
		els=me._button_812__img=document.createElement('img');
		els.className='ggskin ggskin_button_812';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=-27;
		el.ggDy=-70;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_812.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_812.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("3") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_812.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_812.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_812.style[domTransition]='width 0s, height 0s';
				if (me._button_812.ggCurrentLogicStateSize == 0) {
					me._button_812.style.width='15px';
					me._button_812.style.height='15px';
					skin.updateSize(me._button_812);
				}
				else {
					me._button_812.style.width='10px';
					me._button_812.style.height='10px';
					skin.updateSize(me._button_812);
				}
			}
		}
		me._button_812.onclick=function (e) {
			player.openNext("{node8}","");
		}
		me._button_812.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_812);
		el=me._button_811=document.createElement('div');
		els=me._button_811__img=document.createElement('img');
		els.className='ggskin ggskin_button_811';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=-27;
		el.ggDy=-49;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_811.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_811.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("4") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_811.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_811.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_811.style[domTransition]='width 0s, height 0s';
				if (me._button_811.ggCurrentLogicStateSize == 0) {
					me._button_811.style.width='15px';
					me._button_811.style.height='15px';
					skin.updateSize(me._button_811);
				}
				else {
					me._button_811.style.width='10px';
					me._button_811.style.height='10px';
					skin.updateSize(me._button_811);
				}
			}
		}
		me._button_811.onclick=function (e) {
			player.openNext("{node2}","");
		}
		me._button_811.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_811);
		el=me._button_810=document.createElement('div');
		els=me._button_810__img=document.createElement('img');
		els.className='ggskin ggskin_button_810';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=37;
		el.ggDy=-49;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_810.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_810.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("7") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_810.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_810.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_810.style[domTransition]='width 0s, height 0s';
				if (me._button_810.ggCurrentLogicStateSize == 0) {
					me._button_810.style.width='15px';
					me._button_810.style.height='15px';
					skin.updateSize(me._button_810);
				}
				else {
					me._button_810.style.width='10px';
					me._button_810.style.height='10px';
					skin.updateSize(me._button_810);
				}
			}
		}
		me._button_810.onclick=function (e) {
			player.openNext("{node13}","");
		}
		me._button_810.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_810);
		el=me._button_89=document.createElement('div');
		els=me._button_89__img=document.createElement('img');
		els.className='ggskin ggskin_button_89';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=0;
		el.ggDy=-75;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_89.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_89.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("6") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_89.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_89.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_89.style[domTransition]='width 0s, height 0s';
				if (me._button_89.ggCurrentLogicStateSize == 0) {
					me._button_89.style.width='15px';
					me._button_89.style.height='15px';
					skin.updateSize(me._button_89);
				}
				else {
					me._button_89.style.width='10px';
					me._button_89.style.height='10px';
					skin.updateSize(me._button_89);
				}
			}
		}
		me._button_89.onclick=function (e) {
			player.openNext("{node10}","");
		}
		me._button_89.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_89);
		el=me._button_88=document.createElement('div');
		els=me._button_88__img=document.createElement('img');
		els.className='ggskin ggskin_button_88';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=0;
		el.ggDy=-13;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_88.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_88.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("9") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_88.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_88.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_88.style[domTransition]='width 0s, height 0s';
				if (me._button_88.ggCurrentLogicStateSize == 0) {
					me._button_88.style.width='15px';
					me._button_88.style.height='15px';
					skin.updateSize(me._button_88);
				}
				else {
					me._button_88.style.width='10px';
					me._button_88.style.height='10px';
					skin.updateSize(me._button_88);
				}
			}
		}
		me._button_88.onclick=function (e) {
			player.openNext("{node11}","");
		}
		me._button_88.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_88);
		el=me._button_87=document.createElement('div');
		els=me._button_87__img=document.createElement('img');
		els.className='ggskin ggskin_button_87';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=37;
		el.ggDy=-13;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_87.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_87.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("8") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_87.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_87.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_87.style[domTransition]='width 0s, height 0s';
				if (me._button_87.ggCurrentLogicStateSize == 0) {
					me._button_87.style.width='15px';
					me._button_87.style.height='15px';
					skin.updateSize(me._button_87);
				}
				else {
					me._button_87.style.width='10px';
					me._button_87.style.height='10px';
					skin.updateSize(me._button_87);
				}
			}
		}
		me._button_87.onclick=function (e) {
			player.openNext("{node3}","");
		}
		me._button_87.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_87);
		el=me._button_86=document.createElement('div');
		els=me._button_86__img=document.createElement('img');
		els.className='ggskin ggskin_button_86';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=37;
		el.ggDy=22;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_86.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_86.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("10") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_86.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_86.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_86.style[domTransition]='width 0s, height 0s';
				if (me._button_86.ggCurrentLogicStateSize == 0) {
					me._button_86.style.width='15px';
					me._button_86.style.height='15px';
					skin.updateSize(me._button_86);
				}
				else {
					me._button_86.style.width='10px';
					me._button_86.style.height='10px';
					skin.updateSize(me._button_86);
				}
			}
		}
		me._button_86.onclick=function (e) {
			player.openNext("{node4}","");
		}
		me._button_86.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_86);
		el=me._button_85=document.createElement('div');
		els=me._button_85__img=document.createElement('img');
		els.className='ggskin ggskin_button_85';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=37;
		el.ggDy=90;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_85.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_85.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("11") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_85.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_85.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_85.style[domTransition]='width 0s, height 0s';
				if (me._button_85.ggCurrentLogicStateSize == 0) {
					me._button_85.style.width='15px';
					me._button_85.style.height='15px';
					skin.updateSize(me._button_85);
				}
				else {
					me._button_85.style.width='10px';
					me._button_85.style.height='10px';
					skin.updateSize(me._button_85);
				}
			}
		}
		me._button_85.onclick=function (e) {
			player.openNext("{node5}","");
		}
		me._button_85.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_85);
		el=me._button_84=document.createElement('div');
		els=me._button_84__img=document.createElement('img');
		els.className='ggskin ggskin_button_84';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=37;
		el.ggDy=144;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_84.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_84.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("13") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_84.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_84.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_84.style[domTransition]='width 0s, height 0s';
				if (me._button_84.ggCurrentLogicStateSize == 0) {
					me._button_84.style.width='15px';
					me._button_84.style.height='15px';
					skin.updateSize(me._button_84);
				}
				else {
					me._button_84.style.width='10px';
					me._button_84.style.height='10px';
					skin.updateSize(me._button_84);
				}
			}
		}
		me._button_84.onclick=function (e) {
			player.openNext("{node6}","");
		}
		me._button_84.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_84);
		el=me._button_83=document.createElement('div');
		els=me._button_83__img=document.createElement('img');
		els.className='ggskin ggskin_button_83';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=-34;
		el.ggDy=88;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_83.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_83.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("12") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_83.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_83.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_83.style[domTransition]='width 0s, height 0s';
				if (me._button_83.ggCurrentLogicStateSize == 0) {
					me._button_83.style.width='15px';
					me._button_83.style.height='15px';
					skin.updateSize(me._button_83);
				}
				else {
					me._button_83.style.width='10px';
					me._button_83.style.height='10px';
					skin.updateSize(me._button_83);
				}
			}
		}
		me._button_83.onclick=function (e) {
			player.openNext("{node7}","");
		}
		me._button_83.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_83);
		el=me._button_82=document.createElement('div');
		els=me._button_82__img=document.createElement('img');
		els.className='ggskin ggskin_button_82';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=-34;
		el.ggDy=117;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_82.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_82.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("16") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_82.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_82.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_82.style[domTransition]='width 0s, height 0s';
				if (me._button_82.ggCurrentLogicStateSize == 0) {
					me._button_82.style.width='15px';
					me._button_82.style.height='15px';
					skin.updateSize(me._button_82);
				}
				else {
					me._button_82.style.width='10px';
					me._button_82.style.height='10px';
					skin.updateSize(me._button_82);
				}
			}
		}
		me._button_82.onclick=function (e) {
			player.openNext("{node16}","");
		}
		me._button_82.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_82);
		el=me._button_81=document.createElement('div');
		els=me._button_81__img=document.createElement('img');
		els.className='ggskin ggskin_button_81';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=-34;
		el.ggDy=144;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_81.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_81.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("15") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_81.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_81.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_81.style[domTransition]='width 0s, height 0s';
				if (me._button_81.ggCurrentLogicStateSize == 0) {
					me._button_81.style.width='15px';
					me._button_81.style.height='15px';
					skin.updateSize(me._button_81);
				}
				else {
					me._button_81.style.width='10px';
					me._button_81.style.height='10px';
					skin.updateSize(me._button_81);
				}
			}
		}
		me._button_81.onclick=function (e) {
			player.openNext("{node15}","");
		}
		me._button_81.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_81);
		el=me._button_80=document.createElement('div');
		els=me._button_80__img=document.createElement('img');
		els.className='ggskin ggskin_button_80';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=-1;
		el.ggDy=144;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_80.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_80.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("14") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_80.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_80.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_80.style[domTransition]='width 0s, height 0s';
				if (me._button_80.ggCurrentLogicStateSize == 0) {
					me._button_80.style.width='15px';
					me._button_80.style.height='15px';
					skin.updateSize(me._button_80);
				}
				else {
					me._button_80.style.width='10px';
					me._button_80.style.height='10px';
					skin.updateSize(me._button_80);
				}
			}
		}
		me._button_80.onclick=function (e) {
			player.openNext("{node14}","");
		}
		me._button_80.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_80);
		el=me._button_8=document.createElement('div');
		els=me._button_8__img=document.createElement('img');
		els.className='ggskin ggskin_button_8';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 8";
		el.ggDx=-9;
		el.ggDy=-123;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 10px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 10px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_8.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("2") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_8.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_8.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_8.style[domTransition]='width 0s, height 0s';
				if (me._button_8.ggCurrentLogicStateSize == 0) {
					me._button_8.style.width='15px';
					me._button_8.style.height='15px';
					skin.updateSize(me._button_8);
				}
				else {
					me._button_8.style.width='10px';
					me._button_8.style.height='10px';
					skin.updateSize(me._button_8);
				}
			}
		}
		me._button_8.onclick=function (e) {
			player.openNext("{node9}","");
		}
		me._button_8.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_8);
		el=me._button_4=document.createElement('div');
		els=me._button_4__img=document.createElement('img');
		els.className='ggskin ggskin_button_4';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAYAAACo29JGAAAE2klEQVRogd2a0XHjOAyGv/Xcu93B5iqIr4L1VRB3AG0F56vgtB04FZzQQVLByhWsXcHZHcQV5B4IJTJFWqQkz2b2n/HEYmSSPwmAAIhPr6+v/Kr4beoOReQOWAFL+9wBnwOvnoE9cLS/tarup5zLpyl2zgitgQK4H9HVCXgCqimIjiInIitgAzyMnUgAOxzJamgHg8jZTm25DSkfB2CjqnXuD7PJiUgJ/JMwoRrTqdDERKTRxyVOR7/09PkIlKr6kjrXZHIissDpQ2wSJ6DCidIxdQJe/2ucmMf09gSsU/UxiZytcg3MIwOWY3QjMN4KKAkv5Bknpr3j9ZLrIfZNVcu+QYZCRNY4aQiN/bWP4FVyV4gdgGLqcykyhwWOYMh4XSUYJWcWcU+X2DOOWL'+
			'JiTwER2QJ/Bf71Z8ySBsnZatV0FVtVtRg1yxEQkQL412s+A8uQEZtF+in5YMRsAhXw1Wue46x4B52dM0v13XvvoKrLaaY4HiJSAeI1d4xbaOcq7/mMO38+DEyCDl7zxuzEGy6iApNp34MvhhzK1t+C9wjhzj5HLiOBoYapAH60nuc4dSqahguxFJEjl+R2qrrKHdVWsMTteOiMauMZ2A7xHSOu4O/NZsxaLxZ0d20zcMD/cDrRRwzc+fVdRJ5sp3OwxalNG29zbuucr1e7nENaRBYiUtPvVMfwAOzNcUiCifTWay6aL7NmYnQ9gDJ1kNa52OfZ9+EzUPuGoQc+ubm5bW875+/aKVMHtoyLwNuInlsh2O49e80X5FbeP5M7t3PRP3PG4t50NxX+fFcQJ1dndFxlvJuDTYaB8cl9FpFFQ863knVKj6b8oczWFJjTMg7X'+
			'YKJ58pqXMxOrNk4ZB2vS4COQ079v2Zch9+uY0eGt/c0cI+WTW8yA3IOzjbGmvxc5556PGd3Vv3l0nYnBix+L534JzOhaxg8TtxkGpzPG7txu5O97MSYJFSKXs3O31s+cxVt5zy+zgA85z/AMqozBhyDZDcQFwm3sm53zQ/ZVSm8mMrcSzTOJi2dRhO8pvZHzxSsnZ1JmvJuDbYantPKeD6r60pCre16OwsT6MfX9RBwy0/T+ZtTwblBCXnXy7qnqhq5oD8WJjMU1kfQD7RqMXCTgy82frAJ95OIArDIzYoX3fFLVJ7g8CirvpS+BiCEKVX1R1TXwjW7SJgWPOGLH1B+YVfc3oWq+vJEztn5MVObO0HRliZtsCkkF/lDVzYAcZkk3w1Y1X/y8ZUH3ouFvVfWTMMmw3V/SdYBrYD80KWvRwg+v+eI+I3RXsOcyjoreov'+
			'wsRG6hzsBde7FC7pcvw3NgSML0lghl2zrFAB1ykXPrntu7WkmwS0g/27YLqU4wKoicWw92dfTTICIburer0Vuoa9fGC1w+JXQfnnsWjUbkTg6cpQ1GJ0Mv/LPqQcbAPJCKcL5m2IV/q/OrpRrkObhZMDEsI2OPK9VoDbLErV4o1XbGWdinqUjaeVsSL2Vcp9xl5JZHVcSL2Zr4a1A5YauscUM8i51V/zKksO2aqDQ48V7Ytgde2hMyIs2nKWzrS8DerrCtjda18NS3OyHscLVe2dIwtpj0jtuR3OF2qh7awVRlwAtcXFUw7hLywHsZ8HHsvCYh14ZXntFEA0u6Otoklmqcs1BP7Zz/D3cUKuCTKkgaAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 4";
		el.ggDx=22;
		el.ggDy=-127;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 11px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 11px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_4.logicBlock_size = function() {
			var newLogicStateSize;
			if (
				((me.ggUserdata.tags.indexOf("1") != -1))
			)
			{
				newLogicStateSize = 0;
			}
			else {
				newLogicStateSize = -1;
			}
			if (me._button_4.ggCurrentLogicStateSize != newLogicStateSize) {
				me._button_4.ggCurrentLogicStateSize = newLogicStateSize;
				me._button_4.style[domTransition]='width 0s, height 0s';
				if (me._button_4.ggCurrentLogicStateSize == 0) {
					me._button_4.style.width='15px';
					me._button_4.style.height='15px';
					skin.updateSize(me._button_4);
				}
				else {
					me._button_4.style.width='11px';
					me._button_4.style.height='11px';
					skin.updateSize(me._button_4);
				}
			}
		}
		me._button_4.onclick=function (e) {
			player.openNext("{node1}","");
		}
		me._button_4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_3.appendChild(me._button_4);
		me._container_2.appendChild(me._image_3);
		me.divSkin.appendChild(me._container_2);
		me._button_2.style[domTransition]='none';
		me._button_2.style.visibility='hidden';
		me._button_2.ggVisible=false;
		me._button_9.style[domTransition]='none';
		me._button_9.style.visibility='hidden';
		me._button_9.ggVisible=false;
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_hotspot_1(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._hotspot_1=document.createElement('div');
		el.ggId="Hotspot 1";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_1.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._hotspot_1.onclick=function (e) {
			player.openNext(me.hotspot.url,"");
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_4=document.createElement('div');
		els=me._image_4__img=document.createElement('img');
		els.className='ggskin ggskin_image_4';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAYAAABHGbl4AAADmUlEQVRoge1a0XHkIAx98dx/3EHcwbmD4yq4LcHpICW4hJTgEvYqOKcDpwOnA28FyodhlsWAJWCTTebejD68KyQ9EBgL7ogI3xE/rmBTaWkB1AB+BfReACwAJgCjlmK4KzRiHYADgD+Zdv4COAIYMu0ARJQqNRH1RLRQeSzadp0aXyqpaxEKERTHKE3FVqfKQ0TnhPOcmQDMWmw0Wlqc5+R9xOYr1nSf2JEKeuFpp3cHIjqk9K6Wg7YRwxPXHtdpzOEzETUZhFxptM0QhhLEaiKaAg7GwoR8BMeA74l2FpY94yFS7JQoIKEpMKUS86XfQkTtB5Iy0pJ/FQ6mpaSXPovUHjlv9oQM3BqpPXKb2HyNffPqFkjFOn4z39xGvafRRy4UXPFNld7WsXcetd'+
			'4h2DuAF70rSIXZWdSWnRHrrn6EZCexxYjLL4cT1t3MAuBixHyj1WT06Oyx52LOyIgmNmq2ojsphwRniknIR1Al+BscO4tLrPM4k46Wz4YUndCnb9Q6m9jR+VM6WiVIXQQmEHfUjjYxF5JduipIykCSlgen7UK0rooKwD9ndakFq9OM+PdZCt6wrnBcLLhczX9X2C7no8Bgh/KkoG12Av3ReVYV1neNDcm7pRfoSiGx7cbcVtim3cg01uI6o2XwgG2nhzA6z7VvxBamMcXUywHXhxtzW2FbROGmomSBSQXXhxvzfVU6klvBf2JfDRXWF7IN7ko0lw0ly4cb86nCduJxJ+zI1MsB14cb81Rh2yuKaWzGWnq+Fl7BHzHlPM8+YtxUBIBnga4UEtub3dO33QSHvp4lny2+qlEuJFUx72eLWe6PTg90gt6aADwK9PfwCNlG'+
			'vHOeVy4B1kRftzRwILos5syOgrQ8YNIydJARw0RpRVm3LDCb/2yl3uMwtQLcMQlOJB+l2Nzuzf/XLpg2un3j/D5jffnOGbZHMAumIEbp+EbEl10XhVdfI18KqRsgY0R54ts9lAjl7rc4RgL5l+7PJhci1fn0Y4aGADn1CaRUgNQQarNn0EeO6GMXlD4QQ5AUh1iM3EjXTc2WwtchoqS4xGLkjJOmIKGG4W/XjsRhR/GLYUfKv3LknvrYWEiwS0m5JDYA+Lmj94LzUaw5lrWhsO50zFFu6LKmwVUviUlGrxREo2RLzlyoiX/WLMWsbSdfxCx1dfZgSezeYQwnrB+JRrJQipgNM29anC9cujWRN5wvaJrLzjlXIzZ4BwRzJlT4RuesAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 4";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_4.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hotspot_1.appendChild(me._image_4);
		me.__div = me._hotspot_1;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'Hotspot 1';
			hsinst = new SkinHotspotClass_hotspot_1(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['Hotspot 1']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 1'].length; i++) {
				hotspotTemplates['Hotspot 1'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._container_3.logicBlock_visible();
	me._container_2.logicBlock_visible();
	me._text_1.logicBlock_text();
	me._button_813.logicBlock_size();
	me._button_812.logicBlock_size();
	me._button_811.logicBlock_size();
	me._button_810.logicBlock_size();
	me._button_89.logicBlock_size();
	me._button_88.logicBlock_size();
	me._button_87.logicBlock_size();
	me._button_86.logicBlock_size();
	me._button_85.logicBlock_size();
	me._button_84.logicBlock_size();
	me._button_83.logicBlock_size();
	me._button_82.logicBlock_size();
	me._button_81.logicBlock_size();
	me._button_80.logicBlock_size();
	me._button_8.logicBlock_size();
	me._button_4.logicBlock_size();
	player.addListener('sizechanged', function(args) { me._container_3.logicBlock_visible();me._container_2.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me._text_1.logicBlock_text();me._button_813.logicBlock_size();me._button_812.logicBlock_size();me._button_811.logicBlock_size();me._button_810.logicBlock_size();me._button_89.logicBlock_size();me._button_88.logicBlock_size();me._button_87.logicBlock_size();me._button_86.logicBlock_size();me._button_85.logicBlock_size();me._button_84.logicBlock_size();me._button_83.logicBlock_size();me._button_82.logicBlock_size();me._button_81.logicBlock_size();me._button_80.logicBlock_size();me._button_8.logicBlock_size();me._button_4.logicBlock_size(); });
	me.skinTimerEvent();
};
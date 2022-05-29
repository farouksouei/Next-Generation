/** @namespace */
var THREEx		= THREEx 		|| {};

// # Constructor
THREEx.DomEvents	= function(camera, domElement)
{
	this._camera	= camera || null;
	this._domElement= domElement || document;
	this._raycaster = new THREE.Raycaster();
	this._selected	= null;
	this._boundObjs	= {};
	// Bind dom event for mouse and touch
	var _this	= this;

	this._$onClick		= function(){ _this._onClick.apply(_this, arguments);		};
	this._$onDblClick	= function(){ _this._onDblClick.apply(_this, arguments);	};
	this._$onMouseMove	= function(){ _this._onMouseMove.apply(_this, arguments);	};
	this._$onMouseDown	= function(){ _this._onMouseDown.apply(_this, arguments);	};
	this._$onMouseUp	= function(){ _this._onMouseUp.apply(_this, arguments);		};
	this._$onTouchMove	= function(){ _this._onTouchMove.apply(_this, arguments);	};
	this._$onTouchStart	= function(){ _this._onTouchStart.apply(_this, arguments);	};
	this._$onTouchEnd	= function(){ _this._onTouchEnd.apply(_this, arguments);	};
	this._$onContextmenu	= function(){ _this._onContextmenu.apply(_this, arguments);	};
	this._domElement.addEventListener( 'click'	, this._$onClick	, false );
	this._domElement.addEventListener( 'dblclick'	, this._$onDblClick	, false );
	this._domElement.addEventListener( 'mousemove'	, this._$onMouseMove	, false );
	this._domElement.addEventListener( 'mousedown'	, this._$onMouseDown	, false );
	this._domElement.addEventListener( 'mouseup'	, this._$onMouseUp	, false );
	this._domElement.addEventListener( 'touchmove'	, this._$onTouchMove	, false );
	this._domElement.addEventListener( 'touchstart'	, this._$onTouchStart	, false );
	this._domElement.addEventListener( 'touchend'	, this._$onTouchEnd	, false );
	this._domElement.addEventListener( 'contextmenu', this._$onContextmenu	, false );
	
}

// # Destructor
THREEx.DomEvents.prototype.destroy	= function()
{
	// unBind dom event for mouse and touch
	this._domElement.removeEventListener( 'click'		, this._$onClick	, false );
	this._domElement.removeEventListener( 'dblclick'	, this._$onDblClick	, false );
	this._domElement.removeEventListener( 'mousemove'	, this._$onMouseMove	, false );
	this._domElement.removeEventListener( 'mousedown'	, this._$onMouseDown	, false );
	this._domElement.removeEventListener( 'mouseup'		, this._$onMouseUp	, false );
	this._domElement.removeEventListener( 'touchmove'	, this._$onTouchMove	, false );
	this._domElement.removeEventListener( 'touchstart'	, this._$onTouchStart	, false );
	this._domElement.removeEventListener( 'touchend'	, this._$onTouchEnd	, false );
	this._domElement.removeEventListener( 'contextmenu'	, this._$onContextmenu	, false );
}

THREEx.DomEvents.eventNames	= [
	"click",
	"dblclick",
	"mouseover",
	"mouseout",
	"mousemove",
	"mousedown",
	"mouseup",
	"contextmenu",
	"touchstart",
	"touchend"
];

THREEx.DomEvents.prototype._getRelativeMouseXY	= function(domEvent){
	var element = domEvent.target || domEvent.srcElement;
	if (element.nodeType === 3) {
		element = element.parentNode; // Safari fix -- see http://www.quirksmode.org/js/events_properties.html
	}
	
	//get the real position of an element relative to the page starting point (0, 0)
	//credits go to brainjam on answering http://stackoverflow.com/questions/5755312/getting-mouse-position-relative-to-content-area-of-an-element
	var elPosition	= { x : 0 , y : 0};
	var tmpElement	= element;
	//store padding
	var style	= getComputedStyle(tmpElement, null);
	elPosition.y += parseInt(style.getPropertyValue("padding-top"), 10);
	elPosition.x += parseInt(style.getPropertyValue("padding-left"), 10);
	//add positions
	do {
		elPosition.x	+= tmpElement.offsetLeft;
		elPosition.y	+= tmpElement.offsetTop;
		style		= getComputedStyle(tmpElement, null);

		elPosition.x	+= parseInt(style.getPropertyValue("border-left-width"), 10);
		elPosition.y	+= parseInt(style.getPropertyValue("border-top-width"), 10);
	} while(tmpElement = tmpElement.offsetParent);
	
	var elDimension	= {
		width	: (element === window) ? window.innerWidth	: element.offsetWidth,
		height	: (element === window) ? window.innerHeight	: element.offsetHeight
	};
	
	return {
		x : +((domEvent.pageX - elPosition.x) / elDimension.width ) * 2 - 1,
		y : -((domEvent.pageY - elPosition.y) / elDimension.height) * 2 + 1
	};
};


/********************************************************************************/
/*		domevent context						*/
/********************************************************************************/

// handle domevent context in object3d instance

THREEx.DomEvents.prototype._objectCtxInit	= function(object3d){
	object3d._3xDomEvent = {};
}
THREEx.DomEvents.prototype._objectCtxDeinit	= function(object3d){
	delete object3d._3xDomEvent;
}
THREEx.DomEvents.prototype._objectCtxIsInit	= function(object3d){
	return object3d._3xDomEvent ? true : false;
}
THREEx.DomEvents.prototype._objectCtxGet		= function(object3d){
	return object3d._3xDomEvent;
}

/********************************************************************************/
/*										*/
/********************************************************************************/

/**
 * Getter/Setter for camera
*/
THREEx.DomEvents.prototype.camera	= function(value)
{
	if( value )	this._camera	= value;
	return this._camera;
}

THREEx.DomEvents.prototype.bind	= function(object3d, eventName, callback, useCapture)
{
	console.assert( THREEx.DomEvents.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);
	var objectCtx	= this._objectCtxGet(object3d);	
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	objectCtx[eventName+'Handlers'].push({
		callback	: callback,
		useCapture	: useCapture
	});
	
	// add this object in this._boundObjs
	if( this._boundObjs[eventName] === undefined ){
		this._boundObjs[eventName]	= [];	
	}
	this._boundObjs[eventName].push(object3d);
}
THREEx.DomEvents.prototype.addEventListener	= THREEx.DomEvents.prototype.bind

THREEx.DomEvents.prototype.unbind	= function(object3d, eventName, callback, useCapture)
{
	console.assert( THREEx.DomEvents.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);

	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		if( callback != handler.callback )	continue;
		if( useCapture != handler.useCapture )	continue;
		handlers.splice(i, 1)
		break;
	}
	// from this object from this._boundObjs
	var index	= this._boundObjs[eventName].indexOf(object3d);
	console.assert( index !== -1 );
	this._boundObjs[eventName].splice(index, 1);
}
THREEx.DomEvents.prototype.removeEventListener	= THREEx.DomEvents.prototype.unbind

THREEx.DomEvents.prototype._bound	= function(eventName, object3d)
{
	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx )	return false;
	return objectCtx[eventName+'Handlers'] ? true : false;
}

/********************************************************************************/
/*		onMove								*/
/********************************************************************************/

// # handle mousemove kind of events

THREEx.DomEvents.prototype._onMove	= function(eventName, mouseX, mouseY, origDomEvent)
{
//console.log('eventName', eventName, 'boundObjs', this._boundObjs[eventName])
	// get objects bound to this event
	var boundObjs	= this._boundObjs[eventName];
	if( boundObjs === undefined || boundObjs.length === 0 )	return;
	// compute the intersection
	var vector = new THREE.Vector2();

	// update the picking ray with the camera and mouse position
	vector.set( mouseX, mouseY );
	this._raycaster.setFromCamera( vector, this._camera );	

	var intersects = this._raycaster.intersectObjects( boundObjs );

	var oldSelected	= this._selected;
	
	if( intersects.length > 0 ){
		var notifyOver, notifyOut, notifyMove;
		var intersect	= intersects[ 0 ];
		var newSelected	= intersect.object;
		this._selected	= newSelected;
		// if newSelected bound mousemove, notify it
		notifyMove	= this._bound('mousemove', newSelected);

		if( oldSelected != newSelected ){
			// if newSelected bound mouseenter, notify it
			notifyOver	= this._bound('mouseover', newSelected);
			// if there is a oldSelect and oldSelected bound mouseleave, notify it
			notifyOut	= oldSelected && this._bound('mouseout', oldSelected);
		}
	}else{
		// if there is a oldSelect and oldSelected bound mouseleave, notify it
		notifyOut	= oldSelected && this._bound('mouseout', oldSelected);
		this._selected	= null;
	}


	// notify mouseMove - done at the end with a copy of the list to allow callback to remove handlers
	notifyMove && this._notify('mousemove', newSelected, origDomEvent, intersect);
	// notify mouseEnter - done at the end with a copy of the list to allow callback to remove handlers
	notifyOver && this._notify('mouseover', newSelected, origDomEvent, intersect);
	// notify mouseLeave - done at the end with a copy of the list to allow callback to remove handlers
	notifyOut  && this._notify('mouseout' , oldSelected, origDomEvent, intersect);
}


/********************************************************************************/
/*		onEvent								*/
/********************************************************************************/

// # handle click kind of events

THREEx.DomEvents.prototype._onEvent	= function(eventName, mouseX, mouseY, origDomEvent)
{
	//console.log('eventName', eventName, 'boundObjs', this._boundObjs[eventName])
	// get objects bound to this event
	var boundObjs	= this._boundObjs[eventName];
	if( boundObjs === undefined || boundObjs.length === 0 )	return;
	// compute the intersection
	var vector = new THREE.Vector2();

	// update the picking ray with the camera and mouse position
	vector.set( mouseX, mouseY );
	this._raycaster.setFromCamera( vector, this._camera );	

	var intersects = this._raycaster.intersectObjects( boundObjs, true);
	// if there are no intersections, return now
	if( intersects.length === 0 )	return;

	// init some variables
	var intersect	= intersects[0];
	var object3d	= intersect.object;
	var objectCtx	= this._objectCtxGet(object3d);
	var objectParent = object3d.parent;

	while ( typeof(objectCtx) == 'undefined' && objectParent )
	{
	    objectCtx = this._objectCtxGet(objectParent);
	    objectParent = objectParent.parent;
	}
	if( !objectCtx )	return;

	// notify handlers
	this._notify(eventName, object3d, origDomEvent, intersect);
}

THREEx.DomEvents.prototype._notify	= function(eventName, object3d, origDomEvent, intersect)
{
	var objectCtx	= this._objectCtxGet(object3d);
	var handlers	= objectCtx ? objectCtx[eventName+'Handlers'] : null;
	
	// parameter check
	console.assert(arguments.length === 4)

	// do bubbling
	if( !objectCtx || !handlers || handlers.length === 0 ){
		object3d.parent && this._notify(eventName, object3d.parent, origDomEvent, intersect);
		return;
	}
	
	// notify all handlers
	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		var toPropagate	= true;
		handler.callback({
			type		: eventName,
			target		: object3d,
			origDomEvent	: origDomEvent,
			intersect	: intersect,
			stopPropagation	: function(){
				toPropagate	= false;
			}
		});
		if( !toPropagate )	continue;
		// do bubbling
		if( handler.useCapture === false ){
			object3d.parent && this._notify(eventName, object3d.parent, origDomEvent, intersect);
		}
	}
}

/********************************************************************************/
/*		handle mouse events						*/
/********************************************************************************/
// # handle mouse events

THREEx.DomEvents.prototype._onMouseDown	= function(event){ return this._onMouseEvent('mousedown', event);	}
THREEx.DomEvents.prototype._onMouseUp	= function(event){ return this._onMouseEvent('mouseup'	, event);	}


THREEx.DomEvents.prototype._onMouseEvent	= function(eventName, domEvent)
{
	var mouseCoords = this._getRelativeMouseXY(domEvent);
	this._onEvent(eventName, mouseCoords.x, mouseCoords.y, domEvent);
}

THREEx.DomEvents.prototype._onMouseMove	= function(domEvent)
{
	var mouseCoords = this._getRelativeMouseXY(domEvent);
	this._onMove('mousemove', mouseCoords.x, mouseCoords.y, domEvent);
	this._onMove('mouseover', mouseCoords.x, mouseCoords.y, domEvent);
	this._onMove('mouseout' , mouseCoords.x, mouseCoords.y, domEvent);
}

THREEx.DomEvents.prototype._onClick		= function(event)
{
	// TODO handle touch ?
	this._onMouseEvent('click'	, event);
}
THREEx.DomEvents.prototype._onDblClick		= function(event)
{
	// TODO handle touch ?
	this._onMouseEvent('dblclick'	, event);
}

THREEx.DomEvents.prototype._onContextmenu	= function(event)
{
	//TODO don't have a clue about how this should work with touch..
	this._onMouseEvent('contextmenu'	, event);
}

/********************************************************************************/
/*		handle touch events						*/
/********************************************************************************/
// # handle touch events


THREEx.DomEvents.prototype._onTouchStart	= function(event){ return this._onTouchEvent('touchstart', event);	}
THREEx.DomEvents.prototype._onTouchEnd	= function(event){ return this._onTouchEvent('touchend'	, event);	}

THREEx.DomEvents.prototype._onTouchMove	= function(domEvent)
{
	if( domEvent.touches.length != 1 )	return undefined;

	domEvent.preventDefault();

	var mouseX	= +(domEvent.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(domEvent.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
	this._onMove('mousemove', mouseX, mouseY, domEvent);
	this._onMove('mouseover', mouseX, mouseY, domEvent);
	this._onMove('mouseout' , mouseX, mouseY, domEvent);
}

THREEx.DomEvents.prototype._onTouchEvent	= function(eventName, domEvent)
{
	if( domEvent.touches.length != 1 )	return undefined;

	domEvent.preventDefault();

	var mouseX	= +(domEvent.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(domEvent.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
	this._onEvent(eventName, mouseX, mouseY, domEvent);	
}

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import 'bootstrap'
import { Camera } from 'three'
import sound1 from './audio/store.mp3'
import iphoneSound from './audio/iphone.mp3'
import samsungSound from './audio/samsung.mp3'
import ipodSound from './audio/ipod.mp3'
import tvSound from './audio/TV.mp3'
import powerSound from './audio/power.mp3'
import i7Sound from './audio/I7.mp3'
import viewSonicSound from './audio/viewsonic.mp3'
import viewSound from './audio/view.mp3'
import macbookSound from './audio/macbook.mp3'
import msiSound from './audio/msi.mp3'
import printerSound from './audio/printer.mp3'
import samsungPCSound from './audio/samsungPC.mp3'


// C:\Users\farou\Documents\Web Projects\3D_Store\static\audio

Audio
 var audio = new Audio(sound1)
 audio.play()
 var audioIphone = new Audio(iphoneSound)
 var audioSamsung = new Audio(samsungSound)
 var audioIpod =  new Audio(ipodSound)
 var audioTV =  new Audio(tvSound)
 var audioPower = new Audio(powerSound)
 var audioI7 = new Audio(i7Sound)
 var audioViewSonic = new Audio(viewSonicSound)
 var audioView = new Audio(viewSound)
 var audioMacbook = new Audio(macbookSound)
 var audioMsi = new Audio(msiSound)
 var audioSamsungPC = new Audio(samsungPCSound)
 var audioPrinter = new Audio(printerSound)

 const geometry = new THREE.SphereGeometry(0.5, 10, 10)
const material = new THREE.MeshNormalMaterial({ wireframe: true })
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null
/**
 * Phones And Stands
 */
 gltfLoader.load(
    '/models/rostore_sign.glb',
    (storesign) =>
    {
        storesign.scene.scale.set(0.06, 0.06, 0.06)
        storesign.scene.position.set(2.6, 1.9,-3)
        //storesign.scene.rotateZ(-(Math.PI / 16))
        scene.add(storesign.scene)

        // Animation
        mixer = new THREE.AnimationMixer(storesign.scene)
        const action = mixer.clipAction(storesign.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/store3dfinal.glb',
    (store) =>
    {
        store.scene.scale.set(0.1, 0.1, 0.1)
        store.scene.position.set(1, 0, 0)
        store.scene.castShadow = true;
        store.scene.receiveShadow = true;
        scene.add(store.scene)

        // Animation
        mixer = new THREE.AnimationMixer(store.scene)
        const action = mixer.clipAction(store.animations[2])
        action.play()
    }
)

const geometryphone = new THREE.CubeGeometry(0.1, 0.18, 0.1)
gltfLoader.load(
    '/models/ipod-touch-5g-006.glb',
    (ipod) =>
    {
        ipod.scene.scale.set(0.025, 0.025, 0.025)
        ipod.scene.position.set(3.65, 1.22,0.5)
        ipod.scene.rotateZ(-(Math.PI / 16))
        ipod.scene.rotateY(-(Math.PI / 2))
        scene.add(ipod.scene)

        // Animation
        mixer = new THREE.AnimationMixer(ipod.scene)
        const action = mixer.clipAction(ipod.animations[2])
        action.play()
    }
)

const sphereipod = new THREE.Mesh(geometryphone, material)
sphereipod.visible = false;
scene.add(sphereipod)
sphereipod.position.set(3.65, 1.22,0.5)

gltfLoader.load(
    '/models/stando2.glb',
    (ipodStand) =>
    {
        ipodStand.scene.scale.set(0.75, 0.75, 0.5)
        ipodStand.scene.position.set(3.65, 1, 0.5)
        ipodStand.scene.rotateY(-(Math.PI )/2)
        scene.add(ipodStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(ipodStand.scene)
        const action = mixer.clipAction(ipodStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/ipod-touch-5g-006.glb',
    (ipod) =>
    {
        ipod.scene.scale.set(0.025, 0.025, 0.025)
        ipod.scene.position.set(3.65, 1.22,0.25)
        ipod.scene.rotateZ(-(Math.PI / 16))
        ipod.scene.rotateY(-(Math.PI / 2))
        scene.add(ipod.scene)

        // Animation
        mixer = new THREE.AnimationMixer(ipod.scene)
        const action = mixer.clipAction(ipod.animations[2])
        action.play()
    }
)
const sphereipod1 = new THREE.Mesh(geometryphone, material)
sphereipod1.visible = false;
scene.add(sphereipod1)
sphereipod1.position.set(3.65, 1.22,0.25)

gltfLoader.load(
    '/models/stando2.glb',
    (ipodStand) =>
    {
        ipodStand.scene.scale.set(0.75, 0.75, 0.5)
        ipodStand.scene.position.set(3.65, 1, 0.25)
        ipodStand.scene.rotateY(-(Math.PI )/2)
        scene.add(ipodStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(ipodStand.scene)
        const action = mixer.clipAction(ipodStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/ipod-touch-5g-006.glb',
    (ipod) =>
    {
        ipod.scene.scale.set(0.025, 0.025, 0.025)
        ipod.scene.position.set(3.65, 1.22,0)
        ipod.scene.rotateZ(-(Math.PI / 16))
        ipod.scene.rotateY(-(Math.PI / 2))
        scene.add(ipod.scene)

        // Animation
        mixer = new THREE.AnimationMixer(ipod.scene)
        const action = mixer.clipAction(ipod.animations[2])
        action.play()
    }
)

const sphereipod2 = new THREE.Mesh(geometryphone, material)
sphereipod2.visible = false;
scene.add(sphereipod2)
sphereipod2.position.set(3.65, 1.22,0)

gltfLoader.load(
    '/models/stando2.glb',
    (ipodStand) =>
    {
        ipodStand.scene.scale.set(0.75, 0.75, 0.5)
        ipodStand.scene.position.set(3.65, 1, 0)
        ipodStand.scene.rotateY(-(Math.PI )/2)
        scene.add(ipodStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(ipodStand.scene)
        const action = mixer.clipAction(ipodStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/s22ultra5g.glb',
    (samsung) =>
    {
        samsung.scene.scale.set(0.25, 0.25, 0.25)
        samsung.scene.position.set(3.65, 1.22,2.2)
        samsung.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung.scene)
        const action = mixer.clipAction(samsung.animations[2])
        action.play()
    }
)


const spheresamsung = new THREE.Mesh(geometryphone, material)
spheresamsung.visible = false;
scene.add(spheresamsung)
spheresamsung.position.set(3.65, 1.22,2.2)

gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand) =>
    {
        samsungStand.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand.scene.position.set(3.65, 1, 2.2)
        samsungStand.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand.scene)
        const action = mixer.clipAction(samsungStand.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/s22ultrawhite.glb',
    (samsung1) =>
    {
        samsung1.scene.scale.set(0.25, 0.25, 0.25)
        samsung1.scene.position.set(3.65, 1.22,1.9)
        samsung1.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung1.scene)
        const action = mixer.clipAction(samsung1.animations[2])
        action.play()
    }
)

const spheresamsung1 = new THREE.Mesh(geometryphone, material)
spheresamsung1.visible = false;
scene.add(spheresamsung1)
spheresamsung1.position.set(3.65, 1.22,1.9)



gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand1) =>
    {
        samsungStand1.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand1.scene.position.set(3.65, 1, 1.9)
        samsungStand1.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand1.scene)
        const action = mixer.clipAction(samsungStand1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/s22ultragreen.glb',
    (samsung2) =>
    {
        samsung2.scene.scale.set(0.25, 0.25, 0.25)
        samsung2.scene.position.set(3.65, 1.22,1.6)
        samsung2.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung2.scene)
        const action = mixer.clipAction(samsung2.animations[2])
        action.play()
    }
)

const spheresamsung2 = new THREE.Mesh(geometryphone, material)
spheresamsung2.visible = false;
scene.add(spheresamsung2)
spheresamsung2.position.set(3.65, 1.22,1.6)


gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand2) =>
    {
        samsungStand2.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand2.scene.position.set(3.65, 1, 1.6)
        samsungStand2.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand2.scene)
        const action = mixer.clipAction(samsungStand2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNs22ultra.glb',
    (samsungSigne) =>
    {
        samsungSigne.scene.scale.set(1.5, 1.5, 1.5)
        samsungSigne.scene.position.set(3.7, 1.125,  1.9)
        //samsungSigne.scene.rotateY(-(Math.PI ))
        scene.add(samsungSigne.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungSigne.scene)
        const action = mixer.clipAction(samsungSigne.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNs22ultra_price.glb',
    (samsungSignePrice) =>
    {
        samsungSignePrice.scene.scale.set(1.5, 1.5, 1.5)
        samsungSignePrice.scene.position.set(3.9, 1.225,  0)
        samsungSignePrice.scene.rotateY(-(Math.PI ))
        scene.add(samsungSignePrice.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungSignePrice.scene)
        const action = mixer.clipAction(samsungSignePrice.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13ProMax.glb',
    (iphone13) =>
    {
        iphone13.scene.scale.set(0.25, 0.25, 0.25)
        iphone13.scene.position.set(3.69, 1.22, 4)
        iphone13.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone13.scene)
//
        // Animation
        mixer = new THREE.AnimationMixer(iphone13.scene)
        const action = mixer.clipAction(iphone13.animations[2])
        action.play()
    }
)

const sphereiphone = new THREE.Mesh(geometryphone, material)
sphereiphone.visible = false;
scene.add(sphereiphone)
sphereiphone.position.set(3.65, 1.22,3.7575)

gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand) =>
    {
        iphoneStand.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand.scene.position.set(3.65, 1, 4)
        iphoneStand.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand.scene)
        const action = mixer.clipAction(iphoneStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13pro3d2.glb',
    (iphone132) =>
    {
        iphone132.scene.scale.set(0.25, 0.25, 0.25)
        iphone132.scene.position.set(3.69, 1.22, 3.5)
        iphone132.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone132.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphone132.scene)
        const action = mixer.clipAction(iphone132.animations[2])
        action.play()
    }
)

const sphereiphone1 = new THREE.Mesh(geometryphone, material)
sphereiphone1.visible = false;
scene.add(sphereiphone1)
sphereiphone1.position.set(3.65, 1.22,3.5)

gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand2) =>
    {
        iphoneStand2.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand2.scene.position.set(3.65, 1, 3.5)
        iphoneStand2.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand2.scene)
        const action = mixer.clipAction(iphoneStand2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13pro3d3.glb',
    (iphone133) =>
    {
        iphone133.scene.scale.set(0.25, 0.25, 0.25)
        iphone133.scene.position.set(3.69, 1.22, 3.75)
        iphone133.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone133.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphone133.scene)
        const action = mixer.clipAction(iphone133.animations[2])
        action.play()
    }
)

const sphereiphone2 = new THREE.Mesh(geometryphone, material)
sphereiphone2.visible = false;
scene.add(sphereiphone2)
sphereiphone2.position.set(3.65, 1.22,4)

gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand3) =>
    {
        iphoneStand3.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand3.scene.position.set(3.65, 1, 3.75)
        iphoneStand3.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand3.scene)
        const action = mixer.clipAction(iphoneStand3.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/Printer.glb',
    (LowPoly_printer_Packed) =>
    {
        LowPoly_printer_Packed.scene.scale.set(2, 2, 2)
        LowPoly_printer_Packed.scene.position.set(3.65, 1, 7)
        LowPoly_printer_Packed.scene.rotateY(-(Math.PI )/2)
        scene.add(LowPoly_printer_Packed.scene)

        // Animation
        mixer = new THREE.AnimationMixer(LowPoly_printer_Packed.scene)
        const action = mixer.clipAction(LowPoly_printer_Packed.animations[2])
        action.play()
    }
)

const geometryprinter = new THREE.CubeGeometry(0.5, 0.5, 0.5)
const Printer = new THREE.Mesh(geometryprinter, material)
Printer.visible = false;
scene.add(Printer)
Printer.position.set(3.65, 1.22,7)


gltfLoader.load(
    '/models/PRINTER_sign.glb',
    (printerSigne) =>
    {
        printerSigne.scene.scale.set(0.5, 0.5, 0.5)
        printerSigne.scene.position.set(3.7, 1.12,  6.22)
        scene.add(printerSigne.scene)

        // Animation
        mixer = new THREE.AnimationMixer(printerSigne.scene)
        const action = mixer.clipAction(printerSigne.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGN13pro.glb',
    (iphoneSigne) =>
    {
        iphoneSigne.scene.scale.set(1.5, 1.5, 1.5)
        iphoneSigne.scene.position.set(3.7, 1.2,  4)
        //samsungSigne.scene.rotateY(-(Math.PI ))
        scene.add(iphoneSigne.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneSigne.scene)
        const action = mixer.clipAction(iphoneSigne.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/fixed-price-13-pro.glb',
    (iphoneSignePrice) =>
    {
        iphoneSignePrice.scene.scale.set(0.2, 0.2, 0.2)
        iphoneSignePrice.scene.position.set(3.85, 1.1, 2.5)
        iphoneSignePrice.scene.rotateY(-(Math.PI ))
        scene.add(iphoneSignePrice.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneSignePrice.scene)
        const action = mixer.clipAction(iphoneSignePrice.animations[2])
        action.play()
    }
)
//hot lena touskie
gltfLoader.load(
    '/models/s22ultra5g.glb',
    (samsung) =>
    {
        samsung.scene.scale.set(0.25, 0.25, 0.25)
        samsung.scene.position.set(3.65, 1.22,8)
        samsung.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung.scene)
        const action = mixer.clipAction(samsung.animations[2])
        action.play()
    }
)


const spheresamsung3 = new THREE.Mesh(geometryphone, material)
spheresamsung3.visible = false;
scene.add(spheresamsung3)
spheresamsung3.position.set(3.65, 1.22,8)

gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand) =>
    {
        samsungStand.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand.scene.position.set(3.65, 1, 8)
        samsungStand.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand.scene)
        const action = mixer.clipAction(samsungStand.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/s22ultrawhite.glb',
    (samsung1) =>
    {
        samsung1.scene.scale.set(0.25, 0.25, 0.25)
        samsung1.scene.position.set(3.65, 1.22,8.3)
        samsung1.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung1.scene)
        const action = mixer.clipAction(samsung1.animations[2])
        action.play()
    }
)

const spheresamsung4 = new THREE.Mesh(geometryphone, material)
spheresamsung4.visible = false;
scene.add(spheresamsung4)
spheresamsung4.position.set(3.65, 1.22,8.3)





gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand1) =>
    {
        samsungStand1.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand1.scene.position.set(3.65, 1, 8.3)
        samsungStand1.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand1.scene)
        const action = mixer.clipAction(samsungStand1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/s22ultragreen.glb',
    (samsung2) =>
    {
        samsung2.scene.scale.set(0.25, 0.25, 0.25)
        samsung2.scene.position.set(3.65, 1.22,8.6)
        samsung2.scene.rotateZ(-(Math.PI / 16))
        scene.add(samsung2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsung2.scene)
        const action = mixer.clipAction(samsung2.animations[2])
        action.play()
    }
)

const spheresamsung5 = new THREE.Mesh(geometryphone, material)
spheresamsung5.visible = false;
scene.add(spheresamsung5)
spheresamsung5.position.set(3.65, 1.22,8.6)




gltfLoader.load(
    '/models/stando2.glb',
    (samsungStand2) =>
    {
        samsungStand2.scene.scale.set(0.75, 0.75, 0.5)
        samsungStand2.scene.position.set(3.65, 1, 8.6)
        samsungStand2.scene.rotateY(-(Math.PI )/2)
        scene.add(samsungStand2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungStand2.scene)
        const action = mixer.clipAction(samsungStand2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNs22ultra.glb',
    (samsungSigne) =>
    {
        samsungSigne.scene.scale.set(1.5, 1.5, 1.5)
        samsungSigne.scene.position.set(3.7, 1.125,  8.6)
        //samsungSigne.scene.rotateY(-(Math.PI ))
        scene.add(samsungSigne.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungSigne.scene)
        const action = mixer.clipAction(samsungSigne.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNs22ultra_price.glb',
    (samsungSignePrice) =>
    {
        samsungSignePrice.scene.scale.set(1.5, 1.5, 1.5)
        samsungSignePrice.scene.position.set(3.9, 1.225,  7.7)
        samsungSignePrice.scene.rotateY(-(Math.PI ))
        scene.add(samsungSignePrice.scene)

        // Animation
        mixer = new THREE.AnimationMixer(samsungSignePrice.scene)
        const action = mixer.clipAction(samsungSignePrice.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13ProMax.glb',
    (iphone13) =>
    {
        iphone13.scene.scale.set(0.25, 0.25, 0.25)
        iphone13.scene.position.set(3.69, 1.22, 9.4)
        iphone13.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone13.scene)
//
        // Animation
        mixer = new THREE.AnimationMixer(iphone13.scene)
        const action = mixer.clipAction(iphone13.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand) =>
    {
        iphoneStand.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand.scene.position.set(3.65, 1, 9.4)
        iphoneStand.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand.scene)
        const action = mixer.clipAction(iphoneStand.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/13pro3d2.glb',
    (iphone132) =>
    {
        iphone132.scene.scale.set(0.25, 0.25, 0.25)
        iphone132.scene.position.set(3.69, 1.22, 9.7)
        iphone132.scene.rotateZ(-(Math.PI / 10))
        scene.add(iphone132.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphone132.scene)
        const action = mixer.clipAction(iphone132.animations[2])
        action.play()
    }
)

const sphereiphone5 = new THREE.Mesh(geometryphone, material)
sphereiphone5.visible = false;
scene.add(sphereiphone5)
sphereiphone5.position.set(3.65, 1.22,9.7)

gltfLoader.load(
    '/models/stando2.glb',
    (iphoneStand2) =>
    {
        iphoneStand2.scene.scale.set(0.75, 0.75, 0.75)
        iphoneStand2.scene.position.set(3.65, 1, 9.7)
        iphoneStand2.scene.rotateY(-(Math.PI )/2)
        scene.add(iphoneStand2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneStand2.scene)
        const action = mixer.clipAction(iphoneStand2.animations[2])
        action.play()
    }
)


gltfLoader.load(
    '/models/SIGN13pro.glb',
    (iphoneSigne) =>
    {
        iphoneSigne.scene.scale.set(1.5, 1.5, 1.5)
        iphoneSigne.scene.position.set(3.7, 1.2,  11.5)
        //samsungSigne.scene.rotateY(-(Math.PI ))
        scene.add(iphoneSigne.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneSigne.scene)
        const action = mixer.clipAction(iphoneSigne.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/fixed-price-13-pro.glb',
    (iphoneSignePrice) =>
    {
        iphoneSignePrice.scene.scale.set(0.2, 0.2, 0.2)
        iphoneSignePrice.scene.position.set(3.85, 1.1, 2.5)
        iphoneSignePrice.scene.rotateY(-(Math.PI ))
        scene.add(iphoneSignePrice.scene)

        // Animation
        mixer = new THREE.AnimationMixer(iphoneSignePrice.scene)
        const action = mixer.clipAction(iphoneSignePrice.animations[2])
        action.play()
    }
)


//Create a new sphere in three js

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
sphere.position.set(-0.5, 0.25, 0.5)

const sphere1 = new THREE.Mesh(geometry, material)
scene.add(sphere1)
sphere1.position.set(-0.5, 0.25,2.5)

const sphere2 = new THREE.Mesh(geometry, material)
scene.add(sphere2)
sphere2.position.set(-0.5, 0.25,5.5)

const sphere3 = new THREE.Mesh(geometry, material)
scene.add(sphere3)
sphere3.position.set(-0.5, 0.2,8)

const sphere4 = new THREE.Mesh(geometry, material)
scene.add(sphere4)
sphere4.position.set(-0.5, 0.2,10)

const sphere5 = new THREE.Mesh(geometry, material)
scene.add(sphere5)
sphere5.position.set(-0.5, 0.2,12)

const sphere6 = new THREE.Mesh(geometry, material)
scene.add(sphere6)
sphere6.position.set(2.5, 0.25, 0.5)

const sphere7 = new THREE.Mesh(geometry, material)
scene.add(sphere7)
sphere7.position.set(2.5, 0.25,2.5)

const sphere8 = new THREE.Mesh(geometry, material)
scene.add(sphere8)
sphere8.position.set(2.5, 0.25,5.5)

const sphere12 = new THREE.Mesh(geometry, material)
scene.add(sphere12)
sphere12.position.set(1, 0.25,5.5)

const sphere13 = new THREE.Mesh(geometry, material)
scene.add(sphere13)
sphere13.position.set(1, 0.25,-0.75)

const sphere9 = new THREE.Mesh(geometry, material)
scene.add(sphere9)
sphere9.position.set(2.5, 0.2,8)

const sphere10 = new THREE.Mesh(geometry, material)
scene.add(sphere10)
sphere10.position.set(2.5, 0.2,10)

const sphere11 = new THREE.Mesh(geometry, material)
scene.add(sphere11)
sphere11.position.set(2.5, 0.2,12)







/**
 * PCs
 */

 gltfLoader.load(
    '/models/tv2.glb',
    (tv) =>
    {
        tv.scene.scale.set(0.75, 0.75, 0.75)
        tv.scene.position.set(-2, 1.15, 0.25)
        tv.scene.rotateY((Math.PI )/2)
        scene.add(tv.scene)

        // Animation
        mixer = new THREE.AnimationMixer(tv.scene)
        const action = mixer.clipAction(tv.animations[2])
        action.play()
    }
)

const geometrytv = new THREE.BoxGeometry(0.35, 1, 5)
const tv1geo = new THREE.Mesh(geometrytv, material)
tv1geo.visible = false;
scene.add(tv1geo)
tv1geo.position.set(-2, 1.65, 1.55)

gltfLoader.load(
    '/models/TV-1.glb',
    (tv1) =>
    {
        tv1.scene.scale.set(0.55, 0.55, 0.55)
        tv1.scene.position.set(-2, 1.75, 3.05)
        tv1.scene.rotateY((Math.PI )/2)
        scene.add(tv1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(tv1.scene)
        const action = mixer.clipAction(tv1.animations[2])
        action.play()
    }
)


gltfLoader.load(
    '/models/powerbank.glb',
    (powerbank) =>
    {
        powerbank.scene.scale.set(0.25, 0.25, 0.25)
        powerbank.scene.position.set(-1.75, 1.15, 6.25)
        powerbank.scene.rotateY((Math.PI )/2)
        scene.add(powerbank.scene)

        // Animation
        mixer = new THREE.AnimationMixer(powerbank.scene)
        const action = mixer.clipAction(powerbank.animations[2])
        action.play()
    }
)

const geometrypowerbank = new THREE.BoxGeometry(0.45, 0.45, 0.45)
const powerbank = new THREE.Mesh(geometrypowerbank, material)
powerbank.visible = false;
scene.add(powerbank)
powerbank.position.set(-1.75, 1.15, 6.25)


gltfLoader.load(
    '/models/powerbank_sign.glb',
    (powerbankSign) =>
    {
        powerbankSign.scene.scale.set(0.25, 0.25, 0.25)
        powerbankSign.scene.position.set(-1.75, 1.055, 6.75)
        powerbankSign.scene.rotateY((Math.PI ))
        scene.add(powerbankSign.scene)

        // Animation
        mixer = new THREE.AnimationMixer(powerbankSign.scene)
        const action = mixer.clipAction(powerbankSign.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/i7.glb',
    (I7) =>
    {
        I7.scene.scale.set(0.25, 0.25, 0.25)
        I7.scene.position.set(-1.75, 1.14   , 7.25)
        I7.scene.rotateY((Math.PI )/2)
        scene.add(I7.scene)

        // Animation
        mixer = new THREE.AnimationMixer(I7.scene)
        const action = mixer.clipAction(I7.animations[2])
        action.play()
    }
)

const I7geometery = new THREE.BoxGeometry(0.25, 0.25, 0.25)
const I7 = new THREE.Mesh(I7geometery, material)
I7.visible = false;
scene.add(I7)
I7.position.set(-1.75, 1.14   , 7.25)

gltfLoader.load(
    '/models/signi7.glb',
    (I7Sign) =>
    {
        I7Sign.scene.scale.set(0.25, 0.25, 0.25)
        I7Sign.scene.position.set(-1.75, 1.055, 7.75)
        I7Sign.scene.rotateY((Math.PI ))
        scene.add(I7Sign.scene)

        // Animation
        mixer = new THREE.AnimationMixer(I7Sign.scene)
        const action = mixer.clipAction(I7Sign.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/ViewSonic_Monitor.glb',
    (ViewSonic_Monitor) =>
    {
        ViewSonic_Monitor.scene.scale.set(0.35, 0.35, 0.35)
        ViewSonic_Monitor.scene.position.set(-1.75, 1.45, 8.35)
        ViewSonic_Monitor.scene.rotateY((Math.PI )/2)
        scene.add(ViewSonic_Monitor.scene)

        // Animation
        mixer = new THREE.AnimationMixer(ViewSonic_Monitor.scene)
        const action = mixer.clipAction(ViewSonic_Monitor.animations[2])
        action.play()
    }
)

const ViewSonicgeometery = new THREE.BoxGeometry(0.65, 0.65, 0.65)
const ViewSonic = new THREE.Mesh(ViewSonicgeometery, material)
ViewSonic.visible = false;
scene.add(ViewSonic)
ViewSonic.position.set(-2, 1.45, 8.35)



gltfLoader.load(
    '/models/PC-Monitor_dist.glb',
    (PC_Monitor) =>
    {
        PC_Monitor.scene.scale.set(0.55, 0.55, 0.55)
        PC_Monitor.scene.position.set(-1.75, 1.05, 9.55)
        PC_Monitor.scene.rotateY((Math.PI )/2)
        scene.add(PC_Monitor.scene)

        // Animation
        mixer = new THREE.AnimationMixer(PC_Monitor.scene)
        const action = mixer.clipAction(PC_Monitor.animations[2])
        action.play()
    }
)

const Viewgeometery = new THREE.BoxGeometry(0.65, 0.65, 1.05)
const View = new THREE.Mesh(Viewgeometery, material)
View.visible = false;
scene.add(View)
View.position.set(-1.95, 1.45, 9.55)


gltfLoader.load(
    '/models/monitor_sign.glb',
    (monitor_sign) =>
    {
        monitor_sign.scene.scale.set(0.35, 0.35, 0.35)
        monitor_sign.scene.position.set(-1.75, 1.1, 10.5)
        monitor_sign.scene.rotateY((Math.PI ))
        scene.add(monitor_sign.scene)

        // Animation
        mixer = new THREE.AnimationMixer(monitor_sign.scene)
        const action = mixer.clipAction(monitor_sign.animations[2])
        action.play()
    }
)


gltfLoader.load(
    '/models/signi7.glb',
    (I7Sign) =>
    {
        I7Sign.scene.scale.set(0.25, 0.25, 0.25)
        I7Sign.scene.position.set(-1.75, 1.055, 7.75)
        I7Sign.scene.rotateY((Math.PI ))
        scene.add(I7Sign.scene)

        // Animation
        mixer = new THREE.AnimationMixer(I7Sign.scene)
        const action = mixer.clipAction(I7Sign.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/macbookpro.glb',
    (macbook) =>
    {
        macbook.scene.scale.set(0.15, 0.15, 0.15)
        macbook.scene.position.set(1.35, 1, 0.1)
        macbook.scene.rotateY(-(Math.PI ))
        macbook.scene.castShadow = true;
        scene.add(macbook.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook.scene)
        const action = mixer.clipAction(macbook.animations[2])
        action.play()
    }
)

const MACBOOKGEOMETRY = new THREE.BoxGeometry(0.65, 0.65, 0.65)
const macbook1 = new THREE.Mesh(MACBOOKGEOMETRY, material)
macbook1.visible = false;
scene.add(macbook1)
macbook1.position.set(1.35, 1, 0)

gltfLoader.load(
    '/models/MacBookProblend.glb',
    (macbook3) =>
    {
        macbook3.scene.scale.set(0.15, 0.15, 0.15)
        macbook3.scene.position.set(1.218, 0.87, 1.6)
        macbook3.scene.rotateY(-(Math.PI )/2)
        macbook3.scene.castShadow = true;
        scene.add(macbook3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook3.scene)
        const action = mixer.clipAction(macbook3.animations[2])
        action.play()
    }
)

const macbook3 = new THREE.Mesh(MACBOOKGEOMETRY, material)
macbook3.visible = false;
scene.add(macbook3)
macbook3.position.set(1.35, 1, 1.5)


gltfLoader.load(
    '/models/MacBookProblend.glb',
    (macbook5) =>
    {
        macbook5.scene.scale.set(0.175, 0.175, 0.175)
        macbook5.scene.position.set(1.1, 0.87, 3.7)
        macbook5.scene.rotateY(-(Math.PI )/2)
        macbook5.scene.castShadow = true;
        scene.add(macbook5.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook5.scene)
        const action = mixer.clipAction(macbook5.animations[2])
        action.play()
    }
)

const macbook5 = new THREE.Mesh(MACBOOKGEOMETRY, material)
macbook5.visible = false;
scene.add(macbook5)
macbook5.position.set(1.35, 1, 3.6)

gltfLoader.load(
    '/models/macbookpro.glb',
    (macbook2) =>
    {
        macbook2.scene.scale.set(0.125, 0.125, 0.125)
        macbook2.scene.position.set(0.65, 1, 0.6)
        macbook2.scene.castShadow = true;
        //macbook2.scene.rotateY((Math.PI )/2)
        scene.add(macbook2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook2.scene)
        const action = mixer.clipAction(macbook2.animations[2])
        action.play()
    }
)

const macbook2 = new THREE.Mesh(MACBOOKGEOMETRY, material)
macbook2.visible = false;
scene.add(macbook2)
macbook2.position.set(0.65, 1, 0.5)

gltfLoader.load(
    '/models/macbookpro.glb',
    (macbook4) =>
    {
        macbook4.scene.scale.set(0.175, 0.175, 0.175)
        macbook4.scene.position.set(0.65, 1, 2.2)
        //macbook2.scene.rotateY((Math.PI )/2)
        scene.add(macbook4.scene)

        // Animation
        mixer = new THREE.AnimationMixer(macbook4.scene)
        const action = mixer.clipAction(macbook4.animations[2])
        action.play()
    })

    const macbook4 = new THREE.Mesh(MACBOOKGEOMETRY, material)
    macbook4.visible = false;
scene.add(macbook4)
macbook4.position.set(0.65, 1.15, 2.35)

gltfLoader.load(
    '/models/laptop1-1.glb',
    (PC1) =>
    {
        PC1.scene.scale.set(0.005, 0.005, 0.005)
        PC1.scene.position.set(1.35, 1, 7.1)
        
        PC1.scene.castShadow = true;
        scene.add(PC1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(PC1.scene)
        const action = mixer.clipAction(PC1.animations[2])
        action.play()
    }
)

const Laptop1 = new THREE.Mesh(MACBOOKGEOMETRY, material)
Laptop1.visible = false;
scene.add(Laptop1)
Laptop1.position.set(1.35, 1.15, 7.1)

gltfLoader.load(
    '/models/laptop1-1.glb',
    (PC3) =>
    {
        PC3.scene.scale.set(0.0025, 0.0025, 0.0025)
        PC3.scene.position.set(1.4, 1., 8.6)
        
        PC3.scene.castShadow = true;
        scene.add(PC3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(PC3.scene)
        const action = mixer.clipAction(PC3.animations[2])
        action.play()
    }
)

const Laptop2 = new THREE.Mesh(MACBOOKGEOMETRY, material)
Laptop2.visible = false;
scene.add(Laptop2)
Laptop2.position.set(1.35, 1, 8.6)

gltfLoader.load(
    '/models/samsung-pc.glb',
    (PC2) =>
    {
        PC2.scene.scale.set(1.75, 1.75, 1.75)
        PC2.scene.position.set(0.75, 0.95, 7.6)
        PC2.scene.castShadow = true;
        PC2.scene.rotateY((Math.PI )/2)
        scene.add(PC2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(PC2.scene)
        const action = mixer.clipAction(PC2.animations[2])
        action.play()
    }
)

const Laptop3 = new THREE.Mesh(MACBOOKGEOMETRY, material)
Laptop3.visible = false;
scene.add(Laptop3)
Laptop3.position.set(0.75, 0.95, 7.6)


gltfLoader.load(
    '/models/samsung-pc.glb',
    (PC4) =>
    {
        PC4.scene.scale.set(1.55, 1.55, 1.55)
        PC4.scene.position.set(0.75, 0.95, 9.2)
        PC4.scene.rotateY((Math.PI )/2)
        scene.add(PC4.scene)

        // Animation
        mixer = new THREE.AnimationMixer(PC4.scene)
        const action = mixer.clipAction(PC4.animations[2])
        action.play()
    }
)

const Laptop4 = new THREE.Mesh(MACBOOKGEOMETRY, material)
Laptop4.visible = false;
scene.add(Laptop4)
Laptop4.position.set(0.75, 0.95, 9.2)

gltfLoader.load(
    '/models/SIGNMACBOOK.glb',
    (signemacbook) =>
    {
        signemacbook.scene.scale.set(1.2, 1.2, 1.2)
        signemacbook.scene.position.set(0.65, 1, 1.5)
        //macbook2.scene.rotateY((Math.PI )/2)
        scene.add(signemacbook.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook.scene)
        const action = mixer.clipAction(signemacbook.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNMACBOOK.glb',
    (signemacbook1) =>
    {
        signemacbook1.scene.scale.set(1.2, 1.2, 1.2)
        signemacbook1.scene.position.set(1.4, 1.1, 2.2)
        signemacbook1.scene.rotateY(-(Math.PI ))
        scene.add(signemacbook1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook1.scene)
        const action = mixer.clipAction(signemacbook1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNmacbook-pro_price.glb',
    (signemacbook1) =>
    {
        signemacbook1.scene.scale.set(1.5, 1.5, 1.5)
        signemacbook1.scene.position.set(1.3, 1.2, 4.215)
        
        scene.add(signemacbook1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook1.scene)
        const action = mixer.clipAction(signemacbook1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/SIGNmacbook-pro_price.glb',
    (signemacbook12) =>
    {
        signemacbook12.scene.scale.set(1.5, 1.5, 1.5)
        signemacbook12.scene.position.set(1.4, 1.2, 1.5)
        signemacbook12.scene.rotateY((Math.PI ))
        scene.add(signemacbook12.scene)

        // Animation
        mixer = new THREE.AnimationMixer(signemacbook12.scene)
        const action = mixer.clipAction(signemacbook12.animations[2])
        action.play()
    }
)


//Speaker 1
gltfLoader.load(
    '/models/speaker1.glb',
    (speaker1) =>
    {
        speaker1.scene.scale.set(0.25, 0.25, 0.25)
        speaker1.scene.position.set(0.5, 2.9, 13.2)
        speaker1.scene.rotateY(-(Math.PI ))
        scene.add(speaker1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker1.scene)
        const action = mixer.clipAction(speaker1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker111) =>
    {
        speaker111.scene.scale.set(0.25, 0.25, 0.25)
        speaker111.scene.position.set(0.2 ,2.9, 13.2)
        speaker111.scene.rotateY((Math.PI )/2)
        scene.add(speaker111.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker111.scene)
        const action = mixer.clipAction(speaker111.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker12) =>
    {
        speaker12.scene.scale.set(0.3, 0.3, 0.3)
        speaker12.scene.position.set(- 0.7, 2.98, 13.2)
        speaker12.scene.rotateY(-(Math.PI ))
        scene.add(speaker12.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker12.scene)
        const action = mixer.clipAction(speaker12.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker17) =>
    {
        speaker17.scene.scale.set(0.3, 0.3, 0.3)
        speaker17.scene.position.set(-1.1, 2.98, 13.2)
        speaker17.scene.rotateY((Math.PI ) /2)
        scene.add(speaker17.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker17.scene)
        const action = mixer.clipAction(speaker17.animations[2])
        action.play()
    }
)

// Speaker 1 Group


gltfLoader.load(
    '/models/speaker1.glb',
    (speaker132) =>
    {
        speaker132.scene.scale.set(0.25, 0.25, 0.25)
        speaker132.scene.position.set(2.2 , 2.98, 13.2)
        speaker132.scene.rotateY((Math.PI ) /2)
        scene.add(speaker132.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker132.scene)
        const action = mixer.clipAction(speaker132.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker133) =>
    {
        speaker133.scene.scale.set(0.3, 0.3, 0.3)
        speaker133.scene.position.set(1.9, 2.98, 13.2)
        speaker133.scene.rotateY((Math.PI ) /2)
        scene.add(speaker133.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker133.scene)
        const action = mixer.clipAction(speaker133.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker134) =>
    {
        speaker134.scene.scale.set(0.25, 0.25, 0.25)
        speaker134.scene.position.set(2.7 , 2.98, 13.2)
        speaker134.scene.rotateY((Math.PI )/2)
        scene.add(speaker134.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker134.scene)
        const action = mixer.clipAction(speaker134.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker1.glb',
    (speaker333) =>
    {
        speaker333.scene.scale.set(0.3, 0.3, 0.3)
        speaker333.scene.position.set(3, 2.98, 13.2)
        speaker333.scene.rotateY((Math.PI )/2)
        scene.add(speaker333.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker333.scene)
        const action = mixer.clipAction(speaker333.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/speaker3.glb',
    (speaker321) =>
    {
        speaker321.scene.scale.set(0.45, 0.45, 0.45)
        speaker321.scene.position.set(- 1.1, 1.14, 13.2)
        speaker321.scene.rotateY((Math.PI ) / 2)
        scene.add(speaker321.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker321.scene)
        const action = mixer.clipAction(speaker321.animations[2])
        action.play()
    }
)

//Speaker 2

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker2) =>
    {
        speaker2.scene.scale.set(0.2, 0.2, 0.2)
        speaker2.scene.position.set(0.5, 1.75, 13.2)
        speaker2.scene.rotateY(-(Math.PI ))
        scene.add(speaker2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker2.scene)
        const action = mixer.clipAction(speaker2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker211) =>
    {
        speaker211.scene.scale.set(0.2, 0.2, 0.2)
        speaker211.scene.position.set(0.2 , 1.75, 13.2)
        speaker211.scene.rotateY((Math.PI )/2)
        scene.add(speaker211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker211.scene)
        const action = mixer.clipAction(speaker211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker22) =>
    {
        speaker22.scene.scale.set(0.25, 0.2, 0.25)
        speaker22.scene.position.set(- 0.7, 1.74, 13.2)
        speaker22.scene.rotateY(-(Math.PI ))
        scene.add(speaker22.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker22.scene)
        const action = mixer.clipAction(speaker22.animations[2])
        action.play()
    }
)

// Speaker 2 Group
gltfLoader.load(
    '/models/speaker2.glb',
    (speaker211) =>
    {
        speaker211.scene.scale.set(0.2, 0.2, 0.2)
        speaker211.scene.position.set(2.2 , 1.75, 13.2)
        speaker211.scene.rotateY((Math.PI )/2)
        scene.add(speaker211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker211.scene)
        const action = mixer.clipAction(speaker211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker231) =>
    {
        speaker231.scene.scale.set(0.25, 0.2, 0.25)
        speaker231.scene.position.set(1.9, 1.75, 13.2)
        speaker231.scene.rotateY((Math.PI )/2)
        scene.add(speaker231.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker231.scene)
        const action = mixer.clipAction(speaker231.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker232) =>
    {
        speaker232.scene.scale.set(0.2, 0.2, 0.2)
        speaker232.scene.position.set(2.7 , 1.75, 13.2)
        speaker232.scene.rotateY( (Math.PI )/2)
        scene.add(speaker232.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker232.scene)
        const action = mixer.clipAction(speaker232.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker2.glb',
    (speaker233) =>
    {
        speaker233.scene.scale.set(0.25, 0.2, 0.2)
        speaker233.scene.position.set(3, 1.75, 13.2)
        speaker233.scene.rotateY((Math.PI )/2)
        scene.add(speaker233.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker233.scene)
        const action = mixer.clipAction(speaker233.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/speaker2.glb',
    (speaker221) =>
    {
        speaker221.scene.scale.set(0.25, 0.2, 0.25)
        speaker221.scene.position.set(- 1.1, 1.75, 13.2)
        speaker221.scene.rotateY((Math.PI ) / 2)
        scene.add(speaker221.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker221.scene)
        const action = mixer.clipAction(speaker221.animations[2])
        action.play()
    }
)
//Speaker 3

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker3) =>
    {
        speaker3.scene.scale.set(0.35, 0.35, 0.35)
        speaker3.scene.position.set(0.5, 1.09, 13.2)
        speaker3.scene.rotateY(-(Math.PI ))
        scene.add(speaker3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker3.scene)
        const action = mixer.clipAction(speaker3.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker311) =>
    {
        speaker311.scene.scale.set(0.35, 0.35, 0.35)
        speaker311.scene.position.set(0.2 , 1.09, 13.2)
        speaker311.scene.rotateY((Math.PI )/2)
        scene.add(speaker311.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker311.scene)
        const action = mixer.clipAction(speaker311.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker32) =>
    {
        speaker32.scene.scale.set(0.45, 0.45, 0.45)
        speaker32.scene.position.set(- 0.7, 1.14, 13.2)
        speaker32.scene.rotateY(-(Math.PI ))
        scene.add(speaker32.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker32.scene)
        const action = mixer.clipAction(speaker32.animations[2])
        action.play()
    }
)

// Speaker 3 Group
gltfLoader.load(
    '/models/speaker3.glb',
    (speaker311) =>
    {
        speaker311.scene.scale.set(0.35, 0.35, 0.35)
        speaker311.scene.position.set(2.2 , 1.09, 13.2)
        speaker311.scene.rotateY(- (Math.PI ))
        scene.add(speaker311.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker311.scene)
        const action = mixer.clipAction(speaker311.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker331) =>
    {
        speaker331.scene.scale.set(0.45, 0.45, 0.45)
        speaker331.scene.position.set(1.9, 1.14, 13.2)
        speaker331.scene.rotateY(-(Math.PI ))
        scene.add(speaker331.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker331.scene)
        const action = mixer.clipAction(speaker331.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker332) =>
    {
        speaker332.scene.scale.set(0.35, 0.35, 0.35)
        speaker332.scene.position.set(2.7 , 1.09, 13.2)
        speaker332.scene.rotateY(- (Math.PI ))
        scene.add(speaker332.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker332.scene)
        const action = mixer.clipAction(speaker332.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/speaker3.glb',
    (speaker333) =>
    {
        speaker333.scene.scale.set(0.45, 0.45, 0.45)
        speaker333.scene.position.set(3, 1.14, 13.2)
        speaker333.scene.rotateY(-(Math.PI ))
        scene.add(speaker333.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker333.scene)
        const action = mixer.clipAction(speaker333.animations[2])
        action.play()
    }
)



gltfLoader.load(
    '/models/speaker3.glb',
    (speaker321) =>
    {
        speaker321.scene.scale.set(0.45, 0.45, 0.45)
        speaker321.scene.position.set(- 1.1, 1.14, 13.2)
        speaker321.scene.rotateY((Math.PI ) / 2)
        scene.add(speaker321.scene)

        // Animation
        mixer = new THREE.AnimationMixer(speaker321.scene)
        const action = mixer.clipAction(speaker321.animations[2])
        action.play()
    }
)


//Flash disks
gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk) =>
    {
        flashdisk.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk.scene.position.set(- 1.6, 2, -3.1)
        flashdisk.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk1) =>
    {
        flashdisk1.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk1.scene.position.set(- 1.6, 2, -3)
        flashdisk1.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk1.scene)
        const action = mixer.clipAction(flashdisk1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk11) =>
    {
        flashdisk11.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk11.scene.position.set(- 1.6, 2, -2.9)
        flashdisk11.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk11.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

//SET 2

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk) =>
    {
        flashdisk.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk.scene.position.set(0.4, 2, -3.1)
        flashdisk.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk1) =>
    {
        flashdisk1.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk1.scene.position.set(0.4, 2, -3)
        flashdisk1.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk1.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk1.scene)
        const action = mixer.clipAction(flashdisk1.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk.glb',
    (flashdisk11) =>
    {
        flashdisk11.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk11.scene.position.set(0.4, 2, -2.9)
        flashdisk11.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk11.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk2) =>
    {
        flashdisk2.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk2.scene.position.set(-1.1, 2, -3.1)
        flashdisk2.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk2.scene)
        const action = mixer.clipAction(flashdisk2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk21) =>
    {
        flashdisk21.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk21.scene.position.set(-1.1, 2, -3)
        flashdisk21.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk21.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk21.scene)
        const action = mixer.clipAction(flashdisk21.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk211) =>
    {
        flashdisk211.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk211.scene.position.set(-1.1, 2, -2.9)
        flashdisk211.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk211.scene)
        const action = mixer.clipAction(flashdisk211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk2) =>
    {
        flashdisk2.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk2.scene.position.set(-0.1, 2, -3.1)
        flashdisk2.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk2.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk2.scene)
        const action = mixer.clipAction(flashdisk2.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk21) =>
    {
        flashdisk21.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk21.scene.position.set(-0.1, 2, -3)
        flashdisk21.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk21.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk21.scene)
        const action = mixer.clipAction(flashdisk21.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk2.glb',
    (flashdisk211) =>
    {
        flashdisk211.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk211.scene.position.set(-0.1, 2, -2.9)
        flashdisk211.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk211.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk211.scene)
        const action = mixer.clipAction(flashdisk211.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk3.glb',
    (flashdisk31) =>
    {
        flashdisk31.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk31.scene.position.set(-0.6, 2, -3)
        flashdisk31.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk31.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk31.scene)
        const action = mixer.clipAction(flashdisk31.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk3.glb',
    (flashdisk311) =>
    {
        flashdisk311.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk311.scene.position.set(-0.6, 2, -2.9)
        flashdisk311.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk311.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk311.scene)
        const action = mixer.clipAction(flashdisk311.animations[2])
        action.play()
    }
)

gltfLoader.load(
    '/models/flashdisk3.glb',
    (flashdisk3) =>
    {
        flashdisk3.scene.scale.set(0.45, 0.45, 0.45)
        flashdisk3.scene.position.set(-0.6, 2, -3.1)
        flashdisk3.scene.rotateY((Math.PI ) / 2)
        scene.add(flashdisk3.scene)

        // Animation
        mixer = new THREE.AnimationMixer(flashdisk.scene)
        const action = mixer.clipAction(flashdisk.animations[2])
        action.play()
    }
)

//Random electronic objects

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight1.castShadow = true
directionalLight1.shadow.mapSize.set(1024, 1024)
directionalLight1.shadow.camera.far = 15
directionalLight1.shadow.camera.left = 7
directionalLight1.shadow.camera.top = - 7
directionalLight1.shadow.camera.right = - 7
directionalLight1.shadow.camera.bottom = 7
directionalLight1.position.set(5,5, 0)
scene.add(directionalLight)
scene.add(directionalLight1)
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500
directionalLight1.shadow.mapSize.width = 512; // default
directionalLight1.shadow.mapSize.height = 512; // default
directionalLight1.shadow.camera.near = 0.5; // default
directionalLight1.shadow.camera.far = 500


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.set(10, 4, 9)
camera.position.set(0, 1.5, 5)
scene.add(camera)
//camera.lookAt(0, 0, 0)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.set(1, 0, 14)
controls.target.set(0, 1.4, 0)
controls.maxDistance = 0.5

controls.enableDamping = true
/*
controls.maxPolarAngle = Math.PI /2.2
*/
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'

})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
//renderer.physicallyCorrectLights = true

/**
 * Animate
 */

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

const domEvents = new THREEx.DomEvents(camera, renderer.domElement)
domEvents.addEventListener(sphere, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(-0.5, 1.4, 0)
}, false)

domEvents.addEventListener(sphere1, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(-0.5, 1.4, 2.5)
}, false)

domEvents.addEventListener(sphere2, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(-0.5, 1.4, 5.5)
}, false)

domEvents.addEventListener(sphere3, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(-0.5, 1.4, 8)
}, false)

domEvents.addEventListener(sphere4, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(-0.5, 1.4, 10)
}, false)

domEvents.addEventListener(sphere5, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(-0.5, 1.4, 12)
}, false)

domEvents.addEventListener(sphere6, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(2.5, 1.4, 0)
}, false)

domEvents.addEventListener(sphere7, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(2.5, 1.4, 2.5)
}, false)

domEvents.addEventListener(sphere8, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(2.5, 1.4, 5.5)
}, false)

domEvents.addEventListener(sphere9, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(2.5, 1.4, 8)
}, false)

domEvents.addEventListener(sphere10, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(2.5, 1.4, 10)
}, false)

domEvents.addEventListener(sphere11, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(2.5, 1.4, 12)
}, false)
domEvents.addEventListener(sphere12, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(1, 1.4, 5.5)
}, false)
domEvents.addEventListener(sphere13, 'dblclick', (event) => {
    console.log('click on sphere')
    controls.target.set(1, 1.4,-0.75)
}, false)

domEvents.addEventListener(spheresamsung, 'dblclick', (event) => {
    console.log('click on sphere')
    audioSamsung.play()
}, false)

domEvents.addEventListener(spheresamsung1, 'dblclick', (event) => {
    console.log('click on sphere')
    audioSamsung.play()
}, false)

domEvents.addEventListener(spheresamsung2, 'dblclick', (event) => {
    console.log('click on sphere')
    audioSamsung.play()
}, false)

domEvents.addEventListener(spheresamsung3, 'dblclick', (event) => {
    console.log('click on sphere')
    audioSamsung.play()
}, false)

domEvents.addEventListener(spheresamsung4, 'dblclick', (event) => {
    console.log('click on sphere')
    audioSamsung.play()
}, false)

domEvents.addEventListener(spheresamsung5, 'dblclick', (event) => {
    console.log('click on sphere')
    audioSamsung.play()
}, false)

domEvents.addEventListener(sphereiphone, 'dblclick', (event) => {
    console.log('click on sphere')
    audioIphone.play()
}, false)

domEvents.addEventListener(sphereiphone1, 'dblclick', (event) => {
    console.log('click on sphere')
    audioIphone.play()
}, false)

domEvents.addEventListener(sphereiphone2, 'dblclick', (event) => {
    console.log('click on sphere')
    audioIphone.play()
}, false)

domEvents.addEventListener(sphereiphone5, 'dblclick', (event) => {
    console.log('click on sphere')
    audioIphone.play()
}, false)

domEvents.addEventListener(sphereipod, 'dblclick', (event) => {
    console.log('click on sphere')
    audioIpod.play()
}, false)

domEvents.addEventListener(sphereipod1, 'dblclick', (event) => {
    console.log('click on sphere')
    audioIpod.play()
}, false)

domEvents.addEventListener(sphereipod2, 'dblclick', (event) => {
    console.log('click on sphere')
    audioIpod.play()
}, false)


domEvents.addEventListener(powerbank, 'dblclick', (event) => {
    console.log('click on tv')
    audioPower.play()
}, false)

domEvents.addEventListener(I7, 'dblclick', (event) => {
    console.log('click on tv')
    audioI7.play()
}, false)

domEvents.addEventListener(ViewSonic, 'dblclick', (event) => {
    console.log('click on tv')
    audioViewSonic.play()
}, false)

domEvents.addEventListener(View, 'dblclick', (event) => {
    console.log('click on tv')
    audioView.play()
}, false)

domEvents.addEventListener(macbook1, 'dblclick', (event) => {
    console.log('click on tv')
    audioMacbook.play()
}, false)

domEvents.addEventListener(macbook2, 'dblclick', (event) => {
    console.log('click on tv')
    audioMacbook.play()
}, false)

domEvents.addEventListener(macbook3, 'dblclick', (event) => {
    console.log('click on tv')
    audioMacbook.play()
}, false)

domEvents.addEventListener(macbook4, 'dblclick', (event) => {
    console.log('click on tv')
    audioMacbook.play()
}, false)

domEvents.addEventListener(macbook5, 'dblclick', (event) => {
    console.log('click on tv')
    audioMacbook.play()
}, false)

domEvents.addEventListener(Laptop1, 'dblclick', (event) => {
    console.log('click on tv')
    audioMsi.play()
}, false)

domEvents.addEventListener(Laptop2, 'dblclick', (event) => {
    console.log('click on tv')
    audioMsi.play()
}, false)

domEvents.addEventListener(Laptop3, 'dblclick', (event) => {
    console.log('click on tv')
    audioSamsungPC.play()
}, false)

domEvents.addEventListener(Printer, 'dblclick', (event) => {
    console.log('click on tv')
    audioPrinter.play()
}, false)

domEvents.addEventListener(Laptop4, 'dblclick', (event) => {
    console.log('click on tv')
    audioSamsungPC.play()
}, false)


domEvents.addEventListener(tv1geo, 'dblclick', (event) => {
    console.log('click on tv')
    audioTV.play()
}, false)


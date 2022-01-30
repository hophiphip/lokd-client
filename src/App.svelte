<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { setAttributes } from "./utils/setters";
	import { waitForElement } from './utils/wait-for-element';

	export let pattUrl;

	let mounted, aframe, ar;
	let hidden = false;
	$: ready = aframe && ar && mounted;

	onMount(() => { mounted = true; });

	let dispatch = createEventDispatcher();

	function handleClick() {
		console.log(hidden);
		hidden = !hidden;
		dispatch('handleClick', hidden);
	}

	waitForElement('video').then((element) => {
		document.querySelector('a-scene')?.appendChild(element);
	});
</script>

<svelte:head>
	{#if mounted}
		<meta charset="UTF-8">
		<title>Lokd</title>

		<meta name="viewport"
		  content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0">

		<script 
			src="https://aframe.io/releases/1.0.4/aframe.min.js"
			on:load={() => { aframe = true; }}>
		</script>

		{#if aframe}
			<script 
				src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
				on:load={() => { ar = true; }}>
			</script>
		{/if}
	{/if}
</svelte:head>


{#if ready}
	{#if !hidden}
    	<a-scene id="scene"
				 embedded={true}
				 gesture-detector={true}

				 use:setAttributes={{
					'arjs':       'trackingMethod: best; debugUIEnabled: false; sourceType: webcam;',
    	         	'renderer':   'logarithmicDepthBuffer: true;',
    	         	'vr-mode-ui': 'enabled: false',
				 }}>

    	    <a-marker id="marker"
					  pmarkerhandler={true}
    	              emitevents={true}
    	              smooth={true}

					  use:setAttributes={{
    	              	'type':'pattern',
    	              	'cursor': 'fuse: false; rayOrigin: mouse',
    	              	'reset': 'pattern',
    	              	'smoothCount': '10',
    	              	'smoothTolerance': '.01',
    	              	'smoothThreshold': '5',
    	              	'raycaster': 'objects: .clickable',
    	              	'url': pattUrl,
					  }}>

    	        <a-link id="arLink"
						peekMode={true}

						use:setAttributes={{
				        	'position': '0 0 0',
							'rotation': '90 0 0',
							'href': 'google.com',
							'title': 'Index',
						}}>
				</a-link>
    	    </a-marker>

    	    <a-camera id="dumbCamera"
					  touchEnabled={true}
					  wasd-controls-enabled="false"
					  look-controls="false"

					  use:setAttributes={{
    	              	'position': '0 0 0',
    	              	'camera': 'active: false',
					  }}>
    	    </a-camera>

    	    <a-entity id="mainCamera" camera={true}>
    	    </a-entity>

    	</a-scene>
	{/if}

	<button on:click={handleClick}>Click Me!</button>
{/if}

<style>
	:global(html, body) {
		margin: 0;
		overflow: hidden;
	}

	:global(.a-canvas, #arjs-video) {
        display: block;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        object-fit: contain !important;
    }

	button {
		width: 200px;
		height: 100px;
		position: absolute;
		top: calc(50% - 300px);
		left: calc(50% - 50px);
		background-color: magenta;
		z-index: 9999;
		line-height: 100px;
		text-align: center;
		color: white;
	}
</style>
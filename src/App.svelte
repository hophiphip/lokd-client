<script>
	import { onMount } from "svelte";
	import { setAttributes } from "./utils/setters";

	export let pattUrl;

	let mounted, aframe, ar;
	$: ready = aframe && ar && mounted;

	onMount(() => { mounted = true; });
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
</style>
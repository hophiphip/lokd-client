import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		pattUrl: "https://raw.githubusercontent.com/hophiphip/lok/master/data/patt/pattern-lok-marker.patt",
	}
});

export default app;
<template>
	<GoogleMap id="map" ref="mapRef" :api-key="map.key" :language="map.language" :region="map.region" :center="map.center"
		:zoom="map.zoom" :min-zoom="map.minZoom" :max-zoom="map.maxZoom" :street-view-control="map.streetViewControl"
		@zoom_changed="zoomChanged" @center_changed="centerChanged" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { GoogleMap } from 'vue3-google-map';

const map = {
	key: 'AIzaSyBhWRaNVXDZaoV1s6f2Vx9HPvM6Pba4hXI', // Place a Google API Key here
	language: 'en-US',
	region: 'US',
	center: {
		lat: 40.72919060099844,
		lng: -73.99624099972671
	},
	zoom: 18,
	minZoom: 2,
	maxZoom: null,
	streetViewControl: false
};

let gmap = null;

const mapRef = ref(null);

console.log('[GMap] Setup');

watch(() => mapRef.value?.ready, ready => {
	if (ready) {
		gmap = mapRef.value.map;
		console.log('[GMap] Version:', mapRef.value.api.version);
	}
});

function zoomChanged() {
	console.log('[GMap] Zoom:', gmap.getZoom());
}

function centerChanged() {
	const center = gmap.getCenter();
	console.log('[GMap] Center: (', center.lat(), ',', center.lng(), ')');
}
</script>

<style>
html,
body,
#app,
#map {
	height: 100%;
}

body {
	margin: 1;
}
</style>
<template>
	<nav class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-darkbg/80 backdrop-blur-md 
    rounded-full px-4 py-2 shadow-xl border border-muted/30">
		<div class="relative flex items-center gap-2 text-text font-medium">
			<div class="absolute rounded-full bg-green-500 transition-all duration-300 ease-out"
				:style="highlightStyle"></div>
			<NuxtLink v-for="item in items" :key="item.to" :to="item.to"
				class="px-4 py-2 rounded-full relative z-10 transition-colors duration-300"
				:class="{ 'text-white': route.path === item.to }">
				{{ item.label }}
			</NuxtLink>
		</div>
	</nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, nextTick, watch } from 'vue';

const route = useRoute();

const items = [
	{ label: 'Home', to: '/' },
	{ label: 'Experience', to: '/experience' },
	{ label: 'Projects', to: '/projects' },
];

const highlightStyle = ref({
	width: "0px",
	height: "0px",
	transform: "translateX(0px)"
});

const updateHighlight = () => {
	nextTick(() => {
		const active = document.querySelector(".router-link-exact-active");
		if (!active) return;

		const rect = active.getBoundingClientRect();
		const parentRect = active.parentElement.getBoundingClientRect();

		highlightStyle.value = {
			width: rect.width + "px",
			height: rect.height + "px",
			transform: `translateX(${rect.left - parentRect.left}px)`
		};
	});
};

onMounted(updateHighlight);
watch(() => route.path, updateHighlight);
</script>

<template>
	<nav class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-darkbg/80 backdrop-blur-md 
    rounded-full px-4 py-2 shadow-xl border border-muted/30">
		<div class="relative flex items-center gap-2 text-text font-medium">
			<div class="absolute top-0 left-0 rounded-full bg-green-500 transition-all duration-300 ease-out pointer-events-none"
				:style="highlightStyle"></div>
			<NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
				class="px-4 py-2 rounded-full relative z-10 transition-colors duration-300"
				:class="{ 'text-white': isActive(item.to) }">
				{{ item.label }}
			</NuxtLink>
		</div>
	</nav>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const baseItems = [
	{ label: 'Home', to: '/' },
	{ label: 'Projects', to: '#projects' },
	{ label: 'Experience', to: '#experience' },
];

const navItems = computed(() => {
	const onProjectDetail =
		route.path.startsWith("/projects/") && route.path !== "/projects";

	return onProjectDetail ? baseItems.filter((item) => item.to === "/") : baseItems;
});

const highlightStyle = ref({
	width: "0px",
	height: "0px",
	transform: "translateX(0px)",
	opacity: "0"
});

const isActive = (to) => {
	if (to === '/') {
		return route.path === '/' || route.hash === '';
	}
	return route.hash === to;
};

const updateHighlight = () => {
	nextTick(() => {
		// Find the active link by checking our custom isActive logic
		const links = document.querySelectorAll('nav a');
		let activeLink = null;
		
		links.forEach(link => {
			const href = link.getAttribute('href');
			if (isActive(href)) {
				activeLink = link;
			}
		});

		if (!activeLink) {
			highlightStyle.value.opacity = "0";
			return;
		}

		const rect = activeLink.getBoundingClientRect();
		const parentRect = activeLink.parentElement.getBoundingClientRect();

		highlightStyle.value = {
			width: `${rect.width}px`,
			height: `${rect.height}px`,
			transform: `translateX(${rect.left - parentRect.left}px)`,
			opacity: "1"
		};
	});
};

onMounted(() => {
	updateHighlight();
	// Update on hash changes
	window.addEventListener('hashchange', updateHighlight);
});

watch(() => [route.path, route.hash], updateHighlight);
</script>
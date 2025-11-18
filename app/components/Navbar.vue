<template>
	<nav
		class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-darkbg/80 backdrop-blur-md 
			rounded-full px-8 py-3 shadow-xl border border-muted/30">

		<div class="flex items-center justify-between gap-8 text-text font-medium">
			<NuxtLink to="/" class="hover:text-accent transition">Home</NuxtLink>
			<NuxtLink to="/experience" class="hover:text-accent transition">Experience</NuxtLink>
			<NuxtLink to="/projects" class="hover:text-accent transition">Projects</NuxtLink>
		</div>

	</nav>
</template>

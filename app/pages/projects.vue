<template>
	<div class="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0f0f0f] text-text">
		<section class="max-w-6xl mx-auto px-6 py-24">
			<h2 class="text-4xl md:text-5xl font-bold mb-12 text-white-400 text-center">
				Projects
			</h2>
			<div class="flex flex-col gap-6">
				<ProjectCard v-for="(proj, idx) in projects" :key="idx" :project="proj" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/Projects.vue'
import { useConfig } from '~/composables/useConfig'

const { projects } = useConfig()
</script>

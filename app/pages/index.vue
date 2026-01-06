<template>
	<div>
		<Hero />
		<section id="projects">
			<ProjectView />
		</section>
		<section id="experience">
			<ExperienceSection />
		</section>
	</div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue'
import ProjectView from '~/components/Projects.vue'
import ExperienceSection from '~/components/Experience.vue'
</script>

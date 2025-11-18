<template>
	<div class="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0f0f0f] text-text">
		<section class="max-w-6xl mx-auto px-6 py-24">
			<h2 class="text-4xl md:text-5xl font-bold mb-12 text-white-400 text-center">
				Experience
			</h2>
			<div class="flex flex-col gap-6">
				<ExperienceCard v-for="(exp, idx) in experience.slice().reverse()" :key="idx" :experience="exp" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import ExperienceCard from '~/components/Experience.vue'
import { useConfig } from '~/composables/useConfig'

const { experience } = useConfig()
</script>

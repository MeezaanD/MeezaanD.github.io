<script setup lang="ts">
import { NuxtLink } from '#components'

const props = defineProps<{
	experience: {
		company: string
		title: string
		description: string
		date: string
		url: string
	}
}>()
</script>

<template>
	<div class="w-full max-w-2xl mx-auto mb-6 bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0f0f0f]
		backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 transition hover:shadow-xl hover:scale-[1.02]">
		<div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
			<div>
				<h3 class="font-bold text-lg md:text-xl text-green-400">{{ experience.title }}</h3>
				<p class="text-sm md:text-base text-gray-400">{{ experience.company }}</p>
			</div>
			<span class="text-sm md:text-base text-gray-400">{{ experience.date }}</span>
		</div>
		<p class="mt-4 text-sm md:text-base text-gray-300 whitespace-pre-line">{{ experience.description }}</p>
		<div class="mt-6">
			<NuxtLink :to="experience.url"
				class="inline-block px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition">
				Visit Company
			</NuxtLink>
		</div>
	</div>
</template>

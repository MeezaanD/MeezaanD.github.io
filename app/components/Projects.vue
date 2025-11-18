<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
	project: {
		img: string
		code: string
		liveLink: string
		description: string
		title: string
		techStack: string
	}
}>()

const isOpen = ref(false)
const selectedUrl = ref("")

function openPreview() {
	selectedUrl.value = props.project.liveLink
	isOpen.value = true
}
</script>

<template>
	<div class="w-full max-w-2xl mx-auto mb-6 bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0f0f0f]
    backdrop-blur-md border border-white/10 rounded-2xl shadow-lg transition hover:shadow-xl hover:scale-[1.02]">
		<!-- Header -->
		<div class="p-4 border-b border-white/10">
			<h3 class="font-bold text-lg md:text-xl text-green-400">{{ project.title }}</h3>
			<p class="text-sm text-gray-400 mt-1">{{ project.techStack }}</p>
		</div>

		<!-- Description -->
		<div class="p-4">
			<p class="text-sm md:text-base text-gray-300">{{ project.description }}</p>
		</div>

		<!-- Actions -->
		<div class="p-4 flex flex-wrap gap-3">
			<a :href="project.code" target="_blank"
				class="px-3 py-1 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition">
				Code
			</a>

			<a :href="project.liveLink" target="_blank"
				class="px-3 py-1 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-black transition">
				Live
			</a>
		</div>

		<!-- Modal -->
		<ModalPreview v-if="isOpen" :url="selectedUrl" @close="isOpen = false" />
	</div>
</template>

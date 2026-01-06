<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "#imports";
import { useConfig } from "~/composables/useConfig";

const route = useRoute();
const { projects, isLoading, error } = useConfig();

const slugify = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-");

const slug = computed(() => (route.params.slug?.toString() ?? "").toLowerCase());

const project = computed(() =>
	projects.value.find((item) => slugify(item.title) === slug.value),
);
</script>

<template>
	<div class="min-h-screen bg-linear-to-br from-[#050505] via-[#0f0f0f] to-[#050505] text-white">
		<section class="max-w-5xl mx-auto px-6 py-24 space-y-10 text-center">
			<NuxtLink to="/"
				class="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-green-400 hover:text-white transition justify-center">
				<span class="text-lg">←</span>
				<span>Back Home</span>
			</NuxtLink>

			<div v-if="isLoading" class="flex items-center justify-center py-20 text-gray-300">
				<span class="animate-pulse">Loading project…</span>
			</div>

			<div v-else-if="error"
				class="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl px-6 py-4 text-center">
				{{ error }}
			</div>

			<div v-else-if="!project"
				class="bg-white/5 border border-white/10 rounded-2xl px-8 py-16 text-center text-gray-300">
				<p class="text-xl font-semibold mb-3">Project not found.</p>
				<p>Please choose a project from the main page.</p>
			</div>

			<article v-else
				class="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
				<header class="p-8 border-b border-white/10 space-y-4">
					<p class="uppercase tracking-[0.4em] text-xs text-green-300">
						Featured Project
					</p>
					<h1 class="text-4xl md:text-5xl font-bold text-white">
						{{ project.title }}
					</h1>
					<p class="text-gray-300 text-lg leading-relaxed">
						{{ project.description }}
					</p>
					<p
						class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-400 justify-center">
						<span class="text-green-300 font-semibold tracking-wide">Stack</span>
						<span>{{ project.techStack }}</span>
					</p>
				</header>

				<div class="space-y-10 p-8">
					<div class="grid gap-8 lg:grid-cols-2">
						<div class="space-y-4 text-center">
							<div class="overflow-hidden mx-auto max-w-3xl">
								<img :src="project.previewImage" :alt="`${project.title} preview image`"
									class="w-full h-full object-cover" loading="lazy" />
							</div>
						</div>

						<div class="space-y-4 text-center">
							<div class="overflow-hidden mx-auto max-w-3xl">
								<img :src="project.additionalImage" :alt="`${project.title} additional image`"
									class="w-full h-full object-cover" loading="lazy" />
							</div>
						</div>
					</div>

					<div class="flex flex-wrap gap-4 pt-4 justify-center">
						<a :href="project.liveLink" target="_blank" rel="noopener"
							class="inline-flex items-center gap-2 rounded-full border border-green-400 text-green-400 px-6 py-3 font-semibold tracking-wide transition hover:bg-green-400 hover:text-black">
							View Live
						</a>
						<a :href="project.code" target="_blank" rel="noopener"
							class="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-6 py-3 font-semibold tracking-wide transition hover:border-white hover:bg-white hover:text-black">
							View Code
						</a>
					</div>
				</div>
			</article>
		</section>
	</div>
</template>

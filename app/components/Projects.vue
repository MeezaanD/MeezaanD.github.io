<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "#imports";
import { useConfig } from "~/composables/useConfig";

const router = useRouter();
const { projects, isLoading, error } = useConfig();

const slugify = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-");

const projectCards = computed(() =>
	projects.value.map((project) => ({
		...project,
		slug: slugify(project.title),
	})),
);

const handleOpenProject = (slug: string) => {
	router.push(`/projects/${slug}`);
};
</script>

<template>
	<section class="bg-linear-to-br from-[#0f0f0f] via-[#141414] to-[#0f0f0f] text-text py-24 px-6">
		<div class="max-w-7xl mx-auto">
			<header class="text-center mb-12">
				<p class="text-sm uppercase tracking-[0.3em] text-green-400">
					Featured Work
				</p>
				<h2 class="text-4xl md:text-5xl font-bold text-white mt-3">
					Projects
				</h2>
			</header>

			<div v-if="isLoading" class="flex items-center justify-center py-16 text-gray-300">
				<span class="animate-pulse">Loading projects…</span>
			</div>

			<div v-else-if="error"
				class="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl px-6 py-4 text-center">
				{{ error }}
			</div>

			<div v-else>
				<p v-if="!projectCards.length" class="text-center text-gray-400 py-10">
					No projects available right now.
				</p>

				<div v-else class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
					<button v-for="project in projectCards" :key="project.slug" type="button"
						@click="handleOpenProject(project.slug)"
						class="group text-center overflow-hidden transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/80">
						<div class="relative">
							<img :src="project.previewImage" :alt="`${project.title} preview`"
								class="h-60 w-full object-cover" loading="lazy" />
						</div>
						<div class="p-6">
							<h3 class="text-xl text-center font-semibold text-white mb-2">
								{{ project.title }}
							</h3>
							<p class="text-sm text-center text-gray-400 line-clamp-2">
								{{ project.techStack }}
							</p>
						</div>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.line-clamp-2 {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>

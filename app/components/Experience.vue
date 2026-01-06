<script setup lang="ts">
import { computed } from "vue";
import { NuxtLink } from "#components";
import { useConfig } from "~/composables/useConfig";

const { experience, isLoading, error } = useConfig();

const experienceTimeline = computed(() =>
	[...experience.value].reverse(),
);
</script>

<template>
	<section class="bg-linear-to-br from-[#0f0f0f] via-[#141414] to-[#0f0f0f] text-text py-24 px-6">
		<div class="max-w-7xl mx-auto">
			<header class="text-center mb-12">
				<p class="text-sm uppercase tracking-[0.3em] text-green-400">
					Career Journey
				</p>
				<h2 class="text-4xl md:text-5xl font-bold text-white mt-3">
					Experience
				</h2>
			</header>

			<div v-if="isLoading" class="flex items-center justify-center py-16 text-gray-300">
				<span class="animate-pulse">Loading experience…</span>
			</div>

			<div v-else-if="error"
				class="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl px-6 py-4 text-center">
				{{ error }}
			</div>

			<div v-else>
				<p v-if="!experienceTimeline.length" class="text-center text-gray-400 py-10">
					No experience to share right now.
				</p>

				<div v-else class="space-y-8">
					<article v-for="(item, idx) in experienceTimeline" :key="`${item.company}-${idx}`"
						class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-8 py-10 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-green-400/40">
						<span
							class="pointer-events-none absolute left-0 top-0 h-full w-1px bg-linear-to-b from-green-400/0 via-green-400/60 to-green-400/0"
							aria-hidden="true" />

						<div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
							<div class="space-y-1">
								<p class="text-xs uppercase tracking-[0.3em] text-green-400">Experience</p>
								<h3 class="text-2xl font-semibold text-white">
									{{ item.title }}
								</h3>
								<p class="text-base text-gray-400">
									<span class="font-medium text-white">{{ item.company }}</span>
								</p>
							</div>

							<span
								class="inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-gray-400">
								{{ item.date }}
							</span>
						</div>

						<p class="mt-6 text-base leading-relaxed text-gray-400 whitespace-pre-line">
							{{ item.description }}
						</p>

						<div class="mt-8">
							<NuxtLink :to="item.url" target="_blank" rel="noopener"
								class="inline-flex items-center gap-3 rounded-full border border-green-400/80 px-6 py-3 text-sm font-semibold text-green-400 transition hover:bg-green-400 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/80">
								<span>Visit Company</span>
							</NuxtLink>
						</div>
					</article>
				</div>
			</div>
		</div>
	</section>
</template>
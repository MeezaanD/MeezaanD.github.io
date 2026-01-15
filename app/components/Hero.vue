<script setup lang="ts">
const techStacks = [
	{ name: 'React', icon: 'logos:react' },
	{ name: 'Vue', icon: 'logos:vue' },
	{ name: 'Nuxt', icon: 'logos:nuxt-icon' },
	{ name: 'Next', icon: 'logos:nextjs-icon' },
	{ name: 'Astro', icon: 'logos:astro-icon' },
	{ name: 'Typescript', icon: 'logos:typescript-icon' },
	{ name: 'Javascript', icon: 'logos:javascript' },
	{ name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
	{ name: 'Node.js', icon: 'logos:nodejs-icon' },
	{ name: 'Python', icon: 'logos:python' },
	{ name: 'Golang', icon: 'logos:go' },
	{ name: 'MongoDB', icon: 'logos:mongodb-icon' },
	{ name: 'Firebase', icon: 'logos:firebase' },
	{ name: 'MySQL', icon: 'logos:mysql-icon' },
	{ name: 'PostgreSQL', icon: 'logos:postgresql' },
	{ name: 'Docker', icon: 'logos:docker-icon' },
	{ name: 'Git', icon: 'logos:git-icon' },
	{ name: 'Linux', icon: 'logos:linux-tux' },
]
</script>

<template>
	<section class="relative flex flex-col justify-center items-center min-h-screen px-6
    bg-linear-to-br from-[#0f0f0f] via-[#141414] to-[#0f0f0f] text-white overflow-hidden">

		<!-- Soft Glow Blobs -->
		<div class="absolute -top-24 -left-24 w-80 h-80 bg-green-500/20 rounded-full blur-[140px]"></div>
		<div class="absolute -bottom-24 -right-24 w-96 h-96 bg-green-400/20 rounded-full blur-[160px]"></div>

		<!-- Portrait -->
		<img src="/portrait.jpg" alt="Meezaan Davids"
			class="mt-25 w-30 h-30 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-green-500/50 shadow-xl mb-6 animate-fadeIn" />

		<!-- Headline -->
		<h1 class="text-2xl sm:text-4xl md:text-4xl font-extrabold mb-4 text-center animate-fadeIn">
			<span class="text-white-500">Hi, I’m </span>
			<span class="text-green-500">Meezaan Davids</span>
		</h1>

		<!-- Subheadline / Bio -->
		<p
			class="text-base sm:text-lg md:text-xl max-w-md sm:max-w-2xl text-center text-gray-400 mb-10 leading-relaxed animate-fadeIn delay-100">
			Software Developer with 3+ years of experience building scalable web, mobile, and software solutions.
			Passionate about full-stack engineering, clean UI, and turning ideas into high-quality, real-world products.
		</p>

		<!-- Tech Stack Icons -->
		<div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-6 sm:gap-10 mb-12 animate-fadeIn delay-200">
			<div v-for="tech in techStacks" :key="tech.name"
				class="flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:scale-105">
				<UIcon :name="tech.icon"
					class="w-12 sm:w-12 h-8 sm:h-8 text-green-500/90 hover:text-green-400 transition-colors" />
				<span class="mt-2 text-xs sm:text-sm text-gray-400 font-medium text-center">
					{{ tech.name }}
				</span>
			</div>
		</div>

		<!-- Contact Section -->
		<section id="contact"
			class="my-5 max-w-md sm:max-w-3xl w-full mx-auto flex flex-wrap justify-center gap-4 animate-fadeIn delay-300">
			<a href="mailto:meezaandavids365@gmail.com"
				class="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-green-500 transition-colors">
				<UIcon name="logos:google-gmail" class="w-5 h-5 sm:w-6 sm:h-6" />
				<span>Email</span>
			</a>

			<a href="https://github.com/MeezaanD" target="_blank"
				class="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-green-500 transition-colors">
				<UIcon name="logos:github-icon" class="w-5 h-5 sm:w-6 sm:h-6" />
				<span>GitHub</span>
			</a>

			<a href="https://www.linkedin.com/in/meezaan-davids/" target="_blank"
				class="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-green-400 transition-colors">
				<UIcon name="logos:linkedin-icon" class="w-5 h-5 sm:w-6 sm:h-6" />
				<span>LinkedIn</span>
			</a>

			<!-- Certifications -->
			<a href="https://meezaand.github.io/certifications/" target="_blank"
				class="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-green-400 transition-colors">
				<UIcon name="mdi:certificate-outline" class="w-5 h-5 sm:w-6 sm:h-6" />
				<span>Certifications</span>
			</a>
		</section>
	</section>
</template>

<style scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fadeIn {
	animation: fadeIn 0.8s ease-out forwards;
}

.delay-100 {
	animation-delay: 0.1s;
}

.delay-200 {
	animation-delay: 0.2s;
}

.delay-300 {
	animation-delay: 0.3s;
}
</style>

import { ref } from "vue";

interface ExperienceItem {
	company: string;
	title: string;
	description: string;
	date: string;
	url: string;
}

interface ProjectItem {
	img: string;
	code: string;
	liveLink: string;
	description: string;
	title: string;
	techStack: string;
	previewImage: string;
	additionalImage: string;
}

export const useConfig = () => {
	const experience = ref<ExperienceItem[]>([]);
	const projects = ref<ProjectItem[]>([]);
	const isLoading = ref(true);
	const error = ref<string | null>(null);

	const fetchConfig = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await fetch(
				"https://meezaand.github.io/config/config.json",
			);

			if (!response.ok) {
				throw new Error(
					`Failed to fetch config: ${response.status} ${response.statusText}`,
				);
			}

			const data = await response.json();

			if (!data.experience || !data.projects) {
				throw new Error("Invalid config structure");
			}

			experience.value = data.experience;
			projects.value = data.projects;
		} catch (err: any) {
			console.error("Error fetching config:", err);
			error.value = err.message || "Unknown error occurred";
			// Optionally provide fallback defaults
			experience.value = [];
			projects.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	// Fetch immediately
	fetchConfig();

	return {
		experience,
		projects,
		isLoading,
		error,
	};
};

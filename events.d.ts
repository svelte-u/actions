declare namespace svelteHTML {
	interface HTMLAttributes {
		"on:hover"?: (event: CustomEvent<boolean>) => void
		"on:files"?: (event: CustomEvent<File[]>) => void
		"on:fullscreen"?: (event: CustomEvent<boolean>) => void
	}
}

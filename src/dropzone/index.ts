import { on } from "@sveu/browser"

import type { DropzoneData } from "../utils"

/**
 * Create a dropzone area for files.
 *
 * @param element - The element to make as dropzone.
 *
 * @param fn - A function to be called when the dropzone is hovered or files are dropped.
 * - `overDropzone` - Whether the dropzone is hovered. Type: `boolean`.
 * - `files` - The files dropped. Type: `File[]` or `undefined`.
 */
export function dropzone(
	element: HTMLElement,
	fn?: (data: DropzoneData) => void
) {
	let counter = 0

	const dragenter_cleanup = on<DragEvent>(element, "dragenter", (event) => {
		event.preventDefault()

		counter += 1

		if (fn) fn({ overDropzone: true })

		element.dispatchEvent(new CustomEvent("hover", { detail: true }))
	})

	const dragover_cleanup = on<DragEvent>(element, "dragover", (event) => {
		event.preventDefault()
	})

	const dragleave_cleanup = on<DragEvent>(element, "dragleave", (event) => {
		event.preventDefault()

		counter -= 1

		if (counter === 0) {
			if (fn) fn({ overDropzone: false })

			element.dispatchEvent(new CustomEvent("hover", { detail: false }))
		}
	})

	const drop_cleanup = on<DragEvent>(element, "drop", (event) => {
		event.preventDefault()

		counter = 0

		const files = Array.from(event.dataTransfer?.files ?? [])

		if (fn) fn({ overDropzone: false, files })

		element.dispatchEvent(new CustomEvent("hover", { detail: false }))

		element.dispatchEvent(new CustomEvent("files", { detail: files }))
	})

	return {
		destroy() {
			dragenter_cleanup()
			dragover_cleanup()
			dragleave_cleanup()
			drop_cleanup()
		},
	}
}

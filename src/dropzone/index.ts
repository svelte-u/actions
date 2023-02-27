import { on } from "@sveu/browser"

import type { DropzoneData } from "../utils"

/**
 * Create a dropzone area.
 *
 * @param element - The element to make as dropzone.
 *
 * @param fn - A function to be called when the dropzone is hovered or files are dropped.
 * - `over_dropzone` - Whether the dropzone is hovered. Type: `boolean`.
 * - `files` - The files dropped. Type: `File[]` or `undefined`.
 */
export function dropzone(
	element: HTMLElement,
	fn?: (data: DropzoneData) => void
) {
	let counter = 0

	on<DragEvent>(element, "dragenter", (event) => {
		event.preventDefault()

		counter += 1

		if (fn) fn({ over_dropzone: true })

		element.dispatchEvent(new CustomEvent("hover", { detail: true }))
	})

	on<DragEvent>(element, "dragover", (event) => {
		event.preventDefault()
	})

	on<DragEvent>(element, "dragleave", (event) => {
		event.preventDefault()

		counter -= 1

		if (counter === 0) {
			if (fn) fn({ over_dropzone: false })

			element.dispatchEvent(new CustomEvent("hover", { detail: false }))
		}
	})

	on<DragEvent>(element, "drop", (event) => {
		event.preventDefault()

		counter = 0

		const files = Array.from(event.dataTransfer?.files ?? [])

		if (fn) fn({ over_dropzone: false, files: files })

		element.dispatchEvent(new CustomEvent("hover", { detail: false }))

		element.dispatchEvent(new CustomEvent("files", { detail: files }))
	})
}
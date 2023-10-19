import { on } from "@sveu/browser"

import type { DropzoneAttributes, DropzoneParameter } from "../utils"
import type { ActionReturn } from "svelte/action"

/**
 * Create a dropzone area for files.
 *
 * @param element - The element to make as dropzone.
 *
 * @param fn - A function to be called when the dropzone is hovered or files are dropped.
 * - `overDropzone` - Whether the dropzone is hovered. Type: `boolean`.
 * - `files` - The files dropped. Type: `File[]` or `undefined`.
 *
 * @example
 * ```html
 * <script>
 * function fn({ overDropzone, files }) {
 * // Do something with the data
 * }
 * </script>
 *
 * <div use:dropzone={fn} />
 * ```
 *
 * @example With custom element:
 *
 * ```html
 * <script>
 * function hover(data) {
 * // Do something with the data
 * }
 *
 * function onDrop(data) {
 * // Do something with the data
 * }
 * </script>
 *
 * <div on:files={onDrop} on:hover={hover} use:dropzone />
 * ```
 */
export function dropzone(
	element: HTMLElement,
	fn?: (data: DropzoneParameter) => void,
): ActionReturn<DropzoneParameter, DropzoneAttributes> {
	let counter = 0

	const dragenter_cleanup = on<DragEvent>(element, "dragenter", (event) => {
		event.preventDefault()

		counter += 1

		fn?.({ overDropzone: true })

		element.dispatchEvent(new CustomEvent("hover", { detail: true }))
	})

	const dragover_cleanup = on<DragEvent>(element, "dragover", (event) => {
		event.preventDefault()
	})

	const dragleave_cleanup = on<DragEvent>(element, "dragleave", (event) => {
		event.preventDefault()

		counter -= 1

		if (counter === 0) {
			fn?.({ overDropzone: false })

			element.dispatchEvent(new CustomEvent("hover", { detail: false }))
		}
	})

	const drop_cleanup = on<DragEvent>(element, "drop", (event) => {
		event.preventDefault()

		counter = 0

		const files = Array.from(event.dataTransfer?.files ?? [])

		fn?.({ overDropzone: false, files })

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

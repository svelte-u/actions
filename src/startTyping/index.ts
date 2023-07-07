import { on } from "@sveu/browser"

/**
 * Checks if the user is currently focused element is editable.
 *
 */
function is_editable() {
	const { activeElement: active_el, body } = document

	if (!active_el) return false

	if (active_el === body) return false

	if (["INPUT", "TEXTAREA"].includes(active_el.tagName)) return true

	return active_el.hasAttribute("contenteditable")
}

/**
 * Checks if the key pressed is valid for typing.
 *
 * @param event - The keyboard event.
 *
 */
function is_valid_char({ keyCode, metaKey, ctrlKey, altKey }: KeyboardEvent) {
	if (metaKey || ctrlKey || altKey) return false

	// 0-9
	if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))
		return true

	// a-z
	if (keyCode >= 65 && keyCode <= 90) return true

	return false
}

/**
 * Create a typing listener for the given element.
 *
 * @param element - The element to listen for typing.
 *
 * @param fn - A function to be called when the user types a valid character.
 *
 * @example
 * ```html
 * <script>
 * function fn(element, event) {
 * 	 if(element !== document.activeElement) element.focus()
 * }
 * </script>
 *
 * <input use:startTyping={fn} />
 * ```
 *
 */
export function startTyping<T extends HTMLElement>(
	element: T,
	fn: (element: T, event: KeyboardEvent) => void
) {
	function handle(event: KeyboardEvent) {
		!is_editable() && is_valid_char(event) && fn(element, event)
	}

	const cleanup = on(document, "keydown", handle, { passive: true })

	return {
		destroy() {
			cleanup()
		},
	}
}

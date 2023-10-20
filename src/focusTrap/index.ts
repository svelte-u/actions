import { on, eventDispatcher } from "@sveu/browser"
import { noop } from "@sveu/shared"

import type { FocusTrapOptions, FocusTrapAttributes } from "../utils"
import type { ActionReturn } from "svelte/action"

/**
 * Trap focus inside an element.
 *
 * @param element - The element to trap focus inside.
 *
 * @param options - The options to use.
 * - `fn` - The function to call when the element mounted.
 * - `tab` - Whether to trap focus inside the element when the tab key is pressed.
 * - `forwards` - The keys to use to move focus forwards.
 * - `backwards` - The keys to use to move focus backwards.
 * - `active` - Whether the focus trap is active by default.
 *
 * @example
 * ```html
 *<script>
 *    function fn(toggle) {
 *        // Do something with the toggle function
 *    }
 *    let options = {
 *        fn,
 *        tab: true,
 *        forwards: ["ArrowDown", "ArrowRight"],
 *        backwards: ["ArrowUp", "ArrowLeft"],
 *    }
 *</script>
 *
 *
 *<div use:focusTrap={options}>
 *    <button>Button 1</button>
 *    <button>Button 2</button>
 *    <button>Button 3</button>
 *</div>
 * ```
 */
export function focusTrap(
	element: HTMLElement,
	options: FocusTrapOptions,
): ActionReturn<FocusTrapOptions, FocusTrapAttributes> {
	const { fn = noop, tab = true, forwards = [], backwards = [] } = options

	let { active = false } = options

	const dispatch = eventDispatcher(element)

	const focusable_elements =
		'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'

	dispatch("focused", active)

	function toggle() {
		active = !active
		dispatch("focused", active)
	}

	function get_elements() {
		const elements: HTMLElement[] = (
			Array.from(element.querySelectorAll(focusable_elements)) as HTMLElement[]
		).filter((el: HTMLElement) => el.style.display !== "none")

		return {
			first: elements[0],
			last: elements[elements.length - 1],
			elements,
		}
	}

	function handler(event: KeyboardEvent) {
		const { first, last, elements } = get_elements()

		if (!active) return

		if (forwards.includes(event.key)) {
			if (document.activeElement === last) first.focus()
			else elements[elements.indexOf(document.activeElement as HTMLElement) + 1].focus()
		}

		if (backwards.includes(event.key)) {
			if (document.activeElement === first) last.focus()
			else elements[elements.indexOf(document.activeElement as HTMLElement) - 1].focus()
		}

		if (tab && event.key === "Tab") {
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault()
				last.focus()
			}

			if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault()
				first.focus()
			}
		}
	}

	const cleanup = on(element, "keydown", handler)

	fn(toggle)

	return {
		destroy() {
			cleanup()
		},
	}
}

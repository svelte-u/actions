import { on } from "@sveu/browser"
import { timeoutFn } from "@sveu/shared"

import type { RippleOptions } from "../utils"
import type { Fn } from "@sveu/shared"
import type { ActionReturn } from "svelte/action"

/**
 * Creates a ripple effect on the element.
 *
 * @param element - The element to create the ripple effect on.
 *
 * @param options - The options for the ripple effect.
 * - `duration` - The duration of the ripple animation in seconds.
 *
 * @example
 * ```html
 * <button use:ripple={{ duration: 0.5 }}>Click me</button>
 * ```
 *
 * @example
 * ```html
 * <button style:--ripple-color="red" use:ripple>Click me</button>
 * ```
 */
export function ripple(
	element: HTMLElement,
	options: RippleOptions = {},
): ActionReturn<RippleOptions> {
	const { duration = 1 } = options

	let _stop: Fn | undefined

	function handler(event: PointerEvent) {
		const x = event.clientX - element.offsetLeft

		const y = event.clientY - element.offsetTop

		const ripple = document.createElement("span")

		ripple.style.cssText = `top: ${y}px; left: ${x}px; position: absolute; background: var(--ripple-color, white); width: 0; height: 0; border-radius: 50%; transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none;`

		ripple.animate(
			[
				{ width: "0px", height: "0px", opacity: 0.5 },
				{ width: "500px", height: "500px", opacity: 0 },
			],
			{
				duration: duration * 1000,
				iterations: Infinity,
			},
		)

		element.style.overflow = "hidden"

		element.style.position = "relative"

		element.appendChild(ripple)

		const { pause } = timeoutFn(() => {
			element.removeChild(ripple)
		}, duration)

		_stop = pause
	}

	const cleanup = on(element, "click", handler)

	return {
		destroy() {
			cleanup()
			_stop?.()
		},
	}
}

import { on } from "@sveu/browser"

import type { FullscreenFnData, FullscreenFunctionMap } from "../utils"

// from: https://github.com/sindresorhus/screenfull.js/blob/master/src/screenfull.js
const functions_map: FullscreenFunctionMap[] = [
	[
		"requestFullscreen",
		"exitFullscreen",
		"fullscreenElement",
		"fullscreenEnabled",
		"fullscreenchange",
		"fullscreenerror",
	],
	// New WebKit
	[
		"webkitRequestFullscreen",
		"webkitExitFullscreen",
		"webkitFullscreenElement",
		"webkitFullscreenEnabled",
		"webkitfullscreenchange",
		"webkitfullscreenerror",
	],
	// Old WebKit
	[
		"webkitRequestFullScreen",
		"webkitCancelFullScreen",
		"webkitCurrentFullScreenElement",
		"webkitCancelFullScreen",
		"webkitfullscreenchange",
		"webkitfullscreenerror",
	],
	[
		"mozRequestFullScreen",
		"mozCancelFullScreen",
		"mozFullScreenElement",
		"mozFullScreenEnabled",
		"mozfullscreenchange",
		"mozfullscreenerror",
	],
	[
		"msRequestFullscreen",
		"msExitFullscreen",
		"msFullscreenElement",
		"msFullscreenEnabled",
		"MSFullscreenChange",
		"MSFullscreenError",
	],
] as any

/**
 * Make an element enter or exit fullscreen mode.
 *
 * @param element - The element to make fullscreen.
 *
 * @param fn - The function to call when the element mounted.
 * - `supported` - Whether fullscreen is supported.
 * - `enter` - The function to call to enter fullscreen.
 * - `exit` - The function to call to exit fullscreen.
 * - `toggle` - The function to call to toggle fullscreen.
 *
 * @example
 * ```html
 * <script>
 * function fn({ supported, enter, exit, toggle }) {
 * // Do something with the data
 * }
 * </script>
 *
 * <video src="https://vjs.zencdn.net/v/oceans.mp4" use:fullscreen={fn}  on:fullscreen="{(e) => console.log(e.detail)}"/>
 * ```
 */
export function fullscreen(
	element: HTMLElement | SVGElement,
	fn: (data: FullscreenFnData) => void
) {
	let fullscreen = false

	let map = functions_map[0]

	function support() {
		for (const m of functions_map) {
			if (m[1] in document) {
				map = m
				return true
			}
		}

		return false
	}

	const supported = support()

	const [REQUEST, EXIT, ELEMENT, , EVENT] = map

	async function exit() {
		if (!supported) return

		if (document?.[ELEMENT]) await document[EXIT]()

		fullscreen = false

		element.dispatchEvent(
			new CustomEvent("fullscreen", { detail: fullscreen })
		)
	}

	async function enter() {
		if (!supported) return

		if (fullscreen) return

		await element[REQUEST]()

		fullscreen = true

		element.dispatchEvent(
			new CustomEvent("fullscreen", { detail: fullscreen })
		)
	}

	async function toggle() {
		if (fullscreen) await exit()
		else await enter()
	}

	fn({ supported, enter, exit, toggle })

	const cleanup = on(
		document,
		EVENT,
		() => {
			fullscreen = Boolean(document[ELEMENT])
			element.dispatchEvent(
				new CustomEvent("fullscreen", { detail: fullscreen })
			)
		},
		false
	)

	return {
		destroy() {
			exit()
			cleanup()
		},
	}
}

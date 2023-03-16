import { on, storage } from "@sveu/browser"
import { noop, unstore } from "@sveu/shared"

import type { SnapshotOptions } from "../utils"

/**
 * Takes a snapshot of the state of a node and restores it
 *
 * @param node - The node to take a snapshot of.
 *
 * @param options - The options to use.
 * - `key` - The key to use storing the snapshot data.
 * - `store` - The storage to use for storing the snapshot data. Defaults to "local".
 * - `fallback` - The fallback value to use if no data is found.
 * - `capture` - A function that captures the state of the node.
 * - `restore` - A function that restores the state of the node.
 *
 */
export function snapshot<T extends HTMLElement | Window>(
	node: T,
	options: SnapshotOptions<T> = {}
) {
	const {
		key = "snapshot",
		capture,
		restore = () => noop,
		fallback = {},
		store = "local",
	} = options

	const state = storage(key, fallback, { store })

	restore(unstore(state))

	function _capture() {
		if (capture) {
			state.set(capture(node))
		}
	}

	const cleanup = on(window, "beforeunload", _capture)

	return {
		destroy() {
			_capture()
			cleanup()
		},
	}
}

export type DropzoneParameter = {
	overDropzone: boolean
	files?: File[]
}

export interface ElementBoundParameter {
	/** The height of the element. */
	height: number

	/** The width of the element. */
	width: number

	/** The bottom position of the element. */
	bottom: number

	/** The left position of the element. */
	left: number

	/** The right position of the element. */
	right: number

	/** The top position of the element. */
	top: number

	/** The x position of the element. */
	x: number

	/** The y position of the element. */
	y: number
}

export type FullscreenParameter = {
	supported: boolean

	enter: () => Promise<void>

	exit: () => Promise<void>

	toggle: () => Promise<void>
}

export type FullscreenFunctionMap = [
	"requestFullscreen",
	"exitFullscreen",
	"fullscreenElement",
	"fullscreenEnabled",
	"fullscreenchange",
	"fullscreenerror",
]

export interface SnapshotOptions<T = unknown> {
	/**
	 * The key to use storing the snapshot data.
	 */
	key?: string

	/**
	 * The storage to use for storing the snapshot data.
	 *
	 * @defaultValue "local"
	 */
	store?: "cookie" | "local" | "session"

	/**
	 * The fallback value to use if no data is found.
	 *
	 * @defaultValue `{}`
	 *
	 */
	fallback?: unknown

	/**
	 * A function that captures the state of the node.
	 *
	 * @param target - The node to capture the state of.
	 */
	capture?: (target: T) => unknown

	/**
	 * A function that restores the state of the node.
	 *
	 * @param state - The state to restore.
	 *
	 */
	restore?: (state: unknown) => void
}

export interface FocusTrapOptions {
	/**
	 * The function to call when the element mounted.
	 *
	 * @param toggle - The function to toggle focus trap.
	 *
	 */
	fn?: (toggle: () => void) => void

	/**
	 * Whether the tab key should be disabled.
	 *
	 * @defaultValue true
	 */
	tab?: boolean

	/**
	 * The keys which will move the focus to the next element in forward direction.
	 *
	 * @defaultValue []
	 *
	 */
	forwards?: string[]

	/**
	 * The keys which will move the focus to the next element in backward direction.
	 *
	 * @defaultValue []
	 *
	 */
	backwards?: string[]

	/**
	 * Whether the focus trap is active by default.
	 *
	 * @defaultValue false
	 */
	active?: boolean
}

export interface RippleOptions {
	/**
	 * The duration of the ripple animation in seconds.
	 *
	 * @defaultValue 1
	 */
	duration?: number
}

export interface DropzoneAttributes {
	"on:hover"?: (event: CustomEvent<boolean>) => void
	"on:files"?: (event: CustomEvent<File[]>) => void
}

export interface FullscreenAttributes {
	"on:fullscreen"?: (event: CustomEvent<boolean>) => void
}

export interface FocusTrapAttributes {
	"on:focused"?: (event: CustomEvent<boolean>) => void
}

import path from "path"

import fs from "fs-extra"

import { DIR_ROOT, DIR_SRC, list_functions, update_package_json } from "./utils"

interface Metadata {
	total: number
	packages: Record<string, string[]>
}

async function run() {
	const functions = await list_functions(DIR_SRC)

	const modules = Object.keys(functions)

	const pkg_exports: Record<string, unknown> = {
		".": {
			import: "./index.js",
			types: "./index.d.ts",
		},
	}

	const metadata: Record<string, unknown> = { total: 0, packages: {} }

	for (const module of modules) {
		const module_path = path.join(DIR_SRC, module === "index" ? "" : module)

		const module_functions = functions[module]

		const metadata: Metadata = { total: 0, packages: {} }

		metadata.total += module_functions.length

		const imports: string[] = []

		module_functions.map((f) => {
			imports.push(`export * from "./${f.name}"`)
		})

		await fs.writeFile(path.join(module_path, "index.ts"), `${imports.join("\n")}\n`)

		metadata.packages[module] = module_functions.map((f) => f.name)

		// remove utils from the index module in metadata
		if (module === "index") {
			metadata.packages[module] = metadata.packages[module].filter(
				(f: string) => f !== "utils",
			)
			metadata.total -= 1
		}

		if (module !== "index") {
			pkg_exports[`./${module}`] = {
				import: `./${module}.js`,
			}
		}
	}

	await fs.writeFile(path.join(DIR_ROOT, "metadata.json"), JSON.stringify(metadata, null, 4))

	await update_package_json(pkg_exports)
}

run()

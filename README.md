<p align="center">
<img height="150" src="https://avatars.githubusercontent.com/u/120715197" />

<h3 align="center">Svelte Utility</h3>
<h2 align="center">Write less, Do more</h2>
</p>


<p align="center">
<a href="https://www.npmjs.com/package/@sveu/actions" target="_blank">
    <img src="https://img.shields.io/npm/dm/@sveu/actions?color=50a36f">
</a>

<a href="" target="_blank">
    <img src="https://img.shields.io/static/v1?label=functions&message=100&color=50a36f">
</a>

</p>

---
The key features are:

* **Type Strong 💪**: Written in [TypeScript](https://www.typescriptlang.org/), with [TS Docs](https://github.com/microsoft/tsdoc).
* **Fast to code 🚀**: Increase the speed to develop features by about 200% to 300%.
* **Fewer bugs 🐞**: Reduce about 40% of human (developer) induced errors.
* **SSR Friendly 🕺**: Works perfectly with server-side.
* **Easy 💫**: Designed to be easy to use and learn. Less time reading docs.
* **Interactive demos 🎉** : Documentation of functions also come with interactive demos!.
* **Feature Rich  🌈**: 100+ functions for you to choose from.
* **Fully 🌳 shakeable**: Only take what you want.

## Installation

```bash
pnpm add -D @sveu/actions
```

## 🧪 Example

```svelte
<script>
 import { dropzone } from "@sveu/actions"

 function hover(event) {
    ...
 }

 function on_file_drop(event) {
    ...
 }
</script>

<div use:dropzone on:hover="{hover}" on:files="{on_file_drop}" />

```

## 🙏 Thanks

This project is heavily inspired by the following awesome projects.

- [vueuse/vueuse](https://github.com/vueuse/vueuse/)
- [rayepps/radash](https://github.com/rayepps/radash)
- [Python](https://python.org)
- [Vue](https://vuejs.org)

## 📜 License

[MIT License](#License) © 2022-PRESENT [Mohamed Nesredin](https://github.com/mohamed-kaizen)
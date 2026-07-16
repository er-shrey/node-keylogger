# node-keylogger

A simple keylogger written in Node.js using the [`iohook`](https://www.npmjs.com/package/iohook) native module to capture global keyboard events, decode them into readable text, and write the result to a log file.

**For educational/authorized use on your own systems only.** Capturing another person's keystrokes without their knowledge or consent is illegal in most jurisdictions. Use this responsibly, e.g. for learning how global key-hooking and event processing works.

## How it works

- `index.js` registers a global `keydown` hook via `iohook` and appends each key's raw keycode to `log.log` as it's pressed.
- It tracks Caps Lock state (`rawcode 20`) and shift-key state to distinguish upper/lower case and shifted characters.
- Pressing `Ctrl+Shift+Z` stops the hook and triggers `processComplete()`, which reads `log.log` line by line, decodes the raw keycodes back into characters (respecting caps lock/shift state), and writes the human-readable result to `output.log`.

## Tech Stack

- Node.js
- [`iohook`](https://www.npmjs.com/package/iohook) — native global keyboard/mouse hook bindings

## Prerequisites

- Node.js (a version compatible with `iohook@^0.5.0`'s prebuilt native binaries — Node 8–12 range is safest; newer Node versions may require rebuilding the native module)
- A build toolchain (Python, make, a C++ compiler) in case `iohook` needs to compile from source for your platform

## Installation

```
npm install
```

## Running

```
node index.js
```

Key events are appended to `log.log` while the process runs. Press `Ctrl+Shift+Z` to stop logging and generate the decoded `output.log`.

## Output files

- `log.log` — raw keycode stream captured during a session
- `output.log` — decoded, human-readable text produced after `Ctrl+Shift+Z` is pressed

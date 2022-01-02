# [xori](https://fastvm.github.io/xori)

Xori lets you run [Paka](https://github.com/fastvm/paka) online.

## State

Xori's uses [MiniVM](https://github.com/fastvm/minivm)'s [snapshot feature](https://github.com/FastVM/minivm/commits/main/vm/save.h)

## How

Xori is a simple creation it does not patch MiniVM in any way. 

The package.json file builds paka and minivm to Webassembly. Paka is run with its default compiler. By default `source/browser.paka` is imported as well as `paka/lang/io.paka`



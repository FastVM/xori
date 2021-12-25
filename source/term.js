
import * as create from '../paka/minivm/minivm.js';

const run = async(src, term) => {
    const args = ['./boot.bc', '-e', `import("io.paka") ${src}`];
    const mod = {};
    mod["print"] = (txt) => {
        term.write(txt);
        term.write('\n');
    }
    const vm = await create(mod);
    term.reset();
    for (const arg of args) {
        vm.ccall('vm_main_add_arg', 'void', ['string'], [arg]);
    }
    vm.ccall('vm_main_default', 'int', [], []);
};

window.run = run;

export default run;


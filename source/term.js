
import * as create from '../paka/minivm/minivm.js';

const run = async(src, term) => {
    const args = ['./boot.bc', '-e', src];
    const mod = {};
    mod["print"] = (txt) => {
        const nl = txt.replace('\n', '\r\n');
        term.write(nl);
    }
    const vm = await create(mod);
    for (const arg of args) {
        vm.ccall('vm_main_add_arg', 'void', ['string'], [arg]);
    }
    term.clear();
    vm.ccall('vm_main_default', 'int', [], []);
};

window.run = run;

export default run;


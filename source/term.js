
import MiniVM from '../paka/minivm/minivm.js';

const mvm = MiniVM;
window.mvm = vm;

const vm = MiniVM();
window.vm = vm;

vm.preRun = [() => {
    
}];

const run = async (src, term) => {
    // term.clear();
    console.log(MiniVM);
    // console.log(window.vm = await MiniVM());
    // term.write(src);
};

export default run;

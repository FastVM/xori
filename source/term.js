
const minivmMod = import('../paka/minivm/minivm.js' /* webpackChunkName: 'minivm' */).then(async (minivm) => {
    return minivm;
});

const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;

const vm_none_t = 'void';
const vm_state_t = 'int';
const vm_size_t = 'int';
const vm_num_t = 'int';
const vm_obj_t = 'int';

const typesLikeArray = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigUint64Array, BigUint64Array];

const saveWith = (vm, state) => {
    return async (out, jsObj) => {
        const saveArr = async (arr) => {
            const ret = vm.ccall('vm_api_new', vm_obj_t, [vm_state_t, vm_size_t], [state, arr.length]);
            for (let i = 0; i < arr.length; i++) {
                const obj = await save(arr[i]);
                vm.ccall('vm_api_set', vm_none_t, [vm_state_t, vm_obj_t, vm_size_t, vm_obj_t], [state, ret, i, obj]);
            }
            return ret;
        };

        const saveNum = async (num) => {
            return vm.ccall('vm_api_of_num', vm_obj_t, [vm_state_t, vm_num_t], [state, num]);
        }

        const saveNone = async () => {
            return vm.ccall('vm_api_of_none', vm_obj_t, [vm_state_t], [state]);
        };

        const save = async (obj) => {
            if (typeof x === 'string') {
                return await saveArr(Uint8Array.from(obj).buffer);
            }
            if (Array.isArray(obj)) {
                return await saveArr(obj);
            }
            if (typeof obj === 'number') {
                return await saveNum(obj);
            }
            if (obj == null) {
                return await saveNone();
            }
            if (obj instanceof Response) {
                return await save(await obj.arrayBuffer());
            }
            if (obj instanceof ArrayBuffer) {
                return await save(new Uint8Array(obj));
            }
            for (const type of typesLikeArray) {
                if (obj instanceof type) {
                    return await saveArr(Array.from(obj));
                }
            }
            throw new Error(`cannot serialize: ${obj}`);
        };

        const vmObj = await save(jsObj);
        vm.ccall('vm_api_reset', vm_none_t, [vm_state_t], [state]);
        vm.ccall('vm_api_stack_set', vm_none_t, [vm_state_t, vm_size_t, vm_obj_t], [state, out, vmObj]);
    };
};

const run = async (src, term) => {
    const { default: create } = await minivmMod;

    let todo = [];

    const args = ['./boot.vm', '-e', `import("browser.paka") ${src}`];
    const mod = {};
    mod["print"] = (txt) => {
        term.write(txt);
        term.write('\n');
    }
    mod.vm_do_eval_func = (out, str) => {
        todo.push([out, new AsyncFunction(str)]);
    };

    mod.vm_do_file_put_func = (str) => { };

    const vm = await create(mod);
    const start = new Date();
    term.reset();
    for (const arg of args) {
        vm.ccall('vm_main_add_arg', 'void', ['string'], [arg]);
    }
    let state = vm.ccall('vm_main_default', 'int', [], []);
    while (state !== 0) {
        const save = saveWith(vm, state)
        while (todo.length > 0) {
            let [out, cur] = todo.pop();
            const res = await cur();
            await save(out, res);
        }
        state = vm.ccall('vm_run', 'int', ['int'], [state]);
    }
    const end = new Date();
    return end - start;
};

export default run;


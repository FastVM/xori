
import run from './term.js';

const keymaps = {};
const keymap = async(loadKeyMap) => {
    let ret = keymaps[loadKeyMap];
    if (ret != null) {
        return ret;
    }
    if (loadKeyMap === 'vim') {
        ret = await import('codemirror/keymap/vim');
    } else if (loadKeyMap === 'emacs') {
        ret = await import('codemirror/keymap/emacs');
    } else if (loadKeyMap === 'sublime') {
        ret = await import('codemirror/keymap/sublime');
    }
    keymaps[loadKeyMap] = ret;
    return ret;
}

let setEditTheme = (theme) => {};

import('codemirror' /* webpackChunkName: 'codemirror' */).then(async ({ default: CodeMirror }) => {
    const edVal = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'plaintext',
        theme: 'material-darker',
        lineNumbers: true,
        theme: localStorage.getItem('theme.edit') ?? "dark",
    });
    edVal.setValue(localStorage.getItem('/open.paka') ?? "");
    edVal.on('change', () => {
        localStorage.setItem('/open.paka', edVal.getValue());
    });
    window.ed = () => {
        return edVal.getValue();
    };
    setEditTheme = (theme) => {
        edVal.setOption('theme', theme);
    };
    keymap();
});

window.runit = () => { };

window.ed = () => {
    return document.getElementById('editor').value;
};

window.loadtheme = ({edit, page}) => {
    if (edit != null) {
        document.getElementById('edit-style').href = `theme/${edit}.css`;
        localStorage.setItem('theme.edit', edit);
        setEditTheme(edit);
    }
    if (page != null) {
        document.getElementById('page-style').href = `static/${page}.css`;
        localStorage.setItem('theme.page', page);
    }
};

document.body.onload = () => {
    const pageTheme = localStorage.getItem('theme.page') ?? "dark";
    const editTheme = localStorage.getItem('theme.edit') ?? "material-darker";
    loadtheme({edit: editTheme, page: pageTheme});

    const termElem = document.getElementById('terminal');

    let text = '';

    const term = {
        write: (code) => {
            const src = String(code);
            termElem.innerText += src;
            text += src;
        },

        reset: () => {
            termElem.innerText = '';
            text = '';
            localStorage.setItem('vm.save.text', '');
        }
    };

    const lastText = localStorage.getItem('vm.save.text');
    if (lastText != null && lastText !== '') {
        document.getElementById('terminal').innerText = lastText;

        const lastTime = localStorage.getItem('page.head.time');
        if (lastTime != null) {
            document.getElementById('time').innerText = `${lastTime}ms`;
        }
    }
    
    let worker = null;
    let lastTime = null;

    const nextFrame = () => {
        if (lastTime != null) {
            const ms = new Date() - lastTime;
            localStorage.setItem('page.head.time', ms);
            document.getElementById('time').innerText = `${ms}ms`;
            requestAnimationFrame(nextFrame);
        }
    };

    const runMsg = async(msg) => {
        requestAnimationFrame(nextFrame);

        if (worker != null) {
            worker.terminate();
        }

        worker = new Worker(new URL('term.js', import.meta.url));
        worker.postMessage(msg);
        worker.onmessage = ({data: {type, value}}) => {
            if (type === 'end') {
                lastTime = null;
                localStorage.removeItem('vm.save');
            } else if (type == 'line') {
                term.write(value);
                term.write('\n');
            } else if (type == 'save') {
                localStorage.setItem('vm.save', JSON.stringify(value));
                localStorage.setItem('vm.save.text', text);
                const ms = new Date() - lastTime;
                localStorage.setItem('vm.save.time', ms);
        } else {
                throw new Error('message error: ' + type);
            }
        };
    };

    const lastSave = localStorage.getItem('vm.save');

    if (lastSave != null) {
        lastTime = new Date() - (localStorage.getItem('vm.save.time') ?? 0);
        text = localStorage.getItem('vm.save.text') ?? "";
        runMsg({type: 'save', value: lastSave});
    }

    window.runit = async () => {
        term.reset();
        let src = ed().replace(/[\t\r]+/g, ' ');
        lastTime = new Date();
        await runMsg({type: 'src', value: src})
    };
};

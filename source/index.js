
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

let firstEditTheme = 'material-darker';
let setEditTheme = (theme) => {
    firstEditTheme = theme;
};

import('codemirror' /* webpackChunkName: 'codemirror' */).then(async ({ default: CodeMirror }) => {
    const edVal = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'plaintext',
        theme: 'material-darker',
        lineNumbers: true,
        theme: firstEditTheme,
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
        setEditTheme(edit);
    }
    if (page != null) {
        document.getElementById('page-style').href = `static/${page}.css`;
    }
};

document.body.onload = () => {
    const termElem = document.getElementById('terminal');

    const term = {
        write: (code) => {
            termElem.innerText += String(code);
        },

        reset: () => {
            termElem.innerText = '';
        },
    };

    window.runit = async () => {
        let src = ed();
        src = src.replace(/\s+/g, ' ');
        const ms = await run(src, term);
        document.getElementById('time').innerText = `${ms}ms`;
    };

};

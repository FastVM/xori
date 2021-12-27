
import run from './term.js';

import('codemirror' /* webpackChunkName: 'codemirror' */).then(({ default: CodeMirror }) => {
    const edVal = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'plaintext',
        theme: 'material-darker',
        lineNumbers: true,
    });
    ed = () => {
        return edVal.getValue();
    }
});

window.runit = () => { };

window.ed = () => {
    return document.getElementById('editor').value;
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

    window.runit = async() => {
        let src = ed();
        console.log(src);
        src = src.replace(/\s+/g, ' ');
        const ms = await run(src, term);
        document.getElementById('time').innerText = `${ms}ms`;
    };

};

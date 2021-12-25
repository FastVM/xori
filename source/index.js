
import {Terminal} from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import * as monaco from 'monaco-editor';
import run from './term.js';

window.runit = () => {};

document.body.onload = () => {
    const term = new Terminal({
        convertEol: true,
    });
    const fit = new FitAddon();

    term.loadAddon(fit);

    term.open(document.getElementById('terminal'));

    fit.fit();

    term.write('\x1b[?47h');

    const ed = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'plaintext',
        theme: 'vs-dark',
    });

    document.body.onresize = () => {
        fit.fit();
        ed.layout();
    };

    document.getElementById('terminal').onresize = () => {
        fit.fit();
        ed.layout();
    };

    window.runit = () => {
        const src = ed.getValue();
        run(src, term);
    };

};

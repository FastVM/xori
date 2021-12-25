
import {Terminal} from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import * as CodeMirror from 'codemirror';
import run from './term.js';

window.runit = () => {};

const loaded = {};

document.body.onload = () => {
    const term = new Terminal({
        convertEol: true,
    });
    const fit = new FitAddon();

    term.loadAddon(fit);

    term.open(document.getElementById('terminal'));

    const ed = CodeMirror(document.getElementById('editor'), {
        mode: 'plaintext',
        theme: 'material-darker',
    });

    const dofit = () => {
        fit.fit();
        const ents = document.getElementsByClassName('xterm-screen');
        for (const ent of ents) {
            ent.style.height = '0';
        }
    }

    dofit();

    document.body.onresize = () => {
        dofit();
    };

    document.getElementById('terminal').onresize = () => {
        dofit();
    };

    window.runit = () => {
        let src = ed.getValue();
        src = src.replace(/\s+/g, ' ');
        run(src, term);
    };

};

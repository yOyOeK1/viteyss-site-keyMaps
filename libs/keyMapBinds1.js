
let keyBind = [
    'h', 'ArrowLeft',//left
    't', 'ArrowUp',
    'n', 'ArrowDown',
    's', 'ArrowRight'
];


let sub1 = [
    'a', 'sub1 - > a',
    '1', 'sub1 - > 1',
    '2', 'sub1 - > 2',
    '3', 'sub1 - > 3',
    '4', {name: 'sub1 / 4', sub:[
        '1','sub1 / 4 - 1',
        '2','sub1 / 4 - 2'
        ]},
    'Control + s', 'Sub1 save ...', // this not work
    
];


let keyMap1 = [


'Shift + ~', {name: 'submenu test', sub: sub1},

'Shift + ?', 'keyboard shortcuts map',

'Control + s', 'save ...',
'Control + ArrowRight', 'save ...',

'a + ArrowLeft', 'set clip START',
'a + ArrowRight', 'set clip END',
'o + ArrowLeft', 'jump to clip START',
'o + ArrowRight', 'jump to clip END',
'e + ArrowUp', 'select video above',
'e + ArrowDown', 'select video lower',
'u + ArrowLeft', 'seek to 0',
'u + ArrowRight', 'seek to end',
' ', 'play / stop',
'ArrowLeft', 'seek left',
'ArrowRight', 'seek right',


'1', 'stabiline toggle',
'2', 'rot -',
'3', 'rot +',
'Alt + 1', 'focus on comments',
'Alt + 2', 'focus on tags',
'Alt + 3', 'exit comments or tags focus',

'Shift + G', 'ok',
'Shift + M', 'maby',
'Shift + D', 'delete',
'Shift + N', 'no'

];

export { keyBind,keyMap1 }
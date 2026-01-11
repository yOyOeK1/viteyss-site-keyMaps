
let keyBind = [
    'h', 'ArrowLeft',//left
    't', 'ArrowUp',
    'n', 'ArrowDown',
    's', 'ArrowRight'
];

let keyMap1 = [
 
    `
a - a + < | a + >  = set clip start | end  
o - o + < | o + > = jump to clip
e - e + up | e + down = video select +
u - u + < | u + > = seek 0 or end 
 
right

h - <left
t - up /\
n - down \/
s - right>

`,'',

'ctrlKey + s', 'save ...',

'ArrowLeft + u', 'seek to 0',
' ', 'play / stop',


'1', 'stabiline toggle',
'2', 'rot -',
'3', 'rot +',
'altKey + 1', 'focus on comments',
'altKey + 2', 'focus on tags',
'altKey + 3', 'exit comments or tags focus',

'G', 'ok',
'M', 'maby',
'D', 'delete',
'N', 'no'

];

export { keyBind,keyMap1 }
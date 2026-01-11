

class vyKeyBinder{

    constructor( keyBinds, keyMap ){
        this.key = {
            binds: keyBinds,
            map: keyMap,
            kDown:[],
        };
    
        this.nodeBindTo = undefined;
        this.nodeRes = undefined;


        this.isDoingIt = false;
        
    }

    init=()=>{
        this.isDoingIt = true;
        window.addEventListener('keydown', this.onKeyDown );
        window.addEventListener('keyup', this.onKeyUp );
    }
        


    makeBindsOnEvent=( event )=>{
        let tr = {
            key: `${event.key}`,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey
        };
        for(let b=0,bc=this.key.binds.length; b<bc; b+=2){
            if( tr.key == this.key.binds[ b ] ){
                tr.key = this.key.binds[ b+1 ];
                console.log(`KMB.bind [ ${this.key.binds[ b ]} ] [ ${this.key.binds[ b+1 ]} ]`); 
                break;
            }
        }
        return tr;
    }

    onTestEnevt=( event, direction )=>{
        let eventStr = '';
        let evenMod = this.makeBindsOnEvent( event );
        console.log('key:',evenMod.key, " this.key:",this.key);
        if( ['Shift','Control','Alt'].indexOf( evenMod.key ) == -1 ){ 
            // not single press of ctrl alt shift 
            if( evenMod.altKey ) eventStr+= 'altKey + ';
            if( evenMod.ctrlKey ) eventStr+= 'ctrlKey + ';
            if( this.key.kDown.length && this.key.kDown[0] != evenMod.key ) eventStr+= this.key.kDown.join(' + ');

            eventStr+= evenMod.key;
            console.log(`KMB.testEventStr [ ${eventStr} ] [${evenMod.key}]`);


            let findRes = -1;
            for(let kmi=0,kmic=this.key.map.length; kmi<kmic; kmi+=2){
                if( this.key.map[ kmi ] == eventStr ){
                    console.log(`KMB.testEventStr ->   found kmi[ ${kmi} ] [ ${this.key.map[ kmi+1 ]} ]`);
                }
            }


        }
    }

        
    onKeyDown = ( event ) => {
        if( ['ArrowLeft', 'ArrowRight', 'ArrowUp','ArrowDown'].indexOf( event.key ) == -1 ){

            this.key.kDown.push( event.key );
            let s = new Set(this.key.kDown);
            this.key.kDown = [...s]
        }
        
        let kDebugLine = `altKey:[ ${event.altKey} ] ctrlKey:[ ${event.ctrlKey} ] [ ${event.key} ](${event.keyCode})`;
        console.log(`KMB.keydown: \n${kDebugLine}`);
        let dbDiv= document.getElementById( 'keyBindRes' );
        dbDiv.innerHTML=kDebugLine+'<br>'+dbDiv.innerHTML;
        event.preventDefault();
        event.stopPropagation();
        this.onTestEnevt(event,'down');
    }

    onKeyUp = ( event ) => {
        this.key.kDown.splice( this.key.kDown.indexOf( event.key), 1 );
        console.log("KMB.keyup:"+event.key);
        event.preventDefault();
        event.stopPropagation();
    }

}

export {vyKeyBinder}


class vyKeyBinder{

    constructor( keyBinds, keyMap, onUsed, debugInDiv=false ){
        this.key = {
            binds: keyBinds,
            map: keyMap,
            kDown:[],
        };
        
        this.debug = false;
        this.debugDiv = debugInDiv;
        
        this.cbonUsed = onUsed
        
        this.inSub = undefined;
        this.nodeBindTo = undefined;
        this.nodeRes = undefined;


        this.isDoingIt = false;

        
    }

    init=()=>{
        this.isDoingIt = true;
        window.addEventListener('keydown', this.onKeyDown );
        window.addEventListener('keyup', this.onKeyUp );
    }
    
    disable(){ this.isDoingIt = false;  }
    enable(){ this.isDoingIt = true; }


    makeBindsOnEvent=( event )=>{
        let tr = {
            key: `${event.key}`,
            keyCode: parseInt(event.keyCode),
            altKey: event.altKey,
            ctrlKey: event.ctrlKey
        };
        for(let b=0,bc=this.key.binds.length; b<bc; b+=2){
            if( tr.key == this.key.binds[ b ] ){
                tr.key = this.key.binds[ b+1 ];
                if( this.debug ) console.log(`KMB.bind [ ${this.key.binds[ b ]} ] [ ${this.key.binds[ b+1 ]} ]`); 
                break;
            }
        }
        return tr;
    }

    getOkDivInfo=( keyBindFound )=>{
        let no = Date.now();
        setTimeout(()=>{
            document.getElementById('keyBindOkSet'+no).innerHTML = '';
        },5000);

        if( typeof( keyBindFound ) == 'object' ){
            keyBindFound = "Sub Enter: "+keyBindFound.name;
        }

        return `<div id="${'keyBindOkSet'+no}" style="background-color:gray;"> ${keyBindFound} </div>`;
    }



    getKeyMapInfo( keyMap, level = 0 ){
        let tr = [];
        let appEnd = undefined;
        for(let k=0,kc=keyMap.length; k<kc; k+=2){
            let kdisc = keyMap[ k+1 ];
            if( typeof( kdisc ) == 'object' ){
                appEnd = this.getKeyMapInfo( kdisc.sub, level + 1 ).join('<br>\n');
                kdisc = kdisc.name;

            }
    
    
            let keys = keyMap[ k ].split(' + ');            
            kdisc = kdisc.substring(0,1).toUpperCase()+
                kdisc.substring(1); 
            keys = (level>0?'|&nbsp;&nbsp;&nbsp;'.repeat(level):'')+
                (level>0?'|_':'')+
                '<div class="kbKey">'+keys.join('</div> + <div class="kbKey">')+'</div>';
            let keyStr = (keys==" "?'[ space ]':keys);
            tr.push(`${keyStr} - <small>${kdisc}</small>`);

            if( appEnd ){
                tr.push( appEnd );
                appEnd = undefined;
            }

        }

        return tr;
    }

    getKeyDivInfo( keyMap ){
        let tr = this.getKeyMapInfo( this.key.map )
        let trB = [];
        

        for(let k=0,kc=this.key.binds.length; k<kc; k+=2)
            trB.push(`<div class="kbKey">${this.key.binds[ k ]}</div> <=> <div class="kbKey">${this.key.binds[ k+1 ]}</div>`);

        return `
            Keyboard shortcuts:
            <div>${tr.join("<br>\n")}</div><hr>
            Keys bindings:
            <div>${trB.join("<br>\n")}</div>`;
    }

    onTestEnevt=( evenMod, direction )=>{
        if( this.debugDiv ) document.getElementById('keyBindPressNow').innerHTML = direction+' '+this.key.kDown.join(' + ');
        if( direction == 'up' ) return 1;

        let eventStr = this.key.kDown.join(' + ');
        
        let findRes = -1;
        let kmap = this.inSub ? this.inSub : this.key.map;
        
        for(let kmi=0,kmic=kmap.length; kmi<kmic; kmi+=2){
            if( kmap[ kmi ] == eventStr ){
                if( this.debug ) console.log(`KMB.testEventStr ->   found kmi[ ${kmi} ] [ ${kmap[ kmi+1 ]} ]`);
                findRes = kmi;
                if( typeof( kmap[ kmi+1 ] ) == 'object' ){   
                    console.log('KMB. sub enter -> ',kmap[ kmi+1 ].name);
                    this.inSub = kmap[ kmi+1 ].sub;
                    if( this.debugDiv ) document.getElementById('keyBindSub').innerHTML = 'xx'+kmap[ kmi+1 ].name;
                }else{
                    if( this.debugDiv ) document.getElementById('keyBindSub').innerHTML = '';
                    this.cbonUsed( kmap[ kmi+1 ] );
                    //kmi = kmap.length; // break ?
                    
                }
           
                if( this.debugDiv ){
                    document.getElementById('keyBindOk').innerHTML = 
                        this.getOkDivInfo( kmap[ kmi+1 ] )+ 
                        document.getElementById('keyBindOk').innerHTML;
                }
           
                break;
            }

        }

        if( findRes == -1 && this.inSub ){
            console.log('KMB. sub exit');
            this.inSub = undefined;
            if( this.debugDiv ) document.getElementById('keyBindSub').innerHTML = '';
        }

    }

        
    onKeyDown = ( eventReal ) => {
        if( !this.isDoingIt ) return 1;

        let event = this.makeBindsOnEvent( eventReal );

        let kInd = this.key.kDown.findIndex( k=> k == event.key );
        if( kInd == -1 )
            this.key.kDown.push( event.key );
       
        if( this.debugDiv ) {
            let kDebugLine = `alt[ ${event.altKey} ] ctrl[ ${event.ctrlKey} ] [ ${event.key} ](${event.keyCode})`;
            //console.log(`KMB.keydown: \n${kDebugLine}`);
            let dbDiv= document.getElementById( 'keyBindRes' );
            dbDiv.innerHTML=kDebugLine+'<br>'+dbDiv.innerHTML;
        }
        
        eventReal.preventDefault();
        eventReal.stopPropagation();
        this.onTestEnevt(event,'down');
    }

    onKeyUp = ( eventReal ) => {
        if( !this.isDoingIt ) return 1;

        let event = this.makeBindsOnEvent( eventReal );
        this.key.kDown.splice( this.key.kDown.indexOf( event.key), 1 );

        //console.log("KMB.keyup:"+event.key);
        eventReal.preventDefault();
        eventReal.stopPropagation();
        this.onTestEnevt(event,'up');
    }

}

export {vyKeyBinder}
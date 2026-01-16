import { vyKeyBinder } from "./libs/keyBinder";
import { keyBind, keyMap1 } from "./libs/keyMapBinds1";


console.log(`* inject ... [ vyKeyBinder ]`);
window['vyKeyBinder'] = vyKeyBinder;

class s_vyskeyMapsPage{

  constructor(){
    this.kmb = undefined;
    
  }
  
  get getName(){
    return `KeyMaps bindings`;
  }
    
  
  get getDefaultBackgroundColor(){
    return "#ffffff";
  }
  
  getHtml = () => {

    return `
    <img src="${this.homeUrl}assets/ico_keyMapsBindings_32_32.png" style="display:inline"
      alt="KeyMaps - bindings LOGO">
    <b>${this.getName}</b><br>
    <small>
      This site is test place for your key binds / keyboard shortcuts. 
      Test setup is using file from \`./libs/keyMapBinds1.js\`
    </small>
    <!--
    This is a npm package<br>
    viteyss-site-keyMaps<br>
    <pre>
    In Menu: ${this.getName}
    Home url: ${this.homeUrl}
    Ver: ${this.instanceOf.ver}

    More ditails in \`./site.json\`
    </pre>
    -->

    <button onclick="siteByKey.s_vyskeyMapsPage.o.onShowKeyMap();"
      title="show key map now"
      >
        <img src="${this.homeUrl}assets/ico_keyMapsBindings_32_32.png" style="display:inline"
          alt="KeyMaps - show popup with map">
        Current keymap
      </button>
    press:<div id="keyBindPressNow">- - - </div>
    sub:<div id="keyBindSub">- - - </div>
    ok:<div id="keyBindOk">- - - </div>
    log:
    <small><div id="keyBindRes">- - -</div></small>


<style>
.kbKey{
    border-radius: 3px;
    border:1px solid black;
    background-color: #fffecb;
    display:inline-block; 
    padding: 0px 5px;
    margin: 1px;
}

</style>

    `;

  }

  onShowKeyMap=()=>{
    document.getElementById('keyBindRes').innerHTML = this.kmb.getKeyDivInfo();
  }

  getHtmlAfterLoad = () =>{
    cl(`${this.getName} - getHtmlAfterLoad()`);

    this.kmb = new vyKeyBinder( keyBind, keyMap1, 
      (onKeyShort)=>{
        console.log(`GotKeyShortcut\n`,onKeyShort);
      }, 
      true 
    );
    this.kmb.init();
    
   
  }

  get svgDyno(){
    return '';
  }

  svgDynoAfterLoad(){

  }


  
  onMessageCallBack = ( r ) => {
    cl( `${this.getName} [cb] - got msg `);

  }
  

}

export { s_vyskeyMapsPage };

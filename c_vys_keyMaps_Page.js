import { vyKeyBinder } from "./libs/keyBinder";
import { keyBind, keyMap1 } from "./libs/keyMapBinds1";



class s_vyskeyMapsPage{

  constructor(){
  }
  
  get getName(){
    return `KeyMaps bindings`;
  }
    
  
  get getDefaultBackgroundColor(){
    return "#ffffff";
  }
  
  getHtml = () => {

    return `<b>${this.getName}</b><br>
    <img src="${this.homeUrl}assets/ico_viteyss_32.png"><br>
    This is a npm package<br>
    viteyss-site-keyMaps<br>
    <pre>
    In Menu: ${this.getName}
    Home url: ${this.homeUrl}
    Ver: ${this.instanceOf.ver}

    More ditails in \`./site.json\`
    </pre>
    

    <div style="width:200px;height:20px;background-color:gray;"
      id="keyBindTestNode">
      test area
    </div>
    press:<div id="keyBindPressNow">- - - </div>
    log:
    <small><div id="keyBindRes">- - -</div></small>

    `;

  }

  getHtmlAfterLoad = () =>{
    cl(`${this.getName} - getHtmlAfterLoad()`);

    let kmb = new vyKeyBinder( keyBind, keyMap1 );
    kmb.init();
    
   
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

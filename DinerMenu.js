
import keyBy from 'lodash';
var pedido=[];
var factura=[];
var importes=[];
var total=[];
var ticket=[];
var oferta=[];
var totalOferta=[];

var dinerMenu= [
  {code:'M1',name:'ClassicBurger  ',description:' Hamburguesa tradicional de ternera con patatas fritas ',price: '7$'},
  {code:'M2',name:'DinerBurger    ',description:'  Hamburguesa de ternera,bacon y huevo frito, con patatas fritas',price:'8$'},
  {code:'M3',name:'VeggiBurger    ',description:' Hamburguesa vegetal con patatas fritas ',price:'6$'},
  {code:'M4',name:'CeliBurger     ',description:' Hamburguesa sin gluten con patatas fritas ',price:'8$'},
  {code:'S1',name:'Onion rings     ',description:' Aros de cebolla rebozados',price:'4$'},
  {code:'S2',name:'Stuffed Jalapeños  ',description:' Jalapeños rellenos de queso',price:'5$'},
  {code:'S3',name:'Nachos Cheese/Guacamole  ',description:' Tortitas de maíz con salsa de queso o guacamole',price:'6$'},
];    
const codes=_.keyBy(dinerMenu,'code');

function verCarta(){
document.write( `
BOTTEGA DINER<br>
<br>
MAIN MENU:<br>
<br>
M1: Classic Burger----------------7$<br>
M2: Diner Burger------------------8$<br>
M3: Veggi Burger------------------6$<br>
M4: Celi Burger--------------------8$<br>
<br>
SIDES:<br>
<br>
S1: Onion rings-----------------------4$<br>
S2: Stuffed Jalapeños----------------5$<br>
S3: Nachos Cheese/Guacamole----6$<br>
<br>
OFERTA DEL MES: <br>
<br>
ELIGE UN MENU PRINCIPAL Y DOS ACOMPAÑAMIENTOS POR 10$!!!
<br>
<br>
<button id ="selectMenu" onclick="insertMenu()">Select Menu</button>
`);
};
verCarta();

selectMenu.onclick= function insertMenu(){
  
  var selectMenu= prompt('Insert a menu code');
 
    if (selectMenu===null){
      window.alert('Gracias por su visita');

    }else if (selectMenu in codes!=true){
      window.alert('Codigo erróneo');

    } else if ( selectMenu in codes===true){
    var selectMenuConfirm=window.confirm(`Añadir al pedido:
   ${codes[selectMenu].name}`);

    if(selectMenuConfirm===true){
      var menuSelected=(codes[selectMenu]);
      pedido.unshift(menuSelected);
      var lineSelected= ` ${pedido[0].name}  ==>${pedido[0].price}`;
      factura.push(lineSelected);
      var precio = pedido[0].price;
      var importe = Number(precio[0]);
      importes.push(importe);
      total.push(importes.reduce((a,b)=>a+b,0));
      oferta.push(pedido[0]);
      ticket.push(factura[factura.length-1]);
  
      if(pedido.length===1){
      verBotonPedido();
      } else if(pedido.length>=2&&selectMenu in codes===true){
      continuarPedido();
      };
    };
  };
  if(oferta.length===2){
    if(oferta[0].code[0]==="M"&&oferta[1].code[0]==="M"){
    oferta.pop(oferta[-1]); 
    };
  };
  if(oferta.length===3){
    if(oferta[0].code[0]==="M"&&oferta[1].code[0]==="S"&&oferta[2].code[0]==="M"){
      oferta.pop(oferta[-1]);
        
    } else if(oferta[0].code[0]==="M"&&oferta[1].code[0]==="S"&&oferta[2].code[0]==="S"){
      totalOferta.push(Number( oferta[0].price[0])+Number(oferta[1].price[0])+Number(oferta[2].price[0]));
        
    }else if(oferta[0].code[0]==="S"&&oferta[1].code[0]==="M"&&oferta[2].code[0]==="M"){
      oferta.pop(oferta[-1]);

    }else if(oferta[0].code[0]==="S"&&oferta[1].code[0]==="M"&&oferta[2].code[0]==="S"){
      totalOferta.push(Number( oferta[0].price[0])+Number(oferta[1].price[0])+Number(oferta[2].price[0]));
        
    }else if(oferta[0].code[0]==="S"&&oferta[1].code[0]==="S"&&oferta[2].code[0]==="M"){
      totalOferta.push(Number( oferta[0].price[0])+Number(oferta[1].price[0])+Number(oferta[2].price[0]));
     
    }else if(oferta[0].code[0]==="S"&&oferta[1].code[0]==="S"&&oferta[2].code[0]==="S"){
      oferta.pop(oferta[-1]);
    };
  };
};
  
function verBotonPedido(){
 
  var buttonPedido=document.createElement("button");
  buttonPedido.innerHTML="Pedido";
  document.body.appendChild(buttonPedido); 
  buttonPedido.setAttribute("id","Pedido");
  buttonPedido.setAttribute("onclick","verFactura()");


  Pedido.onclick=function verFactura(){
    
    var pedidoConfirm= window.confirm(`Su pedido:
  
    ${factura[factura.length-1]}
  
    TOTAL = ${total[total.length-1]} $
  
    Continuar pedido`);
  
    if(pedidoConfirm===false){
    
      window.alert(`Su pedido:
  
      ${factura[factura.length-1]}
        
      TOTAL =  ${total[total.length-1]} $`)
    
    };
  };
};

function continuarPedido(){

  ticket.unshift(`${ticket[0].concat(`  
    ${factura[factura.length-1]}`)
  }`);

  Pedido.onclick=function verFactura(){
    var continuarPedidoConfirm=window.confirm(`Su pedido:
    
    ${ticket[0]}
    
    TOTAL = ${total[total.length-1]} $
    
    Continuar pedido`);

    if(continuarPedidoConfirm===false&&oferta.length<3){
    window.alert(`Su pedido:
  
    ${ticket[0]}
  
    TOTAL = ${total[total.length-1]} $
  
    Pagar`);

    }else(window.alert(`Su pedido:
  
    ${ticket[0]}

    TOTAL = ${total[total.length-1]} $

    OFERTA DEL MES: 

    ELIGE UN MENU PRINCIPAL Y DOS ACOMPAÑAMIENTOS POR 10$!!!

    Pagar ${total[total.length-1]-totalOferta[0]+10} $`));
  };
};

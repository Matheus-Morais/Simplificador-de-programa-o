function Diagram(c) {
    this.ponto = [];
	//this.texto = texto;
	this.c = c;
	this.x= 10;
	this.y = 10;
    this.Rx = 10;
    this.Ry = 10;
    this.PPontos = [];
    this.Dpoligono = [];
    this.Dquadri = [];
    this.Dtriangulo = [];
    this.xx=Array(100, 200, 300, 450);
    this.yy=Array(100, 300, 300, 100);
    this.DCirc = [];
    this.ETexto = [];
    this.img; 
    this.Dlinhas = [];
    this.EspCaneta = 3;
    this.CorCaneta = "Black";
    this.TipoLinha = 0;
    this.Variaveis = Array();
    this.metodos = Array();
    this.Direcao = "leste";
}



function DesenharMarcas(xx,yy,ctx){
    var array = ["butters", "Kenny", "Kyle", "Stan"];
    for(var i=0; i<xx.length;i++){
        ctx.drawImage(document.getElementById(array[0]), xx[i], yy[i], 32, 32);
        var index = array.indexOf(array[0]);
        array.splice(index, 1);
    }
}

function DesenhaCartman(ctx,x,y,imagem,dir){  

    var img = document.getElementById("cartman");
    ctx.drawImage(img, x-12, y-12, 32, 32);  
}



function ParseError(message, hash) {
    _.extend(this, hash);

    this.name = "ParseError";
    this.message = (message || "");

    
}

ParseError.prototype = new Error();

Diagram.ParseError = ParseError;
Diagram.parse = function (input,c) {
    // Create the object to track state and deal with errors
    easy.yy = new Diagram(c);     

    easy.yy.parseError = function (message, hash) {  
      var  ctx = c.getContext("2d");

ctx.clearRect(0, 0,c.width ,c.height );      
    document.getElementById("saidaText").innerHTML = message;
    console.log(message);
        throw new ParseError(message, hash);
    };

    // Parse
    var diagram = easy.parse(input);

    // Then clean up the parseError key that a user won't care about
    delete diagram.parseError; 
 easy.yy.intepretador(diagram);  
    return diagram;
};



Diagram.prototype.intepretador = function(dados) {  
    console.log(dados);
    
    for(var x = 0 ;x<dados.sentencas.length; x++)
    {       
        if(dados.sentencas[x].name=="CMD_MARQUE_AQUI")
        { 
         easy.yy.marcar();         
        }else{
            if(dados.sentencas[x].name=="MOVER_PARA")
                { 
                    easy.yy.moverPara(dados.sentencas[x].params[0].value);
                 
                //    console.log(dados.sentencas[x].params[0].value);            
                }else{
                    if(dados.sentencas[x].name=="CMD_IRRITAR")
                    { 
                        easy.yy.irritar();            
                    }
                    else{
                          if(dados.sentencas[x].name=="CMD_DESENHE_LINHA")
                          { 
                                 easy.yy.desenharLinha(dados.sentencas[x].params[0].value);                 
                             //console.log(dados.sentencas[x].params[0].value);            
                          }else{
                              
                                if(dados.sentencas[x].name=="CMD_ESCREVA")
                                { 
                                       easy.yy.escrever(dados.sentencas[x].params[0]);                 
                                    //console.log(dados.sentencas[x].params[0]);            
                                }else
                                {
                                     if(dados.sentencas[x].name=="CMD_DESENHE_CIRC")
                                        { 
                                            easy.yy.desenharCirculo(dados.sentencas[x].params[0]);           
                                        }else{
                                            
                                             if(dados.sentencas[x].name=="CMD_MEMORIZE - CMD_MEMORIZE_EM")
                                                { 
                                                    easy.yy.memorizeVariavel(dados.sentencas[x].params[0],dados.sentencas[x].params[1]);           
                                                }else{

 if(dados.sentencas[x].name=="CMD_DESENHE_TRI")
{ 
   easy.yy.desenharTriangulo(dados.sentencas[x].params[0].value,
   dados.sentencas[x].params[1].value);           
}else
{
	if(dados.sentencas[x].name == "CMD_ESPESSURA_CA")
	{
		easy.yy.mudarEspessura(dados.sentencas[x].params[0]);
		
	}else
	{
		if(dados.sentencas[x].name == "CMD_ESTILO_CA")
		{
			easy.yy.mudarEstilo(dados.sentencas[x].params[0]);
		}else
		{
			if(dados.sentencas[x].name == "CMD_COR_CA")
			{
				easy.yy.mudarCor(dados.sentencas[x].params[0]);
			}else
			{
				if(dados.sentencas[x].name == "CMD_POLIGONO")
				{
                   
					easy.yy.desenharPoligono(dados.sentencas[x].params[0]);
						
				}else
				{
					if(dados.sentencas[x].name == "CMD_QUADRI")
					{
						easy.yy.desenharQuadri(dados.sentencas[x].params[0].value, dados.sentencas[x].params[1].value, dados.sentencas[x].params[2].value);
					}else
					{
						if(dados.sentencas[x].name == "CMD_SAIDA")
						{
							easy.yy.saida(dados.sentencas[x].params[0]);							
						}else
						{
							if(dados.sentencas[x].name == "CMD_MOV")
							{
								easy.yy.mudarDirecao(dados.sentencas[x].params[0]);
							}else
							{
								if(dados.sentencas[x].nome == "CMD_MARCA_AQUI")
								{
									dados.sentencas[x].val= easy.yy.marcaAqui(1);									
								}else
								{
									if(dados.sentencas[x].nome == "CMD_NMARCA_AQUI")	
									{										
										dados.sentencas[x].val= easy.yy.marcaAqui(2);										
									}else
									{
										if(dados.sentencas[x].nome == "CMD_MARCA_EM")
										{											
											dados.sentencas[x].val= easy.yy.marcaEm(1,dados.sentencas[x].params.value);										
										}else
										{
											if(dados.sentencas[x].nome == "CMD_NMARCA_EM")
											{											
												dados.sentencas[x].val= easy.yy.marcaEm(2,dados.sentencas[x].params.value);										
											}else
											{
                                                if(dados.sentencas[x].nodeType == "BLOCOS" || dados.sentencas[x].nodeType == "BLOCO")
                                                {
                                                        test2(dados.sentencas[x]);
                                                }else
                                                {
                                                      if(dados.sentencas[x].nodeType == "CONDICIONAL")
                                                        {   
                                                            console.log(dados.sentencas[x].params[0]);  
                                                              if(dados.sentencas[x].params[0]!= null)
                                                                {
                                                                test2(dados.sentencas[x].params[0]);
                                                                }
                                                        }else
                                                        {
                                                            if(dados.sentencas[x].name == "ENQUANTO")
                                                            {   
                                                                
                                                                for(var z = dados.sentencas[x].params[0].val; z < dados.sentencas[x].params[1].val;z++ )
                                                                {
                                                                        var y = Array();
                                                                        y.push(dados.sentencas[x].params[2]);
                                                                        var d = {sentencas : y};
                                                                        easy.yy.intepretador(d);
                                                                }
                                                            }else
                                                            {
                                                                 if(dados.sentencas[x].nodeType == "NOVO COMANDO")
                                                                { 
                                                                        var y = Array();
                                                                        y.push(dados.sentencas[x].params[1]);
                                                                        var d = {sentencas : y};
                                                                        var vari;
                                                                        vari = dados.sentencas[x].params[0].replace('"',"");
                                                                        vari = vari.replace('"',""); 
                                                                        this.metodos.push({nome:vari,valor:d});
                                                                       console.log(this.metodos);
                                                                }else
                                                                {
                                                                    if(dados.sentencas[x].nodeType == "EXECULTA COMANDO")
                                                                    {
                                                                            var vari;
                                                                        vari = dados.sentencas[x].params[0].replace('"',"");
                                                                        vari = vari.replace('"',"");

                                                                        console.log(dados.sentencas[x]);
                                                                          this.metodos.forEach(c=>{
                                                                              if(c.nome==vari)
                                                                              {
                                                                                   easy.yy.intepretador(c.valor);
                                                                              }
                                                                          });
                                                                        }else
                                                                        {
                                                                            
                                                                        }
                                                                }
                                                            }
                                                        }
                                                }
												
											}
										}
									}
								}
							}								
						}					
					}				
				}
				
			}
		}
	}
	
}
                                                }
                                        }                                    
                                }
                          }                    
                        }
                    }
            }
    }
    
}

function test2(dad)
{  
     if(dad.value != null)
    {
        if(dad.value.length == 1)
        {
                //console.log(dad);
                var y = Array();
                y.push(dad.value[0].comandos);
                var d = {sentencas : y};
                easy.yy.intepretador(d);
        }else{
            // console.log(dad);
                var y = Array();
                y.push(dad.value[0].comandos);
                var d = {sentencas : y};
                easy.yy.intepretador(d);
                test2(dad.value[1]);

        }
    }else{
          var y = Array();
                y.push(dad);
                var d = {sentencas : y};
                  easy.yy.intepretador(d);
    }

}

Diagram.prototype.moverPara = function(ponto) {
       this.img = 1;
      easy.yy.Ponto(ponto[0].val,ponto[1].val);
       this.desenharFormas();
}

Diagram.prototype.desenharLinha = function(ponto) {
    easy.yy.Ponto(ponto[0],ponto[1]);
 this.Dlinhas.push([this.Rx,this.Ry,ponto[0].val,ponto[1].val]);
 this.desenharFormas();
}


Diagram.prototype.escrever = function(texto) {

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
texto = texto.replace('"',"");

this.ETexto.push([texto.replace('"',""),this.x,this.y]);
 this.img="";
   this.desenharFormas();
}


Diagram.prototype.desenharFormas = function() {
    var ctx = this.c.getContext("2d");
    ctx.clearRect(0, 0,this.c.width ,this.c.height );
    if(this.TipoLinha == 1)
    {
         var dashList = [5, 5, 5, 5];
         ctx.setLineDash(dashList);
    }else{

         var dashList = [0, 0, 0, 0];
         ctx.setLineDash(dashList);
    }

  
    $("#saidaText").html("");


    DesenharMarcas(this.xx,this.yy,ctx);

    DesenhaCartman(ctx,this.x,this.y,this.img,this.Direcao); 
    
}

Diagram.prototype.irritar = function() {


    this.img = 3;

 for(var i=0; i<this.xx.length;i++)
   {
		if(this.xx[i]==this.x && this.yy[i]==this.y)
		{
			this.xx.splice(i,1);
            this.yy.splice(i,1);
		}
      
   }

   this.desenharFormas();
   
   
}

Diagram.prototype.marcar = function() {
this.img = 2;
this.desenharFormas();
this.xx.push(this.x);
    this.yy.push(this.y);
    
}

Diagram.prototype.Ponto = function(x, y) {

this.Rx = this.x;
this.Ry = this.y;
this.x = x;
this.y = y;

    return [x, y];
}


Diagram.prototype.Ponto2 = function(x, y) {
	
    
    return [x, y];
}


Diagram.prototype.Ponto3 = function(x, y) {
if(this.PPontos.length==0)
{

this.PPontos.push([this.x,this.y]);
this.PPontos.push([x,y]);

}else
{
this.PPontos.push([x,y]);
}
	
    return [x, y];
}

Diagram.prototype.saida = function(valor) {
 valor = valor.replace('"',"");
    valor = valor.replace('"',"");

   $("#saidaText").html(valor);

}

  $("#saidaText").html("Cor da caneta alterada para: "+ this.CorCaneta);



Diagram.prototype.Logica = function(x) {
    $("#saidaText").html(x);   
}
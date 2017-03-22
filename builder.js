class Director{
	constructor(builder){
		this.builder=builder;
		this.elementos=null;
	}

	procesar(){
		this.leerConfig();
		this.iniBuilder();
		this.crearLaberinto();
		this.construirJuego();
	}

	leerConfig(){		
		//this.elementos=	JSON.parse(cadena);	
		this.elementos=objeto;
	}
	iniBuilder(){
		if(this.elementos.forma=="rectangulo")
			this.builder=new LaberintoRectanguloBuilder();
	}
	crearLaberinto(){
		this.builder.construirLaberinto();
		let el=this.elementos.laberinto;
		for(var i=0;i<el.length;i++)
			this.crearLaberintoRecursivo(el[i],'root');
		let pt=this.elementos.puertas;	
		for(var i=0;i<pt.length;i++)
			this.builder.construirPuerta(pt[i][0],pt[i][1],pt[i][2],pt[i][3]);
	}
	crearLaberintoRecursivo(elemento,padre){
		let con=null;
		if(elemento.tipo=='habitacion')
			con=this.builder.construirHabitacion();
		if(elemento.tipo=='armario')
			con=this.builder.construirArmario(padre);
		if (elemento.em=="contenedor")
			for(var i=0;i<elemento.hijos.length;i++){
				let hijo=elemento.hijos[i];
				this.crearLaberintoRecursivo(hijo,con);
			}
	}
	construirJuego(){
		this.builder.construirJuego();
	}
}

class LaberintoBuilder{
	constructor(){
		this.juego=null;
		this.laberinto=null;
		this.orientaciones={};
	}
	construirJuego(){
		this.juego=new JuegoLaberinto();
		this.juego.laberinto=this.laberinto;
	}
	construirArmario(contenedor){
		let num=contenedor.hijos.length;
		let armario=new Armario(num);
		armario.forma=this.crearForma();
		contenedor.agregarElemento(armario);
		return armario;
	}
	construirPared(){
		return new Pared();
	}
	construirForma(){}
}

class LaberintoRectanguloBuilder extends LaberintoBuilder{
	constructor(){
		super();
		this.orientaciones={'Norte':new Norte(),'Este':new Este(),'Sur':new Sur(),'Oeste':new Oeste()};
	}
	construirLaberinto(){
		this.laberinto=new Laberinto();
	}
	crearForma(){
		let forma= new Cuadrado();
		forma.agregarOrientacion(this.orientaciones["Norte"]);
		forma.agregarOrientacion(this.orientaciones["Este"]);
		forma.agregarOrientacion(this.orientaciones["Sur"]);
		forma.agregarOrientacion(this.orientaciones["Oeste"]);
		return forma;
	}
	construirHabitacion(){
		let num=this.laberinto.habitaciones.length;
		let hab=new Habitacion(num);
		hab.forma=this.crearForma();
		hab.ponerElemento(this.construirPared(),this.orientaciones['Norte']);
		hab.ponerElemento(this.construirPared(),this.orientaciones['Sur']);
		hab.ponerElemento(this.construirPared(),this.orientaciones['Este']);
		hab.ponerElemento(this.construirPared(),this.orientaciones['Oeste']);
		this.laberinto.agregarHabitacion(hab);
		return hab;
	}
	construirPuerta(numHab1,or1,numHab2,or2){
		let puerta=new Puerta();		
		let hab1=this.laberinto.obtenerHabitacion(numHab1);
		let hab2=this.laberinto.obtenerHabitacion(numHab2);
		puerta.lado1=hab1;
		puerta.lado2=hab2;
		hab1.ponerElemento(puerta,this.orientaciones[or1]);
		hab2.ponerElemento(puerta,this.orientaciones[or2]);
	}
}



//La configuración del laberinto se obtendrá mediante un archivo local
var objeto={"forma":"rectangulo",
"puertas":[[0,"Norte",1,"Sur"],[0,"Este",2,"Oeste"],[1,"Este",3,"Oeste"],[2,"Norte",3,"Sur"]
	],
"laberinto":[
	{"em":"contenedor","tipo":"habitacion","hijos":[
		{"em":"contenedor","tipo":"armario","hijos":[]}
	]},
	{"em":"contenedor","tipo":"habitacion","hijos":[]},
	{"em":"contenedor","tipo":"habitacion","hijos":[
		{"em":"hoja","tipo":"bomba"}
		]},
	{"em":"contenedor","tipo":"habitacion","hijos":[]}
	],
"bichos":[["agresivo",0]]
};
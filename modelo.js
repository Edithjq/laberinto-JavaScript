class JuegoLaberinto{
	constructor(){
		this.laberinto=null;
		this.bichos=[];
	}

	agregarLaberinto(laberinto){
		this.laberinto=laberinto;
	}

	agregarBicho(bicho){
		this.bichos.push(bicho);
	}
}

class Laberinto{
	constructor(){
		this.habitaciones=[];
	}
	agregarHabitacion(habitacion){
		this.habitaciones.push(habitacion);
	}
	obtenerHabitacion(num){
		let hab=null;
		for(var i=0;i<this.habitaciones.length;i++){
			if (this.habitaciones[i].id==num)
				hab=this.habitaciones[i];
		}
		return hab;
	}
}

class ElementoMapa{
	constructor(){
	}

}
class Contenedor extends ElementoMapa{
	constructor(){
		super();
		this.hijos=[];
		this.id=null;
		this.forma=null;
	}
	agregarElemento(el){
		this.hijos.push(el);
	}
	ponerElemento(unEM,unaOr){
		this.forma.ponerElemento(unEM,unaOr);
	}
}

class Hoja extends ElementoMapa{
	constructor(){
		super();
	}
}

class Pared extends Hoja{
	constructor(){
		super();
	}
}

class Puerta extends Hoja{
	constructor(){
		super();
		this.lado1=null;
		this.lado2=null;
		this.abierta=false;
	}
}

class Habitacion extends Contenedor{
	constructor(num){
		super();
		this.id=num;
	}
}

class Armario extends Contenedor{
	constructor(num){
		super();
		this.id=num;
	}
}

class Forma{
	constructor(){
		this.orientaciones=[];
	}
	agregarOrientacion(or){
		this.orientaciones.push(or);
	}
	ponerElemento(unEM,unaOr){
		unaOr.ponerElemento(unEM,this);
	}
}

class Cuadrado extends Forma{
	constructor(){
		super();
		this.norte=null;
		this.sur=null;
		this.este=null;
		this.oeste=null;
	}
}

class Bicho{
	constructor(estrategia,posicion){
		this.estrategia=estrategia;
		this.posicion=posicion;
	}
	irAlEste(){
		this.posicion.irAlEste(this);
	}
}

class Orientacion{
	constructor(){
	}
	camina(alguien){}
	ponerElemento(unEM,unaForma){}
}

class Norte extends Orientacion{
	constructor(){
		super();
	}
	camina(alguien){
		alguien.irAlNorte();
	}
	ponerElemento(unEM,unaForma){
		unaForma.norte=unEM;
	}
}

class Sur extends Orientacion{
	constructor(){
		super();
	}
	camina(alguien){
		alguien.irAlSur();
	}
	ponerElemento(unEM,unaForma){
		unaForma.sur=unEM;
	}
}

class Este extends Orientacion{
	constructor(){
		super();
	}
	camina(alguien){
		alguien.irAlEste();
	}
	ponerElemento(unEM,unaForma){
		unaForma.este=unEM;
	}
}

class Oeste extends Orientacion{
	constructor(){
		super();
	}
	camina(alguien){
		alguien.irAlOeste();
	}
	ponerElemento(unEM,unaForma){
		unaForma.oeste=unEM;
	}
}
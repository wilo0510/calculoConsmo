document.getElementById('PeticionUsuario').addEventListener('submit',almacenarUsuario);
let usuario1;
let usuario2;
let btnLimpiar=document.getElementById('btnLimpiar');
btnLimpiar.disabled=true;
function almacenarUsuario(e){
    var camposValidos=false;
    
    var btnContinuar=document.getElementById('btnContinuar');
    usuario1=document.getElementById('nombreUsuario1').value;
    usuario2=document.getElementById('nombreUsuario2').value;
    if(typeof(usuario1)==='string' && usuario1!='' && typeof(usuario2)==='string' && usuario2!=''){
        btnContinuar.disabled=true;
        let formulario=document.getElementById('peticionDatos');
        formulario.innerHTML='';
        formulario.innerHTML+=`
        <form id="CalculoServicios" class="mt-4">
            <label for="CalculoServicios" class="h2">Datos de la factura</label>
            <div class="form-group">
                <input type="number" step="any" id="ValorRecibo" placeholder="Ingrese valor del recibo" class="form-control">
            </div>
            <div class="form-group">
                <input type="number" step="any" id="KilowatsTotales" placeholder="Ingrese el total de Kw" class="form-control">
            </div>
            <div class="form-group">
                <input type="number" step="any" id="KilowatsMespasado" placeholder="Ingrese kw del mes pasado" class="form-control">
            </div>
            <div class="form-group">
                <input type="number" step="any" id="KilowatsMespresente" placeholder="Ingrese kw de este mes" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary btn-block" id="btnCalcular">Calcular Valores</button>
            
        </form>
        `;
        document.getElementById('CalculoServicios').addEventListener('submit',calcularConsumo);
    }
    else{
        alert("Por favor ingrese todos los campos antes de continuar")
    }
    
    e.preventDefault();
}

function calcularConsumo(e){

    
    let valorRecibo=document.getElementById('ValorRecibo').value;
    let kwTotales=document.getElementById('KilowatsTotales').value;
    let kwInicial=document.getElementById('KilowatsMespasado').value;
    let kwFinal=document.getElementById('KilowatsMespresente').value;
    
    if(valorRecibo>0 && kwTotales>0 && kwInicial>0 && kwFinal>0)
    {
        if(kwInicial>kwFinal){
            alert("El consumo actual debe ser mayor o igual al del mes pasado")
        }
        else{
            let kwUsuario1=kwFinal-kwInicial;
            let kwUsuario2=kwTotales-kwUsuario1;
            let valorKw=valorRecibo/kwTotales;
            let valorUsuario1=valorKw*kwUsuario1;
            let valorUsuario2=valorKw*kwUsuario2;
            let btnCalcular=document.getElementById('btnCalcular'); 
            btnCalcular.disabled=true;
    
            let visualizacion=document.getElementById('resultados');
            visualizacion.innerHTML='';
            visualizacion.innerHTML+=`
            <div class="card mb-3">
                <div class="card-body">
                    <h1>Valor de cada KW</h1>
                    <h2> ${valorKw}</h2>
                    <h1>Kw consumidos por ${usuario1}</h1>
                    <h2> ${kwUsuario1}</h2>
                    <h4>Valor de luz correspondiente a ${usuario1} para este mes es de ${valorUsuario1} pesos</h4>
                    <h1>Kw consumidos por ${usuario2}</h1>
                    <h2> ${kwUsuario2}</h2>
                    <h4>Valor de luz correspondiente a ${usuario2} para este mes es de ${valorUsuario2} pesos</h4>
                    
    
                </div>
            </div>`;
            btnLimpiar.disabled=false;
            document.getElementById('btnLimpiar').addEventListener('click',limpiarTodo);
            e.preventDefault();
        }
        
       
    }
    else{
        alert("Alguno de los datos ingresados es incorrecto")
    }

    
    
}
function limpiarTodo(){
   // location.reload();
    
}

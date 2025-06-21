# modelo_entrenado_subido


creamos un archivo html para la pagina web.

cargamos la libreria tensorflow para que podamos usar el navegador, junto a eso pongo un STYLE para darle un poco de diseño a la web.

en el body que es el contenido de la pagina, ponemos el titulo, el canavas parampoder dibujar, los botonoes para ejecutar la prediccion, el boton para borrar la predicicon.

mas abajo pongo el script, para poner unir mi codigo html y css con el js.



ahora vamos al lado de script, osea el cdogio js


primero cargamos el modelo con la ruta del archivo que  descargamos en colab, ('modelo_tfjs_letras/model.json')   

unas puesto la ruta de json, iniciamos canvas para poder dibujar, le indicamos las lineas para poder arratar con el maus, despues creamos una funcion para poner borrar, osea le damos la opcion el boton de eliminar al codigo html(limpiar)

(function predeci)  en esta funcion es donde el canvas toma lo que dibujaste y lo prepara como modelo, el odelo que toma lo examina para predecir lo que dibujaste, el modelo toma una clase com mayor probabilidad de prediccion y eso lo muestra en la pantalla, 

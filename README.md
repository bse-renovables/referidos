# bse-referidos

Landing del programa de referidos de BSE, servida como pagina estatica.

- index.html: la pagina. Se abre con ?ref=CODIGO; sin codigo funciona como enlace generico.
- _fuente/construir.py: regenera index.html a partir de la landing exportada desde Apps Script (funcion exportarLanding) + _fuente/app.js.
- El formulario escribe en la hoja BSE · Referidos llamando al endpoint de Apps Script (doPost). La atribucion viaja en el campo c.

Motivo del cambio: la URL de script.google.com se enruta por cuenta de Google (/u/N/) y fallaba a usuarios con varias sesiones abiertas.

El script que regenera index.html vive solo en el Mac de Raul (no se publica porque lleva rutas locales).

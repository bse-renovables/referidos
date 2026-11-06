(function(){
  var LANDING = "https://bse-renovables.github.io/referidos/recomienda/";
  var frm = document.getElementById("frm");
  var pie = document.getElementById("pie");

  var p = {};
  try { p = Object.fromEntries((new URL(location.href)).searchParams); } catch(e) { p = {}; }
  var marca = String(p.v || "").trim().toUpperCase();
  var comercial = String(p.c || "").trim();

  function enlace(){
    return marca ? (LANDING + "?v=" + encodeURIComponent(marca)) : LANDING;
  }

  function mensaje(nombre){
    var pila = String(nombre || "").trim().split(" ")[0];
    var quien = comercial ? (", soy " + comercial + ", de BSE Renovables") : ", te escribo de BSE Renovables";
    return (pila ? ("Hola " + pila) : "Hola") + quien + ".\n\n" +
      "Si nos pasas el contacto de alguien que esté pensando en placas solares o aerotermia y acaba haciéndose la instalación, te llevas 150 € en tarjeta regalo de Amazon. Y a esa persona le hacemos 100 € de descuento.\n\n" +
      "El bono sube con cada persona que nos traigas, hasta 1.000 € al año.\n\n" +
      "Aquí lo tienes explicado, con el formulario para pasarnos el contacto:\n" + enlace();
  }

  function telefono(v){
    var s = String(v || "").replace(/[^0-9]/g, "");
    if (s.length === 9) s = "34" + s;
    if (s.indexOf("0034") === 0) s = s.slice(2);
    return s;
  }

  var tocado = false;
  frm.elements["m"].value = mensaje("");
  frm.elements["m"].addEventListener("input", function(){ tocado = true; });
  frm.elements["n"].addEventListener("input", function(){
    if (!tocado) frm.elements["m"].value = mensaje(frm.elements["n"].value);
  });

  pie.innerHTML = marca
    ? 'El enlace lleva tu marca <span class="marca">' + marca + '</span>, así sabemos que el contacto viene de ti.'
    : 'Este enlace no lleva marca de comercial. Pide el tuyo para que los contactos te cuenten a ti.';

  document.getElementById("ir").addEventListener("click", function(){
    var tel = telefono(frm.elements["t"].value);
    if (tel.length < 11) { alert("Repasa el teléfono: escríbelo con los 9 dígitos."); return; }
    var url = "https://wa.me/" + tel + "?text=" + encodeURIComponent(frm.elements["m"].value);
    window.open(url, "_blank");
  });

  document.getElementById("cop").addEventListener("click", function(){
    var b = document.getElementById("cop");
    var fin = function(ok){ b.textContent = ok ? "Mensaje copiado" : "Cópialo a mano"; setTimeout(function(){ b.textContent = "Copiar el mensaje"; }, 2500); };
    var txt = frm.elements["m"].value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function(){ fin(true); }).catch(function(){ fin(false); });
    } else {
      try { frm.elements["m"].select(); document.execCommand("copy"); fin(true); } catch(e) { fin(false); }
    }
  });
})();

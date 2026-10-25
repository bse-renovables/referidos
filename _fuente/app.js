(function(){
  var API = "https://script.google.com/macros/s/AKfycbwHFD9M5OT0B6RO3enJz9QMTSRl1b4OEPJCiqZ11AOsHBIscfVz_1qAhp2NbDJwckGahg/exec";
  var K = "bse-ref-kL7vQx2mB9";
  var frm = document.getElementById("frm");
  var zona = document.getElementById("zona");
  var ref = "";
  try { ref = (new URL(location.href)).searchParams.get("ref") || ""; } catch(e) { ref = ""; }
  ref = String(ref).trim().toUpperCase();
  if (frm.elements["c"]) frm.elements["c"].value = ref;

  function ocultar(el){ if(el) el.style.display = "none"; }

  function personalizar(nombre){
    var H = document.querySelector("h1");
    if (H) {
      var g = document.createElement("p");
      g.style.cssText = "margin:0 0 10px;font-size:15px;font-weight:700";
      g.textContent = "Hola, " + nombre + ". Este es tu enlace personal.";
      H.parentNode.insertBefore(g, H);
    }
    ["n","e","t"].forEach(function(k){
      var el = frm.elements[k];
      if (!el) return;
      el.required = false;
      if (k === "n") el.value = nombre;
      var lab = el.previousElementSibling;
      if (lab && lab.tagName === "LABEL") ocultar(lab);
      ocultar(el);
    });
    ocultar(document.getElementById("sec1"));
    ocultar(document.getElementById("sec2"));
    var h = document.getElementById("f");
    if (h) h.textContent = "¿Quién está interesado?";
    var mapa = {
      "Su nombre y apellidos": "Nombre y apellidos",
      "Su teléfono": "Teléfono",
      "Su dirección": "Dirección",
      "¿Qué le puede interesar?": "¿Qué le interesa?"
    };
    Array.prototype.forEach.call(document.querySelectorAll("label"), function(l){
      var t = l.textContent;
      if (mapa[t]) l.textContent = mapa[t];
    });
  }

  if (ref) {
    fetch(API + "?api=cliente&k=" + encodeURIComponent(K) + "&ref=" + encodeURIComponent(ref))
      .then(function(r){ return r.json(); })
      .then(function(j){ if (j && j.ok && j.n) personalizar(j.n); })
      .catch(function(){});
  }

  function hecho(){
    zona.innerHTML = '<div class="ok"><b>Recibido, gracias</b><span>Lo comprobamos y te confirmamos. Si cuenta, nos ponemos en contacto con esa persona.</span></div>';
  }

  frm.addEventListener("submit", function(ev){
    ev.preventDefault();
    var b = frm.querySelector("button");
    b.disabled = true;
    b.textContent = "Enviando…";
    var d = {};
    ["n","e","t","rn","rt","rc","i","s","c"].forEach(function(k){
      d[k] = frm.elements[k] ? frm.elements[k].value : "";
    });
    d.k = K;
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(d)
    })
    .then(function(r){ return r.json(); })
    .then(function(j){
      if (j && j.ok) { hecho(); }
      else { throw new Error("respuesta no ok"); }
    })
    .catch(function(){
      b.disabled = false;
      b.textContent = "Enviar recomendación";
      alert("No se ha podido enviar. Inténtalo de nuevo en un momento.");
    });
  });
})();

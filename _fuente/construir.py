import re, os

ORIG = "/Users/raulalcazarromero/Library/CloudStorage/GoogleDrive-r.alcazar@bserenovables.com/Mi unidad/landing_base.html"
DEST_DIR = "/Users/raulalcazarromero/bse-ref-build/sitio"
os.makedirs(DEST_DIR, exist_ok=True)

s = open(ORIG, encoding="utf-8").read()

i = s.find("<script>")
j = s.find("</script>", i)
assert i > 0 and j > i, "no se encuentra el script original"
cabeza = s[:i]
cola = s[j + len("</script>"):]

nuevo = open("/Users/raulalcazarromero/bse-ref-build/app.js", encoding="utf-8").read()

salida = cabeza + "<script>\n" + nuevo + "\n</script>" + cola
open(os.path.join(DEST_DIR, "index.html"), "w", encoding="utf-8").write(salida)
print("ESCRITO", os.path.join(DEST_DIR, "index.html"), len(salida))
print("QUEDA google.script.run:", "google.script.run" in salida)

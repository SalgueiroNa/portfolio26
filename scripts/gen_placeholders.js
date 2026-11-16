const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assets = path.join(root, "assets");

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function scene(width, height, base, accent, eyebrow, title, filePath, motif) {
  const bandH = Math.max(92, Math.round(height * 0.16));
  const bandY = height - bandH;
  const titleSize = Math.max(28, Math.round(width / 28));
  const subSize = Math.max(14, Math.round(width / 62));
  const pathSize = Math.max(12, Math.round(width / 78));
  const shapes = {
    circle: `<circle cx="${(width * 0.78).toFixed(0)}" cy="${(height * 0.3).toFixed(0)}" r="${(Math.min(width, height) * 0.18).toFixed(0)}" fill="${accent}"/><circle cx="${(width * 0.2).toFixed(0)}" cy="${(height * 0.22).toFixed(0)}" r="${(Math.min(width, height) * 0.05).toFixed(0)}" fill="#1B1915"/>`,
    panel: `<rect x="${(width * 0.58).toFixed(0)}" y="${(height * 0.1).toFixed(0)}" width="${(width * 0.3).toFixed(0)}" height="${(height * 0.42).toFixed(0)}" rx="28" fill="${accent}"/><rect x="${(width * 0.1).toFixed(0)}" y="${(height * 0.18).toFixed(0)}" width="${(width * 0.28).toFixed(0)}" height="18" rx="9" fill="#1B1915" fill-opacity="0.18"/><rect x="${(width * 0.1).toFixed(0)}" y="${(height * 0.25).toFixed(0)}" width="${(width * 0.2).toFixed(0)}" height="18" rx="9" fill="#1B1915" fill-opacity="0.1"/>`,
    spine: `<rect x="0" y="0" width="${(width * 0.045).toFixed(0)}" height="${height}" fill="${accent}"/><rect x="${(width * 0.62).toFixed(0)}" y="${(height * 0.16).toFixed(0)}" width="${(width * 0.22).toFixed(0)}" height="${(height * 0.28).toFixed(0)}" fill="#1B1915"/>`,
    bars: `<rect x="${(width * 0.68).toFixed(0)}" y="${(height * 0.14).toFixed(0)}" width="${Math.max(16, width * 0.035).toFixed(0)}" height="${(height * 0.46).toFixed(0)}" fill="${accent}"/><rect x="${(width * 0.76).toFixed(0)}" y="${(height * 0.24).toFixed(0)}" width="${Math.max(16, width * 0.035).toFixed(0)}" height="${(height * 0.36).toFixed(0)}" fill="#1B1915"/><rect x="${(width * 0.84).toFixed(0)}" y="${(height * 0.18).toFixed(0)}" width="${Math.max(16, width * 0.035).toFixed(0)}" height="${(height * 0.42).toFixed(0)}" fill="#1B1915" fill-opacity="0.35"/>`,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${xml(title)}">
  <rect width="${width}" height="${height}" fill="${base}"/>
  ${shapes[motif] || shapes.circle}
  <rect x="0" y="${bandY}" width="${width}" height="${bandH}" fill="#FBF8F3"/>
  <text x="40" y="${bandY + Math.round(bandH * 0.34)}" fill="#746C62" font-family="Georgia, serif" font-size="${subSize}" letter-spacing="2">${xml(eyebrow.toUpperCase())}</text>
  <text x="40" y="${bandY + Math.round(bandH * 0.62)}" fill="#1B1915" font-family="Georgia, serif" font-size="${titleSize}">${xml(title)}</text>
  <text x="40" y="${bandY + Math.round(bandH * 0.84)}" fill="#8A8278" font-family="Arial, Helvetica, sans-serif" font-size="${pathSize}">${xml(filePath)}</text>
</svg>
`;
}

function toolMark(letters, fill) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" role="img">
  <rect width="64" height="64" rx="16" fill="${fill}"/>
  <text x="32" y="40" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#1B1915">${xml(letters)}</text>
</svg>
`;
}

const projects = {
  nido: ["#E9D7CC", "#C65A32", "circle", "Nido"],
  lumen: ["#E7E1D2", "#C9A15B", "panel", "Lumen"],
  cauce: ["#D5E2DB", "#3E5348", "spine", "Cauce"],
  oficio: ["#E4DDD4", "#1B1915", "bars", "Oficio"],
};

const stages = [
  ["problema", "Problema"],
  ["rol", "Mi rol"],
  ["proceso", "Proceso"],
  ["solucion", "Solución"],
  ["resultados", "Resultados"],
];

for (const [slug, [base, accent, motif, name]] of Object.entries(projects)) {
  const folder = `assets/proyectos/${slug}`;
  write(
    path.join(assets, "proyectos", slug, "cover.svg"),
    scene(1600, 1000, base, accent, "Portada", name, `${folder}/cover.svg`, motif)
  );
  write(
    path.join(assets, "proyectos", slug, "card.svg"),
    scene(900, 1125, base, accent, "Carrusel", name, `${folder}/card.svg`, motif)
  );
  for (const [key, label] of stages) {
    for (const index of [1, 2]) {
      const filename = `${key}-${index}.svg`;
      write(
        path.join(assets, "proyectos", slug, filename),
        scene(
          1200,
          900,
          base,
          accent,
          label,
          `${name} · imagen ${index}`,
          `${folder}/${filename}`,
          index === 1 ? motif : "panel"
        )
      );
    }
  }
}

write(
  path.join(assets, "hero.svg"),
  scene(1400, 1680, "#E9D7CC", "#C65A32", "Portada", "Tu foto o pieza", "assets/hero.svg", "circle")
);
write(
  path.join(assets, "retrato.svg"),
  scene(1000, 1240, "#D5E2DB", "#3E5348", "Sobre mí", "Tu retrato", "assets/retrato.svg", "spine")
);
write(
  path.join(assets, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#1B1915"/>
  <circle cx="16" cy="16" r="6" fill="#C65A32"/>
</svg>
`
);

const tools = [
  ["figma", "Fg", "#F3D6CC"],
  ["figjam", "Fj", "#F6E2C4"],
  ["photoshop", "Ps", "#D9E4F2"],
  ["illustrator", "Ai", "#F6D9B8"],
  ["after-effects", "Ae", "#E4D4F0"],
  ["blender", "Bl", "#D5E2DB"],
  ["protopie", "Pp", "#F3D6CC"],
  ["maze", "Mz", "#E7E1D2"],
  ["notion", "No", "#ECE7DF"],
  ["miro", "Mi", "#F8DCC8"],
];

for (const [slug, letters, fill] of tools) {
  write(path.join(assets, "herramientas", `${slug}.svg`), toolMark(letters, fill));
}

function buildPdf() {
  const lines = [
    [22, "Curriculum vitae"],
    [12, "Archivo de ejemplo para el portfolio."],
    [12, "Reemplaza assets/cv.pdf por tu curriculum."],
    [12, "El boton Descargar CV usa este archivo."],
  ];
  const commands = ["BT"];
  lines.forEach(([size, text], index) => {
    const safe = text.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
    if (index === 0) {
      commands.push(`/F1 ${size} Tf`, "48 760 Td", `(${safe}) Tj`);
    } else {
      commands.push(`/F1 ${size} Tf`, "0 -32 Td", `(${safe}) Tj`);
    }
  });
  commands.push("ET");
  const stream = Buffer.from(commands.join("\n"), "latin1");
  const objects = [
    Buffer.from("<< /Type /Catalog /Pages 2 0 R >>"),
    Buffer.from("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
    Buffer.from(
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>"
    ),
    Buffer.concat([
      Buffer.from(`<< /Length ${stream.length} >>\nstream\n`),
      stream,
      Buffer.from("\nendstream"),
    ]),
    Buffer.from("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
  ];

  const chunks = [Buffer.from("%PDF-1.4\n")];
  const offsets = [0];
  objects.forEach((obj, index) => {
    offsets.push(Buffer.concat(chunks).length);
    chunks.push(Buffer.from(`${index + 1} 0 obj\n`), obj, Buffer.from("\nendobj\n"));
  });
  const body = Buffer.concat(chunks);
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    xref += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${body.length}\n%%EOF\n`;
  fs.writeFileSync(path.join(assets, "cv.pdf"), Buffer.concat([body, Buffer.from(xref + trailer)]));
}

buildPdf();
console.log("placeholders listos");

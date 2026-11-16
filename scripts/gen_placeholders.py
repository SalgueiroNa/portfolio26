# -*- coding: utf-8 -*-
"""Genera SVG de marcador y un PDF de CV de ejemplo."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def xml(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def scene(width, height, base, accent, eyebrow, title, path, motif) -> str:
    band_h = max(92, int(height * 0.16))
    band_y = height - band_h
    title_size = max(28, int(width / 28))
    sub_size = max(14, int(width / 62))
    path_size = max(12, int(width / 78))
    shapes = {
        "circle": (
            f'<circle cx="{width * 0.78:.0f}" cy="{height * 0.30:.0f}" '
            f'r="{min(width, height) * 0.18:.0f}" fill="{accent}"/>'
            f'<circle cx="{width * 0.20:.0f}" cy="{height * 0.22:.0f}" '
            f'r="{min(width, height) * 0.05:.0f}" fill="#1B1915"/>'
        ),
        "panel": (
            f'<rect x="{width * 0.58:.0f}" y="{height * 0.10:.0f}" '
            f'width="{width * 0.30:.0f}" height="{height * 0.42:.0f}" rx="28" fill="{accent}"/>'
            f'<rect x="{width * 0.10:.0f}" y="{height * 0.18:.0f}" '
            f'width="{width * 0.28:.0f}" height="18" rx="9" fill="#1B1915" fill-opacity="0.18"/>'
            f'<rect x="{width * 0.10:.0f}" y="{height * 0.25:.0f}" '
            f'width="{width * 0.20:.0f}" height="18" rx="9" fill="#1B1915" fill-opacity="0.10"/>'
        ),
        "spine": (
            f'<rect x="0" y="0" width="{width * 0.045:.0f}" height="{height}" fill="{accent}"/>'
            f'<rect x="{width * 0.62:.0f}" y="{height * 0.16:.0f}" '
            f'width="{width * 0.22:.0f}" height="{height * 0.28:.0f}" fill="#1B1915"/>'
        ),
        "bars": (
            f'<rect x="{width * 0.68:.0f}" y="{height * 0.14:.0f}" width="{max(16, width * 0.035):.0f}" '
            f'height="{height * 0.46:.0f}" fill="{accent}"/>'
            f'<rect x="{width * 0.76:.0f}" y="{height * 0.24:.0f}" width="{max(16, width * 0.035):.0f}" '
            f'height="{height * 0.36:.0f}" fill="#1B1915"/>'
            f'<rect x="{width * 0.84:.0f}" y="{height * 0.18:.0f}" width="{max(16, width * 0.035):.0f}" '
            f'height="{height * 0.42:.0f}" fill="#1B1915" fill-opacity="0.35"/>'
        ),
    }
    motif_svg = shapes.get(motif, shapes["circle"])
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{xml(title)}">
  <rect width="{width}" height="{height}" fill="{base}"/>
  {motif_svg}
  <rect x="0" y="{band_y}" width="{width}" height="{band_h}" fill="#FBF8F3"/>
  <text x="40" y="{band_y + int(band_h * 0.34)}" fill="#746C62" font-family="Georgia, serif" font-size="{sub_size}" letter-spacing="2">{xml(eyebrow.upper())}</text>
  <text x="40" y="{band_y + int(band_h * 0.62)}" fill="#1B1915" font-family="Georgia, serif" font-size="{title_size}">{xml(title)}</text>
  <text x="40" y="{band_y + int(band_h * 0.84)}" fill="#8A8278" font-family="Arial, Helvetica, sans-serif" font-size="{path_size}">{xml(path)}</text>
</svg>
'''


def tool_mark(letters: str, fill: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 64 64" role="img">
  <rect width="64" height="64" rx="16" fill="{fill}"/>
  <text x="32" y="40" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#1B1915">{xml(letters)}</text>
</svg>
'''


PROJECTS = {
    "nido": ("#E9D7CC", "#C65A32", "circle"),
    "lumen": ("#E7E1D2", "#C9A15B", "panel"),
    "cauce": ("#D5E2DB", "#3E5348", "spine"),
    "oficio": ("#E4DDD4", "#1B1915", "bars"),
}

STAGES = [
    ("problema", "Problema"),
    ("rol", "Mi rol"),
    ("proceso", "Proceso"),
    ("solucion", "Solución"),
    ("resultados", "Resultados"),
]

TITLES = {
    "nido": "Nido",
    "lumen": "Lumen",
    "cauce": "Cauce",
    "oficio": "Oficio",
}


def build_images() -> None:
    for slug, (base, accent, motif) in PROJECTS.items():
        name = TITLES[slug]
        folder = f"assets/proyectos/{slug}"
        write(
            ASSETS / "proyectos" / slug / "cover.svg",
            scene(1600, 1000, base, accent, "Portada", name, f"{folder}/cover.svg", motif),
        )
        write(
            ASSETS / "proyectos" / slug / "card.svg",
            scene(900, 1125, base, accent, "Carrusel", name, f"{folder}/card.svg", motif),
        )
        for key, label in STAGES:
            for index in (1, 2):
                filename = f"{key}-{index}.svg"
                write(
                    ASSETS / "proyectos" / slug / filename,
                    scene(
                        1200,
                        900,
                        base,
                        accent,
                        label,
                        f"{name} · imagen {index}",
                        f"{folder}/{filename}",
                        motif if index == 1 else "panel",
                    ),
                )

    write(
        ASSETS / "hero.svg",
        scene(
            1400,
            1680,
            "#E9D7CC",
            "#C65A32",
            "Portada",
            "Tu foto o pieza",
            "assets/hero.svg",
            "circle",
        ),
    )
    write(
        ASSETS / "retrato.svg",
        scene(
            1000,
            1240,
            "#D5E2DB",
            "#3E5348",
            "Sobre mí",
            "Tu retrato",
            "assets/retrato.svg",
            "spine",
        ),
    )
    write(
        ASSETS / "favicon.svg",
        '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#1B1915"/>
  <circle cx="16" cy="16" r="6" fill="#C65A32"/>
</svg>
''',
    )

    tools = [
        ("figma", "Fg", "#F3D6CC"),
        ("figjam", "Fj", "#F6E2C4"),
        ("photoshop", "Ps", "#D9E4F2"),
        ("illustrator", "Ai", "#F6D9B8"),
        ("after-effects", "Ae", "#E4D4F0"),
        ("blender", "Bl", "#D5E2DB"),
        ("protopie", "Pp", "#F3D6CC"),
        ("maze", "Mz", "#E7E1D2"),
        ("notion", "No", "#ECE7DF"),
        ("miro", "Mi", "#F8DCC8"),
    ]
    for slug, letters, fill in tools:
        write(ASSETS / "herramientas" / f"{slug}.svg", tool_mark(letters, fill))


def build_pdf() -> None:
    lines = [
        ("F1", 22, "Curriculum vitae"),
        ("F1", 12, "Archivo de ejemplo para el portfolio."),
        ("F1", 12, "Reemplaza assets/cv.pdf por tu curriculum."),
        ("F1", 12, "El boton Descargar CV usa este archivo."),
    ]
    commands = ["BT"]
    first = True
    for font, size, text in lines:
        safe = text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
        if first:
            commands.append(f"/{font} {size} Tf")
            commands.append("48 760 Td")
            commands.append(f"({safe}) Tj")
            first = False
        else:
            commands.append(f"/{font} {size} Tf")
            commands.append("0 -32 Td")
            commands.append(f"({safe}) Tj")
    commands.append("ET")
    stream = "\n".join(commands).encode("latin-1")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
        b"<< /Length %d >>\nstream\n" % len(stream) + stream + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    ]

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for index, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf += f"{index} 0 obj\n".encode("ascii") + obj + b"\nendobj\n"
    xref = len(pdf)
    pdf += f"xref\n0 {len(objects) + 1}\n".encode("ascii")
    pdf += b"0000000000 65535 f \n"
    for offset in offsets[1:]:
        pdf += f"{offset:010d} 00000 n \n".encode("ascii")
    pdf += (
        f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
        f"startxref\n{xref}\n%%EOF\n"
    ).encode("ascii")
    target = ASSETS / "cv.pdf"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(pdf)


if __name__ == "__main__":
    build_images()
    build_pdf()
    print("placeholders listos")

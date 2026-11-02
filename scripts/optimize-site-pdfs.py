"""uv run --with pymupdf --with pillow python scripts/optimize-site-pdfs.py <external-backup-dir> [--apply]."""
import json
import pathlib
import sys
import pymupdf
from PIL import Image, ImageChops, ImageStat

root = pathlib.Path(__file__).resolve().parents[1]
backup = pathlib.Path(sys.argv[1]).resolve()
if backup == root or root in backup.parents:
    raise ValueError("Backup must be outside the project")
reports = []
apply = "--apply" in sys.argv

def visual_difference(source, target):
    with pymupdf.open(source) as before, pymupdf.open(target) as after:
        differences = []
        for index in range(len(before)):
            a, b = before[index].get_pixmap(), after[index].get_pixmap()
            left = Image.frombytes("RGB", (a.width, a.height), a.samples)
            right = Image.frombytes("RGB", (b.width, b.height), b.samples)
            differences.append(sum(ImageStat.Stat(ImageChops.difference(left, right)).mean) / 3)
        return max(differences, default=0)

for source in (root / "public/documents/fabric-duct").glob("*.pdf"):
    relative = source.relative_to(root)
    target = backup / "pdf-candidates" / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    with pymupdf.open(source) as doc:
        if doc.is_encrypted or doc.is_form_pdf or doc.get_sigflags() > 0:
            raise ValueError(f"Manual review required for protected/form/signed PDF: {source.name}")
        before_text = [page.get_text() for page in doc]
        before_links = [len(page.get_links()) for page in doc]
        before_sizes = [list(page.rect) for page in doc]
        toc = doc.get_toc()
        # Keep vector text and graphics; recompress only high-resolution images.
        doc.rewrite_images(dpi_threshold=240, dpi_target=200, quality=88, bitonal=False)
        doc.save(target, garbage=4, deflate=True, use_objstms=1)
    difference = visual_difference(source, target)
    mode = "image recompression"
    if difference > 5:
        # Some PDFs use image masks/color spaces that cannot safely be rewritten.
        # Fall back to structural compression without touching any image pixels.
        with pymupdf.open(source) as doc:
            doc.save(target, garbage=4, deflate=True, use_objstms=1)
        difference = visual_difference(source, target)
        mode = "lossless structure only"
    assert difference <= 5, source.name
    with pymupdf.open(target) as doc:
        assert before_text == [page.get_text() for page in doc], source.name
        assert before_links == [len(page.get_links()) for page in doc], source.name
        assert before_sizes == [list(page.rect) for page in doc], source.name
        assert toc == doc.get_toc(), source.name
        # Render every page to prove the optimized PDF remains readable by MuPDF.
        for page in doc:
            pix = page.get_pixmap(matrix=pymupdf.Matrix(0.5, 0.5))
            assert pix.width and pix.height
        # Sample pages for human visual inspection.
        for index in sorted({0, min(4, len(doc)-1), len(doc)//2, len(doc)-1}):
            doc[index].get_pixmap(matrix=pymupdf.Matrix(1.25, 1.25)).save(
                str(backup / f"{source.stem}-optimized-page-{index+1}.png"))
    before_size = source.stat().st_size
    after_size = target.stat().st_size
    if apply and after_size < before_size:
        original = backup / relative
        original.parent.mkdir(parents=True, exist_ok=True)
        with original.open("xb") as output:
            output.write(source.read_bytes())
        source.write_bytes(target.read_bytes())
    reports.append({"file": str(relative), "before": before_size,
                    "after": target.stat().st_size, "pages": len(before_text),
                    "candidate": str(target), "text_links_page_sizes_verified": True,
                    "max_mean_pixel_difference": difference, "mode": mode,
                    "applied": apply and after_size < before_size})
(backup / "pdf-report.json").write_text(json.dumps(reports, indent=2), encoding="utf8")
print(json.dumps(reports, indent=2))

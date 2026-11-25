#!/usr/bin/env python3
"""Videodaki sessiz boşlukları FFmpeg ile bulup keser.

Kullanım:
  python3 scripts/bosluk-kes.py "Raw Footage/video.mp4" "Exports/video-kesik.mp4" [--esik -35] [--sure 0.4] [--pay 0.08]
"""
import argparse, re, subprocess, sys

p = argparse.ArgumentParser()
p.add_argument("girdi"); p.add_argument("cikti")
p.add_argument("--esik", type=float, default=-35, help="Sessizlik eşiği (dB)")
p.add_argument("--sure", type=float, default=0.4, help="En kısa boşluk süresi (sn)")
p.add_argument("--pay", type=float, default=0.08, help="Kesimin iki yanında bırakılan pay (sn)")
a = p.parse_args()

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                     "-of", "csv=p=0", a.girdi]).strip())
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", a.girdi, "-af",
                      f"silencedetect=noise={a.esik}dB:d={a.sure}", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
if len(ends) < len(starts):
    ends.append(dur)

# Konuşulan (tutulacak) bölümler
keep, t = [], 0.0
for s, e in zip(starts, ends):
    s2, e2 = s + a.pay, e - a.pay
    if s2 > t:
        keep.append((t, s2))
    t = max(t, e2)
if t < dur:
    keep.append((t, dur))
keep = [(s, e) for s, e in keep if e - s > 0.05]
if not keep:
    sys.exit("Hiç konuşma bulunamadı; --esik değerini düşürün.")

expr = "+".join(f"between(t,{s:.3f},{e:.3f})" for s, e in keep)
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", a.girdi,
                "-vf", f"select='{expr}',setpts=N/FRAME_RATE/TB",
                "-af", f"aselect='{expr}',asetpts=N/SR/TB",
                "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-c:a", "aac", a.cikti], check=True)
kept = sum(e - s for s, e in keep)
print(f"{len(starts)} boşluk kesildi: {dur:.1f} sn -> {kept:.1f} sn  ({a.cikti})")

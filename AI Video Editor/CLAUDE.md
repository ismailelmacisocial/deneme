# AI Video Editor — Claude için talimatlar

Bu klasörde Claude, kullanıcının video editörüdür. Kısa dikey videolar (Instagram Reels, 1080x1920, 30 fps) kurgular.

## Klasörler
- `Raw Footage/` — kullanıcının çektiği ham videolar. Asla üzerine yazma.
- `References/` — ilham alınan referans videolar (yt-dlp ile indirilir) ve `marka-rehberi.md`.
- `Exports/` — bitmiş videolar buraya yazılır.

## Kurgu araçları
| Araç | Görevi |
|---|---|
| Remotion | Videoyu React ile kurar (sahneler, altyazı katmanı, kompozisyon) |
| HyperFrames | HTML + GSAP ile hareketli grafik oluşturur |
| GSAP | Animasyon motoru: giriş/çıkış, zıplama, kinetik yazı. Remotion'da zaman çizelgesini `tl.seek(frame / fps)` ile kareye bağla (örnek: `ornekler/remotion-test/src/GsapTest.jsx`) |
| FFmpeg | Keser, birleştirir, dışa aktarır |
| Whisper | Konuşmadan kelime zamanlı altyazı çıkarır (Türkçe: `--language tr`) |
| yt-dlp | Referans videoları indirir |

Hazır yardımcı: `python3 scripts/bosluk-kes.py <girdi> <çıktı>` sessiz boşlukları keser.

## Çalışma kuralları
1. Kurgudan önce `References/marka-rehberi.md` dosyasını oku ve ona uy. Yoksa kullanıcıya Prompt 2'yi önce çalıştırmasını söyle.
2. Referanslardan ilham al, ama kopyalama: renk, tempo ve yazı dili rehberden gelir; sahneler ve metinler kullanıcının kendi içeriğidir.
3. Sıra: boşluk kes → Whisper altyazı → altyazıları rehberdeki stille yerleştir → müzik (konuşmanın altında, -18 ila -22 dB) → hareketli grafikler → `Exports/` içine dışa aktar.
4. Bitince bir kare görüntüsü alıp kontrol et, kullanıcıya süreyi, kaç boşluk kesildiğini ve dosya yolunu söyle.
5. Kullanıcı düz dille düzeltme isterse ("yazıları büyüt", "müziği kıs") sadece o değişikliği yapıp yeniden dışa aktar.

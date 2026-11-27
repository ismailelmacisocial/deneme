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

Windows notları: Whisper `py -3.12 -m whisper` ile çalışır. 2. reel'in depoları `araclar\` içindedir. Beceriler (tiktok-video-skills, ad-video-skills, motion-video-skill, Remotion resmi becerileri `remotion-*`) `.claude\skills` içine kurulur.

Hazır yardımcılar:
- `python3 scripts/bosluk-kes.py <girdi> <çıktı>`: sessiz boşlukları keser.
- `sablonlar/altyazi-tiktok`: Türkçe kelime kelime altyazı (Whisper + Remotion). Kullanımı README'de.
- Müşteri projeleri `projeler/<müşteri-konu>/` altında tutulur (örnek: `projeler/melda-dovme-silme`).

## Çalışma kuralları
1. Kurgudan önce `References/marka-rehberi.md` dosyasını oku ve ona uy. Yoksa kullanıcıya Prompt 2'yi önce çalıştırmasını söyle.
2. Referanslardan ilham al, ama kopyalama: renk, tempo ve yazı dili rehberden gelir; sahneler ve metinler kullanıcının kendi içeriğidir.
3. Sıra: boşluk kes → Whisper altyazı → altyazıları rehberdeki stille yerleştir → müzik (konuşmanın altında, -18 ila -22 dB) → hareketli grafikler → `Exports/` içine dışa aktar.
4. Bitince bir kare görüntüsü alıp kontrol et, kullanıcıya süreyi, kaç boşluk kesildiğini ve dosya yolunu söyle.
5. Kullanıcı düz dille düzeltme isterse ("yazıları büyüt", "müziği kıs") sadece o değişikliği yapıp yeniden dışa aktar.

## Genel çalışma ilkeleri (Karpathy kuralları)
Kaynak: github.com/forrestchang/andrej-karpathy-skills (MIT). Hız yerine dikkat önceliklidir; basit işlerde sağduyunu kullan.

1. **Kodlamadan önce düşün.** Varsayımlarını açıkça söyle; emin değilsen sor. Birden fazla yorum varsa sessizce birini seçme, seçenekleri göster. Daha basit bir yol varsa söyle.
2. **Önce sadelik.** Sorunu çözen en az kod. İstenmeyen özellik, tek kullanımlık soyutlama, istenmeyen "esneklik" ekleme. 200 satır 50 olabiliyorsa yeniden yaz.
3. **Cerrahi değişiklikler.** Sadece gerekene dokun. Yandaki kodu, yorumları, biçimi "iyileştirme"; mevcut stile uy. İlgisiz ölü kodu silme, söyle. Yalnızca kendi değişikliğinin kullanılmaz bıraktığı şeyleri temizle. Her değişen satır doğrudan kullanıcının isteğine bağlanmalı.
4. **Hedef odaklı yürütme.** İşi doğrulanabilir hedefe çevir ("hatayı düzelt" → "hatayı gösteren testi yaz, geçir"). Çok adımlı işlerde kısa plan yaz: `1. [Adım] → doğrula: [kontrol]`. Doğrulanana kadar devam et.

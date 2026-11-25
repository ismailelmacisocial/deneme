# AI Video Editor kurulumu

Claude'u kendi bilgisayarınızda video editörüne çeviren kurulum. İzlenen reel'deki 5 adım burada hazır.

## 5 adım
1. **Claude masaüstü uygulaması:** Claude Code'u tarayıcıda değil, masaüstü uygulamasında açın.
2. **Klasör + Claude Code:** Bu `AI Video Editor` klasörünü bilgisayarınıza (ör. Belgeler) koyun. Klasörde `Raw Footage`, `References` ve `Exports` hazır. Claude'da **Code → Yeni oturum → Ortam: Local → Klasör: AI Video Editor** seçin.
3. **5 kurgu aracı + GSAP:** Aşağıdaki Prompt 1'i yapıştırın. GSAP animasyon motorudur; Remotion ve HyperFrames içinde kullanılır. İsterseniz `./kurulum.sh` komutunu kendiniz de çalıştırabilirsiniz.
4. **Zevkiniz (3–5 referans):** Beğendiğiniz tarzda 3–5 video seçip linklerini Prompt 2'ye ekleyin.
5. **İlk kurgu:** Videonuzu çekin, `Raw Footage` klasörüne atın ve Prompt 3'ü yapıştırın.

## Promptlar

**Prompt 1 · Kurulum**
```
Video editörüm ol. Remotion, HyperFrames, GSAP, FFmpeg, Whisper ve yt-dlp'yi kur, her birini test et. Hazır olunca haber ver.
```

**Prompt 2 · Zevkin**
```
Bu 3-5 videoyu incele ve marka rehberimi oluştur. Onlardan ilham al, ama kopyalama.
<link 1>
<link 2>
<link 3>
```
Claude videoları `References/` klasörüne indirir, karelerini ve altyazılarını inceler, `References/marka-rehberi.md` dosyasını yazar.

**Prompt 3 · Kurgu**
```
Raw Footage'daki [DOSYA ADI] videomu Instagram Reels'e çevir. Boşlukları kes, altyazı, müzik ve hareketli grafik ekle.
```
Sonra düzeltmeleri düz dille söyleyin, örneğin: `yazıları büyüt`.

## İçerik
- `CLAUDE.md`: Claude'un bu klasörde nasıl çalışacağı
- `kurulum.sh`: araçları kurar ve test eder
- `scripts/bosluk-kes.py`: FFmpeg ile sessiz boşlukları keser
- `ornekler/`: Remotion ve HyperFrames test kompozisyonları

Gereksinimler: Node.js 18+ ve Python 3.9+. FFmpeg macOS'ta Homebrew ile kurulur.

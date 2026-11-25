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
- `KURULUM-REHBERI.md`: sıfırdan adım adım kurulum
- `CLAUDE.md`: Claude'un bu klasörde nasıl çalışacağı
- `kurulum.sh`: araçları kurar ve test eder
- `scripts/bosluk-kes.py`: FFmpeg ile sessiz boşlukları keser
- `ornekler/`: Remotion ve HyperFrames test kompozisyonları

Gereksinimler: Node.js 18+ ve Python 3.9+. FFmpeg macOS'ta Homebrew ile kurulur.

## Ek araçlar (2. reel'den)

**Kurulu: Türkçe TikTok altyazı şablonu** (`sablonlar/altyazi-tiktok`, kaynak: remotion-dev/template-tiktok)
Konuşmalı videolara kelime kelime yanan, büyük harfli altyazı ekler. Türkçeye uyarlandı: Whisper modeli `medium` ve dil `tr`. Orijinal yazı tipinde ş/ğ/ı/İ/ö/ü/ç olmadığı için Montserrat ile değiştirildi.
```
cd sablonlar/altyazi-tiktok
npm install
# videoyu public/ klasörüne koy, sonra:
node sub.mjs public/video.mp4     # Whisper ile altyazı çıkarır (ilk seferde ~1.5 GB model iner)
npx remotion render CaptionedVideo --props='{"src":"/video.mp4"}'
```
Not: `lang="tr"` büyük harf kuralı yüzünden "PicoWay" gibi marka adları "PİCOWAY" yazılır. İstenmezse altyazı JSON'unda o kelime elle düzeltilir.

**Kendin kurman gereken: TikTok beceri paketi** (iart-ai/tiktok-video-skills)
Claude'a Reels kurgu bilgisi öğretir: ilk 3 saniye kancası, tempo, karaoke altyazı, alt bant (isim/unvan), geri sayım. Kendi bilgisayarında bu klasörde çalıştır:
```
npx skills add iart-ai/tiktok-video-skills -a claude-code
```

**İsteğe bağlı: claude-code-video-toolkit** (digitalsamba)
Yapay zeka seslendirme, **telifsiz müzik üretimi (ACE-Step)**, görsel üretimi ve ses seviyesi kontrolü. Müzik sorununu çözer. Ancak Modal (bulut GPU, aylık 30$ ücretsiz) hesabı ve kurulum ister. Ücretsiz açık kaynak seslendirme Türkçeyi desteklemeyebilir; Türkçe ses için ElevenLabs (ücretli) gerekir.
```
git clone https://github.com/digitalsamba/claude-code-video-toolkit.git
cd claude-code-video-toolkit && uv sync && claude   # sonra /setup
```

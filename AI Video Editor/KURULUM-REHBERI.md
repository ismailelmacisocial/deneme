# Sıfırdan kurulum rehberi (Windows 11)

Bu rehber iki reel'deki kurulumların **tamamını** kapsar. Hiç bilmeyen birine anlatır gibi yazıldı.

**Kurulacaklar:**
- **1. reel:** Remotion, HyperFrames, GSAP, FFmpeg, Whisper, yt-dlp ve 3 prompt
- **2. reel (5 depo):** claude-code-video-toolkit, ClaudeAnimationBase, motion-skills, motion-video-skill, template-tiktok

Toplam süre yaklaşık 30–45 dakika. Çoğu bekleme.

---

## Hazır olanlar (Claude'un yaptıkları)
- **Klasör yapısı:** `Raw Footage`, `References`, `Exports` klasörleri hazır.
- **Talimatlar ve promptlar:** `CLAUDE.md` Claude'a bu klasörde video editörü olarak nasıl çalışacağını anlatır. 3 prompt bu rehberin sonunda.
- **Kurulum betiği:** `kurulum.ps1` aşağıdaki her şeyi tek seferde kurar ve test eder.
- **Depo 5, Türkçe altyazı:** `sablonlar\altyazi-tiktok` klasöründe, **Türkçeye uyarlanmış** olarak hazır. Orijinalinde Türkçe harfler bozuk çıkıyordu, düzeltildi.
- **Boşluk kesici:** `scripts\bosluk-kes.py` videodaki sessiz anları keser.
- **Test edilenler:** Remotion, HyperFrames, GSAP, FFmpeg ve yt-dlp bulutta test edildi. Whisper'ın altyazı testi bulutta yapılamadı (model dosyası indirilemedi). Windows betiği Windows'ta denenmedi; hata çıkarsa ekran görüntüsünü Claude'a gönderin.

---

## Senin yapacakların

### ADIM 1: Claude masaüstü uygulamasını kur
1. Tarayıcıda **https://claude.ai/download** adresini aç.
2. **Windows için indir** düğmesine bas. İnen dosyayı çift tıklayıp kur.
3. Uygulamayı aç ve Claude hesabınla giriş yap.
4. Üst tarafta **Sohbet · Cowork · Code** yazılarını gör. Video işleri için hep **Code** kullanılacak.

> Neden? Tarayıcıdaki Claude bilgisayarındaki dosyaları göremez. Masaüstü uygulaması görür ve senin yerine program çalıştırabilir.

### ADIM 2: Klasörü GitHub'dan indir
1. Tarayıcıda **https://github.com/ismailelmacisocial/deneme** adresini aç (GitHub hesabınla giriş yap).
2. Sol üstte **main** yazan düğmeye tıkla ve listeden **claude/video-tools-analysis-a1b5av** dalını seç.
3. Yeşil **<> Code** düğmesine tıkla, en alttaki **Download ZIP**'i seç.
4. İndirilenler klasöründeki ZIP dosyasına sağ tıkla → **Tümünü ayıkla** → **Ayıkla**.
5. Açılan klasörün içinde **AI Video Editor** klasörünü bul.
6. Bu klasörü **Belgeler**'e taşı. Sürükleyip bırakabilirsin.

Sonuç: `Belgeler\AI Video Editor` klasörün hazır.

### ADIM 3: Kurulum betiğini çalıştır
1. **Belgeler\AI Video Editor** klasörünü aç.
2. Klasörde **boş bir yere sağ tıkla** → **Terminalde aç**.
   (Göremezsen: **Diğer seçenekleri göster** → **Terminalde aç**.)
3. Açılan pencereye şunu **aynen** yapıştır (sağ tık = yapıştır) ve **Enter**'a bas:
   ```
   powershell -ExecutionPolicy Bypass -File .\kurulum.ps1
   ```
4. Bekle. Programlar sırayla kurulacak.
   - "Bu uygulamanın cihazınızda değişiklik yapmasına izin veriyor musunuz?" diye sorarsa **Evet** de. Birkaç kez sorabilir.
   - Whisper kurulumu uzun sürebilir (2–3 GB indirir), pencereyi kapatma.
5. Sonunda yeşil renkte **HEPSİ HAZIR** yazmalı.
   - Kırmızı **HATA** satırları varsa: pencereyi **kapat**, ADIM 3'ü **bir kez daha** yap. İkinci seferde genelde düzelir, çünkü yeni kurulan programlar ancak yeni pencerede tanınır.
   - Yine kırmızı varsa pencerenin ekran görüntüsünü Claude'a gönder.
6. Kontrol: **Exports** klasöründe 3 video olmalı: `remotion-test`, `gsap-test`, `hf-test`. Açılıyorlarsa kurulum tamam.

Betiğin kurdukları:

| Ne | Ne işe yarar |
|---|---|
| Node.js, Python, Git, uv, Chrome | Diğer araçların çalışması için gereken temel programlar |
| FFmpeg | Videoyu keser, birleştirir, dışa aktarır |
| yt-dlp | Referans videoları indirir |
| Whisper | Konuşmayı yazıya döker (altyazı) |
| Remotion, HyperFrames, GSAP | Videoyu kurar, hareketli yazı ve grafik yapar |
| **Depo 1:** claude-code-video-toolkit | `araclar\` içine indirilir (ayarı ADIM 6'da) |
| **Depo 2:** ClaudeAnimationBase | `araclar\` içine indirilir, kurulur |
| **Depo 3:** motion-skills | Bu bir paket listesi. İçinden Reels için `tiktok-video-skills` ve reklam için `ad-video-skills` kurulur |
| **Depo 4:** motion-video-skill | Claude becerisi olarak kurulur (ses kısmı için ADIM 7) |
| **Depo 5:** template-tiktok | Türkçe altyazı şablonu kurulur |

### ADIM 4: Klasörü Claude'da aç
1. Claude uygulamasında **Code** sekmesine geç.
2. **Yeni oturum** başlat.
3. **Ortam: Local** seç.
4. **Klasör seç** → **Belgeler\AI Video Editor**.

Artık Claude senin video editörün. Bu klasörde açtığın her oturumda kuralları kendisi okur.

### ADIM 5: Kurulumu Claude'a kontrol ettir (Prompt 1)
Şunu yapıştır:
```
Video editörüm ol. Remotion, HyperFrames, GSAP, FFmpeg, Whisper ve yt-dlp'nin kurulu olduğunu ve çalıştığını test et. Eksik varsa kurulum.ps1'i çalıştır veya düzelt. Hazır olunca haber ver.
```
Claude komut çalıştırmak için izin isterse **İzin ver** de.

### ADIM 6: Müzik ve seslendirme araç setini ayarla (Depo 1, isteğe bağlı)
**Ne işe yarar:** Yapay zeka ile **telifsiz müzik** üretir, seslendirme yapar, görsel üretir.
**Ne gerektirir:** Ücretsiz bir Modal hesabı (bulut ekran kartı, ayda 30$ ücretsiz kullanım).
1. **https://modal.com** adresinde **Sign up** ile hesap aç.
2. Claude uygulamasında **yeni bir Code oturumu** aç. Bu sefer klasör olarak `Belgeler\AI Video Editor\araclar\claude-code-video-toolkit` seç.
3. Sohbete `/setup` yaz ve Enter'a bas.
4. Claude sana adım adım ne yapacağını söyleyecek: Modal'a bağlanma, ses ayarı vb. Yaklaşık 5 dakika sürer.
5. Bundan sonra müzik lazım olduğunda bu oturumda iste, örneğin "30 saniyelik sakin, lüks klinik havasında müzik üret". Çıkan müziği `AI Video Editor\References` klasörüne koy.

> Türkçe seslendirme için ücretsiz model yetersiz kalabilir. İyi Türkçe ses için ElevenLabs (ücretli) gerekir.

### ADIM 7: Hareketli grafik becerisinin ses kısmı (Depo 4, isteğe bağlı)
Beceri kuruldu. Ama ses, müzik ve efekt üretmek için `multix` adlı ayrı bir programa ve şu iki anahtara ihtiyaç var:
- Gemini API anahtarı (ücretsiz): https://aistudio.google.com
- ElevenLabs API anahtarı (ücretli): https://elevenlabs.io

`multix`'in nereden kurulacağı depoda yazmıyor. Kullanmak istersen Claude'a şunu sor: "motion-video-skill için multix'i nasıl kurarım?"
Ayrıca bu beceri **yatay (YouTube)** video üretiyor. Reels için Claude'a "dikey 1080x1920 yap" demen gerekir.

### ADIM 8: Çizgi film karakteri (Depo 2, kullanırsan)
`araclar\ClaudeAnimationBase` klasörünü Claude'da ayrı bir oturumda aç ve şunu yaz:
```
Read ANIMATION_GUIDE.md, then make a 15-second video of Clawd waving hello.
```
Uyarılar:
- **Clawd, Claude'un (Anthropic) maskotudur.** Kişisel denemeler için uygundur. Kendi markan veya müşteri işi için Claude'dan karakteri değiştirmesini iste, örneğin "Clawd yerine kendi karakterimi çiz".
- Ekran kartı zayıf bilgisayarda yavaş çalışır.

### ADIM 9: Kendi tarzını öğret (Prompt 2)
1. Instagram'da beğendiğin tarzda **3–5 reel** bul. Her birinde **⋯ → Bağlantıyı kopyala** yap.
2. AI Video Editor oturumunda şunu yapıştır ve linkleri altına ekle:
```
Bu 3-5 videoyu incele ve marka rehberimi oluştur. Onlardan ilham al, ama kopyalama.
https://www.instagram.com/reel/...
https://www.instagram.com/reel/...
https://www.instagram.com/reel/...
```
Instagram indirmeyi engellerse Claude'a şunu yaz: "yt-dlp'de --cookies-from-browser chrome kullan". Bunun için Chrome'da Instagram hesabın açık olmalı.

### ADIM 10: İlk kurgu (Prompt 3)
1. Videonu çek ve bilgisayara at.
2. Dosyayı **AI Video Editor\Raw Footage** klasörüne koy.
3. Şunu yapıştır (köşeli parantezin yerine dosyanın adını yaz):
```
Raw Footage'daki [DOSYA ADI] videomu Instagram Reels'e çevir. Boşlukları kes, altyazı, müzik ve hareketli grafik ekle.
```
4. Bitmiş video **Exports** klasörüne gelir.
5. Beğenmediğin yeri düz dille söyle: "yazıları büyüt", "ilk 2 saniyeyi kes", "altyazı sarı olsun".

---

## Takılırsan
- **"... tanınmıyor" / "not recognized" hatası:** Terminal penceresini kapat, yenisini aç, komutu tekrar dene.
- **Kırmızı yazılar:** Ekran görüntüsünü al, Claude'a gönder.
- **Video oluşturmak yavaş:** Normal. 30 saniyelik video birkaç dakika sürebilir.
- **Lisans:** Remotion; bireysel kullanım ve 3 kişiye kadar ekipler için ücretsiz. 4 ve daha fazla çalışanlı şirketler ücretli lisans almalı.

# Sıfırdan kurulum rehberi

Bu rehber iki reel'deki kurulumun tamamını kapsar:
1. **AI video editör kurulumu:** Remotion, HyperFrames, GSAP, FFmpeg, Whisper, yt-dlp ve 3 prompt
2. **Video repoları:** Türkçe otomatik altyazı, TikTok beceri paketi, isteğe bağlı müzik ve seslendirme araç seti

Komutlar Mac içindir. Windows farkları her adımda ayrıca yazılı.

---

## Adım 1: Claude masaüstü uygulaması
1. https://claude.ai/download adresinden uygulamayı indirip kurun ve hesabınızla giriş yapın.
2. Uygulamanın üstünde **Sohbet / Cowork / Code** sekmeleri olmalı. **Code** sekmesini kullanacağız.

> Neden masaüstü? Tarayıcıdaki Claude bilgisayarınızdaki dosyalara ve programlara erişemez. Masaüstü uygulaması "Local" modda bilgisayarınızda komut çalıştırabilir.

## Adım 2: Temel programlar (bir kez yapılır)
**Mac:**
1. **Terminal**'i açın (Cmd + Boşluk, "Terminal" yazın).
2. Homebrew'u kurun. https://brew.sh sayfasındaki tek satırlık komutu kopyalayıp Terminal'e yapıştırın. Şifre sorarsa Mac şifrenizi yazın (yazarken görünmez, normaldir). Sonunda ekranda "Next steps" altında 2 komut çıkarsa onları da çalıştırın.
3. Node.js'i kurun: `brew install node`
4. Kontrol: `node -v` komutu `v22` veya üzeri bir sürüm yazmalı.

**Windows:** PowerShell'i açın ve şunları çalıştırın:
```
winget install OpenJS.NodeJS.LTS Gyan.FFmpeg yt-dlp.yt-dlp Python.Python.3.12 Git.Git
```
Sonra PowerShell'i kapatıp yeniden açın.

## Adım 3: Klasörü bilgisayara alın
1. GitHub'da `ismailelmacisocial/deneme` deposunu açın.
2. Sol üstteki dal menüsünden `claude/video-tools-analysis-a1b5av` dalını seçin. Pull request birleştirildiyse `main` dalını seçin.
3. Yeşil **Code** düğmesi → **Download ZIP**.
4. ZIP'i açın. İçindeki **AI Video Editor** klasörünü **Belgeler**'e taşıyın.

## Adım 4: Claude'da klasörü açın
Claude uygulaması → **Code** → **Yeni oturum** → Ortam: **Local** → Klasör: **Belgeler/AI Video Editor**.
Claude artık bu klasörü görüyor. `CLAUDE.md` dosyası, Claude'a bu klasörde video editörü olarak nasıl çalışacağını otomatik olarak anlatır.

## Adım 5: Prompt 1, araçların kurulumu
Claude'a şunu yapıştırın:
```
Video editörüm ol. Remotion, HyperFrames, GSAP, FFmpeg, Whisper ve yt-dlp'yi kur, her birini test et. Hazır olunca haber ver. Kurulum için klasördeki kurulum.sh betiğini kullan.
```
Claude komut çalıştırmak için izin isteyecek, **İzin ver** deyin. Sonunda `Exports` klasöründe 3 küçük test videosu oluşur: remotion-test, gsap-test, hf-test. Açılıyorlarsa kurulum tamam.

> Kendiniz yapmak isterseniz: Terminal'de `cd ~/Documents/"AI Video Editor"` ve ardından `./kurulum.sh`.
> Windows'ta kurulum.sh çalışmaz. Prompt 1'i yapıştırmanız yeterli, Claude Windows komutlarıyla kurar.

## Adım 6: Türkçe otomatik altyazı
Kurulum betiği bunu da hazırlar. İlk kullanımda Claude'a şunu söyleyin:
```
sablonlar/altyazi-tiktok ile Raw Footage'daki [DOSYA ADI] videosuna Türkçe altyazı ekle.
```
İlk seferde yaklaşık 1,5 GB Whisper modeli iner, beklemeniz normal.

## Adım 7: TikTok beceri paketi
Claude'a Reels tecrübesi kazandırır: ilk 3 saniye kancası, tempo, karaoke altyazı, isim/unvan alt bandı.
Terminal'de, AI Video Editor klasörünün içinde:
```
npx skills add iart-ai/tiktok-video-skills -a claude-code
```
Sorulan sorulara Enter ile devam edin. Sonra Claude'da yeni bir oturum açın ki becerileri görsün.

## Adım 8 (isteğe bağlı): Müzik ve seslendirme araç seti
Yapay zeka ile **telifsiz müzik** üretir, seslendirme ve görsel yapar. Ancak bulut GPU hesabı ister.
1. https://modal.com adresinde hesap açın (aylık 30$ ücretsiz kullanım).
2. Terminal'de:
```
brew install uv
cd ~/Documents
git clone https://github.com/digitalsamba/claude-code-video-toolkit.git
```
3. Claude'da bu klasörü ayrı bir oturumda açıp `/setup` yazın. Kurulum yaklaşık 5 dakika sürer ve Claude adım adım yönlendirir.

Not: Ücretsiz seslendirme modeli Türkçeyi iyi desteklemeyebilir. Türkçe ses için ElevenLabs (ücretli) gerekir.

## Adım 9: Prompt 2, tarzınız (marka rehberi)
Instagram'da beğendiğiniz tarzda 3–5 reel seçin ve linklerini kopyalayın.
```
Bu 3-5 videoyu incele ve marka rehberimi oluştur. Onlardan ilham al, ama kopyalama.
https://www.instagram.com/reel/...
https://www.instagram.com/reel/...
https://www.instagram.com/reel/...
```
Claude videoları `References` klasörüne indirir ve `References/marka-rehberi.md` dosyasını yazar.
Instagram indirmeyi engellerse Claude'a şunu söyleyin: "yt-dlp'de --cookies-from-browser chrome kullan". Bunun için Chrome'da Instagram hesabınız açık olmalı.

## Adım 10: Prompt 3, ilk kurgu
Videonuzu çekin, **Raw Footage** klasörüne atın ve şunu yapıştırın:
```
Raw Footage'daki [DOSYA ADI] videomu Instagram Reels'e çevir. Boşlukları kes, altyazı, müzik ve hareketli grafik ekle.
```
Bitmiş video **Exports** klasörüne gelir. Düzeltmeleri düz dille isteyin: "yazıları büyüt", "müziği kıs", "ilk 2 saniyeyi kes".

---

## Sorun çözme
- **"command not found":** Terminal'i kapatıp yeniden açın, sonra tekrar deneyin.
- **Claude izin istiyor:** Bu normal. Bilgisayarınızda komut çalıştırmadan önce sorar.
- **Video render çok yavaş:** Normal. Bilgisayar her kareyi tek tek çizer, 30 saniyelik video birkaç dakika sürebilir.
- **Lisans:** Remotion, 4 veya daha fazla çalışanı olan şirketlerde ticari kullanım için ücretli lisans ister. Bireysel kullanım ve 3 kişiye kadar ekipler ücretsizdir.

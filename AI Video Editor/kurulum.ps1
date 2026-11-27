# AI Video Editor — Windows 11 kurulum betiği
# İki reel'deki araçların tamamını kurar ve test eder.
#
# Çalıştırma: "AI Video Editor" klasöründe boş bir yere sağ tık > "Terminalde aç", sonra:
#   powershell -ExecutionPolicy Bypass -File .\kurulum.ps1
#
# Betiği tekrar çalıştırmak güvenlidir: kurulu olanları atlar.

$ErrorActionPreference = 'Continue'
Set-Location $PSScriptRoot
$Hatalar = @()

function Adim($m) { Write-Host "`n=== $m ===" -ForegroundColor Yellow }
function Tamam($m) { Write-Host "  OK  $m" -ForegroundColor Green }
function Hata($m) { Write-Host "  HATA  $m" -ForegroundColor Red; $script:Hatalar += $m }
function PathYenile {
  $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
              [Environment]::GetEnvironmentVariable('Path', 'User')
}
function WingetKur($id, $ad) {
  Write-Host "  $ad kuruluyor..."
  winget install --id $id -e --silent --accept-source-agreements --accept-package-agreements | Out-Null
  Tamam $ad
}
function Klonla($url, $klasor) {
  $hedef = Join-Path $PSScriptRoot "araclar\$klasor"
  if (Test-Path $hedef) { Tamam "$klasor zaten indirilmiş"; return $hedef }
  git clone --depth 1 $url $hedef
  if ($LASTEXITCODE -eq 0) { Tamam "$klasor indirildi" } else { Hata "$klasor indirilemedi" }
  return $hedef
}

# ---------------------------------------------------------------- 1
Adim '1/7 Temel programlar (Node.js, FFmpeg, yt-dlp, Python, Git, uv, Chrome)'
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
  Write-Host 'winget bulunamadı. Microsoft Store > "Uygulama Yükleyici" (App Installer) güncelleyin.' -ForegroundColor Red
  exit 1
}
WingetKur 'OpenJS.NodeJS.LTS'   'Node.js'
WingetKur 'Gyan.FFmpeg'         'FFmpeg'
WingetKur 'yt-dlp.yt-dlp'       'yt-dlp'
WingetKur 'Python.Python.3.12'  'Python 3.12'
WingetKur 'Git.Git'             'Git'
WingetKur 'astral-sh.uv'        'uv'
WingetKur 'Google.Chrome'       'Google Chrome'
WingetKur 'Microsoft.VCRedist.2015+.x64' 'Visual C++ (Whisper/PyTorch için gerekli)'
PathYenile

# ---------------------------------------------------------------- 2
Adim '2/7 Whisper (konuşmayı yazıya döker) + numpy/scipy'
py -3.12 -m pip install --upgrade pip | Out-Null
py -3.12 -m pip install -U openai-whisper numpy scipy
if ($LASTEXITCODE -eq 0) { Tamam 'Whisper, numpy, scipy' } else { Hata 'Whisper kurulamadı' }
PathYenile

# ---------------------------------------------------------------- 3
Adim '3/7 Remotion + HyperFrames + GSAP (1. reel)'
npm install
if ($LASTEXITCODE -eq 0) { Tamam 'Ana paketler' } else { Hata 'npm install (ana klasör)' }

# ---------------------------------------------------------------- 4
Adim '4/7 Depo 5: Türkçe TikTok altyazı şablonu (remotion-dev/template-tiktok)'
Push-Location 'sablonlar\altyazi-tiktok'
npm install
if ($LASTEXITCODE -eq 0) { Tamam 'Altyazı şablonu (Türkçeye uyarlanmış hali)' } else { Hata 'Altyazı şablonu' }
Pop-Location

# ---------------------------------------------------------------- 5
Adim '5/7 Depo 1 ve 2: claude-code-video-toolkit + ClaudeAnimationBase'
New-Item -ItemType Directory -Force (Join-Path $PSScriptRoot 'araclar') | Out-Null
$tk = Klonla 'https://github.com/digitalsamba/claude-code-video-toolkit.git' 'claude-code-video-toolkit'
Push-Location $tk; uv sync; if ($LASTEXITCODE -eq 0) { Tamam 'Toolkit Python paketleri' } else { Hata 'Toolkit uv sync' }; Pop-Location
$ab = Klonla 'https://github.com/JohnHeibel/ClaudeAnimationBase.git' 'ClaudeAnimationBase'
Push-Location $ab; npm install; if ($LASTEXITCODE -eq 0) { Tamam 'ClaudeAnimationBase paketleri' } else { Hata 'ClaudeAnimationBase npm install' }; Pop-Location

# ---------------------------------------------------------------- 6
Adim '6/7 Depo 3 ve 4: Claude becerileri (motion-skills paketleri + motion-video-skill)'
# motion-skills 19 paketin listesidir; Reels ve reklam için olan ikisi kurulur.
npx -y skills add iart-ai/tiktok-video-skills -a claude-code -y
if ($LASTEXITCODE -eq 0) { Tamam 'tiktok-video-skills' } else { Hata 'tiktok-video-skills' }
npx -y skills add iart-ai/ad-video-skills -a claude-code -y
if ($LASTEXITCODE -eq 0) { Tamam 'ad-video-skills' } else { Hata 'ad-video-skills' }
npx -y skills add bestagentkits/motion-video-skill -a claude-code -y
if ($LASTEXITCODE -eq 0) { Tamam 'motion-video-skill' } else { Hata 'motion-video-skill' }
# 3. reel: Remotion'un resmi Claude becerileri + OmniRoute (yapay zekâ yönlendiricisi)
npx -y skills add remotion-dev/skills -a claude-code -y
if ($LASTEXITCODE -eq 0) { Tamam 'Remotion becerileri' } else { Hata 'Remotion becerileri' }
npm install -g omniroute
if ($LASTEXITCODE -eq 0) { Tamam 'OmniRoute' } else { Hata 'OmniRoute' }

# ---------------------------------------------------------------- 7
Adim '7/7 Testler'
New-Item -ItemType Directory -Force 'Exports' | Out-Null
ffmpeg -version | Select-Object -First 1
yt-dlp --version
py -3.12 -m whisper --help | Out-Null; if ($LASTEXITCODE -eq 0) { Tamam 'Whisper (py -m whisper)' } else { Hata 'Whisper çalışmadı' }
node -e "const {gsap}=require('gsap'); console.log('GSAP', gsap.version)"
npx remotion render ornekler/remotion-test/src/index.jsx Test Exports/remotion-test.mp4
if ($LASTEXITCODE -eq 0) { Tamam 'Remotion test videosu' } else { Hata 'Remotion testi' }
npx remotion render ornekler/remotion-test/src/index.jsx GsapTest Exports/gsap-test.mp4
if ($LASTEXITCODE -eq 0) { Tamam 'GSAP test videosu' } else { Hata 'GSAP testi' }
Push-Location 'ornekler\hf-test'
npx hyperframes render -o ..\..\Exports\hf-test.mp4 -q draft
if ($LASTEXITCODE -eq 0) { Tamam 'HyperFrames test videosu' } else { Hata 'HyperFrames testi' }
Pop-Location

Write-Host ''
if ($Hatalar.Count -eq 0) {
  Write-Host 'HEPSİ HAZIR. Test videoları Exports klasöründe.' -ForegroundColor Green
} else {
  Write-Host 'Bitti ama şunlarda sorun var:' -ForegroundColor Red
  $Hatalar | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
  Write-Host 'Bu pencerenin ekran görüntüsünü Claude''a gönderin.'
}
Write-Host ''
Write-Host 'Kendiniz yapmanız gerekenler: KURULUM-REHBERI.md dosyasındaki "Senin yapacakların" bölümü.'

#!/usr/bin/env bash
# AI Video Editor — tüm araçları kurar ve test eder (macOS / Linux).
# Kullanım: AI Video Editor klasöründe ./kurulum.sh
set -e
cd "$(dirname "$0")"
MAC=false; [ "$(uname)" = "Darwin" ] && MAC=true

if $MAC; then
  command -v brew >/dev/null || { echo "Önce Homebrew kurun: https://brew.sh"; exit 1; }
  echo "1/3 FFmpeg, yt-dlp, Whisper (Homebrew)"
  brew install ffmpeg yt-dlp openai-whisper
else
  echo "1/3 FFmpeg, yt-dlp, Whisper"
  command -v ffmpeg >/dev/null || sudo apt-get install -y ffmpeg
  python3 -m pip install -U yt-dlp openai-whisper
fi

echo "2/3 Remotion + HyperFrames + GSAP"
command -v node >/dev/null || { echo "Önce Node.js LTS kurun: https://nodejs.org"; exit 1; }
npm install
(cd sablonlar/altyazi-tiktok && npm install)

echo "3/3 Testler"
ffmpeg -version | head -1
yt-dlp --version
whisper --help >/dev/null && echo "Whisper hazır"
node -e "const {gsap}=require('gsap'); console.log('GSAP', gsap.version)"
npx remotion render ornekler/remotion-test/src/index.jsx Test Exports/remotion-test.mp4
npx remotion render ornekler/remotion-test/src/index.jsx GsapTest Exports/gsap-test.mp4
(cd ornekler/hf-test && npx hyperframes render -o ../../Exports/hf-test.mp4 -q draft)
echo "Hepsi hazır. Test videoları Exports/ klasöründe."

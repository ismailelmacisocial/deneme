#!/usr/bin/env bash
# AI Video Editor — 5 kurgu aracını kurar ve test eder (macOS / Linux).
set -e
cd "$(dirname "$0")"
echo "1/5 FFmpeg";  command -v ffmpeg >/dev/null || { command -v brew >/dev/null && brew install ffmpeg || sudo apt-get install -y ffmpeg; }
echo "2/5 yt-dlp";  python3 -m pip install -U yt-dlp
echo "3/5 Whisper"; python3 -m pip install -U openai-whisper
echo "4-5/5 Remotion + HyperFrames + GSAP"; npm install
echo "--- Testler ---"
ffmpeg -version | head -1
yt-dlp --version
python3 -c "import whisper; whisper.load_model('base'); print('Whisper hazır (base modeli indirildi)')"
npx remotion render ornekler/remotion-test/src/index.jsx Test Exports/remotion-test.mp4
node -e "const {gsap}=require('gsap'); console.log('GSAP', gsap.version)"
npx remotion render ornekler/remotion-test/src/index.jsx GsapTest Exports/gsap-test.mp4
(cd ornekler/hf-test && npx hyperframes render -o ../../Exports/hf-test.mp4 -q draft)
echo "Hepsi hazır. Test videoları Exports/ klasöründe."

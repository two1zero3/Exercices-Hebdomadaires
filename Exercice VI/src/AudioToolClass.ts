class AudioTool {
    audioFile: string;
    audio: HTMLAudioElement;
    audioContext: AudioContext;
    source: MediaElementAudioSourceNode;
    analyser: AnalyserNode;
    bufferLength: number;
    dataFrequency: Uint8Array;
    dataFloatFrequency: Float32Array;
    dataWave: Uint8Array;
    isPlaying: boolean;
    fftSize: number;

    constructor(fftSize: number) {
        this.audioFile = "./static/The Rolf Kühn Orchestra - La Canal.mp3";
        this.audio = new Audio(this.audioFile);
        this.isPlaying = false;
        this.fftSize = fftSize;
    }

    initAudioContext() {
        this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();

        this.initBroadcast();
        this.setupAnalyser();
    }

    initBroadcast() {
        this.source = this.audioContext.createMediaElementSource(this.audio);
    }

    setupAnalyser() {
        this.analyser = this.audioContext.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        //fast fourier transform size -> how big is the window to analyse the sound
        this.analyser.fftSize = this.fftSize;

        //half the fftSize -> how many data we get as a result of the fft
        this.bufferLength = this.analyser.frequencyBinCount;

        //tableau de data (2 type)
        this.dataFrequency = new Uint8Array(this.bufferLength);
        this.dataFloatFrequency = new Float32Array(this.bufferLength);
        this.dataWave = new Uint8Array(this.bufferLength);
    }

    updateWaveForm() {
        if (this.audioContext)
            this.analyser.getByteTimeDomainData(this.dataWave);
    }
    updateFrequency() {
        if (this.audioContext)
            this.analyser.getByteFrequencyData(this.dataFrequency);
    }
    updatedFloatFrequency() {
        if (this.audioContext)
            this.analyser.getFloatFrequencyData(this.dataFloatFrequency);
    }

    play(mouse: MouseEvent) {
        if (this.isPlaying === false) {
            if (!this.audioContext) {
                this.initAudioContext();
            }
            this.audio.play();
            UserInterface.textContent = audioTool.audioFile + " ///// ";
            this.isPlaying = true;
        } else {
            // this.audio.pause();
            // this.isPlaying = false;
            let timeToStart =
                (mouse.clientX / window.innerWidth) * this.audio.duration;
            this.audio.currentTime = timeToStart;
        }
    }
}

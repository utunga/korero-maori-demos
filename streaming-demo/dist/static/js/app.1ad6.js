webpackJsonp([1],{BLBT:function(t,e){api_auth={headers:{Authorization:"Token YOUR_TOKEN_HERE"},url:"https://koreromaori.io/api/transcription/?method=stream"},e.api_auth=api_auth},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("7+uW"),o=i("Zrlr"),n=i.n(o),r=i("wxAW"),a=i.n(r),h=function(){function t(e,i,s,o,r){n()(this,t),this.fromSampleRate=e,this.toSampleRate=i,this.channels=0|s,this.outputBufferSize=o,this.noReturn=!!r,this.initialize()}return a()(t,[{key:"initialize",value:function(){if(!(this.fromSampleRate>0&&this.toSampleRate>0&&this.channels>0))throw new Error("Invalid settings specified for the resampler.");this.fromSampleRate==this.toSampleRate?(this.resampler=this.bypassResampler,this.ratioWeight=1):(this.compileInterpolationFunction(),this.resampler=this.interpolate,this.ratioWeight=this.fromSampleRate/this.toSampleRate,this.tailExists=!1,this.lastWeight=0,this.initializeBuffers())}},{key:"compileInterpolationFunction",value:function(){for(var t="var bufferLength = Math.min(buffer.length, this.outputBufferSize);        if ((bufferLength % "+this.channels+") == 0) {            if (bufferLength > 0) {                var ratioWeight = this.ratioWeight;                var weight = 0;",e=0;e<this.channels;++e)t+="var output"+e+" = 0;";for(t+="var actualPosition = 0;                var amountToNext = 0;                var alreadyProcessedTail = !this.tailExists;                this.tailExists = false;                var outputBuffer = this.outputBuffer;                var outputOffset = 0;                var currentPosition = 0;                do {                    if (alreadyProcessedTail) {                        weight = ratioWeight;",e=0;e<this.channels;++e)t+="output"+e+" = 0;";for(t+="}                    else {                        weight = this.lastWeight;",e=0;e<this.channels;++e)t+="output"+e+" = this.lastOutput["+e+"];";for(t+="alreadyProcessedTail = true;                    }                    while (weight > 0 && actualPosition < bufferLength) {                        amountToNext = 1 + actualPosition - currentPosition;                        if (weight >= amountToNext) {",e=0;e<this.channels;++e)t+="output"+e+" += buffer[actualPosition++] * amountToNext;";for(t+="currentPosition = actualPosition;                            weight -= amountToNext;                        }                        else {",e=0;e<this.channels;++e)t+="output"+e+" += buffer[actualPosition"+(e>0?" + "+e:"")+"] * weight;";for(t+="currentPosition += weight;                            weight = 0;                            break;                        }                    }                    if (weight == 0) {",e=0;e<this.channels;++e)t+="outputBuffer[outputOffset++] = output"+e+" / ratioWeight;";for(t+="}                    else {                        this.lastWeight = weight;",e=0;e<this.channels;++e)t+="this.lastOutput["+e+"] = output"+e+";";t+='this.tailExists = true;                        break;                    }                } while (actualPosition < bufferLength);                return this.bufferSlice(outputOffset);            }            else {                return (this.noReturn) ? 0 : [];            }        }        else {            throw(new Error("Buffer was of incorrect sample length."));        }',this.interpolate=Function("buffer",t)}},{key:"bypassResampler",value:function(t){return this.noReturn?(this.outputBuffer=t,t.length):t}},{key:"bufferSlice",value:function(t){if(this.noReturn)return t;try{return this.outputBuffer.subarray(0,t)}catch(e){try{return this.outputBuffer.length=t,this.outputBuffer}catch(e){return this.outputBuffer.slice(0,t)}}}},{key:"initializeBuffers",value:function(t){try{this.outputBuffer=new Float32Array(this.outputBufferSize),this.lastOutput=new Float32Array(this.channels)}catch(t){this.outputBuffer=[],this.lastOutput=[]}}}]),t}(),c=function t(e){for(var i in n()(this,t),this.options={fftSize:256,bufferLen:256,voice_stop:function(){},voice_start:function(){},smoothingTimeConstant:.99,energy_offset:1e-8,energy_threshold_ratio_pos:4,energy_threshold_ratio_neg:.25,energy_integration:1,filter:[{f:200,v:0},{f:2e3,v:1}],source:null,context:null,debug:!1},e)e.hasOwnProperty(i)&&(this.options[i]=e[i]);if(!this.options.source)throw new Error("The options must specify a MediaStreamAudioSourceNode.");this.options.context=this.options.source.context,this.hertzPerBin=this.options.context.sampleRate/this.options.fftSize,this.iterationFrequency=this.options.context.sampleRate/this.options.bufferLen,this.iterationPeriod=1/this.iterationFrequency,this.options.debug&&console.log("Vad | sampleRate: "+this.options.context.sampleRate+" | hertzPerBin: "+this.hertzPerBin+" | iterationFrequency: "+this.iterationFrequency+" | iterationPeriod: "+this.iterationPeriod),this.setFilter=function(t){this.filter=[];for(var e=0,i=this.options.fftSize/2;e<i;e++){this.filter[e]=0;for(var s=0,o=t.length;s<o;s++)if(e*this.hertzPerBin<t[s].f){this.filter[e]=t[s].v;break}}},this.setFilter(this.options.filter),this.ready={},this.vadState=!1,this.energy_offset=this.options.energy_offset,this.energy_threshold_pos=this.energy_offset*this.options.energy_threshold_ratio_pos,this.energy_threshold_neg=this.energy_offset*this.options.energy_threshold_ratio_neg,this.voiceTrend=0,this.voiceTrendMax=15,this.voiceTrendMin=-5,this.voiceTrendStart=2,this.voiceTrendEnd=-5,this.damper=.02,this.voiceTrendMin=this.voiceTrendEnd-this.damper/10,this.analyser=this.options.context.createAnalyser(),this.analyser.smoothingTimeConstant=this.options.smoothingTimeConstant,this.analyser.fftSize=this.options.fftSize,this.floatFrequencyData=new Float32Array(this.analyser.frequencyBinCount),this.floatFrequencyDataLinear=new Float32Array(this.floatFrequencyData.length),this.options.source.connect(this.analyser),this.scriptProcessorNode=this.options.context.createScriptProcessor(this.options.bufferLen,1,1),this.scriptProcessorNode.connect(this.options.context.destination);var s=this;this.scriptProcessorNode.onaudioprocess=function(t){s.analyser.getFloatFrequencyData(s.floatFrequencyData),s.update(),s.monitor()},this.options.source.connect(this.scriptProcessorNode),this.logging=!1,this.log_i=0,this.log_limit=100,this.triggerLog=function(t){this.logging=!0,this.log_i=0,this.log_limit="number"==typeof t?t:this.log_limit},this.log=function(t){this.logging&&this.log_i<this.log_limit?(this.log_i++,console.log(t)):this.logging=!1},this.update=function(){for(var t=this.floatFrequencyData,e=0,i=t.length;e<i;e++)this.floatFrequencyDataLinear[e]=Math.pow(10,t[e]/10);this.ready={}},this.getEnergy=function(){if(this.ready.energy)return this.energy;for(var t=0,e=this.floatFrequencyDataLinear,i=0,s=e.length;i<s;i++)t+=this.filter[i]*e[i]*e[i];return this.energy=t,this.ready.energy=!0,t},this.monitor=function(){var t=this.getEnergy(),e=t-this.energy_offset;e>this.energy_threshold_pos?this.voiceTrend=this.voiceTrend+1>this.voiceTrendMax?this.voiceTrendMax:this.voiceTrend+1:e<-this.energy_threshold_neg?this.voiceTrend=this.voiceTrend-1<this.voiceTrendMin?this.voiceTrendMin:this.voiceTrend-1*(this.vadState?this.damper:10):this.voiceTrend>0?this.voiceTrend--:this.voiceTrend<0&&this.voiceTrend++;var i=!1,s=!1;this.voiceTrend>this.voiceTrendStart?i=!0:this.voiceTrend<this.voiceTrendEnd&&(s=!0);var o=e*this.iterationPeriod*this.options.energy_integration;return this.energy_offset+=o>0||!s?o:10*o,this.energy_offset=this.energy_offset<0?0:this.energy_offset,this.energy_threshold_pos=this.energy_offset*this.options.energy_threshold_ratio_pos,this.energy_threshold_neg=this.energy_offset*this.options.energy_threshold_ratio_neg,i&&!this.vadState&&(this.vadState=!0,this.options.voice_start()),s&&this.vadState&&(this.vadState=!1,this.options.voice_stop()),this.log("e: "+t+" | e_of: "+this.energy_offset+" | e+_th: "+this.energy_threshold_pos+" | e-_th: "+this.energy_threshold_neg+" | signal: "+e+" | int: "+o+" | voiceTrend: "+this.voiceTrend+" | start: "+i+" | end: "+s),e}},u=function(){function t(e,i,s){n()(this,t);this.canvas=document.getElementById(e),this.canvasContext=this.canvas.getContext("2d"),this.loop=!1,this.sourceNode=i,this.audioContext=s,this.analyser=s.createAnalyser(),this.analyser.fftSize=32,this.sourceNode.connect(this.analyser),this.bufferLength=this.analyser.frequencyBinCount,this.dataArray=new Uint8Array(this.analyser.fftSize)}return a()(t,[{key:"stop",value:function(){this.loop=!1;var t=this;window.setTimeout(function(){t.clearFrame()},200)}},{key:"start",value:function(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight,this.WIDTH=this.canvas.clientWidth,this.HEIGHT=this.canvas.clientHeight,this.loop=!0,this.renderFrame()}},{key:"renderFrame",value:function(){var t=this;if(t.loop){window.requestAnimationFrame(function(){t.renderFrame()}),t.analyser.getByteFrequencyData(t.dataArray),t.canvasContext.fillStyle="#333",t.canvasContext.fillRect(0,0,t.WIDTH,t.HEIGHT);for(var e=parseInt(t.WIDTH/t.bufferLength),i=0,s=0,o=0;o<t.bufferLength/2;o++){i=parseInt(t.dataArray[o]/255*t.HEIGHT*.9);var n=parseInt(t.HEIGHT/i*.5*73),r=parseInt(i/t.HEIGHT*90);t.canvasContext.fillStyle="hsl(345,"+n+"%,"+r+"%)",t.canvasContext.fillRect(2*s+1,t.HEIGHT-i,2*e-2,i),s+=e}}}},{key:"clearFrame",value:function(){this.canvasContext.clearRect(0,0,this.WIDTH,this.HEIGHT),this.canvasContext.fillStyle="#333",this.canvasContext.fillRect(0,0,this.WIDTH,this.HEIGHT)}}]),t}(),l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n()(this,t),this.beforeRecording=e.beforeRecording,this.pauseRecording=e.pauseRecording,this.processAudio=e.processAudio,this.afterRecording=e.afterRecording,this.micFailed=e.micFailed,this.voiceStop=e.voiceStop,this.voiceStart=e.voiceStart,this.visCanvasID=e.canvasID||null,this.bitRate=e.bitRate||96,this.sampleRate=e.sampleRate||44100,this.bufferSize=4096,this.records=[],this.sampler=new h(this.sampleRate,16e3,1,this.bufferSize),this.isPause=!1,this.isRecording=!1,this.volume=0,this.vad=null,this.vis=null,this.activity=!1,this.vis=null,this.context=new(window.AudioContext||window.webkitAudioContext),this.sampleRate=this.context.sampleRate,this.context.close()}return a()(t,[{key:"start",value:function(){this.beforeRecording&&this.beforeRecording("start recording"),navigator.mediaDevices.getUserMedia({video:!1,audio:{channelCount:1,echoCancellation:!0}}).then(this._micCaptured.bind(this)).catch(this._micError.bind(this)),this.isPause=!1,this.isRecording=!0}},{key:"stop",value:function(){this.vis&&this.vis.stop(),this.processor&&this.processor.disconnect(),this.context&&this.context.close(),this.isPause=!1,this.isRecording=!1}},{key:"pause",value:function(){this.stream.getTracks().forEach(function(t){return t.stop()}),this.input.disconnect(),this.processor.disconnect(),this.context.close(),this.isPause=!0,this.pauseRecording&&this.pauseRecording("pause recording")}},{key:"recordList",value:function(){return this.records}},{key:"lastRecord",value:function(){return this.records.slice(-1)}},{key:"_floatTo16BitPCM",value:function(t,e){for(var i=0;i<t.length;i++){var s=Math.max(-1,Math.min(1,t[i]));e[i]=s<0?32768*s:32767*s}}},{key:"_convertTo16BitPCM",value:function(t){var e=new Float32Array(t),i=new Int16Array(t.length);return this._floatTo16BitPCM(e,i),i}},{key:"_micCaptured",value:function(t){var e=this;this.context=new(window.AudioContext||window.webkitAudioContext)({sampleRate:this.sampleRate}),this.input=this.context.createMediaStreamSource(t),this.processor=this.context.createScriptProcessor(this.bufferSize,1,1),this.stream=t,this._voiceStop=function(){e.voiceStop(),e.activity=!1,e.afterRecording&&e.afterRecording()},this._voiceStart=function(){e.voiceStart(),e.activity=!0};var i={debug:!1,source:this.input,voice_stop:this._voiceStop,voice_start:this._voiceStart};if(this.vad=new c(i),this.visCanvasID)try{this.vis=new u(this.visCanvasID,this.input,this.input.context),this.vis.start()}catch(t){console.log(t)}this.processor.onaudioprocess=function(t){for(var i=t.inputBuffer.getChannelData(0),s=0,o=0;o<i.length;++o)s+=i[o]*i[o];if(e.volume=Math.sqrt(s/i.length).toFixed(2),e.activity&&e.processAudio){var n=e.sampler.resampler(i),r=e._convertTo16BitPCM(n);e.processAudio(r)}},this.input.connect(this.processor),this.processor.connect(this.context.destination)}},{key:"_micError",value:function(t){this.micFailed&&this.micFailed(t)}}]),t}(),f=(i("BLBT").api_auth,{name:"Kōrero",data:function(){return{vadOn:!1,recordingOn:!1,recorder:null,buttonText:"Start",transcriptions:[],icon:"fa-microphone",loadRecording:!1,status:""}},methods:{deleteObject:function(t){this.transcriptions.splice(t,1)},stopRecording:function(){try{this.recorder.stop()}catch(t){}this.recorder=null,this.vadOn=!1,this.recordingOn=!1},isMobile:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Mobile|SamsungBrowser|Opera Mini/i.test(navigator.userAgent)&&(console.log(navigator.userAgent),!0)},processResult:function(t){var e=this.transcriptions[0];e&&("EOS"==t?(e.captured_text+=" "+e.active_text,e.active_text=""):(e.active_text=t,e.status="Success"))}},mounted:function(){var t=this;startVAD.onclick=function(e){if(null==t.recorder){t.loadRecording=!0;t.transcriptions.unshift({status:"Transcribing",captured_text:"",active_text:null});var i="ws://asr.koreromaori.io/stt";t.status="Connecting to "+i,t.socket=new WebSocket(i),t.socket.binaryType="arraybuffer";var s=t;t.socket.onmessage=function(t){s.status="Connected to "+i,t.isTrusted&&s.processResult(t.data)},t.socket.onclose=function(){s.status="Service unavailable",console.log("Connection to server closed")},t.socket.onerror=function(t){s.status="Error getting data",console.log("Getting audio data error:",t)},t.recorder=new l({processAudio:function(e){1==t.socket.readyState&&t.socket.send(e)},afterRecording:function(e){1==t.socket.readyState&&t.socket.send("EOS")},pauseRecording:function(){streamer.stop(),console.log("paused")},micFailed:function(){console.log("failed")},voiceStop:function(){t.vadOn=!1},voiceStart:function(){t.vadOn=!0},canvasID:t.isMobile()?null:"canvas",bitRate:64,sampleRate:44100})}t.recordingOn?(t.recorder.stop(),t.recorder=null,t.vadOn=!1,t.recordingOn=!1):(t.recorder.start(),t.recordingOn=!0,t.buttonText="Stop",t.loadRecording=!1)}}}),d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"Korero"},[i("div",{staticClass:"header"},[i("h4",[t._v("Kōrero Māori Streaming ASR (Demo)")]),t._v(" "),i("div",{staticClass:"status"},[t._v(" "+t._s(t.status))]),t._v(" "),i("button",{class:{vad:t.vadOn,on:t.recordingOn,loading:t.loadRecording},attrs:{id:"startVAD"}},[i("i",{staticClass:"fa fa-microphone"}),t._v(" "),i("i",{staticClass:"fa fa-stop"}),t._v(" "),i("i",{staticClass:"fa fa-spinner fa-spin"})]),t._v(" "),i("div",{class:{active:t.vadOn,mobile:t.isMobile()},attrs:{id:"vadStatus"}},[i("div",[t.isMobile()?t._e():i("canvas",{attrs:{id:"canvas"}}),t._v(" "),t.isMobile()&&t.vadOn&&t.recordingOn?i("span",[t._v("Voice Detected")]):t._e(),t._v(" "),t.isMobile()&&t.recordingOn&&!t.vadOn?i("span",[t._v("Listening")]):t._e(),t._v(" "),t.isMobile()?i("span",[t._v("Hit Record")]):t._e()])])]),t._v(" "),i("div",{staticClass:"body"},[i("div",{attrs:{id:"transcriptions"}},t._l(t.transcriptions,function(e,s){return"Failed"!=e.status?i("div",{staticClass:"transcription",class:[e.status]},["Transcribing"!=e.status?i("button",{staticClass:"delete",on:{click:function(e){return t.deleteObject(s)}}},[i("i",{staticClass:"fa fa-times"})]):t._e(),t._v(" "),i("div",{staticClass:"text"},["Transcribing"==e.status?i("i",{staticClass:"fa fa-spinner fa-spin",class:[e.status]}):t._e(),t._v(" "),"Transcribing"!=e.status?i("div",[t._v(t._s(e.captured_text)+" "),i("span",{staticClass:"active_text"},[t._v(t._s(e.active_text))])]):t._e()]),t._v(" "),i("div",{staticClass:"audio"},[e.audio_url?i("audio",{attrs:{src:e.audio_url,type:"audio/mp3",controls:""},on:{play:t.stopRecording}}):t._e()])]):t._e()}),0)])])},staticRenderFns:[]};var v=i("VU/8")(f,d,!1,function(t){i("vaq7")},"data-v-722514e6",null).exports,p=i("PXmv");s.a.use(p.a),s.a.customElement("vue-widget",v)},vaq7:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.1ad6.js.map
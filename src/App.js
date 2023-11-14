
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";


const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    
    //keep on listening to the microphone continously 
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    //transcript is used to convert speech to text
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    //if browser doesn't support so just return
    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                
                <br/>
                <p>A simple app that converts your speech into text using your microphone!</p>

                    {/* speech to text area  */}
                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

                </div>

            </div>

        </>
    );
};

export default App;
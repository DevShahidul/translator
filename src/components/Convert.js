import React, { useState, useEffect } from "react"

// de-structure language and text props
const Convert = ({ language, text }) => {
    const [results, setResults] = useState([]);
    const [debouncedText, setDebouncedText] = useState(text);

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${language}&dt=t&q=${text}`
    
    const textLength = text.length;

    console.log(textLength);
    // de-bouncing the search term
    // runs every time the text changes
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (textLength !== 0){
                setDebouncedText(text)
            }else{
                setResults("Translation")
            }
        }, 500)
        return () => {
            clearTimeout(timerId)
        }
    }, [text, textLength]);

    // runs every time language or debouncedText updates
    useEffect(() => {
        if (textLength !== 0) {
            const translate = async () => {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                await fetch(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const getTranslatedText = JSON.parse(result);
                    const translatedText = getTranslatedText[0][0][0];
                    setResults(translatedText);
                    //console.log(result, "Stringified:", translatedText);
                    }
                )
                .catch(error => console.log('error', error));
            }
            translate()
        }
    }, [debouncedText, textLength, url]);

    return (
        <div className={`output-wrapper textarea-wrapper ${textLength !== 0 ? 'text-added' : ""}`}>
            <span>{results}</span>
        </div>
    )
}
export default Convert;
import React, { useRef, useEffect } from "react";
import "./CodeOutput.style.css";
interface CodeOutputProps {
  err: string;
  code: string;
  loading: boolean;
}

export const CodeOutput = ({ err , code, loading}: CodeOutputProps) => {
  const iframeRef = useRef<any>();
  const html = `
  <html>
    <head></head>
      <body>
        <div id = "root"></div>
        <script>
        const handleError = (error) => {
          document.querySelector('#root').innerHTML = error;
        }
          window.addEventListener('error' , (error) => {
            handleError(error.message);
          });
          
          window.addEventListener('message' , (code) => {
            try{
              eval(code.data);
            }
            catch(error){
              handleError(error.message);
            }
          });
        </script>
      </body>
  </html>`;

  useEffect(() => {
    iframeRef.current.srcDoc = html;
    iframeRef.current.contentWindow?.postMessage(code, "*");
  }, [html , code]);

  return (
    <div className="iframe-wrapper">
      <iframe
        ref={iframeRef}
        title="output"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {loading && 
      <div className="progress-bar-wrapper">
        <progress className="progress-bar"> ... Loading</progress>
       
        </div>}
      {err && <div className="bundle-error">{err}</div>}
    </div>
  );
};

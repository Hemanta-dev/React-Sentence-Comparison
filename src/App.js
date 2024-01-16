import { patienceDiff } from './sentenceCompare';

function App() {
  let a = "Hi, I'm Hemanta Adhikari . I'm from Surkhet.";
  let b = "I'm from Surkhet.Underrated Rapper also, Now I'm in Software Company.";

  const diff = patienceDiff(a.split(""), b.split(""));

  return (
    <div className="App">
      {diff.lines.map((cObj, index) => {
        if (cObj.aIndex === -1 && cObj.bIndex >= 0) {
          cObj.line = `!${cObj.line}!`;
          return (
            <span key={index} style={{ color: 'green' }}>
              {cObj.line.replaceAll(/!(\s)+!/g, '␣').replaceAll(/!/g, '')}
            </span>
          );
        } else if (cObj.bIndex === -1 && cObj.aIndex >= 0) {
          cObj.line = `!${cObj.line}!`;
          return (
            <span key={index} style={{ color: 'red' }}>
              {cObj.line.replaceAll(/!(\s)+!/g, '␣').replaceAll(/!/g, '')}
            </span>
          );
        }
        return cObj.line;
      })}


    </div>
  );
}

export default App;

import "./styles.css";
import CodeMirror from "codemirror";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import faker from "faker";
import { useLayoutEffect, useRef } from "react";
console.log("DONE");

export default function App() {
  const textArea = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    (async () => {
      if (!textArea.current) {
        return;
      }
      const schema = await loadSchema("https://u9h4i.sse.codesandbox.io/", {
        // load from endpoint
        loaders: [new UrlLoader()]
      });
      console.log("here");

      CodeMirror.fromTextArea(textArea.current, {
        mode: "graphql",
        theme: "material",
        hintOptions: {
          schema
        }
      });

      console.log("FOO");
      console.log(Object.keys(faker));
    })();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <textarea
        ref={(textarea) => {
          textArea.current = textarea;
        }}
      />
    </div>
  );
}

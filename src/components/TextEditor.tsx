import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import {
    UploadAdapter,
    FileLoader
  } from "@ckeditor/ckeditor5-upload/src/filerepository";
import { Editor } from "@ckeditor/ckeditor5-core";

interface TextEditorProps {
    onChange: (content: string, imageUrls: string[]) => void;
}

function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          loader.file.then((file) => {
            resolve({ default: loader.data });
          });
        });
      },
      abort: () => {}
    };
  }

  function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  function extractImageUrls(content: string): string[] {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const imageElements = doc.querySelectorAll("img");
    const urls: string[] = [];
    imageElements.forEach((img) => {
        const src = img.getAttribute("src");
        if (src) {
            urls.push(src);
        }
    });
    return urls;
}
export default function TextEditor({ onChange }: TextEditorProps) {
    const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                data="Hello from CKEditor 5!"
                onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                    setEditorLoaded(true);
                }}
                onChange={(event, editor) => {
                    const content = editor.getData();
                    console.log("Change.", content);
                    const imageUrls = extractImageUrls(content);
                    onChange(content, imageUrls);
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
                config={{
                    extraPlugins:[uploadPlugin]
                }}
            />
        </>
    );
}

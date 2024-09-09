/* eslint-disable import/no-extraneous-dependencies */
import { useCallback } from 'react';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import { createLowlight } from 'lowlight';
import javascript from 'highlight.js/lib/languages/javascript'; // JavaScript
import python from 'highlight.js/lib/languages/python'; // Python
import css from 'highlight.js/lib/languages/css'; // CSS
import bash from 'highlight.js/lib/languages/bash'; // Bash/Shell scripting
import java from 'highlight.js/lib/languages/java'; // Java
import csharp from 'highlight.js/lib/languages/csharp'; // C#
import php from 'highlight.js/lib/languages/php'; // PHP
import ruby from 'highlight.js/lib/languages/ruby'; // Ruby
import typescript from 'highlight.js/lib/languages/typescript'; // TypeScript
import json from 'highlight.js/lib/languages/json'; // JSON
import go from 'highlight.js/lib/languages/go'; // Go
import kotlin from 'highlight.js/lib/languages/kotlin'; // Kotlin
import swift from 'highlight.js/lib/languages/swift'; // Swift
import rust from 'highlight.js/lib/languages/rust'; // Rust
import r from 'highlight.js/lib/languages/r'; // R
import markdown from 'highlight.js/lib/languages/markdown'; // Markdown
import sql from 'highlight.js/lib/languages/sql'; // SQL
import yaml from 'highlight.js/lib/languages/yaml'; // YAML
import dockerfile from 'highlight.js/lib/languages/dockerfile'; // Dockerfile
import ini from 'highlight.js/lib/languages/ini'; // INI files
import xml from 'highlight.js/lib/languages/xml'; // XML
import plaintext from 'highlight.js/lib/languages/plaintext'; // Plaintext

// Or any other theme you prefer
import {
  FaYoutube, FaStrikethrough, FaBold, FaItalic, FaCode, FaAlignCenter, FaAlignLeft,
  FaAlignRight, FaListUl, FaImage, FaQuoteLeft, FaListOl, FaAlignJustify,
} from 'react-icons/fa';

const lowlight = createLowlight();

// Register the imported languages with lowlight
lowlight.register('javascript', javascript);
lowlight.register('python', python);
lowlight.register('css', css);
lowlight.register('html', xml);
lowlight.register('bash', bash);
lowlight.register('java', java);
lowlight.register('csharp', csharp);
lowlight.register('php', php);
lowlight.register('ruby', ruby);
lowlight.register('typescript', typescript);
lowlight.register('json', json);
lowlight.register('go', go);
lowlight.register('kotlin', kotlin);
lowlight.register('swift', swift);
lowlight.register('rust', rust);
lowlight.register('r', r);
lowlight.register('markdown', markdown);
lowlight.register('sql', sql);
lowlight.register('yaml', yaml);
lowlight.register('dockerfile', dockerfile);
lowlight.register('ini', ini);
lowlight.register('xml', xml);
lowlight.register('plaintext', plaintext);

function MenuBar() {
  const { editor } = useCurrentEditor();

  const addImage = useCallback(() => {
    if (!editor) {
      return null;
    }
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    return null;
  }, [editor]);

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  return (
    <div className="font-euclid font-normal z-10 sticky top-16 md:top-[61px] py-5 drop-shadow-2xl">
      <div className="button-group flex flex-wrap justify-center gap-x-1 gap-y-2 px-10 text-sm w-[80%] md:w-fit m-auto bg-secondary py-3 rounded-3xl">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={`${editor.isActive('bold') ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={`${editor.isActive('italic') ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can().chain().focus()
              .toggleStrike()
              .run()
          }
          className={`${editor.isActive('strike') ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={
            !editor.can().chain().focus().toggleCode()
              .run()
          }
          className={`${editor.isActive('code') ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaCode />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${editor.isActive({ textAlign: 'left' }) ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaAlignLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${editor.isActive({ textAlign: 'center' }) ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaAlignCenter />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${editor.isActive({ textAlign: 'right' }) ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaAlignRight />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`${editor.isActive({ textAlign: 'justify' }) ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaAlignJustify />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editor.isActive('blockquote') ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } font-semibold border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 border-none`}
        >
          <FaQuoteLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } border rounded-xl py-1 px-2 hover:bg-violet-500 font-semibold border-none`}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } border rounded-xl py-1 px-2 hover:bg-violet-500 font-semibold border-none`}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${editor.isActive('heading', { level: 1 }) ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 font-semibold border-none`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${editor.isActive('heading', { level: 2 }) ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 font-semibold border-none`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${editor.isActive('heading', { level: 3 }) ? 'bg-violet-700 text-white' : 'bg-gray-100 text-black'
          } border rounded-xl py-1 px-2 hover:bg-violet-500 disabled:bg-gray-200 disabled:text-gray-400 font-semibold border-none`}
        >
          H3
        </button>
        <button type="button" onClick={addImage} className="bg-gray-100 text-black border rounded-xl py-1 px-2 hover:bg-violet-500 font-semibold border-none"><FaImage /></button>
        <button type="button" id="add" onClick={addYoutubeVideo} className="bg-gray-100 text-black border rounded-xl py-1 px-2 hover:bg-violet-500 font-semibold border-none"><FaYoutube /></button>
      </div>
    </div>

  );
}

const CustomBold = Bold.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'text-secondary font-semibold',
      },
    };
  },
});

const CustomBlockquote = Blockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'text-secondary',
      },
    };
  },
});

const CustomCode = Code.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'text-secondary bg-highlight rounded-md mr-2',
      },
    };
  },
});

const CustomOrderedList = OrderedList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'text-secondary',
      },
    };
  },
});

const extensions = [
  StarterKit.configure({
    code: false,
    blockquote: false,
    bold: false,
    codeBlock: false,
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: false,
  }),
  CustomBold,
  CharacterCount,
  Placeholder.configure({
    emptyEditorClass: 'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0',
    placeholder: 'Write something …',
    emptyNodeClass: 'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0',
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: 'bg-black',
    },
    languageClassPrefix: 'language-',
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'max-h-96 max-w-[500px]',
    },
  }),
  Youtube.configure({
    width: 480,
    height: 320,
    allowFullscreen: false,
    controls: false,
    progressBarColor: 'blue',
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph', 'image', 'youtube'],
  }),
  CustomBlockquote,
  CustomCode,
  CustomOrderedList,
];

const editorProps = {
  attributes: {
    class: 'prose text-base md:text-xl text-secondary font-euclid m-auto !max-w-[95%] md:!max-w-[80%] [&_bold]:text-secondary [&_ol]:list-decimal [&_ul]:list-disc p-4 pt-0 [&_*]:!m-0 md:[&_*]:leading-7 [&_h1]:text-secondary [&_h2]:text-secondary [&_h3]:text-secondary md:[&_h1]:leading-10 focus:outline-none [&_iframe]:!m-auto [&_iframe]:rounded-lg [&_iframe]:max-w-80 [&_iframe]:max-h-44 md:[&_iframe]:max-w-none md:[&_iframe]:max-h-none [&_img]:!m-auto',
  },
};

export default function TipTap({
  content, setContent, setWords, isEditable,
}: {
  content: string,
  setContent: (z: string) => void,
  setWords: (z: number) => void,
  isEditable: boolean
}) {
  let jsonContent;
  try {
    jsonContent = JSON.parse(content);
  } catch (e) {
    console.log(e);
    jsonContent = '';
  }

  return (
    <EditorProvider
      slotBefore={isEditable ? <MenuBar /> : null}
      extensions={extensions}
      content={jsonContent}
      editorProps={editorProps}
      editable={isEditable}
      onUpdate={({ editor }) => {
        setWords(editor.storage.characterCount.words());
        setContent(JSON.stringify(editor.getJSON()));
      }}
    />
  );
}

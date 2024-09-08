import { useCallback } from 'react';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import Blockquote from '@tiptap/extension-blockquote';
import {
  FaYoutube, FaStrikethrough, FaBold, FaItalic, FaCode, FaAlignCenter, FaAlignLeft,
  FaAlignRight, FaListUl, FaImage, FaQuoteLeft, FaAlignJustify,
} from 'react-icons/fa';

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
      <div className="button-group flex flex-wrap justify-center gap-x-1 gap-y-2 px-10 text-sm w-[80%] md:w-fit m-auto bg-black py-3 rounded-3xl">
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
        <button type="button" onClick={addImage} className="bg-gray-100 border rounded-xl py-1 px-2 hover:bg-violet-500 font-semibold border-none"><FaImage /></button>
        <button type="button" id="add" onClick={addYoutubeVideo} className="bg-gray-100 border rounded-xl py-1 px-2 hover:bg-violet-500 font-semibold border-none"><FaYoutube /></button>
      </div>
    </div>

  );
}

const extensions = [
  StarterKit.configure({
    codeBlock: false,
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },

  }),
  CharacterCount,
  Placeholder.configure({
    emptyEditorClass: 'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0',
    placeholder: 'Write something …',
    emptyNodeClass: 'first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:h-0',
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
  }),
  Image,
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
  Blockquote,
];

const editorProps = {
  attributes: {
    class: 'prose text-base md:text-xl font-euclid m-auto !max-w-[95%] md:!max-w-[80%] [&_ol]:list-decimal [&_ul]:list-disc p-4 pt-0 [&_*]:!m-0 md:[&_*]:leading-7  md:[&_h1]:leading-10 focus:outline-none [&_iframe]:!m-auto [&_iframe]:rounded-lg [&_iframe]:max-w-80 [&_iframe]:max-h-44 md:[&_iframe]:max-w-none md:[&_iframe]:max-h-none [&_img]:!m-auto',
  },
};

export default function TipTap({
  content, setContent, setWords, isEditable,
}: { content: string,
  setContent: (z: string) => void,
  setWords: (z: number) => void,
  isEditable: boolean }) {
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

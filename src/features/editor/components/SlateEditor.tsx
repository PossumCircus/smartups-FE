import React, { useState, useCallback, useEffect } from "react";
import { createEditor, Descendant, Editor, Node } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { Box, Paper, IconButton, Divider } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; code?: boolean };

interface SlateEditorProps {
  content: Descendant[];
  setContent: (content: Descendant[]) => void;
}

const SlateEditor: React.FC<SlateEditorProps> = ({ content, setContent }) => {
  const [editor] = useState(() => withReact(createEditor()));

  useEffect(() => {
    // 서버에서 불러온 데이터를 초기값으로 설정
    editor.children = content;
    editor.onChange();
  }, [content, editor]);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const handleChange = (newValue: Descendant[]) => {
    setContent(newValue);
  };

  return (
    <Paper variant="outlined" sx={{ border: "1px solid", borderColor: "skyblue", borderRadius: 1 }}>
      <Slate editor={editor} initialValue={content} onChange={handleChange}>
        <Box sx={{ p: 2 }}>
          <MarkButton format="bold" icon={<FormatBoldIcon />} />
          <MarkButton format="italic" icon={<FormatItalicIcon />} />
          <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
          <MarkButton format="code" icon={<CodeIcon />} />
        </Box>
        <Divider sx={{ borderColor: "skyblue" }} />
        <Editable
          style={{ minHeight: 300, padding: 16, outline: "none" }}
          placeholder="이곳에 작성"
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case "`": {
                event.preventDefault();
                toggleMark(editor, "code");
                break;
              }

              case "b": {
                event.preventDefault();
                toggleMark(editor, "bold");
                break;
              }

              case "i": {
                event.preventDefault();
                toggleMark(editor, "italic");
                break;
              }

              case "u": {
                event.preventDefault();
                toggleMark(editor, "underline");
                break;
              }
            }
          }}
        />
      </Slate>
    </Paper>
  );
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};

const toggleMark = (editor: Editor, format: keyof CustomText) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: Editor, format: keyof CustomText) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      const node = n as Node & CustomText;
      return node[format] === true;
    },
    universal: true,
  });

  return !!match;
};

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <IconButton
      size="small"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </IconButton>
  );
};

export default SlateEditor;

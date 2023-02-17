import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

interface TextLayerProps {
  id: string;
  content: string;
  fontFamily: string;
}

const TextLayer = (props: TextLayerProps) => {
  const { id, content: initialContent } = props;
  const [content, setContent] = useState<string>(initialContent);

  const handleChangeTextContent = useCallback(
    (e: React.ChangeEvent<HTMLDivElement>) => {
      setContent(e.target.innerHTML);
    },
    [initialContent],
  );
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      data-layer-id={id}
      onInput={handleChangeTextContent}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default memo(TextLayer);

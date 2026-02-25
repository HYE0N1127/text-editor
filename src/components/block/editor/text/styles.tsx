/**
 * 텍스트 내에서 특정 마크다운 패턴을 찾아내는 정규표현식입니다.
 * 괄호 () 안의 패턴들을 '|' 기호로 구분하여 매칭합니다.
 * 'g' 플래그를 사용하여 문자열 전체에서 일치하는 모든 부분을 찾습니다.
 * * 1. \*\*.*?\*\* : bold - **Text** (앞뒤로 **가 붙은 텍스트, 최소 매칭)
 * 2. __.*?__        : underline - __Text__ (앞뒤로 __가 붙은 텍스트, 최소 매칭)
 * 3. ~~.*?~~        : middle-line - ~~Text~~ (앞뒤로 ~~가 붙은 텍스트, 최소 매칭)
 * 4. _[^_]+_        : italic - _Text_ (밑줄 기호 '__'와 겹치지 않도록 내부에는 '_'가 없는 문자열만 매칭)
 * 5. \[.*?\]\(.*?\) : hyperlink - [Text](link) (대괄호와 소괄호 형태 매칭)
 */
const MARKDOWN_REGEX = /(\*\*.*?\*\*|__.*?__|~~.*?~~|_[^_]+_|\[.*?\]\(.*?\))/g;

export const renderFormattedText = (text: string) => {
  if (text == null) {
    return null;
  }

  const parts = text.split(MARKDOWN_REGEX);

  return parts.map((part, index) => {
    // bold - **Text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={index}>
          <span className="text-transparent hidden select-none">**</span>
          <span className="font-bold text-white">{part.slice(2, -2)}</span>
          <span className="text-transparent hidden select-none">**</span>
        </span>
      );
    }

    // underline - __Text__
    if (part.startsWith("__") && part.endsWith("__")) {
      return (
        <span key={index}>
          <span className="text-transparent hidden select-none">__</span>
          <span className="underline underline-offset-4 text-white">
            {part.slice(2, -2)}
          </span>
          <span className="text-transparent hidden select-none">__</span>
        </span>
      );
    }

    // middle-line - ~~Text~~
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return (
        <span key={index}>
          <span className="text-transparent hidden select-none">~~</span>
          <span className="line-through text-white">{part.slice(2, -2)}</span>
          <span className="text-transparent hidden select-none">~~</span>
        </span>
      );
    }

    // Italic - _Text_
    if (part.startsWith("_") && part.endsWith("_")) {
      return (
        <span key={index}>
          <span className="text-transparent hidden select-none">_</span>
          <span className="italic text-white">{part.slice(1, -1)}</span>
          <span className="text-transparent hidden select-none">_</span>
        </span>
      );
    }

    // Hyperlink - [Text](link)
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch != null) {
      return (
        <span key={index}>
          <span className="text-transparent hidden select-none">[</span>
          <span className="text-blue-400 underline">{linkMatch[1]}</span>
          <span className="text-transparent hidden select-none">{`](${linkMatch[2]})`}</span>
        </span>
      );
    }

    // normal
    return <span key={index}>{part}</span>;
  });
};

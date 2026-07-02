type StaticMarkupProps = {
  html: string;
};

export function StaticMarkup({ html }: StaticMarkupProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

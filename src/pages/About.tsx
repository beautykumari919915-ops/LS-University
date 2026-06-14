import { usePageContent } from '../hooks/usePageContent';

const defaultContent = {
  heading: "About LS University",
  body: "Founded in 1995, LS University has been a beacon of academic excellence in India. Our mission is to provide world-class education and foster a culture of research and innovation."
};

export default function About() {
  const { content } = usePageContent('about', defaultContent);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">{content.heading || defaultContent.heading}</h1>
      <div className="prose prose-slate lg:prose-lg whitespace-pre-wrap text-slate-700">
        {content.body || defaultContent.body}
      </div>
    </div>
  );
}

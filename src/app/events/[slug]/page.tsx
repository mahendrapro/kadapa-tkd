import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// This function tells Next.js which pages to build
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/events'));
  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  // Read the file
  const filePath = path.join(process.cwd(), 'content/events', `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-6">{data.date}</p>
      
      {/* If your frontmatter has an image */}
      {data.image && <img src={data.image} alt={data.title} className="w-full h-auto mb-8" />}
      
      <div className="prose lg:prose-xl">
        {/* Render markdown content here. 
            You may want to use 'react-markdown' if you haven't already */}
        {content}
      </div>
    </main>
  );
}

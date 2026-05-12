import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

export default async function EventPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/events', `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-6">{data.date}</p>
      
      {data.image && (
        <img src={data.image} alt={data.title} className="w-full h-auto mb-8 rounded" />
      )}
      
      <div className="mb-8 text-lg text-gray-800 leading-relaxed">
        {data.description}
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Event Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.photos?.map((photo: string, index: number) => (
          <img key={index} src={photo} alt="Event photo" className="rounded shadow" />
        ))}
      </div>

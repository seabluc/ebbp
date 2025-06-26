import { notFound } from "next/navigation";
import { guidesItems } from "@/lib/data/guides-items";

const partName = new Map([
  ['cpu', 'CPU'],
  ['motherboard', 'Motherboard'],
  ['memory', 'Memory'],
  ['storage', 'Storage'],
  ['video-card', 'Video Card'],
  ['cpu-cooler', 'CPU Cooler'],
  ['power-supply', 'Power Supply']
]);

export async function generateMetadata({ params }) {
  return { title: `Guides—${partName.get(params.topic)}` };
}

export default async function Page({ params }) {
  // check validity of part type
  const validCategories = [
    'cpu', 'motherboard', 'memory', 'storage',
    'video-card', 'cpu-cooler', 'power-supply'
  ];
  if (!validCategories.includes(params.topic)) return notFound();

  const guidePart = guidesItems.find(
    (item) => item.type === partName.get(params.topic)
  );

  return (
    <section className="w-full flex flex-col md:items-center">
      <div className="md:max-w-2xl mt-10 md:mt-12 md:mr-12 mb-10 pl-4 pr-8 md:px-0 flex flex-col gap-6 md:gap-12">
        <section>
          <h1 className="pb-1 text-3xl font-[650]">{guidePart.type}</h1>
          <p className="md:text-base">{guidePart.description}</p>
        </section>
        {guidePart.topics.map((topic) => (
          <section key={topic.id} className="">
            <h2 id={topic.id} className="pb-0.5 text-xl font-[550]">{topic.label}</h2>
            <p className="md:text-base">{topic.content}</p>
          </section>
        ))}
      </div>
    </section>
  );
};
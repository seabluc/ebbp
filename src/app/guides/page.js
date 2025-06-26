
export async function generateMetadata() {
  return { title: 'Guides' };
}

export default function Page() {
  return (
    <section className="w-full flex flex-col md:items-center"> {/* Should these outer sections be divs?.. since theres h1 contained */}
      <div className="md:max-w-2xl mt-10 md:mt-12 md:mr-12 mb-10 pl-4 pr-8 md:px-0 flex flex-col gap-6 md:gap-12">
        <section>
          <h1 className="pb-1 text-3xl font-[650]">Introduction</h1>
          <p className="md:text-base">As you can see, this part is quite unfinished</p>
        </section>
        <section className="">
          <h2 className="pb-0.5 text-xl font-[550]">I'll finish this up soon</h2>
          <p className="md:text-base">I promise</p>
        </section>
      </div>
    </section>
  );
};
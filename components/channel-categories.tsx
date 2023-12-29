import ChannelCategory from '@/components/channels/category';

export default function ChannelCategories({
  categories,
}: {
  categories: any[];
}) {
  return (
    <div className='flex-1 space-y-[21px] overflow-y-auto pt-3 text-gray-300'>
      {categories.map((category: any) => (
        <ChannelCategory key={category.id} category={category} />
      ))}
    </div>
  );
}

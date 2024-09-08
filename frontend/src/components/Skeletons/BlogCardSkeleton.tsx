export default function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-10 md:grid-cols-5">
        <div className="col-span-7 md:col-span-4 pb-7">
          <div className="flex items-center pt-5 pb-3 gap-2">
            <div className="w-10 h-10 lg:w-7 lg:h-7 bg-gray-300 rounded-full dark:bg-gray-200" />
            <div className="w-24 h-4 bg-gray-300 rounded dark:bg-gray-200" />
            <div className="w-1 h-4 bg-gray-300 rounded dark:bg-gray-200" />
            <div className="w-20 h-4 bg-gray-300 rounded dark:bg-gray-200" />
          </div>
          <div className="w-full h-6 bg-gray-300 rounded dark:bg-gray-200 md:w-3/4" />
          <div className="w-full h-4 bg-gray-300 rounded dark:bg-gray-200 my-2 md:w-1/2" />
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-gray-300 rounded dark:bg-gray-200" />
            <div className="w-16 h-4 bg-gray-300 rounded dark:bg-gray-200" />
          </div>
        </div>
        <div className="flex items-center justify-end overflow-hidden col-span-3 md:col-span-1">
          <div className="w-20 md:w-32 h-20 md:h-32 bg-gray-300 rounded-md dark:bg-gray-200" />
        </div>
      </div>
      <hr />
    </div>
  );
}

import BlogCardSkeleton from '../../components/Skeletons/BlogCardSkeleton';

export default function BlogsSkeleton() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-[90%] lg:w-[80%]">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    </div>
  );
}

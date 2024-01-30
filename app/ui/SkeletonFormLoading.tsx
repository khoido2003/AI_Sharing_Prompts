export const SkeletonFormLoading = () => {
  return (
    <div className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7">
      <div role="status" className="max-w-lg animate-pulse space-y-2.5">
        <div className="flex w-full items-center">
          <div className="h-2.5 w-32 rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
        <div className="flex w-full max-w-[480px] items-center">
          <div className="h-2.5 w-full rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
        <div className="flex w-full max-w-[400px] items-center">
          <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
        <div className="flex w-full max-w-[480px] items-center">
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
        <div className="flex w-full max-w-[440px] items-center">
          <div className="ms-2 h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-400 dark:bg-gray-400"></div>
        </div>
        <div className="flex w-full max-w-[360px] items-center">
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
      </div>

      <div role="status" className="max-w-lg animate-pulse space-y-2.5">
        <div className="flex w-full items-center">
          <div className="h-2.5 w-32 rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
        <div className="flex w-full max-w-[480px] items-center">
          <div className="h-2.5 w-full rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
        <div className="flex w-full max-w-[400px] items-center">
          <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
        <div className="flex w-full max-w-[480px] items-center">
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-400 dark:bg-gray-400"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-300"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-300"></div>
        </div>
      </div>

      <div className="flex animate-pulse justify-end gap-2">
        <div
          className="h-3 w-12 rounded-full bg-gray-400 p-2 dark:bg-gray-400
        "
        ></div>
        <div
          className="h-2 w-12 rounded-full bg-gray-300 p-2 dark:bg-gray-300
        "
        ></div>
      </div>
    </div>
  );
};

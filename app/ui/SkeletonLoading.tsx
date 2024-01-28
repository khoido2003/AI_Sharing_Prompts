const SkeletonLoading = () => {
  return (
    <div className="prompt_card animate-pulse">
      <div className="mb-5 flex items-start justify-between gap-5">
        <div className="flex flex-1  items-center justify-start gap-3">
          <svg
            className="me-3 h-10 w-10 text-gray-400 dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>

          <div className="flex flex-col">
            <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-400 dark:bg-gray-500 "></div>
            <div className="h-2 w-48 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          </div>
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

      <div className="ms-2 mt-6 h-2.5 w-14 rounded-full bg-gray-300 dark:bg-gray-300"></div>
    </div>
  );
};

export default SkeletonLoading;

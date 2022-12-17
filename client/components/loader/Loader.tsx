interface ILoader {
  message?: string;
}

export default function Loader({ message }: ILoader) {
  return (
    <div className="bottom-0 right-0 bg-[rgba(0,0,0,0.65)] flex items-center justify-center fixed z-40 top-0 left-0 w-full">
      <div className="bg-white dark:bg-darkBg p-4 rounded-md shadow-lg max-w-[350px] flex items-center justify-center flex-col">
        <div className="spinner"></div>
        {message && (
          <p className="mt-4 font-nato text-sm text-center w-full sm:w-[85%] mx-auto">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

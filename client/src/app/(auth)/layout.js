const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#f8fafc] text-primary-foreground transition-colors duration-300 dark:bg-[#18181b] dark:text-white">
        <div className="md:px-5 lg:px-0">
          <h1 className="text-4xl font-bold mb-4">Welcome to PhotoSharer</h1>
          <p className="text-lg">Share your moments with the world!</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 lg:px-0 bg-white text-foreground transition-colors duration-300 dark:bg-[#232326] dark:text-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

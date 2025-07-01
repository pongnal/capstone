import Navbar from './navbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Dashboard
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              You are successfully logged in! This is your protected main page.
            </p>
            
          </div>
        </div>
      </main>
    </div>
  );
} 
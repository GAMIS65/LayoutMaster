import { Card } from '@/components/Card';
import Logo from '@/components/Logo';
import { createFileRoute, Link } from '@tanstack/react-router';
import { BarChart2, Keyboard, Heart } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex flex-col items-center px-4 py-16 sm:py-24 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex">
            <h1 className="font-bold text-5xl sm:text-7xl text-gray-900 mb-6">
              <Logo />
            </h1>
            alpha
          </div>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg">
            The fun, modern, and customizable touch typing platform.
          </p>

          <Link to="/layouts">
            <button className="px-8 py-3 font-bold text-green-600 bg-green-200 rounded-lg hover:bg-green-300 transition-colors duration-150 hover:cursor-pointer">
              Start typing
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-2">
          <Card color="green">
            <Card.Icon icon={BarChart2} />
            <Card.Title>Real-time Analytics</Card.Title>
            <Card.Description>
              Track your WPM, accuracy, and progress with detailed metrics and
              visualizations.
            </Card.Description>
          </Card>

          <Card color="blue">
            <Card.Icon icon={Keyboard} />
            <Card.Title>Layout Editor</Card.Title>
            <Card.Description>
              Using an alternative layout which we don't offer? Easily create it
              in our layout editor or import it from a file!
            </Card.Description>
          </Card>

          <Card color="pink">
            <Card.Icon icon={Heart} />
            <Card.Title>Free & Open Source</Card.Title>
            <Card.Description>
              LayoutMaster is completely free to use with no registration
              required. All data is stored locally in your browser.
            </Card.Description>
          </Card>
        </div>
      </div>
    </div>
  );
}

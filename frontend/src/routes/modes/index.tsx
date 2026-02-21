import { Card, styles } from '@/components/Card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/modes/')({
  component: RouteComponent,
});

type Mode = {
  title: string;
  label: string;
  labelColor: keyof typeof styles;
  description: string;
  comingSoon?: boolean;
  to: string;
};

const modes = [
  {
    title: 'Key by Key',
    label: 'Beginner',
    labelColor: 'green',
    description:
      'Learn where all the keys are and get your fingers in the right spots. Build the muscle memory you need to type without looking.',
    to: '/keybykey',
  },
  {
    title: 'N-grams',
    label: 'Intermediate',
    labelColor: 'black',
    description:
      'Get faster by practicing letter combinations that appear most commonly in real writing.',
    comingSoon: true,
    to: '#',
  },
  {
    title: 'Bursts',
    label: 'Intermediate',
    labelColor: 'black',
    description: 'Practice common short words in rapid succession.',
    comingSoon: true,
    to: '#',
  },
  {
    title: 'Quotes',
    label: 'Advanced',
    labelColor: 'black',
    description:
      'Type real quotes and passages. Feel the natural rhythm of actual writing.',
    comingSoon: true,
    to: '#',
  },
  {
    title: 'Code',
    label: 'Expert',
    labelColor: 'black',
    description:
      'Practice typing code snippets in various programming languages.',
    comingSoon: true,
    to: '#',
  },
] as Mode[];

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 cursor-pointer gap-6 px-4">
        {modes.map((mode) => (
          <Card.Link key={mode.title} to={mode.to} disabled={mode.comingSoon}>
            <Card color={mode.labelColor} disabled={mode.comingSoon}>
              <Card.Header>
                <Card.Label>{mode.label}</Card.Label>
                {mode.comingSoon && <Card.Badge>Coming Soon</Card.Badge>}
              </Card.Header>

              <Card.Title>{mode.title}</Card.Title>
              <Card.Description>{mode.description}</Card.Description>
            </Card>
          </Card.Link>
        ))}
      </div>
    </div>
  );
}

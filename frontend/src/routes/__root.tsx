import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { KeyboardLayoutProvider } from '@/context/LayoutContext';
import { LevelProvider } from '@/context/LevelContext';

export const Route = createRootRoute({
  component: () => (
    <>
      <KeyboardLayoutProvider>
        <LevelProvider>
          <Outlet />
        </LevelProvider>
      </KeyboardLayoutProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuRadioGroup,
  Button,
} from '@/components/ui';

import { SectionPreview } from '../components/section-preview';

export const DropdownMenuPage = () => (
  <div className="space-y-8">
    <section>
      <h1 className="text-3xl font-semibold">Dropdown Menu</h1>

      <p className="mt-2 text-(--text-secondary)">
        A liquid glass dropdown menu built on Radix primitives. Supports items, checkboxes, radio
        groups, labels, separators, and keyboard navigation.
      </p>
    </section>

    <SectionPreview
      title="Basic"
      code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Open Menu</Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Open Menu</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>

          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SectionPreview>

    <SectionPreview
      title="With Labels and Shortcuts"
      code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem>
      Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Logout <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Actions</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuItem>
            Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            Logout <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SectionPreview>

    <SectionPreview
      title="Checkbox Items"
      code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Options</Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked>Show Toolbar</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Show Sidebar</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Show Statusbar</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Options</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>

          <DropdownMenuCheckboxItem checked>Show Toolbar</DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem>Show Sidebar</DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem>Show Statusbar</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SectionPreview>

    <SectionPreview
      title="Radio Group"
      code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Theme</Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuLabel>Theme</DropdownMenuLabel>
    <DropdownMenuRadioGroup value="light">
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Theme</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>

          <DropdownMenuRadioGroup value="light">
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SectionPreview>
  </div>
);

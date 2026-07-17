'use client';

import { useState } from 'react';

import { Tabs } from '@/components/ui';
import { Plus, Settings, User } from 'lucide-react';

import { SectionPreview } from '../../components/section-preview';

const codeBasic = `const [value, setValue] = useState('overview');

<Tabs value={value} onValueChange={setValue}>
  <Tabs.Item value="overview">
    Overview
  </Tabs.Item>

  <Tabs.Item value="analytics">
    Analytics
  </Tabs.Item>

  <Tabs.Item value="reports">
    Reports
  </Tabs.Item>
</Tabs>`;

const codeIcon = `const [value, setValue] = useState('profile');

<Tabs value={value} onValueChange={setValue}>
  <Tabs.Item value="profile" icon={<User size={16} />}>
    Profile
  </Tabs.Item>

  <Tabs.Item value="settings" icon={<Settings size={16} />}>
    Settings
  </Tabs.Item>
</Tabs>`;

const codeDisabled = `const [value, setValue] = useState('active');

<Tabs value={value} onValueChange={setValue}>
  <Tabs.Item value="active">
    Active
  </Tabs.Item>

  <Tabs.Item value="disabled" disabled>
    Disabled
  </Tabs.Item>
</Tabs>`;

const codeToolbar = `const [view, setView] = useState('data');

<Tabs value={view} onValueChange={setView}>
  <Tabs.Item value="action" icon={<Plus size={16} />}>
    Add Item
  </Tabs.Item>

  <Tabs.Item value="data">
    View Data
  </Tabs.Item>
</Tabs>`;

export const TabsPage = () => {
  const [basicValue, setBasicValue] = useState('overview');
  const [iconValue, setIconValue] = useState('profile');
  const [disabledValue, setDisabledValue] = useState('active');
  const [toolbarValue, setToolbarValue] = useState('data');

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-secondary">Components</p>

        <h1 className="text-4xl font-bold tracking-tight">Tabs</h1>

        <p className="text-secondary">
          Tabs digunakan untuk beralih antar opsi dalam satu grup. Setiap item berperilaku seperti
          Ghost Button — tidak ada animasi sliding indicator.
        </p>
      </header>

      <SectionPreview
        title="Text Only"
        description="Tabs dengan teks saja. Gunakan untuk opsi sederhana tanpa ikon."
        code={codeBasic}
      >
        <Tabs value={basicValue} onValueChange={setBasicValue}>
          <Tabs.Item value="overview">Overview</Tabs.Item>

          <Tabs.Item value="analytics">Analytics</Tabs.Item>

          <Tabs.Item value="reports">Reports</Tabs.Item>
        </Tabs>
      </SectionPreview>

      <SectionPreview
        title="Icon + Text"
        description="Tambahkan ikon untuk memperkuat makna setiap opsi."
        code={codeIcon}
      >
        <Tabs value={iconValue} onValueChange={setIconValue}>
          <Tabs.Item value="profile" icon={<User size={16} />}>
            Profile
          </Tabs.Item>

          <Tabs.Item value="settings" icon={<Settings size={16} />}>
            Settings
          </Tabs.Item>
        </Tabs>
      </SectionPreview>

      <SectionPreview
        title="Disabled Item"
        description="Nonaktifkan item tertentu dengan prop disabled. Container juga bisa di-disableseluruhnya."
        code={codeDisabled}
      >
        <div className="space-y-4">
          <Tabs value={disabledValue} onValueChange={setDisabledValue}>
            <Tabs.Item value="active">Active</Tabs.Item>

            <Tabs.Item value="disabled" disabled>
              Disabled
            </Tabs.Item>
          </Tabs>

          <Tabs value="a" onValueChange={() => {}} disabled>
            <Tabs.Item value="a">All</Tabs.Item>

            <Tabs.Item value="b">Disabled</Tabs.Item>
          </Tabs>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Toolbar Pattern"
        description="Digunakan untuk action toolbar — misalnya beralih antara aksi dan tampilan data."
        code={codeToolbar}
      >
        <div className="space-y-4">
          <Tabs value={toolbarValue} onValueChange={setToolbarValue}>
            <Tabs.Item value="action" icon={<Plus size={16} />}>
              Add Item
            </Tabs.Item>

            <Tabs.Item value="data">View Data</Tabs.Item>
          </Tabs>

          <p className="text-sm text-secondary">Active: {toolbarValue}</p>
        </div>
      </SectionPreview>
    </div>
  );
};

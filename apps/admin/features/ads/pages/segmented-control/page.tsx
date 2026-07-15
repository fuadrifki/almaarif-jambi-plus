'use client';

import { useState } from 'react';

import { SegmentedControl } from '@/components/ui';
import { Plus, Settings, User } from 'lucide-react';

import { SectionPreview } from '../../components/section-preview';

const codeBasic = `const [value, setValue] = useState('overview');

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="overview">
    Overview
  </SegmentedControl.Item>

  <SegmentedControl.Item value="analytics">
    Analytics
  </SegmentedControl.Item>

  <SegmentedControl.Item value="reports">
    Reports
  </SegmentedControl.Item>
</SegmentedControl>`;

const codeIcon = `const [value, setValue] = useState('profile');

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="profile" icon={<User size={16} />}>
    Profile
  </SegmentedControl.Item>

  <SegmentedControl.Item value="settings" icon={<Settings size={16} />}>
    Settings
  </SegmentedControl.Item>
</SegmentedControl>`;

const codeDisabled = `const [value, setValue] = useState('active');

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="active">
    Active
  </SegmentedControl.Item>

  <SegmentedControl.Item value="disabled" disabled>
    Disabled
  </SegmentedControl.Item>
</SegmentedControl>`;

const codeToolbar = `const [view, setView] = useState('data');

<SegmentedControl value={view} onValueChange={setView}>
  <SegmentedControl.Item value="action" icon={<Plus size={16} />}>
    Add Item
  </SegmentedControl.Item>

  <SegmentedControl.Item value="data">
    View Data
  </SegmentedControl.Item>
</SegmentedControl>`;

export const SegmentedControlPage = () => {
  const [basicValue, setBasicValue] = useState('overview');
  const [iconValue, setIconValue] = useState('profile');
  const [disabledValue, setDisabledValue] = useState('active');
  const [toolbarValue, setToolbarValue] = useState('data');

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-secondary">Components</p>

        <h1 className="text-4xl font-bold tracking-tight">Segmented Control</h1>

        <p className="text-secondary">
          Segmented Control digunakan untuk beralih antar opsi dalam satu grup. Setiap item
          berperilaku seperti Ghost Button — tidak ada animasi sliding indicator.
        </p>
      </header>

      <SectionPreview
        title="Text Only"
        description="Segmented control dengan teks saja. Gunakan untuk opsi sederhana tanpa ikon."
        code={codeBasic}
      >
        <SegmentedControl value={basicValue} onValueChange={setBasicValue}>
          <SegmentedControl.Item value="overview">Overview</SegmentedControl.Item>

          <SegmentedControl.Item value="analytics">Analytics</SegmentedControl.Item>

          <SegmentedControl.Item value="reports">Reports</SegmentedControl.Item>
        </SegmentedControl>
      </SectionPreview>

      <SectionPreview
        title="Icon + Text"
        description="Tambahkan ikon untuk memperkuat makna setiap opsi."
        code={codeIcon}
      >
        <SegmentedControl value={iconValue} onValueChange={setIconValue}>
          <SegmentedControl.Item value="profile" icon={<User size={16} />}>
            Profile
          </SegmentedControl.Item>

          <SegmentedControl.Item value="settings" icon={<Settings size={16} />}>
            Settings
          </SegmentedControl.Item>
        </SegmentedControl>
      </SectionPreview>

      <SectionPreview
        title="Disabled Item"
        description="Nonaktifkan item tertentu dengan prop disabled. Container juga bisa di-disableseluruhnya."
        code={codeDisabled}
      >
        <div className="space-y-4">
          <SegmentedControl value={disabledValue} onValueChange={setDisabledValue}>
            <SegmentedControl.Item value="active">Active</SegmentedControl.Item>

            <SegmentedControl.Item value="disabled" disabled>
              Disabled
            </SegmentedControl.Item>
          </SegmentedControl>

          <SegmentedControl value="a" onValueChange={() => {}} disabled>
            <SegmentedControl.Item value="a">All</SegmentedControl.Item>

            <SegmentedControl.Item value="b">Disabled</SegmentedControl.Item>
          </SegmentedControl>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Toolbar Pattern"
        description="Digunakan untuk action toolbar — misalnya beralih antara aksi dan tampilan data."
        code={codeToolbar}
      >
        <div className="space-y-4">
          <SegmentedControl value={toolbarValue} onValueChange={setToolbarValue}>
            <SegmentedControl.Item value="action" icon={<Plus size={16} />}>
              Add Item
            </SegmentedControl.Item>

            <SegmentedControl.Item value="data">View Data</SegmentedControl.Item>
          </SegmentedControl>

          <p className="text-sm text-secondary">Active: {toolbarValue}</p>
        </div>
      </SectionPreview>
    </div>
  );
};

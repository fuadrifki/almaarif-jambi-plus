'use client';

import { useState } from 'react';

import { SegmentedControl } from '@/components/ui';
import { Settings, User } from 'lucide-react';

import { SectionPreview } from '../components/section-preview';

const codeBasic = `const [value, setValue] = useState('input');

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="input">
    Isi
  </SegmentedControl.Item>

  <SegmentedControl.Item value="history">
    Riwayat
  </SegmentedControl.Item>
</SegmentedControl>`;

const codeIcon = `const [value, setValue] = useState('profile');

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="profile" icon={<User size={16} />}>
    Profil
  </SegmentedControl.Item>

  <SegmentedControl.Item value="settings" icon={<Settings size={16} />}>
    Pengaturan
  </SegmentedControl.Item>
</SegmentedControl>`;

const codeDisabled = `const [value, setValue] = useState('active');

<SegmentedControl value={value} onValueChange={setValue}>
  <SegmentedControl.Item value="active">
    Aktif
  </SegmentedControl.Item>

  <SegmentedControl.Item value="disabled" disabled>
    Nonaktif
  </SegmentedControl.Item>
</SegmentedControl>`;

const codeControlled = `const [tab, setTab] = useState('overview');

<SegmentedControl value={tab} onValueChange={setTab}>
  <SegmentedControl.Item value="overview">
    Ringkasan
  </SegmentedControl.Item>

  <SegmentedControl.Item value="details">
    Detail
  </SegmentedControl.Item>

  <SegmentedControl.Item value="reviews">
    Ulasan
  </SegmentedControl.Item>
</SegmentedControl>

<p>Tab aktif: {tab}</p>`;

export const SegmentedControlPage = () => {
  const [basicValue, setBasicValue] = useState('input');
  const [iconValue, setIconValue] = useState('profile');
  const [disabledValue, setDisabledValue] = useState('active');
  const [controlledValue, setControlledValue] = useState('overview');

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-secondary">Components</p>

        <h1 className="text-4xl font-bold tracking-tight">Segmented Control</h1>

        <p className="text-secondary">
          Segmented Control digunakan untuk beralih antar opsi dalam satu grup. Gunakan icon dan
          label untuk mengkomunikasikan makna secara visual.
        </p>
      </header>

      <SectionPreview
        title="Text Only"
        description="Segmented control dengan teks saja. Gunakan untuk opsi sederhana tanpa ikon."
        code={codeBasic}
      >
        <SegmentedControl value={basicValue} onValueChange={setBasicValue}>
          <SegmentedControl.Item value="input">Isi</SegmentedControl.Item>

          <SegmentedControl.Item value="history">Riwayat</SegmentedControl.Item>
        </SegmentedControl>
      </SectionPreview>

      <SectionPreview
        title="Icon + Text"
        description="Tambahkan ikon untuk memperkuat makna setiap opsi."
        code={codeIcon}
      >
        <SegmentedControl value={iconValue} onValueChange={setIconValue}>
          <SegmentedControl.Item value="profile" icon={<User size={16} />}>
            Profil
          </SegmentedControl.Item>

          <SegmentedControl.Item value="settings" icon={<Settings size={16} />}>
            Pengaturan
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
            <SegmentedControl.Item value="active">Aktif</SegmentedControl.Item>

            <SegmentedControl.Item value="disabled" disabled>
              Nonaktif
            </SegmentedControl.Item>
          </SegmentedControl>

          <SegmentedControl value="a" onValueChange={() => {}} disabled>
            <SegmentedControl.Item value="a">Semua</SegmentedControl.Item>

            <SegmentedControl.Item value="b">Nonaktif</SegmentedControl.Item>
          </SegmentedControl>
        </div>
      </SectionPreview>

      <SectionPreview
        title="Controlled State"
        description="Segmented control adalah komponen controlled. Gunakan state untuk mengelola nilai aktif."
        code={codeControlled}
      >
        <div className="space-y-4">
          <SegmentedControl value={controlledValue} onValueChange={setControlledValue}>
            <SegmentedControl.Item value="overview">Ringkasan</SegmentedControl.Item>

            <SegmentedControl.Item value="details">Detail</SegmentedControl.Item>

            <SegmentedControl.Item value="reviews">Ulasan</SegmentedControl.Item>
          </SegmentedControl>

          <p className="text-sm text-secondary">Tab aktif: {controlledValue}</p>
        </div>
      </SectionPreview>
    </div>
  );
};

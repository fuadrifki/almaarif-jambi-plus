import { fireEvent, render, screen } from '@testing-library/react';

import { Select } from './select';

const options = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'user',
  },
];

describe('Select', () => {
  it('renders placeholder', () => {
    render(<Select options={options} placeholder="Choose role" />);

    expect(screen.getByText('Choose role')).toBeInTheDocument();
  });

  it('opens options', () => {
    render(<Select options={options} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('changes value', () => {
    const onChange = jest.fn();

    render(<Select options={options} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Admin'));

    expect(onChange).toHaveBeenCalledWith('admin');
  });
});

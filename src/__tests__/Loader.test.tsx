import { render, screen } from '@testing-library/react';
import { Loader } from '../components/Loader';

describe('Loader', () => {
  it('renders loading text', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveAttribute('aria-live', 'polite');
  });

  it('has screen reader text', () => {
    render(<Loader />);
    expect(screen.getByText('Loading repositories')).toBeInTheDocument();
  });
});

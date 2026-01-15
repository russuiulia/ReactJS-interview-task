import { render, screen } from '@testing-library/react';
import { ErrorState } from '../components/ErrorState';

describe('ErrorState', () => {
  it('renders error message', () => {
    render(<ErrorState message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ErrorState message="Error occurred" />);
    const error = screen.getByRole('alert');
    expect(error).toHaveAttribute('aria-live', 'assertive');
  });

  it('displays error icon', () => {
    render(<ErrorState message="Error occurred" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("error");
  });

  it('renders different error messages', () => {
    const { rerender } = render(<ErrorState message="First error" />);
    expect(screen.getByText('First error')).toBeInTheDocument();

    rerender(<ErrorState message="Second error" />);
    expect(screen.getByText('Second error')).toBeInTheDocument();
  });
});
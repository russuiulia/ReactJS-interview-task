import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../components/SearchInput';
import { vi } from 'vitest';

describe('SearchInput', () => {
  it('renders with placeholder text', () => {
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search repositories...');
    expect(input).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('aria-label', 'Search GitHub repositories');
    expect(input).toHaveAttribute('aria-describedby', 'search-hint');
  });

  it('calls onSearch when user types', () => {
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'react' } });

    expect(mockOnSearch).toHaveBeenCalledWith('react');
  });

  it('trims whitespace before calling onSearch', () => {
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: '  react  ' } });

    expect(mockOnSearch).toHaveBeenCalledWith('react');
  });

  it('renders with initial value', () => {
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} initialValue="initial query" />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('initial query');
  });

  it('updates input value as user types', () => {
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'r' } });
    expect(input.value).toBe('r');

    fireEvent.change(input, { target: { value: 're' } });
    expect(input.value).toBe('re');

    fireEvent.change(input, { target: { value: 'react' } });
    expect(input.value).toBe('react');
  });
});
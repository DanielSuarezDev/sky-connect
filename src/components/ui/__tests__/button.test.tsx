import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: 'Test Button' });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('applies different variants correctly', () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const button = screen.getByRole('button', { name: 'Destructive Button' });
    
    expect(button).toHaveClass('bg-destructive');
  });

  it('applies different sizes correctly', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button', { name: 'Small Button' });
    
    expect(button).toHaveClass('h-8');
  });

  it('should handle custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button', { name: 'Custom Button' });
    
    expect(button).toHaveClass('custom-class');
  });

  it('should be disabled when disabled prop is provided', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    
    expect(button).toBeDisabled();
  });

  it('should allow clicks when not disabled', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByRole('button', { name: 'Clickable Button' });
    
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger click events when disabled', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: 'Disabled Button' });
    
    await userEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 
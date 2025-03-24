import { render } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '../card';

describe('Card Component', () => {
  it('renders Card correctly with children', () => {
    const { getByText } = render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    
    expect(getByText('Card Content')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Card Content</div>
      </Card>
    );
    
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass('custom-class');
  });

  it('renders CardHeader with correct styles', () => {
    const { container } = render(
      <CardHeader>
        <div>Header Content</div>
      </CardHeader>
    );
    
    const headerElement = container.firstChild;
    expect(headerElement).toHaveAttribute('data-slot', 'card-header');
  });

  it('renders CardTitle properly', () => {
    const { getByText, container } = render(
      <CardTitle>Card Title</CardTitle>
    );
    
    expect(getByText('Card Title')).toBeInTheDocument();
    const titleElement = container.firstChild;
    expect(titleElement).toHaveAttribute('data-slot', 'card-title');
  });

  it('renders CardDescription with correct attributes', () => {
    const { getByText, container } = render(
      <CardDescription>Card Description</CardDescription>
    );
    
    expect(getByText('Card Description')).toBeInTheDocument();
    const descElement = container.firstChild;
    expect(descElement).toHaveAttribute('data-slot', 'card-description');
  });

  it('renders CardContent with correct attributes', () => {
    const { getByText, container } = render(
      <CardContent>Content Area</CardContent>
    );
    
    expect(getByText('Content Area')).toBeInTheDocument();
    const contentElement = container.firstChild;
    expect(contentElement).toHaveAttribute('data-slot', 'card-content');
  });

  it('renders CardFooter with correct attributes', () => {
    const { getByText, container } = render(
      <CardFooter>Footer Area</CardFooter>
    );
    
    expect(getByText('Footer Area')).toBeInTheDocument();
    const footerElement = container.firstChild;
    expect(footerElement).toHaveAttribute('data-slot', 'card-footer');
  });

  it('renders CardAction with correct attributes', () => {
    const { getByText, container } = render(
      <CardAction>Action Button</CardAction>
    );
    
    expect(getByText('Action Button')).toBeInTheDocument();
    const actionElement = container.firstChild;
    expect(actionElement).toHaveAttribute('data-slot', 'card-action');
  });

  it('combines all card components correctly', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>This is a complete card example</CardDescription>
          <CardAction>
            <button>Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <p>Footer content</p>
        </CardFooter>
      </Card>
    );
    
    expect(getByText('Complete Card')).toBeInTheDocument();
    expect(getByText('This is a complete card example')).toBeInTheDocument();
    expect(getByText('Action')).toBeInTheDocument();
    expect(getByText('Main content goes here')).toBeInTheDocument();
    expect(getByText('Footer content')).toBeInTheDocument();
  });
}); 
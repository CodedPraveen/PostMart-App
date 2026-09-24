import { EmptyState } from '@/components/feedback/empty-state/EmptyState';

interface SuccessStateProps {
  title: string;
  description: string;
}

export function SuccessState({ title, description }: SuccessStateProps) {
  return <EmptyState icon="check-circle" title={title} description={description} />;
}

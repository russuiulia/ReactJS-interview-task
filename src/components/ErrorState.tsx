export const ErrorState = ({ message }: { message: string }) => (
  <div className="error" role="alert" aria-live="assertive">{message}</div>
);

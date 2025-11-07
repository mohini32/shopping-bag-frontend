import { ProtectedRoute } from '@/components/guards/ProtectedRoute';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

export default DashboardPage
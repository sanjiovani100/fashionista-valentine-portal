import { AdminLayout } from '@/components/layout/AdminLayout';

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Events</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Active Events</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Registrations</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">0</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 



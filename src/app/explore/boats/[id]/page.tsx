import { boatService, type BoatTour } from '@/services/boatService';
import BoatTourDetailClient from './BoatTourDetailClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BoatTourDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Fetch tour data server-side
  const tour = await boatService.getTourById(id);
  const allTours = await boatService.getAllTours();
  const relatedTours = tour ? allTours
    .filter(t => t.id !== id && t.type === tour.type)
    .slice(0, 3) : [];

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-800 mb-4">Tour not found</h1>
          <a
            href="/explore/boats"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Boat Tours
          </a>
        </div>
      </div>
    );
  }

  return <BoatTourDetailClient tour={tour} relatedTours={relatedTours} />;
} 
import { useAuth } from "@/hooks/useAuth";
import { useClientProfile } from "@/hooks/useClientProfile";
import { Button } from "@/components/ui/button";

export default function ClientDashboard() {
  const { user, signOut } = useAuth();
  const { clientData, loading, progressPercent, pointsToReward, hasRewardReady } = useClientProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-amber-900">My Loyalty Card</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut}>Sign out</Button>
        </div>

        {clientData ? (
          <>
            {/* Loyalty Card */}
            <div className="bg-amber-900 text-white rounded-2xl p-6 mb-4 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-amber-200 text-sm">Welcome back</p>
                  <h2 className="text-xl font-bold">{clientData.name}</h2>
                </div>
                <span className="text-3xl">☕</span>
              </div>

              {/* Stamp Grid */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
                      ${i < clientData.points
                        ? "bg-amber-400 text-amber-900"
                        : "bg-amber-800 text-amber-700"
                      }`}
                  >
                    {i < clientData.points ? "☕" : "○"}
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="bg-amber-800 rounded-full h-2 mb-2">
                <div
                  className="bg-amber-400 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-amber-200 text-sm">
                {hasRewardReady
                  ? "🎉 You earned a free coffee! Show this to the barista."
                  : `${pointsToReward} more ${pointsToReward === 1 ? "coffee" : "coffees"} until your free reward`}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <p className="text-2xl font-bold text-amber-900">{clientData.total_purchases}</p>
                <p className="text-sm text-gray-500">Total visits</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <p className="text-2xl font-bold text-amber-900">{clientData.free_coffees}</p>
                <p className="text-sm text-gray-500">Free coffees earned</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-4xl mb-4">☕</p>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">No loyalty card yet</h2>
            <p className="text-gray-500 text-sm">Ask your barista to add you to the program</p>
          </div>
        )}
      </div>
    </div>
  );
}
